"use client"

import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { z } from "zod"
import { CategoryItemSchema } from "@/schemas/category"
import { ArrowDownRight, ArrowUpRight, Loader, SquareKanban } from "lucide-react"
import { CategoryIcon } from "./catetory-icon"
import { EditCategoryButton } from "./edit-category"
import { DeleteCategoryButton } from "./delete-category"
import { TableCell, TableRow } from "../ui/table"

type CategoryItem = z.infer<typeof CategoryItemSchema>

interface CategoryTableProps {
  data: CategoryItem[]
}

const columns: ColumnDef<CategoryItem>[] = [
  {
    accessorKey: "name",
    header: () => {
      return (
        <div className="flex items-center gap-2">
          <Loader size={16} />
          <span>分类</span>
        </div>
      )
    },
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <CategoryIcon category={row.original} />
        </div>
      )
    }
  },
  {
    accessorKey: "type",
    header: () => {
      return (
        <div className="flex items-center gap-2">
          <SquareKanban size={16} />
          <span>类型</span>
        </div>
      )
    },
    size: 40,
    cell: ({ row }) => {
      const Icon = row.original.type === 0 ? <ArrowDownRight color="#ff5d04" size={16} /> : <ArrowUpRight color="#0685f2" size={16} />
      return (
        <div className="flex items-center gap-2">
          {Icon}
          <span>{row.original.type === 0 ? "支出" : "收入"}</span>
        </div>
      )
    }
  },
  {
    accessorKey: "action",
    header: "",
    size: 10,
    cell: ({ row }) => {
      return (
        <div className="inline-flex items-center gap-2">
          <EditCategoryButton category={row.original} />
          <DeleteCategoryButton id={row.original.id} name={row.original.name} />
        </div>
      )
    }
  },
]

export function CategoryTable({ data }: CategoryTableProps) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div>
      <table className="w-full">
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  className="px-4 h-12 text-left align-middle font-semibold text-sm border text-muted-foreground"
                  style={{ width: header.getSize(), maxWidth: header.getSize() }}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {
            table.getRowModel().rows.length ? (
              table.getRowModel().rows.map(row => (
                <tr key={row.id} className="cursor-pointer">
                  {row.getVisibleCells().map(cell => (
                    <td
                      key={cell.id}
                      className="px-4 h-12 text-left align-middle text-sm border"
                      style={{ width: cell.column.getSize(), maxWidth: cell.column.getSize() }}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <TableRow className="border-none">
                <TableCell colSpan={columns.length} className="h-24 text-center border-none">
                  暂无数据
                </TableCell>
              </TableRow>
            )
          }
        </tbody>
      </table>
    </div>
  )
}
