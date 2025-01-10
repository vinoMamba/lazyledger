"use server"
import { resErr, resOk } from "@/lib/response"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"

export async function deleteTagAction(id: string) {
  try {
    const token = (await cookies()).get('token')?.value
    const result = await fetch(`${process.env.NEXT_API_URL}/tag/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    })
    const json = await result.json()
    if (result.status === 200) {
      revalidateTag("getTagList")
      return resOk("删除标签成功")
    } else {
      return resErr(json.message)
    }
  } catch (error) {
    console.error(error)
    return resErr("删除标签失败")
  }
}

