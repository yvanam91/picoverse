'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, ArrowRight, User } from 'lucide-react'
import { toast } from 'sonner'
import { updateOnboardingUsername } from '@/app/onboarding/actions'

export default function OnboardingPage() {
    const [username, setUsername] = useState('')
    const [isPending, setIsPending] = useState(false)
    const router = useRouter()

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (!username || username.length < 3) {
            toast.error('Le nom d\'utilisateur doit faire au moins 3 caractères')
            return
        }

        setIsPending(true)
        const result = await updateOnboardingUsername(username)
        setIsPending(false)

        if (result?.error) {
            toast.error(result.error)
        } else {
            toast.success('Profil complété !')
            router.push('/dashboard')
        }
    }

    return (
        <div className="min-h-screen bg-pv-dark-100 flex flex-col justify-center items-center p-4">
            <div className="text-center py-12 px-8 sm:px-12 bg-pv-dark-0 border border-white-0/10 rounded-[32px] shadow-2xl max-w-md w-full animate-in fade-in zoom-in duration-500">
                <div className="h-20 w-20 bg-pv-gradient-soft rounded-3xl mx-auto flex items-center justify-center mb-8 shadow-lg shadow-pv-brand-500/10 scale-110">
                    <User className="h-10 w-10 text-white-0" />
                </div>

                <h3 className="text-2xl font-pv-jost font-pv-bold text-white-0 uppercase tracking-widest">
                    Dernière étape
                </h3>
                <p className="mt-4 text-sm text-white-0/50 font-pv-regular italic leading-relaxed">
                    Choisissez votre nom d&apos;utilisateur public. Il servira à l&apos;URL de vos futurs projets.
                </p>

                <form onSubmit={handleSubmit} className="mt-10 space-y-6">
                    <div className="space-y-1">
                        <div className="relative">
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/\s/g, '_'))}
                                placeholder="mon_pseudo"
                                className="block w-full bg-white-0/5 border border-white-0/10 rounded-[18px] p-4 text-white-0 placeholder:text-white-0/20 focus:outline-none focus:border-pv-brand-500 focus:placeholder-transparent transition-all text-center text-lg font-pv-bold tracking-tight"
                            />
                        </div>
                        <p className="text-[10px] text-white-0/20 font-pv-medium uppercase tracking-[0.2em]">
                            picover.se/{username || '...'}
                        </p>
                    </div>

                    <button
                        type="submit"
                        disabled={isPending}
                        className="w-full flex items-center justify-center gap-3 py-4 px-6 rounded-[20px] bg-pv-brand-500 text-white-0 font-pv-bold text-sm hover:bg-pv-brand-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-pv-brand-500/20 active:scale-95 group"
                    >
                        {isPending ? (
                            <Loader2 className="h-5 w-5 animate-spin" />
                        ) : (
                            <>
                                Commencer l&apos;aventure
                                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    )
}
