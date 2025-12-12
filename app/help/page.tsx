"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

export default function HelpPage() {
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
        <div className="flex flex-1 flex-col gap-4 p-4 md:gap-6 md:p-6">
          <div className="flex items-center gap-3">
            <span className="text-4xl">💬</span>
            <h1 className="text-3xl font-bold">Get Help</h1>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="space-y-6">
                <div className="rounded-lg border bg-card p-6">
                  <h2 className="text-lg font-semibold mb-4">Getting Started</h2>
                  <p className="text-muted-foreground">Learn the basics and get up and running quickly</p>
                </div>
                <div className="rounded-lg border bg-card p-6">
                  <h2 className="text-lg font-semibold mb-4">FAQs</h2>
                  <p className="text-muted-foreground">Find answers to common questions</p>
                </div>
                <div className="rounded-lg border bg-card p-6">
                  <h2 className="text-lg font-semibold mb-4">Contact Support</h2>
                  <p className="text-muted-foreground">Reach out to our support team</p>
                </div>
              </div>
            </div>
            <div className="rounded-lg border bg-card p-6 h-fit">
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-primary hover:underline">Documentation</a></li>
                <li><a href="#" className="text-primary hover:underline">Video Tutorials</a></li>
                <li><a href="#" className="text-primary hover:underline">Community Forum</a></li>
                <li><a href="#" className="text-primary hover:underline">API Reference</a></li>
              </ul>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
