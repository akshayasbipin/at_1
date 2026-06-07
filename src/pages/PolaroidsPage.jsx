import { useReveal } from '../hooks/useReveal.js'

const POLAROID_DATA = [
  { cap: 'daaaamm ♡', img: null },
  { cap: 'khana khazana', img: null },
  { cap: 'wow green', img: null },
  { cap: 'yellow🌻', img: null },
  { cap: 'can\'t miss a red', img: null },
  { cap: 'gravity ig', img: null },
]

export default function PolaroidsPage() {
  useReveal()

  return (
    <div className="smv-section">
      <div className="section-tag">film roll</div>
      <h2 className="section-title reveal">Polo<span>rids</span></h2>
      <p className="reveal" style={{ fontSize: '1rem', color: 'var(--brown-mid)', maxWidth: '55ch', marginBottom: '2rem' }}>
        little snapshots — art, life, moments worth keeping...for the month ₍^. .^₎⟆
      </p>
      <div className="polaroid-grid">
        {POLAROID_DATA.map((item, index) => (
          <div key={index} className="polaroid reveal">
            <div className="polaroid-img">
              {item.img ? (
                <img src={item.img} alt={item.cap} />
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
