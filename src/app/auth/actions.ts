'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { headers, cookies } from 'next/headers'
import { resend } from '@/lib/resend'
import { WelcomeEmail } from '../../../emails/welcomeEmail'
import { ResetPasswordEmail } from '../../../emails/resetPasswordEmail'
import { createAdminClient } from '@/utils/supabase/admin'
import { getPostHogClient } from '@/lib/posthog-server'

// --- TYPES ---

export type AuthState = {
    error?: string
    success?: boolean
    message?: string
} | null | undefined

interface UpdateAccountData {
    displayName: string
    email: string
    oldPassword?: string
    newPassword?: string
}

// --- CONSTANTS & HELPERS ---

const USERNAME_REGEX = /^[a-zA-Z0-9_-]+$/
const USERNAME_STRICT_REGEX = /^[a-zA-Z0-9\s\-_'’\u00C0-\u017F]+$/

const normalizeForSlug = (name: string) => {
    return name
        .toLowerCase()
        .trim()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") // Remove accents
        .replace(/['’]/g, "")             // Remove apostrophes
        .replace(/\s+/g, '_')             // Space -> Underscore
        .replace(/[^\w-]/g, '');          // Keep only alphanum, _, -
}

// --- ACTIONS ---

export async function signOut() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (user) {
        const posthog = getPostHogClient()
        posthog.capture({
            distinctId: user.id,
            event: 'user_logged_out',
        })
    }

    await supabase.auth.signOut()
    revalidatePath('/', 'layout')
    redirect('/login')
}

export async function updateAccountSettings(data: UpdateAccountData) {
    const supabase = await createClient()

    // 1. Verify Session
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: 'Non authentifié' }

    // 2. Handle Password Change if requested
    if (data.newPassword && data.oldPassword) {
        const { error: signInError } = await supabase.auth.signInWithPassword({
            email: user.email!,
            password: data.oldPassword
        })

        if (signInError) {
            return { error: 'L\'ancien mot de passe est incorrect.' }
        }

        const { error: updatePwError } = await supabase.auth.updateUser({ password: data.newPassword })
        if (updatePwError) {
            return { error: `Erreur mot de passe: ${updatePwError.message}` }
        }
    }

    // 3. Update Profile & Email
    const updates: any = {
        data: { full_name: data.displayName }
    }

    if (data.email !== user.email) {
        updates.email = data.email
    }

    const { error: updateError } = await supabase.auth.updateUser(updates)

    if (updateError) {
        return { error: `Erreur mise à jour: ${updateError.message}` }
    }

    revalidatePath('/dashboard', 'layout')
    return { success: true }
}

export async function checkUsernameAvailability(username: string): Promise<{ available: boolean; error?: string }> {
    if (!username) return { available: false, error: 'Nom d\'utilisateur requis' }
    if (username.length < 3) return { available: false, error: 'Trop court (3 min)' }
    if (!USERNAME_REGEX.test(username)) return { available: false, error: 'Caractères invalides (lettres, chiffres, - et _ uniquement)' }

    const supabase = await createClient()
    const { data, error } = await supabase
        .from('profiles')
        .select('username')
        .eq('username', username)
        .single()

    if (error && error.code !== 'PGRST116') {
        console.error('Error checking username:', error)
        return { available: false, error: 'Erreur lors de la vérification' }
    }

    if (data) {
        return { available: false, error: 'Ce nom d\'utilisateur est déjà pris' }
    }

    return { available: true }
}

export async function checkEmailAvailability(email: string): Promise<{ available: boolean; error?: string }> {
    if (!email) return { available: false, error: 'Email requis' }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) return { available: false, error: 'Format d\'email invalide' }

    const supabase = await createClient()
    const { data, error } = await supabase
        .from('profiles')
        .select('email')
        .eq('email', email)
        .single()

    if (error && error.code !== 'PGRST116') {
        console.error('Error checking email:', error)
        return { available: true }
    }

    if (data) {
        return { available: false, error: 'Cette adresse e-mail est déjà associée à un compte.' }
    }

    return { available: true }
}

