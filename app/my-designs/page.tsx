"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Copy } from "lucide-react"
import { useState } from "react"

const widgetCode = `<div style="max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="position: relative;">
    <input type="text" placeholder="Thanks Sonnet 4"
           style="width: 100%; padding: 16px 48px 16px 20px; font-size: 16px; 
                  border-radius: 50px; border: 2px solid #ff6b00; 
                  background: #1a1a1a; color: white; outline: none;
                  box-shadow: 0 0 20px rgba(255,107,0,0.6), 0 0 40px rgba(255,107,0,0.4);" />
    <button style="position: absolute; right: 8px; top: 50%; transform: translateY(-50%); 
                   background: #ff6b00; border: none; border-radius: 50%; 
                   width: 40px; height: 40px; cursor: pointer;">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
        <circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path>
      </svg>
    </button>
  </div>
</div>`

export default function IndexedPage() {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(widgetCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

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
          <div className="flex flex-1 p-6">
            {/* Full Width Header */}
            <div className="w-full">
              <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">My Designs</h1>
                <p className="text-lg text-muted-foreground">
                  Your creative arsenal of custom widgets, ready to elevate any project with style and functionality.
                </p>
              </div>
              
              {/* Widget Display */}
              <div className="max-w-4xl">
                {/* Widget Preview */}
                <div className="mb-6 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4">Orange Neon Search Bar</h3>
                  <div dangerouslySetInnerHTML={{ __html: widgetCode }} />
                </div>
                
                {/* Accordion with Code */}
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="code">
                    <AccordionTrigger className="text-left">
                      View Code
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="relative">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={copyToClipboard}
                          className="absolute top-4 right-4 z-10"
                        >
                          <Copy className="h-5 w-5" />
                        </Button>
                        <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto text-sm pr-16">
                          <code>{widgetCode}</code>
                        </pre>
                        {copied && (
                          <div className="absolute top-4 right-20 bg-green-500 text-white px-2 py-1 rounded text-sm">
                            Copied!
                          </div>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}