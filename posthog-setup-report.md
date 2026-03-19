<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into Picoverse. Client-side tracking is initialized via `instrumentation-client.ts` (Next.js 15.3+ pattern) using `posthog-js`, with automatic exception capture and session replay enabled. A reverse proxy was added to `next.config.ts` to route PostHog requests through `/ingest`. A server-side client was created in `src/lib/posthog-server.ts` using `posthog-node`. Server actions in `auth/actions.ts`, `dashboard/actions.ts`, and `account/delete-actions.ts` were instrumented with 13 business-critical events. User identification is performed server-side on login and signup.

| Event | Description | File |
|---|---|---|
| `user_signed_up` | Fired server-side after successful Supabase signUp, with username and email properties | `src/app/auth/actions.ts` |
| `user_logged_in` | Fired server-side after successful login, with PostHog identify call | `src/app/auth/actions.ts` |
| `user_logged_out` | Fired server-side before sign-out | `src/app/auth/actions.ts` |
| `password_reset_requested` | Fired server-side after a password reset email is sent | `src/app/auth/actions.ts` |
| `project_created` | Fired server-side on successful project creation, with project_id, slug, and plan | `src/app/dashboard/actions.ts` |
| `project_deleted` | Fired server-side after a project is deleted | `src/app/dashboard/actions.ts` |
| `page_created` | Fired server-side on successful page creation, with page_id, slug, project_id, and plan | `src/app/dashboard/actions.ts` |
| `page_deleted` | Fired server-side after a page is deleted | `src/app/dashboard/actions.ts` |
| `block_added` | Fired server-side when a block is added to a page, with block_type | `src/app/dashboard/actions.ts` |
| `block_deleted` | Fired server-side when a block is removed from a page | `src/app/dashboard/actions.ts` |
| `theme_saved` | Fired server-side when a user saves a custom theme | `src/app/dashboard/actions.ts` |
| `plan_limit_reached` | Fired server-side when a user hits their plan limit for projects or pages, with limit_type, plan, and max | `src/app/dashboard/actions.ts` |
| `account_deleted` | Fired server-side before the user account is permanently deleted | `src/app/dashboard/account/delete-actions.ts` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- **Dashboard — Analytics basics**: https://eu.posthog.com/project/143292/dashboard/574678
- **Insight — User Acquisition: Signups & Logins**: https://eu.posthog.com/project/143292/insights/cDYyAykA
- **Insight — Activation Funnel: Signup → Project → Page → Block**: https://eu.posthog.com/project/143292/insights/ndMOD1wg
- **Insight — Content Creation Activity**: https://eu.posthog.com/project/143292/insights/NQo2VMlo
- **Insight — Churn Signals: Plan Limits & Account Deletions**: https://eu.posthog.com/project/143292/insights/jMaWeg21

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