export async function signUp(prevState: AuthState, formData: FormData): Promise<AuthState> {
    try {
        const email = formData.get('email') as string
        const password = formData.get('password') as string
        const confirmPassword = formData.get('confirmPassword') as string
        const rawUsername = formData.get('username') as string
        const rgpd = formData.get('rgpd')

        if (!email || !password || !rawUsername) {
            return { error: 'Tous les champs sont requis' }
        }

        if (password !== confirmPassword) {
            return { error: 'Les mots de passe ne correspondent pas' }
        }

        if (!rgpd) {
            return { error: 'Vous devez accepter les conditions (RGPD)' }
        }

        // Password strength
        const hasUpperCase = /[A-Z]/.test(password)
        const hasLowerCase = /[a-z]/.test(password)
        const isLongEnough = password.length >= 10
        if (!hasUpperCase || !hasLowerCase || !isLongEnough) {
            return { error: 'Le mot de passe ne respecte pas les critères de sécurité' }
        }

        // Normalize Username for Slug
        const normalizedUsername = normalizeForSlug(rawUsername)

        // Check Availability (on the SLUG)
        const usernameCheck = await checkUsernameAvailability(normalizedUsername)
        if (!usernameCheck.available) {
            return { error: usernameCheck.error || 'Ce nom d\'utilisateur est déjà pris' }
        }

        const emailCheck = await checkEmailAvailability(email)
        if (!emailCheck.available) {
            return { error: emailCheck.error || 'Cet email est déjà utilisé' }
        }

        const supabase = await createClient()

        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: 'https://picover.se/login?verified=true',
                data: {
                    username: normalizedUsername,
                    full_name: rawUsername,
                    display_name: rawUsername
                },
            },
        })

        if (error) {
            return { error: error.message }
        }

        // Track signup server-side
        try {
            const posthog = getPostHogClient()
            posthog.capture({
                distinctId: email,
                event: 'user_signed_up',
                properties: {
                    username: normalizedUsername,
                    email,
                },
            })
        } catch (phError) {
            console.error('PostHog error:', phError)
        }

        // Envoi de l'e-mail de bienvenue via Resend
        try {
            await resend.emails.send({
                from: process.env.NEXT_PUBLIC_EMAIL_FROM || 'Picoverse <onboarding@resend.dev>',
                to: email,
                subject: "Bienvenue dans l'univers Picoverse 🚀",
                react: WelcomeEmail({ firstName: rawUsername }),
            });
        } catch (emailError) {
            console.error('Erreur lors de l\'envoi de l\'e-mail de bienvenue:', emailError);
        }

        // Set recognized cookie
        try {
            const cookieStore = await cookies()
            cookieStore.set('recognized', 'true', {
                maxAge: 60 * 60 * 24 * 30, // 30 days
                path: '/',
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
            })
        } catch (cookieError) {
            console.error('Cookie error:', cookieError)
        }

        return { success: true, message: `Un lien de confirmation a été envoyé à ${email}.` }
    } catch (err: any) {
        console.error('Unhandled signUp error:', err)
        return { error: "Une erreur inattendue est survenue lors de l'inscription." }
    }
}

export async function signIn(prevState: AuthState, formData: FormData): Promise<AuthState> {
    let success = false
    try {
        const email = formData.get('email') as string
        const password = formData.get('password') as string

        if (!email || !password) {
            return { error: 'Email et mot de passe requis' }
        }

        const supabase = await createClient()

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (error) {
            if (error.message.includes('Email not confirmed')) {
                return { error: 'Veuillez confirmer votre adresse e-mail pour accéder à votre dashboard.' }
            }
            return { error: 'Identifiants incorrects' }
        }

        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
            try {
                const posthog = getPostHogClient()
                posthog.identify({
                    distinctId: user.id,
                    properties: { email: user.email },
                })
                posthog.capture({
                    distinctId: user.id,
                    event: 'user_logged_in',
                    properties: { email: user.email },
                })
            } catch (phError) {
                console.error('PostHog error in signIn:', phError)
            }
        }

        const cookieStore = await cookies()
        cookieStore.set('recognized', 'true', {
            maxAge: 60 * 60 * 24 * 30, // 30 days
            path: '/',
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
        })

        revalidatePath('/', 'layout')
        success = true
    } catch (err: any) {
        console.error('Unhandled signIn error:', err)
        return { error: "Une erreur inattendue est survenue lors de la connexion." }
    }

    if (success) {
        redirect('/dashboard')
    }
}

// --- FORGOT & RESET PASSWORD ---

export async function forgotPassword(prevState: any, formData: FormData) {
    const email = formData.get('email') as string
    if (!email) return { error: 'Email requis' }

    const supabase = await createClient()
    const admin = createAdminClient()

    const { data: profile } = await supabase
        .from('profiles')
        .select('username')
        .eq('email', email)
        .single()

    const firstName = profile?.username || 'Utilisateur'

    const { data, error } = await admin.auth.admin.generateLink({
        type: 'recovery',
        email: email,
    })

    if (error) {
        return { success: true, message: 'Surveille tes mails, tu recevras vite un lien pour modifier ton mot de passe si un compte est associé à cette adresse' }
    }

    const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/confirm?token_hash=${data.properties.hashed_token}&type=recovery&next=/auth/reset-password`

    try {
        await resend.emails.send({
            from: process.env.NEXT_PUBLIC_EMAIL_FROM || 'Picoverse <onboarding@resend.dev>',
            to: email,
            subject: "Réinitialisation de ton mot de passe Picoverse 🔒",
            react: ResetPasswordEmail({
                firstName,
                resetLink: resetLink
            }),
        });
    } catch (err) {
        console.error('Error sending reset email:', err)
    }

    const posthog = getPostHogClient()
    posthog.capture({
        distinctId: email,
        event: 'password_reset_requested',
        properties: { email },
    })

    return { success: true, message: 'Surveille tes mails, tu recevras vite un lien pour modifier ton mot de passe si un compte est associé à cette adresse' }
}

export async function resetPassword(prevState: any, formData: FormData) {
    const password = formData.get('password') as string
    const confirmPassword = formData.get('confirmPassword') as string

    if (!password || !confirmPassword) {
        return { error: 'Tous les champs sont requis' }
    }

    if (password !== confirmPassword) {
        return { error: 'Les mots de passe ne correspondent pas' }
    }

    if (password.length < 10) {
        return { error: 'Le mot de passe doit faire au moins 10 caractères' }
    }

    const supabase = await createClient()
    const { error } = await supabase.auth.updateUser({ password })

    if (error) {
        return { error: `Erreur: ${error.message}` }
    }

    return { success: true, message: 'Ton mot de passe a bien été modifié ! Tu es maintenant connecté à ton compte.' }
}
