"use client"

import Link from "next/link"
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import React from "react"

type Props = {
  item: {
    title: string
    url: string
    icon: React.ReactNode
  }
}

export default function AppSidebarItem({ item }: Props) {
  const pathname = usePathname()
  return (
    <SidebarMenuItem
      key={item.title}
      className={cn(pathname.includes(item.url) && "bg-muted rounded-md")}
    >
      <SidebarMenuButton asChild>
        <Link href={item.url}>
          {item.icon}
          <span>{item.title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}
