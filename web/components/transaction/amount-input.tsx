"use client"
import { Coins } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { forwardRef, useRef } from "react"

const AmountInput = forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ ...props }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null)

    const handleFocus = () => {
      inputRef.current?.focus()
    }
    return (
      <Button variant="outline" className={cn(
        "w-full justify-start text-left font-normal bg-sidebar hover:bg-sidebar focus-within:ring-1 focus-within:ring-ring",
      )}
        onFocus={handleFocus}
      >
        <Coins className="w-4 h-4" />
        <input
          type="number"
          tabIndex={-1}
          placeholder="0.00"
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
      </Button>
    )
  }
)
AmountInput.displayName = "AmountInput"

export { AmountInput }
