import { getProjectStats } from '@/app/dashboard/actions'
import { AnalyticsDashboard } from '@/components/dashboard/AnalyticsDashboard'
import { notFound } from 'next/navigation'

export default async function ProjectDashboardPage({
    params,
    searchParams,
}: {
    params: Promise<{ projectSlug: string }>
    searchParams: Promise<{ period?: string }>
}) {
    const { projectSlug } = await params
    const { period } = await searchParams
    
    // Default to 7d for dashboard home
    const selectedPeriod = (period === '30d' ? '30d' : '7d') as '7d' | '30d'
    
    // Fetch directly on server
    const statsData = await getProjectStats(projectSlug, selectedPeriod)

    if (statsData.error) {
        notFound()
    }

    return (
        <AnalyticsDashboard 
            initialData={statsData} 
            projectSlug={projectSlug} 
            period={selectedPeriod}
        />
    )
}
