import { z } from "zod"

export const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export const LoginWithPasswordSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})


export const GetUserInfoSchema = z.object({
  userId: z.string(),
  username: z.string(),
  email: z.string().email(),
  createdAt: z.string(),
  avatar: z.string().optional(),
})

export const UpdateUserEmailSchema = z.object({
  email: z.string().email(),
})

export const UpdateUserPasswordSchema = z.object({
  password: z.string().min(6),
  newPassword: z.string().min(6),
})
