"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable"
import {
  WebPreview,
  WebPreviewNavigation,
  WebPreviewUrl,
  WebPreviewBody,
} from "@/components/ai-elements/web-preview"
import {
  PromptInput,
  PromptInputSubmit,
  PromptInputTextarea,
} from "@/components/ai-elements/prompt-input"
import { Message, MessageContent } from "@/components/ai-elements/message"
import {
  Conversation,
  ConversationContent,
} from "@/components/ai-elements/conversation"
import { Loader } from "@/components/ai-elements/loader"
import { Suggestions, Suggestion } from "@/components/ai-elements/suggestion"
import {
  Artifact,
  ArtifactHeader,
  ArtifactTitle,
  ArtifactActions,
  ArtifactAction,
  ArtifactContent,
} from "@/components/ai-elements/artifact"
import { CodeBlock, CodeBlockCopyButton } from "@/components/ai-elements/code-block"
import {
  Reasoning,
  ReasoningTrigger,
  ReasoningContent,
} from "@/components/ai-elements/reasoning"
import { Button } from "@/components/ui/button"
import { PlusIcon, CheckIcon } from "lucide-react"
import { toast } from "sonner"
import { useIsMobile } from "@/hooks/use-mobile"

interface GeneratedFile {
  name: string
  content: string
}

interface Chat {
  id: string
  demo: string
  files: GeneratedFile[]
  webUrl: string
}

export default function NewDripPage() {
  const router = useRouter()
  const isMobile = useIsMobile()
  const [message, setMessage] = useState("")
  const [currentChat, setCurrentChat] = useState<Chat | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [addedToDesigns, setAddedToDesigns] = useState(false)
  const [chatHistory, setChatHistory] = useState<
    Array<{
      type: "user" | "assistant"
      content: string
    }>
  >([])

  const handleSendMessage = async (value: string) => {
    const hasText = Boolean(value)
    if (!hasText || isLoading) return
    
    const userMessage = value.trim()
    setMessage("")
    setIsLoading(true)
    setAddedToDesigns(false)
    setChatHistory((prev) => [...prev, { type: "user", content: userMessage }])
    
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
          chatId: currentChat?.id,
        }),
      })
      
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to generate widget")
      }
      
      const chat: Chat = await response.json()
      setCurrentChat(chat)
      setChatHistory((prev) => [
        ...prev,
        {
          type: "assistant",
          content: "Your search bar widget is ready! Check the preview and grab the embed code below.",
        },
      ])
    } catch (error) {
      console.error("Error:", error)
      setChatHistory((prev) => [
        ...prev,
        {
          type: "assistant",
          content: error instanceof Error ? error.message : "Sorry, there was an error. Please try again.",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddToDesigns = () => {
    setAddedToDesigns(true)
    toast.success("Widget added to My Designs!")
    setTimeout(() => {
      router.push("/my-designs")
    }, 1500)
  }

  const getEmbedCode = () => {
    if (!currentChat?.files?.length) return ""
    const mainFile = currentChat.files.find(f => 
      f.name.endsWith(".tsx") || f.name.endsWith(".jsx") || f.name.endsWith(".html")
    )
    return mainFile?.content || currentChat.files[0]?.content || ""
  }

  const embedCode = getEmbedCode()

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
          <ResizablePanelGroup 
            direction={isMobile ? "vertical" : "horizontal"} 
            className="flex-1"
          >
            <ResizablePanel defaultSize={isMobile ? 50 : 40} minSize={25}>
              <div className="h-full flex flex-col border-r md:border-r border-b md:border-b-0">
                <div className="border-b p-3 h-14 flex items-center">
                  <h1 className="text-lg font-semibold">New Drip</h1>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {chatHistory.length === 0 ? (
                    <div className="text-center font-semibold mt-8">
                      <p className="text-2xl">Design your search bar</p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Describe the style you want
                      </p>
                    </div>
                  ) : (
                    <>
                      <Conversation>
                        <ConversationContent>
                          {chatHistory.map((msg, index) => (
                            <Message from={msg.type} key={index}>
                              <MessageContent>{msg.content}</MessageContent>
                            </Message>
                          ))}
                        </ConversationContent>
                      </Conversation>
                      {isLoading && (
                        <Reasoning isStreaming={true} defaultOpen={true}>
                          <ReasoningTrigger />
                          <ReasoningContent>
                            Designing your custom search bar widget...
                          </ReasoningContent>
                        </Reasoning>
                      )}
                    </>
                  )}
                </div>
                <div className="border-t p-4">
                  {!currentChat && (
                    <Suggestions>
                      <Suggestion
                        onClick={() => setMessage("Minimal white search bar with subtle shadow")}
                        suggestion="Minimal white"
                      />
                      <Suggestion
                        onClick={() => setMessage("Neon glow search bar with gradient border")}
                        suggestion="Neon glow"
                      />
                      <Suggestion
                        onClick={() => setMessage("Floating search bar with glass morphism effect")}
                        suggestion="Glass floating"
                      />
                    </Suggestions>
                  )}
                  <PromptInput
                    value={message}
                    onValueChange={setMessage}
                    onPromptSubmit={handleSendMessage}
                    className="mt-4 w-full relative"
                  >
                    <PromptInputTextarea
                      placeholder="Describe your search bar style..."
                      className="pr-12 min-h-[60px]"
                    />
                    <PromptInputSubmit
                      className="absolute bottom-1 right-1"
                    />
                  </PromptInput>
                </div>
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={isMobile ? 50 : 60} minSize={30}>
              <div className="h-full flex flex-col overflow-hidden">
                <WebPreview className="flex-1 min-h-0">
                  <WebPreviewNavigation>
                    <WebPreviewUrl
                      readOnly
                      placeholder="Your widget preview..."
                      value={currentChat?.demo}
                    />
                  </WebPreviewNavigation>
                  <WebPreviewBody src={currentChat?.demo} />
                </WebPreview>
                
                {currentChat && embedCode && (
                  <div className="border-t p-4 max-h-[40%] overflow-y-auto">
                    <Artifact>
                      <ArtifactHeader>
                        <ArtifactTitle>Embed Code</ArtifactTitle>
                        <ArtifactActions>
                          <Button
                            size="sm"
                            onClick={handleAddToDesigns}
                            disabled={addedToDesigns}
                            className="gap-2"
                          >
                            {addedToDesigns ? (
                              <>
                                <CheckIcon className="size-4" />
                                Added
                              </>
                            ) : (
                              <>
                                <PlusIcon className="size-4" />
                                Add to My Designs
                              </>
                            )}
                          </Button>
                        </ArtifactActions>
                      </ArtifactHeader>
                      <ArtifactContent className="p-0">
                        <CodeBlock code={embedCode} language="tsx">
                          <CodeBlockCopyButton />
                        </CodeBlock>
                      </ArtifactContent>
                    </Artifact>
                  </div>
                )}
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
