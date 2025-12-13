"use client"

import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { ModeToggle } from "@/components/ui/theme-toggle"
import { usePathname } from "next/navigation"
import { Context, ContextTrigger, ContextContent, ContextContentHeader, ContextContentBody, ContextInputUsage, ContextOutputUsage, ContextContentFooter } from "@/components/ai-elements/context"

const titles: Record<string, string> = {
  "/my-dashboard": "My Dashboard",
  "/my-designs": "My Designs",
  "/templates": "Templates",
  "/settings": "Settings",
  "/help": "Get Help",
  "/imagine": "Imagine",
}

export function SiteHeader() {
  const pathname = usePathname()
  const title = titles[pathname] || "Dashboard"

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">{title}</h1>
        <div className="ml-auto flex items-center gap-6">
          <Context usedTokens={150} maxTokens={1000} modelId="gpt-4">
            <ContextTrigger />
            <ContextContent>
              <ContextContentHeader />
              <ContextContentBody>
                <ContextInputUsage />
                <ContextOutputUsage />
              </ContextContentBody>
              <ContextContentFooter />
            </ContextContent>
          </Context>
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
