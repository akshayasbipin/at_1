import { useReveal } from '../hooks/useReveal.js'

const GALLERY_TILES = [
  { icon: '🎨', label: 'Add Art Here', caption: 'your caption here', cls: '' },
  { icon: '✏️', label: 'Doodle', caption: 'your caption here', cls: '' },
  { icon: '🌸', label: 'Featured Piece', caption: 'your caption here', cls: 'featured' },
  { icon: '🖌️', label: 'Illustration', caption: 'your caption here', cls: '' },
  { icon: '✿', label: 'Pattern Study', caption: 'your caption here', cls: '' },
  { icon: '🎭', label: 'Character Study', caption: 'your caption here', cls: '' },
  { icon: '🌿', label: 'Nature Doodle', caption: 'your caption here', cls: '' },
  { icon: '💭', label: 'Concept Art', caption: 'your caption here', cls: '' },
  { icon: '＋', label: 'Add More', caption: '', cls: 'dashed-add' },
]

export default function GalleryPage() {
  useReveal()

  return (
    <div className="smv-section">
      <div className="section-tag">my art dump</div>
      <h2 className="section-title reveal">Gallery</h2>
      <p className="reveal" style={{ fontSize: '1rem', color: 'var(--brown-mid)', maxWidth: '60ch', marginBottom: '0.5rem' }}>
        digital doodles, illustrations, random creativity ✦ hover the tiles to peek.
      </p>
      <p className="reveal" style={{ marginBottom: '1.5rem' }}>
        <a className="smv-btn" href="https://shymilkshakevoid.my.canva.site" target="_blank" rel="noreferrer">
          Full Portfolio on Canva ↗
        </a>
      </p>
      <div className="gallery-grid">
        {GALLERY_TILES.map((tile, index) => (
          <div key={index} className={`gallery-tile reveal ${tile.cls}`}>
            <span className="gt-icon">{tile.icon}</span>
            <span className="gt-label">{tile.label}</span>
            {tile.caption && <div className="gt-caption">{tile.caption}</div>}
          </div>
        ))}
      </div>
      <p style={{ marginTop: '1.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--sand)', textAlign: 'center' }}>
        ↑ to add images: replace the placeholder divs with &lt;img src="./images/your-art.jpg"&gt; inside each .gallery-tile
      </p>
    </div>
  )
}
