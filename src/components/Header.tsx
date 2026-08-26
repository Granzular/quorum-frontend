import React from 'react'
import {Link} from 'react-router-dom'

const Header:React.FC = () => {
  return (
    <header className='flex sticky top-0 backdrop-blur-sm border-b border-gray-300 mb-15 p-5 h-25 shadow-gray-300 z-50'>
        <h1 className='text-blue-600 w-1/2 text-4xl font-medium'><Link to={"/"}>Quorum</Link></h1>
        <nav className='flex flex-row ml-10'>
            <NavLink text={'Home'} urlLink={'/'} />
            <NavLink text={'Library'} urlLink={'/library'} />
        </nav>
    </header>
  )
}

interface NavLinkProps{
    text:string,
    urlLink:string
}

const NavLink = ({text,urlLink}:NavLinkProps) => {
  return (
    <li className='text-gray-800 p-2 hover:text-blue-600'>
        <Link to={urlLink}>{text}</Link>
    </li>
  )
}


export default Header