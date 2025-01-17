"use server"

import { resErr, resOk } from "@/lib/response"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"

export async function uploadTransactionAction(formData: FormData) {
  try {
    const token = (await cookies()).get('token')?.value
    const result = await fetch(`${process.env.NEXT_API_URL}/transaction/upload`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData,
    })
    const json = await result.json()
    if (result.status === 200) {
      revalidateTag("getTransactionList")
      return resOk("上传账单成功")
    } else {
      return resErr(json.message)
    }
  } catch (error) {
    console.error(error)
    return resErr("上传账单失败")
  }
}

