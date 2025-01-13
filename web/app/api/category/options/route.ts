"use server"

import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET() {
  const cookie = await cookies()
  const token = cookie.get("token")?.value
  const res = await fetch(`${process.env.NEXT_API_URL}/category/list`, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
  const json = await res.json()
  return NextResponse.json(json || [])
}
