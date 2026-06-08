import { useState } from 'react'
import { useLocation } from 'react-router-dom'

const NAV_ITEMS = [
  { id: 'home', label: 'Home', path: '/' },
  { id: 'gallery', label: 'Gallery', path: '/gallery' },
  // { id: 'sketchbook', label: 'SketchBook', path: '/sketchbook' },
  { id: 'blog', label: 'Blog', path: '/blog' },
  { id: 'guestbook', label: 'Guestbook', path: '/guestbook' },
  { id: 'radio', label: 'Radio', path: '/radio' },
  { id: 'polaroids', label: 'Polaroids', path: '/polaroids' },
  { id: 'magazine', label: 'Magazine', path: '/magazine' },
  { id: 'thoughtbook', label: 'Thought Book', path: '/thoughtbook' },
  { id: 'connect', label: 'Connect', path: '/connect' },
]

export function Nav({ handleNavigate }) {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true
    if (path !== '/' && location.pathname.startsWith(path)) return true
    return false
  }

  return (
    <nav className="smv-nav">
      <a
        className="smv-nav-logo"
        href="#"
        onClick={(event) => {
          event.preventDefault()
          handleNavigate('/')
          setOpen(false)
        }}
      >
        shy<span>Milkshake</span>Void
      </a>
      <ul className={`smv-nav-links${open ? ' open' : ''}`}>
        {NAV_ITEMS.map((item) => (
          <li key={item.id}>
            <button
              className={isActive(item.path) ? 'active' : ''}
              onClick={() => {
                handleNavigate(item.path)
                setOpen(false)
              }}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
      <button className="smv-hamburger" aria-label="menu" onClick={() => setOpen((prev) => !prev)}>
        <span />
        <span />
        <span />
      </button>
    </nav>
  )
}
