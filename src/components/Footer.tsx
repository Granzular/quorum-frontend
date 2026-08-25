import React from 'react'

const Footer:React.FC = () => {
    const year = new Date().getFullYear();
  return (
   <footer className='mt-20 text-center'>
    <span>&copy;2025-{year} Quorum</span>
    <br/>
    <span>designed by <b>granzular</b></span>
   </footer>
  )
}

export default Footer