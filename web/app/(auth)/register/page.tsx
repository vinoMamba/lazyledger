import { RegisterForm } from "@/components/auth/register-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center text-2xl">用 户 注 册</CardTitle>
        <CardContent className=" w-[300px]">
          <RegisterForm />
        </CardContent>
      </CardHeader>
    </Card>
  )
}
