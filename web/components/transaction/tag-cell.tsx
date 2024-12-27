import { TagSchema } from '@/schemas/transaction'
import { Tag } from 'lucide-react'
import { z } from 'zod'
import { TagSelect } from './tag-select'
import { useState } from 'react'

export type TagListProps = {
  tagList: z.infer<typeof TagSchema>[]
}


export const TagList = ({ tagList }: TagListProps) => {
  const [innerTagList, setInnerTagList] = useState(tagList)

  const handleChange = (value: z.infer<typeof TagSchema>[]) => {
    console.log(value)
    setInnerTagList(value)
  }

  return (
    <TagSelect value={innerTagList} onChange={handleChange} align='start'>
      <div className=' inline-flex items-center gap-1 border rounded-full px-2 py-1'>
        {
          innerTagList.length > 0

            ? <div className='flex items-center'>
              {innerTagList.slice(0, 3).map((tag) => (
                <Tag
                  key={tag.id}
                  className='w-[1rem] h-[1rem]'
                  style={{ fill: tag.color, stroke: tag.color }}
                />
              ))}
              {innerTagList.length > 3 && (
                <span className='text-xs text-gray-500 ml-2'>{`${innerTagList.length - 3}+`}</span>
              )}
            </div>
            : <Tag className='w-[1rem] h-[1rem]' />
        }
      </div>
    </TagSelect>
  )
}
