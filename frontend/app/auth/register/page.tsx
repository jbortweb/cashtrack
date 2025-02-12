import RegisterForm from '@/components/auth/RegisterForm'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Cashtrackr-Crear Cuenta',
  description: 'Página de registro de Cashtrackr',
  keywords: ['Cashtrackr', 'Registro', 'Cuenta'],
}

const RegisterPage = () => {
  return (
    <>
      <h1 className="text-6xl font-bold text-purple-950">Crea una cuenta</h1>
      <p className="text-3xl font-bold">
        aquí puedes <span className="text-amber-500">Registrarte</span>
      </p>
      <RegisterForm />

      <nav className="mt-10 flex flex-col space-y-4">
        <Link className="text-lg text-center" href="/auth/login">
          Ya tienes cuenta? Inicia sesión
        </Link>

        <Link className="text-lg text-center" href="/auth/forgot-password">
          Olvidaste tu contraseña? Reestablecer
        </Link>
      </nav>
    </>
  )
}
export default RegisterPage
