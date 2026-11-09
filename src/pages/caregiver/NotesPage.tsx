import { useState, type ChangeEvent, type FormEvent } from 'react'
import { AppIcon } from '../../components/AppIcon'
import { Card, PageHeader } from '../../components/ui'
import { MOODS, OBSERVATION_CATEGORIES, moodById } from '../../data/catalog'
import { formatShort, uid } from '../../lib/date'
import { useAppState } from '../../state/AppStateContext'

export function NotesPage() {
  const { state, addMood, update } = useAppState()
  const [text, setText] = useState('')
  const [cat, setCat] = useState('Other')

  const add = (event: FormEvent) => {
    event.preventDefault()

    update((draft) => {
      draft.observations.push({
        id: uid(),
        date: new Date().toISOString(),
        cat,
        text,
        by: 'Caregiver',
      })
    })

    setText('')
  }

  const recordMood = (mood: (typeof MOODS)[number]['id']) => {
    addMood(mood, 'Caregiver')
  }

  const updateCategory = (event: ChangeEvent<HTMLSelectElement>) => {
    setCat(event.target.value)
  }

  const updateText = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value)
  }

  const deleteObservation = (id: string) => {
    update((draft) => {
      draft.observations = draft.observations.filter((observation) => {
        return observation.id !== id
      })
    })
  }

  return (
    <>
      <PageHeader
        title="Mood & caregiver notes"
        eyebrow="Care workspace · Observations"
        description="Record small changes and useful context without turning everyday care into paperwork."
      />
      <div className="grid2">
        <Card>
          <h2>Record mood</h2>
          <div className="moods">
            {MOODS.map((mood) => {
              return (
                <button
                  className="moodbtn"
                  key={mood.id}
                  onClick={() => {
                    recordMood(mood.id)
                  }}
                >
                  <span>
                    <AppIcon name={mood.icon} size="1em" />
                  </span>
                  {mood.label}
                </button>
              )
            })}
          </div>
          <ul className="clist">
            {state.moods
              .slice(-5)
              .reverse()
              .map((mood) => {
                return (
                  <li key={mood.id}>
                    <span className="t">{formatShort(new Date(mood.date))}</span>
                    <span className="mood-inline">
                      <AppIcon name={moodById(mood.mood).icon} size={20} />
                      {moodById(mood.mood).label} · {mood.by}
                    </span>
                  </li>
                )
              })}
          </ul>
        </Card>
        <Card>
          <h2>Add an observation</h2>
          <form className="f" onSubmit={add}>
            <label className="l">
              About
              <select value={cat} onChange={updateCategory}>
                {OBSERVATION_CATEGORIES.map((category) => {
                  return <option key={category}>{category}</option>
                })}
              </select>
            </label>
            <label className="l">
              What did you notice?
              <textarea value={text} onChange={updateText} required />
            </label>
            <button className="btn primary">Save note</button>
          </form>
          <ul className="clist">
            {state.observations
              .slice()
              .reverse()
              .map((observation) => {
                return (
                  <li key={observation.id}>
                    <span className="grow">
                      <strong>{observation.cat}</strong>
                      <br />
                      {observation.text}
                    </span>
                    <button
                      className="btn sm danger"
                      onClick={() => {
                        deleteObservation(observation.id)
                      }}
                    >
                      Delete
                    </button>
                  </li>
                )
              })}
          </ul>
        </Card>
      </div>
    </>
  )
}
