const GAME_HUB_URL = 'https://gameplay-dashboard.netlify.app/'

export default function GamesPage() {
  return (
    <div className="smv-section games-page">
      <header className="games-heading">
        <div className="section-tag">press play</div>
        <h1 className="games-title">
          <span>My game</span>
          <span>collection</span>
        </h1>
        <p className="games-intro">
          A little collection of games I keep coming back to. Hope you find one you enjoy!
        </p>
      </header>

      <div className="games-hero">
        <div className="games-character-stage">
          <img
            className="games-character"
            src="/game_page_gif.gif"
            alt="Animated drawing of a person sitting with a playful pose"
          />
        </div>
        <div className="games-platform">
          <span className="games-platform-label">Ready when you are</span>
          <a className="games-start-button" href={GAME_HUB_URL} target="_blank" rel="noreferrer">
            <span>Play as guest</span>
            <span aria-hidden="true">↗</span>
          </a>
        </div>
        <p className="games-footnote">Pick a game in the hub. No sign-up needed to try it as a guest.</p>
      </div>
    </div>
  )
}