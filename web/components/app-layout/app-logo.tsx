import { CircleDollarSign } from "lucide-react"
import { SidebarMenuButton } from "@/components/ui/sidebar"
import { ModeToggle } from "../theme/mode-toggle"

export const AppLogo = () => {
  return (
    <SidebarMenuButton
      size="lg"
      className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
    >
      <div className="flex items-center justify-between gap-2 w-full pr-2">
        <div className="flex items-center gap-2">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <CircleDollarSign className="size-4" />
          </div>
          <span className="truncate font-semibold">LazyLedger</span>
        </div>
        <div className="group-has-[[data-collapsible=icon]]/sidebar-wrapper:hidden">
          <ModeToggle />
        </div>
      </div>
    </SidebarMenuButton>
  )
}
