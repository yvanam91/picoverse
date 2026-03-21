'use client'

import React, { useState } from 'react'
import { Loader2, Send } from 'lucide-react'
import { toast } from 'sonner'
import { Footer } from '../_components/Footer'
import { sendContactEmail } from '../actions'

export default function ContactPage() {
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [subject, setSubject] = useState('')
    const [message, setMessage] = useState('')

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)

        const formData = new FormData()
        formData.append('name', name)
        formData.append('email', email)
        formData.append('subject', subject)
        formData.append('message', message)

        const result = await sendContactEmail(formData)

        if (result.success) {
            toast.success('Message envoyé ! Nous vous répondrons dans les plus brefs délais.')
            setName('')
            setEmail('')
            setSubject('')
            setMessage('')
        } else {
            toast.error(result.error || "Erreur lors de l'envoi")
        }

        setLoading(false)
    }

    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-1 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
                <div className="w-full max-w-lg space-y-8 bg-white dark:bg-pv-dark-0 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-white-0/10">
                    <div className="text-center">
                        <h1 className="mt-6 text-3xl font-bold tracking-tight text-white-0 dark:text-white-0">
                            Contactez-moi
                        </h1>
                        <p className="mt-2 text-sm text-white-0 dark:text-white-0/60">
                            Une question ? Une suggestion ? N'hésitez pas à nous envoyer un message.
                        </p>
                    </div>

                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            {/* Nom */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium leading-6 text-white-0 dark:text-white-0/80">
                                    Votre nom <span className="text-red-500">*</span>
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="block w-full rounded-lg border-0 py-3 px-2 text-white-0 dark:text-white-0 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-white-0/10 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:bg-white-0/5 sm:text-sm sm:leading-6 transition-all"
                                        placeholder="Jean Dupont"
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-white-0 dark:text-white-0/80">
                                    Votre email <span className="text-red-500">*</span>
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="block w-full rounded-lg border-0 py-3 px-2 text-white-0 dark:text-white-0 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-white-0/10 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:bg-white-0/5 sm:text-sm sm:leading-6 transition-all"
                                        placeholder="exemple@email.com"
                                    />
                                </div>
                            </div>

                            {/* Objet */}
                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium leading-6 text-white-0 dark:text-white-0/80">
                                    Objet <span className="text-red-500">*</span>
                                </label>
                                <div className="mt-2 relative">
                                    <input
                                        id="subject"
                                        name="subject"
                                        type="text"
                                        required
                                        value={subject}
                                        maxLength={120}
                                        onChange={(e) => setSubject(e.target.value)}
                                        className="block w-full rounded-lg border-0 py-3 px-2 text-white-0 dark:text-white-0 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-white-0/10 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:bg-white-0/5 sm:text-sm sm:leading-6 transition-all"
                                        placeholder="De quoi s'agit-il ?"
                                    />
                                    <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                                        <span className="text-[10px] text-gray-400 dark:text-white-0/20">
                                            {subject.length}/120
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Message */}
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium leading-6 text-white-0 dark:text-white-0/80">
                                    Message <span className="text-red-500">*</span>
                                </label>
                                <div className="mt-2 relative">
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={5}
                                        required
                                        value={message}
                                        maxLength={1500}
                                        onChange={(e) => setMessage(e.target.value)}
                                        className="block w-full rounded-lg border-0 py-3 px-2 text-white-0 dark:text-white-0 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-white-0/10 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:bg-white-0/5 sm:text-sm sm:leading-6 transition-all resize-none"
                                        placeholder="Votre message ici..."
                                    />
                                    <div className="absolute bottom-3 right-3 flex items-center pointer-events-none">
                                        <span className="text-[10px] text-gray-400 dark:text-white-0/20">
                                            {message.length}/1500
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="group relative flex w-full justify-center rounded-xl bg-indigo-600 px-3 py-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                            >
                                {loading ? (
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                ) : (
                                    <>
                                        <span>Envoyer le message</span>
                                        <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </main>
            <Footer />
        </div>
    )
}
