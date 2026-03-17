'use client'

import { PageConfig } from '@/types/database'
import { UserPlus } from 'lucide-react'

interface ContactBlockProps {
    content: {
        firstName: string
        lastName: string
        phone: string
        email: string
        org?: string
        jobTitle?: string
    }
    config: PageConfig
}

export function ContactBlock({ content, config }: ContactBlockProps) {
    const primaryColor = config.colors?.primary || (config as any).primary || config.buttonColor || 'var(--pico-primary)'
    const buttonTextColor = config.colors?.buttonText || (config as any).buttonText || config.buttonTextColor || 'var(--pico-btn-text)'
    
    // Style determination
    const bStyle = config.borders?.radius || config.buttonStyle
    let borderRadius = '8px'
    if (bStyle === 'rounded-full') borderRadius = '9999px'
    if (bStyle === 'rounded-none') borderRadius = '0px'
    if (bStyle && bStyle.includes('px')) borderRadius = bStyle

    const handleDownload = () => {
        const { firstName, lastName, phone, email, org, jobTitle } = content
        
        // Basic escaping/sanitization for vCard values
        const clean = (val?: string) => val ? val.replace(/\n/g, ' ').trim() : ''
        
        const vCard = [
            'BEGIN:VCARD',
            'VERSION:3.0',
            `FN:${clean(firstName)} ${clean(lastName)}`,
            `N:${clean(lastName)};${clean(firstName)};;;`,
            `TEL;TYPE=CELL:${clean(phone)}`,
            `EMAIL:${clean(email)}`,
            org ? `ORG:${clean(org)}` : '',
            jobTitle ? `TITLE:${clean(jobTitle)}` : '',
            'END:VCARD'
        ].filter(Boolean).join('\r\n')

        const blob = new Blob([vCard], { type: 'text/vcard;charset=utf-8' })
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', `${clean(firstName)}_${clean(lastName)}.vcf`)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        
        // Delay revocation to ensure download starts
        setTimeout(() => window.URL.revokeObjectURL(url), 100)
    }

    return (
        <div className="w-full px-4 mb-4">
            <button
                onClick={handleDownload}
                className="group relative flex w-full items-center justify-center px-6 py-4 shadow-sm transition-all hover:-translate-y-0.5 hover:scale-[1.01] hover:shadow-md active:scale-[0.98]"
                style={{
                    backgroundColor: primaryColor,
                    color: buttonTextColor,
                    borderRadius: borderRadius,
                    boxShadow: 'var(--pico-shadow)'
                }}
            >
                <UserPlus className="mr-2 h-5 w-5 opacity-80 group-hover:opacity-100 transition-opacity" />
                <span className="font-semibold text-base">
                    Ajouter aux contacts
                </span>
            </button>
        </div>
    )
}
