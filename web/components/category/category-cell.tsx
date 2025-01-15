"use client"

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command"
import { z } from "zod"
import { useEffect, useState } from "react"
import { Check } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { CategoryItemSchema, CategoryListSchema } from "@/schemas/category"
import { CategoryIcon } from "./catetory-icon"
import { updateTransactionCategoryAction } from "@/actions/update-transaction-category"



type CategoryCellProps = {
  id: string
  value: string
}

const fetchCategoryOptionsFn = async () => {
  const res = await fetch(`/api/category/options`)
  const json = await res.json()
  return json as z.infer<typeof CategoryListSchema>
}

export const CategoryCell = ({ id, value }: CategoryCellProps) => {

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


  const handleSelect = async (selectValue: z.infer<typeof CategoryItemSchema>) => {
    await updateTransactionCategoryAction({ id, categoryId: selectValue.id })
    setInnerCategory(selectValue)
    setSearchValue('')
    setOpen(false)
  }
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div onClick={() => setOpen(true)}>
          <CategoryIcon category={innerCategory} />
        </div>
      </PopoverTrigger>
      <PopoverContent
        className="w-[200px]"
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
          <CommandList className="max-h-[170px] ">
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
                    {innerCategory?.id === option.id && <Check />}
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

