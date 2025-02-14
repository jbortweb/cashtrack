const SuccessMessage = ({ children }: { children: React.ReactNode }) => {
  return (
    <p className=" bg-amber-500 text-white font-bold text-sm p-3 text-center my-4 uppercase rounded-md">
      {children}
    </p>
  )
}

export default SuccessMessage
