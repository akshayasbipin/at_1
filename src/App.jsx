import { useCallback, useState } from 'react'
import { Cursor, Nav, StickyNote } from './components'
import HomePage from './pages/HomePage.jsx'
import GalleryPage from './pages/GalleryPage.jsx'
import SketchbookPage from './pages/SketchbookPage.jsx'
import BlogPage from './pages/BlogPage.jsx'
import GuestbookPage from './pages/GuestbookPage.jsx'
import RadioPage from './pages/RadioPage.jsx'
import PolaroidsPage from './pages/PolaroidsPage.jsx'
import MagazinePage from './pages/MagazinePage.jsx'
import ThoughtBookPage from './pages/ThoughtBookPage.jsx'
import ConnectPage from './pages/ConnectPage.jsx'

export default function App() {
  const [active, setActive] = useState('home')
  const [selectedBlogId, setSelectedBlogId] = useState(null)

  const setActivePage = useCallback((id) => {
    setActive(id)
    if (id !== 'blog') {
      setSelectedBlogId(null)
    }
    window.scrollTo(0, 0)
  }, [])

  const renderPage = () => {
    switch (active) {
      case 'home':
        return <HomePage setActive={setActivePage} setSelectedBlogId={setSelectedBlogId} />
      case 'gallery':
        return <GalleryPage />
      case 'sketchbook':
        return <SketchbookPage />
      case 'blog':
        return <BlogPage selectedBlogId={selectedBlogId} setSelectedBlogId={setSelectedBlogId} />
      case 'guestbook':
        return <GuestbookPage />
      case 'radio':
        return <RadioPage />
      case 'polaroids':
        return <PolaroidsPage />
      case 'magazine':
        return <MagazinePage />
      case 'thoughtbook':
        return <ThoughtBookPage />
      case 'connect':
        return <ConnectPage />
      default:
        return <HomePage setActive={setActivePage} setSelectedBlogId={setSelectedBlogId} />
    }
  }

  return (
    <>
      <Cursor />
      <StickyNote />
      <Nav active={active} setActive={setActivePage} />
      <main style={{ paddingTop: '60px', minHeight: '100vh' }}>
        {renderPage()}
      </main>
      <footer className="smv-footer">
        <p>shyMilkshakeVoid ♡ made with <span className="footer-heart">♥</span> and too much overthinking</p>
        <p style={{ marginTop: '0.5rem', opacity: 0.65 }}>
          <a href="https://www.instagram.com/shy_milkshake_void/" target="_blank" rel="noreferrer">instagram</a>
          {' · '}
          <a href="https://shymilkshakevoid.my.canva.site" target="_blank" rel="noreferrer">canva</a>
          {' · '}
          <a href="#blog" onClick={() => setActivePage('blog')}>blog</a>
          {' · '}
        </p>
      </footer>
    </>
  )
}
