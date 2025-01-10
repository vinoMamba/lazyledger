import { z } from "zod"

export const CreateTagSchema = z.object({
  name: z.string().min(1, "标签名称不能为空"),
  color: z.string().min(1, "标签颜色不能为空"),
})

export const TagItemSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  color: z.string().min(1),
})

export const TagListSchema = z.array(TagItemSchema)

export const UpdateTagSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  color: z.string().min(1),
})
