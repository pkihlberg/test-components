// ===== IMPORTS =====

// Sidebar UI components from shadcn/ui
import {
  Sidebar,              // Main sidebar container
  SidebarContent,       // Scrollable content area
  SidebarFooter,        // Footer section at bottom
  SidebarGroup,         // Groups related content
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
  Bell,       // Notification bell icon
  CheckCheck, // Mark all as read icon
  Trash2,     // Clear/delete icon
  Loader2     // Loading spinner icon
} from "lucide-react";

// Button component for actions
import { Button } from "@/components/ui/button";

// React hooks for state and side effects
import { useState, useEffect } from "react";

// ===== TYPE DEFINITIONS & DUMMY DATA =====

/**
 * Dummy notification data structure
 * 🔴 TODO: Replace this with your actual notification type from your backend
 * 
 * Example API response type:
 * type Notification = {
 *   id: number;
 *   title: string;
 *   message: string;
 *   time: string;
 *   unread: boolean;
 * }
 */
const dummyNotifications = [
  {
    id: 1,
    title: "New message from John",
    message: "Hey, can we schedule a meeting?",
    time: "2 min ago",
    unread: true,
  },
  {
    id: 2,
    title: "System Update",
    message: "Your system has been updated successfully",
    time: "1 hour ago",
    unread: true,
  },
  {
    id: 3,
    title: "Payment Received",
    message: "Invoice #1234 has been paid",
    time: "3 hours ago",
    unread: false,
  },
  {
    id: 4,
    title: "Task completed",
    message: "Your report is ready for review",
    time: "5 hours ago",
    unread: false,
  },
];

// ===== NOTIFICATIONS SIDEBAR COMPONENT =====

/**
 * NotificationsSidebar - Sidebar component for displaying notifications
 * 
 * Features:
 * - Fetches notifications on mount (marked with 🔴 for API integration)
 * - Loading, error, and empty states
 * - Mark all as read functionality
 * - Clear all notifications functionality
 * - Individual notification click to mark as read
 * - Shows unread count badge
 * 
 * State Management:
 * - notifications: Array of notification objects
 * - isLoading: Boolean for loading state
 * - error: String for error messages
 */
