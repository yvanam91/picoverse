'use client'

import { QRCodeCanvas } from 'qrcode.react'
import { Download, QrCode, Copy, Check } from 'lucide-react'
import { useState, useRef } from 'react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

interface QRCodeCardProps {
    url: string
    title?: string
    description?: string
    showInput?: boolean
    className?: string
}

export function QRCodeCard({ 
    url: initialUrl, 
    title = "QR Code", 
    description, 
    showInput = false,
    className 
}: QRCodeCardProps) {
    const [url, setUrl] = useState(initialUrl)
    const [copied, setCopied] = useState(false)
    const canvasRef = useRef<HTMLCanvasElement>(null)

    const downloadQRCode = () => {
        if (!canvasRef.current) return

        const canvas = canvasRef.current
        const pngUrl = canvas
            .toDataURL("image/png")
            .replace("image/png", "image/octet-stream")

        const downloadLink = document.createElement("a")
        downloadLink.href = pngUrl
        downloadLink.download = `qrcode-${title.toLowerCase().replace(/\s+/g, '-')}.png`
        document.body.appendChild(downloadLink)
        downloadLink.click()
        document.body.removeChild(downloadLink)
        
        toast.success('QR Code téléchargé !')
    }

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(url)
            setCopied(true)
            toast.success('Lien copié !')
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            toast.error('Erreur lors de la copie')
        }
    }

    return (
        <div className={cn(
            "bg-pv-dark-200 border border-white/10 rounded-2xl p-6 shadow-xl flex flex-col items-center gap-6",
            className
        )}>
            <div className="w-full">
                <div className="flex items-center gap-2 mb-1">
                    <QrCode className="h-4 w-4 text-pv-brand-500" />
                    <h3 className="text-sm font-pv-bold text-white-0 uppercase tracking-widest">{title}</h3>
                </div>
                {description && (
                    <p className="text-xs text-white-0/40 font-pv-regular">{description}</p>
                )}
            </div>

            {showInput && (
                <div className="w-full space-y-2">
                    <label className="block text-[10px] font-pv-medium text-white-0/40 uppercase tracking-widest">
                        URL de destination
                    </label>
                    <div className="flex gap-2">
                        <input
                            type="url"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="https://votre-lien.com"
                            className="flex-1 bg-pv-dark-100 border border-white/10 rounded-lg px-3 py-2 text-xs text-white-0 focus:outline-none focus:ring-1 focus:ring-pv-brand-500 transition-all"
                        />
                        <button
                            onClick={copyToClipboard}
                            className="p-2 bg-pv-dark-100 border border-white/10 rounded-lg text-white-0/60 hover:text-pv-brand-500 hover:border-pv-brand-500 transition-all"
                        >
                            {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                        </button>
                    </div>
                </div>
            )}

            {/* QR Code Canvas */}
            <div className="bg-white p-4 rounded-xl shadow-inner relative group">
                <QRCodeCanvas
                    id="qrcode-canvas"
                    ref={canvasRef}
                    value={url || "https://picoverse.se"}
                    size={200}
                    level={"H"}
                    includeMargin={false}
                    imageSettings={{
                        src: "/mono_gradient_dark.svg",
                        x: undefined,
                        y: undefined,
                        height: 40,
                        width: 40,
                        excavate: true,
                    }}
                />
            </div>

            <button
                onClick={downloadQRCode}
                disabled={!url}
                className="w-full flex items-center justify-center gap-2 bg-pv-brand-500 hover:bg-pv-brand-500/80 disabled:opacity-50 disabled:cursor-not-allowed text-white-0 py-3 rounded-xl font-pv-bold text-sm transition-all shadow-lg active:scale-[0.98]"
            >
                <Download className="h-4 w-4" />
                Télécharger en PNG
            </button>
        </div>
    )
}
