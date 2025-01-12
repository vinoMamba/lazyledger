"use server"
import { resErr, resOk } from "@/lib/response"
import { AddTransactionSchema } from "@/schemas/transaction"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"
import { z } from "zod"

export async function addTransactionAction(value: z.infer<typeof AddTransactionSchema>) {
  const validateValue = AddTransactionSchema.safeParse(value)

  if (!validateValue.success) {
    return resErr("添加账单参数验证失败")
  }

  try {
    const token = (await cookies()).get('token')?.value
    const result = await fetch(`${process.env.NEXT_API_URL}/transaction`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(validateValue.data),
    })
    const json = await result.json()
    if (result.status === 200) {
      revalidateTag("getTransactionList")
      return resOk("添加账单成功")
    } else {
      return resErr(json.message)
    }
  } catch (error) {
    console.error(error)
    return resErr("添加账单失败")
  }
}

