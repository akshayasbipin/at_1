import { useState } from 'react'
import { useReveal } from '../hooks/useReveal.js'

// ── Supabase client (reads from .env.local) ───────────────────────────────────
const supabaseUrl  = import.meta.env.VITE_SUPABASE_URL
const supabaseKey  = import.meta.env.VITE_SUPABASE_ANON_KEY

// Only create client if env vars exist (prevents crash during local dev before setup)
const supabase = supabaseUrl && supabaseKey
  ? createClient(supabaseUrl, supabaseKey)
  : null

// ── Constants ─────────────────────────────────────────────────────────────────
const EMOJIS      = ['🌸', '✨', '🎨', '🌿', '♡', '✦', '🎀', '🍓', '🌙', '🦋']
const MAX_NAME    = 40
const MAX_MSG     = 300
const PAGE_SIZE   = 10   // how many entries to load at once

// Shown while Supabase isn't configured yet so the UI still looks nice
// const PLACEHOLDER_ENTRIES = [
//   { id: -1, name: 'a visitor ♡',      message: 'love the vibe of this corner of the internet!!',         emoji: '🌸', created_at: null },
//   { id: -2, name: 'anonymous friend', message: 'the blog on Indian heroines was genuinely moving. more please!', emoji: '✨', created_at: null },
// ]

export default function GuestbookPage() {
  useReveal()
  const [entries, setEntries] = useState(SEED_ENTRIES)
  const [name, setName] = useState('')
  const [msg, setMsg] = useState('')
  const [emoji, setEmoji] = useState('🌸')
  const emojis = ['🌸', '✨', '🎨', '🌿', '♡', '✦', '🎀', '🍓']

  const submit = () => {
    if (!msg.trim()) return
    const now = new Date()
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    setEntries((prev) => [{ name: name.trim() || 'anonymous visitor', msg: msg.trim(), emoji, time }, ...prev])
    setName('')
    setMsg('')
  }

  return (
    <div className="smv-section">
      <div className="section-tag">leave a trace</div>
      <h2 className="section-title reveal">Guest<span>book</span></h2>
      <p className="reveal" style={{ fontSize: '1rem', color: 'var(--brown-mid)', maxWidth: '55ch', marginBottom: '0.5rem' }}>
        say hi, drop a thought, leave a flower emoji — this is a cozy log of everyone who passed through ✦
      </p>
      <div className="guestbook-layout">
        <div className="gb-form-card reveal">
          <div className="section-tag" style={{ marginBottom: '1rem' }}>write something ♡</div>
          <div className="gb-field">
            <label className="gb-label">your name (or stay anon)</label>
            <input className="gb-input" value={name} onChange={(e) => setName(e.target.value)} placeholder="mysterious visitor..." maxLength={40} />
          </div>
          <div className="gb-field">
            <label className="gb-label">pick a little emoji</label>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {emojis.map((item) => (
                <button
                  key={item}
                  onClick={() => setEmoji(item)}
                  style={{
                    fontSize: '1.3rem',
                    background: emoji === item ? 'var(--blush)' : 'transparent',
                    border: emoji === item ? '1.5px solid var(--dusty-rose)' : '1.5px solid transparent',
                    cursor: 'pointer',
                    padding: '0.2rem 0.4rem',
                    transition: 'all .15s',
                  }}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div className="gb-field">
            <label className="gb-label">your message</label>
            <textarea
              className="gb-textarea"
              rows={4}
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              placeholder="leave a thought, a hello, a poem..."
              maxLength={280}
            />
          </div>
          <button className="smv-btn filled" onClick={submit}>
            Leave a Note →
          </button>
        </div>
        <div className="reveal">
          <div className="section-tag" style={{ marginBottom: '1rem' }}>notes left behind</div>
          <div className="gb-entries">
            {entries.map((entry, index) => (
              <div className="gb-entry" key={index}>
                <span className="gb-entry-emoji">{entry.emoji}</span>
                <div className="gb-entry-name">{entry.name}</div>
                <div className="gb-entry-msg">{entry.msg}</div>
                <div className="gb-entry-time">{entry.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
