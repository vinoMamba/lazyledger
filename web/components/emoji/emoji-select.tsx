"use client"

import { useEffect, useState } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu"
import Picker from '@emoji-mart/react'
import data from '@emoji-mart/data'

type EmojiSelectProps = {
  value: string
  onChange: (value: string) => void
}

export const EmojiSelect = ({ value, onChange }: EmojiSelectProps) => {
  const [open, setOpen] = useState(false)


  //fix: https://github.com/missive/emoji-mart/issues/752#issuecomment-2551834672
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if ((e.target as Element).closest("[data-scrollable]")) return;
      e.stopPropagation();
    };
    const handleTouchMove = (e: TouchEvent) => {
      if ((e.target as Element).closest("[data-scrollable]")) return;
      e.stopPropagation();
    };

    document.addEventListener("wheel", handleWheel, true);
    document.addEventListener("touchmove", handleTouchMove, true);

    return () => {
      document.removeEventListener("wheel", handleWheel, true);
      document.removeEventListener("touchmove", handleTouchMove, true);
    };
  }, []);

  const handleEmojiSelect = (e: { native: string }) => {
    onChange(e.native)
    setOpen(false)
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <div className="w-9 h-9 border rounded-md flex items-center justify-center cursor-pointer">
          {value}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <Picker
          data={data}
          onEmojiSelect={handleEmojiSelect}
          autoFocus
        />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
