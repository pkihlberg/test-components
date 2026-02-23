// ===== IMPORTS =====

// React library for hooks
import * as React from "react"

// ===== CONSTANTS =====

/**
 * MOBILE_BREAKPOINT - Pixel width threshold for mobile devices
 * 
 * Value: 768px (matches Tailwind's 'md' breakpoint)
 * - Below 768px: Considered mobile
 * - 768px and above: Considered desktop/tablet
 * 
 * This aligns with common CSS frameworks:
 * - Tailwind CSS: md breakpoint = 768px
 * - Bootstrap: md breakpoint = 768px
 */
const MOBILE_BREAKPOINT = 768

// ===== CUSTOM HOOK =====

/**
 * useIsMobile - React hook to detect if viewport is mobile-sized
 * 
 * Features:
 * - Checks if window width is below MOBILE_BREAKPOINT (768px)
 * - Reactively updates when window is resized
 * - Uses window.matchMedia for efficient media query tracking
 * - Starts with undefined to avoid hydration mismatch in SSR
 * 
 * Usage:
 * ```tsx
 * function MyComponent() {
 *   const isMobile = useIsMobile();
 *   
 *   return (
 *     <div>
 *       {isMobile ? <MobileView /> : <DesktopView />}
 *     </div>
 *   );
 * }
 * ```
 * 
 * @returns boolean - true if viewport is mobile-sized, false otherwise
 */
export function useIsMobile() {
  // ===== STATE =====

  /**
   * Track mobile state
   * Initial value is undefined to prevent hydration issues in Next.js
   * - undefined: Initial/loading state (before client-side check)
   * - true: Window width is below mobile breakpoint
   * - false: Window width is at or above mobile breakpoint
   */
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  // ===== EFFECT: MONITOR VIEWPORT SIZE =====

  React.useEffect(() => {
    /**
     * Create media query list for mobile breakpoint
     * matchMedia is more efficient than resize listeners
     * Query: "(max-width: 767px)" - matches viewports narrower than 768px
     */
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)

    /**
     * Handler function called when viewport crosses the breakpoint
     * Updates isMobile state based on current window width
     */
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }

    // Register the change listener
    // This will fire whenever the media query match status changes
    mql.addEventListener("change", onChange)

    // Set initial state immediately on mount
    // This handles the initial render on client side
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)

    // Cleanup: Remove event listener when component unmounts
    // This prevents memory leaks
    return () => mql.removeEventListener("change", onChange)
  }, []) // Empty dependency array = run once on mount

  /**
   * Return boolean value
   * !! converts undefined to false for initial render
   * - undefined becomes false
   * - true stays true
   * - false stays false
   */
  return !!isMobile
}
