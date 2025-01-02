"use server"

import { resErr, resOk } from "@/lib/response"
import { UpdateUserPasswordSchema } from "@/schemas/user"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"
import { z } from "zod"

export async function updatePasswordAction(value: z.infer<typeof UpdateUserPasswordSchema>) {
  const validateValue = UpdateUserPasswordSchema.safeParse(value)

  if (!validateValue.success) {
    return resErr("更新密码参数验证失败")
  }
  if (validateValue.data.password === validateValue.data.newPassword) {
    return resErr("新密码与旧密码相同")
  }

  try {
    const token = (await cookies()).get('token')?.value
    const result = await fetch(`${process.env.NEXT_API_URL}/user/password`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(validateValue.data),
      next: {
        tags: ['getUserInfo']
      }
    })
    const json = await result.json()
    if (result.status === 200) {
      revalidateTag("getUserInfo")
      return resOk("更新密码成功")
    } else {
      return resErr(json.message)
    }
  } catch (error) {
    console.error(error)
    return resErr("更新密码失败")
  }
}

