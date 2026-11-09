import { useRef, useState } from 'react'
import { gameById } from '../../data/catalog'
import { useAppState } from '../../state/AppStateContext'
import { PageHeader } from '../../components/ui'

export function BoardGamePage({ id }: { id: string }) {
  const game = gameById(id)
  const { state, addSession } = useAppState()
  const [started, setStarted] = useState(false)
  const startedAt = useRef(0)

  if (!game) {
    return <p className="note">That game could not be found.</p>
  }

  const begin = () => {
    startedAt.current = Date.now()
    setStarted(true)
  }
  const finish = () => {
    addSession({
      game: id,
      cat: 'Social',
      mins: Math.max(1, (Date.now() - startedAt.current) / 60000),
      diff: null,
      enjoy: 3,
      players: state.family.slice(0, 2).map((person) => {
        return person.name
      }),
    })
    setStarted(false)
  }
  return (
    <>
      <PageHeader
        title={game.name}
        back={{ href: 'games', label: 'All games' }}
        eyebrow="Shared activity · Play together"
        description={game.how}
      />
      {!started ? (
        <button className="btn primary big" onClick={begin}>
          Start the game
        </button>
      ) : (
        <div className="stage">{renderBoardGame(id, game.name, finish)}</div>
      )}
    </>
  )
}

function renderBoardGame(id: string, name: string, onFinish: () => void) {
  if (id === 'ttt') {
    return <TicTacToe onFinish={onFinish} />
  }

  if (id === 'snakes') {
    return <DiceRace onFinish={onFinish} />
  }

  return <TurnGame name={name} onFinish={onFinish} />
}

function TicTacToe({ onFinish }: { onFinish: () => void }) {
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null))
  const [mark, setMark] = useState('✕')

  const play = (i: number) => {
    if (board[i]) {
      return
    }

    const next = [...board]
    next[i] = mark
    setBoard(next)
    setMark(mark === '✕' ? '◯' : '✕')

    if (next.filter(Boolean).length === 9) {
      setTimeout(onFinish, 700)
    }
  }
  return (
    <>
      <p className="bstatus">{mark}&apos;s turn</p>
      <div className="ttt">
        {board.map((value, i) => {
          return (
            <button
              key={i}
              onClick={() => {
                play(i)
              }}
            >
              {value}
            </button>
          )
        })}
      </div>
      <button className="btn ghost" onClick={onFinish}>
        Finish game
      </button>
    </>
  )
}
function DiceRace({ onFinish }: { onFinish: () => void }) {
  const [position, setPosition] = useState(1)
  const [die, setDie] = useState(0)

  const roll = () => {
    const value = 1 + Math.floor(Math.random() * 6)
    setDie(value)
    const next = Math.min(100, position + value)
    setPosition(next)

    if (next === 100) {
      setTimeout(onFinish, 800)
    }
  }
  return (
    <div className="stack">
      <p className="bstatus">You are on square {position}</p>
      <span className="dice">{['🎲', '⚀', '⚁', '⚂', '⚃', '⚄', '⚅'][die]}</span>
      <button className="btn primary big" onClick={roll}>
        Roll the dice
      </button>
      <button className="btn ghost" onClick={onFinish}>
        Finish game
      </button>
    </div>
  )
}
function TurnGame({ name, onFinish }: { name: string; onFinish: () => void }) {
  const [turn, setTurn] = useState(1)

  const endTurn = () => {
    setTurn(turn === 1 ? 2 : 1)
  }

  return (
    <div className="stack">
      <h2>{name}</h2>
      <p className="bstatus">Player {turn}&apos;s turn</p>
      <button className="btn primary big" onClick={endTurn}>
        End turn
      </button>
      <button className="btn ghost" onClick={onFinish}>
        Finish game
      </button>
    </div>
  )
}
