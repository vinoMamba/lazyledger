import { SidebarTrigger } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import { ModeToggle } from "../theme/mode-toggle"
import { AppUser } from "./app-user"


export const AppTopNav = () => {
  return (
    <header className={cn(
      "w-full z-50 bg-sidebar/80 backdrop-blur-sm md:hidden flex justify-between items-center h-14 shrink-0 transition-[width,height] ease-linear border-b border-b-border/50 fixed top-0 left-0 right-0",
      "group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12",
    )}>
      <div className="flex items-center gap-2 pl-4">
        <SidebarTrigger />
      </div>
      <nav className="flex items-center gap-8 pr-8">
        <div className="flex items-center gap-4">
          <ModeToggle />
          <AppUser />
        </div>
      </nav>
    </header>
  )
}
