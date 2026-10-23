
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const nav = [
     {label: "home",
     href: "/"
    },
    {label: "library",
     href: "/library"
    },
     {label: "community",
     href: "/community"
    }
  ]

  const closeMenu = () => setIsOpen(false)

  return (
    <header className="sticky top-0 z-50 mb-15 border-b border-gray-300 bg-white/80 shadow-gray-300 backdrop-blur-sm">
      <div className="flex h-25 items-center justify-between p-5">
        <h1 className="w-1/2 text-4xl font-medium text-blue-600">
          <Link to="/" onClick={closeMenu}>Quorum</Link>
        </h1>

        {/* Desktop navigation */}
        <nav className="hidden md:block">
          <ul className="flex flex-row gap-6">
            {
            nav.map((l)=>(
            <NavLink key={l.href} text={l.label} urlLink={l.href} />))
            }
          </ul>
        </nav>

        {/* Mobile menu button */}
        <button
          type="button"
          className="text-gray-800 hover:text-blue-600 md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile navigation */}
      {isOpen && (
        <nav
          id="mobile-menu"
          className="border-t border-gray-200 bg-white p-5 md:hidden"
        >
          <ul className="flex flex-col gap-2">
           {
            nav.map((l)=>(
            <NavLink  key={l.href} text={l.label} urlLink={l.href} />))
            }</ul>
        </nav>
      )}
    </header>
  )
}

interface NavLinkProps {
  text: string
  urlLink: string
  onNavigate?: () => void
}

const NavLink = ({ text, urlLink, onNavigate }: NavLinkProps) => {
  return (
    <li className="capitalize list-none p-2 text-gray-800 hover:text-blue-600">
      <Link to={urlLink} onClick={onNavigate}>
        {text}
      </Link>
    </li>
  )
}

export default Header
