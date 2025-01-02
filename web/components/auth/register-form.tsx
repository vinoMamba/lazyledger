"use client"
import { z } from "zod"
import { useRouter } from "next/navigation"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { RegisterSchema } from "@/schemas/user"
import Link from "next/link"

export const RegisterForm = () => {

  const router = useRouter()

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })

  const onSubmit = form.handleSubmit(values => {
    console.log(values)
    router.push('/login')
    toast.success('注册成功')
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
                  <Input {...field} placeholder="请输入邮箱" type="email" />
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
                  <Input {...field} placeholder="请输入密码" type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            注 册
          </Button>
          <Link href="/login">
            <Button variant="link" className="w-full">
              已有账号？去登录
            </Button>
          </Link>
        </div>
      </form>
    </Form>
  )
}
