
interface Props{
  message?:string
}
const NotAvailableCard = ({message="Not Available"}:Props) => {
  return (
    <div className="flex flex-row m-auto justify-center items-center rounded-2xl border border-dashed border-amber-500 bg-amber-50 w-full h-30 max-w-4/5 max-h-3/5 p-2">
      {message}
    </div>
  )
}

export default NotAvailableCard