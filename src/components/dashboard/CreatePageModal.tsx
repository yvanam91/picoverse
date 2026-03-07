'use client'

import { useState, useEffect } from 'react'
import { Plus, X, Loader2 } from 'lucide-react'
import { createPage, getPlanUsage } from '../../app/dashboard/actions'
import { slugify } from '@/utils/slugify'
import useSWR from 'swr'
import { useRouter } from 'next/navigation'
import type { Page } from '@/types/database'

import { toast } from 'sonner'

interface CreatePageModalProps {
    projectId: string
    onSuccess?: (page: Page) => void
    children?: React.ReactNode
}

export function CreatePageModal({ projectId, onSuccess, children }: CreatePageModalProps) {
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [title, setTitle] = useState('')
    const [slug, setSlug] = useState('')
    const [description, setDescription] = useState('')
    const [isSlugEdited, setIsSlugEdited] = useState(false)

    const { data: planUsage } = useSWR(isOpen ? `plan-usage-${projectId}` : null, () => getPlanUsage(projectId))
    const isLimitReached = planUsage && planUsage.pages.current >= planUsage.pages.max

    useEffect(() => {
        if (!isSlugEdited) {
            setSlug(slugify(title))
        }
    }, [title, isSlugEdited])

    async function onSubmit(formData: FormData) {
        setLoading(true)
        setError(null)
        try {
            const result = await createPage(projectId, formData)

            if (result?.error) {
                setError(result.error)
                // toast.error(result.error) // Remove redundant toast if error is shown in UI
                return
            }

            setIsOpen(false)
            setTitle('')
            setSlug('')
            setDescription('')
            setIsSlugEdited(false)

            if (onSuccess && result?.data) {
                onSuccess(result.data as Page)
            } else {
                // Fallback if no callback provided (e.g. if used elsewhere)
                router.refresh()
            }
        } catch (e) {
            const msg = e instanceof Error ? e.message : 'Une erreur est survenue'
            setError(msg)
            toast.error(msg)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            {children ? (
                <div onClick={() => setIsOpen(true)} className="cursor-pointer">
                    {children}
                </div>
            ) : (
                <button
                    onClick={() => setIsOpen(true)}
                    className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition-colors"
                >
                    <Plus className="h-4 w-4" />
                    Ajouter une page
                </button>
            )}

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
                    <div className="w-full max-w-md bg-pv-dark-0 rounded-2xl border border-white-0/10 shadow-2xl p-8 animate-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-xl font-pv-jost font-pv-bold text-white-0 uppercase tracking-wide">
                                Nouvelle page
                            </h3>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-white-0/40 hover:text-white-0 transition-colors"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {isLimitReached ? (
                            <div className="space-y-6">
                                <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl text-center">
                                    <p className="text-sm text-amber-500 font-pv-medium">
                                        Limite de pages atteinte ({planUsage?.pages.max}/{planUsage?.pages.max}).
                                    </p>
                                    <p className="mt-2 text-xs text-white-0/60 font-pv-regular italic">
                                        Passez au plan supérieur pour débloquer plus de pages.
                                    </p>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="w-full py-3 rounded-xl bg-white-0/5 text-white-0 font-pv-bold text-sm hover:bg-white-0/10 transition-all"
                                >
                                    Fermer
                                </button>
                            </div>
                        ) : (
                            <form action={onSubmit} className="space-y-6">
                                <div>
                                    <label
                                        htmlFor="title"
                                        className="block text-[10px] font-pv-bold text-white-0/40 uppercase tracking-widest mb-2"
                                    >
                                        Titre de la page
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        id="title"
                                        required
                                        maxLength={50}
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder="Ex: Ma Boutique"
                                        className="w-full bg-white-0/5 border border-white-0/10 rounded-xl p-3 text-white-0 placeholder:text-white-0/20 focus:outline-none focus:border-pv-brand-500 transition-colors text-sm font-pv-regular"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="slug"
                                        className="block text-[10px] font-pv-bold text-white-0/40 uppercase tracking-widest mb-2"
                                    >
                                        URL de la page
                                    </label>
                                    <div className="flex bg-white-0/5 border border-white-0/10 rounded-xl overflow-hidden focus-within:border-pv-brand-500 transition-colors">
                                        <span className="px-3 py-3 text-white-0/30 font-pv-medium text-sm border-r border-white-0/10">
                                            /
                                        </span>
                                        <input
                                            type="text"
                                            name="slug"
                                            id="slug"
                                            required
                                            maxLength={50}
                                            value={slug}
                                            onChange={(e) => {
                                                setSlug(e.target.value)
                                                setIsSlugEdited(true)
                                            }}
                                            placeholder="ma-boutique"
                                            className="flex-1 bg-transparent p-3 text-white-0 placeholder:text-white-0/20 focus:outline-none text-sm font-pv-regular"
                                        />
                                    </div>
                                </div>

                                {error && (
                                    <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
                                        <p className="text-xs text-red-500 font-pv-medium text-center">{error}</p>
                                    </div>
                                )}

                                <div className="flex gap-4 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsOpen(false)}
                                        className="flex-1 py-3 rounded-xl bg-white-0/5 text-white-0/60 font-pv-bold text-sm hover:bg-white-0/10 hover:text-white-0 transition-all"
                                    >
                                        Annuler
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="flex-1 py-3 rounded-xl bg-pv-brand-500 text-white-0 font-pv-bold text-sm hover:opacity-90 disabled:opacity-50 transition-all flex items-center justify-center"
                                    >
                                        {loading ? (
                                            <Loader2 className="h-5 w-5 animate-spin" />
                                        ) : (
                                            'Créer la page'
                                        )}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </>
    )
}
