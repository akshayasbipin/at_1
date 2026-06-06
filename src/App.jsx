import { useState, useEffect, useRef, useCallback } from 'react'
import photoUrl from './assets/photo.jpg'
import photoUrl2 from './assets/photo2.jpeg'
import photoUrl3 from './assets/photo3.jpeg'
import photoUrl4 from './assets/photo4.jpeg'

// ─── DATA ─────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { id: 'home',       label: 'Home' },
  { id: 'gallery',    label: 'Gallery' },
  { id: 'sketchbook', label: 'SketchBook' },
  { id: 'blog',       label: 'Blog' },
  { id: 'guestbook',  label: 'Guestbook' },
  { id: 'radio',      label: 'Radio' },
  { id: 'polaroids',  label: 'Polaroids' },
  { id: 'magazine',   label: 'Magazine' },
  { id: 'thoughtbook', label: 'Thought Book' },
  { id: 'connect',    label: 'Connect' },
]

const BLOG_POSTS = [
  {
    id: 1,
    cat: 'Tech · AI · Agents',
    title: "A Beginner's Guide to Simple Agent Architectures",
    excerpt: "So you want to start making agents and don't know where to begin. Relatable. Here are the five patterns I actually used — from a plain LLM call to multi-agent orchestration.",
    date: 'Apr 25, 2026',
    read: '5 min read',
    url: 'https://pinkoctopus36.wixsite.com/shymilkshakevoid/post/a-beginner-s-guide-tosimple-agent-architectures',
  },
  {
    id: 2,
    cat: 'Books · History · Women',
    title: 'Women Who Refused Permission',
    excerpt: 'Heroines: Powerful Indian Women of Myth & History — a review of women who authored their own authority. From Draupadi to Hazrat Mahal.',
    date: 'Feb 14, 2026',
    read: '6 min read',
    url: 'https://pinkoctopus36.wixsite.com/shymilkshakevoid/post/women-who-refused-permission',
  },
]

const PLAYLIST = [
  { id: 1, title: 'Amsham', artist: 'Aksomaniac, Circle Tone, Bhumi, M.H.R', duration: '5:40', videoId: 'r8iPHiciQd0' },
  { id: 2, title: "She'd Say", artist: 'Andy Gramer, Ladysmith Black Mambazo', duration: '4:01', videoId: 'MALzZRxr94g' },
  { id: 3, title: 'I Went Too Far', artist: 'AURORA', duration: '3:43', videoId: 'eT6dLJd3rYk' },
  { id: 4, title: 'TOUR SHIT!', artist: 'Seedhe Maut', duration: '2:54', videoId: 't_QZPzg-kTE' },
  { id: 5, title: "Teen Dost", artist: 'Seedhe Maut x Sez on the Beat', duration: '3:33', videoId: 'y-PF51nSwFI' },
]

const MARQUEE_WORDS = [
  'digital doodler','✦','AI backend engineer','✦','hobby hopper','✦',
  'chronic new project starter','✦','random researcher','✦','polymathy','✦',
  'digital doodler','✦','AI backend engineer','✦','hobby hopper','✦',
  'chronic new project starter','✦','random researcher','✦','polymathy','✦',
]

const MOODS = ['✨ inspired','🌙 dreamy','🔥 fired up','🌿 calm','🤔 curious','💭 rambling']

const BELIEFS = [
  { n: '01.', t: 'Simple empathy shouldn\'t be labelled revolutionary, maybe try understanding.' },
  { n: '02.', t: 'AI isn\'t bad, it\'s the lack of ethics — same as the internet.' },
  { n: '03.', t: 'Hate is taught.' },
  { n: '04.', t: '"When we hear enough lies we no longer recognize the truth at all." — Chernobyl (HBO)' },
]

// ─── CURSOR ───────────────────────────────────────────────────────────
function Cursor() {
  const cursorRef = useRef(null)
  const dotRef = useRef(null)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const move = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + 'px'
        cursorRef.current.style.top = e.clientY + 'px'
      }
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + 'px'
        dotRef.current.style.top = e.clientY + 'px'
      }
    }
    const onEnter = (e) => { if (e.target.closest('a,button,[role="button"]')) setHovered(true) }
    const onLeave = () => setHovered(false)

    document.addEventListener('mousemove', move)
    document.addEventListener('mouseover', onEnter)
    document.addEventListener('mouseout', onLeave)
    return () => {
      document.removeEventListener('mousemove', move)
      document.removeEventListener('mouseover', onEnter)
      document.removeEventListener('mouseout', onLeave)
    }
  }, [])

  return (
    <>
      <div id="smv-cursor" ref={cursorRef} className={hovered ? 'hovered' : ''} />
      <div id="smv-cursor-dot" ref={dotRef} />
    </>
  )
}

