import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@supabase/supabase-js'
import { useReveal } from '../hooks/useReveal.js'

// ── Supabase client ───────────────────────────────────────────────────────────
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY
const ADMIN_PW    = import.meta.env.VITE_THOUGHT_ADMIN_PW || '__not_set__'

const supabase = supabaseUrl && supabaseKey
  ? createClient(supabaseUrl, supabaseKey)
  : null

// ── Constants ─────────────────────────────────────────────────────────────────
const MOODS   = ['✨ inspired', '🌙 dreamy', '🔥 fired up', '🌿 calm', '🤔 curious', '💭 rambling']
const MAX_LEN = 400

// Shown in demo / before Supabase is connected
const SEED = [
  { id: -1, text: '"Growth is growth, no matter how small" — holding onto this one.', mood: '✨ inspired', created_at: '2026-06-01T10:00:00Z' },
  { id: -2, text: 'The world now seems to lack humanity, shaped too heavily by those who\'ve always held power. common sense has to appear, right?', mood: '🤔 curious', created_at: '2026-05-20T14:30:00Z' },
  { id: -3, text: 'AI isn\'t bad, it\'s the lack of ethics — same as the internet. we\'ve been here before.', mood: '🔥 fired up', created_at: '2026-05-10T09:00:00Z' },
]

// ── Helpers ───────────────────────────────────────────────────────────────────
function formatDate(iso) {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

// ── Tiny lock button ──────────────────────────────────────────────────────────
function LockButton({ isAdmin, onClick }) {
  return (
    <button
      onClick={onClick}
      title={isAdmin ? 'Admin mode active — click to lock' : 'Admin login'}
      style={{
        position: 'fixed', bottom: '5.5rem', right: '2rem', zIndex: 700,
        width: '38px', height: '38px',
        background: isAdmin ? 'var(--sage)' : 'var(--cream-warm)',
        border: `1.5px solid ${isAdmin ? 'var(--sage)' : 'var(--dusty-rose)'}`,
        borderRadius: '50%',
        cursor: 'pointer', fontSize: '1rem',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '2px 2px 0 rgba(61,43,31,0.12)',
        transition: 'all 0.2s',
        color: isAdmin ? 'white' : 'var(--brown-mid)',
      }}
    >
      {isAdmin ? '🔓' : '🔒'}
    </button>
  )
}

// ── Password modal ────────────────────────────────────────────────────────────
function PasswordModal({ onClose, onSuccess }) {
  const [pw, setPw]       = useState('')
  const [err, setErr]     = useState(false)
  const [shake, setShake] = useState(false)

  const attempt = () => {
    if (pw === ADMIN_PW) { onSuccess(); onClose() }
    else {
      setErr(true); setShake(true); setPw('')
      setTimeout(() => setShake(false), 500)
    }
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 990,
      background: 'rgba(61,43,31,0.5)', backdropFilter: 'blur(4px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div style={{
        background: 'var(--cream-light)',
        border: '1.5px solid var(--sand)',
        padding: '2.5rem 2rem', width: '100%', maxWidth: '360px',
        position: 'relative',
        animation: shake ? 'shakeModal 0.4s ease' : 'none',
      }}>
        {/* shadow offset */}
        <div style={{ position:'absolute', top:7, left:7, right:-7, bottom:-7, border:'1.5px solid var(--dusty-rose)', zIndex:-1 }} />

        <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.65rem', letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--sage)', marginBottom:'0.8rem' }}>
          ◆ admin access
        </div>
        <h3 style={{ fontFamily:'var(--font-display)', fontSize:'1.4rem', color:'var(--brown-deep)', marginBottom:'0.4rem' }}>
          Thought Book
        </h3>
        <p style={{ fontFamily:'var(--font-mono)', fontSize:'0.78rem', color:'var(--brown-mid)', marginBottom:'1.5rem', lineHeight:1.6 }}>
          this is your private corner ♡<br />enter your password to write & edit
        </p>

        <input
          type="password"
          autoFocus
          value={pw}
          onChange={e => { setPw(e.target.value); setErr(false) }}
          onKeyDown={e => e.key === 'Enter' && attempt()}
          placeholder="password..."
          style={{
            width: '100%', fontFamily:'var(--font-mono)', fontSize:'0.9rem',
            background: 'var(--cream-warm)', color:'var(--brown-deep)',
            border: `1px solid ${err ? 'var(--terracotta)' : 'var(--cream-warm)'}`,
            padding: '0.55rem 0.75rem', outline:'none', marginBottom:'0.5rem',
            transition: 'border-color 0.2s',
          }}
        />
        {err && (
          <p style={{ fontFamily:'var(--font-mono)', fontSize:'0.7rem', color:'var(--terracotta)', marginBottom:'0.8rem' }}>
            incorrect password — try again ♡
          </p>
        )}

        <div style={{ display:'flex', gap:'0.8rem', justifyContent:'flex-end', marginTop:'0.8rem' }}>
          <button className="smv-btn" onClick={onClose}>cancel</button>
          <button className="smv-btn filled" onClick={attempt}>unlock →</button>
        </div>
      </div>

      <style>{`
        @keyframes shakeModal {
          0%,100% { transform: translateX(0); }
          20%      { transform: translateX(-8px); }
          40%      { transform: translateX(8px); }
          60%      { transform: translateX(-5px); }
          80%      { transform: translateX(5px); }
        }
      `}</style>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────
