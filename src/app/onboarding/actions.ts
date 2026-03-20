'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { checkUsernameAvailability } from '@/app/auth/actions'

export async function updateOnboardingUsername(username: string) {
    const supabase = await createClient()

    // 1. Verify Session
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: 'Non authentifié' }

    // 2. Validate Username
    const availability = await checkUsernameAvailability(username)
    if (!availability.available) {
        return { error: availability.error || 'Ce nom d\'utilisateur est déjà pris' }
    }

    // 3. Update Profile
    const { error } = await supabase
        .from('profiles')
        .update({ username: username })
        .eq('id', user.id)

    if (error) {
        console.error('Error updating onboarding username:', error)
        return { error: 'Erreur lors de la mise à jour' }
    }

    revalidatePath('/dashboard')
    revalidatePath('/onboarding')
    
    return { success: true }
}
