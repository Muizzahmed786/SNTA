import { useState } from 'react'
import { HARD_MOODS, MOODS } from '../../data/catalog'
import { useAppState } from '../../state/AppStateContext'
import type { MoodId } from '../../types/domain'
import { AppIcon } from '../../components/AppIcon'
import { PageHeader } from '../../components/ui'

export function MoodPage() {
  const { state, addMood } = useAppState()
  const [chosen, setChosen] = useState<MoodId | null>(null)
  const choose = (mood: MoodId) => {
    addMood(mood)
    setChosen(mood)
  }

  return (
    <>
      <PageHeader
        title={`How are you feeling, ${state.settings.name}?`}
        eyebrow="Mood check-in"
        description="Choose the face that feels most like you right now."
        back={{ href: 'home', label: 'Home' }}
      />
      <div className="moods">
        {MOODS.map((mood) => {
          return (
            <button
              className="moodbtn"
              key={mood.id}
              onClick={() => {
                choose(mood.id)
              }}
            >
              <span aria-hidden="true">
                <AppIcon name={mood.icon} size="1em" />
              </span>
              {mood.label}
            </button>
          )
        })}
      </div>
      {chosen && (
        <div className="card" role="status">
          <p>
            Thank you for telling me. It is okay to feel{' '}
            {MOODS.find((mood) => {
              return mood.id === chosen
            })?.label.toLowerCase()}
            .
          </p>
          {HARD_MOODS.includes(chosen) && (
            <div className="row">
              <a className="btn primary" href="#memories">
                <AppIcon name="camera" size={20} />
                Look at family photos
              </a>
              <a className="btn" href="#help">
                <AppIcon name="call" size={20} />
                Call someone
              </a>
            </div>
          )}
        </div>
      )}
    </>
  )
}
