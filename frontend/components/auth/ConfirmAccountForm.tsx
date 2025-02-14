'use client'
import { PinInput, PinInputField } from '@chakra-ui/pin-input'
import { useState } from 'react'

const ConfirmAccountForm = () => {
  const [token, setToken] = useState('')

  const handleChange = (token: string) => {
    setToken(token)
  }

  const handleComplete = (token: string) => {
    console.log('Token:', token)
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
