// ===== IMPORTS =====

// Sidebar UI components from shadcn/ui
// These provide the structure and styling for the sidebar
import {
  Sidebar,              // Main sidebar container
  SidebarContent,       // Scrollable content area
  SidebarFooter,        // Footer section at bottom
  SidebarGroup,         // Groups related settings items
  SidebarGroupContent,  // Content wrapper for groups
  SidebarGroupLabel,    // Label/heading for groups
  SidebarHeader,        // Header section at top
  SidebarMenu,          // Menu container
  SidebarMenuButton,    // Styled button for menu items
  SidebarMenuItem,      // Individual menu item wrapper
  SidebarRail,          // Clickable rail/border (not used here)
} from "@/components/ui/sidebar";

// Icon components from lucide-react
import {
  Settings, // Settings gear icon (used in header)
  User,     // Profile/user icon
  Bell,     // Notifications icon
  Shield,   // Security icon
  Palette,  // Appearance/theme icon
  Globe,    // Language/global icon
  Lock,     // Privacy icon
  Database, // Data & storage icon
} from "lucide-react";

// ===== SETTINGS DATA =====

/**
 * Account settings items array
 * Personal/user-related configuration options
 * 🔴 TODO: Replace '#' URLs with actual routes in your application
 */
const accountSettings = [
  {
    title: "Profile",
    url: "#",  // 🔴 Replace with actual route, e.g., "/settings/profile"
    icon: User,
  },
  {
    title: "Security",
    url: "#",  // 🔴 Replace with actual route, e.g., "/settings/security"
    icon: Shield,
  },
  {
    title: "Privacy",
    url: "#",  // 🔴 Replace with actual route, e.g., "/settings/privacy"
    icon: Lock,
  },
];

/**
 * Application settings items array
 * App-wide configuration options
 * 🔴 TODO: Replace '#' URLs with actual routes in your application
 */
const appSettings = [
  {
    title: "Appearance",
    url: "#",  // 🔴 Replace with actual route, e.g., "/settings/appearance"
    icon: Palette,
  },
  {
    title: "Notifications",
    url: "#",  // 🔴 Replace with actual route, e.g., "/settings/notifications"
    icon: Bell,
  },
  {
    title: "Language",
    url: "#",  // 🔴 Replace with actual route, e.g., "/settings/language"
    icon: Globe,
  },
  {
    title: "Data & Storage",
    url: "#",  // 🔴 Replace with actual route, e.g., "/settings/data"
    icon: Database,
  },
];

// ===== SETTINGS SIDEBAR COMPONENT =====

/**
 * SettingsSidebar - Sidebar component for application settings
 * 
 * Features:
 * - collapsible="offcanvas": Sidebar overlays content instead of pushing it
 * - Two settings sections: Account and Application
 * - Footer with Sign Out action
 * - Branded header with Settings icon
 * 
 * Structure:
 * - Header: Settings icon and title
 * - Content: Two groups (Account & Application)
 * - Footer: Sign Out link with destructive styling
 */
export function SettingsSidebar() {
  return (
    // Sidebar with offcanvas behavior (overlays content with backdrop)
    <Sidebar collapsible="offcanvas">

      {/* ===== HEADER SECTION ===== */}
      {/* Branding area at the top of the sidebar */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            {/* Large menu button for branding/logo */}
            {/* asChild passes props to the child 'a' element */}
            <SidebarMenuButton size="lg" asChild>
              <a href="#">  {/* 🔴 Replace with settings home route */}
                {/* Logo icon - colored square with Settings gear */}
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Settings className="size-4" />
                </div>
                {/* Branding text next to logo */}
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">Settings</span>
                  <span className="text-xs">Configuration</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* ===== CONTENT SECTION ===== */}
      {/* Scrollable main content area of sidebar */}
      <SidebarContent>

        {/* --- Account Settings Group --- */}
        {/* First section with user/account-related settings */}
        <SidebarGroup>
          {/* Group label/heading */}
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* Map over accountSettings array to create setting links */}
              {accountSettings.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {/* asChild makes the link element behave as the button */}
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      {/* Dynamic icon component */}
                      <item.icon />
                      {/* Setting item text */}
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* --- Application Settings Group --- */}
        {/* Second section with app-wide configuration settings */}
        <SidebarGroup>
          {/* Group label/heading */}
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* Map over appSettings array to create setting links */}
              {appSettings.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      {/* Dynamic icon component */}
                      <item.icon />
                      {/* Setting item text */}
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* ===== FOOTER SECTION ===== */}
      {/* Bottom section with sign out action */}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              {/* Sign out link with destructive (red) color */}
              {/* 🔴 TODO: Replace '#' with actual logout handler or route */}
              {/* Example: onClick={() => signOut()} or href="/api/auth/signout" */}
              <a href="#" className="text-destructive">
                <span>Sign Out</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