// ─── REVEAL HOOK ──────────────────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal:not(.visible)')
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('visible'), i * 70)
          obs.unobserve(e.target)
        }
      })
    }, { threshold: 0.08 })
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  })
}

// ─── TYPEWRITER ───────────────────────────────────────────────────────
const TW_LINES = [
  'a cozy corner for everything ♡',
  'chronic new project starter ✦',
  'vibes are permanent here',
  'hobby hopper & proud of it',
  'still figuring it out — and that is okay',
]

function Typewriter() {
  const [text, setText] = useState('')
  const [lineIdx, setLineIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const line = TW_LINES[lineIdx]
    const delay = deleting ? 42 : 72

    const t = setTimeout(() => {
      if (!deleting) {
        if (charIdx < line.length) { setText(line.slice(0, charIdx + 1)); setCharIdx(c => c + 1) }
        else { setTimeout(() => setDeleting(true), 1600) }
      } else {
        if (charIdx > 0) { setText(line.slice(0, charIdx - 1)); setCharIdx(c => c - 1) }
        else { setDeleting(false); setLineIdx(i => (i + 1) % TW_LINES.length) }
      }
    }, delay)
    return () => clearTimeout(t)
  }, [text, lineIdx, charIdx, deleting])

  return <span className="typewriter-line">{text}</span>
}

// ─── NAV ──────────────────────────────────────────────────────────────
function Nav({ active, setActive }) {
  const [open, setOpen] = useState(false)
  return (
    <nav className="smv-nav">
      <a className="smv-nav-logo" href="#" onClick={() => { setActive('home'); setOpen(false) }}>
        shy<span>Milkshake</span>Void
      </a>
      <ul className={`smv-nav-links${open ? ' open' : ''}`}>
        {NAV_ITEMS.map(item => (
          <li key={item.id}>
            <button
              className={active === item.id ? 'active' : ''}
              onClick={() => { setActive(item.id); setOpen(false); window.scrollTo(0,0) }}
            >{item.label}</button>
          </li>
        ))}
      </ul>
      <button className="smv-hamburger" aria-label="menu" onClick={() => setOpen(o => !o)}>
        <span /><span /><span />
      </button>
    </nav>
  )
}

// ─── STICKY NOTE ──────────────────────────────────────────────────────
function StickyNote() {
  const [visible, setVisible] = useState(true)
  if (!visible) return null
  return (
    <div className="sticky-note">
      <button className="sticky-close" onClick={() => setVisible(false)}>✕</button>
      ✨ updates may be inconsistent but vibes are permanent ♡
    </div>
  )
}

