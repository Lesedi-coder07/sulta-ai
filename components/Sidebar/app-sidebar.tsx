import {
    Sidebar,
    SidebarHeader,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,

} from "@/components/ui/sidebar"
import { HomeIcon, PlusIcon, SettingsIcon, DollarSignIcon, LogOutIcon } from "lucide-react"
import { Button } from "../ui/button"
import { auth } from "@/app/api/firebase/firebaseConfig"

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

    {
        title: 'Earnings',
        href: '/ai/earnings',
        icon: DollarSignIcon,
    }
    , {
        title: "Settings",
        href: "/ai/settings",
        icon: SettingsIcon,
    }
    // ... additional items can be added here
]


export function AppSidebar() {
    const handleLogout = () => {
       auth.signOut();
    }
    return (
        <Sidebar className="flex flex-col justify-center items-center">
            <SidebarHeader className="mx-4" />
            <SidebarContent>
                <SidebarMenu>
                    {items.map((item) => item && (
                        <SidebarMenuItem className="text-lg mx-4 font-medium
                         hover:bg-neutral-100 dark:hover:bg-neutral-800" key={item.title}>
                            <SidebarMenuButton asChild>
                                <a href={item.href}>
                                    <item.icon />
                                    <span>{item.title}</span>
                                </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}

                    <SidebarMenuItem className="text-lg mx-4 transition-all duration-300 font-medium
                         hover:bg-neutral-100 dark:hover:bg-neutral-800">
                        <SidebarMenuButton asChild>
                            <Button onClick={handleLogout}>
                                <LogOutIcon />
                                <span>Logout</span>
                            </Button>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
                <SidebarGroup />
                <SidebarGroup />
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}
