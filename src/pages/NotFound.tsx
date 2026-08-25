
const NotFound = () => {
  return (
     <div className="flex w-dvw h-dvh justify-center">
        <div className='flex flex-col justify-center border-dashed rounded-xl border-amber-400 bg-amber-100 border text-center h-50  lg:w-1/2 sm:w-4/5'>
        <h2 className="text-4xl font-bold text-gray-700">Not Found</h2>
        <span className="">The requested resource was not found on the server</span>
     </div>
     </div>
  )
}

export default NotFound