"use server"

import { TransactionListSchema } from "@/schemas/transaction"
import { cookies } from "next/headers"


export const getTransactionListAction = async () => {
  try {
    const token = (await cookies()).get('token')?.value
    const result = await fetch(`${process.env.NEXT_API_URL}/transaction/list`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      },
      next: {
        tags: ['getTransactionList']
      }
    })
    const json = await result.json();
    const transactionList = TransactionListSchema.safeParse(json)
    if (transactionList.success) {
      return transactionList.data
    } else {
      return []
    }

  } catch (error) {
    console.error(error)
    return []
  }
}
