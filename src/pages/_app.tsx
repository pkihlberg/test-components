// ===== IMPORTS =====

/**
 * Global CSS imports
 * This import applies styles to the entire application
 * - Tailwind CSS base, components, and utilities
 * - Custom global styles
 * - CSS variables for theming
 */
import "@/styles/globals.css";

/**
 * Next.js types for App component props
 * AppProps contains Component and pageProps
 */
import type { AppProps } from "next/app";

// ===== APP COMPONENT =====

/**
 * App - Root component for Next.js application (Pages Router)
 * 
 * Purpose:
 * - Wraps all pages in the application
 * - Persists layout and state between page navigations
 * - Imports global CSS
 * - Can add global providers (Auth, Theme, etc.)
 * 
 * This file is the entry point for all pages in the app.
 * Any changes here affect every page.
 * 
 * Common uses:
 * - Add global providers (Context, Redux, etc.)
 * - Add global layouts
 * - Track page views for analytics
 * - Persist state between page changes
 * 
 * Current implementation:
 * - Imports global styles
 * - Renders page component with its props
 * 
 * Example with providers:
 * ```tsx
 * export default function App({ Component, pageProps }: AppProps) {
 *   return (
 *     <ThemeProvider>
 *       <AuthProvider>
 *         <Component {...pageProps} />
 *       </AuthProvider>
 *     </ThemeProvider>
 *   );
 * }
 * ```
 * 
 * @param Component - The active page component being rendered
 * @param pageProps - Props passed to the page (from getStaticProps, getServerSideProps, etc.)
 */
export default function App({ Component, pageProps }: AppProps) {
  // Render the current page with its props
  // Component changes on each route navigation
  return <Component {...pageProps} />;
}
