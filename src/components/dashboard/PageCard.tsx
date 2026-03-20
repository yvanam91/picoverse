'use client'

import { useState } from 'react'
import { MoreHorizontal, Trash2, ExternalLink, Calendar, Edit, Loader2, X, Check } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { deletePage } from '@/app/dashboard/actions'
import type { Page } from '@/types/database'
import { toast } from 'sonner'

import BorderGlow from '@/components/ui/BorderGlow'

interface PageCardProps {
    page: Page
    projectSlug: string
    onDelete?: (pageId: string) => void
    username?: string | null
}

export function PageCard({ page, projectSlug, onDelete, username }: PageCardProps) {
    const router = useRouter()
    const [isDeleting, setIsDeleting] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)

    const handleDelete = async () => {
        setIsDeleting(true)
        setShowConfirm(false)
        try {
            const result = await deletePage(page.project_id, page.id)
            if (result.error) {
                toast.error(result.error)
            } else {
                toast.success('Page supprimée')
                if (onDelete) {
                    onDelete(page.id)
                } else {
                    router.refresh()
                }
            }
        } catch (e) {
            toast.error('Erreur lors de la suppression')
        } finally {
            setIsDeleting(false)
        }
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return new Intl.DateTimeFormat('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        }).format(date)
    }

    // Extract bio or description if available
    const description = page.description || page.config?.bio || 'Aucune description fournie.'

    return (
        <BorderGlow 
            className="w-[222px] h-[304px] hover:shadow-md transition-shadow"
            backgroundColor="var(--pv-dark-0)"
            edgeSensitivity={30}
            glowColor="40 80 80"
            borderRadius={12}
            glowRadius={40}
            glowIntensity={1.0}
            coneSpread={25}
            animated={false}
            colors={['#c084fc', '#f472b6', '#38bdf8']}
        >
            <div className="absolute inset-0 card-page group flex flex-col justify-between p-pv-16 text-white-0 bg-transparent">
                <Link href={`/dashboard/${projectSlug}/pages/${page.id}`} className="absolute inset-0 z-0" aria-label={`Editer ${page.title}`} />

            <div className="z-10 pointer-events-none">
                <h3 className="text-lg font-semibold text-white-0 mb-2 truncate pr-8">
                    {page.title}
                </h3>

                <div className="flex items-center text-xs text-white-0/60 mb-4">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>Date de création : {formatDate(page.created_at)}</span>
                </div>

                <p className="text-sm text-white-0/80 line-clamp-4 flex-1 mt-2 mb-2 overflow-hidden break-words">
                    {description}
                </p>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-white-0/10 z-10 relative pointer-events-auto">
                <button
                    className="p-2 text-white-0/40 hover:text-red-400 hover:bg-red-400/10 rounded-full transition-colors"
                    onClick={(e) => {
                        e.stopPropagation()
                        e.preventDefault()
                        setShowConfirm(true)
                    }}
                >
                    {isDeleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                </button>

                <div className="flex gap-2">
                    {username && (
                        <a
                            href={`/${username}/${projectSlug}/${page.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-white-0/40 hover:text-pv-brand-500 hover:bg-pv-brand-500/10 rounded-full transition-colors"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <ExternalLink className="h-4 w-4" />
                        </a>
                    )}
                </div>
            </div>

            {/* Custom Confirmation Modal */}
            {showConfirm && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200" onClick={(e) => { e.stopPropagation(); e.preventDefault(); }}>
                    <div className="w-full max-w-xs bg-pv-dark-0 rounded-2xl border border-white-0/10 shadow-2xl p-6 animate-in zoom-in-95 duration-200" onClick={(e) => { e.stopPropagation(); e.preventDefault(); }}>
                        <p className="text-sm font-pv-bold text-white-0 uppercase tracking-tight mb-6 text-center leading-relaxed">
                            Confirmer la suppression de la page ?
                        </p>
                        <div className="flex gap-4">
                            <button
                                onClick={(e) => { e.stopPropagation(); e.preventDefault(); setShowConfirm(false); }}
                                className="flex-1 flex items-center justify-center gap-2 py-3 bg-white-0/5 text-white-0/60 hover:text-white-0 rounded-xl text-xs font-pv-bold transition-all uppercase tracking-tight border border-white-0/5"
                            >
                                <X className="h-4 w-4" />
                                Annuler
                            </button>
                            <button
                                onClick={(e) => { e.stopPropagation(); e.preventDefault(); handleDelete(); }}
                                className="flex-1 flex items-center justify-center gap-2 py-3 bg-red-500 text-white rounded-xl text-xs font-pv-bold hover:bg-red-600 transition-all uppercase tracking-tight shadow-lg shadow-red-500/20"
                            >
                                <Check className="h-4 w-4" />
                                Confirmer
                            </button>
                        </div>
                    </div>
                </div>
            )}
            </div>
        </BorderGlow>
    )
}
