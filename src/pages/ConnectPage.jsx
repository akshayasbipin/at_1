import { useReveal } from '../hooks/useReveal.js'

const CONNECT_LINKS = [
  { icon: 'ti-brand-instagram', label: 'Instagram', sub: '@shy_milkshake_void', url: 'https://www.instagram.com/shy_milkshake_void/' },
  { icon: 'ti-external-link', label: 'Canva Portfolio', sub: 'shymilkshakevoid.my.canva.site', url: 'https://shymilkshakevoid.my.canva.site' },
]

export default function ConnectPage() {
  useReveal()

  return (
    <div className="connect-section">
      <div className="connect-inner">
        <div className="reveal">
          <div className="section-tag">find me at</div>
          <h2 className="section-title">Con<span>nect</span></h2>
          <div className="connect-links">
            {CONNECT_LINKS.map((link) => (
              <a key={link.url} className="connect-link" href={link.url} target="_blank" rel="noreferrer">
                <i className={`ti ${link.icon}`} style={{ fontSize: '1.3rem', color: 'var(--terracotta)' }} />
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{link.label}</div>
                  <div className="connect-link-sub">{link.sub}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
        <div className="reveal">
          <div className="pull-quote" style={{ margin: '0 0 2rem', padding: '1.8rem' }}>
            &quot;Let's Create Something Exceptional Together &lt;:&quot;
          </div>
          <p className="connect-manifesto">
            whether you want to chat about <strong>AI agents</strong>, swap <strong>book recommendations</strong>,
            admire <strong>art</strong>, or just say hi — find me on instagram or drop a note in the guestbook.
            <br />
            <br />
            or just lurk. that's valid too ♡
          </p>
        </div>
      </div>
    </div>
  )
}
