'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { FileText, Palette, Wrench, Settings, Plus, Folder, ChevronDown, LogOut, ExternalLink, ChartColumn } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { signOut } from '@/app/auth/actions'
import { CreateProjectModal } from '@/app/dashboard/CreateProjectModal'
import type { Project } from '@/types/database'

const IS_PREMIUM = true // Dummy value as requested

interface SidebarProps {
    projectSlug: string
    projects: Project[]
    currentProject: Project
    username?: string | null
}

export function Sidebar({ projectSlug, projects, currentProject, username, className = "" }: SidebarProps & { className?: string }) {
    const pathname = usePathname()
    const router = useRouter()
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const navigation = [
        { name: 'Dashboard', href: `/dashboard/${projectSlug}`, icon: ChartColumn, exact: true },
        { name: 'Pages', href: `/dashboard/${projectSlug}/pages`, icon: FileText },
        { name: 'Thèmes', href: `/dashboard/${projectSlug}/themes`, icon: Palette },
        { name: 'Outils', href: `/dashboard/${projectSlug}/tools`, icon: Wrench },
        { name: 'Paramètres', href: `/dashboard/${projectSlug}/settings`, icon: Settings },
    ]

    return (
        <div id="sidebar" className={`flex flex-col h-full bg-pv-dark-0 text-pv-white-0 border-r border-gray-100 w-64 ${className}`}>
            {/* Header / Project Selector */}
            <div className="p-4 border-b border-gray-100 relative">
                <div ref={dropdownRef}>
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="w-full flex items-center justify-between p-2 rounded-md hover:bg-pv-gradient-soft transition-all group border border-transparent text-white-0"
                    >
                        <div className="flex items-center gap-2 truncate">
                            <div className="h-8 w-8 rounded bg-pv-dark-100 flex items-center justify-center shrink-0">
                                <Folder className="h-4 w-4" />
                            </div>
                            <div className="flex flex-col items-start truncate min-w-0">
                                <span className="text-sm font-semibold truncate max-w-[120px]">{currentProject.name}</span>
                                <span className="text-xs opacity-70">Gratuit</span>
                            </div>
                        </div>
                        <ChevronDown className="h-4 w-4 opacity-50 group-hover:opacity-100 shrink-0" />
                    </button>

                    {isDropdownOpen && (
                        <div className="absolute top-full left-4 right-4 mt-2 z-50 bg-white rounded-lg shadow-xl ring-1 ring-black/5 py-1 max-h-64 overflow-y-auto">
                            <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Mes Projets
                            </div>
                            {projects.map((project) => (
                                <button
                                    key={project.id}
                                    onClick={() => {
                                        router.push(`/dashboard/${project.slug}/pages`)
                                        setIsDropdownOpen(false)
                                    }}
                                    className={`w-full flex items-center px-4 py-2 text-sm text-left text-white-0 ${project.id === currentProject.id
                                        ? 'bg-pv-gradient-soft'
                                        : 'hover:bg-pv-gradient-soft'
                                        }`}
                                >
                                    <Folder className="h-4 w-4 mr-2 opacity-50" />
                                    <span className="truncate">{project.name}</span>
                                </button>
                            ))}
                            <div className="h-px bg-gray-100 my-1"></div>
                            {IS_PREMIUM ? (
                                <button
                                    onClick={() => {
                                        setIsCreateModalOpen(true)
                                        setIsDropdownOpen(false)
                                    }}
                                    className="w-full flex items-center px-4 py-2 text-sm text-indigo-600 hover:bg-indigo-50 font-medium transition-colors"
                                >
                                    <Plus className="h-4 w-4 mr-2" /> Nouveau Projet
                                </button>
                            ) : (
                                <div className="px-4 py-2 text-xs text-gray-400 cursor-not-allowed">
                                    Passer Pro pour + de projets
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
                {navigation.map((item) => {
                    const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href)
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`
                                sidebar-item text-white-0 flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all
                                ${isActive ? 'item-focus' : ''}
                            `}
                        >
                            <item.icon className="mr-3 h-5 w-5 flex-shrink-0 transition-colors" />
                            {item.name}
                        </Link>
                    )
                })}

                {/* Public Link */}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-gray-100">
                <div className="flex items-center justify-between px-2">
                    <Link href="/dashboard/account" className="flex items-center gap-3 text-white-0 hover:bg-pv-gradient-soft rounded-lg p-2 -ml-2 transition-all flex-1 min-w-0 mr-2">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 shrink-0"></div>
                        <div className="flex flex-col min-w-0 text-left">
                            <span className="text-sm font-medium truncate">{username || 'Mon Compte'}</span>
                            <span className="text-xs opacity-70">Plan Gratuit</span>
                        </div>
                    </Link>
                    <form action={signOut}>
                        <button
                            type="submit"
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-gray-100 rounded-md transition-colors"
                            aria-label="Se déconnecter"
                        >
                            <LogOut className="h-4 w-4" />
                        </button>
                    </form>
                </div>
            </div>


            <CreateProjectModal open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen} />
        </div>
    )
}
