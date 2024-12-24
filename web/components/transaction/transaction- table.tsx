"use client"

import { ColumnDef, flexRender, getCoreRowModel, getSortedRowModel, Row, useReactTable } from "@tanstack/react-table"
import { useVirtualizer } from '@tanstack/react-virtual'
import { useEffect, useMemo, useRef, useState } from "react"
import dayjs from "dayjs"
import { Category } from "./category"
import { TagList } from "./tag"



export type Transaction = {
  id: string
  description: string
  category: Category
  tags: string[]
  amount: number
  type: 'expense' | 'income'
  date: string
}

// 生成示例数据的辅助函数
function generateMockTransactions(days: number = 30): Transaction[] {
  const transactions: Transaction[] = []
  const categories: Category[] = [
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
        // 从 【1，2，3，4】中随机选择几个
        tags: Array.from({ length: Math.floor(Math.random() * 4) + 1 }, () => Math.floor(Math.random() * 4) + 1).map(String),
        amount: Math.floor(Math.random() * 1000) + 10,
        type: isExpense ? 'expense' : 'income',
        date: dayjs(date).format('YYYY-MM-DD')
      })
    }
  }

  return transactions.sort((a, b) => dayjs(b.date).unix() - dayjs(a.date).unix())
}


export const TransactionTable = () => {
  const columns = useMemo<ColumnDef<Transaction>[]>(
    () => [
      {
        accessorKey: 'date',
        header: '日期',
        cell: ({ row }) => {
          return <div className="text-sm text-gray-500">{row.original.date}</div>
        }
      },
      {
        accessorKey: 'description',
        header: '描述',
        cell: ({ row }) => {
          return <div className="text-sm text-gray-500">{row.original.description}</div>
        }
      },
      {
        accessorKey: 'category',
        header: '分类',
        cell: ({ row }) => {
          return <Category category={row.original.category} />
        }
      },
      {
        accessorKey: 'tags',
        header: '标签',
        cell: ({ row }) => {
          return <TagList tagIdList={row.original.tags} />
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
              className="flex w-full absolute cursor-pointer my-2"
              key={virtualRow.key}
              style={{ transform: `translateY(${virtualRow.start}px)` }}
            >
              {row.getVisibleCells().map(cell => {
                return (
                  <div key={cell.id} className="w-full">
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
