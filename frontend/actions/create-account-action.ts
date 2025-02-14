'use server'

import {
  ErrorResponseSchema,
  RegisterSchema,
  successSchema,
} from '@/src/schemas'

type ActionStateType = {
  errors: string[]
  success: string
}

export async function register(prevState: ActionStateType, formData: FormData) {
  const RegisterData = {
    email: formData.get('email'),
    name: formData.get('name'),
    password: formData.get('password'),
    password_confirmation: formData.get('password_confirmation'),
  }

  //Validar

  const register = RegisterSchema.safeParse(RegisterData)

  if (!register.success) {
    const errors = register.error.errors.map((error) => error.message)
    return {
      errors,
      success: prevState.success,
    }
  }

  //registrar usuario

  const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/create-account`
  const req = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: register.data?.email,
      name: register.data?.name,
      password: register.data?.password,
    }),
  })

  const json = await req.json()

  if (req.status === 409) {
    const { error } = ErrorResponseSchema.parse(json)

    return {
      errors: [error],
      success: '',
    }
  }
  const success = successSchema.parse(json)
  return {
    errors: [],
    success,
  }
}
