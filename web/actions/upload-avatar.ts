"use server"

import { resErr, resOk } from "@/lib/response"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"

export async function updateAvatarAction(formData: FormData) {
  try {
    const token = (await cookies()).get('token')?.value
    const result = await fetch(`${process.env.NEXT_API_URL}/user/avatar`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData,
      next: {
        tags: ['getUserInfo']
      }
    })
    const json = await result.json()
    if (result.status === 200) {
      revalidateTag("getUserInfo")
      return resOk("上传头像成功")
    } else {
      return resErr(json.message)
    }
  } catch (error) {
    console.error(error)
    return resErr("上传头像失败")
  }
}

