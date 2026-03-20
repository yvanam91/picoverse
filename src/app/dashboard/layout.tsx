import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const supabase = await createClient()

    // 1. Verify Session
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        redirect('/login')
    }

    // 2. Check/Create Profile
    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle()

    if (!profile) {
        console.log('--- Missing profile in DashboardLayout, creating it... ---')
        const metadata = user.user_metadata || {}
        const username = metadata.username || user.email?.split('@')[0] || `user_${user.id.slice(0, 5)}`

        const { error: insertError } = await supabase.from('profiles').insert({
            id: user.id,
            username: username,
            full_name: metadata.full_name || metadata.display_name || username,
            plan: 'free' // Default to lowercase free
        })

        if (insertError) {
            console.error('Error auto-creating profile in layout:', insertError)
            // Still proceed to children, but next layers might fail
        } else {
            // Re-check for redirection
            if (!username) {
                redirect('/onboarding')
            }
        }
    } else {
        // 3. Mandatory Onboarding Check (Username)
        if (!profile.username) {
            redirect('/onboarding')
        }
    }

    return <>{children}</>
}
