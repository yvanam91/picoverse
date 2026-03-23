import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/p/', '/api/og'],
      disallow: ['/dashboard/', '/onboarding/', '/login/', '/signup/', '/auth/'],
    },
    sitemap: 'https://www.picover.se/sitemap.xml',
  }
}