export function NotificationsSidebar() {
  // ===== STATE DECLARATIONS =====

  // Store notifications array (starts with dummy data)
  const [notifications, setNotifications] = useState(dummyNotifications);

  // Track loading state for API calls
  const [isLoading, setIsLoading] = useState(false);

  // Store error messages (null when no error)
  const [error, setError] = useState<string | null>(null);

  // ===== DATA FETCHING =====

  /**
   * 🔴 DATA FETCHING: Fetch notifications from API on component mount
   * 
   * TODO: Replace the commented code with your actual API endpoint
   * Example endpoint: GET /api/notifications
   * 
   * This effect runs once when component mounts (empty dependency array [])
   */
  useEffect(() => {
    const fetchNotifications = async () => {
      // Set loading state to show spinner
      setIsLoading(true);
      setError(null);

      try {
        // 📡 Replace this section with your actual API call
        // Uncomment and modify these lines:
        // const response = await fetch('/api/notifications');
        // if (!response.ok) throw new Error('Failed to fetch notifications');
        // const data = await response.json();
        // setNotifications(data);

        // Simulating API call with delay (remove in production)
        await new Promise(resolve => setTimeout(resolve, 500));
        setNotifications(dummyNotifications);
      } catch (err) {
        // Handle errors and display error message
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        // Always turn off loading state when done
        setIsLoading(false);
      }
    };

    // Execute the fetch function
    fetchNotifications();
  }, []); // Empty array means run once on mount

  // ===== MUTATION HANDLERS =====

  /**
   * 🔴 MUTATION: Mark all notifications as read
   * 
   * TODO: Replace with your actual API endpoint
   * Example endpoint: POST /api/notifications/mark-all-read
   */
  const handleMarkAllAsRead = async () => {
    try {
      // 📡 Make API call to mark all as read
      // Uncomment and modify:
      // await fetch('/api/notifications/mark-all-read', { method: 'POST' });

      // Update local state optimistically (before API response)
      // Maps over all notifications and sets unread to false
      setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
    } catch (err) {
      console.error('Failed to mark all as read:', err);
      // 🔴 TODO: Add user-facing error handling (toast notification, etc.)
    }
  };

  /**
   * 🔴 MUTATION: Clear all notifications
   * 
   * TODO: Replace with your actual API endpoint
   * Example endpoint: DELETE /api/notifications
   */
  const handleClearAll = async () => {
    try {
      // 📡 Make API call to clear all notifications
      // Uncomment and modify:
      // await fetch('/api/notifications', { method: 'DELETE' });

      // Update local state to empty array
      setNotifications([]);
    } catch (err) {
      console.error('Failed to clear notifications:', err);
      // 🔴 TODO: Add user-facing error handling (toast notification, etc.)
    }
  };

  // ===== RENDER =====

  return (
    // Sidebar with offcanvas behavior (overlays content with backdrop)
    <Sidebar collapsible="offcanvas">

      {/* ===== HEADER SECTION ===== */}
      {/* Custom header with title and action buttons */}
      <SidebarHeader>
        {/* Flex container for horizontal layout */}
        <div className="flex items-center justify-between px-2 py-2">

          {/* Left side: Bell icon + title */}
          <div className="flex items-center gap-2">
            <Bell className="size-5" />
            <h2 className="text-lg font-semibold">Notifications</h2>
          </div>

          {/* Right side: Action buttons */}
          <div className="flex items-center gap-1">

            {/* Mark all as read button */}
            {/* CheckCheck icon indicates the action */}
            <Button
              variant="ghost"
              size="icon"
              className="size-7"
              title="Mark all as read"
              onClick={handleMarkAllAsRead}
              disabled={isLoading}  // Disable during loading
            >
              <CheckCheck className="size-4" />
            </Button>

            {/* Clear all notifications button */}
            {/* Trash2 icon indicates deletion */}
            <Button
              variant="ghost"
              size="icon"
              className="size-7"
              title="Clear all"
              onClick={handleClearAll}
              disabled={isLoading}  // Disable during loading
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
        </div>
      </SidebarHeader>

      {/* ===== CONTENT SECTION ===== */}
      {/* Scrollable area containing notification list */}
      <SidebarContent>
        <SidebarGroup>

          {/* Group label with unread count badge */}
          <SidebarGroupLabel>
            Recent
            {/* Count of unread notifications */}
            {/* Filters notifications array to count unread ones */}
            <span className="ml-auto text-sidebar-primary">
              {notifications.filter((n) => n.unread).length} new
            </span>
          </SidebarGroupLabel>

          <SidebarGroupContent>

            {/* ===== CONDITIONAL RENDERING: LOADING STATE ===== */}
            {/* Shows animated spinner while fetching data */}
            {isLoading && (
              <div className="flex items-center justify-center p-8">
                {/* Loader2 with animate-spin class creates spinning animation */}
                <Loader2 className="size-6 animate-spin text-muted-foreground" />
              </div>
            )}

            {/* ===== CONDITIONAL RENDERING: ERROR STATE ===== */}
            {/* Shows error message if fetch fails */}
            {error && (
              <div className="p-4 text-center text-sm text-destructive">
                {error}
              </div>
            )}

            {/* ===== CONDITIONAL RENDERING: EMPTY STATE ===== */}
            {/* Shows message when no notifications exist */}
            {!isLoading && !error && notifications.length === 0 && (
              <div className="p-8 text-center text-sm text-muted-foreground">
                No notifications
              </div>
            )}

            {/* ===== CONDITIONAL RENDERING: DATA DISPLAY ===== */}
            {/* Shows notifications list when data exists */}
            {!isLoading && !error && notifications.length > 0 && (
              <div className="flex flex-col gap-2 p-2">
                {/* Map over notifications array to render each notification */}
                {notifications.map((notification) => (
                  <button
                    key={notification.id}
                    // Dynamic classes: highlight if unread
                    // bg-sidebar-accent/50 adds subtle background to unread items
                    className={`flex flex-col gap-1.5 rounded-md p-3 text-left transition-colors hover:bg-sidebar-accent ${notification.unread ? "bg-sidebar-accent/50" : ""
                      }`}
                    // Click handler to mark individual notification as read
                    onClick={async () => {
                      // 🔴 MUTATION: Mark individual notification as read
                      // TODO: Replace with actual API call
                      // Uncomment and modify:
                      // await fetch(`/api/notifications/${notification.id}/read`, { method: 'POST' });

                      // Update local state optimistically
                      // Maps over notifications and updates the clicked one
                      setNotifications(prev =>
                        prev.map(n =>
                          n.id === notification.id ? { ...n, unread: false } : n
                        )
                      );
                    }}
                  >
                    {/* Top row: Title and unread indicator */}
                    <div className="flex items-start justify-between gap-2">
                      {/* Notification title with line-clamp-1 to truncate long text */}
                      <span className="text-sm font-medium line-clamp-1">
                        {notification.title}
                      </span>
                      {/* Unread indicator dot - only shows if notification.unread is true */}
                      {notification.unread && (
                        <span className="mt-0.5 size-2 shrink-0 rounded-full bg-sidebar-primary" />
                      )}
                    </div>

                    {/* Notification message with line-clamp-2 to show max 2 lines */}
                    <p className="text-xs text-sidebar-foreground/70 line-clamp-2">
                      {notification.message}
                    </p>

                    {/* Timestamp at bottom */}
                    <span className="text-xs text-sidebar-foreground/50">
                      {notification.time}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* ===== FOOTER SECTION ===== */}
      {/* Link to view all notifications page */}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              {/* 🔴 Replace '#' with actual route to notifications page */}
              <a href="#" className="justify-center">
                <span>View All Notifications</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
