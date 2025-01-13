import { AppSidebar } from "@/components/app-layout/app-sidebar";
import { QueryProvider } from "@/components/query-provider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";



export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <SidebarProvider>
        <TooltipProvider>
          <AppSidebar />
          <main className="flex flex-col w-full">
            <div className="h-full">
              {children}
            </div>
          </main>
        </TooltipProvider>
      </SidebarProvider>
    </QueryProvider>
  )
}
