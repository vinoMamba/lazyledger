import { SquareChartGantt, TableProperties } from "lucide-react"
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu } from "@/components/ui/sidebar"
import { AppLogo } from "./app-logo"
import AppSidebarItem from "./app-siderbar-item"
import { AppSidebarFooter } from "./app-sidebar-footer"

const items = [
  { title: "账目总揽", url: "/overview", icon: <SquareChartGantt />},
  { title: "记账", url: "/workbench", icon: <TableProperties /> },
]

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="flex items-center justify-between">
        <AppLogo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <AppSidebarItem key={item.title} item={item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <AppSidebarFooter />
    </Sidebar>
  )
}
