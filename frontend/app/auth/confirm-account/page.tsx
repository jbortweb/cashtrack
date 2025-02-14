import ConfirmAccountForm from '@/components/auth/ConfirmAccountForm'

const ConfirmAccountPage = () => {
  return (
    <>
      <h1 className="text-6xl font-bold text-purple-950">Confirma tu cuenta</h1>
      <p className="text-3xl font-bold">
        Ingresa el código que recibiste{' '}
        <span className="text-amber-500">por Email</span>
      </p>
      <ConfirmAccountForm />
    </>
  )
}
export default ConfirmAccountPage
