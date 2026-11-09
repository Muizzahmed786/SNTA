import { useMemo, useRef, useState } from 'react'
import { gameById } from '../../data/catalog'
import { useAppState } from '../../state/AppStateContext'
import { AppIcon } from '../../components/AppIcon'
import { PageHeader } from '../../components/ui'

const PICTURES = ['🌻', '🍎', '🐘', '🦜', '🚂', '☂️', '🫖', '🌙']
const QUESTIONS: Record<string, { prompt: string; options: string[]; answer: number }[]> = {
  sequence: [
    { prompt: 'Which comes next? 🌸 🌼 🌸 🌼', options: ['🌸', '🌳', '🍎'], answer: 0 },
    { prompt: 'Remember: 🔴 🔵. Which came first?', options: ['🔵', '🔴'], answer: 1 },
  ],
  missing: [
    { prompt: 'Which one was in this group? 🍎 🚌 🐕', options: ['🐕', '🌙', '🫖'], answer: 0 },
    { prompt: 'Which one was in this group? 🌻 🐘 🚂', options: ['🚂', '🍌', '☂️'], answer: 0 },
  ],
  faces: [
    {
      prompt: 'Who is someone from your family?',
      options: ['A family member', 'A traffic light', 'A teapot'],
      answer: 0,
    },
  ],
  odd: [
    { prompt: 'Tap the different one.', options: ['🍎', '🍎', '🚗', '🍎'], answer: 2 },
    { prompt: 'Tap the different one.', options: ['🐕', '🐕', '🌻', '🐕'], answer: 2 },
  ],
  pattern: [
    { prompt: 'What comes next? 🔴 🔵 🔴 🔵', options: ['🔴', '🟢', '⭐'], answer: 0 },
    { prompt: 'What comes next? ⭐ ⭐ 🔺 ⭐ ⭐', options: ['🔺', '⭐', '🟪'], answer: 0 },
  ],
  category: [
    {
      prompt: 'Which group does 🍎 belong to?',
      options: ['Fruit', 'Animal', 'Vehicle'],
      answer: 0,
    },
    {
      prompt: 'Which group does 🚌 belong to?',
      options: ['Flower', 'Vehicle', 'Fruit'],
      answer: 1,
    },
  ],
  picword: [
    { prompt: 'What is this? 🐘', options: ['Elephant', 'Chair', 'Train'], answer: 0 },
    { prompt: 'What is this? 🌻', options: ['Bus', 'Sunflower', 'Cup'], answer: 1 },
  ],
  word: [
    { prompt: 'Finish the word: C _ P', options: ['U', 'A', 'O'], answer: 0 },
    { prompt: 'Finish the word: H _ ME', options: ['O', 'I', 'A'], answer: 0 },
  ],
  order: [
    {
      prompt: 'What comes first when making tea?',
      options: ['Boil water', 'Pour into a cup', 'Drink it'],
      answer: 0,
    },
    { prompt: 'Which is earliest?', options: ['Dinner', 'Breakfast', 'Lunch'], answer: 1 },
  ],
}

export function GamePage({ id }: { id: string }) {
  const game = gameById(id)
  const { addSession } = useAppState()
  const started = useRef(0)
  const [active, setActive] = useState(false)
  const [finished, setFinished] = useState(false)

  if (!game) {
    return <p className="note">That game could not be found.</p>
  }

  const start = () => {
    started.current = Date.now()
    setActive(true)
    setFinished(false)
  }
  const finish = () => {
    addSession({
      game: id,
      cat: game.cat,
      mins: Math.max(1, (Date.now() - started.current) / 60000),
      diff: 0,
      enjoy: 3,
      players: null,
    })
    setActive(false)
    setFinished(true)
  }
  return (
    <>
      <PageHeader
        title={game.name}
        back={{ href: 'games', label: 'All games' }}
        eyebrow={`Cognitive activity · ${game.cat}`}
        description={game.how}
      />
      <header className="rhead">
        <span className="ricon" aria-hidden="true">
          <AppIcon name={game.icon} size="1em" />
        </span>
        <div>
          <p className="eyebrow">{game.cat}</p>
          <p className="how">Take your time. You can stop whenever you need a break.</p>
        </div>
      </header>
      {finished && (
        <div className="done-panel card">
          <div className="done-mark">
            <AppIcon name="star" size="1em" />
          </div>
          <h2>You finished!</h2>
          <p>Lovely work. Take a break or play again.</p>
          <button className="btn primary" onClick={start}>
            Play again
          </button>
        </div>
      )}
      {!active && !finished && (
        <button className="btn primary big" onClick={start}>
          Start
        </button>
      )}
      {active && (
        <div className="stage">
          {id === 'match' ? (
            <MemoryMatch onFinish={finish} />
          ) : (
            <ChoiceGame id={id} onFinish={finish} />
          )}
        </div>
      )}
    </>
  )
}

function MemoryMatch({ onFinish }: { onFinish: () => void }) {
  const deck = useMemo(() => {
    return [...PICTURES.slice(0, 6), ...PICTURES.slice(0, 6)].sort(() => {
      return Math.random() - 0.5
    })
  }, [])
  const [open, setOpen] = useState<number[]>([])
  const [matched, setMatched] = useState<number[]>([])

  const choose = (index: number) => {
    if (open.length >= 2 || open.includes(index) || matched.includes(index)) {
      return
    }

    const next = [...open, index]
    setOpen(next)

    if (next.length === 2) {
      setTimeout(() => {
        if (deck[next[0]] === deck[next[1]]) {
          const done = [...matched, ...next]
          setMatched(done)

          if (done.length === deck.length) {
            onFinish()
          }
        }

        setOpen([])
      }, 500)
    }
  }
  return (
    <>
      <p className="mstatus">
        Found {matched.length / 2} of {deck.length / 2} pairs
      </p>
      <div className="mcards">
        {deck.map((picture, index) => {
          return (
            <button
              className={`mcard ${open.includes(index) || matched.includes(index) ? 'open' : ''}`}
              key={index}
              onClick={() => {
                choose(index)
              }}
              aria-label={`Card ${index + 1}`}
            >
              <span className="face">
                {open.includes(index) || matched.includes(index) ? picture : ''}
              </span>
            </button>
          )
        })}
      </div>
    </>
  )
}

function ChoiceGame({ id, onFinish }: { id: string; onFinish: () => void }) {
  const questions = QUESTIONS[id] ?? QUESTIONS.pattern
  const [index, setIndex] = useState(0)
  const [message, setMessage] = useState('')
  const question = questions[index]
  const choose = (option: number) => {
    if (option === question.answer) {
      setMessage('Well done!')
      setTimeout(() => {
        if (index === questions.length - 1) {
          onFinish()
        } else {
          setIndex(index + 1)
          setMessage('')
        }
      }, 700)
    } else {
      setMessage('Nice try. Have another look.')
    }
  }
  return (
    <>
      <p className="qprompt">{question.prompt}</p>
      <div className="opts">
        {question.options.map((option, i) => {
          return (
            <button
              className="opt"
              key={`${option}-${i}`}
              onClick={() => {
                choose(i)
              }}
            >
              {option}
            </button>
          )
        })}
      </div>
      <div className="feedback" role="status">
        {message}
      </div>
    </>
  )
}
