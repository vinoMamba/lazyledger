"use client"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { AddTransactionSchema } from "@/schemas/transaction"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { DatePicker } from "./date-picker"
import { useHotkeys } from "react-hotkeys-hook"
import { AmountInput } from "./amount-input"
import { DescriptionInput } from "./description-input"

export const AddTransaction = () => {
  const [open, setOpen] = useState(false)

  useHotkeys('alt+n', () => setOpen(true))


  const form = useForm<z.infer<typeof AddTransactionSchema>>({
    resolver: zodResolver(AddTransactionSchema),
    defaultValues: {
      amount: 0.00,
      date: "",
      description: "",
      category: "",
      type: "income"
    },
  })

  useEffect(() => {
    if (open) {
      form.reset()
    }
  }, [open, form])

  const onSubmit = form.handleSubmit(values => {
    console.log(values)
  })



  return (
    <div>
      <Button size="icon" variant="outline" onClick={() => setOpen(true)}>
        <Plus />
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="top-1/4 shadow-2xl border bg-sidebar">
          <DialogHeader>
            <DialogTitle>添加交易</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={onSubmit}>
              <div className=" space-y-4">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <DescriptionInput {...field} placeholder="描述" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <AmountInput value={field.value} onChange={field.onChange} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <DatePicker value={field.value} onChange={field.onChange} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  添 加
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
