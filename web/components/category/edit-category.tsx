"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { UpdateCategorySchema } from "@/schemas/category"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { EmojiSelect } from "@/components/emoji/emoji-select"
import { ColorPicker } from "../color/color-picker"
import { toast } from "sonner"
import { updateCategoryAction } from "@/actions/update-category"
import { Edit } from "lucide-react"


type EditCategoryProps = {
  category: z.infer<typeof UpdateCategorySchema>
}

export const EditCategoryButton = ({ category }: EditCategoryProps) => {
  const [open, setOpen] = useState(false)

  const form = useForm<z.infer<typeof UpdateCategorySchema>>({
    resolver: zodResolver(UpdateCategorySchema),
    defaultValues: {
      id: category.id,
      name: category.name,
      color: category.color,
      icon: category.icon,
    },
  })

  const onSubmit = form.handleSubmit(async (values) => {
    const res = await updateCategoryAction(values)
    if (res.code === 200) {
      toast.success("修改成功")
      setOpen(false)
    } else {
      toast.error(res.message)
    }
  })

  useEffect(() => {
    if (open) {
      form.reset(category)
    }
  }, [open, form, category])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Edit size={16} className="text-muted-foreground" />
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
