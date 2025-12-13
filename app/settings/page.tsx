"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import { useState } from "react"

export default function SettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [searchAnalytics, setSearchAnalytics] = useState(true)
  
  const handleSave = () => {
    toast.success("Settings saved successfully!")
  }

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
        <div className="flex flex-1 flex-col gap-6 p-6 overflow-auto">
          <div>
            <h1 className="text-3xl font-bold">Settings</h1>
            <p className="text-muted-foreground mt-1">
              Manage your account settings and preferences
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* Account Settings */}
              <div className="rounded-lg border bg-card">
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="your@email.com"
                        defaultValue="user@example.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="name">Display Name</Label>
                      <Input 
                        id="name" 
                        placeholder="Your name"
                        defaultValue="User"
                      />
                    </div>
                    <Button onClick={handleSave}>Save Changes</Button>
                  </div>
                </div>
              </div>

              {/* Notifications */}
              <div className="rounded-lg border bg-card">
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Notifications</h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive email updates about your search activity
                        </p>
                      </div>
                      <Switch 
                        checked={emailNotifications}
                        onCheckedChange={setEmailNotifications}
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Search Analytics</Label>
                        <p className="text-sm text-muted-foreground">
                          Enable detailed analytics for search performance
                        </p>
                      </div>
                      <Switch 
                        checked={searchAnalytics}
                        onCheckedChange={setSearchAnalytics}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Privacy & Security */}
              <div className="rounded-lg border bg-card">
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Privacy & Security</h2>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="api-key">API Key</Label>
                      <div className="flex gap-2">
                        <Input 
                          id="api-key" 
                          type="password"
                          placeholder="••••••••••••••••"
                          readOnly
                        />
                        <Button variant="outline">Regenerate</Button>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Use this key to integrate your search bars with your backend
                      </p>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <Label>Data Retention</Label>
                      <p className="text-sm text-muted-foreground">
                        Search data is retained for 90 days for analytics purposes
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="rounded-lg border bg-card p-6">
                <h3 className="font-semibold mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    Export Data
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Download Reports
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    View API Docs
                  </Button>
                </div>
              </div>
              
              <div className="rounded-lg border bg-card p-6">
                <h3 className="font-semibold mb-4">Resources</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="text-primary hover:underline">Documentation</a></li>
                  <li><a href="#" className="text-primary hover:underline">API Reference</a></li>
                  <li><a href="#" className="text-primary hover:underline">Community</a></li>
                  <li><a href="#" className="text-primary hover:underline">Support</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