// ─── MARQUEE ──────────────────────────────────────────────────────────
function Marquee() {
  return (
    <div className="marquee-wrap">
      <div className="marquee-inner">
        {MARQUEE_WORDS.map((w, i) => <span key={i}>{w}</span>)}
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════
// ─── SECTIONS ─────────────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════

// HOME
function HomeSection({ setActive }) {
  useReveal()
  return (
    <>
      {/* HERO */}
      <section className="hero-section">
        <div className="hero-left">
          <div className="hero-eyebrow">Digital doodler · Visual storytelling · Just for fun</div>
          <h1 className="hero-h1">shy<br /><span className="accent">Milkshake</span><br />Void</h1>
          <p className="hero-sub">a cozy corner for hobbies, blogs,<br />hyperfixations & everything in between</p>
          <p className="hero-desc">
            Hiiii.... Welcome to shyMilkshakeVoid ♡ — collecting my art, code, ideas, interests
            and whatever hyperfixation wins this week. vibes are permanent.
          </p>
          <p className="hero-quote">"Growth is growth, no matter how small"</p>
          <div className="hero-btns">
            <button className="smv-btn filled" onClick={() => { setActive('gallery'); window.scrollTo(0,0) }}>See My Art</button>
            <button className="smv-btn" onClick={() => { setActive('blog'); window.scrollTo(0,0) }}>Read Blogs</button>
            <a className="smv-btn" href="https://www.instagram.com/shy_milkshake_void/" target="_blank" rel="noreferrer">Instagram</a>
          </div>
          <div className="social-row">
            <p>find me at:</p>
            <a className="social-icon-link" href="https://www.instagram.com/shy_milkshake_void/" target="_blank" rel="noreferrer">
              <i className="ti ti-brand-instagram" /> @shy_milkshake_void
            </a>
            <a className="social-icon-link" href="https://github.com/akshayasbipin" target="_blank" rel="noreferrer">
              <i className="ti ti-brand-github" /> akshayasbipin
            </a>
          </div>
        </div>
        <div className="hero-right">
          <span className="hero-doodle" style={{ top:'14%', left:'10%', animationDelay:'-1s' }}>✿</span>
          <span className="hero-doodle" style={{ top:'68%', left:'78%', animationDelay:'-2.5s', fontSize:'1.9rem' }}>♡</span>
          <span className="hero-doodle" style={{ top:'45%', left:'5%', animationDelay:'-.8s', fontSize:'1.6rem' }}>✦</span>
          <div className="hero-photo-grid">
            {/* Replace these with <img src="./your-image.jpg"> inside each .photo-tile */}
            <div className="photo-tile"><img src={photoUrl} alt="Us💕"/></div>
            <div className="photo-tile"><img src={photoUrl2} alt="GalleryDump✨"/></div>
            <div className="photo-tile"><img src={photoUrl3} alt="GalleryDump📷"/></div>
            <div className="photo-tile"><img src={photoUrl4} alt="GalleryDump🪨"/></div>
          </div>
        </div>
      </section>

      <Marquee />

      {/* ABOUT STRIP */}
      <div className="about-strip">
        <div className="about-grid">
          <div className="about-card reveal">
            <div className="section-tag">who is this</div>
            <h2 className="section-title">Miss Yapps <span>a Lot</span></h2>
            <p style={{ fontSize:'1rem', lineHeight:1.75, color:'var(--brown-mid)', marginBottom:'0.5rem' }}>
              AI backend engineer by day, digital doodler by soul. I collect hobbies the way some people
              collect dishes — enthusiastically and without storage space.
            </p>
            <ul className="adj-list">
              {['Chronic New Project Starter','AI Backend Engineer','Random Researcher','Hobby Hopper','Polymathy']
                .map(a => <li key={a}>{a}</li>)}
            </ul>
            <button className="smv-btn" style={{ marginTop:'1.5rem' }} onClick={() => { setActive('connect'); window.scrollTo(0,0) }}>
              Say Hello ♡
            </button>
          </div>
          <div className="reveal">
            <div className="section-tag" style={{ marginBottom:'1rem' }}>what i believe in</div>
            {BELIEFS.map(b => (
              <div className="belief-item" key={b.n}>
                <div className="belief-num">{b.n}</div>
                <div className="belief-text">{b.t}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BLOG TEASER */}
      <div className="smv-section">
        <div className="section-tag">latest musings</div>
        <h2 className="section-title reveal">From the <span>Blog</span></h2>
        <div className="blog-grid">
          {BLOG_POSTS.map(p => (
            <a className="blog-card reveal" key={p.id} href={p.url} target="_blank" rel="noreferrer">
              <div className="blog-cat">{p.cat}</div>
              <div className="blog-title">{p.title}</div>
              <div className="blog-excerpt">{p.excerpt}</div>
              <div className="blog-meta"><span>{p.date}</span><span>{p.read}</span></div>
              <div className="blog-more">Read on Wix</div>
            </a>
          ))}
          <div className="blog-card reveal" style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', textAlign:'center', cursor:'default', background:'var(--blush)', borderColor:'var(--dusty-rose)' }}>
            <div style={{ fontSize:'2.5rem', opacity:0.35, marginBottom:'0.7rem' }}>✍</div>
            <div className="blog-title" style={{ fontSize:'1rem' }}>More Coming Soon...</div>
            <p style={{ fontSize:'0.88rem', color:'var(--brown-mid)', marginTop:'0.4rem' }}>this corner is always growing ♡</p>
          </div>
        </div>
        <div style={{ textAlign:'center', marginTop:'2rem' }}>
          <button className="smv-btn" onClick={() => { setActive('blog'); window.scrollTo(0,0) }}>All Posts</button>
        </div>
      </div>

      <div className="pull-quote reveal">
        "Growth is growth, no matter how small"
      </div>
    </>
  )
}

// GALLERY
function GallerySection() {
  useReveal()
  const tiles = [
    { icon:'🎨', label:'Add Art Here', caption:'your caption here', cls:'' },
    { icon:'✏️', label:'Doodle', caption:'your caption here', cls:'' },
    { icon:'🌸', label:'Featured Piece', caption:'your caption here', cls:'featured' },
    { icon:'🖌️', label:'Illustration', caption:'your caption here', cls:'' },
    { icon:'✿', label:'Pattern Study', caption:'your caption here', cls:'' },
    { icon:'🎭', label:'Character Study', caption:'your caption here', cls:'' },
    { icon:'🌿', label:'Nature Doodle', caption:'your caption here', cls:'' },
    { icon:'💭', label:'Concept Art', caption:'your caption here', cls:'' },
    { icon:'＋', label:'Add More', caption:'', cls:'dashed-add' },
  ]
  return (
    <div className="smv-section">
      <div className="section-tag">my art dump</div>
      <h2 className="section-title reveal">Gallery</h2>
      <p className="reveal" style={{ fontSize:'1rem', color:'var(--brown-mid)', maxWidth:'60ch', marginBottom:'0.5rem' }}>
        digital doodles, illustrations, random creativity ✦ hover the tiles to peek.
      </p>
      <p className="reveal" style={{ marginBottom:'1.5rem' }}>
        <a className="smv-btn" href="https://shymilkshakevoid.my.canva.site" target="_blank" rel="noreferrer">
          Full Portfolio on Canva ↗
        </a>
      </p>
      <div className="gallery-grid">
        {tiles.map((t, i) => (
          <div key={i} className={`gallery-tile reveal ${t.cls}`}>
            {/* To add an image: replace this div contents with <img src="./images/your-art.jpg" alt="desc" /> */}
            <span className="gt-icon">{t.icon}</span>
            <span className="gt-label">{t.label}</span>
            {t.caption && <div className="gt-caption">{t.caption}</div>}
          </div>
        ))}
      </div>
      <p style={{ marginTop:'1.5rem', fontFamily:'var(--font-mono)', fontSize:'0.72rem', color:'var(--sand)', textAlign:'center' }}>
        ↑ to add images: replace the placeholder divs with &lt;img src="./images/your-art.jpg"&gt; inside each .gallery-tile
      </p>
    </div>
  )
}

// SKETCHBOOK
function SketchbookSection() {
  useReveal()
  return (
    <div className="smv-section">
      <div className="section-tag">wip & loose pages</div>
      <h2 className="section-title reveal">Sketch<span>Book</span></h2>
      <p className="reveal" style={{ fontSize:'1rem', color:'var(--brown-mid)', maxWidth:'58ch', marginBottom:'0.5rem' }}>
        the unfinished, the experimental, the happy accidents — this is where art lives before it's "done" ✦
      </p>
      <a className="smv-btn reveal" href="https://shymilkshakevoid.my.canva.site" target="_blank" rel="noreferrer" style={{ marginBottom:'1.5rem', display:'inline-block' }}>
        Full Portfolio on Canva ↗
      </a>
      <div className="sketchbook-grid" style={{ marginTop:'1.5rem' }}>
        {[
          { icon:'🌷', label:'wip sketch', cls:'tall bg-blush' },
          { icon:'📖', label:'studies', cls:'' },
          { icon:'🎵', label:'mood board', cls:'bg-warm' },
          { icon:'✉️', label:'add a quote / clipping', cls:'wide bg-grey' },
          { icon:'🖼', label:'process shot', cls:'bg-warm' },
          { icon:'🌿', label:'inspiration ref', cls:'bg-blush' },
          { icon:'✿', label:'colour palette', cls:'bg-grey' },
          { icon:'✍', label:'notes & ideas', cls:'wide bg-blush' },
        ].map((t, i) => (
          <div key={i} className={`sketch-tile reveal ${t.cls}`}>
            <div className={`tape${i % 3 === 0 ? ' left' : i % 3 === 2 ? ' right' : ''}`} />
            {/* Replace content with: <img src="./images/sketch.jpg" alt="sketch" style={{width:'100%',height:'100%',objectFit:'cover',position:'absolute',inset:0}} /> */}
            <span className="sketch-icon">{t.icon}</span>
            <span className="sketch-label">{t.label}</span>
          </div>
        ))}
      </div>
      <div style={{ marginTop:'3rem', textAlign:'center', padding:'2rem 0' }}>
        <Typewriter />
      </div>
    </div>
  )
}

// BLOG
function BlogSection() {
  useReveal()
  return (
    <div className="smv-section">
      <div className="section-tag">words & thoughts</div>
      <h2 className="section-title reveal">The <span>Blog</span></h2>
      <p className="reveal" style={{ fontSize:'1rem', color:'var(--brown-mid)', marginBottom:'0.5rem' }}>
        tech rants, book reviews, and whatever else spills out of my brain ✦
      </p>
      <a className="smv-btn reveal" href="https://pinkoctopus36.wixsite.com/shymilkshakevoid/blog" target="_blank" rel="noreferrer" style={{ marginBottom:'1.5rem', display:'inline-block' }}>
        All Posts on Wix ↗
      </a>
      <div className="blog-grid">
        {BLOG_POSTS.map(p => (
          <a key={p.id} className="blog-card reveal" href={p.url} target="_blank" rel="noreferrer">
            <div className="blog-cat">{p.cat}</div>
            <div className="blog-title">{p.title}</div>
            <div className="blog-excerpt">{p.excerpt}</div>
            <div className="blog-meta"><span>{p.date}</span><span>{p.read}</span></div>
            <div className="blog-more">Read Full Post</div>
          </a>
        ))}
        <div className="blog-card reveal" style={{ borderStyle:'dashed', cursor:'default', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', textAlign:'center', minHeight:'200px' }}>
          <div style={{ fontSize:'2.5rem', opacity:0.3, marginBottom:'0.8rem' }}>✍</div>
          <div className="blog-title" style={{ fontSize:'1rem' }}>Add More Posts</div>
          <p style={{ fontSize:'0.85rem', color:'var(--brown-mid)', marginTop:'0.4rem' }}>copy the blog-card block above ♡</p>
        </div>
      </div>
    </div>
  )
}

// GUESTBOOK
const SEED_ENTRIES = [
  { name: 'a visitor ♡', msg: 'love the vibe of this corner of the internet!!', emoji: '🌸', time: 'just now' },
  { name: 'anonymous friend', msg: 'the blog on Indian heroines was genuinely moving. more please!', emoji: '✨', time: 'earlier' },
]

function GuestbookSection() {
  useReveal()
  const [entries, setEntries] = useState(SEED_ENTRIES)
  const [name, setName] = useState('')
  const [msg, setMsg] = useState('')
  const [emoji, setEmoji] = useState('🌸')
  const emojis = ['🌸','✨','🎨','🌿','♡','✦','🎀','🍓']

  const submit = () => {
    if (!msg.trim()) return
    const now = new Date()
    const time = now.toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' })
    setEntries(prev => [{ name: name.trim() || 'anonymous visitor', msg: msg.trim(), emoji, time }, ...prev])
    setName(''); setMsg('')
  }

  return (
    <div className="smv-section">
      <div className="section-tag">leave a trace</div>
      <h2 className="section-title reveal">Guest<span>book</span></h2>
      <p className="reveal" style={{ fontSize:'1rem', color:'var(--brown-mid)', maxWidth:'55ch', marginBottom:'0.5rem' }}>
        say hi, drop a thought, leave a flower emoji — this is a cozy log of everyone who passed through ✦
      </p>
      <div className="guestbook-layout">
        <div className="gb-form-card reveal">
          <div className="section-tag" style={{ marginBottom:'1rem' }}>write something ♡</div>
          <div className="gb-field">
            <label className="gb-label">your name (or stay anon)</label>
            <input className="gb-input" value={name} onChange={e => setName(e.target.value)} placeholder="mysterious visitor..." maxLength={40} />
          </div>
          <div className="gb-field">
            <label className="gb-label">pick a little emoji</label>
            <div style={{ display:'flex', gap:'0.5rem', flexWrap:'wrap' }}>
              {emojis.map(e => (
                <button key={e} onClick={() => setEmoji(e)}
                  style={{ fontSize:'1.3rem', background: emoji === e ? 'var(--blush)' : 'transparent', border: emoji === e ? '1.5px solid var(--dusty-rose)' : '1.5px solid transparent', cursor:'pointer', padding:'0.2rem 0.4rem', transition:'all .15s' }}>
                  {e}
                </button>
              ))}
            </div>
          </div>
          <div className="gb-field">
            <label className="gb-label">your message</label>
            <textarea className="gb-textarea" rows={4} value={msg} onChange={e => setMsg(e.target.value)} placeholder="leave a thought, a hello, a poem..." maxLength={280} />
          </div>
          <button className="smv-btn filled" onClick={submit}>Leave a Note →</button>
        </div>
        <div className="reveal">
          <div className="section-tag" style={{ marginBottom:'1rem' }}>notes left behind</div>
          <div className="gb-entries">
            {entries.map((e, i) => (
              <div className="gb-entry" key={i}>
                <span className="gb-entry-emoji">{e.emoji}</span>
                <div className="gb-entry-name">{e.name}</div>
                <div className="gb-entry-msg">{e.msg}</div>
                <div className="gb-entry-time">{e.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// RADIO
function RadioSection() {
  useReveal()
  const [current, setCurrent] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [playerUrl, setPlayerUrl] = useState('')

  const track = PLAYLIST[current]

  const getIframeUrl = (videoId, auto) =>
    `https://www.youtube.com/embed/${videoId}?autoplay=${auto ? 1 : 0}&controls=1&rel=0&modestbranding=1`

  useEffect(() => {
    if (!track) return
    if (playing) {
      setPlayerUrl(getIframeUrl(track.videoId, true))
    } else {
      setPlayerUrl('')
    }
  }, [track?.videoId, playing])

  const togglePlay = () => {
    if (!track) return
    setPlaying((prev) => !prev)
  }

  const changeTrack = (index) => {
    if (!PLAYLIST.length) return
    setCurrent(index)
    setPlaying(true)
  }

  const prev = () => changeTrack((current - 1 + PLAYLIST.length) % PLAYLIST.length)
  const next = () => changeTrack((current + 1) % PLAYLIST.length)

  if (!PLAYLIST.length) {
    return (
      <div className="smv-section">
        <div className="section-tag">something to listen to</div>
        <h2 className="section-title reveal">Radio <span>♡</span></h2>
        <div className="radio-player reveal">
          <p style={{ margin: '0', color: 'var(--brown-mid)', lineHeight: 1.8 }}>
            No tracks are configured. Add up to 5 YouTube video IDs in the playlist and reload.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="smv-section">
      <div className="section-tag">something to listen to</div>
      <h2 className="section-title reveal">Radio <span>♡</span></h2>
      <p className="reveal" style={{ fontSize:'1rem', color:'var(--brown-mid)', maxWidth:'55ch', marginBottom:'0.5rem' }}>
        my current listening pile — choose a YouTube track here, then use our player button to start it.
      </p>
      <div className="radio-player reveal">
        <div className="radio-display">
          <div style={{ fontSize:'0.7rem', opacity:0.6, marginBottom:'0.5rem', letterSpacing:'0.15em' }}>
            {playing ? '▶ NOW PLAYING' : '■ PAUSED'} · TRACK {current + 1}/{PLAYLIST.length}
          </div>
          <div className="radio-track-title">{track.title}</div>
          <div className="radio-track-artist">{track.artist}</div>
        </div>
        <div style={{ marginBottom:'1.5rem' }}>
          {playerUrl ? (
            <iframe
              width="100%"
              height="260"
              src={playerUrl}
              title={`YouTube player - ${track.title}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div style={{ minHeight:'260px', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--brown-mid)', background:'rgba(255,255,255,0.45)', border:'1px solid var(--sand)', fontFamily:'var(--font-mono)', fontSize:'0.9rem' }}>
              Press play to load the selected YouTube video.
            </div>
          )}
        </div>
        <div className="radio-controls">
          <button className="radio-btn" onClick={prev}><i className="ti ti-player-skip-back" /></button>
          <button className="radio-btn play-btn" onClick={togglePlay}>
            {playing ? <i className="ti ti-player-pause" /> : <i className="ti ti-player-play" />}
          </button>
          <button className="radio-btn" onClick={next}><i className="ti ti-player-skip-forward" /></button>
        </div>
        <div className="radio-playlist">
          {PLAYLIST.map((t, i) => (
            <div key={t.id} className={`radio-playlist-item${current === i ? ' active' : ''}`}
              onClick={() => changeTrack(i)}>
              <span className="track-num">{String(i+1).padStart(2,'0')}</span>
              <span style={{ flex:1 }}>{t.title}</span>
              <span style={{ opacity:0.6, fontSize:'0.7rem' }}>{t.artist}</span>
              <span style={{ marginLeft:'0.8rem', opacity:0.5, fontSize:'0.7rem' }}>{t.duration}</span>
            </div>
          ))}
        </div>
        <p style={{ marginTop:'1.2rem', fontFamily:'var(--font-mono)', fontSize:'0.65rem', color:'var(--sand)', opacity:0.7 }}>
          ♡ the playlist lives here, but playback happens via YouTube iframe — our controls still stay on brand.
        </p>
      </div>
    </div>
  )
}

// POLAROIDS
const POLAROID_DATA = [
  { icon:'📷', cap:'add a photo ♡' },
  { icon:'🌸', cap:'a favourite moment' },
  { icon:'🖼', cap:'my art' },
  { icon:'🌿', cap:'something pretty' },
  { icon:'✦', cap:'add here' },
  { icon:'🎨', cap:'process shot' },
]

function PolariodsSection() {
  useReveal()
  return (
    <div className="smv-section">
      <div className="section-tag">film roll</div>
      <h2 className="section-title reveal">Polo<span>rids</span></h2>
      <p className="reveal" style={{ fontSize:'1rem', color:'var(--brown-mid)', maxWidth:'55ch', marginBottom:'2rem' }}>
        little snapshots — art, life, moments worth keeping ✦ hover to lift them off the page
      </p>
      <div className="polaroid-grid">
        {POLAROID_DATA.map((p, i) => (
          <div key={i} className="polaroid reveal">
            <div className="polaroid-img">
              {/* Replace with: <img src="./images/photo.jpg" alt="caption" /> */}
              <span className="pol-placeholder">{p.icon}</span>
            </div>
            <div className="polaroid-caption">{p.cap}</div>
          </div>
        ))}
      </div>
      <p style={{ marginTop:'2rem', fontFamily:'var(--font-mono)', fontSize:'0.72rem', color:'var(--sand)', textAlign:'center' }}>
        ↑ drop your images into each .polaroid-img div in the source code ♡
      </p>
    </div>
  )
}

// MAGAZINE
function MagazineSection() {
  useReveal()
  return (
    <div className="smv-section">
      <div className="section-tag">the zine</div>
      <h2 className="section-title reveal">Maga<span>zine</span></h2>
      <p className="reveal" style={{ fontSize:'1rem', color:'var(--brown-mid)', maxWidth:'55ch', marginBottom:'0.5rem' }}>
        a messy, beautiful editorial — like a magazine that got out of hand ✦
      </p>
      <a className="smv-btn reveal" href="https://shymilkshakevoid.my.canva.site" target="_blank" rel="noreferrer" style={{ marginBottom:'2rem', display:'inline-block' }}>
        Open Zine on Canva ↗
      </a>

      {/* Masthead */}
      <div className="mag-hero reveal">
        <div className="mag-masthead">shyMilkshakeVoid</div>
        <div className="mag-issue">Issue No. 01 · June 2026 · Hyderabad</div>
        <p style={{ fontFamily:'var(--font-body)', fontStyle:'italic', fontSize:'1.05rem', color:'var(--cream-warm)', maxWidth:'50ch', opacity:0.8 }}>
          "a cozy corner dedicated to collect hobbies, blogs, ideas and whatever hyperfixation wins this week"
        </p>
      </div>

      {/* Magazine grid */}
      <div className="mag-grid reveal" style={{ marginTop:'2rem' }}>
        <div className="mag-feature">
          <div className="mag-feature-tag">Cover Story</div>
          <div className="mag-feature-title">Women Who Refused Permission</div>
          <div className="mag-feature-body">
            <em>Heroines: Powerful Indian Women of Myth &amp; History</em> by Ira Mukhoty is built around a line that refuses to leave the reader alone: every woman described in this book refuses to borrow a man's prerogative. It is a book about women who authored their own authority.
          </div>
          <div className="mag-img-placeholder" style={{ marginTop:'1.2rem' }}>
            {/* <img src="./images/magazine-cover.jpg" alt="cover" style={{width:'100%',height:'100%',objectFit:'cover'}} /> */}
            <span>add cover image here ↑</span>
          </div>
          <a className="smv-btn" href="https://pinkoctopus36.wixsite.com/shymilkshakevoid/post/women-who-refused-permission" target="_blank" rel="noreferrer" style={{ marginTop:'1.2rem', display:'inline-block' }}>
            Read Full Review →
          </a>
        </div>
        <div className="mag-sidebar">
          {[
            { n:'01', title:"A Beginner's Guide to Agent Architectures", cat:'Tech · AI', url:'https://pinkoctopus36.wixsite.com/shymilkshakevoid/post/a-beginner-s-guide-tosimple-agent-architectures' },
            { n:'02', title:'Digital Doodler: The Art Corner', cat:'Art · Process', url:'https://shymilkshakevoid.my.canva.site' },
            { n:'03', title:'Hyperfixation of the Week', cat:'Lifestyle', url:'#' },
            { n:'04', title:'Add your next article here', cat:'your category', url:'#' },
          ].map(s => (
            <a key={s.n} className="mag-sidebar-item" href={s.url} target="_blank" rel="noreferrer">
              <div className="s-num">{s.n}</div>
              <div className="s-title">{s.title}</div>
              <div className="s-cat">{s.cat}</div>
            </a>
          ))}
        </div>
      </div>

      <div style={{ textAlign:'center', marginTop:'2.5rem', padding:'2rem 0' }}>
        <Typewriter />
      </div>
    </div>
  )
}

// THOUGHT BOOK
function ThoughtBookSection() {
  useReveal()
  const [thoughts, setThoughts] = useState([
    { text: '"Growth is growth, no matter how small" — holding onto this one.', mood: '✨ inspired', date: 'Jun 2026' },
    { text: 'The world now seems to lack humanity, shaped too heavily by those who\'ve always held power. common sense has to appear, right?', mood: '🤔 curious', date: 'May 2026' },
  ])
  const [text, setText] = useState('')
  const [activeMood, setActiveMood] = useState(MOODS[0])

  const addThought = () => {
    if (!text.trim()) return
    const now = new Date()
    const date = now.toLocaleDateString('en-US', { month:'short', year:'numeric' })
    setThoughts(prev => [{ text: text.trim(), mood: activeMood, date }, ...prev])
    setText('')
  }

  return (
    <div className="smv-section">
      <div className="section-tag">inner monologue</div>
      <h2 className="section-title reveal">Thought <span>Book</span></h2>
      <p className="reveal" style={{ fontSize:'1rem', color:'var(--brown-mid)', maxWidth:'55ch', marginBottom:'2rem' }}>
        half-formed thoughts, quotes that won't leave me alone, small rants — this is the brain dump corner ✦
      </p>
      <div className="thought-book">
        <div className="thought-input-area reveal">
          <div className="thought-moods">
            {MOODS.map(m => (
              <button key={m} className={`mood-tag${activeMood === m ? ' active' : ''}`} onClick={() => setActiveMood(m)}>{m}</button>
            ))}
          </div>
          <textarea
            className="thought-textarea"
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="write something... a quote, a thought, a tiny rant ♡"
            maxLength={400}
            rows={4}
          />
          <div className="thought-footer-row">
            <span className="thought-char">{text.length}/400</span>
            <button className="smv-btn filled" onClick={addThought}>Add Thought →</button>
          </div>
        </div>
        <div className="thought-list">
          {thoughts.map((t, i) => (
            <div key={i} className="thought-entry reveal">
              <div className="thought-date">{t.mood} · {t.date}</div>
              <div className="thought-text">{t.text}</div>
              <button className="thought-del" onClick={() => setThoughts(prev => prev.filter((_,j)=>j!==i))}>✕</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// CONNECT
function ConnectSection() {
  useReveal()
  const links = [
    { icon:'ti-brand-instagram', label:'Instagram', sub:'@shy_milkshake_void', url:'https://www.instagram.com/shy_milkshake_void/' },
    // { icon:'ti-brand-github', label:'GitHub', sub:'akshayasbipin', url:'https://github.com/akshayasbipin' },
    // { icon:'ti-brand-linkedin', label:'LinkedIn', sub:'Akshaya S Bipin', url:'https://www.linkedin.com/in/akshaya-s-bipin/' },
    { icon:'ti-external-link', label:'Canva Portfolio', sub:'shymilkshakevoid.my.canva.site', url:'https://shymilkshakevoid.my.canva.site' },
    // { icon:'ti-brand-canva', label:'Designs', sub:'shymilkshakevoid.my.canva.site', url:'https://shymilkshakevoid.my.canva.site' }, // TODO: Add Google drive link to design folder
    // { icon:'ti-writing', label:'Blog on Wix', sub:'shymilkshakevoid blog', url:'https://pinkoctopus36.wixsite.com/shymilkshakevoid/blog' },
    // { icon:'ti-code', label:'LeetCode', sub:'21wh1a0513', url:'https://leetcode.com/u/21wh1a0513/' },
  ]
  return (
    <div className="connect-section">
      <div className="connect-inner">
        <div className="reveal">
          <div className="section-tag">find me at</div>
          <h2 className="section-title">Con<span>nect</span></h2>
          <div className="connect-links">
            {links.map(l => (
              <a key={l.url} className="connect-link" href={l.url} target="_blank" rel="noreferrer">
                <i className={`ti ${l.icon}`} style={{ fontSize:'1.3rem', color:'var(--terracotta)' }} />
                <div>
                  <div style={{ fontWeight:600, fontSize:'0.95rem' }}>{l.label}</div>
                  <div className="connect-link-sub">{l.sub}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
        <div className="reveal">
          <div className="pull-quote" style={{ margin:'0 0 2rem', padding:'1.8rem' }}>
            "Let's Create Something Exceptional Together &lt;:"
          </div>
          <p className="connect-manifesto">
            whether you want to chat about <strong>AI agents</strong>, swap <strong>book recommendations</strong>,
            admire <strong>art</strong>, or just say hi — find me on instagram or drop a note in the guestbook.
            <br /><br />
            or just lurk. that's valid too ♡
          </p>
        </div>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════
// ─── APP ──────────────────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════
export default function App() {
  const [active, setActive] = useState('home')

  const setActivePage = useCallback((id) => {
    setActive(id)
    window.scrollTo(0,0)
  }, [])

  const renderSection = () => {
    switch (active) {
      case 'home':       return <HomeSection setActive={setActivePage} />
      case 'gallery':    return <GallerySection />
      case 'sketchbook': return <SketchbookSection />
      case 'blog':       return <BlogSection />
      case 'guestbook':  return <GuestbookSection />
      case 'radio':      return <RadioSection />
      case 'polaroids':  return <PolariodsSection />
      case 'magazine':   return <MagazineSection />
      case 'thoughtbook': return <ThoughtBookSection />
      case 'connect':    return <ConnectSection />
      default:           return <HomeSection setActive={setActivePage} />
    }
  }

  return (
    <>
      <Cursor />
      <StickyNote />
      <Nav active={active} setActive={setActivePage} />
      <main style={{ paddingTop:'60px', minHeight:'100vh' }}>
        {renderSection()}
      </main>
      <footer className="smv-footer">
        <p>shyMilkshakeVoid ♡ made with <span className="footer-heart">♥</span> and too much overthinking</p>
        <p style={{ marginTop:'0.5rem', opacity:0.65 }}>
          <a href="https://www.instagram.com/shy_milkshake_void/" target="_blank" rel="noreferrer">instagram</a>
          {' · '}
          <a href="https://shymilkshakevoid.my.canva.site" target="_blank" rel="noreferrer">canva</a>
          {' · '}
          <a href="https://pinkoctopus36.wixsite.com/shymilkshakevoid/blog" target="_blank" rel="noreferrer">blog</a>
          {' · '}
          <a href="https://github.com/akshayasbipin" target="_blank" rel="noreferrer">github</a>
        </p>
      </footer>
    </>
  )
}
