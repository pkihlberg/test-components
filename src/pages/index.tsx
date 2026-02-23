// ===== IMPORTS =====

// Sidebar UI components from shadcn/ui
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

// Separator component for visual dividers
import { Separator } from "@/components/ui/separator";

// Custom sidebar components for different sidebar types
import { MenuSidebar } from "@/components/menu-sidebar";
import { NotificationsSidebar } from "@/components/notifications-sidebar";
import { SettingsSidebar } from "@/components/settings-sidebar";

// Context and hook for global sidebar state management
import { SidebarControlProvider, useSidebarControl } from "@/contexts/sidebar-context";

// Button component for toggle actions
import { Button } from "@/components/ui/button";

// Icons from lucide-react
import { Bell, Menu, Settings } from "lucide-react";

// ===== PAGE CONTENT COMPONENT =====
/**
 * PageContent - Main content component that uses the sidebar context
 * This component must be wrapped by SidebarControlProvider to access sidebar state
 */
function PageContent() {
  // Get current sidebar type and the function to open/switch sidebars from context
  const { sidebarType, openSidebar } = useSidebarControl();

  return (
    // SidebarProvider manages the open/closed state of the sidebar
    // defaultOpen={false} ensures sidebar starts in closed state
    <SidebarProvider defaultOpen={false}>

      {/* ===== CONDITIONAL SIDEBAR RENDERING ===== */}
      {/* Only one sidebar is rendered at a time based on sidebarType from context */}
      {/* When sidebarType is "menu", render the MenuSidebar component */}
      {sidebarType === "menu" && <MenuSidebar />}

      {/* When sidebarType is "notifications", render the NotificationsSidebar component */}
      {sidebarType === "notifications" && <NotificationsSidebar />}

      {/* When sidebarType is "settings", render the SettingsSidebar component */}
      {sidebarType === "settings" && <SettingsSidebar />}

      {/* ===== MAIN CONTENT AREA ===== */}
      {/* Using plain main element instead of SidebarInset to prevent layout shift */}
      {/* This ensures content stays full-width regardless of sidebar state */}
      <main className="flex min-h-screen w-full flex-col bg-background">

        {/* ===== HEADER SECTION ===== */}
        {/* Fixed height header with navigation and controls */}
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">

          {/* SidebarTrigger - Built-in button to toggle sidebar open/closed */}
          {/* Negative margin aligns it properly with the layout */}
          <SidebarTrigger className="-ml-1" />

          {/* Vertical separator line between trigger and title */}
          <Separator orientation="vertical" className="mr-2 h-4" />

          {/* Page title */}
          <h1 className="text-lg font-semibold">Dashboard</h1>

          {/* ===== SIDEBAR TYPE TOGGLE BUTTONS ===== */}
          {/* Container pushed to the right side of header */}
          <div className="ml-auto flex items-center gap-2">

            {/* Menu toggle button - highlighted when menu sidebar is active */}
            <Button
              variant={sidebarType === "menu" ? "default" : "outline"}
              size="sm"
              onClick={() => openSidebar("menu")}
            >
              <Menu className="size-4 mr-2" />
              Menu
            </Button>

            {/* Notifications toggle button - highlighted when notifications sidebar is active */}
            <Button
              variant={sidebarType === "notifications" ? "default" : "outline"}
              size="sm"
              onClick={() => openSidebar("notifications")}
            >
              <Bell className="size-4 mr-2" />
              Notifications
            </Button>

            {/* Settings toggle button - highlighted when settings sidebar is active */}
            <Button
              variant={sidebarType === "settings" ? "default" : "outline"}
              size="sm"
              onClick={() => openSidebar("settings")}
            >
              <Settings className="size-4 mr-2" />
              Settings
            </Button>
          </div>
        </header>

        {/* ===== MAIN CONTENT GRID ===== */}
        {/* Flexible container with padding for the dashboard content */}
        <div className="flex flex-1 flex-col gap-4 p-4">

          {/* Top row - 3 cards in a responsive grid */}
          {/* On mobile: stacked, on md and up: 3 columns */}
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            {/* Placeholder card 1 with video aspect ratio */}
            <div className="aspect-video rounded-xl bg-muted/50" />

            {/* Placeholder card 2 with video aspect ratio */}
            <div className="aspect-video rounded-xl bg-muted/50" />

            {/* Placeholder card 3 with video aspect ratio */}
            <div className="aspect-video rounded-xl bg-muted/50" />
          </div>

          {/* Bottom area - Large content section */}
          {/* Takes remaining vertical space, responsive min-height */}
          <div className="min-h-screen flex-1 rounded-xl bg-muted/50 md:min-h-min" />
        </div>
      </main>
    </SidebarProvider>
  );
}

// ===== DEFAULT PAGE EXPORT =====
/**
 * Page - Root component for the index page
 * Wraps PageContent with SidebarControlProvider to provide sidebar context
 * This is the component that Next.js will render for the home route
 */
export default function Page() {
  return (
    // SidebarControlProvider makes sidebar state available to all child components
    <SidebarControlProvider>
      <PageContent />
    </SidebarControlProvider>
  );
}

