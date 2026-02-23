# Test Components - Next.js with Sidebar System

This is a [Next.js](https://nextjs.org) project with a flexible, multi-type sidebar component system built using [shadcn/ui](https://ui.shadcn.com/).

## Features

- **Multiple Sidebar Types**: Menu, Notifications, and Settings sidebars
- **Offcanvas Mode**: Sidebars overlay content instead of pushing it
- **Global State Management**: Context-based sidebar control
- **Responsive Design**: Works on mobile and desktop
- **Type-Safe**: Full TypeScript support
- **Customizable**: Easy to extend with new sidebar types

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

## Sidebar System

### Components

- **MenuSidebar** (`src/components/menu-sidebar.tsx`) - Main navigation sidebar
- **NotificationsSidebar** (`src/components/notifications-sidebar.tsx`) - Notifications panel with API integration
- **SettingsSidebar** (`src/components/settings-sidebar.tsx`) - Settings configuration panel

### State Management

- **SidebarControlProvider** (`src/contexts/sidebar-context.tsx`) - Global context for managing which sidebar is active
- **useSidebarControl** - Hook for accessing sidebar state

### Usage

#### Switching Between Sidebars

Use the `useSidebarControl` hook to access and control sidebars:

```tsx
import { useSidebarControl } from "@/contexts/sidebar-context";

function MyComponent() {
  const { sidebarType, openSidebar } = useSidebarControl();

  return (
    <div>
      {/* Current sidebar type */}
      <p>Active: {sidebarType}</p>

      {/* Open a specific sidebar */}
      <button onClick={() => openSidebar("menu")}>Menu</button>
      <button onClick={() => openSidebar("notifications")}>Notifications</button>
      <button onClick={() => openSidebar("settings")}>Settings</button>
    </div>
  );
}
```

#### Opening/Closing Sidebars

Use the `SidebarTrigger` component to toggle the sidebar:

```tsx
import { SidebarTrigger } from "@/components/ui/sidebar";

function Header() {
  return (
    <header>
      <SidebarTrigger /> {/* Built-in toggle button */}
      {/* Your header content */}
    </header>
  );
}
```

### Sidebar Types

#### 1. Menu Sidebar

Navigation menu with two sections:
- **Menu**: Dashboard, Inbox, Calendar, Search
- **Tools**: Analytics, Reports
- **Footer**: Profile, Settings links

**Customize**: Edit `menuItems` and `toolsItems` arrays in `src/components/menu-sidebar.tsx`

#### 2. Notifications Sidebar

Displays notifications with features:
- Mark all as read
- Clear all notifications
- Individual notification click to mark as read
- Loading, error, and empty states
- Unread count badge

**API Integration**: Replace marked sections (🔴) with your API endpoints in the component.

#### 3. Settings Sidebar

Configuration menu with two sections:
- **Account**: Profile, Security, Privacy
- **Application**: Appearance, Notifications, Language, Data & Storage
- **Footer**: Sign Out link

**Customize**: Edit `accountSettings` and `appSettings` arrays in `src/components/settings-sidebar.tsx`

### Adding a New Sidebar Type

1. **Update the type definition** in `src/contexts/sidebar-context.tsx`:
```tsx
type SidebarType = "menu" | "notifications" | "settings" | "yourNewType";
```

2. **Create your sidebar component** (e.g., `src/components/your-new-sidebar.tsx`):
```tsx
import { Sidebar, SidebarContent, SidebarHeader } from "@/components/ui/sidebar";

export function YourNewSidebar() {
  return (
    <Sidebar collapsible="offcanvas">
      <SidebarHeader>{/* Your header */}</SidebarHeader>
      <SidebarContent>{/* Your content */}</SidebarContent>
    </Sidebar>
  );
}
```

3. **Add conditional rendering** in `src/pages/index.tsx`:
```tsx
{sidebarType === "yourNewType" && <YourNewSidebar />}
```

4. **Add a toggle button**:
```tsx
<Button onClick={() => openSidebar("yourNewType")}>
  Your Sidebar
</Button>
```

### API Integration (Notifications)

The NotificationsSidebar includes marked integration points (🔴). Replace these sections with your API calls:

- **Fetch notifications**: `GET /api/notifications`
- **Mark all as read**: `POST /api/notifications/mark-all-read`
- **Clear all**: `DELETE /api/notifications`
- **Mark single as read**: `POST /api/notifications/:id/read`

### Customizing Routes

Replace placeholder `#` URLs with actual routes in the sidebar components:

```tsx
const menuItems = [
  {
    title: "Dashboard",
    url: "/dashboard", // ← Change from "#" to your route
    icon: Home,
  },
  // ...
];
```

### Default Behavior

- **Default sidebar type**: Menu
- **Default open state**: Closed (`defaultOpen={false}`)
- **Layout**: Full-width content (no SidebarInset)
- **Mode**: Offcanvas (overlay instead of push)

## File Structure

```
src/
├── components/
│   ├── menu-sidebar.tsx          # Navigation sidebar
│   ├── notifications-sidebar.tsx # Notifications panel
│   ├── settings-sidebar.tsx      # Settings sidebar
│   └── ui/                       # shadcn/ui components
├── contexts/
│   └── sidebar-context.tsx       # Global state management
├── hooks/
│   └── use-mobile.ts             # Mobile detection hook
├── lib/
│   └── utils.ts                  # Utility functions
├── pages/
│   ├── index.tsx                 # Main page with sidebar integration
│   ├── _app.tsx                  # Next.js app wrapper
│   ├── _document.tsx             # HTML document structure
│   └── api/
│       └── hello.ts              # Example API route
└── styles/
    └── globals.css               # Global styles & CSS variables
```

## Dependencies

- **Next.js** - React framework with Pages Router
- **shadcn/ui** - UI component library
- **lucide-react** - Icon library
- **Tailwind CSS v4** - Styling
- **TypeScript** - Type safety

## API Routes

[API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn-pages-router) - an interactive Next.js tutorial.
- [shadcn/ui Documentation](https://ui.shadcn.com/) - learn about the UI components used in this project.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying) for more details.
