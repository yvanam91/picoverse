
export const PLAN_LIMITS = {
    free: {
        maxProjects: 1,
        maxPagesPerProject: 3
    },
    pro: {
        maxProjects: 3,
        maxPagesPerProject: 10
    },
    ultra: {
        maxProjects: 100,
        maxPagesPerProject: 100
    }
} as const;

export type PlanType = keyof typeof PLAN_LIMITS;

export function getPlanLimits(plan: string | null | undefined) {
    const p = (plan?.toLowerCase() || 'free') as PlanType;
    return PLAN_LIMITS[p] || PLAN_LIMITS.free;
}
