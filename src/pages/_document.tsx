// ===== IMPORTS =====

/**
 * Next.js Document components
 * These components structure the HTML document shell
 * - Html: Root <html> element
 * - Head: Custom <head> content (meta tags, fonts, etc.)
 * - Main: Where the app content is rendered
 * - NextScript: Next.js scripts and client-side JavaScript
 */
import { Html, Head, Main, NextScript } from "next/document";

// ===== DOCUMENT COMPONENT =====

/**
 * Document - Custom HTML document structure for Next.js (Pages Router)
 * 
 * Purpose:
 * - Define the HTML document shell that wraps your application
 * - Only rendered on the server (never on client)
 * - Used to augment <html> and <body> tags
 * 
 * When to modify this file:
 * - Add custom attributes to <html> or <body> (e.g., lang, className)
 * - Add global <head> elements (fonts, meta tags)
 * - Add scripts that need to load before React hydration
 * 
 * IMPORTANT:
 * - This is server-only code (no client-side React hooks)
 * - Changes here require server restart in development
 * - Don't add application logic here
 * 
 * Current implementation:
 * - Sets HTML lang attribute to "en" (English)
 * - Adds "antialiased" class to body for better font rendering
 * 
 * Common customizations:
 * ```tsx
 * <Html lang="en" className="dark"> // Force dark mode
 * <Head>
 *   <link rel="icon" href="/favicon.ico" />
 *   <meta name="theme-color" content="#000000" />
 * </Head>
 * <body className="antialiased bg-background text-foreground">
 * ```
 * 
 * @returns The HTML document structure
 */
export default function Document() {
  return (
    // Root HTML element with language attribute
    // lang="en" helps screen readers and search engines
    <Html lang="en">

      {/* Head section for meta tags, fonts, icons, etc. */}
      {/* Note: Use next/head in pages for page-specific meta tags */}
      {/* This Head is for global, document-level head elements */}
      <Head />

      {/* Body element with font smoothing */}
      {/* antialiased class enables font smoothing for better text rendering */}
      <body className="antialiased">

        {/* Main content area - where your app renders */}
        {/* This is replaced with your page components */}
        <Main />

        {/* Next.js scripts and client-side JavaScript */}
        {/* Required for React hydration and client-side navigation */}
        <NextScript />
      </body>
    </Html>
  );
}
