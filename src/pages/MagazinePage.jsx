import { Typewriter } from '../components/Typewriter.jsx'
import { useReveal } from '../hooks/useReveal.js'

const MAG_SIDEBAR = [
  { n: '01', title: "A Beginner's Guide to Agent Architectures", cat: 'Tech · AI', url: 'https://pinkoctopus36.wixsite.com/shymilkshakevoid/post/a-beginner-s-guide-tosimple-agent-architectures' },
  { n: '02', title: 'Digital Doodler: The Art Corner', cat: 'Art · Process', url: 'https://shymilkshakevoid.my.canva.site' },
  { n: '03', title: 'Hyperfixation of the Week', cat: 'Lifestyle', url: '#' },
  { n: '04', title: 'Add your next article here', cat: 'your category', url: '#' },
]

export default function MagazinePage() {
  useReveal()

  return (
    <div className="smv-section">
      <div className="section-tag">the zine</div>
      <h2 className="section-title reveal">Maga<span>zine</span></h2>
      <p className="reveal" style={{ fontSize: '1rem', color: 'var(--brown-mid)', maxWidth: '55ch', marginBottom: '0.5rem' }}>
        a messy, beautiful editorial — like a magazine that got out of hand ✦
      </p>
      <a className="smv-btn reveal" href="https://shymilkshakevoid.my.canva.site" target="_blank" rel="noreferrer" style={{ marginBottom: '2rem', display: 'inline-block' }}>
        Open Zine on Canva ↗
      </a>
      <div className="mag-hero reveal">
        <div className="mag-masthead">shyMilkshakeVoid</div>
        <div className="mag-issue">Issue No. 01 · June 2026 · Hyderabad</div>
        <p style={{ fontFamily: 'var(--font-body)', fontStyle: 'italic', fontSize: '1.05rem', color: 'var(--cream-warm)', maxWidth: '50ch', opacity: 0.8 }}>
          "a cozy corner dedicated to collect hobbies, blogs, ideas and whatever hyperfixation wins this week"
        </p>
        
      </div>
      
      <div className="mag-grid reveal" style={{ marginTop: '2rem', justifyContent: 'center' }}>
        <div style={{
          position: 'relative',
          width: '100%',
          maxWidth: '900px',
          height: 0,
          paddingTop: '281.1127%',
          boxShadow: '0 2px 8px 0 rgba(63,69,81,0.16)',
          marginTop: '1.6rem',
          marginBottom: '0.9rem',
          overflow: 'hidden',
          borderRadius: '8px',
          willChange: 'transform',
        }}>
          <iframe
            loading="lazy"
            style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, border: 'none', padding: 0, margin: 0 }}
            src="https://www.canva.com/design/DAHL4Kz4vsU/8O-Wc08fPDfxxK0ljVo9EQ/view?embed"
            allowFullScreen
            title="Magazine Embed"
          />
        </div>
      </div>
      <div style={{ textAlign: 'center', marginTop: '2.5rem', padding: '2rem 0' }}>
        <Typewriter />
      </div>
    </div>
  )
}
