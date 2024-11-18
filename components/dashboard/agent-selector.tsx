"use client";

import { useEffect, useState } from "react";
import { AgentCard } from "./agent-card";
import { auth } from "@/app/api/firebase/firebaseConfig";
import { doc, collection, onSnapshot } from "firebase/firestore";
import { db } from "@/app/api/firebase/firebaseConfig";
import { log } from "console";
import AgentOptions from "./agent-options";

const agents1 = [
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

interface Agent {
  id: string;
  name: string;
  type: string;
  status: string;
  isPublic: boolean
}

export function AgentSelector() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null >(null);
  const [agentTabOpen, setAgentTabOpen] = useState<boolean>(false)


  const updateSelectedAgent = (agent: Agent | null) => {
    setSelectedAgent(agent)
    setAgentTabOpen(true)
  }
  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged(async (user) => {
      if (user) {
        console.log("Authenticated User: ", user);
        const userDocRef = doc(db, "users", user.uid);
        const unsubscribeUser = onSnapshot(userDocRef, async (snapshot) => {
          const agentIds: string[] = snapshot.data()?.agents || [];
          if (agentIds.length === 0) {
            setAgents([]);
            return;
          }

          try {
            const agentPromises = agentIds.map((agentId) => {
              const agentDocRef = doc(db, "agents", agentId);
              return onSnapshot(agentDocRef, (agentSnapshot) => {
                const agentData = agentSnapshot.data();
                if (agentData) {
                  const agent: Agent = {
                    id: agentId,
                    name: agentData.name,
                    type: agentData.type,
                    status: agentData.isPublic ? "online" : "offline",
                    isPublic: agentData.isPublic,
                  };
                  setAgents((prevAgents) => {
                    const otherAgents = prevAgents.filter((a) => a.id !== agentId);
                    return [...otherAgents, agent];
                  });
                }
              });
            });

            // Cleanup all agent listeners on unmount or when agents change
            return () => {
              agentPromises.forEach((unsubscribe) => unsubscribe());
            };
          } catch (error) {
            console.error("Error fetching agents:", error);
            setAgents([]);
          }
        });

        return () => {
          unsubscribeUser();
        };
      } else {
        setAgents([]);
      }
    });

    return () => {
      unsubscribeAuth();
    };
  }, []);

  return (
    agentTabOpen ? <AgentOptions agent={selectedAgent as Agent} /> : (
      <div className="w-full border-r border-none p-4 dark:border-neutral-800 dark:bg-none bg-inherit overflow-hidden">
        <div className="space-y-4 w-full flex flex-col">
          <div>
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
              Your AI Agents
            </h2>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              Select an agent
            </p>
          </div>

          <div className="flex flex-row flex-wrap gap-4 w-full overflow-y-auto">
            {agents.length === 0 ? <p>You don't have any agents yet</p> : agents.map((agent) => (
              <AgentCard
                key={agent.id}
                name={agent.name}
                type={agent.type}
                status={agent.isPublic ? "online" : "offline"}
                selected={selectedAgent?.name === agent.name}
                onClick={() => updateSelectedAgent(agent)}
              />
            ))}
          </div>
        </div>
      </div>
    )

  );
}