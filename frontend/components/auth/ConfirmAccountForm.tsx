'use client'
import { PinInput, PinInputField } from '@chakra-ui/pin-input'

const ConfirmAccountForm = () => {
  return (
    <div className="flex gap-5 my-10 justify-center items-center">
      <PinInput>
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
