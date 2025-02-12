import ForgotPasswordForm from '@/components/ForgotPasswordForm'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Cashtrackr-Recuperar Contraseña',
  description: 'Página de recuperación de contraseña',
  keywords: ['Cashtrackr', 'Password', 'Cuenta'],
}

const ForgotPage = () => {
  return (
    <>
      <h1 className="text-6xl font-bold text-purple-950">
        Olvidaste tu contraseña?
      </h1>
      <p className="text-3xl font-bold">
        aquí puedes <span className="text-amber-500">reestablecerla</span>
      </p>
      <ForgotPasswordForm />
      <nav className="mt-10 flex flex-col space-y-4">
        <Link className="text-lg text-center" href="/auth/login">
          Ya tienes cuenta? Inicia sesión
        </Link>

        <Link className="text-lg text-center" href="/auth/register">
          No tienes cuenta? Registrate
        </Link>
      </nav>
    </>
  )
}
export default ForgotPage
