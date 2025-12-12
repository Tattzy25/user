"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

export default function SettingsPage() {
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
            <span className="text-4xl">⚙️</span>
            <h1 className="text-3xl font-bold">Settings</h1>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="space-y-6">
                <div className="rounded-lg border bg-card p-6">
                  <h2 className="text-lg font-semibold mb-4">Account Settings</h2>
                  <p className="text-muted-foreground">Configure your account preferences</p>
                </div>
                <div className="rounded-lg border bg-card p-6">
                  <h2 className="text-lg font-semibold mb-4">Notifications</h2>
                  <p className="text-muted-foreground">Manage your notification preferences</p>
                </div>
                <div className="rounded-lg border bg-card p-6">
                  <h2 className="text-lg font-semibold mb-4">Privacy</h2>
                  <p className="text-muted-foreground">Control your privacy settings</p>
                </div>
              </div>
            </div>
            <div className="rounded-lg border bg-card p-6 h-fit">
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-primary hover:underline">Profile</a></li>
                <li><a href="#" className="text-primary hover:underline">Security</a></li>
                <li><a href="#" className="text-primary hover:underline">Billing</a></li>
                <li><a href="#" className="text-primary hover:underline">Integrations</a></li>
              </ul>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
