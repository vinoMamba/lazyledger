import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileCard } from "@/components/profile/profile-card";
import { CategoryPanel } from "@/components/category/category-panel";

export default function ProfilePage() {
  return (
    <Tabs defaultValue="category" className="m-14">
      <TabsList>
        <TabsTrigger value="profile" className="px-8">个人设置</TabsTrigger>
        <TabsTrigger value="category" className="px-8">分类设置</TabsTrigger>
        <TabsTrigger value="tag" className="px-8">标签设置</TabsTrigger>
        <TabsTrigger value="model" className="px-8">大模型设置</TabsTrigger>
      </TabsList>
      <TabsContent value="profile" className="space-y-4">
        <ProfileCard />
      </TabsContent>
      <TabsContent value="category">
        <CategoryPanel />
      </TabsContent>
      <TabsContent value="tag">
        <div>标签设置</div>
      </TabsContent>
      <TabsContent value="model">
        <div>大模型设置</div>
      </TabsContent>
    </Tabs>
  )
}
