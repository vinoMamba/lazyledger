"use server"

import { CategoryListSchema } from "@/schemas/category"
import { cookies } from "next/headers"

export type SearchParams = {
  name?: string
}


export const getCategoryListAction = async ({ name = '' }: SearchParams) => {
  try {
    const token = (await cookies()).get('token')?.value
    const result = await fetch(`${process.env.NEXT_API_URL}/category/list?name=${name}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      },
      next: {
        tags: ['getCategoryList']
      }
    })
    const json = await result.json();
    const categoryList = CategoryListSchema.safeParse(json)
    if (categoryList.success) {
      return categoryList.data
    } else {
      return []
    }

  } catch (error) {
    console.error(error)
    return []
  }
}
