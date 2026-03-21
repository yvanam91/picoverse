import Link from 'next/link'
import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import { cn } from '@/lib/utils'

import { User } from 'lucide-react'

interface SmartCTAProps {
    className?: string
    variant?: 'navbar' | 'hero'
}

export async function SmartCTA({ className, variant = 'hero' }: SmartCTAProps) {
    const cookieStore = await cookies()
    const isRecognized = cookieStore.get('recognized')
    const supabase = await createClient()

    // Check session only if recognized cookie exists to save resources/time if not needed?
    // User prompt: "Utilise supabase.auth.getUser() pour vérifier si une session active existe."
    // Logic: 
    // - Cookie ABSENT -> "Démarrer" -> /signup
    // - Cookie PRESENT -> "Accéder à mon compte" -> Check Session -> /dashboard or /login

    let href = '/signup'
    let label = 'Démarrer'

    if (isRecognized) {
        const { data: { user } } = await supabase.auth.getUser()
        href = user ? '/dashboard' : '/login'
        label = 'Accéder à mon compte'
    }

    if (variant === 'navbar') {
        return (
            <Link
                href={href}
                className={cn(
                    "pv-primary shrink-0",
                    "max-[420px]:size-10 max-[420px]:p-0",
                    className
                )}
            >
                <span className="max-[420px]:hidden">{label}</span>
                <User className="hidden max-[420px]:block size-5" />
            </Link>
        )
    }

    // Hero variant
    return (
        <Link
            href={href}
            className={cn(
                "pv-primary px-8 py-3",
                className
            )}
        >
            {label}
        </Link>
    )
}
