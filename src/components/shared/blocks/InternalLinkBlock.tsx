'use client'

import { PageConfig } from '@/types/database'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface InternalLinkBlockProps {
    content: {
        title: string
        targetPageId: string
        slug: string
    }
    config: PageConfig
}

export function InternalLinkBlock({ content, config }: InternalLinkBlockProps) {
    const pathname = usePathname()
    
    // Helper to get button inline styles
    const getButtonStyle = (): React.CSSProperties => {
        const primary = config.colors?.primary || config.buttonColor || '#000000'
        const secondary = config.colors?.secondary || config.secondaryColor || '#e5e7eb'
        const buttonText = config.colors?.buttonText || config.buttonTextColor || '#ffffff'

        const buttonStyle = config.buttonStyle || 'rounded-md'
        const buttonVariant = config.buttonVariant || 'fill'

        const baseStyle: React.CSSProperties = {
            borderRadius: buttonStyle === 'rounded-full' ? '9999px' : buttonStyle === 'rounded-none' ? '0px' : '8px',
            borderWidth: buttonVariant === 'outline' ? '2px' : buttonVariant === 'soft-shadow' ? '1px' : '0px',
            transition: 'all 0.2s',
            borderStyle: 'solid',
            boxShadow: 'var(--pico-shadow)' // Apply shadow
        }

        if (buttonVariant === 'outline') {
            return {
                ...baseStyle,
                backgroundColor: 'transparent',
                color: primary,
                borderColor: secondary // Use secondary
            }
        } else if (buttonVariant === 'soft-shadow') {
            return {
                ...baseStyle,
                backgroundColor: '#ffffff',
                color: '#000000',
                boxShadow: `0 4px 12px ${primary}40`,
                borderColor: secondary, // Use secondary
                borderWidth: '1px'
            }
        } else {
            // Default 'fill'
            return {
                ...baseStyle,
                backgroundColor: primary,
                color: buttonText,
                borderColor: secondary // Use secondary for border if defined
            }
        }
    }

    let href = `/${content.slug}`
    if (pathname) {
        const parts = pathname.split('/')
        // Structure standard de Picoverse : /p/[username]/[projectSlug]/[pageSlug]
        if (parts[1] === 'p' && parts.length >= 5) {
            const username = parts[2]
            const projectSlug = parts[3]
            href = `/p/${username}/${projectSlug}/${content.slug}`
        } else if (parts[1] !== 'dashboard') {
            // Fallback générique pour les autres layouts : remplacer la dernière partie
            parts[parts.length - 1] = content.slug
            href = parts.join('/')
        }
    }

    return (
        <Link
            href={href}
            target="_self"
            className="group relative flex w-full items-center justify-center px-6 py-4 shadow-sm transition-all hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-md hover:opacity-95"
            style={getButtonStyle()}
        >
            <div className="font-medium text-lg text-center">
                {content.title}
            </div>
            <ArrowRight className="absolute right-4 h-5 w-5 opacity-0 transition-opacity group-hover:opacity-100" />
        </Link>
    )
}
