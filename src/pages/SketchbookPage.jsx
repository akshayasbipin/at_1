import { Typewriter } from '../components/Typewriter.jsx'
import { useReveal } from '../hooks/useReveal.js'

const SKETCH_TILES = [
  { icon: '🌷', label: 'wip sketch', cls: 'tall bg-blush' },
  { icon: '📖', label: 'studies', cls: '' },
  { icon: '🎵', label: 'mood board', cls: 'bg-warm' },
  { icon: '✉️', label: 'add a quote / clipping', cls: 'wide bg-grey' },
  { icon: '🖼', label: 'process shot', cls: 'bg-warm' },
  { icon: '🌿', label: 'inspiration ref', cls: 'bg-blush' },
  { icon: '✿', label: 'colour palette', cls: 'bg-grey' },
  { icon: '✍', label: 'notes & ideas', cls: 'wide bg-blush' },
]

export default function SketchbookPage() {
  useReveal()

  return (
    <div className="smv-section">
      <div className="section-tag">wip & loose pages</div>
      <h2 className="section-title reveal">Sketch<span>Book</span></h2>
      <p className="reveal" style={{ fontSize: '1rem', color: 'var(--brown-mid)', maxWidth: '58ch', marginBottom: '0.5rem' }}>
        the unfinished, the experimental, the happy accidents — this is where art lives before it's "done" ✦
      </p>
      <a className="smv-btn reveal" href="https://shymilkshakevoid.my.canva.site" target="_blank" rel="noreferrer" style={{ marginBottom: '1.5rem', display: 'inline-block' }}>
        Full Portfolio on Canva ↗
      </a>
      <div className="sketchbook-grid" style={{ marginTop: '1.5rem' }}>
        {SKETCH_TILES.map((tile, index) => (
          <div key={index} className={`sketch-tile reveal ${tile.cls}`}>
            <div className={`tape${index % 3 === 0 ? ' left' : index % 3 === 2 ? ' right' : ''}`} />
            <span className="sketch-icon">{tile.icon}</span>
            <span className="sketch-label">{tile.label}</span>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '3rem', textAlign: 'center', padding: '2rem 0' }}>
        <Typewriter />
      </div>
    </div>
  )
}
