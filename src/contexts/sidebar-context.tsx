// ===== IMPORTS =====

// React imports for context creation and hooks
import React, { createContext, useContext, useState, ReactNode } from "react";

// ===== TYPE DEFINITIONS =====

/**
 * SidebarType - Union type defining which sidebar can be active
 * Only one sidebar can be shown at a time
 * - "menu": Main navigation sidebar
 * - "notifications": Notifications panel sidebar
 * - "settings": Settings configuration sidebar
 */
type SidebarType = "menu" | "notifications" | "settings";

/**
 * SidebarContextType - Interface defining the shape of the context value
 * This is what components will receive when they use the context
 * 
 * @property sidebarType - Currently active sidebar type
 * @property setSidebarType - Direct setter function for sidebar type
 * @property openSidebar - Convenience function to open a specific sidebar
 */
interface SidebarContextType {
  sidebarType: SidebarType;                    // Current sidebar being displayed
  setSidebarType: (type: SidebarType) => void; // Function to change sidebar type
  openSidebar: (type: SidebarType) => void;    // Alias for setSidebarType (more semantic)
}

// ===== CONTEXT CREATION =====

/**
 * Create the context with undefined as initial value
 * This forces consumers to check if they're within a provider
 * If used outside provider, the custom hook will throw an error
 */
const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

// ===== CONTEXT PROVIDER COMPONENT =====

/**
 * SidebarControlProvider - Context provider component
 * 
 * Wraps the application (or part of it) to provide sidebar state management
 * Must wrap any components that need to access or control the sidebar
 * 
 * Usage:
 * ```tsx
 * <SidebarControlProvider>
 *   <App />
 * </SidebarControlProvider>
 * ```
 * 
 * @param children - Child components that will have access to sidebar context
 */
export function SidebarControlProvider({ children }: { children: ReactNode }) {
  // ===== STATE MANAGEMENT =====

  /**
   * Track which sidebar is currently active
   * Default is "menu" - the main navigation sidebar
   * 
   * This state determines which sidebar component is rendered:
   * - "menu" -> MenuSidebar
   * - "notifications" -> NotificationsSidebar
   * - "settings" -> SettingsSidebar
   */
  const [sidebarType, setSidebarType] = useState<SidebarType>("menu");

  /**
   * openSidebar - Convenience function to change the active sidebar
   * 
   * This is functionally identical to setSidebarType but has a more
   * semantic name that better describes the intent ("open" vs "set")
   * 
   * @param type - The sidebar type to activate
   */
  const openSidebar = (type: SidebarType) => {
    setSidebarType(type);
  };

  // ===== CONTEXT PROVIDER =====

  return (
    // Provide the context value to all children
    // Any descendant can access this via useSidebarControl hook
    <SidebarContext.Provider
      value={{
        sidebarType,      // Current sidebar type
        setSidebarType,   // Direct setter function
        openSidebar,      // Semantic alias for setSidebarType
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

// ===== CUSTOM HOOK =====

/**
 * useSidebarControl - Custom hook to access sidebar context
 * 
 * This hook provides a convenient way to access the sidebar state and controls
 * Throws an error if used outside of SidebarControlProvider
 * 
 * Usage in components:
 * ```tsx
 * function MyComponent() {
 *   const { sidebarType, openSidebar } = useSidebarControl();
 *   
 *   return (
 *     <button onClick={() => openSidebar("notifications")}>
 *       Open Notifications
 *     </button>
 *   );
 * }
 * ```
 * 
 * @throws Error if used outside SidebarControlProvider
 * @returns SidebarContextType containing sidebar state and controls
 */
export function useSidebarControl() {
  // Attempt to access the context
  const context = useContext(SidebarContext);

  // If context is undefined, the hook is being used outside the provider
  // This is a development error that should be caught early
  if (context === undefined) {
    throw new Error("useSidebarControl must be used within a SidebarControlProvider");
  }

  // Return the context value (state and functions)
  return context;
}
