import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export const Assistant = () => {
  return (
    <Card>
      <CardHeader className="items-center pb-4">
        <CardTitle>LazyLedger 助手</CardTitle>
        <CardDescription>
          一个可以帮你分析数据，生成报告，并给出建议的助手
        </CardDescription>
      </CardHeader>
      <CardContent>

      </CardContent>
    </Card>
  )
}
