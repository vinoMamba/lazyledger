"use server"
import { resErr, resOk } from "@/lib/response"
import { CreateTagSchema } from "@/schemas/tag"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"
import { z } from "zod"

export async function addTagAction(value: z.infer<typeof CreateTagSchema>) {
  const validateValue = CreateTagSchema.safeParse(value)

  if (!validateValue.success) {
    return resErr("添加标签参数验证失败")
  }

  try {
    const token = (await cookies()).get('token')?.value
    const result = await fetch(`${process.env.NEXT_API_URL}/tag`, {
      method: 'POST',
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
      revalidateTag("getTagList")
      return resOk("添加标签成功")
    } else {
      return resErr(json.message)
    }
  } catch (error) {
    console.error(error)
    return resErr("添加标签失败")
  }
}

