"use client"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useEffect, useState } from "react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { AddTransactionSchema } from "@/schemas/transaction"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { useHotkeys } from "react-hotkeys-hook"
import { addTransactionAction } from "@/actions/add-transaction"
import { toast } from "sonner"
import { TransactionDateInput } from "./transaction-date-input"
import { Input } from "../ui/input"
import { TransactionAmountInput } from "./transaction-amount-input"
import { format } from "date-fns"
import { TransactionCategoryInput } from "./transaction-category-input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion"
import { TypeSelect } from "./type-select"
import { Textarea } from "@/components/ui/textarea"

export const AddTransaction = () => {
  const [open, setOpen] = useState(false)
  useHotkeys('alt+n', () => setOpen(true))
  const form = useForm<z.infer<typeof AddTransactionSchema>>({
    resolver: zodResolver(AddTransactionSchema),
    defaultValues: {
      amount: 0,
      date: format(new Date(), 'yyyy-MM-dd'),
      name: "",
      type: 0,
      categoryId: "",
      remark: "",
      tagIds: [],
    },
  })

  useEffect(() => {
    if (open) {
      form.reset()
    }
  }, [open, form])

  const onSubmit = form.handleSubmit(async (values) => {
    if (values.amount === 0 || values.categoryId === "" || values.name === "") {
      toast.error('请填写完整信息')
      return
    }
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
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" onClick={() => setOpen(true)}>
            <Plus />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>添加交易</SheetTitle>
            <SheetDescription>手动添加一笔交易</SheetDescription>
          </SheetHeader>
          <Form {...form}>
            <form onSubmit={onSubmit} className="h-full relative pt-4">
              <div className=" space-y-4">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>类型</FormLabel>
                      <FormControl>
                        <TypeSelect {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>交易名称</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="添加交易名称" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className="flex gap-4">

                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>金额</FormLabel>
                        <FormControl>
                          <TransactionAmountInput {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>日期</FormLabel>
                        <FormControl>
                          <TransactionDateInput {...field} className="w-full" />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>分类</FormLabel>
                      <FormControl>
                        <TransactionCategoryInput {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="remark"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <Accordion type="single" collapsible>
                        <AccordionItem value="item-1" tabIndex={-1}>
                          <AccordionTrigger tabIndex={-1}>
                            <FormLabel>备注</FormLabel>
                          </AccordionTrigger>
                          <AccordionContent className="p-2">
                            <FormControl>
                              <Textarea {...field} value={field.value || ''} placeholder="添加备注" />
                            </FormControl>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full absolute bottom-16">
                  添 加
                </Button>
              </div>
            </form>
          </Form>
        </SheetContent>
      </Sheet>
    </div>
  )
}
