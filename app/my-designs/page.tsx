"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

export default function IndexedPage() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="flex flex-1 items-center justify-center p-6">
            <div className="flex flex-col items-center gap-4">
              <div className="text-3xl font-semibold">My Designs</div>
              <div className="text-6xl">😊</div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}