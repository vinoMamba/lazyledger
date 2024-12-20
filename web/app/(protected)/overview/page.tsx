import { Assistant } from "@/components/assistant/assistant";
import { Chart } from "@/components/charts/chart";
import { LineChart } from "@/components/charts/line-chart";
import { RadarComponent } from "@/components/charts/radar-chart";

export default function OverviewPage() {
  return (
    <div className="w-full h-screen flex flex-col gap-4 p-4">
      <div className="grid grid-cols-3 gap-4 w-full">
        <Assistant />
        <Chart />
        <RadarComponent />
      </div>
      <div className="w-full h-full">
        <LineChart />
      </div>
    </div>
  )
}
