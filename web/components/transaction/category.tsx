export type Category = {
  id: string
  name: string
  icon: string
  color: string
}

type CategoryProps = {
  category: Category
}

export const Category = ({ category }: CategoryProps) => {

  const bgColor = `${category.color}1A`

  return (
    <div className="inline-flex items-center gap-2 rounded-full px-4 py-1" style={{ backgroundColor: bgColor }}>
      <div>{category.icon}</div>
      <div className="text-xs" style={{ color: category.color }}>{category.name}</div>
    </div>
  )
}
