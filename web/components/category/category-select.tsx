"use client"

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command"
import { z } from "zod"
import { useEffect, useState } from "react"
import { Check, Pizza } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { CategoryItemSchema, CategoryListSchema } from "@/schemas/category"
import { cn } from "@/lib/utils"
import { Button } from "../ui/button"



type CategorySelectProps = {
  value: string
  onChange: (value: string) => void
}

const fetchCategoryOptionsFn = async () => {
  const res = await fetch(`/api/category/options`)
  const json = await res.json()
  return json as z.infer<typeof CategoryListSchema>
}




export const CategorySelect = ({ value, onChange }: CategorySelectProps) => {
  const [innerCategory, setInnerCategory] = useState<z.infer<typeof CategoryItemSchema> | null>(null)
  const [open, setOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  const { data: categoryOptions } = useQuery({
    queryKey: ["categoryOptions"],
    queryFn: fetchCategoryOptionsFn
  })

  useEffect(() => {
    setInnerCategory(categoryOptions?.find(item => item.id === value) || null)
  }, [value, categoryOptions])


  const handleSelect = (selectValue: z.infer<typeof CategoryItemSchema>) => {
    onChange(selectValue.id)
    setSearchValue('')
    setOpen(false)
  }
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className={cn(
          "w-full justify-start text-left font-normal hover:bg-sidebar focus-within:ring-1 focus-within:ring-ring",
        )}>
          {
            innerCategory ? (
              <>
                <span>{innerCategory?.icon}</span>
                <span>{innerCategory?.name}</span>
              </>
            ) : (
              <>
                <Pizza className="h-4 w-4" />
                <span className='text-muted-foreground'>分类</span>
              </>
            )
          }
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        onKeyDown={e => {
          if (e.key === 'Enter') {
            e.preventDefault()
            e.stopPropagation()
          }
        }}
      >
        <Command>
          <CommandInput
            placeholder="请选择分类"
            value={searchValue}
            onValueChange={setSearchValue}
          />
          <CommandList className="max-h-full">
            <CommandEmpty>No date found.</CommandEmpty>
            <CommandGroup>
              {categoryOptions?.map((option) => (
                <CommandItem
                  key={option.id}
                  value={option.name}
                  onSelect={() => handleSelect(option)}
                >
                  <div className="flex justify-between items-center w-full">
                    <div className="flex items-center gap-2">
                      <span>{option.icon}</span>
                      <span >{option.name}</span>
                    </div>
                    {value === option.id && <Check />}
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
