"use server"
import { resErr, resOk } from "@/lib/response"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"

export async function deleteCategoryAction(id: string) {
  try {
    const token = (await cookies()).get('token')?.value
    const result = await fetch(`${process.env.NEXT_API_URL}/category/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      next: {
        tags: ['getCategoryList']
      }
    })
    const json = await result.json()
    if (result.status === 200) {
      revalidateTag("getCategoryList")
      return resOk("删除分类成功")
    } else {
      return resErr(json.message)
    }
  } catch (error) {
    console.error(error)
    return resErr("删除分类失败")
  }
}

