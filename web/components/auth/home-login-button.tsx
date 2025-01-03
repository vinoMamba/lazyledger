import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getUserInfoAction } from "@/actions/get-user-info"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

export const HomeLoginButton = async () => {
  const userInfo = await getUserInfoAction()
  const url = `${process.env.NEXT_API_URL}/upload/icon/${userInfo?.avatar}`
  if (userInfo) {

    return <Avatar className="h-8 w-8 rounded-lg">
      <AvatarImage src={url} alt="avatar" />
      <AvatarFallback className="text-xs">A</AvatarFallback>
    </Avatar>

  } else {
    return (
      <Button variant="outline" size="sm">
        <Link href="/login">登 录</Link>
      </Button>
    )
  }
}
