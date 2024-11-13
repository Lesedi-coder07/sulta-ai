"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Bot, Wand2 } from "lucide-react";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TextAgentOptions } from "@/components/agent-creation/text-agent-options";
import { ContentAgentOptions } from "@/components/agent-creation/content-agent-options";
import { BasicAgentConfig } from "@/components/agent-creation/basic-agent-config";

const agentFormSchema = z.object({
  name: z.string().min(2).max(50),
  description: z.string().min(10).max(500),
  type: z.enum(["text", "content"]),
  // Type-specific configurations will be added dynamically
  textConfig: z.object({
    personality: z.enum(["professional", "friendly", "creative", "technical"]),
    tone: z.enum(["formal", "casual", "enthusiastic", "neutral"]),
    expertise: z.array(z.string()).min(1),
    contextMemory: z.number().min(1).max(10),
  }).optional(),
  contentConfig: z.object({
    style: z.enum(["realistic", "artistic", "minimalist", "abstract"]),
    colorPalette: z.array(z.string()).min(1),
    resolution: z.enum(["standard", "high", "ultra"]),
    aspectRatio: z.enum(["1:1", "16:9", "4:3", "3:2"]),
  }).optional(),
});

type AgentFormValues = z.infer<typeof agentFormSchema>;

export function AgentCreationForm() {
  const [agentType, setAgentType] = useState<"text" | "content">("text");

  const form = useForm<AgentFormValues>({
    resolver: zodResolver(agentFormSchema),
    defaultValues: {
      type: "text",
      textConfig: {
        personality: "professional",
        tone: "formal",
        expertise: [],
        contextMemory: 5,
      },
    },
  });

  async function onSubmit(data: AgentFormValues) {
    try {
      const response = await fetch('/api/firebase/db/createAgent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Failed to create agent');
      }

      const result = await response.json();
      console.log('Agent created successfully:', result);
      
    } catch (error) {
      console.error('Error creating agent:', error);
    }
  }

  return (
    <div className="mt-8 space-y-8">
      <Tabs
        defaultValue="text"
        className="w-full"
        onValueChange={(value) => setAgentType(value as "text" | "content")}
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="text" className="space-x-2">
            <Bot className="h-4 w-4" />
            <span>Text AI</span>
          </TabsTrigger>
          <TabsTrigger value="content" className="space-x-2">
            <Wand2 className="h-4 w-4" />
            <span>Content AI</span>
          </TabsTrigger>
        </TabsList>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <BasicAgentConfig form={form} className="mt-8" />

            <TabsContent value="text" className="space-y-8">
              <TextAgentOptions form={form} />
            </TabsContent>

            <TabsContent value="content" className="space-y-8">
              <ContentAgentOptions form={form} />
            </TabsContent>

            <div className="flex justify-end space-x-4">
              <Button variant="outline" type="button">
                Cancel
              </Button>
              <Button type="submit">Create Agent</Button>
            </div>
          </form>
        </Form>
      </Tabs>
    </div>
  );
}