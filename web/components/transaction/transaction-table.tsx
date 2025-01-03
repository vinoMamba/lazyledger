"use client"

import { ColumnDef, flexRender, getCoreRowModel, getSortedRowModel, Row, useReactTable } from "@tanstack/react-table"
import { useVirtualizer } from '@tanstack/react-virtual'
import { useEffect, useMemo, useRef, useState } from "react"
import { CategoryCell } from "./category-cell"
import { TagList } from "./tag-cell"
import { CategorySchema, TagSchema } from "@/schemas/transaction"
import { z } from "zod"
import { format } from "date-fns"
import { useTransaction } from "@/hooks/use-transaction"



export type Transaction = {
  id: string
  description: string
  category: z.infer<typeof CategorySchema>
  tags: z.infer<typeof TagSchema>[]
  amount: number
  type: 'expense' | 'income'
  date: string
}

// 生成示例数据的辅助函数
function generateMockTransactions(days: number = 30): Transaction[] {
  const transactions: Transaction[] = []
  const categories: z.infer<typeof CategorySchema>[] = [
    {
      id: '1',
      name: '餐饮',
      icon: '🍔',
      color: '#FF5733'
    },
    {
      id: '2',
      name: '公共交通',
      icon: '🚗',
      color: '#33FF57'
    },
    {
      id: '3',
      name: '购物',
      icon: '🛒',
      color: '#3357FF'
    },
    {
      id: '4',
      name: '零花钱',
      icon: '🎉',
      color: '#FF3333'
    }
  ]

  const descriptions = ['三餐', '寄快递', '投资', '洗碗机', '买衣服', '游戏充钱', '电影票', '工资', '理财收入']

  for (let i = 0; i < days; i++) {
    const date = new Date()
    date.setDate(date.getDate() - i)

    // 每天生成1-3笔交易
    const dailyTransactions = Math.floor(Math.random() * 3) + 1

    for (let j = 0; j < dailyTransactions; j++) {
      const isExpense = Math.random() > 0.3 // 70%概率是支出
      transactions.push({
        id: `trans-${i}-${j}`,
        description: descriptions[Math.floor(Math.random() * descriptions.length)],
        category: categories[Math.floor(Math.random() * categories.length)],
        tags: [
          { id: '1', name: '必需品', color: '#8d01f8' },
          { id: '2', name: '非必需', color: '#ff5d04' },
          { id: '3', name: '固定支出', color: '#939d00' },
          { id: '4', name: '临时支出', color: '#0685f2' },
        ],
        amount: Math.floor(Math.random() * 1000) + 10,
        type: isExpense ? 'expense' : 'income',
        date: format(date, 'yyyy-MM-dd')
      })
    }
  }

  return transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}


export const TransactionTable = () => {
  const setCurrentTransaction = useTransaction(s => s.setCurrentTransaction)
  const currentTransaction = useTransaction(s => s.currentTransaction)


  const columns = useMemo<ColumnDef<Transaction>[]>(
    () => [
      {
        accessorKey: 'date',
        header: '日期',
        cell: ({ row }) => {
          if (row.original.date === format(new Date(), 'yyyy-MM-dd')) {
            return (
              <div className="text-sm text-gray-500 flex items-center gap-2">
                {row.original.date}
                <span className="font-semibold text-xs">TODAY</span>
              </div>
            )
          }
          return <div className="text-sm text-gray-500">{row.original.date}</div>
        }
      },
      {
        accessorKey: 'description',
        header: '描述',
        cell: ({ row }) => {
          return <div className="text-sm">{row.original.description}</div>
        }
      },
      {
        accessorKey: 'category',
        header: '分类',
        cell: ({ row }) => {
          return <CategoryCell category={row.original.category} />
        }
      },
      {
        accessorKey: 'tags',
        header: '标签',
        cell: ({ row }) => {
          return <TagList tagList={row.original.tags} />
        }
      },
      {
        accessorKey: 'amount',
        header: '金额',
        cell: ({ row }) => {
          const type = row.original.type
          return <div className={`text-sm ${type === 'expense' ? 'text-red-500' : 'text-green-500'}`}>¥{row.original.amount}</div>
        }
      },
    ],
    []
  )
  const [data, setData] = useState<Transaction[]>([])
  // 使用 useEffect 在客户端生成数据
  useEffect(() => {
    setData(() => generateMockTransactions(100))
  }, [])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  })

  const { rows } = table.getRowModel()
  const tableContainerRef = useRef<HTMLDivElement>(null)

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    estimateSize: () => 48,
    getScrollElement: () => tableContainerRef.current,
    overscan: 5,
  })

  const handleRowClick = (row: Row<Transaction>) => {
    setCurrentTransaction(row.original)
  }


  return (
    <div className="h-full p-4">
      <div
        className="overflow-y-auto h-full relative"
        ref={tableContainerRef}
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {rowVirtualizer.getVirtualItems().map(virtualRow => {
          const row = rows[virtualRow.index] as Row<Transaction>
          return (
            <div
              className="flex w-full absolute cursor-pointer my-2 items-center px-4"
              key={virtualRow.key}
              style={{
                transform: `translateY(${virtualRow.start}px)`,
              }}
              onClick={() => handleRowClick(row)}
            >
              {currentTransaction?.id === row.original.id && <div className="w-1 h-4 bg-gray-500 rounded-full absolute left-0 top-0 translate-y-1/2"></div>}
              {row.getVisibleCells().map(cell => {
                return (
                  <div key={cell.id} className="w-full" >
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}
