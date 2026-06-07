import { useEffect, useRef, useState } from 'react'

export function Cursor() {
  const cursorRef = useRef(null)
  const dotRef = useRef(null)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const move = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`
        cursorRef.current.style.top = `${e.clientY}px`
      }
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`
        dotRef.current.style.top = `${e.clientY}px`
      }
    }

    const onEnter = (e) => {
      if (e.target.closest('a,button,[role="button"]')) setHovered(true)
    }
    const onLeave = () => setHovered(false)

    document.addEventListener('mousemove', move)
    document.addEventListener('mouseover', onEnter)
    document.addEventListener('mouseout', onLeave)

    return () => {
      document.removeEventListener('mousemove', move)
      document.removeEventListener('mouseover', onEnter)
      document.removeEventListener('mouseout', onLeave)
    }
  }, [])

  return (
    <>
      <div id="smv-cursor" ref={cursorRef} className={hovered ? 'hovered' : ''} />
      <div id="smv-cursor-dot" ref={dotRef} />
    </>
  )
}
