"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, Check, Monitor, Smartphone } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

const widgetCode = `<div style="max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="position: relative;">
    <input type="search" placeholder="Search..." aria-label="Search"
           style="width: 100%; padding: 16px 52px 16px 24px; font-size: 16px; 
                  border-radius: 12px; border: 2px solid #0ea5e9; 
                  background: #ffffff; color: #000000; outline: none;
                  transition: all 0.2s; box-shadow: 0 2px 8px rgba(14,165,233,0.1);" 
           onfocus="this.style.borderColor='#0284c7'; this.style.boxShadow='0 4px 16px rgba(14,165,233,0.25)'"
           onblur="this.style.borderColor='#0ea5e9'; this.style.boxShadow='0 2px 8px rgba(14,165,233,0.1)'" />
    <button aria-label="Search" style="position: absolute; right: 8px; top: 50%; transform: translateY(-50%); 
                   background: #0ea5e9; border: none; border-radius: 10px; 
                   width: 42px; height: 42px; cursor: pointer; transition: all 0.2s;
                   display: flex; align-items: center; justify-content: center;"
            onmouseover="this.style.background='#0284c7'; this.style.transform='translateY(-50%) scale(1.05)'"
            onmouseout="this.style.background='#0ea5e9'; this.style.transform='translateY(-50%) scale(1)'">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round">
        <circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path>
      </svg>
    </button>
  </div>
</div>`

const embedCode = `<!-- Embed this search bar widget on your website -->
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
${widgetCode}
</body>
</html>`

export default function MyDesignsPage() {
  const [copied, setCopied] = useState(false)
  const [viewMode, setViewMode] = useState<"desktop" | "mobile">("desktop")

  const copyToClipboard = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      toast.success("Code copied to clipboard!")
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
      toast.error("Failed to copy code")
    }
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
        <div className="flex flex-1 flex-col overflow-hidden">
          <div className="flex flex-col gap-4 p-6 overflow-auto">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">My Designs</h1>
                <p className="text-muted-foreground mt-1">
                  Production-ready search bar widgets for your website
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1">
              {/* Preview Section */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Live Preview</h2>
                  <div className="flex gap-2">
                    <Button
                      variant={viewMode === "desktop" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setViewMode("desktop")}
                      className="gap-2"
                    >
                      <Monitor className="h-4 w-4" />
                      Desktop
                    </Button>
                    <Button
                      variant={viewMode === "mobile" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setViewMode("mobile")}
                      className="gap-2"
                    >
                      <Smartphone className="h-4 w-4" />
                      Mobile
                    </Button>
                  </div>
                </div>
                
                <div className="border rounded-lg bg-muted/30 p-6 flex items-center justify-center min-h-[400px]">
                  <div 
                    className="bg-background rounded-lg shadow-lg transition-all"
                    style={{ 
                      width: viewMode === "desktop" ? "100%" : "375px",
                      maxWidth: viewMode === "desktop" ? "100%" : "375px"
                    }}
                  >
                    <div 
                      className="p-6"
                      dangerouslySetInnerHTML={{ __html: widgetCode }} 
                    />
                  </div>
                </div>
              </div>

              {/* Code Editor Section */}
              <div className="flex flex-col gap-4">
                <h2 className="text-xl font-semibold">Code</h2>
                
                <Tabs defaultValue="html" className="flex-1">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="html">HTML Component</TabsTrigger>
                    <TabsTrigger value="embed">Full Embed</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="html" className="flex-1">
                    <div className="relative rounded-lg border bg-muted/50 overflow-hidden">
                      <div className="absolute top-3 right-3 z-10">
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => copyToClipboard(widgetCode)}
                          className="gap-2"
                        >
                          {copied ? (
                            <>
                              <Check className="h-4 w-4" />
                              Copied!
                            </>
                          ) : (
                            <>
                              <Copy className="h-4 w-4" />
                              Copy
                            </>
                          )}
                        </Button>
                      </div>
                      <pre className="p-4 overflow-auto max-h-[500px] text-sm">
                        <code className="text-foreground">{widgetCode}</code>
                      </pre>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="embed" className="flex-1">
                    <div className="relative rounded-lg border bg-muted/50 overflow-hidden">
                      <div className="absolute top-3 right-3 z-10">
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => copyToClipboard(embedCode)}
                          className="gap-2"
                        >
                          {copied ? (
                            <>
                              <Check className="h-4 w-4" />
                              Copied!
                            </>
                          ) : (
                            <>
                              <Copy className="h-4 w-4" />
                              Copy
                            </>
                          )}
                        </Button>
                      </div>
                      <pre className="p-4 overflow-auto max-h-[500px] text-sm">
                        <code className="text-foreground">{embedCode}</code>
                      </pre>
                    </div>
                  </TabsContent>
                </Tabs>
                
                <div className="rounded-lg border bg-card p-4">
                  <h3 className="font-semibold mb-2">How to Use</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Copy the HTML component code</li>
                    <li>• Paste it into your website</li>
                    <li>• Your site search is pre-configured and ready</li>
                    <li>• Works on any website via simple embed</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}