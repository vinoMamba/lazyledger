"use client"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button, buttonVariants } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Input } from "@/components/ui/input"
import { Keyboard } from "lucide-react"
import { cn } from "@/lib/utils"
import { UpdateUserPasswordSchema } from "@/schemas/user"
import { useState } from "react"

export const PasswordDialog = () => {
  const [open, setOpen] = useState(false)
  const form = useForm<z.infer<typeof UpdateUserPasswordSchema>>({
    resolver: zodResolver(UpdateUserPasswordSchema),
    defaultValues: {
      password: "",
      newPassword: "",
    }
  })
  const onSubmit = form.handleSubmit(async (values) => {
    // try {
    //   const { code, message } = await updateUserPasswordAction(values)
    //   if (code === 200) {
    //     toast.success(message)
    //     logoutAction()
    //   } else {
    //     toast.error(message)
    //   }
    // } finally {
    //   setOpen(false)
    //   form.reset()
    // }
  })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <span className={cn(buttonVariants({ size: 'sm' }))}>修改密码</span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Keyboard />
            修改密码
          </DialogTitle>
          <DialogDescription>
            修改密码后，需重新登录
          </DialogDescription>
        </DialogHeader>
        <Alert variant="destructive">
          <AlertTitle>警告</AlertTitle>
          <AlertDescription>
          </AlertDescription>
        </Alert>
        <Form {...form}>
          <form
            onSubmit={onSubmit}
            className=" space-y-6"
          >
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>请输入旧密码</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="请输入旧密码" type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>请输入新密码</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="请输入新密码" type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              修改密码
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
