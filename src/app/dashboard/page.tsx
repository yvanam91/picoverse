import { createClient } from '@/utils/supabase/server'
import { CreateProjectModal } from './CreateProjectModal'
import { Folder, LogOut } from 'lucide-react'
import { redirect } from 'next/navigation'
import type { Project } from '@/types/database'
import { signOut } from '@/app/auth/actions'

export default async function DashboardPage() {
    const supabase = await createClient()
    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        return null
    }

    const { data: projects } = await supabase
        .from('projects')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

    if (projects && projects.length > 0) {
        redirect(`/dashboard/${projects[0].slug}/pages`)
    }

    return (
        <div className="min-h-screen bg-pv-dark-100 flex flex-col justify-center items-center p-4">
            <div className="text-center py-16 px-8 sm:px-12 bg-pv-dark-0 border border-white-0/10 rounded-[32px] shadow-2xl max-w-md w-full animate-in fade-in zoom-in duration-500">
                <div className="h-20 w-20 bg-pv-gradient-soft rounded-3xl mx-auto flex items-center justify-center mb-8 shadow-lg shadow-pv-brand-500/10 scale-110">
                    <Folder className="h-10 w-10 text-white-0" />
                </div>

                <h3 className="text-2xl font-pv-jost font-pv-bold text-white-0 uppercase tracking-widest">
                    Bienvenue
                </h3>
                <p className="mt-4 text-sm text-white-0/50 font-pv-regular italic leading-relaxed">
                    Créez votre premier projet pour commencer l&apos;aventure Picoverse.
                </p>

                <div className="mt-10 space-y-4">
                    <CreateProjectModal />

                    <form action={signOut}>
                        <button
                            type="submit"
                            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-pv-bold text-white-0/30 hover:text-red-400 hover:bg-red-400/5 transition-all uppercase tracking-widest"
                        >
                            <LogOut className="h-3 w-3" />
                            Se déconnecter
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
