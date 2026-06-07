import { useEffect, useState } from 'react'
import { useReveal } from '../hooks/useReveal.js'

const PLAYLIST = [
  { id: 1, title: 'Amsham', artist: 'Aksomaniac, Circle Tone, Bhumi, M.H.R', duration: '5:40', videoId: 'r8iPHiciQd0' },
  { id: 2, title: "She'd Say", artist: 'Andy Gramer, Ladysmith Black Mambazo', duration: '4:01', videoId: 'MALzZRxr94g' },
  { id: 3, title: 'I Went Too Far', artist: 'AURORA', duration: '3:43', videoId: 'eT6dLJd3rYk' },
  { id: 4, title: 'TOUR SHIT!', artist: 'Seedhe Maut', duration: '2:54', videoId: 't_QZPzg-kTE' },
  { id: 5, title: "Teen Dost", artist: 'Seedhe Maut x Sez on the Beat', duration: '3:33', videoId: 'y-PF51nSwFI' },
]

const getIframeUrl = (videoId, auto) =>
  `https://www.youtube.com/embed/${videoId}?autoplay=${auto ? 1 : 0}&controls=1&rel=0&modestbranding=1`

export default function RadioPage() {
  useReveal()
  const [current, setCurrent] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [playerUrl, setPlayerUrl] = useState('')
  const track = PLAYLIST[current]

  useEffect(() => {
    if (!track) return
    if (playing) {
      setPlayerUrl(getIframeUrl(track.videoId, true))
    } else {
      setPlayerUrl('')
    }
  }, [track, playing])

  const togglePlay = () => {
    if (!track) return
    setPlaying((prev) => !prev)
  }

  const changeTrack = (index) => {
    if (!PLAYLIST.length) return
    setCurrent(index)
    setPlaying(true)
  }

  const prev = () => changeTrack((current - 1 + PLAYLIST.length) % PLAYLIST.length)
  const next = () => changeTrack((current + 1) % PLAYLIST.length)

  if (!PLAYLIST.length) {
    return (
      <div className="smv-section">
        <div className="section-tag">something to listen to</div>
        <h2 className="section-title reveal">Radio <span>♡</span></h2>
        <div className="radio-player reveal">
          <p style={{ margin: 0, color: 'var(--brown-mid)', lineHeight: 1.8 }}>
            No tracks are configured. Add up to 5 YouTube video IDs in the playlist and reload.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="smv-section">
      <div className="section-tag">something to listen to</div>
      <h2 className="section-title reveal">Radio <span>♡</span></h2>
      <p className="reveal" style={{ fontSize: '1rem', color: 'var(--brown-mid)', maxWidth: '55ch', marginBottom: '0.5rem' }}>
        my current listening pile — choose a YouTube track here, then use our player button to start it.
      </p>
      <div className="radio-player reveal">
        <div className="radio-display">
          <div style={{ fontSize: '0.7rem', opacity: 0.6, marginBottom: '0.5rem', letterSpacing: '0.15em' }}>
            {playing ? '▶ NOW PLAYING' : '■ PAUSED'} · TRACK {current + 1}/{PLAYLIST.length}
          </div>
          <div className="radio-track-title">{track.title}</div>
          <div className="radio-track-artist">{track.artist}</div>
        </div>
        <div style={{ marginBottom: '1.5rem' }}>
          {playerUrl ? (
            <iframe
              width="100%"
              height="260"
              src={playerUrl}
              title={`YouTube player - ${track.title}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div
              style={{
                minHeight: '260px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--brown-mid)',
                background: 'rgba(255,255,255,0.45)',
                border: '1px solid var(--sand)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.9rem',
              }}
            >
              Press play to load the selected YouTube video.
            </div>
          )}
        </div>
        <div className="radio-controls">
          <button className="radio-btn" onClick={prev}>
            <i className="ti ti-player-skip-back" />
          </button>
          <button className="radio-btn play-btn" onClick={togglePlay}>
            {playing ? <i className="ti ti-player-pause" /> : <i className="ti ti-player-play" />}
          </button>
          <button className="radio-btn" onClick={next}>
            <i className="ti ti-player-skip-forward" />
          </button>
        </div>
        <div className="radio-playlist">
          {PLAYLIST.map((trackItem, index) => (
            <div
              key={trackItem.id}
              className={`radio-playlist-item${current === index ? ' active' : ''}`}
              onClick={() => changeTrack(index)}
            >
              <span className="track-num">{String(index + 1).padStart(2, '0')}</span>
              <span style={{ flex: 1 }}>{trackItem.title}</span>
              <span style={{ opacity: 0.6, fontSize: '0.7rem' }}>{trackItem.artist}</span>
              <span style={{ marginLeft: '0.8rem', opacity: 0.5, fontSize: '0.7rem' }}>{trackItem.duration}</span>
            </div>
          ))}
        </div>
        <p style={{ marginTop: '1.2rem', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--sand)', opacity: 0.7 }}>
          ♡ the playlist lives here, but playback happens via YouTube iframe — our controls still stay on brand.
        </p>
      </div>
    </div>
  )
}
