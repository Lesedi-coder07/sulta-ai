import React from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/Sidebar/app-sidebar"
import AgentCards from '@/components/dashboard/AgentCards'

function Dashboard() {
  return (
    <div>
         <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
      <div className='p-3 flex flex-row justify-between items-center w-full gap-9 wz'>
        <h1 className='text-2xl font-bold'>Sulta AI</h1>
        <AgentCards />
      </div>
      </main>
    </SidebarProvider>
    </div>
  )
}

export default Dashboard
