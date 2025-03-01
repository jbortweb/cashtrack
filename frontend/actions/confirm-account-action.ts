'use server'

import { ErrorResponseSchema, successSchema, TokenSchema } from '../src/schemas'
import { log } from 'console'

type ActionStateType = {
  errors: string[]
  success: string
}

export async function confirmAccount(
  token: string,
  prevState: ActionStateType
) {
  const confirmToken = TokenSchema.safeParse(token)

  if (!confirmToken.success) {
    return {
      errors: confirmToken.error.issues.map((issue) => issue.message),
      success: '',
    }
  }

  //Confirmar usuario
  const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/confirm-account`
  const req = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: confirmToken.data,
    }),
  })

  const json = await req.json()

  if (!req.ok) {
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
