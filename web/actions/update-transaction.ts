"use server"
import { resErr, resOk } from "@/lib/response"
import { UpdateTransactionSchema } from "@/schemas/transaction"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"
import { z } from "zod"

export async function updateTransactionAction(value: z.infer<typeof UpdateTransactionSchema>) {
  const validateValue = UpdateTransactionSchema.safeParse(value)

  if (!validateValue.success) {
    return resErr("更新账单参数验证失败")
  }

  try {
    const token = (await cookies()).get('token')?.value
    const result = await fetch(`${process.env.NEXT_API_URL}/transaction`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(validateValue.data),
    })
    const json = await result.json()
    if (result.status === 200) {
      revalidateTag("getTransactionList")
      return resOk("更新账单成功")
    } else {
      return resErr(json.message)
    }
  } catch (error) {
    console.error(error)
    return resErr("更新账单失败")
  }
}

