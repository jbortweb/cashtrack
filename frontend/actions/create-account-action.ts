'use server'

import { RegisterSchema } from '@/src/schemas'

export async function register(formData: FormData) {
  const RegisterData = {
    email: formData.get('email'),
    name: formData.get('name'),
    password: formData.get('password'),
    password_confirmation: formData.get('password_confirmation'),
  }

  //Validar

  const register = RegisterSchema.safeParse(RegisterData)

  const errors = register.error?.errors.map((error) => error.message)

  console.log(register.data)
}
