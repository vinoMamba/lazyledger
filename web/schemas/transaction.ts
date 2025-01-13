import { z } from "zod"

export const AddTransactionSchema = z.object({
  amount: z.number(),
  date: z.string().datetime(),
  name: z.string(),
  categoryId: z.string(),
})

export const UpdateTransactionSchema = z.object({
  id: z.string(),
  amount: z.number(),
  date: z.string().datetime(),
  name: z.string(),
  categoryId: z.string(),
})

export const TransactionSchema = z.object({
  id: z.string(),
  amount: z.number(),
  date: z.string().datetime(),
  name: z.string(),
  categoryId: z.string(),
  type: z.number(),
})

export const TransactionListSchema = z.array(TransactionSchema)
