"use client"

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command"
import { TagSchema } from "@/schemas/transaction"
import { z } from "zod"
import { ReactNode, useState } from "react"
import { Check, Tag } from "lucide-react"

type TagItem = z.infer<typeof TagSchema>

const tagOptions: TagItem[] = [
  { id: '1', name: '必需品', color: '#8d01f8' },
  { id: '2', name: '非必需', color: '#ff5d04' },
  { id: '3', name: '固定支出', color: '#939d00' },
  { id: '4', name: '临时支出', color: '#0685f2' },
  { id: '5', name: '其他', color: '#0685f2' },
  { id: '6', name: '其他1', color: '#0685f2' },
  { id: '7', name: '其他2', color: '#0685f2' },
  { id: '8', name: '其他3', color: '#0685f2' },
  { id: '9', name: '其他4', color: '#0685f2' },
  { id: '10', name: '其他5', color: '#0685f2' },
]

type TagSelectProps = {
  align?: 'start' | 'center' | 'end'
  value: TagItem[]
  onChange: (value: TagItem[]) => void
  children: ReactNode
}

export const TagSelect = ({ value, onChange, children, align = 'center' }: TagSelectProps) => {
  const [open, setOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  const handleSelect = (selectValue: string) => {
    if (value.some(item => item.name === selectValue)) {
      onChange(value.filter(item => item.name !== selectValue))
    } else {
      onChange([...value, tagOptions.find(item => item.name === selectValue)!])
    }
    setSearchValue('')
  }
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div>{children}</div>
      </PopoverTrigger>
      <PopoverContent className="w-[29rem]" align={align}>
        <Command>
          <CommandInput placeholder="Search date..." value={searchValue} onValueChange={setSearchValue} />
          <CommandList className="max-h-[170px] ">
            <CommandEmpty>No date found.</CommandEmpty>
            <CommandGroup>
              {tagOptions.map((option) => (
                <CommandItem
                  key={option.id}
                  value={option.name}
                  onSelect={handleSelect}
                >
                  <div className="flex justify-between items-center w-full">
                    <div className="flex items-center gap-2">
                      <Tag className="w-[1rem] h-[1rem]" style={{ fill: option.color, stroke: option.color }} />
                      <span>{option.name}</span>
                    </div>
                    {value.some(item => item.id === option.id) && <Check />}
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
