import { z } from "zod"

export const CreateCategorySchema = z.object({
  name: z.string().min(1),
  color: z.string().min(1),
  icon: z.string().min(1),
  // 0: 支出, 1: 收入
  type: z.number().min(0).max(1),
})

export const UpdateCategorySchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  color: z.string().min(1),
  icon: z.string().min(1),
  type: z.number().min(0).max(1),
})

export const CategoryItemSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  color: z.string().min(1),
  icon: z.string().min(1),
  type: z.number().min(0).max(1),
})

export const CategoryListSchema = z.array(CategoryItemSchema)
