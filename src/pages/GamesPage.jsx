import snakesAndLaddersIcon from '../icons/snakes_and_ladders.png'
import wordsAreHardIcon from '../icons/words_are_hard.png'
import guessMyCodeIcon from '../icons/crack-the-code.webp'
import pictureGameIcon from '../icons/picture_game.png'

const GAME_HUB_URL = 'https://gameplay-dashboard.netlify.app/'

const GAMES = [
  { icon: snakesAndLaddersIcon, title: 'Snakes and Ladders', kind: 'A classic board-game race' },
  { icon: wordsAreHardIcon, title: 'Words Are Hard', kind: 'guess a word that starts with the same letter as the emoji' },
  { icon: guessMyCodeIcon, title: 'Guess My Code', kind: 'code-breaking game, guess who breaks the code first' },
  { icon: pictureGameIcon, title: 'Picture Game', kind: 'A multiplayer picture challenge' },
]

export default function GamesPage() {
  return (
    <div className="smv-section games-page">
      <div className="section-tag">press play</div>
      <h1 className="section-title">A little <span>game time</span></h1>
      <p className="games-intro">
        Pick a game in the hub. No account needed to try it as a guest. DW there are single player games as well
      </p>

      <div className="games-grid">
        {GAMES.map((game) => (
          <article className="game-tile" key={game.title}>
            <img className="game-icon" src={game.icon} alt="" />
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