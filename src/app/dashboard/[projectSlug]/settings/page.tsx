import { getProjectBySlug } from '@/app/dashboard/actions'
import { ProjectSettings } from '@/components/dashboard/ProjectSettings'
import { notFound } from 'next/navigation'

export default async function SettingsPage({
    params
}: {
    params: Promise<{ projectSlug: string }>
}) {
    const { projectSlug } = await params
    const project = await getProjectBySlug(projectSlug)

    if (!project) {
        notFound()
    }

    return (
        <div className="min-h-screen pv-dark-100">
            <header className="pv-dark-0 text-white-0">
                <div className="mx-auto max-w-7xl px-4 py-pv-20 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="font-pv-inter font-pv-bold text-pv-12 text-white-0">
                                Paramètres du projet
                            </h1>
                            <p className="mt-1 font-pv-inter font-pv-regular text-pv-12 text-white-0 opacity-70">
                                Gérez les informations générales et la suppression de votre projet.
                            </p>
                        </div>
                    </div>
                </div>
            </header>
            <main>
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        <ProjectSettings project={project} />
                    </div>
                </div>
            </main>
        </div>
    )
}
