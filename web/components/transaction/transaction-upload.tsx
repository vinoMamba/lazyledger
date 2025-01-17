"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Upload } from "lucide-react"
import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { toast } from "sonner"
import { Input } from "../ui/input"
import { uploadTransactionAction } from "@/actions/upload-transaction"
export const TransactionUpload = () => {
  const [open, setOpen] = useState(false)

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const list = acceptedFiles.map(file => Object.assign(file, { preview: URL.createObjectURL(file) }))
    if (list.length > 0) {
      const file = list[0]
      if (file.size > 1024 * 1024 * 2) {
        toast.error("文件大小不能超过2MB")
        return
      }
      const formData = new FormData()
      formData.append("file", file)
      const res = await uploadTransactionAction(formData)
      if (res.code === 200) {
        toast.success("上传账单成功")
      } else {
        toast.error(res.message)
      }
      setOpen(false)
    }
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv']
    },
    maxFiles: 1
  });


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="icon" variant="outline">
          <Upload />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] top-1/4">
        <DialogHeader>
          <DialogTitle>导入支付宝账单</DialogTitle>
          <DialogDescription>点击或拖拽上传支付宝账单</DialogDescription>
        </DialogHeader>
        <div className=" space-y-4 text-center">
          <div >
            <label
              {...getRootProps()}
              className="border-2 w-full h-48  inline-flex items-center justify-center  border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
            >
              <span className="text-muted-foreground">点击或拖拽上传支付宝账单csv文件</span>
            </label>
            <Input
              {...getInputProps()}
              id="dropzone-file"
              accept=".csv"
              type="file"
              className="hidden"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
