import { ThemeConfig } from '@/types/database'

interface HeroBlockProps {
    content: {
        title: string
        text: string
        url?: string
        useSecondaryColor?: boolean
    }
    config: ThemeConfig
}

export function HeroBlock({ content, config }: HeroBlockProps) {
    const bgColor = content.useSecondaryColor && config.colors?.secondary
        ? config.colors.secondary
        : 'white';

    // Optional: Extracting text color based on secondary application or default.
    // Keeping it simple as requested, letting original static colors otherwise, but it's typically better to inherit.
    // I will let text colors as is unless specified, but if secondary is dark, black text might not be visible.
    // Given the task, I will change the background conditionally.

    return (
        <div
            className="w-full flex flex-col @md:flex-row items-center gap-6 p-6 rounded-2xl shadow-sm my-4"
            style={{
                backgroundColor: bgColor,
                borderRadius: config.borders?.radius || '1rem', // Optional, hook up with theme radius if applicable
            }}
        >
            {content.url && (
                <div className="w-full @md:w-1/2">
                    <img
                        src={content.url}
                        alt={content.title}
                        className="w-full h-64 object-cover rounded-xl shadow-sm"
                    />
                </div>
            )}
            <div className={`w-full ${content.url ? '@md:w-1/2' : ''} flex flex-col gap-3 text-center @md:text-left`}>
                <h2 className="text-2xl @md:text-3xl font-bold leading-tight" style={{ color: '#1f2937' }}>
                    {content.title}
                </h2>
                <p className="leading-relaxed whitespace-pre-wrap opacity-80" style={{ color: '#4b5563' }}>
                    {content.text}
                </p>
            </div>
        </div>
    )
}
