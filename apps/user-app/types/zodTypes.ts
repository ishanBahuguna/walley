import z from "zod"

export const SigninValidation = z.object({
    phone : z.string().regex(/^\d{10}$/),
    password : z.string()
})