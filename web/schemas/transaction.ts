import { z } from "zod"

export const TagSchema = z.object({
  id: z.string(),
  name: z.string(),
  color: z.string(),
})

export const AddTransactionSchema = z.object({
  amount: z.number(),
  date: z.string().datetime(),
  description: z.string(),
  category: z.string(),
  type: z.enum(["income", "expense"]),
  tags: z.array(TagSchema),
})
