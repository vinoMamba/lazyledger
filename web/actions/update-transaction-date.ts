"use server"
import { resErr, resOk } from "@/lib/response"
import { UpdateTransactionDateSchema } from "@/schemas/transaction"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"
import { z } from "zod"

export async function updateTransactionDateAction(value: z.infer<typeof UpdateTransactionDateSchema>) {
  const validateValue = UpdateTransactionDateSchema.safeParse(value)

  if (!validateValue.success) {
    return resErr("更新账单日期参数验证失败")
  }

  try {
    const token = (await cookies()).get('token')?.value
    const result = await fetch(`${process.env.NEXT_API_URL}/transaction/date`, {
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
      revalidateTag("getTransactionInfo")
      return resOk("更新账单日期成功")
    } else {
      return resErr(json.message)
    }
  } catch (error) {
    console.error(error)
    return resErr("更新账单日期失败")
  }
}

