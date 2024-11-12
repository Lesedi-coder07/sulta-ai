import { AgentCreationForm } from "@/components/agent-creation/agent-creation-form";
import { AppSidebar } from "@/components/Sidebar/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function CreateAgentPage() {
    return (
        <SidebarProvider>
            <AppSidebar />




            <main className="container">
                <SidebarTrigger />
                <div className="container mx-auto max-w-4xl px-4 py-8">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold tracking-tight">Create AI Agent</h1>
                        <p className="text-muted-foreground">
                            Configure your custom AI agent with specialized capabilities
                        </p>
                    </div>
                    <AgentCreationForm />
                </div>

            </main>
        </SidebarProvider>
    );
}