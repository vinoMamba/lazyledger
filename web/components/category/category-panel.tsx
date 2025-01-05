import { CategoryTable } from "./category-table"
import { getCategoryListAction } from "@/actions/get-category-list"

export const CategoryPanel = async () => {
  const categories = await getCategoryListAction()
  return (
    <div className="max-w-screen-sm">
      <CategoryTable data={categories} />
    </div>
  )
}
