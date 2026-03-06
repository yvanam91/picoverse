'use client'

import { useEffect } from 'react'
import { usePicoverseAnalytics } from '@/hooks/usePicoverseAnalytics'

interface AnalyticsTrackerProps {
    projectId: string
    pageId: string
}

/**
 * AnalyticsTracker
 * Client component that manages global click tracking and visit tracking.
 * Handled via Event Delegation to keep blocks simple and performant.
 */
export function AnalyticsTracker({ projectId, pageId }: AnalyticsTrackerProps) {
    const { trackClick } = usePicoverseAnalytics(projectId, pageId)

    useEffect(() => {
        const handleGlobalClick = (e: MouseEvent) => {
            // Check if user clicked on (or inside) a element with data-pv-block-id
            const target = e.target as HTMLElement
            const blockElement = target.closest('[data-pv-block-id]')

            if (blockElement) {
                const blockId = blockElement.getAttribute('data-pv-block-id')
                const blockType = blockElement.getAttribute('data-pv-block-type')

                if (blockId && blockType) {
                    trackClick(blockId, blockType)
                }
            }
        }

        window.addEventListener('click', handleGlobalClick, { capture: true })
        return () => window.removeEventListener('click', handleGlobalClick, { capture: true })
    }, [trackClick])

    return null
}
