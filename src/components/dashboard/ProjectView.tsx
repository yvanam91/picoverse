'use client'
import { useState } from 'react'
import { CreatePageModal } from './CreatePageModal'
import { File, ArrowLeft, ExternalLink, Plus } from 'lucide-react'
import Link from 'next/link'
import type { Page, Project } from '@/types/database'
import { PageCard } from './PageCard'

interface ProjectViewProps {
    project: Project
    initialPages: Page[]
    username?: string | null
}

export function ProjectView({ project, initialPages, username }: ProjectViewProps) {
    const [pages, setPages] = useState<Page[]>(initialPages)

    const handlePageCreated = (newPage: Page) => {
        setPages((prev) => [newPage, ...prev])
    }

    const handlePageDeleted = (pageId: string) => {
        setPages((prev) => prev.filter(p => p.id !== pageId))
    }

    return (
        <div className="min-h-screen pv-dark-100">
            <header className="bg-pv-dark-0 text-white-0">
                <div className="mx-auto max-w-7xl px-4 py-pv-20 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="font-pv-inter font-pv-bold text-pv-12 text-white-0">
                                {project.name}
                            </h1>
                            <p className="mt-1 font-pv-inter font-pv-regular text-pv-12 text-white-0 opacity-70">
                                Gérez les pages de votre projet
                            </p>
                        </div>
                    </div>
                </div>
            </header>
            <main>
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 min-[500px]:grid-cols-2 min-[992px]:grid-cols-3 gap-6 w-fit mx-auto justify-items-start">
                        <CreatePageModal projectId={project.id} onSuccess={handlePageCreated}>
                            <div id="action-add-page" className="w-[222px] h-[304px] border-[4px] border-dashed border-pv-brand-900 rounded-xl p-6 flex flex-col items-center justify-center hover:opacity-80 cursor-pointer transition-all group text-pv-brand-900">
                                <div className="h-12 w-12 rounded-full bg-pv-gradient-soft border-[4px] border-pv-brand-900 flex items-center justify-center mb-4 transition-colors">
                                    <Plus className="h-5 w-5 text-pv-brand-900 group-hover:scale-110 transition-transform" />
                                </div>
                                <span className="font-pv-inter font-pv-bold text-pv-16 text-center">Ajouter une page</span>
                            </div>
                        </CreatePageModal>

                        {pages.map((page) => (
                            <PageCard
                                key={page.id}
                                page={page}
                                projectSlug={project.slug}
                                onDelete={handlePageDeleted}
                                username={username}
                            />
                        ))}
                    </div>

                    {pages.length === 0 && (
                        <div className="hidden">
                            {/* Fallback or specific empty state logic if we didn't want the Add Card in grid. 
                                 But user requested Add Card as last item, so even if list is empty, 
                                 the Add Card above serves as the empty state action. 
                             */}
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}
