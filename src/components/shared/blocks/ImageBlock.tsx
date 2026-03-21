import { ThemeConfig } from '@/types/database'
import Image from 'next/image'

interface ImageBlockProps {
    content: {
        url: string
        title?: string
    }
    config: ThemeConfig
}

export function ImageBlock({ content, config }: ImageBlockProps) {
    return (
        <div className="w-full relative">
            <Image
                src={content.url}
                alt={content.title || 'Image'}
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-auto rounded-lg shadow-sm object-cover"
                style={{ maxHeight: '500px' }}
                priority
            />
        </div>
    )
}
