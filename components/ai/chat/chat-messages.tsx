import { Message } from "@/types/chat";
import { cn } from "@/lib/utils";
import { Bot } from "lucide-react";

interface ChatMessagesProps {
  messages: Message[];
}

export function ChatMessages({ messages }: ChatMessagesProps) {
  return (
    <div className="flex-1 overflow-y-auto p-4">
      <div className="space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex w-full gap-3 rounded-lg p-4",
              message.role === "user"
                ? "flex-row-reverse bg-primary/10"
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
                    ? "text-neutral-900 dark:text-neutral-100"
                    : "text-neutral-800 dark:text-neutral-200"
                )}
              >
                {message.content}
              </p>
              <p className="text-xs text-neutral-500">{message.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}