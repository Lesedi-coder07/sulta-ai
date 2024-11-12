import React from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/Sidebar/app-sidebar"
import AgentCards from '@/components/dashboard/AgentCards'
import { AgentSelector } from '@/components/dashboard/agent-selector';
import { GradientText } from "@/components/ui/gradient-text";

function Dashboard() {
    return (
        <div>
            <SidebarProvider>
                <AppSidebar />
                <main className=''>
                    <SidebarTrigger />
                    <div className='p-3 flex flex-col justify-between  w-full gap-9 wz'>
                 
                        <h1 className='mx-4 text-lg font-bold'>Hi, John</h1>
                        <AgentSelector />
                    </div>
                </main>
            </SidebarProvider>
        </div>
    )
}

export default Dashboard
