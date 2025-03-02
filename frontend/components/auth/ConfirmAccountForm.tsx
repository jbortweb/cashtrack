'use client'
import { confirmAccount } from '@/actions/confirm-account-action'
import { PinInput, PinInputField } from '@chakra-ui/pin-input'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useFormState } from 'react-dom'
import { toast } from 'react-toastify'

const ConfirmAccountForm = () => {
  const router = useRouter()
  const [isComplete, setIsComplete] = useState(false)
  const [token, setToken] = useState('')

  const confirmAccountWithToken = confirmAccount.bind(null, token)
  const [state, dispatch] = useFormState(confirmAccountWithToken, {
    errors: [],
    success: '',
  })

  useEffect(() => {
    if (isComplete) {
      dispatch()
    }
  }, [isComplete])

  useEffect(() => {
    if (state.errors) {
      state.errors.forEach((error) => {
        toast.error(error)
      })
      if (state.success) {
        toast.success(state.success, {
          onClose: () => {
            router.push('/auth/login')
          },
        })
      }
    }
  }, [state])

  const handleChange = (token: string) => {
    setIsComplete(false)
    setToken(token)
  }

  const handleComplete = () => {
    setIsComplete(true)
  }

  return (
    <div className="flex gap-5 my-10 justify-center items-center">
      <PinInput
        value={token}
        onChange={handleChange}
        onComplete={handleComplete}
      >
        <PinInputField
          className="border border-gray-300 rounded-lg h-10 shadow-lg w-10 text-center  placeholder-white"
          type="text"
        />
        <PinInputField
          className="border border-gray-300 rounded-lg h-10 shadow-lg w-10 text-center  placeholder-white"
          type="text"
        />
        <PinInputField
          className="border border-gray-300 rounded-lg h-10 shadow-lg w-10 text-center  placeholder-white"
          type="text"
        />
        <PinInputField
          className="border border-gray-300 rounded-lg h-10 shadow-lg w-10 text-center  placeholder-white"
          type="text"
        />
        <PinInputField
          className="border border-gray-300 rounded-lg h-10 shadow-lg w-10 text-center  placeholder-white"
          type="text"
        />
        <PinInputField
          className="border border-gray-300 rounded-lg h-10 shadow-lg w-10 text-center  placeholder-white"
          type="text"
        />
      </PinInput>
    </div>
  )
}
export default ConfirmAccountForm
