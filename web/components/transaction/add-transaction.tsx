"use client"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { AddTransactionSchema } from "@/schemas/transaction"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { useHotkeys } from "react-hotkeys-hook"
import { DescriptionInput } from "./description-input"
import { AmountInput } from "./amount-input"
import { DatePicker } from "./date-picker"
import { CategorySelect } from "@/components/category/category-select"
import { addTransactionAction } from "@/actions/add-transaction"
import { toast } from "sonner"


export const AddTransaction = () => {
  const [open, setOpen] = useState(false)
  useHotkeys('alt+n', () => setOpen(true))
  const form = useForm<z.infer<typeof AddTransactionSchema>>({
    resolver: zodResolver(AddTransactionSchema),
    defaultValues: {
      amount: 0.00,
      date: "",
      name: "",
      categoryId: "",
    },
  })

  useEffect(() => {
    if (open) {
      form.reset()
    }
  }, [open, form])

  const onSubmit = form.handleSubmit(async (values) => {
    const res = await addTransactionAction(values)
    if (res.code === 200) {
      toast.success('添加成功')
      setOpen(false)
    } else {
      toast.error(res.message)
    }
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
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={onSubmit}>
              <div className=" space-y-4">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <DatePicker {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <CategorySelect {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="name"
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
                        <AmountInput {...field} />
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
