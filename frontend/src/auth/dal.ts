import 'server-only'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { UserSchema } from '../schemas'
import { cache } from 'react'

export const verifySession = cache(async () => {
  const token = cookies().get('CASHTRACKR_TOKEN')?.value

  if (!token) {
    redirect('/auth/login')
  }

  const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/user`

  const req = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const session = await req.json()

  const result = UserSchema.safeParse(session)

  if (!result.success) {
    redirect('/auth/login')
  }

  return {
    user: result.data,
    isAuth: true,
  }
})
