"use client"
import { cn } from "@/lib/utils"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button, buttonVariants } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useState } from "react"
import { UpdateUserEmailSchema } from "@/schemas/user"
import { toast } from "sonner"
import { logoutAction } from "@/actions/logout"

type Props = {
  email?: string
}

export const EmailDialog = ({ email = "" }: Props) => {
  const [open, setOpen] = useState(false)

  const form = useForm<z.infer<typeof UpdateUserEmailSchema>>({
    resolver: zodResolver(UpdateUserEmailSchema),
    defaultValues: {
      email,
    }
  })

  const onSubmit = form.handleSubmit(async (values) => {
    // try {
    //   const { code, message } = await updateUserEmailAction(values)
    //   if (code === 200) {
    //     toast.success(message)
    //     logoutAction()
    //   } else {
    //     toast.error(message)
    //     form.setValue('email', email)
    //   }
    // } finally {
    //   setOpen(false)
    // }
  })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <span className={cn(buttonVariants({ size: 'sm' }))}>更新邮箱</span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>更新邮箱</DialogTitle>
          <DialogDescription></DialogDescription>
          <div className=" flex items-center gap-x-1">
            <span>当前邮箱为 </span>
            <b> {email}</b>
            <span>.</span>
          </div>
        </DialogHeader>
        <Alert variant="destructive">
          <AlertTitle>警告</AlertTitle>
          <AlertDescription>
            更新邮箱后需要重新登录。
          </AlertDescription>
        </Alert>
        <Form {...form}>
          <form
            onSubmit={onSubmit}
            className=" space-y-6"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>请输入新的邮箱</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="请输入新的邮箱"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              更新邮箱
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
