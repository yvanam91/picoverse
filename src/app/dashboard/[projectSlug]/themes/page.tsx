import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import { ThemeEditor } from '@/components/dashboard/ThemeEditor'
import { getThemes } from '@/app/dashboard/actions'
import { DEFAULT_THEME, SYSTEM_THEME_ID } from '@/lib/constants'

export default async function ThemesPage({ params }: { params: Promise<{ projectSlug: string }> }) {
    const { projectSlug } = await params
    const supabase = await createClient()

    // 1. Verify Project
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) notFound()

    const { data: project } = await supabase
        .from('projects')
        .select('*')
        .eq('slug', projectSlug)
        .eq('user_id', user.id)
        .maybeSingle()

    if (!project) {
        notFound()
    }

    // 2. Parallel Fetching (Themes + Index Page)
    const [themes, indexResult] = await Promise.all([
        getThemes(project.id),
        supabase.from('pages')
            .select('id, slug')
            .eq('project_id', project.id)
            .eq('slug', 'index')
            .maybeSingle(),
    ])

    const indexPage = indexResult.data
    const SYSTEM_THEME_ID = '00000000-0000-0000-0000-000000000000'

    // 3. Robust Initial Theme Fetching (Project Default -> First Available -> System Theme)
    let initialTheme = null
    
    if (project.default_theme_id) {
        const { data } = await supabase.from('themes').select('*').eq('id', project.default_theme_id).maybeSingle()
        initialTheme = data
    }

    if (!initialTheme && themes && themes.length > 0) {
        initialTheme = themes[0]
    }

    if (!initialTheme) {
        // Fallback to System Theme
        const { data } = await supabase.from('themes').select('*').eq('id', SYSTEM_THEME_ID).maybeSingle()
        initialTheme = data
    }
    
    const initialConfig = initialTheme?.config || DEFAULT_THEME

    return (
        <div className="flex flex-col h-full bg-pv-dark-100">
            <header className="bg-pv-dark-0 text-white-0 shrink-0">
                <div className="mx-auto max-w-7xl pl-16 pr-4 py-pv-20 md:px-8">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="font-pv-inter font-pv-bold text-pv-12 text-white-0">
                                Éditeur de Thème
                            </h1>
                            <p className="mt-1 font-pv-inter font-pv-regular text-pv-12 text-white-0 opacity-70">
                                Personnalisez l&apos;apparence de vos pages.
                            </p>
                        </div>
                    </div>
                </div>
            </header>
            <main className="flex-1 bg-pv-dark-100 overflow-hidden">
                <div className="h-full mx-auto max-w-7xl lg:px-8">
                    <ThemeEditor 
                        themes={themes || []} 
                        projectId={project.id} 
                        hasIndexPage={!!indexPage}
                        initialConfig={initialConfig}
                    />
                </div>
            </main>
        </div>
    )
}
