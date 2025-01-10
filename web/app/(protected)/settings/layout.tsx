import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

const tabOptions = [
  {
    label: "个人设置",
    value: "profile"
  },
  {
    label: "分类设置",
    value: "category"
  },
  {
    label: "大模型设置",
    value: "model"
  }
]
const defaultTab = "category"

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <Tabs defaultValue={defaultTab} className="m-14">
      <TabsList>
        {tabOptions.map(tab => (
          <Link href={`/settings/${tab.value}`} key={tab.value}>
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="px-8"
            >{tab.label}</TabsTrigger>
          </Link>
        ))}
      </TabsList>
      <div className="mt-4">
        {children}
      </div>
    </Tabs>
  )
}
