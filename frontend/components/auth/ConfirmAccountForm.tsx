'use client'
import { confirmAccount } from '@/actions/confirm-account-action'
import { PinInput, PinInputField } from '@chakra-ui/pin-input'
import { useEffect, useState } from 'react'
import { useFormState } from 'react-dom'

const ConfirmAccountForm = () => {
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

  const handleChange = (token: string) => {
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
          className="border border-gray-300 rounded-lg h-10 shadow-lg w-10 text-center  placeholder-white placeholder-white"
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
