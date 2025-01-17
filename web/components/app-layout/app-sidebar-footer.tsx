import { ChevronsUpDown, Settings } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { SidebarFooter, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { ModeToggle } from "@/components/theme/mode-toggle"
import Link from "next/link"
import { getUserInfoAction } from "@/actions/get-user-info"
import { LogoutButton } from "@/components/auth/logout-button"

export const AppSidebarFooter = async () => {
  const userInfo = await getUserInfoAction()
  const url = `${process.env.NEXT_API_URL}/upload/icon/${userInfo?.avatar}`
  return (
    <SidebarFooter>
      <div className="flex flex-col items-center gap-2 group-has-[[data-collapsible=icon]]/sidebar-wrapper:opacity-100 opacity-0 transition-opacity duration-200">
        <ModeToggle />
      </div>
      <div className="flex items-center gap-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={url} alt="avatar" />
                    <AvatarFallback className="text-xs">A</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{userInfo?.username}</span>
                    <span className="truncate text-xs">{userInfo?.email}</span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side={"bottom"}
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage src={url} alt="avatar" />
                      <AvatarFallback className="text-xs">A</AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">{userInfo?.username}</span>
                      <span className="truncate text-xs">{userInfo?.email}</span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <Link href="/settings/profile">
                    <DropdownMenuItem>
                      <Settings />
                      个人设置
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem>
                    <LogoutButton />
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </div>
    </SidebarFooter>
  )
}
