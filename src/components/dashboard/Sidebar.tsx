'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { FileText, Palette, Wrench, Settings, Plus, Folder, ChevronDown, LogOut, ExternalLink, ChartColumn } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { signOut } from '@/app/auth/actions'
import { CreateProjectModal } from '@/app/dashboard/CreateProjectModal'
import { getPlanUsage } from '@/app/dashboard/actions'
import useSWR from 'swr'
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

    const { data: planUsage } = useSWR(`plan-usage-${currentProject.user_id}-${currentProject.id}`, () => getPlanUsage(currentProject.id))
    const isLimitReached = planUsage && planUsage.projects.current >= planUsage.projects.max

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
        <div id="sidebar" className={`flex flex-col h-full bg-pv-dark-0 text-pv-white-0 border-r border-white-0/10 ${className}`}>
            {/* Header / Project Selector */}
            <div className="p-4 border-b border-white-0/5 relative">
                <div className="flex items-center gap-3">
                    {/* Logo Analytics Link */}
                    <Link
                        href={`/dashboard/${projectSlug}`}
                        className="group relative h-8 w-8 shrink-0 transition-transform active:scale-95 transition-all duration-200"
                    >
                        <img
                            src="/mono_gradient_dark.svg"
                            alt="Picoverse"
                            className="absolute inset-0 w-8 h-8 opacity-100 group-hover:opacity-0 transition-opacity duration-200"
                        />
                        <img
                            src="/mono_gradient_light.svg"
                            alt="Picoverse"
                            className="absolute inset-0 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        />
                    </Link>

                    {/* Project Selector */}
                    <div ref={dropdownRef} className="flex-1 min-w-0">
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="w-full flex items-center justify-between p-2 rounded-md hover:bg-white-0/5 transition-all group border border-transparent text-white-0"
                        >
                            <div className="flex flex-col items-start truncate min-w-0">
                                <span className="text-sm font-pv-bold truncate max-w-[120px]">{currentProject.name}</span>
                                <span className="text-[10px] opacity-50 uppercase tracking-widest">Gratuit</span>
                            </div>
                            <ChevronDown className="h-4 w-4 opacity-30 group-hover:opacity-100 shrink-0 ml-1" />
                        </button>

                        {isDropdownOpen && (
                            <div className="absolute top-full left-4 right-4 mt-2 z-50 bg-pv-dark-100 border border-white-0/10 rounded-xl shadow-2xl py-1 max-h-64 overflow-y-auto backdrop-blur-md">
                                <div className="px-3 py-2 text-[10px] font-pv-bold text-white-0/40 uppercase tracking-widest">
                                    Mes Projets
                                </div>
                                {projects.map((project) => (
                                    <button
                                        key={project.id}
                                        onClick={() => {
                                            router.push(`/dashboard/${project.slug}/pages`)
                                            setIsDropdownOpen(false)
                                        }}
                                        className={`w-full flex items-center px-4 py-2 text-sm text-left transition-colors duration-150 ${project.id === currentProject.id
                                            ? 'bg-pv-gradient-soft text-white-0'
                                            : 'text-white-0/70 hover:bg-white-0/5 hover:text-white-0'
                                            }`}
                                    >
                                        <Folder className="h-4 w-4 mr-2 opacity-50" />
                                        <span className="truncate font-pv-regular">{project.name}</span>
                                    </button>
                                ))}
                                <div className="h-px bg-white-0/5 my-1"></div>
                                {isLimitReached ? (
                                    <div className="px-4 py-2 text-[10px] text-amber-500 bg-amber-500/5 font-pv-bold uppercase tracking-widest border-t border-white-0/5 mt-1">
                                        Limite du plan atteinte
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => {
                                            setIsCreateModalOpen(true)
                                            setIsDropdownOpen(false)
                                        }}
                                        className="w-full flex items-center px-4 py-2 text-sm text-pv-brand-500 hover:bg-pv-brand-500/5 font-pv-bold transition-all"
                                    >
                                        <Plus className="h-4 w-4 mr-2" /> Nouveau Projet
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
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

            {/* Plan Usage Section */}
            <div className="px-5 py-4 border-t border-white-0/5">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-pv-bold text-white-0/40 uppercase tracking-widest">Plan</span>
                    <span className="text-[10px] font-pv-bold text-pv-brand-500 uppercase tracking-widest">{planUsage?.plan || 'Free'}</span>
                </div>

                {/* Projects Progress */}
                <div className="space-y-1 group cursor-help" title={`${planUsage?.projects.current || 0} sur ${planUsage?.projects.max || 1} projets utilisés`}>
                    <div className="flex justify-between text-[10px] font-pv-medium mb-1">
                        <span className="text-white-0/60 transition-colors group-hover:text-white-0">Projets</span>
                        <span className="text-white-0/80">{planUsage?.projects.current || 0}/{planUsage?.projects.max || 1}</span>
                    </div>
                    <div className="h-1 bg-white-0/5 rounded-full overflow-hidden">
                        <div
                            className={`h-full transition-all duration-500 ${(planUsage?.projects.current || 0) >= (planUsage?.projects.max || 1)
                                ? 'bg-amber-500'
                                : 'bg-pv-brand-500'
                                }`}
                            style={{ width: `${Math.min(100, ((planUsage?.projects.current || 0) / (planUsage?.projects.max || 1)) * 100)}%` }}
                        />
                    </div>
                </div>

                {/* Pages Progress (only if in a project) */}
                {planUsage?.pages && (
                    <div className="space-y-1 group cursor-help pt-2" title={`${planUsage.pages.current} sur ${planUsage.pages.max} pages utilisées dans ce projet`}>
                        <div className="flex justify-between text-[10px] font-pv-medium mb-1">
                            <span className="text-white-0/60 transition-colors group-hover:text-white-0">Pages du projet</span>
                            <span className="text-white-0/80">{planUsage.pages.current}/{planUsage.pages.max}</span>
                        </div>
                        <div className="h-1 bg-white-0/5 rounded-full overflow-hidden">
                            <div
                                className={`h-full transition-all duration-500 ${planUsage.pages.current >= planUsage.pages.max
                                    ? 'bg-amber-500'
                                    : 'bg-indigo-400'
                                    }`}
                                style={{ width: `${Math.min(100, (planUsage.pages.current / planUsage.pages.max) * 100)}%` }}
                            />
                        </div>
                    </div>
                )}

                {planUsage && (planUsage.projects.current >= planUsage.projects.max || (planUsage.pages && planUsage.pages.current >= planUsage.pages.max)) && (
                    <p className="mt-3 text-[9px] leading-relaxed text-amber-400/80 font-pv-regular italic">
                        Limite atteinte. {planUsage.projects.current >= planUsage.projects.max ? 'Créez un profil Pro pour plus de projets.' : 'Débloquez le plan Pro pour plus de pages.'}
                    </p>
                )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-100">
                <div className="flex items-center justify-between px-2">
                    <Link href="/dashboard/account" className="flex items-center gap-3 text-white-0 hover:bg-pv-gradient-soft rounded-lg p-2 -ml-2 transition-all flex-1 min-w-0 mr-2">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 shrink-0"></div>
                        <div className="flex flex-col min-w-0 text-left">
                            <span className="text-sm font-medium truncate">{username || 'Mon Compte'}</span>
                            <span className="text-xs opacity-70">Mon compte</span>
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
