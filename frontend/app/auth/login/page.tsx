import LoginForm from '@/components/auth/LoginForm'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Cashtrackr-Iniciar Sesión',
  description: 'Página de inicio de sesión',
  keywords: ['Cashtrackr', 'Inicio', 'Cuenta'],
}

const LoginPage = () => {
  return (
    <>
      <h1 className="text-6xl font-bold text-purple-950">Inicia sesión</h1>
      <p className="text-3xl font-bold">
        aquí puedes <span className="text-amber-500">Iniciar Sesión</span>
      </p>
      <LoginForm />

      <nav className="mt-10 flex flex-col space-y-4">
        <Link className="text-lg text-center" href="/auth/register">
          No tienes cuenta? Registrate
        </Link>
        <Link className="text-lg text-center" href="/auth/forgot-password">
          Olvidaste tu contraseña? Reestablecer
        </Link>
      </nav>
    </>
  )
}
export default LoginPage
