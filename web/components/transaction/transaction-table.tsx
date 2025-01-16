"use client"

import { flexRender, getCoreRowModel, getSortedRowModel, Row, RowSelectionState, useReactTable } from "@tanstack/react-table"
import { useVirtualizer, VirtualItem, Virtualizer } from '@tanstack/react-virtual'
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { usePathname, useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils"
import { Checkbox } from "@/components/ui/checkbox"
import { DockIcon } from "@/components/ui/dock"
import { Dock } from "@/components/ui/dock"
import { TagIcon } from "lucide-react"
import { DeleteTransactionButton } from "./delete-transaction-button"
import { TransactionColumns, Transaction } from "./transaction-columns"


type TransactionTableProps = {
  transactions: Transaction[]
}

const useUpdateTransactionUrl = (currentTransactionId: string) => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()


  useEffect(() => {
    if (!currentTransactionId) return
    const params = new URLSearchParams(searchParams)
    const currentId = params.get('id')
    if (currentId === currentTransactionId) return
    params.set('id', currentTransactionId)
    replace(`${pathname}?${params.toString()}`);
  }, [currentTransactionId, pathname, replace, searchParams])
}

type TransactionRowProps = {
  row: Row<Transaction>
  currentTransactionId: string
  isSelected: boolean
  virtualRow: VirtualItem
  handleRowClick: (row: Row<Transaction>) => void
  rowVirtualizer: Virtualizer<HTMLDivElement, Element>
}

const TransactionRow = memo(({ row, currentTransactionId, virtualRow, rowVirtualizer, handleRowClick, isSelected }: TransactionRowProps) => {
  return (
    <div
      data-index={virtualRow.index}
      ref={node => rowVirtualizer.measureElement(node)}
      className={
        cn(
          "flex absolute w-full h-10 items-center group",
          currentTransactionId === row.original.id ? "bg-gray-200 dark:bg-sidebar" : "",
          row.getIsSelected() ? "bg-gray-200 dark:bg-sidebar" : ""
        )
      }
      style={{ transform: `translateY(${virtualRow.start}px)` }}
    >
      <div className="w-10 h-full relative shrink-0">
        <div className={
          cn(
            "hidden group-hover:flex absolute top-1/2 -translate-y-1/2 left-0 w-10  justify-center items-center",
            isSelected ? "flex" : "hidden"
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
            checked={isSelected}
          />
        </div>
      </div>
      <div className="w-full flex h-full cursor-pointer" onClick={() => handleRowClick(row)}>
        {row.getVisibleCells().map(cell => {
          return (
            <div
              key={cell.id}
              className="flex-1 w-full h-full flex items-center whitespace-nowrap"
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
})
TransactionRow.displayName = 'TransactionRow'

type TableState = {
  data: Transaction[]
  rowSelection: Record<string, boolean>
  currentTransactionId: string
}

type UpdateFn = (updater: RowSelectionState | ((prev: RowSelectionState) => RowSelectionState)) => void


export const TransactionTable = ({ transactions }: TransactionTableProps) => {

  const [tableState, setTableState] = useState<TableState>({
    currentTransactionId: '',
    data: [],
    rowSelection: {},
  })

  const setData = useCallback((data: Transaction[]) => {
    setTableState(prev => ({
      ...prev,
      data,
    }))
  }, [])

  const setCurrentTransactionId = useCallback((id: string) => {
    setTableState(prev => ({
      ...prev,
      currentTransactionId: id,
    }))
  }, [])

  const setRowSelection: UpdateFn = useCallback((selection: RowSelectionState | ((prev: RowSelectionState) => RowSelectionState)) => {
    setTableState(prev => ({
      ...prev,
      rowSelection: typeof selection === 'function' ? selection(prev.rowSelection) : selection,
    }))
  }, [])

  useEffect(() => {
    setData(transactions)
    if (transactions.length > 0 && !tableState.currentTransactionId) {
      setCurrentTransactionId(transactions[0].id)
    }
  }, [transactions, tableState.currentTransactionId, setCurrentTransactionId, setData])


  useUpdateTransactionUrl(tableState.currentTransactionId)

  const table = useReactTable({
    data: useMemo(() => tableState.data, [tableState.data]),
    columns: TransactionColumns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getRowId: row => row.id,
    state: {
      rowSelection: tableState.rowSelection,
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

  const handleRowClick = useCallback((row: Row<Transaction>) => {
    setTableState(prev => ({
      ...prev,
      currentTransactionId: row.original.id,
      rowSelection: {},
    }))
  }, [])

  return (
    <div className="h-full pt-4 relative">
      <DockMenu rowSelection={tableState.rowSelection} />
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
              <TransactionRow
                key={row.id}
                row={row}
                currentTransactionId={tableState.currentTransactionId}
                virtualRow={virtualRow}
                isSelected={row.getIsSelected()}
                rowVirtualizer={rowVirtualizer}
                handleRowClick={handleRowClick}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

type DockMenuProps = {
  rowSelection: Record<string, boolean>
}
const DockMenu = ({ rowSelection }: DockMenuProps) => {
  return (
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
  )
}
