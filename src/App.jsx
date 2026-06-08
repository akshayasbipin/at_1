import { Routes, Route, useNavigate } from 'react-router-dom'
import { Cursor, Nav, StickyNote } from './components'
import HomePage from './pages/HomePage.jsx'
import GalleryPage from './pages/GalleryPage.jsx'
// import SketchbookPage from './pages/SketchbookPage.jsx'
import BlogPage from './pages/BlogPage.jsx'
import GuestbookPage from './pages/GuestbookPage.jsx'
import RadioPage from './pages/RadioPage.jsx'
import PolaroidsPage from './pages/PolaroidsPage.jsx'
import MagazinePage from './pages/MagazinePage.jsx'
import ThoughtBookPage from './pages/ThoughtBookPage.jsx'
import ConnectPage from './pages/ConnectPage.jsx'

export default function App() {
  const navigate = useNavigate()

  const handleNavigate = (path) => {
    navigate(path)
    window.scrollTo(0, 0)
  }

  return (
    <>
      <Cursor />
      <StickyNote />
      <Nav handleNavigate={handleNavigate} />
      <main style={{ minHeight: '100vh' }}>
        <Routes>
          <Route path="/" element={<HomePage handleNavigate={handleNavigate} />} />
          <Route path="/gallery" element={<GalleryPage />} />
          {/* <Route path="/sketchbook" element={<SketchbookPage />} /> */}
          <Route path="/blog" element={<BlogPage handleNavigate={handleNavigate} />} />
          <Route path="/blog/:id" element={<BlogPage handleNavigate={handleNavigate} />} />
          <Route path="/guestbook" element={<GuestbookPage />} />
          <Route path="/radio" element={<RadioPage />} />
          <Route path="/polaroids" element={<PolaroidsPage />} />
          <Route path="/magazine" element={<MagazinePage />} />
          <Route path="/thoughtbook" element={<ThoughtBookPage />} />
          <Route path="/connect" element={<ConnectPage />} />
        </Routes>
      </main>
      <footer className="smv-footer">
        <p>shyMilkshakeVoid ♡ made with <span className="footer-heart">♥</span> and too much overthinking</p>
        <p style={{ marginTop: '0.5rem', opacity: 0.65 }}>
          <a href="https://www.instagram.com/shy_milkshake_void/" target="_blank" rel="noreferrer">instagram</a>
          {' · '}
          <a href="https://shymilkshakevoid.my.canva.site" target="_blank" rel="noreferrer">canva</a>
          {' · '}
          <a href="#" onClick={() => handleNavigate('/blog')}>blog</a>
          {' · '}
        </p>
      </footer>
    </>
  )
}
