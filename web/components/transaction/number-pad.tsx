"use client"

import { useState, useEffect, ReactNode } from "react"
import { Button } from "../ui/button"
import { DeleteIcon } from "lucide-react"
import { Input } from "../ui/input"

type NumberItem = {
  key: string
  label: ReactNode
  action: (value: string) => string
}

const NUMBERS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'] as const
const DOT = '.' as const
const BACKSPACE = 'Backspace' as const

type ValidKey = typeof NUMBERS[number] | typeof DOT | typeof BACKSPACE

const handleNumberKeyAction = (value: string, key: string) => {
  if (value.includes('.') && value.split('.')[1].length >= 2) return value
  return value === '0' ? (key === '0' ? '0' : key) : value + key
}
const handleDotKeyAction = (value: string) => {
  if (value.includes('.')) return value
  return value + '.'
}
const handleBackspaceKeyAction = (value: string) => {
  if (value.length === 1) return '0'
  return value.slice(0, -1)
}

const numberItems = new Map<ValidKey, NumberItem>([
  ...NUMBERS.map(num => [num, { key: num, label: num, action: (value: string) => handleNumberKeyAction(value, num) }]) as [ValidKey, NumberItem][],
  [DOT, { key: DOT, label: DOT, action: (value: string) => handleDotKeyAction(value) }],
  [BACKSPACE, {
    key: BACKSPACE,
    label: <DeleteIcon className="w-4 h-4" />,
    action: (value: string) => handleBackspaceKeyAction(value)
  }]
])

// 添加验证和格式化函数
const formatValue = (value: string, maxLength: number): string => {
  // 检查是否为有效数字
  if (!/^\d*\.?\d*$/.test(value)) return '0'
  // 移除前导零
  const formatted = value.replace(/^0+(?=\d)/, '')
  // 如果是空字符串（比如全是0的情况），返回0
  if (!formatted) return '0'
  // 处理小数部分
  if (formatted.includes('.')) {
    const [integer, decimal] = formatted.split('.')
    return `${integer || '0'}.${decimal.slice(0, 2)}`
  }
  if (formatted.length > maxLength) {
    return formatted.slice(0, maxLength)
  }
  return formatted
}

type NumberPadProps = {
  value: string
  onChange: (value: string) => void
  maxLength?: number
}

export const NumberPad = ({ value, onChange, maxLength = 10 }: NumberPadProps) => {
  const [inputValue, setInputValue] = useState(value)
  const [activeKey, setActiveKey] = useState<ValidKey | null>(null)

  useEffect(() => {
    const formattedValue = formatValue(inputValue, maxLength)
    if (formattedValue !== inputValue) {
      setInputValue(formattedValue)
    }
  }, [value, setInputValue, inputValue, maxLength])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      let key = event.key as ValidKey | '。'
      if (key === '。') {
        key = DOT
      }
      if (numberItems.has(key)) {
        setActiveKey(key)
        setInputValue(numberItems.get(key)?.action(inputValue) || '')
      }
    }
    const handleKeyUp = () => setActiveKey(null)

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [activeKey, onChange, inputValue])

  const handleButtonClick = (item: NumberItem) => {
    setInputValue(item.action(inputValue))
  }

  const handleConfirm = () => {
    onChange(inputValue)
  }

  return (
    <div>
      <div className="grid grid-cols-3 gap-2">
        <Input value={inputValue} onChange={() => { }} className="col-span-2" />
        <Button className="col-span-1" onClick={handleConfirm}>确定</Button>
        {Array.from(numberItems.values()).map((item, index) => (
          <Button
            tabIndex={-1}
            variant={activeKey === item.key ? 'default' : 'outline'}
            className="w-full p-2"
            size="icon"
            key={index}
            onClick={() => handleButtonClick(item)}
          >{item.label}</Button>
        ))}
      </div>
    </div>
  )
}

