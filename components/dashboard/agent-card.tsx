"use client";

import { Bot, Music, FileText, Pencil, CircleDot } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface AgentCardProps {
  name: string;
  type: "Content" | "Music" | "Text";
  status: "online" | "offline" | "busy";
  onClick?: () => void;
  selected?: boolean;
}

const agentIcons = {
  Content: Pencil,
  Music: Music,
  Text: FileText,
};

const statusColors = {
  online: "text-green-500",
  offline: "text-neutral-500",
  busy: "text-yellow-500",
};

export function AgentCard({ name, type, status, onClick, selected }: AgentCardProps) {
  const IconComponent = agentIcons[type];

  return (
    <Card
      onClick={onClick}
      className={cn(
        "relative cursor-pointer transition-all hover:shadow-md",
        "border border-neutral-200 dark:border-neutral-800",
        selected && "border-primary dark:border-primary",
        "p-4 space-y-3"
      )}
    >
      <div className="flex items-start justify-between">
        <div className={cn(
          "flex h-10 w-10 items-center justify-center rounded-full",
          "bg-neutral-100 dark:bg-neutral-800"
        )}>
          <IconComponent className="h-5 w-5 text-primary" />
        </div>
        <CircleDot className={cn("h-4 w-4", statusColors[status])} />
      </div>

      <div>
        <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
          {name}
        </h3>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          {type} Agent
        </p>
      </div>
    </Card>
  );
}