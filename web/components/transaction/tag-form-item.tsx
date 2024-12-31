"use client"

import { Button } from "@/components/ui/button"
import { TagSchema } from "@/schemas/transaction"
import { TagIcon } from "lucide-react"
import { z } from "zod"
import { TagSelect } from "./tag-select"
import { useState } from "react"


type TagFormItemProps = {
  value: z.infer<typeof TagSchema>[]
  onChange: (value: z.infer<typeof TagSchema>[]) => void
}


export const TagFormItem = ({ value, onChange }: TagFormItemProps) => {
  const [innerTagList, setInnerTagList] = useState(value)

  const handleChange = (value: z.infer<typeof TagSchema>[]) => {
    setInnerTagList(value)
    onChange(value)
  }

  return (
    <TagSelect value={innerTagList} onChange={handleChange}>
      <Button variant="outline" className="w-full justify-start text-left font-normal bg-sidebar hover:bg-sidebar">
        <TagIcon className="h-4 w-4" />
        {(value && value.length > 0) ? value.map(tag => tag.name).join(', ') : <span className="text-muted-foreground">标签</span>}
      </Button>
    </TagSelect>
  )
}

