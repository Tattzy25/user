"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

import data from "./data.json"

export default function MyDashboardPage() {
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
        <div className="flex flex-1 flex-col overflow-auto">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 p-4 md:gap-6 md:p-6">
              <div>
                <h1 className="text-3xl font-bold">My Dashboard</h1>
                <p className="text-muted-foreground mt-1">
                  Monitor your search bar performance and user analytics in real-time
                </p>
              </div>
              <SectionCards />
              <div className="rounded-lg border bg-card p-6">
                <h2 className="text-xl font-semibold mb-4">Search Activity</h2>
                <ChartAreaInteractive />
              </div>
              <div className="rounded-lg border bg-card">
                <div className="p-6 border-b">
                  <h2 className="text-xl font-semibold">Recent Searches</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Real-time semantic search queries from your users
                  </p>
                </div>
                <DataTable data={data} />
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
