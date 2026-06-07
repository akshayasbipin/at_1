import { useState } from 'react'

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'sketchbook', label: 'SketchBook' },
  { id: 'blog', label: 'Blog' },
  { id: 'guestbook', label: 'Guestbook' },
  { id: 'radio', label: 'Radio' },
  { id: 'polaroids', label: 'Polaroids' },
  { id: 'magazine', label: 'Magazine' },
  { id: 'thoughtbook', label: 'Thought Book' },
  { id: 'connect', label: 'Connect' },
]

export function Nav({ active, setActive }) {
  const [open, setOpen] = useState(false)

  return (
    <nav className="smv-nav">
      <a
        className="smv-nav-logo"
        href="#"
        onClick={(event) => {
          event.preventDefault()
          setActive('home')
          setOpen(false)
          window.scrollTo(0, 0)
        }}
      >
        shy<span>Milkshake</span>Void
      </a>
      <ul className={`smv-nav-links${open ? ' open' : ''}`}>
        {NAV_ITEMS.map((item) => (
          <li key={item.id}>
            <button
              className={active === item.id ? 'active' : ''}
              onClick={() => {
                setActive(item.id)
                setOpen(false)
                window.scrollTo(0, 0)
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
