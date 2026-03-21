'use client'

import React from 'react'
import { X } from 'lucide-react'

interface LegalModalProps {
    isOpen: boolean
    onClose: () => void
    title: string
    children: React.ReactNode
}

export function LegalModal({ isOpen, onClose, title, children }: LegalModalProps) {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-full max-w-2xl bg-white dark:bg-pv-dark-0 rounded-2xl border border-gray-200 dark:border-white-0/10 shadow-2xl flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-white-0/10">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white-0">
                        {title}
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 dark:text-white-0/40 dark:hover:text-white-0 transition-colors"
                    >
                        <X className="h-6 w-6" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                    {children}
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-gray-100 dark:border-white-0/10 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-500 transition-colors"
                    >
                        J'ai compris
                    </button>
                </div>
            </div>
        </div>
    )
}
