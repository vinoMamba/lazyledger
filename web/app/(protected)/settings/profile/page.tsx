import { getUserInfoAction } from "@/actions/get-user-info";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { getFirstStr } from "@/lib/string";
import { AvatarUpload } from "@/components/profile/avatar-upload";
import { EmailDialog } from "@/components/profile/email-dialog";
import { UsernameDialog } from "@/components/profile/username-dialog";
import { PasswordDialog } from "@/components/profile/password-dialog";

export default async function ProfilePage() {
  const userInfo = await getUserInfoAction();
  const url = `${process.env.NEXT_API_URL}/upload/icon/${userInfo?.avatar}`
  return (
    <>
      <div className="border flex flex-col gap-4 p-8 max-w-screen-sm rounded-lg">
        <div className="flex items-end  gap-8">
          <Avatar className="w-20 h-20">
            <AvatarImage src={url} alt={userInfo?.username} />
            <AvatarFallback className="text-muted-foreground">{getFirstStr(userInfo?.username)}</AvatarFallback>
          </Avatar>
          <AvatarUpload />
        </div>
        <div className="flex flex-col gap-4 text-sm">
          <span className="text-muted-foreground text-lg font-semibold">用户名</span>
          <div className=" flex items-center gap-4">
            <Input value={userInfo?.username} disabled className="disabled:opacity-100" />
            <UsernameDialog username={userInfo?.username} />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 p-8 max-w-screen-sm rounded-lg border">
        <div className="space-y-4">
          <div className="flex flex-col gap-4 text-sm">
            <span className="text-muted-foreground text-lg font-semibold">邮箱</span>
            <div className=" flex items-center gap-4">
              <Input value={userInfo?.email} disabled className="disabled:opacity-100" />
              <EmailDialog email={userInfo?.email} />
            </div>
          </div>
          <div className="flex flex-col gap-4 text-sm">
            <span className="text-muted-foreground text-lg font-semibold">密码</span>
            <div className=" flex items-center gap-4">
              <Input value="********************************" type="password" disabled className="disabled:opacity-100" />
              <PasswordDialog />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
