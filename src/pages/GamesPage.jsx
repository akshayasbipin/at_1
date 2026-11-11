const GAME_HUB_URL = 'https://gameplay-dashboard.netlify.app/'

const GAMES = [
  { icon: '🎲', title: 'Snakes and Ladders', kind: 'A classic board-game race' },
  { icon: '🔤', title: 'Words Are Hard', kind: 'A word game for curious brains' },
  { icon: '🔐', title: 'Guess My Code', kind: 'A multiplayer code-breaking game' },
  { icon: '🖼️', title: 'Picture Game', kind: 'A multiplayer picture challenge' },
]

export default function GamesPage() {
  return (
    <div className="smv-section games-page">
      <div className="section-tag">press play</div>
      <h1 className="section-title">A little <span>game time</span></h1>
      <p className="games-intro">
        Pick a game in the hub. No account needed to try it as a guest.
      </p>

      <div className="games-grid">
        {GAMES.map((game) => (
          <article className="game-tile" key={game.title}>
            <span className="game-icon" aria-hidden="true">{game.icon}</span>
            <h2>{game.title}</h2>
            <p>{game.kind}</p>
          </article>
        ))}
      </div>

      <div className="games-entry">
        <span className="games-entry-icon" aria-hidden="true">🕹️</span>
        <div>
          <h2>Jump in as a guest</h2>
          <p>Choose Play as Guest in the hub, enter a display name, and pick a game. No sign-up needed.</p>
        </div>
        <a className="smv-btn filled" href={GAME_HUB_URL} target="_blank" rel="noreferrer">
          Play as Guest ↗
        </a>
      </div>
    </div>
  )
}