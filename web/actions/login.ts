"use server"

import { resErr, resOk } from "@/lib/response"
import { LoginWithPasswordSchema  } from "@/schemas/user"
import { cookies } from "next/headers"
import { z } from "zod"


export const loginAction = async (value: z.infer<typeof LoginWithPasswordSchema>) => {
  const validateValue = LoginWithPasswordSchema.safeParse(value)
  if (!validateValue.success) {
    return resErr("登录参数验证失败")
  }
  console.log(validateValue.data)
  try {
    const result = await fetch(process.env.NEXT_API_URL + "/login/password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validateValue.data),
    })
    const json = await result.json();
    if (result.status === 200) {
      (await cookies()).set("token", json.token, { maxAge: 60 * 60 * 24 * 3 })
      return resOk("登录成功")
    } else {
      return resErr(json.message)
    }
  } catch (error) {
    console.error(error)
    return resErr("登录失败，请稍后再试")
  }
}
