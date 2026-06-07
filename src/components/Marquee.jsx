const MARQUEE_WORDS = [
  'digital doodler', '✦', 'AI backend engineer', '✦', 'hobby hopper', '✦',
  'chronic new project starter', '✦', 'random researcher', '✦', 'polymathy', '✦',
  'digital doodler', '✦', 'AI backend engineer', '✦', 'hobby hopper', '✦',
  'chronic new project starter', '✦', 'random researcher', '✦', 'polymathy', '✦',
]

export function Marquee() {
  return (
    <div className="marquee-wrap">
      <div className="marquee-inner">
        {MARQUEE_WORDS.map((word, index) => (
          <span key={index}>{word}</span>
        ))}
      </div>
    </div>
  )
}
