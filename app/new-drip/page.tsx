"use client"

import { useState } from "react"
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
  type PromptInputMessage,
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

interface Chat {
  id: string
  demo: string
}

export default function NewDripPage() {
  const [message, setMessage] = useState("")
  const [currentChat, setCurrentChat] = useState<Chat | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [chatHistory, setChatHistory] = useState<
    Array<{
      type: "user" | "assistant"
      content: string
    }>
  >([])

  const handleSendMessage = async (promptMessage: PromptInputMessage) => {
    const hasText = Boolean(promptMessage.text)
    const hasAttachments = Boolean(promptMessage.files?.length)

    if (!(hasText || hasAttachments) || isLoading) return
    const userMessage = promptMessage.text?.trim() || "Sent with attachments"
    setMessage("")
    setIsLoading(true)
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
        throw new Error("Failed to create chat")
      }
      const chat: Chat = await response.json()
      setCurrentChat(chat)
      setChatHistory((prev) => [
        ...prev,
        {
          type: "assistant",
          content: "Generated new app preview. Check the preview panel!",
        },
      ])
    } catch (error) {
      console.error("Error:", error)
      setChatHistory((prev) => [
        ...prev,
        {
          type: "assistant",
          content:
            "Sorry, there was an error creating your app. Please try again.",
        },
      ])
    } finally {
      setIsLoading(false)
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
          <ResizablePanelGroup direction="horizontal" className="flex-1">
            <ResizablePanel defaultSize={40} minSize={25}>
              <div className="h-full flex flex-col border-r">
                <div className="border-b p-3 h-14 flex items-center">
                  <h1 className="text-lg font-semibold">New Drip</h1>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {chatHistory.length === 0 ? (
                    <div className="text-center font-semibold mt-8">
                      <p className="text-2xl">What can we build together?</p>
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
                        <Message from="assistant">
                          <MessageContent>
                            <div className="flex items-center gap-2">
                              <Loader />
                              Creating your app...
                            </div>
                          </MessageContent>
                        </Message>
                      )}
                    </>
                  )}
                </div>
                <div className="border-t p-4">
                  {!currentChat && (
                    <Suggestions>
                      <Suggestion
                        onClick={() =>
                          setMessage("Create a responsive navbar with Tailwind CSS")
                        }
                        suggestion="Create a responsive navbar"
                      />
                      <Suggestion
                        onClick={() => setMessage("Build a todo app with React")}
                        suggestion="Build a todo app"
                      />
                      <Suggestion
                        onClick={() =>
                          setMessage("Make a landing page for a coffee shop")
                        }
                        suggestion="Landing page"
                      />
                    </Suggestions>
                  )}
                  <PromptInput
                    onSubmit={handleSendMessage}
                    className="mt-4 w-full relative"
                  >
                    <PromptInputTextarea
                      onChange={(e) => setMessage(e.target.value)}
                      value={message}
                      className="pr-12 min-h-[60px]"
                    />
                    <PromptInputSubmit
                      className="absolute bottom-1 right-1"
                      disabled={!message}
                      status={isLoading ? "streaming" : "ready"}
                    />
                  </PromptInput>
                </div>
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={60} minSize={30}>
              <div className="h-full flex flex-col">
                <WebPreview className="flex-1">
                  <WebPreviewNavigation>
                    <WebPreviewUrl
                      readOnly
                      placeholder="Your app here..."
                      value={currentChat?.demo}
                    />
                  </WebPreviewNavigation>
                  <WebPreviewBody src={currentChat?.demo} />
                </WebPreview>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
