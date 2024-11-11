import {
    Sidebar,
    SidebarHeader,
    SidebarContent,
    SidebarFooter ,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
  } from "@/components/ui/sidebar"
  import { HomeIcon, PlusIcon, SettingsIcon } from "lucide-react"

  const items = [
    {
        title: "Dashboard",
        href: "/ai/dashboard",
        icon: HomeIcon,
    }, {
        title: 'New Agent',
        href: "/ai/create",
        icon: PlusIcon,
    },
    ,  {
        title: "Settings",
        href: "/ai/settings",
        icon: SettingsIcon,
    },
    // ... additional items can be added here
  ]

  
  export function AppSidebar() {
    return (
      <Sidebar>
        <SidebarHeader />
        <SidebarContent>
        <SidebarMenu>
              {items.map((item) => item && (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.href}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          <SidebarGroup />
          <SidebarGroup />
        </SidebarContent>
        <SidebarFooter />
      </Sidebar>
    )
  }
  