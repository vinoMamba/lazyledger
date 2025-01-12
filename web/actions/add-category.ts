"use server"
import { resErr, resOk } from "@/lib/response"
import { CreateCategorySchema } from "@/schemas/category"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"
import { z } from "zod"

export async function addCategoryAction(value: z.infer<typeof CreateCategorySchema>) {
  const validateValue = CreateCategorySchema.safeParse(value)

  if (!validateValue.success) {
    return resErr("添加分类参数验证失败")
  }

  try {
    const token = (await cookies()).get('token')?.value
    const result = await fetch(`${process.env.NEXT_API_URL}/category`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(validateValue.data),
    })
    const json = await result.json()
    if (result.status === 200) {
      revalidateTag("getCategoryList")
      return resOk("添加分类成功")
    } else {
      return resErr(json.message)
    }
  } catch (error) {
    console.error(error)
    return resErr("添加分类失败")
  }
}

