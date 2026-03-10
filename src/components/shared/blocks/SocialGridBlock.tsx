import { PageConfig } from '@/types/database'
import { Globe, Twitter, Instagram, Facebook, Linkedin, Github } from 'lucide-react'

interface SocialGridBlockProps {
    content: {
        links?: Array<{ icon: string; url: string }>
    }
    config: PageConfig
}

const SOCIAL_ICONS_MAP: Record<string, typeof Globe> = {
    globe: Globe,
    twitter: Twitter,
    instagram: Instagram,
    facebook: Facebook,
    linkedin: Linkedin,
    github: Github
}

export function SocialGridBlock({ content, config }: SocialGridBlockProps) {
    const primaryColor = config.colors?.primary || (config as any).primary || config.buttonColor || 'var(--pico-primary)'
    const buttonTextColor = config.colors?.buttonText || (config as any).buttonText || config.buttonTextColor || 'var(--pico-btn-text)'

    return (
        <div className="flex flex-row flex-wrap justify-center gap-4 mb-6 w-full px-4">
            {content.links?.map((link, i) => {
                const Icon = SOCIAL_ICONS_MAP[link.icon] || Globe
                if (!link.url) return null

                return (
                    <a
                        key={i}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative h-12 w-12 flex items-center justify-center rounded-full transition-all duration-300 hover:scale-110 active:scale-95 shadow-sm"
                        style={{
                            backgroundColor: primaryColor,
                            boxShadow: 'var(--pico-shadow)'
                        }}
                    >
                        <Icon
                            className="h-5 w-5 transition-colors relative z-10"
                            style={{ color: buttonTextColor }}
                        />
                    </a>
                )
            })}
        </div>
    )
}
