"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/react-hook-form/form"

import { useConfigStore } from "../store"

const AIConfigFormSchema = z.object({
  token: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  baseUrl: z.string().url().default("https://api.openai.com/v1"),
  autoRunScope: z.array(z.string()),
  GOOGLE_API_KEY: z.string().optional(),
})

export type AIConfigFormValues = z.infer<typeof AIConfigFormSchema>
export const AutoRunScopesWithDesc = [
  {
    value: "SQL.SELECT",
    description: "Select data from a SQL table.",
  },
  {
    value: "SQL.INSERT",
    description: "Insert data into a SQL table.",
  },
  {
    value: "SQL.UPDATE",
    description: "Update data in a SQL table.",
  },
  {
    value: "SQL.DELETE",
    description: "Delete data from a SQL table.",
  },
  {
    value: "SQL.ALTER",
    description: "Alter a SQL table.",
  },
  {
    value: "SQL.CREATE",
    description: "Create a SQL table.",
  },
  {
    value: "SQL.DROP",
    description: "Drop a SQL table.",
  },
  {
    value: "UI.REFRESH",
    description: "Refresh the UI after SQL execution.",
  },
  {
    value: "D3.CHART",
    description: "Create a D3 chart.",
  },
]

export const AutoRunScopes = AutoRunScopesWithDesc.map((item) => item.value)

// This can come from your database or API.
const defaultValues: Partial<AIConfigFormValues> = {
  // name: "Your name",
  // dob: new Date("2023-01-23"),
  autoRunScope: [],
}

export function AIConfigForm() {
  const { setAiConfig, aiConfig } = useConfigStore()
  const form = useForm<AIConfigFormValues>({
    resolver: zodResolver(AIConfigFormSchema),
    defaultValues: {
      ...defaultValues,
      ...aiConfig,
    },
  })

  function onSubmit(data: AIConfigFormValues) {
    setAiConfig(data)
    // data.token = "sk-**********"
    toast({
      title: "AI Config updated.",
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="baseUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Base URL</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://api.openai.com/v1"
                  {...field}
                  type="text"
                />
              </FormControl>
              <FormDescription>
                This is the base URL used to access the OpenAI API or API
                compatible service.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="token"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Token</FormLabel>
              <FormControl>
                <Input
                  placeholder="OpenAI API Token"
                  {...field}
                  type="password"
                />
              </FormControl>
              <FormDescription>
                This is the token used to access the OpenAI API.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="GOOGLE_API_KEY"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Google API Key</FormLabel>
              <FormControl>
                <Input
                  placeholder="Google API Key"
                  {...field}
                  type="password"
                />
              </FormControl>
              <FormDescription>
                This is the token used to access the Google API.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="autoRunScope"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Permission</FormLabel>
                <FormDescription>
                  If enabled, the code generated by the AI will be automatically
                  run.
                </FormDescription>
              </div>
              {AutoRunScopesWithDesc.map(({ value: key, description }) => (
                <FormField
                  key={key}
                  control={form.control}
                  name="autoRunScope"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={key}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(key)}
                            onCheckedChange={(checked: any) => {
                              return checked
                                ? field.onChange([...field.value, key])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== key
                                    )
                                  )
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {description}
                        </FormLabel>
                      </FormItem>
                    )
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Update</Button>
      </form>
    </Form>
  )
}
