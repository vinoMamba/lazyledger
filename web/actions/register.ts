"use server"

import { resErr, resOk } from "@/lib/response"
import { RegisterSchema } from "@/schemas/user"
import { z } from "zod"


export const registerAction = async (value: z.infer<typeof RegisterSchema>) => {
  const validateValue = RegisterSchema.safeParse(value)
  if (!validateValue.success) {
    return resErr("注册参数验证失败")
  }
  console.log(validateValue.data)
  try {
    const result = await fetch(process.env.NEXT_API_URL + "/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validateValue.data),
    })
    const json = await result.json();
    if (result.status === 200) {
      return resOk("注册成功")
    } else {
      return resErr(json.message)
    }
  } catch (error) {
    console.error(error)
    return resErr("注册失败，请稍后再试")
  }
}
