import { z } from 'zod'

export const RegisterSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: 'El email es obligatorio' })
      .email({ message: 'El email no es válido' }),
    name: z.string().min(1, { message: 'El nombre es obligatorio' }),
    password: z
      .string()
      .min(8, { message: 'La contraseña debe tener al menos 8 caracteres' }),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'Las contraseñas no coinciden',
    path: ['password_confirmation'],
  })

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'El Email es Obligatorio' })
    .email({ message: 'Email no válido' }),
  password: z.string().min(1, { message: 'El Password no puede ir vacio' }),
})

export const TokenSchema = z
  .string({ message: ' Token no válido' })
  .length(6, { message: 'Token no válido' })

export const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
})

export type User = z.infer<typeof UserSchema>

export const successSchema = z.string()
export const ErrorResponseSchema = z.object({
  error: z.string(),
})
