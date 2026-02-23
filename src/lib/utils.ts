// ===== IMPORTS =====

/**
 * clsx - Utility for constructing className strings conditionally
 * 
 * Features:
 * - Handles strings, objects, arrays
 * - Filters out falsy values
 * - Example: clsx('base', isActive && 'active', { error: hasError })
 * 
 * ClassValue type allows: string | object | array | null | undefined
 */
import { clsx, type ClassValue } from "clsx"

/**
 * twMerge - Utility for merging Tailwind CSS classes intelligently
 * 
 * Features:
 * - Resolves conflicting Tailwind classes
 * - Later classes override earlier ones
 * - Example: twMerge('p-4', 'p-2') => 'p-2' (not 'p-4 p-2')
 * 
 * This prevents CSS specificity issues with Tailwind utilities
 */
import { twMerge } from "tailwind-merge"

// ===== UTILITY FUNCTIONS =====

/**
 * cn - Combine and merge className strings for React components
 * 
 * This function combines clsx (conditional classes) with twMerge (Tailwind deduplication)
 * to create a powerful className builder for React/Next.js components.
 * 
 * How it works:
 * 1. clsx(...inputs) - Combines all inputs into a single string, handling conditionals
 * 2. twMerge(...) - Intelligently merges Tailwind classes, resolving conflicts
 * 
 * Usage examples:
 * ```tsx
 * // Basic usage
 * cn('text-base', 'font-bold') 
 * // => 'text-base font-bold'
 * 
 * // With conditionals
 * cn('btn', isActive && 'btn-active', isPrimary && 'btn-primary')
 * // => 'btn btn-active btn-primary' (if both true)
 * 
 * // Resolving Tailwind conflicts (most common use case)
 * cn('p-4 bg-red-500', className) 
 * // If className='p-2', result is 'bg-red-500 p-2' (p-2 overrides p-4)
 * 
 * // In component props
 * function Button({ className, ...props }) {
 *   return <button className={cn('btn-base', className)} {...props} />
 * }
 * // Allows consumers to override default classes
 * ```
 * 
 * Why we need both clsx AND twMerge:
 * - clsx: Handles conditional logic and combines classes
 * - twMerge: Prevents conflicts between Tailwind utility classes
 * 
 * Common in shadcn/ui components for merging default and custom classes
 * 
 * @param inputs - Variable number of className values (strings, objects, arrays, etc.)
 * @returns Merged and deduplicated className string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
