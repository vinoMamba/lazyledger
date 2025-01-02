"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { UploadCloud } from "lucide-react"
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Input } from "@/components/ui/input"
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { updateAvatarAction } from "@/actions/upload-avatar";
import { toast } from "sonner";


export const AvatarUpload = () => {
  const [open, setOpen] = useState(false)
  const [file, setFile] = useState<File & { preview: string } | null>(null);
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const list = acceptedFiles.map(file => Object.assign(file, { preview: URL.createObjectURL(file) }))
    if (list.length > 0) {
      setFile(list[0])
    }
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/png': ['.png', '.jpg']
    },
    maxFiles: 1
  });

  const onClick = async () => {
    if (file) {
      if (file.size > 1024 * 1024 * 2) {
        toast.error("文件大小不能超过2MB")
        return
      }
      const formData = new FormData()
      formData.append("file", file)
      try {
        const { code, message } = await updateAvatarAction(formData)
        if (code === 200) {
          toast.success("上传头像成功")
        } else {
          toast.error(message)
        }
      } finally {
        setFile(null)
        setOpen(false)
      }
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <span className="text-xs hover:underline cursor-pointer underline-offset-4 ">上传</span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] top-1/4">
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <div className=" space-y-4 text-center">
          <div >
            <label
              {...getRootProps()}
              className="border-2 w-24 h-24  inline-flex items-center justify-center  border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
            >
              {
                file
                  ? (<Image alt="" src={file.preview} width={96} height={96} onLoad={() => { URL.revokeObjectURL(file.preview) }} />)
                  : (<UploadCloud className=" text-muted-foreground" />)
              }
            </label>
            <Input
              {...getInputProps()}
              id="dropzone-file"
              accept="image/png, image/jpeg"
              type="file"
              className="hidden"
            />
          </div>
          <div className=" inline-flex flex-col  gap-4">
            <p className=" text-muted-foreground">点击或拖拽上传头像</p>
            <Button size="sm" onClick={onClick}>上传</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
