"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Banknote } from "lucide-react"
import { forwardRef, useRef } from "react"

const DescriptionInput = forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ type, ...props }, ref) => {

    const inputRef = useRef<HTMLInputElement>(null)

    const handleFocus = () => {
      inputRef.current?.focus()
    }

    return (
      <Button
        variant="outline"
        className="w-full justify-start text-left font-normal bg-sidebar hover:bg-sidebar focus-within:ring-1 focus-within:ring-ring"
        onFocus={handleFocus}
      >
        <Banknote className="w-4 h-4" />
        <input
          type={type}
          tabIndex={-1}
          className={cn(
            "w-full bg-transparent outline-none border-none caret-transparent",
          )}
          ref={(node) => {
            if (typeof ref === 'function') {
              ref(node)
            } else if (ref) {
              ref.current = node
            }
            inputRef.current = node
          }}
          {...props}
        />
      </Button >
    )
  }
)

DescriptionInput.displayName = "DescriptionInput"

export { DescriptionInput }
