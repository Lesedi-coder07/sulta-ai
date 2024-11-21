"use client";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

interface ExtraContextFieldProps {
  form: any;
  className?: string;
}

export function ExtraContextField({ form, className }: ExtraContextFieldProps) {
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="extraContext"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Extra Context</FormLabel>
            <FormDescription>
              Add your business info and other relevant data the agent should know.
            </FormDescription>
            <FormControl>
              <Textarea
                placeholder="Enter extra context here..."
                className="mt-2"
                {...field}
              />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="strictMode"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center space-x-3">
            <FormControl>
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <FormLabel>Strict Mode</FormLabel>
          </FormItem>
        )}
      />
    </div>
  );
}

export default ExtraContextField;