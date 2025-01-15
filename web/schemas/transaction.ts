import { z } from "zod"

export const AddTransactionSchema = z.object({
  amount: z.number(),
  date: z.string().date(),
  name: z.string(),
  remark: z.string().optional(),
  type: z.number().min(0).max(1),
  tagIds: z.array(z.string()).optional(),
  categoryId: z.string(),
})

export const UpdateTransactionTypeSchema = z.object({
  id: z.string(),
  type: z.number().min(0).max(1),
})

export const UpdateTransactionNameSchema = z.object({
  id: z.string(),
  name: z.string(),
})

export const UpdateTransactionAmountSchema = z.object({
  id: z.string(),
  amount: z.number(),
})

export const UpdateTransactionDateSchema = z.object({
  id: z.string(),
  date: z.string().date(),
})

export const UpdateTransactionCategorySchema = z.object({
  id: z.string(),
  categoryId: z.string(),
})

export const UpdateTransactionRemarkSchema = z.object({
  id: z.string(),
  remark: z.string(),
})

export const TransactionSchema = z.object({
  id: z.string(),
  amount: z.number(),
  date: z.string().date(),
  name: z.string(),
  categoryId: z.string(),
  tagIds: z.array(z.string()).optional(),
  remark: z.string().optional(),
  type: z.number().min(0).max(1),
})

export const TransactionListSchema = z.array(TransactionSchema)
