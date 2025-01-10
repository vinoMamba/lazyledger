"use server"
import { resErr, resOk } from "@/lib/response"
import { UpdateTagSchema } from "@/schemas/tag"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"
import { z } from "zod"

export async function updateTagAction(value: z.infer<typeof UpdateTagSchema>) {
  const validateValue = UpdateTagSchema.safeParse(value)

  if (!validateValue.success) {
    return resErr("更新标签参数验证失败")
  }

  try {
    const token = (await cookies()).get('token')?.value
    const result = await fetch(`${process.env.NEXT_API_URL}/tag`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(validateValue.data),
    })
    const json = await result.json()
    if (result.status === 200) {
      revalidateTag("getTagList")
      return resOk("更新标签成功")
    } else {
      return resErr(json.message)
    }
  } catch (error) {
    console.error(error)
    return resErr("更新分类失败")
  }
}

