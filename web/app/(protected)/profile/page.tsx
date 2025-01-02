import { getUserInfoAction } from "@/actions/get-user-info";
import { PasswordDialog } from "@/components/profile/password-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getFirstStr } from "@/lib/string";
import { AvatarUpload } from "@/components/profile/avatar-upload";
import { EmailDialog } from "@/components/profile/email-dialog";

export default async function ProfilePage() {
  const userInfo = await getUserInfoAction();
  const url = `${process.env.NEXT_API_URL}/upload/icon/${userInfo?.avatar}`
  return (
    <Card className="m-14 border-none shadow-none">
      <CardHeader>
        <CardTitle className=" text-3xl">个人设置</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent className="max-w-screen-md space-y-4">
        <div className="flex items-end gap-8">
          <Avatar className="w-20 h-20">
            <AvatarImage src={url} alt={userInfo?.username} />
            <AvatarFallback className="text-muted-foreground">{getFirstStr(userInfo?.username)}</AvatarFallback>
          </Avatar>
          <AvatarUpload />
        </div>
        <div className="flex flex-col gap-4 text-sm">
          <span className="text-muted-foreground text-lg font-semibold">用户名</span>
          <Input value={userInfo?.username} disabled />
        </div>
        <div className="space-y-4">
          <div className="flex flex-col gap-4 text-sm">
            <span className="text-muted-foreground text-lg font-semibold">邮箱</span>
            <div className=" flex items-center gap-4">
              <Input value={userInfo?.email} disabled />
              <EmailDialog email={userInfo?.email} />
            </div>
          </div>
          <div className="flex flex-col gap-4 text-sm">
            <span className="text-muted-foreground text-lg font-semibold">密码</span>
            <div className=" flex items-center gap-4">
              <Input value="********************************" type="password" disabled />
              <PasswordDialog />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
