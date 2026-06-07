import { useEffect } from 'react'

export function useReveal() {
  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal:not(.visible)')
    if (!revealElements.length) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), index * 70)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08 }
    )

    revealElements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  })
}
