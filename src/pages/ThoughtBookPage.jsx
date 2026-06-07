import { useState } from 'react'
import { useReveal } from '../hooks/useReveal.js'

const MOODS = ['✨ inspired', '🌙 dreamy', '🔥 fired up', '🌿 calm', '🤔 curious', '💭 rambling']

export default function ThoughtBookPage() {
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
    const date = now.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    setThoughts((prev) => [{ text: text.trim(), mood: activeMood, date }, ...prev])
    setText('')
  }

  return (
    <div className="smv-section">
      <div className="section-tag">inner monologue</div>
      <h2 className="section-title reveal">Thought <span>Book</span></h2>
      <p className="reveal" style={{ fontSize: '1rem', color: 'var(--brown-mid)', maxWidth: '55ch', marginBottom: '2rem' }}>
        half-formed thoughts, quotes that won't leave me alone, small rants — this is the brain dump corner ✦
      </p>
      <div className="thought-book">
        <div className="thought-input-area reveal">
          <div className="thought-moods">
            {MOODS.map((mood) => (
              <button
                key={mood}
                className={`mood-tag${activeMood === mood ? ' active' : ''}`}
                onClick={() => setActiveMood(mood)}
              >
                {mood}
              </button>
            ))}
          </div>
          <textarea
            className="thought-textarea"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="write something... a quote, a thought, a tiny rant ♡"
            maxLength={400}
            rows={4}
          />
          <div className="thought-footer-row">
            <span className="thought-char">{text.length}/400</span>
            <button className="smv-btn filled" onClick={addThought}>
              Add Thought →
            </button>
          </div>
        </div>
        <div className="thought-list">
          {thoughts.map((thought, index) => (
            <div key={index} className="thought-entry reveal">
              <div className="thought-date">{thought.mood} · {thought.date}</div>
              <div className="thought-text">{thought.text}</div>
              <button className="thought-del" onClick={() => setThoughts((prev) => prev.filter((_, idx) => idx !== index))}>
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
