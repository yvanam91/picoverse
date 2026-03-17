'use client'

import { useState, useEffect } from 'react'
import { useActionState } from 'react' // or react-dom if using canary, next 15+ uses React.useActionState
// Next.js 16/React 19 might use 'react'
import { updateProfile } from './actions'
import { Loader2, Lock, AlertTriangle } from 'lucide-react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import PasswordModal from './PasswordModal'
import DeleteAccountModal from './DeleteAccountModal'

interface AccountFormClientProps {
    initialProfile: {
        full_name: string
        username: string
        email: string
    }
}

const initialState = {
    message: '',
    error: '',
    success: false
}

export default function AccountFormClient({ initialProfile }: AccountFormClientProps) {
    const [state, formAction, isPending] = useActionState(updateProfile, initialState)
    const [fullName, setFullName] = useState(initialProfile.full_name || '')
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const router = useRouter()

    const isDirty = fullName !== (initialProfile.full_name || '')

    useEffect(() => {
        if (state.success) {
            toast.success(state.message)
            router.refresh()
        } else if (state.error) {
            toast.error(state.error)
        }
    }, [state, router])

    return (
        <>
            <form action={formAction} className="space-y-6">
                {/* Information Personnelles */}
                <div className="bg-pv-dark-0 rounded-2xl border border-white-0/5 shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-white-0/5 bg-white-0/[0.02]">
                        <h2 className="text-lg font-pv-bold text-white-0 uppercase tracking-widest text-xs">Informations Personnelles</h2>
                    </div>
                    <div className="p-6 space-y-6">
                        <div>
                            <label htmlFor="full_name" className="block text-[10px] font-pv-bold text-white-0/40 uppercase tracking-widest mb-2">Nom d&apos;affichage</label>
                            <div className="mt-1">
                                <input
                                    id="full_name"
                                    name="full_name"
                                    type="text"
                                    maxLength={20}
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    className="block w-full bg-white-0/5 border border-white-0/10 rounded-xl p-3 text-white-0 placeholder:text-white-0/20 focus:outline-none focus:border-pv-brand-500 focus:placeholder-transparent transition-colors text-sm font-pv-regular"
                                    placeholder="Votre nom"
                                />
                                <div className="mt-2 flex justify-end">
                                    <span className="text-[10px] text-white-0/30 font-pv-medium">{fullName.length}/20</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-[10px] font-pv-bold text-white-0/40 uppercase tracking-widest mb-2">Slug Picoverse</label>
                            <div className="mt-1">
                                <input
                                    type="text"
                                    disabled
                                    value={initialProfile.username}
                                    className="block w-full bg-white-0/[0.02] border border-white-0/10 rounded-xl p-3 text-white-0/40 text-sm font-pv-regular cursor-not-allowed"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[10px] font-pv-bold text-white-0/40 uppercase tracking-widest mb-2">Email</label>
                            <div className="mt-1">
                                <input
                                    type="text"
                                    disabled
                                    value={initialProfile.email}
                                    className="block w-full bg-white-0/[0.02] border border-white-0/10 rounded-xl p-3 text-white-0/40 text-sm font-pv-regular cursor-not-allowed"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sécurité */}
                <div className="bg-pv-dark-0 rounded-2xl border border-white-0/5 shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-white-0/5 bg-white-0/[0.02] flex items-center gap-2">
                        <Lock className="h-4 w-4 text-white-0/40" />
                        <h2 className="text-lg font-pv-bold text-white-0 uppercase tracking-widest text-xs">Sécurité</h2>
                    </div>
                    <div className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <label className="block text-[10px] font-pv-bold text-white-0/40 uppercase tracking-widest mb-1">Mot de passe</label>
                                <div className="text-sm text-white-0 font-mono tracking-widest">
                                    ••••••••••••
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => setIsPasswordModalOpen(true)}
                                className="px-4 py-2 bg-white-0/5 text-white-0 font-pv-bold text-sm rounded-xl border border-white-0/10 hover:bg-white-0/10 transition-all"
                            >
                                Modifier
                            </button>
                        </div>
                    </div>
                </div>

                {/* Zone de Danger */}
                <div className="bg-red-500/5 rounded-2xl border border-red-500/20 shadow-sm overflow-hidden mt-8 transition-colors hover:bg-red-500/10">
                    <div className="px-6 py-4 border-b border-red-500/10 bg-red-500/[0.02] flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                        <h2 className="text-lg font-pv-bold text-red-500 uppercase tracking-widest text-xs">Zone de Danger</h2>
                    </div>
                    <div className="p-6">
                        <p className="text-sm text-white-0/60 font-pv-regular mb-6 italic leading-relaxed">
                            Une fois supprimé, votre profil et tous vos projets Picoverse seront effacés définitivement. Cette action est irréversible.
                        </p>
                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={() => setIsDeleteModalOpen(true)}
                                className="px-5 py-2.5 bg-red-500/10 text-red-500 font-pv-bold text-sm rounded-xl border border-red-500/20 hover:bg-red-500 hover:text-white transition-all shadow-sm"
                            >
                                Supprimer mon compte
                            </button>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end pt-4">
                    <button
                        type="submit"
                        disabled={!isDirty || isPending}
                        className={`pv-primary disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                        {isPending && <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />}
                        Mettre à jour mon profil
                    </button>
                </div>
            </form>

            <PasswordModal
                isOpen={isPasswordModalOpen}
                onClose={() => setIsPasswordModalOpen(false)}
            />

            <DeleteAccountModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
            />
        </>
    )
}
