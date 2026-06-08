import { useReveal } from '../hooks/useReveal.js'
import v1 from '../assets/Gallery/featured_piece.mp4'
import p1 from '../assets/Gallery/p1.png'
import p2 from '../assets/Gallery/p2.png'
import p3 from '../assets/Gallery/p3.png'
import p4 from '../assets/Gallery/p4.png'
import p5 from '../assets/Gallery/p5.png'
import p6 from '../assets/Gallery/p6.png'
import p7 from '../assets/Gallery/p7.png'

const GALLERY_TILES = [
  { icon: '🎨', label: 'art', caption: 'blues', cls: '' , img: p1},
  { icon: '✏️', label: 'Doodle', caption: 'doodle for HEAVEN', cls: '', img: p2 },
  { icon: '🌸', label: 'Featured Piece', caption: 'About artist', cls: 'featured',video: v1 },
  { icon: '🍔', label: 'food', caption: 'Food', cls: '', img:p5 },
  { icon: '✿', label: 'illustration', caption: 'illustration', cls: '', img: p6 },
  { icon: '🎭', label: 'Sketch', caption: 'L Lawliet', cls: '', img: p3 },
  { icon: '🌿', label: 'Sketch_2', caption: 'Kira', cls: '', img: p4 },
  { icon: '💭', label: 'Concept Art', caption: 'Alucard (Hellsing)', cls: '', img: p7 },
  { icon: '＋', label: 'Add More', caption: '', cls: 'dashed-add' },
]

export default function GalleryPage() {
  useReveal()

  return (
    <div className="smv-section">
      <div className="section-tag">my art dump</div>
      <h2 className="section-title reveal">Gallery</h2>
      <p className="reveal" style={{ fontSize: '1rem', color: 'var(--brown-mid)', maxWidth: '60ch', marginBottom: '0.5rem' }}>
        digital doodles, illustrations, random creativity ✦
      </p>
      {/* <p className="reveal" style={{ marginBottom: '1.5rem' }}>
        <a className="smv-btn" href="https://shymilkshakevoid.my.canva.site" target="_blank" rel="noreferrer">
          Full Portfolio on Canva ↗
        </a>
      </p> */}
      <div className="gallery-grid">
        {GALLERY_TILES.map((tile, index) => (
          <div key={index} className={`gallery-tile reveal ${tile.cls}`}>
            {tile.video ? (
              <>
                <video src={tile.video} controls style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                {tile.caption && <div className="gt-caption">{tile.caption}</div>}
              </>
            ) : tile.img ? (
              <>
                <img src={tile.img} alt={tile.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                {tile.caption && <div className="gt-caption">{tile.caption}</div>}
              </>
            ) : (
              <>
                <span className="gt-icon">{tile.icon}</span>
                <span className="gt-label">{tile.label}</span>
                {tile.caption && <div className="gt-caption">{tile.caption}</div>}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
