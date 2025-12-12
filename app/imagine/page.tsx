"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import Ai03 from "@/components/ai-03"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

export default function ImaginePage() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 56)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="relative flex flex-1 h-full w-full overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-4xl">😂</span>
          </div>
          <div className="absolute bottom-8 left-0 w-1/2 flex justify-center z-10">
            <Ai03 className="w-full max-w-sm" />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
