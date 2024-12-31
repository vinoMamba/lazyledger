import { CategorySchema } from '@/schemas/transaction'
import { z } from 'zod'
import { useState } from 'react'
import { CategorySelect } from './category-select'

export type CategoryCellProps = {
  category: z.infer<typeof CategorySchema>
}


export const CategoryCell = ({ category }: CategoryCellProps) => {
  const [innerCategory, setInnerCategory] = useState(category)

  const handleChange = (value: z.infer<typeof CategorySchema>) => {
    setInnerCategory(value)
  }

  const bgColor = `${innerCategory.color}1A`

  return (
    <CategorySelect value={innerCategory} onChange={handleChange} align='start'>
      <div className=' inline-flex items-center gap-1 border rounded-full px-4 py-1' style={{ backgroundColor: bgColor }}>
        <span>{innerCategory.icon}</span>
        <span style={{ color: innerCategory.color }} className='text-xs'>{innerCategory.name}</span>
      </div>
    </CategorySelect>
  )
}
