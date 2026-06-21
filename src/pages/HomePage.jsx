import { Marquee } from '../components/Marquee.jsx'
import { Typewriter } from '../components/Typewriter.jsx'
import { useReveal } from '../hooks/useReveal.js'
import { useNavigate } from 'react-router-dom'
import { BLOG_POSTS } from '../blog/posts'
import photoUrl from '../assets/photo.jpg'
import photoUrl2 from '../assets/photo2.jpeg'
import photoUrl3 from '../assets/photo3.jpeg'
import photoUrl4 from '../assets/photo4.jpeg'

const BELIEFS = [
  { n: '01.', t: '"Someone will always be prettier. Someone will always be smarter. Someone will always be younger. But they will never be you." - Freddie Mercury' },
  { n: '02.', t: 'AI isn\'t bad, it\'s the lack of ethics — same as the internet.' },
  { n: '03.', t: 'Hate is taught.' },
  { n: '04.', t: '"When we hear enough lies we no longer recognize the truth at all." — Chernobyl (HBO)' },
]

export default function HomePage({ handleNavigate }) {
  useReveal()
  const navigate = useNavigate()

  return (
    <>
      <section className="hero-section">
        <div className="hero-left">
          <div className="hero-eyebrow">Digital doodler · Visual storytelling · Just for fun</div>
          <h1 className="hero-h1">
            shy
            <br />
            <span className="accent">Milkshake</span>
            <br />
            Void
          </h1>
          <p className="hero-sub">
            a cozy corner for hobbies, blogs,
            <br />
            hyperfixations & everything in between
          </p>
          <p className="hero-desc">
            Hiiii.... Welcome to shyMilkshakeVoid ♡ — collecting my art, code, ideas, interests
            and whatever hyperfixation wins this week.
          </p>
          <p className="hero-quote">"Growth is growth, no matter how small"</p>
          <div className="hero-btns">
            <button className="smv-btn filled" onClick={() => navigate('/gallery')}>
              See My Art
            </button>
            <button className="smv-btn" onClick={() => navigate('/blog')}>
              Read Blogs 
            </button>
            <button className="smv-btn" onClick={() => navigate('/magazine')}>
              Open Zine ↗
            </button>
            <a
              className="smv-btn"
              href="https://www.instagram.com/shy_milkshake_void/"
              target="_blank"
              rel="noreferrer"
            >
              Instagram
            </a>
            <a
              className="smv-btn"
              href="https://shymilkshakevoid.my.canva.site" 
              target="_blank" 
              rel="noreferrer" 
              style={{ marginBottom: '2rem', display: 'inline-block' }}
            >
              Portfolio on Canva ↗
            </a>
          </div>
          <div className="social-row">
            <p>find me at:</p>
            <a
              className="social-icon-link"
              href="https://www.instagram.com/shy_milkshake_void/"
              target="_blank"
              rel="noreferrer"
            >
              <i className="ti ti-brand-instagram" /> @shy_milkshake_void
            </a>
          </div>
        </div>

        <div className="hero-right">
          <span className="hero-doodle" style={{ top: '14%', left: '10%', animationDelay: '-1s' }}>
            ✿
          </span>
          <span
            className="hero-doodle"
            style={{ top: '68%', left: '78%', animationDelay: '-2.5s', fontSize: '1.9rem' }}
          >
            ♡
          </span>
          <span
            className="hero-doodle"
            style={{ top: '45%', left: '5%', animationDelay: '-.8s', fontSize: '1.6rem' }}
          >
            ✦
          </span>
          <div className="hero-photo-grid">
            <div className="photo-tile">
              <img src={photoUrl} alt="Us💕" />
            </div>
            <div className="photo-tile">
              <img src={photoUrl2} alt="GalleryDump✨" />
            </div>
            <div className="photo-tile">
              <img src={photoUrl3} alt="GalleryDump📷" />
            </div>
            <div className="photo-tile">
              <img src={photoUrl4} alt="GalleryDump🪨" />
            </div>
          </div>
        </div>
      </section>

      <Marquee />

      <div className="about-strip">
        <div className="about-grid">
          <div className="about-card reveal">
            <div className="section-tag">who is this</div>
            <h2 className="section-title">Miss Yapps <span>a Lot</span></h2>
            <p style={{ fontSize: '1rem', lineHeight: 1.75, color: 'var(--brown-mid)', marginBottom: '0.5rem' }}>
              Employed by day, batman by night.
              <br />
              <b>पवित्र पापी</b> & <b>विचित्र नारी</b>
            </p>
            <ul className="adj-list">
              {['Chronic New Project Starter', 'AI Backend Engineer', 'Random Researcher', 'Hobby Hopper', 'Polymathy'].map(
                (item) => <li key={item}>{item}</li>
              )}
            </ul>
            <button className="smv-btn" style={{ marginTop: '1.5rem' }} onClick={() => navigate('/connect')}>
              Say Hello ♡
            </button>
          </div>

          <div className="reveal">
            <div className="section-tag" style={{ marginBottom: '1rem' }}>what i believe in</div>
            {BELIEFS.map((belief) => (
              <div className="belief-item" key={belief.n}>
                <div className="belief-num">{belief.n}</div>
                <div className="belief-text">{belief.t}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="smv-section">
        <div className="section-tag">latest musings</div>
        <h2 className="section-title reveal">From the <span>Blog</span></h2>
        <div className="blog-grid">
          {BLOG_POSTS.map((post) => (
            <button
              key={post.id}
              type="button"
              className="blog-card reveal"
              onClick={() => {
                navigate(`/blog/${post.id}`)
              }}
            >
              <div className="blog-cat">{post.cat}</div>
              <div className="blog-title">{post.title}</div>
              <div className="blog-excerpt">{post.excerpt}</div>
              <div className="blog-meta">
                <span>{post.date}</span>
                <span>{post.read}</span>
              </div>
              <div className="blog-more">Read Post</div>
            </button>
          ))}
          <div
            className="blog-card reveal"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              cursor: 'default',
              background: 'var(--blush)',
              borderColor: 'var(--dusty-rose)',
            }}
          >
            <div style={{ fontSize: '2.5rem', opacity: 0.35, marginBottom: '0.7rem' }}>✍</div>
            <div className="blog-title" style={{ fontSize: '1rem' }}>More Coming Soon...</div>
            <p style={{ fontSize: '0.88rem', color: 'var(--brown-mid)', marginTop: '0.4rem' }}>
              this corner is always growing ♡
            </p>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <button className="smv-btn" onClick={() => navigate('/blog')}>
            All Posts
          </button>
        </div>
      </div>

      <div className="pull-quote reveal">"Growth is growth, no matter how small"</div>
    </>
  )
}
