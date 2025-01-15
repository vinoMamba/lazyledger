import { getCategoryListAction, SearchParams } from "@/actions/get-category-list";
import { CategoryDialog } from "@/components/category/category-dialog";
import { CategorySearchInput } from "@/components/category/category-search-input";
import { CategoryTable } from "@/components/category/category-table";
import { Button } from "@/components/ui/button";


export const dynamic = 'force-dynamic';

export default async function CategoryPage(props: { searchParams: Promise<SearchParams> }) {
  const searchParams = await props.searchParams;
  const categories = await getCategoryListAction(searchParams)

  return (
    <div className="max-w-screen-sm flex flex-col gap-4">
      <div className="flex items-center gap-2 max-w-screen-sm">
        <CategorySearchInput />
        <CategoryDialog>
          <Button>新增分类</Button>
        </CategoryDialog>
      </div>
      <CategoryTable data={categories} />
    </div>
  )
}
