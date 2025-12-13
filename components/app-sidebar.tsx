"use client"

import * as React from "react"
import {
  IconDashboard,
  IconFileText,
  IconHelp,
  IconInnerShadowTop,
  IconPalette,
  IconSearch,
  IconSettings,
  IconSkull,
  IconSparkles,
} from "@tabler/icons-react"

import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "BridgitA-I",
    email: "Hi@Bridgit-AI.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "New Drip",
      url: "#",
      icon: IconSparkles,
      isActive: true,
    },
    {
      title: "My Dashboard",
      url: "/my-dashboard",
      icon: IconDashboard,
    },
    {
      title: "My Designs",
      url: "/my-designs",
      icon: IconPalette,
    },
    {
      title: "Templates",
      url: "/templates",
      icon: IconFileText,
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "/settings",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "/help",
      icon: IconHelp,
    },
    {
      title: "Search",
      url: "#",
      icon: IconSearch,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">BRIDGIT - AI</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
