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
