import { CategorySchema } from "@/schemas/transaction"
import { z } from "zod"

type CategoryIconProps = {
  category: z.infer<typeof CategorySchema> | null
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

