import { CategorySchema } from '@/schemas/transaction'
import { z } from 'zod'
import { useState } from 'react'
import { CategorySelect } from './category-select'
import { CategoryIcon } from './catetory-icon'

export type CategoryCellProps = {
  category: z.infer<typeof CategorySchema>
}


export const CategoryCell = ({ category }: CategoryCellProps) => {
  const [innerCategory, setInnerCategory] = useState(category)

  const handleChange = (value: z.infer<typeof CategorySchema>) => {
    setInnerCategory(value)
  }

  return (
    <CategorySelect value={innerCategory} onChange={handleChange} align='start'>
      <CategoryIcon category={innerCategory} />
    </CategorySelect>
  )
}
