import React from 'react'

interface Props{
    todo:string,
    setTodo:React.Dispatch<React.SetStateAction<string>>,
    handleAdd: (e:React.SubmitEvent) => void
}

const InputField = ({todo,setTodo,handleAdd}:Props) => {
  return (
    <form className='input' onSubmit={handleAdd}>
        <input type='input' placeholder='enter a task' className='input__box'
        value={todo}
        onChange={(e)=>{setTodo(e.target.value)}}
        />
        <button type='submit' className='input__btn'>GO</button>
    </form>
  )
}

export default InputField