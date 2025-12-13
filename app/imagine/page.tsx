"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
  PromptInput,
  PromptInputTextarea,
  PromptInputFooter,
  PromptInputSubmit,
} from "@/components/ai-elements/prompt-input"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Conversation, ConversationContent, ConversationEmptyState } from "@/components/ai-elements/conversation"
import { Message, MessageContent } from "@/components/ai-elements/message"
import { Loader } from "@/components/ai-elements/loader"
import { Reasoning, ReasoningTrigger, ReasoningContent } from "@/components/ai-elements/reasoning"
import { Checkpoint, CheckpointIcon, CheckpointTrigger } from "@/components/ai-elements/checkpoint"
import { Confirmation, ConfirmationTitle, ConfirmationRequest, ConfirmationActions, ConfirmationAction, ConfirmationAccepted, ConfirmationRejected } from "@/components/ai-elements/confirmation"
import { Artifact, ArtifactHeader, ArtifactClose } from "@/components/ai-elements/artifact"
import { WebPreview } from "@/components/ai-elements/web-preview"
import { CodeBlock } from "@/components/ai-elements/code-block"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CodeIcon, EyeIcon } from "lucide-react"
import type { UIMessage } from "ai"

export default function ImaginePage() {
  const [messages, setMessages] = useState<UIMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [confirmationState, setConfirmationState] = useState<"approval-requested" | "approval-responded">("approval-requested")
  const [isApproved, setIsApproved] = useState<boolean | undefined>(undefined)
  const [showCode, setShowCode] = useState(false)
  const [generatedCode, setGeneratedCode] = useState<string | null>(null)

  const handleSubmit = (value: string) => {
    setIsLoading(true)
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), role: "user", content: value },
    ])
    
    // TODO: Implement actual API call here
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
        <div className="relative flex flex-1 h-full w-full overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {!generatedCode ? (
              <span className="text-4xl">😂</span>
            ) : (
              <div className="pointer-events-auto w-full max-w-2xl px-4 ml-[50%]">
                <Artifact className="h-[500px]">
                  <ArtifactHeader>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Search Bar Widget</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setShowCode(!showCode)}
                        title={showCode ? "Show Preview" : "Show Code"}
                      >
                        {showCode ? <EyeIcon className="size-4" /> : <CodeIcon className="size-4" />}
                      </Button>
                      <ArtifactClose />
                    </div>
                  </ArtifactHeader>
                  <div className="flex-1 overflow-auto p-4 bg-muted/20">
                    {showCode ? (
                      <CodeBlock code={generatedCode} language="tsx" />
                    ) : (
                      <WebPreview className="h-full w-full flex items-center justify-center">
                        {/* In a real app, this would be an iframe or rendered component */}
                        <div className="p-8 border rounded-lg bg-background shadow-sm">
                          <div className="flex w-full max-w-sm items-center space-x-2">
                            <input type="text" placeholder="Search..." className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
                            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                              Search
                            </button>
                          </div>
                        </div>
                      </WebPreview>
                    )}
                  </div>
                </Artifact>
              </div>
            )}
          </div>
          
          <div className="absolute inset-y-0 left-0 w-1/2 flex flex-col z-10 pointer-events-auto p-4 gap-4">
            <Card className="w-full max-w-sm mx-auto flex-1 min-h-0 overflow-hidden bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-border/40 shadow-sm">
               <Conversation className="h-full">
                 <ConversationContent>
                    {messages.length === 0 ? (
                      <ConversationEmptyState icon={<span className="text-2xl">💬</span>} title="Start a conversation" description="Ask me anything!" />
                    ) : (
                      messages.map((message) => (
                        <Message key={message.id} from={message.role}>
                          <MessageContent>
                            {message.role === "assistant" && (
                              <>
                                <Reasoning>
                                  <ReasoningTrigger />
                                  <ReasoningContent>
                                    I am thinking about how to answer this request...
                                  </ReasoningContent>
                                </Reasoning>
                                <Checkpoint className="mb-2">
                                  <CheckpointIcon />
                                  <CheckpointTrigger>Step 1: Analyzing request</CheckpointTrigger>
                                </Checkpoint>
                              </>
                            )}
                            {message.content}
                            {message.role === "assistant" && (
                                <Confirmation 
                                  state={confirmationState} 
                                  approval={isApproved === undefined ? undefined : { id: "1", approved: isApproved }}
                                  className="mt-2"
                                >
                                  <ConfirmationRequest>
                                    <ConfirmationTitle>Do you want to proceed?</ConfirmationTitle>
                                    <ConfirmationActions>
                                      <ConfirmationAction onClick={() => { setIsApproved(false); setConfirmationState("approval-responded"); }}>Deny</ConfirmationAction>
                                      <ConfirmationAction onClick={() => { setIsApproved(true); setConfirmationState("approval-responded"); }}>Approve</ConfirmationAction>
                                    </ConfirmationActions>
                                  </ConfirmationRequest>
                                  <ConfirmationAccepted>
                                    <ConfirmationTitle>Action approved</ConfirmationTitle>
                                  </ConfirmationAccepted>
                                  <ConfirmationRejected>
                                    <ConfirmationTitle>Action denied</ConfirmationTitle>
                                  </ConfirmationRejected>
                                </Confirmation>
                            )}
                          </MessageContent>
                        </Message>
                      ))
                    )}
                    {isLoading && <Loader />}
                 </ConversationContent>
               </Conversation>
            </Card>
            <div className="flex flex-col gap-2 justify-center px-4 pb-4">
              <PromptInput 
                className="w-full max-w-sm mx-auto" 
                onSubmit={(message) => handleSubmit(message.text)}
              >
                <PromptInputTextarea />
                <PromptInputFooter>
                  <PromptInputSubmit />
                </PromptInputFooter>
              </PromptInput>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
