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
import { Textarea } from "@/components/ui/textarea"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { toast } from "sonner"
import { Search, MessageCircle, BookOpen, HelpCircle } from "lucide-react"

export default function HelpPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success("Support request submitted! We'll get back to you soon.")
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
            <h1 className="text-3xl font-bold">Get Help</h1>
            <p className="text-muted-foreground mt-1">
              Find answers, get support, and learn how to use the platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="rounded-lg border bg-card p-6 hover:shadow-md transition-shadow">
              <BookOpen className="h-8 w-8 mb-3 text-primary" />
              <h3 className="font-semibold mb-2">Documentation</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Comprehensive guides and references
              </p>
              <Button variant="link" className="p-0 h-auto">
                Browse Docs →
              </Button>
            </div>
            
            <div className="rounded-lg border bg-card p-6 hover:shadow-md transition-shadow">
              <HelpCircle className="h-8 w-8 mb-3 text-primary" />
              <h3 className="font-semibold mb-2">FAQs</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Answers to frequently asked questions
              </p>
              <Button variant="link" className="p-0 h-auto">
                View FAQs →
              </Button>
            </div>
            
            <div className="rounded-lg border bg-card p-6 hover:shadow-md transition-shadow">
              <MessageCircle className="h-8 w-8 mb-3 text-primary" />
              <h3 className="font-semibold mb-2">Community</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Connect with other users
              </p>
              <Button variant="link" className="p-0 h-auto">
                Join Forum →
              </Button>
            </div>
            
            <div className="rounded-lg border bg-card p-6 hover:shadow-md transition-shadow">
              <Search className="h-8 w-8 mb-3 text-primary" />
              <h3 className="font-semibold mb-2">Search Docs</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Find exactly what you need
              </p>
              <Button variant="link" className="p-0 h-auto">
                Search Now →
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* Getting Started */}
              <div className="rounded-lg border bg-card">
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Getting Started</h2>
                  <div className="space-y-4">
                    <div className="rounded-lg bg-muted p-4">
                      <h3 className="font-semibold mb-2">1. Create Your Search Bar</h3>
                      <p className="text-sm text-muted-foreground">
                        Go to &quot;New Drip&quot; and describe the style of search bar you want. Our AI will generate it instantly.
                      </p>
                    </div>
                    <div className="rounded-lg bg-muted p-4">
                      <h3 className="font-semibold mb-2">2. Preview & Customize</h3>
                      <p className="text-sm text-muted-foreground">
                        View your search bar in real-time. Make adjustments by describing changes in the chat.
                      </p>
                    </div>
                    <div className="rounded-lg bg-muted p-4">
                      <h3 className="font-semibold mb-2">3. Copy & Embed</h3>
                      <p className="text-sm text-muted-foreground">
                        Once satisfied, copy the embed code and paste it into your website. It's that simple!
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQs */}
              <div className="rounded-lg border bg-card">
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
                  <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                      <AccordionTrigger>How do I embed my search bar?</AccordionTrigger>
                      <AccordionContent>
                        After generating your search bar, go to &quot;My Designs&quot; and click the copy button. 
                        Paste the code into your website&apos;s HTML. The search functionality is pre-configured and ready to use.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger>Is the search already configured?</AccordionTrigger>
                      <AccordionContent>
                        Yes! Your site search is configured from sign-up and uses Upstash Search with semantic indexing. 
                        No additional configuration needed.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger>Can I customize the search bar style?</AccordionTrigger>
                      <AccordionContent>
                        Absolutely! Describe any style changes in the chat, and our AI will generate a new version. 
                        You can create unlimited variations.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4">
                      <AccordionTrigger>How do I view my search analytics?</AccordionTrigger>
                      <AccordionContent>
                        Visit &quot;My Dashboard&quot; to see real-time analytics of your users&apos; search activity, 
                        including search queries, results, and performance metrics.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>

              {/* Contact Support */}
              <div className="rounded-lg border bg-card">
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Contact Support</h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input id="subject" placeholder="How can we help?" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea 
                        id="message" 
                        placeholder="Describe your issue or question..."
                        rows={5}
                        required
                      />
                    </div>
                    <Button type="submit">Submit Request</Button>
                  </form>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="rounded-lg border bg-card p-6">
                <h3 className="font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="text-primary hover:underline">Full Documentation</a></li>
                  <li><a href="#" className="text-primary hover:underline">Video Tutorials</a></li>
                  <li><a href="#" className="text-primary hover:underline">API Reference</a></li>
                  <li><a href="#" className="text-primary hover:underline">Upstash Search Guide</a></li>
                  <li><a href="#" className="text-primary hover:underline">Integration Examples</a></li>
                </ul>
              </div>
              
              <div className="rounded-lg border bg-card p-6">
                <h3 className="font-semibold mb-4">Support Hours</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Our support team is available:
                </p>
                <ul className="text-sm space-y-1">
                  <li>Monday - Friday: 9AM - 6PM EST</li>
                  <li>Saturday: 10AM - 4PM EST</li>
                  <li>Sunday: Closed</li>
                </ul>
              </div>
              
              <div className="rounded-lg border bg-card p-6">
                <h3 className="font-semibold mb-4">Emergency Support</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  For critical issues affecting production:
                </p>
                <Button variant="destructive" className="w-full">
                  Contact Emergency Support
                </Button>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
