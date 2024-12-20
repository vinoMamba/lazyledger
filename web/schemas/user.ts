import { z } from "zod"

export const LoginWithPasswordSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})
