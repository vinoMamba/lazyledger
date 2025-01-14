"use client"

import { ColumnDef, flexRender, getCoreRowModel, getSortedRowModel, Row, useReactTable } from "@tanstack/react-table"
import { useVirtualizer } from '@tanstack/react-virtual'
import { useEffect, useRef, useState } from "react"
import { TransactionSchema } from "@/schemas/transaction"
import { z } from "zod"
import { format } from "date-fns"
import { useTransaction } from "@/hooks/use-transaction"
import { CategoryCell } from "../category/category-cell"

type Transaction = z.infer<typeof TransactionSchema>


type TransactionTableProps = {
  transactions: Transaction[]
}

const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: 'date',
    header: '日期',
    cell: ({ row }) => {
      if (format(row.original.date, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')) {
        return (
          <div className="text-sm text-gray-500 flex items-center gap-2">
            {format(row.original.date, 'yyyy-MM-dd')}
            <span className="font-semibold text-xs">TODAY</span>
          </div>
        )
      }
      return <div className="text-sm text-gray-500">{format(row.original.date, 'yyyy-MM-dd')}</div>
    }
  },
  {
    accessorKey: 'name',
    header: '描述',
    cell: ({ row }) => {
      return <div className="text-sm">{row.original.name}</div>
    }
  },
  {
    accessorKey: 'categoryId',
    header: '分类',
    cell: ({ row }) => {
      return <CategoryCell value={row.original.categoryId} />
    }
  },
  {
    accessorKey: 'amount',
    header: '金额',
    cell: ({ row }) => {
      return <div className="text-sm" style={{ color: row.original.type === 1 ? 'green' : '' }}>{row.original.amount}</div>
    }
  },
]


export const TransactionTable = ({ transactions }: TransactionTableProps) => {
  const setCurrentTransaction = useTransaction(s => s.setCurrentTransaction)
  const currentTransaction = useTransaction(s => s.currentTransaction)

  const [data, setData] = useState<Transaction[]>([])

  useEffect(() => {
    setData(transactions)
    if (transactions.length > 0 && !currentTransaction ) {
      setCurrentTransaction(transactions[0])
    }
  }, [transactions, setCurrentTransaction, currentTransaction])

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
