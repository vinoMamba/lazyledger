"use client"

import { TrendingUp } from "lucide-react"
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"


const chartData = [
  { category: "餐饮", amount: 186 },
  { category: "交通", amount: 185 },
  { category: "购物", amount: 207 },
  { category: "娱乐", amount: 13 },
  { category: "医疗", amount: 160 },
  { category: "住房", amount: 260 },
  { category: "其他", amount: 160 },
]

const chartConfig = {
  category: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function RadarComponent() {
  return (
    <Card>
      <CardHeader className="items-center pb-4">
        <CardTitle>支出分类统计</CardTitle>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadarChart data={chartData}>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <PolarAngleAxis dataKey="category" />
            <PolarGrid radialLines={false} />
            <Radar
              dataKey="amount"
              fill="var(--color-category)"
              fillOpacity={0}
              stroke="var(--color-category)"
              strokeWidth={2}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          支出分类统计雷达图 <TrendingUp className="h-4 w-4" />
        </div>
        <div className="flex items-center gap-2 leading-none text-muted-foreground">
          2024年1月 - 2024年6月
        </div>
      </CardFooter>
    </Card>
  )
}
