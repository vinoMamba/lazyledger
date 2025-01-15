"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { CreateCategorySchema } from "@/schemas/category"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { EmojiSelect } from "@/components/emoji/emoji-select"
import { colorOptions, ColorPicker } from "../color/color-picker"
import { addCategoryAction } from "@/actions/add-category"
import { toast } from "sonner"

type CategoryDialogProps = {
  children: React.ReactNode
}

export const CategoryDialog = ({ children }: CategoryDialogProps) => {
  const [open, setOpen] = useState(false)

  const form = useForm<z.infer<typeof CreateCategorySchema>>({
    resolver: zodResolver(CreateCategorySchema),
    defaultValues: {
      name: "",
      color: "#fc6124",
      icon: "😀",
    },
  })

  const onSubmit = form.handleSubmit(async (values) => {
    const res = await addCategoryAction(values)
    if (res.code === 200) {
      toast.success("添加成功")
      setOpen(false)
    } else {
      toast.error(res.message)
    }
  })

  const name = form.watch("name")

  useEffect(() => {
    if (name) {
      form.setValue("color", colorOptions[Math.floor(Math.random() * colorOptions.length)])
    }
  }, [name, form, form.setValue])





  useEffect(() => {
    if (open) {
      form.reset()
    }
  }, [open, form])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="cursor-pointer" onClick={() => setOpen(true)}>
          {children}
        </div>
      </DialogTrigger>
      <DialogContent className="top-1/4 max-w-sm">
        <DialogHeader>
          <DialogTitle>添加分类</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={onSubmit}>
            <div className=" space-y-4">
              <div className="flex items-center gap-2 w-full">
                <FormField
                  control={form.control}
                  name="icon"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <EmojiSelect {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex items-center gap-2 w-full relative">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <Input {...field} placeholder="分类名称" className="w-full" />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="color"
                    render={({ field }) => (
                      <FormItem className="absolute right-4 top-1/2 -translate-y-1/2">
                        <FormControl>
                          <ColorPicker {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <Button type="submit" className="w-full">
                添 加
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
