'use server'

import { cookies } from 'next/headers'
import { Resend } from 'resend'
import { ContactNotificationEmail } from '../../../emails/contactNotificationEmail'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendContactEmail(formData: FormData) {
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const subject = formData.get('subject') as string
    const message = formData.get('message') as string

    if (!name || !email || !message || !subject) {
        return { error: 'Tous les champs sont obligatoires' }
    }

    try {
        const { error } = await resend.emails.send({
            from: 'Picoverse <yvan@picover.se>',
            to: ['yvan@picover.se'],
            subject: `[Contact] ${subject} - de ${name}`,
            react: ContactNotificationEmail({ name, email, message }),
        })

        if (error) {
            console.error('Resend error:', error)
            return { error: "Erreur lors de l'envoi de l'email via Resend" }
        }

        return { success: true }
    } catch (err) {
        console.error('Contact action error:', err)
        return { error: 'Une erreur inattendue est survenue' }
    }
}

export async function markUserAsRecognized() {
  const cookieStore = await cookies()
  cookieStore.set('recognized', 'true', {
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  })
}
