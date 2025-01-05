"use client"

import { deleteCategoryAction } from "@/actions/delete-category"
import { Trash } from "lucide-react"
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog"
import { toast } from "sonner"

type DeleteCategoryButtonProps = {
  id: string
  name: string
}

export const DeleteCategoryButton = ({ id, name }: DeleteCategoryButtonProps) => {
  const handleDelete = async () => {
    const res = await deleteCategoryAction(id)
    if (res.code === 200) {
      toast.success("删除成功")
    } else {
      toast.error(res.message)
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Trash size={16} className="text-destructive opacity-80 cursor-pointer" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>确定要删除分类吗？</AlertDialogTitle>
          <AlertDialogDescription>
            「{name}」 分类删除后，该分类将无法恢复。
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
