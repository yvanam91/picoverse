import { createClient } from '@/utils/supabase/server'
import { notFound, redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function ProjectPage({
    params,
}: {
    params: Promise<{ username: string; projectSlug: string }>
}) {
    const { username, projectSlug } = await params
    const supabase = await createClient()

    // 1. Find User by Username
    const { data: user } = await supabase
        .from('profiles')
        .select('id')
        .eq('username', username)
        .single()

    if (!user) notFound()

    // 2. Find Project and its first page
    const { data: project } = await supabase
        .from('projects')
        .select('id')
        .eq('slug', projectSlug)
        .eq('user_id', user.id)
        .single()

    if (!project) notFound()

    // 3. Find First Page
    const { data: page } = await supabase
        .from('pages')
        .select('slug')
        .eq('project_id', project.id)
        .order('created_at', { ascending: true })
        .limit(1)
        .maybeSingle()

    if (!page) {
        // Option 1: Render a "Coming Soon" or empty state
        // Option 2: Redirect to "/"
        // Let's render a simple "Under Construction" if no pages
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-10 bg-pv-dark-100 text-pv-white-0">
                <h1 className="text-2xl font-bold mb-4">Projet en cours de création</h1>
                <p className="opacity-50 italic">Ce projet n&apos;a pas encore de page publique.</p>
            </div>
        )
    }

    // Redirect to the first page
    redirect(`/${username}/${projectSlug}/${page.slug}`)
}
