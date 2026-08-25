import { useState } from "react"

interface Props{
    type:string,
    heading:string,
    message:string,
    closable:boolean
}
const Alert = ({type,heading,message,closable}:Props) => {
  const [visible,setVisible] = useState<boolean>(true);
  if(!visible){
    return null
  }
  else{
  return (
    <>
     <h4 className="text-red-600">Alert {type==="warning"? "⚠️":"ℹ️"}</h4>
     <h3>{heading}</h3>
     <p>{message}</p>
     {closable && (<button onClick={()=>{setVisible(false)}}>close</button>)}
     </>
   
  )
}}

export default Alert