'use client'

import React, { useState, useEffect } from 'react'
import { ThemeConfig } from '@/types/database'

interface MapBlockProps {
    content: {
        address: string
        label?: string
        zoom?: number
    }
    config: ThemeConfig
}

export function MapBlock({ content, config }: MapBlockProps) {
    const [debouncedAddress, setDebouncedAddress] = useState(content.address)

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedAddress(content.address)
        }, 800) // 800ms debounce
        return () => clearTimeout(timer)
    }, [content.address])

    if (!debouncedAddress || debouncedAddress.trim() === '') return null

    const encodedAddress = encodeURIComponent(debouncedAddress)
    const zoom = content.zoom || 15
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY

    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`
    const staticMapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${encodedAddress}&zoom=${zoom}&size=600x400&markers=color:red%7C${encodedAddress}&key=${apiKey}`

    return (
        <div className="w-full flex flex-col items-center">
            <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full max-w-2xl overflow-hidden rounded-lg hover:opacity-90 transition-opacity duration-200 block"
                style={{
                    borderRadius: config.borders?.radius || '8px',
                    boxShadow: config.shadows?.style === 'hard' ? '4px 4px 0px 0px rgba(0,0,0,1)' :
                        config.shadows?.style === 'soft' ? '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)' :
                            'none'
                }}
            >
                {apiKey ? (
                    <img
                        src={staticMapUrl}
                        alt={`Carte pour ${content.address}`}
                        className="w-full h-auto object-cover aspect-video"
                    />
                ) : (
                    <div className="w-full aspect-video bg-pv-dark-100/50 flex flex-col items-center justify-center text-pv-white-0/50 border border-white/5 mx-auto">
                        <span className="mb-2">🗺️</span>
                        <p className="text-sm font-pv-jost">Aperçu carte indisponible (Clé API manquante)</p>
                        <p className="text-xs text-pv-white-0/30 mt-1">{content.address}</p>
                    </div>
                )}
            </a>
            {content.label && (
                <span className="mt-3 text-sm text-pv-white-0/60 font-pv-jost font-medium">
                    {content.label}
                </span>
            )}
        </div>
    )
}
