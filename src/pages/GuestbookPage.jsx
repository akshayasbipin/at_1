import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@supabase/supabase-js'
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
const PLACEHOLDER_ENTRIES = [
  { id: -1, name: 'a visitor ♡',      message: 'love the vibe of this corner of the internet!!',         emoji: '🌸', created_at: null },
  { id: -2, name: 'anonymous friend', message: 'the blog on Indian heroines was genuinely moving. more please!', emoji: '✨', created_at: null },
]

// ── Helpers ───────────────────────────────────────────────────────────────────
function formatTime(iso) {
  if (!iso) return 'just now'
  const d = new Date(iso)
  const now = new Date()
  const diffMs = now - d
  const diffMin = Math.floor(diffMs / 60000)
  if (diffMin < 1)   return 'just now'
  if (diffMin < 60)  return `${diffMin}m ago`
  const diffH = Math.floor(diffMin / 60)
  if (diffH < 24)    return `${diffH}h ago`
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

// Basic profanity / spam guard (extend as needed)
const BLOCKED = ['spam', 'http://', 'https://', 'buy now', 'click here']
function isSafe(text) {
  const lower = text.toLowerCase()
  return !BLOCKED.some(w => lower.includes(w))
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function GuestbookPage() {
  useReveal()

  const [entries,     setEntries]     = useState([])
  const [loading,     setLoading]     = useState(true)
  const [submitting,  setSubmitting]  = useState(false)
  const [error,       setError]       = useState(null)
  const [submitMsg,   setSubmitMsg]   = useState(null)   // success / error feedback
  const [hasMore,     setHasMore]     = useState(false)
  const [offset,      setOffset]      = useState(0)

  // form state
  const [name,  setName]  = useState('')
  const [msg,   setMsg]   = useState('')
  const [emoji, setEmoji] = useState('🌸')

  // ── Fetch entries ────────────────────────────────────────────────────────────
  const fetchEntries = useCallback(async (reset = false) => {
    if (!supabase) {
      // No Supabase configured — show placeholder data
      setEntries(PLACEHOLDER_ENTRIES)
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)

    const start = reset ? 0 : offset

    const { data, error: fetchErr, count } = await supabase
      .from('guestbook')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(start, start + PAGE_SIZE - 1)

    setLoading(false)

    if (fetchErr) {
      setError('Couldn\'t load entries — ' + fetchErr.message)
      return
    }

    if (reset) {
      setEntries(data)
      setOffset(PAGE_SIZE)
    } else {
      setEntries(prev => [...prev, ...data])
      setOffset(start + PAGE_SIZE)
    }

    setHasMore(count > (start + PAGE_SIZE))
  }, [offset])

  useEffect(() => { fetchEntries(true) }, []) // eslint-disable-line

  // ── Real-time subscription: new rows appear instantly for all visitors ────────
  useEffect(() => {
    if (!supabase) return

    const channel = supabase
      .channel('guestbook-realtime')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'guestbook' },
        (payload) => {
          // Deduplicate: if we already added this row optimistically (same id), skip it
          setEntries(prev => {
            if (prev.some(e => e.id === payload.new.id)) return prev
            return [payload.new, ...prev]
          })
        }
      )
      .subscribe()

    return () => supabase.removeChannel(channel)
  }, [])

  // ── Submit handler ────────────────────────────────────────────────────────────
  const submit = async () => {
    const trimmedMsg  = msg.trim()
    const trimmedName = name.trim()

    if (!trimmedMsg) return

    // Client-side safety check
    if (!isSafe(trimmedMsg) || !isSafe(trimmedName)) {
      setSubmitMsg({ type: 'error', text: 'Message contains blocked content — please keep it cozy ♡' })
      setTimeout(() => setSubmitMsg(null), 4000)
      return
    }

    if (!supabase) {
      // Offline demo mode — just prepend locally
      const fake = {
        id: Date.now(),
        name: trimmedName || 'anonymous visitor',
        message: trimmedMsg,
        emoji,
        created_at: new Date().toISOString(),
      }
      setEntries(prev => [fake, ...prev])
      setName(''); setMsg('')
      setSubmitMsg({ type: 'success', text: '(demo mode — connect Supabase to persist!) ♡' })
      setTimeout(() => setSubmitMsg(null), 4000)
      return
    }

    setSubmitting(true)
    setSubmitMsg(null)

    // Use .select().single() so Supabase returns the inserted row with its real id + created_at
    const { data: inserted, error: insertErr } = await supabase
      .from('guestbook')
      .insert([{
        name:    trimmedName || 'anonymous visitor',
        message: trimmedMsg,
        emoji,
      }])
      .select()
      .single()

    setSubmitting(false)

    if (insertErr) {
      setSubmitMsg({ type: 'error', text: 'Something went wrong — try again? ' + insertErr.message })
    } else {
      // Optimistic update — prepend immediately instead of waiting for real-time round-trip
      setEntries(prev => [inserted, ...prev])
      setName(''); setMsg('')
      setSubmitMsg({ type: 'success', text: 'Note left ♡ thank you for passing through!' })
    }

    setTimeout(() => setSubmitMsg(null), 4000)
  }

  // ── Render ────────────────────────────────────────────────────────────────────
  return (
    <div className="smv-section">
      <div className="section-tag">leave a trace</div>
      <h2 className="section-title reveal">Guest<span>book</span></h2>
      <p className="reveal" style={{ fontSize: '1rem', color: 'var(--brown-mid)', maxWidth: '55ch', marginBottom: '0.5rem' }}>
        say hi, drop a thought, leave a flower emoji — a cozy log of everyone who passed through ✦
      </p>

      {/* ── No-Supabase warning banner ── */}
      {!supabase && (
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.75rem',
          background: 'var(--blush)', border: '1.5px dashed var(--dusty-rose)',
          padding: '0.8rem 1.2rem', marginBottom: '1.5rem', color: 'var(--brown-deep)',
          lineHeight: 1.6,
        }}>
          ⚠ <strong>Demo mode</strong> — entries won't persist until you add your Supabase keys to <code>.env.local</code>.
          See the setup instructions at the top of <code>GuestbookPage.jsx</code>.
        </div>
      )}

      <div className="guestbook-layout">

        {/* ── LEFT: Form ── */}
        <div className="gb-form-card reveal">
          <div className="section-tag" style={{ marginBottom: '1rem' }}>write something ♡</div>

          <div className="gb-field">
            <label className="gb-label">your name (or stay anon)</label>
            <input
              className="gb-input"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="mysterious visitor..."
              maxLength={MAX_NAME}
            />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--sand)', alignSelf: 'flex-end' }}>
              {name.length}/{MAX_NAME}
            </span>
          </div>

          <div className="gb-field">
            <label className="gb-label">pick a little emoji</label>
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              {EMOJIS.map(e => (
                <button
                  key={e}
                  onClick={() => setEmoji(e)}
                  style={{
                    fontSize: '1.3rem',
                    background: emoji === e ? 'var(--blush)' : 'transparent',
                    border: emoji === e ? '1.5px solid var(--dusty-rose)' : '1.5px solid transparent',
                    cursor: 'pointer', padding: '0.2rem 0.4rem', transition: 'all .15s',
                  }}
                >
                  {e}
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
              onChange={e => setMsg(e.target.value)}
              placeholder="leave a thought, a hello, a poem..."
              maxLength={MAX_MSG}
            />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: msg.length > MAX_MSG * 0.9 ? 'var(--terracotta)' : 'var(--sand)', alignSelf: 'flex-end' }}>
              {msg.length}/{MAX_MSG}
            </span>
          </div>

          <button
            className="smv-btn filled"
            onClick={submit}
            disabled={submitting || !msg.trim()}
            style={{ opacity: submitting || !msg.trim() ? 0.6 : 1, cursor: submitting ? 'wait' : 'pointer' }}
          >
            {submitting ? 'Sending...' : 'Leave a Note →'}
          </button>

          {/* Feedback message */}
          {submitMsg && (
            <div style={{
              marginTop: '0.8rem',
              fontFamily: 'var(--font-mono)', fontSize: '0.75rem',
              color: submitMsg.type === 'success' ? 'var(--sage)' : 'var(--terracotta)',
              padding: '0.5rem 0.7rem',
              background: submitMsg.type === 'success' ? 'rgba(122,140,90,0.1)' : 'rgba(184,92,56,0.1)',
              border: `1px solid ${submitMsg.type === 'success' ? 'var(--sage)' : 'var(--terracotta)'}`,
              animation: 'slideIn 0.3s ease',
            }}>
              {submitMsg.text}
            </div>
          )}
        </div>

        {/* ── RIGHT: Entries ── */}
        <div className="reveal">
          <div className="section-tag" style={{ marginBottom: '1rem' }}>
            notes left behind
          </div>

          {error && (
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--terracotta)', marginBottom: '1rem' }}>
              {error} — <button onClick={() => fetchEntries(true)} style={{ background: 'none', border: 'none', color: 'var(--terracotta)', cursor: 'pointer', textDecoration: 'underline', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>retry</button>
            </div>
          )}

          <div className="gb-entries">
            {loading && entries.length === 0
              ? Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="gb-entry" style={{ opacity: 0.4, animation: 'pulse 1.5s ease-in-out infinite' }}>
                    <div className="gb-entry-name" style={{ background: 'var(--cream-warm)', height: '0.9rem', width: '40%', borderRadius: 2 }} />
                    <div className="gb-entry-msg"  style={{ background: 'var(--cream-warm)', height: '0.8rem', width: '80%', borderRadius: 2, marginTop: '0.4rem' }} />
                  </div>
                ))
              : entries.map((entry) => (
                  <div className="gb-entry" key={entry.id}>
                    <span className="gb-entry-emoji">{entry.emoji}</span>
                    <div className="gb-entry-name">{entry.name}</div>
                    <div className="gb-entry-msg">{entry.message}</div>
                    <div className="gb-entry-time">{formatTime(entry.created_at)}</div>
                  </div>
                ))
            }
          </div>

          {/* Load more */}
          {hasMore && (
            <button
              className="smv-btn"
              onClick={() => fetchEntries(false)}
              disabled={loading}
              style={{ marginTop: '1.2rem', opacity: loading ? 0.6 : 1 }}
            >
              {loading ? 'Loading...' : 'Load more →'}
            </button>
          )}

          {entries.length === 0 && !loading && !error && (
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'var(--sand)', padding: '1rem 0', textAlign: 'center' }}>
              no notes yet — be the first! ♡
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
