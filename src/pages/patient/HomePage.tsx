import { GAMES, BOARD_GAMES, ROUTINE_TYPES } from '../../data/catalog'
import { atTime, formatDate, formatTime, greeting, time12 } from '../../lib/date'
import { useAppState } from '../../state/AppStateContext'
import { AppIcon } from '../../components/AppIcon'
import { GameTile, SampleBanner } from '../../components/ui'

export function HomePage() {
  const { state, isDone, toggleDone } = useAppState()
  const now = new Date()
  const pending = state.routine
    .filter((item) => {
      return !isDone(item.id)
    })
    .sort((first, second) => {
      return first.time.localeCompare(second.time)
    })
  const next =
    pending.find((item) => {
      return atTime(item.time) > now
    }) ?? pending[0]

  const readToday = () => {
    if (!state.settings.sound) {
      return
    }

    const words = `${greeting()}, ${state.settings.name}. Today is ${formatDate(now)}. ${next ? `Next is ${next.title} at ${time12(next.time)}.` : 'Your day is clear.'}`

    speechSynthesis.cancel()
    speechSynthesis.speak(new SpeechSynthesisUtterance(words))
  }

  return (
    <>
      {state.sample && <SampleBanner />}
      <section className="home-intro" aria-label="Today">
        <div className="hero">
          <p className="eyebrow">Today · {formatDate(now)}</p>
          <h1>
            <span>{greeting()},</span> {state.settings.name}.
          </h1>
          <p className="hero-lead">
            One clear step at a time. Your day, memories and activities are all here.
          </p>
          <button className="btn hero-action" onClick={readToday}>
            <AppIcon name="volume" size={22} />
            Read today to me
          </button>
        </div>
        <aside className="today-panel">
          <div className="time-block">
            <span className="micro-label">Local time</span>
            <p className="clock">{formatTime(now)}</p>
          </div>
          {next ? (
            <div className="next" aria-label="Next in your day">
              <span className="next-icon" aria-hidden="true">
                <AppIcon name={ROUTINE_TYPES[next.type][0]} size={34} />
              </span>
              <div>
                <p className="eyebrow">Next · {time12(next.time)}</p>
                <h2>{next.title}</h2>
                {next.note && <p className="muted">{next.note}</p>}
              </div>
              {atTime(next.time) <= now && (
                <button
                  className="btn primary"
                  onClick={() => {
                    toggleDone(next.id)
                  }}
                >
                  <AppIcon name="check" size={20} />
                  Mark done
                </button>
              )}
            </div>
          ) : (
            <p className="note">Nothing else is scheduled today.</p>
          )}
        </aside>
      </section>
      <section className="home-section">
        <div className="section-h">
          <div>
            <span className="section-code">Activities</span>
            <h2>Games for today</h2>
          </div>
          <a className="btn" href="#games">
            Explore all
            <AppIcon name="arrow-right" size={18} />
          </a>
        </div>
        <div className="gtiles">
          {GAMES.slice(0, state.settings.simple ? 3 : 6).map((game, index) => {
            return (
              <GameTile key={game.id} game={game} tag={index === 0 ? 'Recommended' : undefined} />
            )
          })}
        </div>
      </section>
      <section className="home-section">
        <div className="section-h">
          <div>
            <span className="section-code">Time together</span>
            <h2>Play with family</h2>
          </div>
        </div>
        <div className="gtiles family-games">
          {BOARD_GAMES.map((game) => {
            return <GameTile key={game.id} game={game} kind="board" />
          })}
        </div>
      </section>
      <section className="home-section">
        <div className="section-h">
          <div>
            <span className="section-code">Everyday support</span>
            <h2>More ways to feel supported</h2>
          </div>
        </div>
        <div className="tiles">
          <a className="tile" href="#mood">
            <span className="ti">
              <AppIcon name="heart" size="1em" />
            </span>
            <span>
              <small>Check in</small>
              <strong>How I feel</strong>
            </span>
          </a>
          <a className="tile" href="#memories">
            <span className="ti">
              <AppIcon name="camera" size="1em" />
            </span>
            <span>
              <small>Reconnect</small>
              <strong>Photos & memories</strong>
            </span>
          </a>
          <a className="tile" href="#activity">
            <span className="ti">
              <AppIcon name="star" size="1em" />
            </span>
            <span>
              <small>Look back</small>
              <strong>What I have done</strong>
            </span>
          </a>
        </div>
      </section>
    </>
  )
}
