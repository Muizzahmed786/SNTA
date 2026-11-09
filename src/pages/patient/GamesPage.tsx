import { BOARD_GAMES, GAMES } from '../../data/catalog'
import { GameTile, PageHeader } from '../../components/ui'

export function GamesPage() {
  return (
    <>
      <PageHeader
        title="Games"
        eyebrow="01 · Cognitive activities"
        description="Pick any activity. Take your time—there is no wrong way to play."
      />
      <div className="section-h">
        <h2>Brain games · play on your own</h2>
      </div>
      <div className="gtiles">
        {GAMES.map((game) => {
          return <GameTile key={game.id} game={game} />
        })}
      </div>
      <div className="section-h">
        <h2>Play with family</h2>
        <span className="muted small">Take turns on this screen</span>
      </div>
      <div className="gtiles">
        {BOARD_GAMES.map((game) => {
          return <GameTile key={game.id} game={game} kind="board" />
        })}
      </div>
    </>
  )
}
