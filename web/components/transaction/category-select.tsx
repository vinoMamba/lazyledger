"use client"

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command"
import { CategorySchema } from "@/schemas/transaction"
import { z } from "zod"
import { ReactNode, useState } from "react"
import { Check } from "lucide-react"

type CategoryItem = z.infer<typeof CategorySchema>

const categoryOptions: CategoryItem[] = [
  { id: '1', name: '餐饮', icon: '🍜', color: '#ff5d04' },
  { id: '2', name: '交通', icon: '🚗', color: '#ff5d04' },
  { id: '3', name: '购物', icon: '🛒', color: '#939d00' },
  { id: '4', name: '娱乐', icon: '🎉', color: '#0685f2' },
  { id: '5', name: '其他', icon: '🍔', color: '#0685f2' },
  { id: '6', name: '其他1', icon: '🍔', color: '#0685f2' },
  { id: '7', name: '其他2', icon: '🍔', color: '#0685f2' },
  { id: '8', name: '其他3', icon: '🍔', color: '#0685f2' },
  { id: '9', name: '其他4', icon: '🍔', color: '#0685f2' },
  { id: '10', name: '其他5', icon: '🍔', color: '#0685f2' },
]

type CategorySelectProps = {
  align?: 'start' | 'center' | 'end'
  value: CategoryItem | null
  onChange: (value: CategoryItem) => void
  children: ReactNode
}

export const CategorySelect = ({ value, onChange, children, align = 'center' }: CategorySelectProps) => {
  const [open, setOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  const handleSelect = (selectValue: string) => {
    onChange(categoryOptions.find(item => item.name === selectValue)!)
    setSearchValue('')
    setOpen(false)
  }
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div>{children}</div>
      </PopoverTrigger>
      <PopoverContent
        onKeyDown={e => {
          if (e.key === 'Enter') {
            e.preventDefault()
            e.stopPropagation()
          }
        }}
        className="w-[29rem]" align={align}>
        <Command>
          <CommandInput
            placeholder="请选择分类"
            value={searchValue}
            onValueChange={setSearchValue}
          />
          <CommandList className="max-h-[170px] ">
            <CommandEmpty>No date found.</CommandEmpty>
            <CommandGroup>
              {categoryOptions.map((option) => (
                <CommandItem
                  key={option.id}
                  value={option.name}
                  onSelect={handleSelect}
                >
                  <div className="flex justify-between items-center w-full">
                    <div className="flex items-center gap-2">
                      <span>{option.icon}</span>
                      <span>{option.name}</span>
                    </div>
                    {value?.id === option.id && <Check />}
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
