"use client"
import { Message } from "@/types/chat";
import { cn } from "@/lib/utils";
import { Bot } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface ChatMessagesProps {
  messages: Message[];
}

export function ChatMessages({
  messages,
  loadingState,
}: {
  messages: Message[];
  loadingState: boolean;
}) {


  return (
    <div className="flex-1 overflow-y-auto p-4">
      <div className="space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex w-full gap-3 rounded-lg p-4 shadow-sm",
              message.role === "user"
                ? "flex-row-reverse bg-blue-700"
                : "bg-white dark:bg-neutral-800"
            )}
          >
            <div
              className={cn(
                "flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full",
                message.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-neutral-900 text-neutral-50 dark:bg-neutral-700"
              )}
            >
              {message.role === "user" ? (
                <span className="text-sm">You</span>
              ) : (
                <Bot className="h-5 w-5" />
              )}
            </div>
            <div className="flex-1 space-y-2">
              <p
                className={cn(
                  "text-sm",
                  message.role === "user"
                    ? "text-white dark:text-neutral-100"
                    : "text-neutral-800 dark:text-neutral-200"
                )}
              >
                {message.content}
              </p>
              {/* <p className="text-xs text-neutral-500">{message.timestamp}</p> */}
            </div>
          </div>
        ))}

        {loadingState && <div className="flex w-full gap-3 rounded-lg p-4 shadow-sm">
          <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full bg-primary/10 text-primary">
            <span className="flex space-x-1">
              <span className="h-2 w-2 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]"></span>
              <span className="h-2 w-2 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]"></span>
              <span className="h-2 w-2 rounded-full bg-primary animate-bounce"></span>
            </span>
          </div>
        </div>}
      </div>
    </div>
  );
}