import { z } from "zod"

export const AddTransactionSchema = z.object({
  amount: z.number(),
  date: z.string().date(),
  name: z.string(),
  remark: z.string().optional(),
  tagIds: z.array(z.string()).optional(),
  categoryId: z.string(),
})

export const UpdateTransactionSchema = z.object({
  id: z.string(),
  amount: z.number(),
  date: z.string().date(),
  name: z.string(),
  remark: z.string().optional(),
  tagIds: z.array(z.string()).optional(),
  categoryId: z.string(),
})

export const TransactionSchema = z.object({
  id: z.string(),
  amount: z.number(),
  date: z.string().date(),
  name: z.string(),
  categoryId: z.string(),
  tagIds: z.array(z.string()).optional(),
  remark: z.string().optional(),
  type: z.number(),
})

export const TransactionListSchema = z.array(TransactionSchema)
