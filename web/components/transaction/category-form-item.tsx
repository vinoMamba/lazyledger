"use client"

import { Button } from "@/components/ui/button"
import { Pizza } from "lucide-react"
import { useState } from "react"
import { CategorySelect } from "../category/category-select"
import { cn } from "@/lib/utils"
import { CategoryItemSchema } from "@/schemas/category"
import { z } from "zod"


type CategoryFormItemProps = {
  value: string
  onChange: (value: string) => void
}


export const CategoryFormItem = ({ value, onChange }: CategoryFormItemProps) => {
  const [innerCategory, setInnerCategory] = useState(value)

  const handleChange = (value: z.infer<typeof CategoryItemSchema>) => {
    setInnerCategory(value)
    onChange(value)
  }

  return (
    <CategorySelect
      value={innerCategory}
      onChange={handleChange}
    >
      <Button variant="outline" className={cn(
        "w-full justify-start text-left font-normal bg-sidebar hover:bg-sidebar focus-within:ring-1 focus-within:ring-ring",
      )}>
        {
          innerCategory ? (
            <>
              <span>{innerCategory?.icon}</span>
              <span style={{ color: innerCategory?.color }}>{innerCategory?.name}</span>
            </>
          ) : (
            <>
              <Pizza className="h-4 w-4" />
              <span className='text-muted-foreground'>分类</span>
            </>
          )
        }
      </Button>
    </CategorySelect >
  )
}

