import { useReveal } from '../hooks/useReveal.js'
import p1 from '../assets/poloroids/p1.jpg'
import p2 from '../assets/poloroids/p2.jpg'
import p3 from '../assets/poloroids/p3.jpg'
import p4 from '../assets/poloroids/p4.jpg'
import p5 from '../assets/poloroids/p5.jpg'
import p6 from '../assets/poloroids/p6.jpg'

const POLAROID_DATA = [
  { cap: 'daaaamm ♡', img: p4 },
  { cap: 'khana khazana', img: p1 },
  { cap: 'wow green', img: p2 },
  { cap: 'yellow🌻', img: p3 },
  { cap: 'can\'t miss a red', img: p5 },
  { cap: 'gravity ig', img: p6 },
]

export default function PolaroidsPage() {
  useReveal()

  return (
    <div className="smv-section">
      <div className="section-tag">film roll</div>
      <h2 className="section-title reveal">Pola<span>roids</span></h2>
      <p className="reveal" style={{ fontSize: '1rem', color: 'var(--brown-mid)', maxWidth: '55ch', marginBottom: '2rem' }}>
        little snapshots — art, life, moments worth keeping...for the month ₍^. .^₎⟆
      </p>
      <div className="polaroid-grid">
        {POLAROID_DATA.map((item, index) => (
          <div key={index} className="polaroid reveal">
            <div className="polaroid-img">
              {item.img ? (
                <img src={item.img} alt={item.cap} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <span className="pol-placeholder">📷</span>
              )}
            </div>
            <div className="polaroid-caption">{item.cap}</div>
          </div>
        ))}
      </div>
      <p style={{ marginTop: '2rem', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--sand)', textAlign: 'center' }}>
        trying to update it monthly 𐔌՞ ܸ.ˬ.ܸ՞𐦯
      </p>
    </div>
  )
}
