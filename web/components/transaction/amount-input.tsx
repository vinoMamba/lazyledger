"use client"
import { Coins } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { forwardRef, useEffect, useRef, useState } from "react"

const AmountInput = forwardRef<HTMLInputElement, React.ComponentProps<"input"> & { value: number, onChange: (value: number) => void }>(
  ({ value, onChange, ...props }, ref) => {

    const [innerValue, setInnerValue] = useState<string>('')

    useEffect(() => {
      if (value > 0) {
        setInnerValue(value.toString())
      }
    }, [value])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      // 只允许数字和小数点，且只有一个小数点
      const value = e.target.value.replace(/[^0-9.]/g, '');
      const parts = value.split('.')
      if (parts.length > 2 || (parts[1] && parts[1].length > 2)) {
        return;
      }
      setInnerValue(value)
      onChange(Number(value))
    }

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
          type="text"
          tabIndex={-1}
          placeholder="0.00"
          className={cn(
            "w-full bg-transparent outline-none border-none caret-transparent",
          )}
          value={innerValue}
          onChange={handleChange}
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
