import { TransactionSchema } from "@/schemas/transaction";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { CategoryCell } from "../category/category-cell";
import { z } from "zod";


export type Transaction = z.infer<typeof TransactionSchema>

const formatDate = (date: Date) => format(date, 'yyyy-MM-dd')
const isToday = (date: Date) => formatDate(date) === formatDate(new Date())

export const TransactionColumns: ColumnDef<Transaction>[] = [
  {
    accessorKey: 'date',
    header: '日期',
    cell: ({ row }) => {
      if (isToday(new Date(row.original.date))) {
        return (
          <div className="text-sm text-gray-500 flex items-center gap-2">
            {formatDate(new Date(row.original.date))}
            <span className="font-semibold text-xs">TODAY</span>
          </div>
        )
      }
      return <div className="text-sm text-gray-500">{formatDate(new Date(row.original.date))}</div>
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
