import { useEffect, useState } from 'react'

const TW_LINES = [
  'a cozy corner for everything ♡',
  'chronic new project starter ✦',
  'vibes are permanent here',
  'hobby hopper & proud of it',
  'still figuring it out — and that is okay',
]

export function Typewriter() {
  const [text, setText] = useState('')
  const [lineIdx, setLineIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const line = TW_LINES[lineIdx]
    const delay = deleting ? 42 : 72

    const timeoutId = setTimeout(() => {
      if (!deleting) {
        if (charIdx < line.length) {
          setText(line.slice(0, charIdx + 1))
          setCharIdx((current) => current + 1)
        } else {
          setTimeout(() => setDeleting(true), 1600)
        }
      } else {
        if (charIdx > 0) {
          setText(line.slice(0, charIdx - 1))
          setCharIdx((current) => current - 1)
        } else {
          setDeleting(false)
          setLineIdx((current) => (current + 1) % TW_LINES.length)
        }
      }
    }, delay)

    return () => clearTimeout(timeoutId)
  }, [charIdx, deleting, lineIdx])

  return <span className="typewriter-line">{text}</span>
}
