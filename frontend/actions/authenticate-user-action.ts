'use server'

import { ErrorResponseSchema, LoginSchema } from '@/src/schemas'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

type ActionStateType = {
  errors: string[]
}

export async function authenticate(
  prevState: ActionStateType,
  formData: FormData
) {
  const loginCredentials = {
    email: formData.get('email'),
    password: formData.get('password'),
  }
  const auth = LoginSchema.safeParse(loginCredentials)

  if (!auth.success) {
    return {
      errors: auth.error.issues.map((issue) => issue.message),
    }
  }

  const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/login`

  const req = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      password: auth.data.password,
      email: auth.data.email,
    }),
  })
  const json = await req.json()
  if (!req.ok) {
    const { error } = ErrorResponseSchema.parse(json)
    return {
      errors: [error],
    }
  }

  //Setear cookies

  cookies().set({
    name: 'CASHTRACKR_TOKEN',
    value: json,
    httpOnly: true,
    path: '/',
  })

  redirect('/admin')
}
