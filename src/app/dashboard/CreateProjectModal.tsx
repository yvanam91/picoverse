'use client'

import { useState } from 'react'
import { Plus, X, Loader2 } from 'lucide-react'
import { createProject, getPlanUsage } from './actions'
import { useRouter } from 'next/navigation'
import useSWR from 'swr'

interface CreateProjectModalProps {
    open?: boolean
    onOpenChange?: (open: boolean) => void
}

export function CreateProjectModal({ open, onOpenChange }: CreateProjectModalProps = {}) {
    const [internalIsOpen, setInternalIsOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const isControlled = open !== undefined && onOpenChange !== undefined
    const isOpen = isControlled ? open : internalIsOpen
    const setIsOpen = isControlled ? onOpenChange : setInternalIsOpen
    const router = useRouter()

    const { data: planUsage } = useSWR(isOpen ? 'plan-usage' : null, () => getPlanUsage())
    const isLimitReached = planUsage && planUsage.projects.current >= planUsage.projects.max

    async function onSubmit(formData: FormData) {
        setLoading(true)
        setError(null)
        try {
            const { data } = await createProject(formData)
            setIsOpen(false)
            if (data?.slug) {
                router.push(`/dashboard/${data.slug}/pages`)
                router.refresh()
            }
        } catch (e) {
            setError(e instanceof Error ? e.message : 'Une erreur est survenue')
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            {!isControlled && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="pv-primary w-full gap-3 shadow-lg shadow-pv-brand-500/20 active:scale-[0.98] transition-all"
                >
                    <Plus className="h-5 w-5" />
                    Créer mon premier projet
                </button>
            )}

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
                    <div className="w-full max-w-md bg-pv-dark-0 rounded-2xl border border-white-0/10 shadow-2xl p-8 animate-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-xl font-pv-jost font-pv-bold text-white-0 uppercase tracking-wide">
                                Créer un projet
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
                                        Limite de projets atteinte ({planUsage?.projects.max}/{planUsage?.projects.max}).
                                    </p>
                                    <p className="mt-2 text-xs text-white-0/60 font-pv-regular italic">
                                        Passez au plan Pro pour débloquer plus de projets.
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
                                        htmlFor="name"
                                        className="block text-[10px] font-pv-bold text-white-0/40 uppercase tracking-widest mb-2"
                                    >
                                        Nom du projet
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        required
                                        placeholder="Ex: Mon Portfolio"
                                        className="w-full bg-white-0/5 border border-white-0/10 rounded-xl p-3 text-white-0 placeholder:text-white-0/20 focus:outline-none focus:border-pv-brand-500 transition-colors text-sm font-pv-regular"
                                    />
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
                                            'Créer le projet'
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
