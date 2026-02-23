// ===== IMPORTS =====

// Sidebar UI components from shadcn/ui
// These provide the structure and styling for the sidebar
import {
  Sidebar,              // Main sidebar container
  SidebarContent,       // Scrollable content area
  SidebarFooter,        // Footer section at bottom
  SidebarGroup,         // Groups related menu items
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
  Home,       // Dashboard icon
  Inbox,      // Inbox icon
  Calendar,   // Calendar icon
  Search,     // Search icon
  Settings,   // Settings icon
  User,       // User/Profile icon
  FileText,   // Reports icon
  BarChart,   // Analytics icon
} from "lucide-react";

// ===== MENU DATA =====

/**
 * Main menu items array
 * Each item needs: title (display text), url (link destination), icon (component)
 * Replace '#' with actual routes in your application
 */
const menuItems = [
  {
    title: "Dashboard",
    url: "#",  // 🔴 Replace with actual route, e.g., "/dashboard"
    icon: Home,
  },
  {
    title: "Inbox",
    url: "#",  // 🔴 Replace with actual route, e.g., "/inbox"
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "#",  // 🔴 Replace with actual route, e.g., "/calendar"
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",  // 🔴 Replace with actual route, e.g., "/search"
    icon: Search,
  },
];

/**
 * Tools section items array
 * Secondary navigation items for tools/utilities
 */
const toolsItems = [
  {
    title: "Analytics",
    url: "#",  // 🔴 Replace with actual route, e.g., "/analytics"
    icon: BarChart,
  },
  {
    title: "Reports",
    url: "#",  // 🔴 Replace with actual route, e.g., "/reports"
    icon: FileText,
  },
];

// ===== MENU SIDEBAR COMPONENT =====

/**
 * MenuSidebar - Main navigation sidebar component
 * 
 * Features:
 * - collapsible="offcanvas": Sidebar overlays content instead of pushing it
 * - Two navigation sections: Main menu and Tools
 * - Footer with Profile and Settings links
 * - Branded header with "M" logo
 */
export function MenuSidebar() {
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
              <a href="#">  {/* 🔴 Replace with home route */}
                {/* Logo icon - colored square with "M" letter */}
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <span className="text-xl font-bold">M</span>
                </div>
                {/* Branding text next to logo */}
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">Menu</span>
                  <span className="text-xs">Navigation</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* ===== CONTENT SECTION ===== */}
      {/* Scrollable main content area of sidebar */}
      <SidebarContent>

        {/* --- Main Menu Group --- */}
        {/* First navigation section with primary menu items */}
        <SidebarGroup>
          {/* Group label/heading */}
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* Map over menuItems array to create navigation links */}
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {/* asChild makes the link element behave as the button */}
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      {/* Dynamic icon component */}
                      <item.icon />
                      {/* Menu item text */}
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* --- Tools Group --- */}
        {/* Second navigation section with tool/utility items */}
        <SidebarGroup>
          {/* Group label/heading */}
          <SidebarGroupLabel>Tools</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* Map over toolsItems array to create tool links */}
              {toolsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      {/* Dynamic icon component */}
                      <item.icon />
                      {/* Tool item text */}
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
      {/* Bottom section with user/settings links */}
      <SidebarFooter>
        <SidebarMenu>
          {/* Profile link */}
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="#">  {/* 🔴 Replace with profile route */}
                <User />
                <span>Profile</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          {/* Settings link */}
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="#">  {/* 🔴 Replace with settings route */}
                <Settings />
                <span>Settings</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
