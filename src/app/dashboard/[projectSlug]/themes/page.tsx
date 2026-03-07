import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import { ThemeEditor } from '@/components/dashboard/ThemeEditor'
import { getThemes } from '@/app/dashboard/actions'

export default async function ThemesPage({ params }: { params: Promise<{ projectSlug: string }> }) {
    const { projectSlug } = await params
    const supabase = await createClient()

    // 1. Verify Project
    const { data: project } = await supabase
        .from('projects')
        .select('*')
        .eq('slug', projectSlug)
        .single()

    if (!project) {
        notFound()
    }

    // 2. Fetch Themes
    const themes = await getThemes(project.id)

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
                    <ThemeEditor themes={themes || []} projectId={project.id} />
                </div>
            </main>
        </div>
    )
}
