"use client";

import { cn } from "@/lib/utils";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface BasicAgentConfigProps {
  form: any;
  className?: string;
}

export function BasicAgentConfig({ form, className }: BasicAgentConfigProps) {
  return (
    <div className={cn("space-y-6", className)}>
      <div className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Agent Name</FormLabel>
              <FormControl>
                <Input placeholder="My AI Assistant" {...field} />
              </FormControl>
              <FormDescription>
                Choose a unique name for your AI agent
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe what your AI agent does..."
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Provide a brief description of your agent's capabilities
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}