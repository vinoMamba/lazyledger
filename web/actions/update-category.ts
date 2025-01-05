"use server"
import { resErr, resOk } from "@/lib/response"
import { UpdateCategorySchema } from "@/schemas/category"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"
import { z } from "zod"

export async function updateCategoryAction(value: z.infer<typeof UpdateCategorySchema>) {
  const validateValue = UpdateCategorySchema.safeParse(value)

  if (!validateValue.success) {
    return resErr("更新分类参数验证失败")
  }

  try {
    const token = (await cookies()).get('token')?.value
    const result = await fetch(`${process.env.NEXT_API_URL}/category`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(validateValue.data),
      next: {
        tags: ['getCategoryList']
      }
    })
    const json = await result.json()
    if (result.status === 200) {
      revalidateTag("getCategoryList")
      return resOk("更新分类成功")
    } else {
      return resErr(json.message)
    }
  } catch (error) {
    console.error(error)
    return resErr("更新分类失败")
  }
}

