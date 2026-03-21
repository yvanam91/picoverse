import posthog from "posthog-js";

if (typeof window !== "undefined") {
  const initPostHog = () => {
    const pathname = window.location.pathname;

    // Detect public pages: /username/projectSlug(/pageSlug)
    // We exclude dashboard, login, signup, and other main marketing routes from deactivation
    const isExcluded = 
      pathname === "/" ||
      pathname.startsWith("/dashboard") ||
      pathname.startsWith("/login") ||
      pathname.startsWith("/signup") ||
      pathname.startsWith("/onboarding") ||
      pathname.startsWith("/auth") ||
      pathname.startsWith("/account") ||
      pathname.startsWith("/contact") ||
      pathname.startsWith("/cgu") ||
      pathname.startsWith("/confidentialite");

    const isPublicPage = !isExcluded && pathname.split("/").filter(Boolean).length >= 2;

    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN!, {
      api_host: "/ingest",
      ui_host: "https://eu.posthog.com",
      capture_pageview: false,
      disable_session_recording: isPublicPage,
      capture_exceptions: true,
      debug: process.env.NODE_ENV === "development",
    });
  };

  // Defer initialization to avoid blocking initial render
  if (typeof window.requestIdleCallback !== "undefined") {
    window.requestIdleCallback(initPostHog);
  } else {
    setTimeout(initPostHog, 500);
  }
}
