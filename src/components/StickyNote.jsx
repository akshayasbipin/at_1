import { useState } from 'react'

export function StickyNote() {
  const [visible, setVisible] = useState(true)

  if (!visible) return null

  return (
    <div className="sticky-note">
      <button className="sticky-close" onClick={() => setVisible(false)}>
        ✕
      </button>
      ✨ updates may be inconsistent but vibes are permanent ♡
    </div>
  )
}
