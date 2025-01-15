"use client"

import { ColumnDef, flexRender, getCoreRowModel, getSortedRowModel, Row, useReactTable } from "@tanstack/react-table"
import { useVirtualizer } from '@tanstack/react-virtual'
import { useEffect, useRef, useState } from "react"
import { TransactionSchema } from "@/schemas/transaction"
import { z } from "zod"
import { format } from "date-fns"
import { CategoryCell } from "@/components/category/category-cell"
import { useRouter } from "next/navigation"
import { usePathname, useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils"
import { Checkbox } from "../ui/checkbox"
import { DockIcon } from "../ui/dock"
import { Dock } from "../ui/dock"
import { TagIcon } from "lucide-react"
import { DeleteTransactionButton } from "./delete-transaction-button"

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
      return <CategoryCell id={row.original.id} value={row.original.categoryId} />
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
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()
  const [currentTransactionId, setCurrentTransactionId] = useState<string>('')
  const [data, setData] = useState<Transaction[]>([])
  const [rowSelection, setRowSelection] = useState({})

  useEffect(() => {
    setData(transactions)
    if (transactions.length > 0 && !currentTransactionId) {
      setCurrentTransactionId(transactions[0].id)
    }
  }, [transactions, currentTransactionId])

  useEffect(() => {
    const params = new URLSearchParams(searchParams)
    params.set('id', currentTransactionId)
    replace(`${pathname}?${params.toString()}`);
  }, [currentTransactionId, pathname, replace, searchParams])


  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getRowId: row => row.id,
    state: {
      rowSelection,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
  })

  const { rows } = table.getRowModel()
  const tableContainerRef = useRef<HTMLDivElement>(null)

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    estimateSize: () => 40,
    getScrollElement: () => tableContainerRef.current,
    overscan: 5,
  })

  const handleRowClick = (row: Row<Transaction>) => {
    setCurrentTransactionId(row.original.id)
    setRowSelection({})
  }

  return (
    <div className="h-full pt-4 relative">
      <div className={
        cn(
          "absolute -bottom-20 left-0 w-full h-10 flex items-center justify-center z-50 transition-all duration-300",
          Object.keys(rowSelection).length > 0 ? "bottom-20" : "-bottom-20"
        )
      }
      >
        <Dock direction="middle">
          <div className="text-sm text-gray-500 pl-4">共选中{Object.keys(rowSelection).length}条数据</div>
          <DockIcon>
            <TagIcon className="size-4" />
          </DockIcon>
          <DockIcon>
            <DeleteTransactionButton ids={Object.keys(rowSelection)} />
          </DockIcon>
        </Dock>
      </div>
      <div
        className="overflow-y-auto h-full relative"
        ref={tableContainerRef}
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        <div className="relative" style={{ height: `${rowVirtualizer.getTotalSize()}px` }}>
          {rowVirtualizer.getVirtualItems().map(virtualRow => {
            const row = rows[virtualRow.index] as Row<Transaction>
            return (
              <div
                data-index={virtualRow.index}
                ref={node => rowVirtualizer.measureElement(node)}
                key={row.id}
                className={
                  cn(
                    "flex absolute w-full h-10 items-center group",
                    currentTransactionId === row.original.id ? "bg-gray-200 dark:bg-sidebar" : "",
                    row.getIsSelected() ? "bg-gray-200 dark:bg-sidebar" : ""
                  )
                }
                style={{ transform: `translateY(${virtualRow.start}px)` }}
              >
                <div className="w-10 relative">
                  <div className={
                    cn(
                      "hidden group-hover:flex absolute top-1/2 -translate-y-1/2 left-0 w-10  justify-center items-center",
                      row.getIsSelected() ? "flex" : "hidden"
                    )
                  }>
                    <Checkbox
                      onCheckedChange={checked => {
                        if (checked === 'indeterminate') {
                          row.toggleSelected(true)
                        } else {
                          row.toggleSelected(checked)
                        }
                      }}
                      checked={row.getIsSelected()}
                    />
                  </div>
                </div>
                <div className="w-full flex h-full cursor-pointer" onClick={() => handleRowClick(row)}>
                  {row.getVisibleCells().map(cell => {
                    return (
                      <div
                        key={cell.id}
                        className="flex-1 w-full h-full flex items-center"
                        style={{ width: cell.column.getSize() }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </div>
                    )
                  })}
                </div>

              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
