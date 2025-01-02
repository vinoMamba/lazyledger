"use client"

import { logoutAction } from "@/actions/logout"
import { LogOut } from "lucide-react"
import { useRouter } from "next/navigation"

export const LogoutButton = () => {

  const router = useRouter()
  const handleLogout = async () => {
    await logoutAction()
    router.replace("/")
  }
  return (
    <div className="flex items-center gap-2" onClick={handleLogout}>
      <LogOut className="size-4" />
      退出登录
    </div>
  )
}
