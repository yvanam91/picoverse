import { MetadataRoute } from 'next'
import { createClient } from '@/utils/supabase/server'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.picover.se'

  // 1. Pages statiques de base
  const routes = [
    '',
    '/login',
    '/signup',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 1,
  }))

  // 2. Pages projets (Optionnel : uniquement si tu veux que Google indexe TOUS les showrooms)
  // Attention : Ne liste que les projets que tu souhaites rendre publics.

  const supabase = await createClient()
  const { data: projects } = await supabase
    .from('projects')
    .select('slug, profile:profiles(username)')
    .limit(1000) // On limite pour éviter un sitemap trop lourd

  const projectRoutes = (projects || [])
    .map((p) => {
      // Supabase joins can return an array or an object depending on schema/types
      const profile = Array.isArray(p.profile) ? p.profile[0] : p.profile
      const username = profile?.username

      if (!username || !p.slug) return null

      return {
        url: `${baseUrl}/${username}/${p.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }
    })
    .filter((route): route is NonNullable<typeof route> => route !== null)


  return [...routes, ...projectRoutes]
}
