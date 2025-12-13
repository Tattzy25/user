"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { ArrowUpIcon, PaperclipIcon, XIcon } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { toast } from "sonner";

interface PromptInputContextValue {
  input: string;
  setInput: (value: string) => void;
  files: File[];
  setFiles: (files: File[]) => void;
  isSubmitting: boolean;
  onSubmit: (value: string, files: File[]) => void;
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;
}

const PromptInputContext = createContext<PromptInputContextValue | undefined>(
  undefined,
);

export function usePromptInput() {
  const context = useContext(PromptInputContext);
  if (!context) {
    throw new Error("usePromptInput must be used within a PromptInput");
  }
  return context;
}

export interface PromptInputProps extends ComponentProps<"div"> {
  value?: string;
  onValueChange?: (value: string) => void;
  onPromptSubmit?: (value: string, files: File[]) => void;
  isSubmitting?: boolean;
}

export function PromptInput({
  className,
  value: controlledValue,
  onValueChange,
  onPromptSubmit,
  isSubmitting = false,
  children,
  ...props
}: PromptInputProps) {
  const [internalValue, setInternalValue] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const isControlled = controlledValue !== undefined;
  const input = isControlled ? controlledValue : internalValue;

  const setInput = useCallback(
    (value: string) => {
      if (!isControlled) {
        setInternalValue(value);
      }
      onValueChange?.(value);
    },
    [isControlled, onValueChange],
  );

  const handleSubmit = useCallback(
    (value: string, currentFiles: File[]) => {
      if (!value.trim() && currentFiles.length === 0) return;
      onPromptSubmit?.(value, currentFiles);
      setInput("");
      setFiles([]);
    },
    [onPromptSubmit, setInput],
  );

  const contextValue = useMemo(
    () => ({
      input,
      setInput,
      files,
      setFiles,
      isSubmitting,
      onSubmit: handleSubmit,
      textareaRef,
    }),
    [input, setInput, files, isSubmitting, handleSubmit],
  );

  return (
    <PromptInputContext.Provider value={contextValue}>
      <div
        className={cn(
          "relative flex w-full flex-col gap-2 rounded-xl border bg-background p-4 shadow-sm transition-colors focus-within:border-primary/50 hover:border-primary/50",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </PromptInputContext.Provider>
  );
}

export function PromptInputTextarea({
  className,
  placeholder = "Send a message...",
  ...props
}: ComponentProps<typeof Textarea>) {
  const { input, setInput, onSubmit, files, textareaRef } = usePromptInput();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit(input, files);
    }
  };

  return (
    <Textarea
      ref={textareaRef}
      value={input}
      onChange={(e) => setInput(e.target.value)}
      onKeyDown={handleKeyDown}
      placeholder={placeholder}
      className={cn(
        "min-h-[60px] w-full resize-none border-0 bg-transparent p-0 shadow-none focus-visible:ring-0",
        className,
      )}
      {...props}
    />
  );
}

export function PromptInputActions({
  className,
  children,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      className={cn("flex items-center justify-between gap-2", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function PromptInputSubmit({
  className,
  children,
  ...props
}: ComponentProps<typeof Button>) {
  const { input, files, isSubmitting, onSubmit } = usePromptInput();
  const isDisabled = (!input.trim() && files.length === 0) || isSubmitting;

  return (
    <Button
      size="icon"
      disabled={isDisabled}
      onClick={() => onSubmit(input, files)}
      className={cn("h-8 w-8 rounded-lg", className)}
      {...props}
    >
      {children || <ArrowUpIcon className="h-4 w-4" />}
      <span className="sr-only">Send message</span>
    </Button>
  );
}

export function PromptInputAttachment({
  className,
  ...props
}: ComponentProps<typeof Button>) {
  const { setFiles } = usePromptInput();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        multiple
        onChange={handleFileChange}
      />
      <Button
        variant="ghost"
        size="icon"
        className={cn("h-8 w-8 text-muted-foreground", className)}
        onClick={() => fileInputRef.current?.click()}
        {...props}
      >
        <PaperclipIcon className="h-4 w-4" />
        <span className="sr-only">Attach files</span>
      </Button>
    </>
  );
}

export interface PromptInputMessage {
  role: "user" | "assistant";
  content: string;
  files?: File[];
}
