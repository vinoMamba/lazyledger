"use client"
import { cn } from "@/lib/utils"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button, buttonVariants } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useState } from "react"
import { UpdateUserUsernameSchema } from "@/schemas/user"
import { updateUsernameAction } from "@/actions/update-username"
import { toast } from "sonner"

type Props = {
  username?: string
}

export const UsernameDialog = ({ username = "" }: Props) => {
  const [open, setOpen] = useState(false)

  const form = useForm<z.infer<typeof UpdateUserUsernameSchema>>({
    resolver: zodResolver(UpdateUserUsernameSchema),
    defaultValues: {
      username,
    }
  })

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      const { code, message } = await updateUsernameAction(values.username)
      if (code === 200) {
        toast.success(message)
        setOpen(false)
      } else {
        toast.error(message)
        form.setValue('username', username)
      }
    } finally {
      setOpen(false)
    }
  })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <span className={cn(buttonVariants({ size: 'sm' }))}>更新用户名</span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>更新用户名</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={onSubmit}
            className=" space-y-6"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>请输入新的用户名</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="请输入新的用户名"
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              更新用户名
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
