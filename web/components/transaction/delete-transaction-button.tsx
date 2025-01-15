"use client"

import { deleteTransactionAction } from "@/actions/delete-transaction"
import { TrashIcon } from "lucide-react"
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog"
import { toast } from "sonner"

type DeleteTransactionButtonProps = {
  ids: string[]
}

export const DeleteTransactionButton = ({ ids }: DeleteTransactionButtonProps) => {
  const handleDelete = async () => {
    const res = await deleteTransactionAction(ids)
    if (res.code === 200) {
      toast.success("删除成功")
    } else {
      toast.error(res.message)
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <TrashIcon className="size-4" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>确定要删除选中的账单吗？</AlertDialogTitle>
          <AlertDialogDescription>
            选中账单删除后，该账单将无法恢复。
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>取消</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>删除</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>

  )
}
