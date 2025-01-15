"use server"

import { TransactionSchema } from "@/schemas/transaction"
import { cookies } from "next/headers"


export type SearchParams = {
  id: string
}

export const getTransactionInfoAction = async (searchParams: SearchParams) => {
  try {
    const token = (await cookies()).get('token')?.value
    const result = await fetch(`${process.env.NEXT_API_URL}/transaction/info?id=${searchParams.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      },
      next: {
        tags: ['getTransactionInfo']
      }
    })
    const json = await result.json();
    const transactionInfo = TransactionSchema.safeParse(json)
    if (transactionInfo.success) {
      return transactionInfo.data
    } else {
      return null
    }

  } catch (error) {
    console.error(error)
    return null
  }
}
