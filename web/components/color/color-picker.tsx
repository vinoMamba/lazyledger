"use client"

import { useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { HexColorPicker } from "react-colorful"

type ColorPickerProps = {
  value: string
  onChange: (value: string) => void
}

export const colorOptions = ['#fc6124', '#8a0ff0', '#c3952b', '#ec1bbd', '#561aed', '#beab3c', '#949d2b', '#e21959', '#1b962a', '#ce1d1d', '#20aeab', '#ba6e23', '#1784ec', '#373737']

export const ColorPicker = ({ value, onChange }: ColorPickerProps) => {
  const [open, setOpen] = useState(false)

  return <Popover open={open} onOpenChange={setOpen}>
    <PopoverTrigger asChild>
      <div className="w-4 h-4 rounded-xs" style={{ backgroundColor: value }} />
    </PopoverTrigger>
    <PopoverContent className="p-1 grid grid-cols-7 gap-1 w-[240px]">
      <HexColorPicker color={value} onChange={onChange} />
    </PopoverContent>
  </Popover>
}
