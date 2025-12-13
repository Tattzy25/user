"use client"

import { useRouter } from "next/navigation"
import { Message, MessageContent } from "@/components/ai-elements/message"
import {
  Conversation,
  ConversationContent,
} from "@/components/ai-elements/conversation"
import {
  PromptInput,
  PromptInputTextarea,
  PromptInputSubmit,
} from "@/components/ai-elements/prompt-input"
import { Suggestions, Suggestion } from "@/components/ai-elements/suggestion"

const demoMessages = [
  { type: "user" as const, content: "Create a neon glow search bar" },
  { type: "assistant" as const, content: "I've designed a sleek search bar with a vibrant neon glow effect. It features a dark background with a cyan/teal border that pulses subtly, rounded corners, and a glowing focus state." },
  { type: "user" as const, content: "Make it float with a shadow" },
  { type: "assistant" as const, content: "Done! Added a floating effect with a soft drop shadow and the neon glow now extends outward, giving it a premium hovering appearance." },
]

export default function Home() {
  const router = useRouter()

  const handleSubmit = () => {
    router.push("/my-dashboard")
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div className="flex flex-col items-center w-full max-w-md px-4">
        <div className="w-full rounded-xl border bg-background shadow-lg overflow-hidden">
          <div className="border-b p-3 flex items-center">
            <h2 className="text-sm font-semibold text-muted-foreground">Chat Preview</h2>
          </div>
          <div className="h-64 overflow-y-auto p-4 space-y-3">
            <Conversation>
              <ConversationContent>
                {demoMessages.map((msg, index) => (
                  <Message from={msg.type} key={index}>
                    <MessageContent>{msg.content}</MessageContent>
                  </Message>
                ))}
              </ConversationContent>
            </Conversation>
          </div>
          <div className="p-4 space-y-4">
            <p className="text-center text-sm font-medium text-foreground">
              2X start Dominating your Competition
            </p>
            <Suggestions className="justify-center">
              <Suggestion
                onClick={() => router.push("/my-dashboard")}
                suggestion="See it in action"
                className="px-8 py-3 text-sm"
              />
            </Suggestions>
            <PromptInput 
              className="w-full relative"
              onPromptSubmit={handleSubmit}
            >
              <PromptInputTextarea
                placeholder="Drop in your URL"
                maxLength={60}
                className="pr-12 min-h-[50px] max-h-[80px] text-sm"
              />
              <PromptInputSubmit
                className="absolute bottom-1 right-1"
              />
            </PromptInput>
          </div>
        </div>
      </div>
    </div>
  )
}
