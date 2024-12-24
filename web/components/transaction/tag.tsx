import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useEffect, useState } from 'react'

export type Tag = {
  id: string
  name: string
  color: string
}

export type TagListProps = {
  tagIdList: string[]
}

const dataSource: Tag[] = [
  {
    id: '1',
    name: '必需品',
    color: '#8d01f8'
  },
  {
    id: '2',
    name: '非必需',
    color: '#ff5d04'
  },
  {
    id: '3',
    name: '固定支出',
    color: '#939d00'
  },
  {
    id: '4',
    name: '临时支出',
    color: '#0685f2'
  }
]

export const TagList = ({ tagIdList }: TagListProps) => {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([])

  useEffect(() => {
    setSelectedTags(dataSource.filter((tag) => tagIdList.includes(tag.id)))
  }, [tagIdList])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="inline-flex items-center gap-1 border rounded-full px-2 py-1">
          <div className="flex items-center">
            {
              selectedTags.slice(0, 3).map((tag, index) => (
                <i
                  key={tag.id}
                  className="w-3 h-3 rounded-full"
                  style={{
                    backgroundColor: tag.color,
                    marginLeft: index > 0 ? '-6px' : '0'
                  }}
                />
              ))
            }
          </div>
          {
            selectedTags.length > 3 && (
              <span className="text-xs text-gray-500">{`${selectedTags.length - 3}+`}</span>
            )
          }
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {
          dataSource.map((tag) => (
            <DropdownMenuCheckboxItem
              key={tag.id}
              checked={selectedTags.some((t) => t.id === tag.id)}
              onCheckedChange={(checked) => {
                if (checked) {
                  setSelectedTags([...selectedTags, tag])
                } else {
                  setSelectedTags(selectedTags.filter((t) => t.id !== tag.id))
                }
              }}
            >
              <div className="flex items-center">
                <i className="w-3 h-3 rounded-full" style={{ backgroundColor: tag.color }} />
                <span className="ml-2">{tag.name}</span>
              </div>
            </DropdownMenuCheckboxItem>
          ))
        }
      </DropdownMenuContent>
    </DropdownMenu>

  )
}
