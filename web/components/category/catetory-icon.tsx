import { z } from "zod"
import { CategoryItemSchema } from "@/schemas/category"

type CategoryIconProps = {
  category: z.infer<typeof CategoryItemSchema> | null
}
export const CategoryIcon = ({ category }: CategoryIconProps) => {
  if (!category) return null
  const bgColor = `${category.color}1A`
  return (
    <div className=' inline-flex items-center gap-1 rounded-full px-4 py-1' style={{ backgroundColor: bgColor }}>
      <span>{category.icon}</span>
      <span style={{ color: category.color }} className='text-xs'>{category.name}</span>
    </div>
  )
}

