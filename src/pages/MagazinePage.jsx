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
      <div className="mag-grid reveal" style={{ marginTop: '2rem' }}>
        <div className="mag-feature">
          <div className="mag-feature-tag">Cover Story</div>
          <div className="mag-feature-title">Women Who Refused Permission</div>
          <div className="mag-feature-body">
            <em>Heroines: Powerful Indian Women of Myth & History</em> by Ira Mukhoty is built around a line that refuses to leave the reader alone: every woman described in this book refuses to borrow a man's prerogative. It is a book about women who authored their own authority.
          </div>
          <div className="mag-img-placeholder" style={{ marginTop: '1.2rem' }}>
            <span>add cover image here ↑</span>
          </div>
          <a className="smv-btn" href="https://pinkoctopus36.wixsite.com/shymilkshakevoid/post/women-who-refused-permission" target="_blank" rel="noreferrer" style={{ marginTop: '1.2rem', display: 'inline-block' }}>
            Read Full Review →
          </a>
        </div>
        <div className="mag-sidebar">
          {MAG_SIDEBAR.map((item) => (
            <a key={item.n} className="mag-sidebar-item" href={item.url} target="_blank" rel="noreferrer">
              <div className="s-num">{item.n}</div>
              <div className="s-title">{item.title}</div>
              <div className="s-cat">{item.cat}</div>
            </a>
          ))}
        </div>
      </div>
      <div style={{ textAlign: 'center', marginTop: '2.5rem', padding: '2rem 0' }}>
        <Typewriter />
      </div>
    </div>
  )
}