export default function ThoughtBookPage() {
  useReveal()

  const [thoughts,    setThoughts]   = useState([])
  const [loading,     setLoading]    = useState(true)
  const [error,       setError]      = useState(null)

  // admin state — lives in sessionStorage so survives React re-renders but not tab closes
  const [isAdmin,     setIsAdmin]    = useState(() => sessionStorage.getItem('smv_admin') === '1')
  const [showModal,   setShowModal]  = useState(false)
  const [lockoutMsg,  setLockoutMsg] = useState(null)

  // write form state
  const [text,        setText]       = useState('')
  const [activeMood,  setActiveMood] = useState(MOODS[0])
  const [submitting,  setSubmitting] = useState(false)
  const [feedback,    setFeedback]   = useState(null)

  // delete confirm
  const [pendingDel,  setPendingDel] = useState(null)  // id to delete

  // ── Fetch ──────────────────────────────────────────────────────────────────
  const fetchThoughts = useCallback(async () => {
    if (!supabase) { setThoughts(SEED); setLoading(false); return }
    setLoading(true); setError(null)
    const { data, error: err } = await supabase
      .from('thoughts')
      .select('*')
      .order('created_at', { ascending: false })
    setLoading(false)
    if (err) { setError(err.message); return }
    setThoughts(data)
  }, [])

  useEffect(() => { fetchThoughts() }, [fetchThoughts])

  // ── Real-time: new thoughts appear live ────────────────────────────────────
  useEffect(() => {
    if (!supabase) return
    const ch = supabase.channel('thoughts-rt')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'thoughts' }, (p) => {
        // Deduplicate: skip if we already added this row optimistically
        setThoughts(prev => prev.some(t => t.id === p.new.id) ? prev : [p.new, ...prev])
      })
      .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'thoughts' }, (p) => {
        // Already removed optimistically — this is a no-op if the id is already gone
        setThoughts(prev => prev.filter(t => t.id !== p.old.id))
      })
      .subscribe()
    return () => supabase.removeChannel(ch)
  }, [])

  // ── Admin unlock / lock ────────────────────────────────────────────────────
  const unlock = () => { setIsAdmin(true); sessionStorage.setItem('smv_admin', '1') }
  const lock   = () => { setIsAdmin(false); sessionStorage.removeItem('smv_admin'); setText('') }

  const handleLockClick = () => {
    if (isAdmin) { lock() }
    else {
      if (ADMIN_PW === '__not_set__') {
        setLockoutMsg('Set VITE_THOUGHT_ADMIN_PW in .env.local first ♡')
        setTimeout(() => setLockoutMsg(null), 3500)
        return
      }
      setShowModal(true)
    }
  }

  // ── Add thought ────────────────────────────────────────────────────────────
  const addThought = async () => {
    if (!text.trim() || !isAdmin) return
    setSubmitting(true)

    if (!supabase) {
      // demo
      const fake = { id: Date.now(), text: text.trim(), mood: activeMood, created_at: new Date().toISOString() }
      setThoughts(prev => [fake, ...prev])
      setText('')
      setFeedback({ type: 'success', msg: 'added (demo mode — connect Supabase to persist) ♡' })
      setTimeout(() => setFeedback(null), 3500)
      setSubmitting(false)
      return
    }

    // .select().single() returns the new row with its real id + created_at
    const { data: inserted, error: err } = await supabase
      .from('thoughts')
      .insert([{ text: text.trim(), mood: activeMood }])
      .select()
      .single()

    setSubmitting(false)
    if (err) { setFeedback({ type: 'error', msg: err.message }); setTimeout(() => setFeedback(null), 4000); return }

    // Optimistic update — show immediately, real-time event will be deduped
    setThoughts(prev => [inserted, ...prev])
    setText('')
    setFeedback({ type: 'success', msg: 'thought added ♡' })
    setTimeout(() => setFeedback(null), 2500)
  }

  // ── Delete thought ─────────────────────────────────────────────────────────
  const confirmDelete = async (id) => {
    if (!isAdmin) return
    setPendingDel(null)

    if (!supabase) { setThoughts(prev => prev.filter(t => t.id !== id)); return }

    // Optimistic removal — remove from UI immediately
    setThoughts(prev => prev.filter(t => t.id !== id))

    const { error: err } = await supabase.from('thoughts').delete().eq('id', id)
    if (err) {
      // Roll back: re-fetch from DB so the accidentally-removed entry comes back
      fetchThoughts()
      setFeedback({ type: 'error', msg: 'delete failed — entry restored: ' + err.message })
      setTimeout(() => setFeedback(null), 4000)
    }
  }

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <>
      {/* Lock button — always visible */}
      <LockButton isAdmin={isAdmin} onClick={handleLockClick} />

      {/* Env warning */}
      {lockoutMsg && (
        <div style={{
          position:'fixed', bottom:'7rem', right:'2rem', zIndex:700,
          fontFamily:'var(--font-mono)', fontSize:'0.72rem',
          background:'var(--blush)', border:'1.5px solid var(--dusty-rose)',
          padding:'0.6rem 1rem', maxWidth:'220px', lineHeight:1.5,
          color:'var(--brown-deep)', boxShadow:'3px 3px 0 rgba(61,43,31,.1)',
        }}>
          {lockoutMsg}
        </div>
      )}

      {/* Password modal */}
      {showModal && (
        <PasswordModal onClose={() => setShowModal(false)} onSuccess={unlock} />
      )}

      {/* Delete confirmation */}
      {pendingDel !== null && (
        <div style={{
          position:'fixed', inset:0, zIndex:990,
          background:'rgba(61,43,31,0.45)', backdropFilter:'blur(3px)',
          display:'flex', alignItems:'center', justifyContent:'center',
        }}>
          <div style={{
            background:'var(--cream-light)', border:'1.5px solid var(--sand)',
            padding:'2rem', maxWidth:'320px', width:'100%', textAlign:'center',
          }}>
            <p style={{ fontFamily:'var(--font-body)', fontSize:'1.05rem', color:'var(--brown-deep)', marginBottom:'1.5rem', lineHeight:1.6 }}>
              delete this thought permanently?<br />
              <span style={{ fontSize:'0.85rem', color:'var(--brown-mid)' }}>this can't be undone ✕</span>
            </p>
            <div style={{ display:'flex', gap:'0.8rem', justifyContent:'center' }}>
              <button className="smv-btn" onClick={() => setPendingDel(null)}>keep it</button>
              <button className="smv-btn filled" onClick={() => confirmDelete(pendingDel)}>delete →</button>
            </div>
          </div>
        </div>
      )}

      <div className="smv-section">
        <div className="section-tag">inner monologue</div>
        <h2 className="section-title reveal">Thought <span>Book</span></h2>
        <p className="reveal" style={{ fontSize:'1rem', color:'var(--brown-mid)', maxWidth:'55ch', marginBottom:'2rem' }}>
          half-formed thoughts, quotes that won't leave me alone, small rants — this is the brain dump corner ✦
        </p>

        {/* No-Supabase banner */}
        {!supabase && (
          <div style={{
            fontFamily:'var(--font-mono)', fontSize:'0.75rem',
            background:'var(--blush)', border:'1.5px dashed var(--dusty-rose)',
            padding:'0.8rem 1.2rem', marginBottom:'1.5rem', color:'var(--brown-deep)', lineHeight:1.6,
          }}>
            ⚠ <strong>Demo mode</strong> — add Supabase keys + <code>VITE_THOUGHT_ADMIN_PW</code> to <code>.env.local</code> to persist entries.
          </div>
        )}

        <div className="thought-book">

          {/* ── Write form (admin only) ── */}
          {isAdmin && (
            <div className="thought-input-area reveal" style={{ borderColor:'var(--sage)', position:'relative' }}>
              <div style={{
                position:'absolute', top:'-0.9rem', right:'0.8rem',
                fontFamily:'var(--font-mono)', fontSize:'0.62rem', letterSpacing:'0.15em',
                background:'var(--sage)', color:'white', padding:'0.15rem 0.5rem',
              }}>
                ✓ ADMIN
              </div>

              <div className="thought-moods">
                {MOODS.map(mood => (
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
                onChange={e => setText(e.target.value)}
                placeholder="write something... a quote, a thought, a tiny rant ♡"
                maxLength={MAX_LEN}
                rows={4}
              />

              <div className="thought-footer-row">
                <span className="thought-char" style={{ color: text.length > MAX_LEN * 0.9 ? 'var(--terracotta)' : 'var(--sand)' }}>
                  {text.length}/{MAX_LEN}
                </span>
                <button
                  className="smv-btn filled"
                  onClick={addThought}
                  disabled={submitting || !text.trim()}
                  style={{ opacity: submitting || !text.trim() ? 0.6 : 1 }}
                >
                  {submitting ? 'Saving...' : 'Add Thought →'}
                </button>
              </div>

              {feedback && (
                <div style={{
                  marginTop:'0.6rem', fontFamily:'var(--font-mono)', fontSize:'0.72rem',
                  color: feedback.type === 'success' ? 'var(--sage)' : 'var(--terracotta)',
                  padding:'0.4rem 0.6rem',
                  background: feedback.type === 'success' ? 'rgba(122,140,90,0.1)' : 'rgba(184,92,56,0.1)',
                  border: `1px solid ${feedback.type === 'success' ? 'var(--sage)' : 'var(--terracotta)'}`,
                }}>
                  {feedback.msg}
                </div>
              )}
            </div>
          )}

          {/* ── Thought list ── */}
          {error && (
            <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.75rem', color:'var(--terracotta)', marginBottom:'1rem' }}>
              {error} — <button onClick={fetchThoughts} style={{ background:'none', border:'none', color:'var(--terracotta)', cursor:'pointer', textDecoration:'underline', fontFamily:'var(--font-mono)', fontSize:'0.75rem' }}>retry</button>
            </div>
          )}

          {loading && thoughts.length === 0
            ? Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="thought-entry" style={{ opacity:0.35 }}>
                  <div style={{ height:'0.7rem', background:'var(--cream-warm)', width:'30%', borderRadius:2, marginBottom:'0.5rem' }} />
                  <div style={{ height:'0.85rem', background:'var(--cream-warm)', width:'80%', borderRadius:2 }} />
                </div>
              ))
            : (
              <div className="thought-list">
                {thoughts.map((thought) => (
                  <div key={thought.id} className="thought-entry reveal">
                    <div className="thought-date">
                      {thought.mood} · {formatDate(thought.created_at)}
                    </div>
                    <div className="thought-text">{thought.text}</div>

                    {/* Delete — only visible to admin */}
                    {isAdmin && (
                      <button
                        className="thought-del"
                        onClick={() => setPendingDel(thought.id)}
                        title="delete this thought"
                        style={{ opacity:1, color:'var(--terracotta)' }}
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}

                {thoughts.length === 0 && !loading && (
                  <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.82rem', color:'var(--sand)', padding:'1rem 0', textAlign:'center' }}>
                    no thoughts yet — unlock and write your first one ♡
                  </div>
                )}
              </div>
            )
          }
        </div>
      </div>
    </>
  )
}
