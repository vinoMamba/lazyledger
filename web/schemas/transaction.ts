import { z } from "zod"

export const AddTransactionSchema = z.object({
  amount: z.number(),
  date: z.string().datetime(),
  description: z.string(),
  category: z.string(),
  type: z.enum(["income", "expense"]),
})
