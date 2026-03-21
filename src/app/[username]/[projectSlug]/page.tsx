import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import type { Page, Block, PageConfig } from '@/types/database'
import { BlockFactory } from '@/components/shared/BlockFactory'
import { getBoxShadow, cn } from '@/lib/utils'
import { fontMap } from '@/styles/fonts'
import { AnalyticsTracker } from '@/components/public/AnalyticsTracker'
import { DEFAULT_THEME } from '@/lib/constants'

export const revalidate = 3600 // Cache for 1 hour

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

    // 2. Find Project
    const { data: project } = await supabase
        .from('projects')
        .select('*')
        .eq('slug', projectSlug)
        .eq('user_id', user.id)
        .single()

    if (!project) notFound()

    // 3. Find First Page
    const { data: page } = await supabase
        .from('pages')
        .select('*, theme:themes(*)')
        .eq('project_id', project.id)
        .order('created_at', { ascending: true })
        .limit(1)
        .maybeSingle()

    if (!page || (page as Page).is_published === false) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-10 bg-pv-dark-100 text-pv-white-0">
                <h1 className="text-2xl font-bold mb-4">Projet en cours de création</h1>
                <p className="opacity-50 italic">Ce projet n&apos;a pas encore de page publique publiée.</p>
            </div>
        )
    }

    const typedPage = page as Page

    // 4. Fetch Blocks for this page
    const { data: blocks } = await supabase
        .from('blocks')
        .select('*')
        .eq('page_id', typedPage.id)
        .order('position', { ascending: true })

    const typedBlocks = blocks as Block[]

    // Theme Logic (Directly on Server)
    let themeConfig = typedPage.theme?.config || typedPage.config
    const isConfigEmpty = !themeConfig || (typeof themeConfig === 'object' && Object.keys(themeConfig).length === 0)

    if (isConfigEmpty) {
        const SYSTEM_THEME_ID = '00000000-0000-0000-0000-000000000000'
        if (project.default_theme_id) {
            const { data: defaultTheme } = await supabase.from('themes').select('config').eq('id', project.default_theme_id).maybeSingle()
            if (defaultTheme) themeConfig = defaultTheme.config
        }
        if (!themeConfig || (typeof themeConfig === 'object' && Object.keys(themeConfig).length === 0)) {
            const { data: systemTheme } = await supabase.from('themes').select('config').eq('id', SYSTEM_THEME_ID).maybeSingle()
            if (systemTheme) themeConfig = systemTheme.config
        }
    }

    const effectiveConfig = (themeConfig || DEFAULT_THEME) as PageConfig

    const themeStyles = {
        '--pico-bg': effectiveConfig.colors?.background || DEFAULT_THEME.colors!.background,
        '--pico-outer-bg': effectiveConfig.colors?.outerBackground || DEFAULT_THEME.colors!.outerBackground,
        '--pico-primary': effectiveConfig.colors?.primary || DEFAULT_THEME.colors!.primary,
        '--pico-secondary': effectiveConfig.colors?.secondary || DEFAULT_THEME.colors!.secondary,
        '--pico-text': effectiveConfig.colors?.text || DEFAULT_THEME.colors!.text,
        '--pico-link': effectiveConfig.colors?.link || DEFAULT_THEME.colors!.link,
        '--pico-btn-text': effectiveConfig.colors?.buttonText || DEFAULT_THEME.colors!.buttonText,
        '--pico-font': fontMap[effectiveConfig.typography?.fontFamily || 'inter'] || 'var(--font-inter)',
        '--pico-radius': effectiveConfig.borders?.radius || '8px',
        '--pico-border-width': effectiveConfig.borders?.width || '1px',
        '--pico-border-style': effectiveConfig.borders?.style || 'solid',
        '--pico-divider-style': effectiveConfig.dividers?.style || 'solid',
        '--pico-shadow': getBoxShadow(effectiveConfig.shadows?.style || 'none', effectiveConfig.colors?.secondary || '#e5e7eb', effectiveConfig.shadows?.opacity ?? 0.5),
        fontFamily: 'var(--pico-font)',
        backgroundColor: 'var(--pico-outer-bg)',
        color: 'var(--pico-text)',
    } as React.CSSProperties

    return (
        <div style={themeStyles} className="pico-background min-h-screen w-full flex flex-col justify-center lg:py-16 transition-colors duration-300">
            <AnalyticsTracker projectId={project.id} pageId={typedPage.id} />

            <div className="@container pico-container relative overflow-hidden flex flex-col">
                {/* Header Background */}
                {effectiveConfig.headerBackgroundImage && (
                    <div className="absolute top-0 left-0 right-0 h-64 z-0">
                        <Image
                            src={effectiveConfig.headerBackgroundImage}
                            alt=""
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-transparent"></div>
                    </div>
                )}

                {/* Blocks Rendering */}
                <div className={cn(
                    "relative z-10 space-y-6 flex-1",
                    effectiveConfig.headerBackgroundImage && "pt-32"
                )}>
                    {typedBlocks?.map((block) => (
                        <div
                            key={block.id}
                            className={block.content.width === 'half' ? 'w-[calc(50%-0.5rem)]' : 'w-full'}
                            data-pv-block-id={block.id}
                            data-pv-block-type={block.type}
                        >
                            <BlockFactory block={block} config={effectiveConfig} />
                        </div>
                    ))}

                    {typedBlocks.length === 0 && (
                        <div className="text-center text-gray-500 py-10 w-full">
                            Cette page est vide pour le moment.
                        </div>
                    )}
                </div>

                <footer className="relative z-10 text-center pt-10 pb-2 text-sm opacity-60 mt-auto" style={{ color: 'var(--pico-text)' }}>
                    Propulsé par <Link href="/" className="font-bold hover:opacity-80 transition-opacity" style={{ color: 'var(--pico-primary)' }}>Picoverse</Link>
                </footer>
            </div>
        </div>
    )
}
