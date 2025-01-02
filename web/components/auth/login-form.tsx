"use client"
import { z } from "zod"
import { useRouter } from "next/navigation"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { LoginWithPasswordSchema } from "@/schemas/user"
import Link from "next/link"

export const LoginForm = () => {

  const router = useRouter()

  const form = useForm<z.infer<typeof LoginWithPasswordSchema>>({
    resolver: zodResolver(LoginWithPasswordSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })

  const onSubmit = form.handleSubmit(values => {
    console.log(values)
    router.push('/workbench')
    toast.success('登录成功')
  })
  return (
    <Form {...form}>
      <form onSubmit={onSubmit}>
        <div className=" space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>邮箱</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="admin@example.com" type="email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>密码</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="******" type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            登 录
          </Button>
          <Link href="/register">
            <Button variant="link" className="w-full">
              没有账号？去注册
            </Button>
          </Link>
        </div>
      </form>
    </Form>
  )
}
