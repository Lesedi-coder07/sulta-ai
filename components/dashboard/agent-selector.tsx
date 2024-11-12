"use client";

import { useState } from "react";
import { AgentCard } from "./agent-card";

const agents = [
  {
    id: "1",
    name: "Writing Assistant",
    type: "Content" as const,
    status: "online" as const,
  },
  {
    id: "2",
    name: "Melody Maker",
    type: "Music" as const,
    status: "online" as const,
  },
  {
    id: "3",
    name: "Text Analyzer",
    type: "Text" as const,
    status: "busy" as const,
  },
  {
    id: "4",
    name: "Blog Writer",
    type: "Content" as const,
    status: "offline" as const,
  },
];

export function AgentSelector() {
  const [selectedAgent, setSelectedAgent] = useState(agents[0].id);

  return (
    <div className=" w-full border-r border-none p-4 dark:border-neutral-800 dark:bg-none bg-inherit">
      <div className="space-y-4 w-full flex flex-col">
        <div>
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
            Your AI Agents
          </h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Select an agent
          </p>
        </div>

        <div className="flex flex-row gap-4 w-full">
          {agents.map((agent) => (
            <AgentCard
              key={agent.id}
              name={agent.name}
              type={agent.type}
              status={agent.status}
              selected={selectedAgent === agent.id}
              onClick={() => setSelectedAgent(agent.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}