"use server"

import { TagListSchema } from "@/schemas/tag"
import { cookies } from "next/headers"

export type SearchParams = {
  name?: string
}


export const getTagListAction = async ({ name = '' }: SearchParams) => {
  try {
    const token = (await cookies()).get('token')?.value
    const result = await fetch(`${process.env.NEXT_API_URL}/tag/list?name=${name}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      },
      next: {
        tags: ['getTagList']
      }
    })
    const json = await result.json();
    const tagList = TagListSchema.safeParse(json)
    if (tagList.success) {
      return tagList.data
    } else {
      return []
    }

  } catch (error) {
    console.error(error)
    return []
  }
}
