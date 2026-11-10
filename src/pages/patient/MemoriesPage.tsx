import { useState } from 'react'
import { useAppState } from '../../state/AppStateContext'
import { AppIcon } from '../../components/AppIcon'
import { Avatar, EmptyState, PageHeader } from '../../components/ui'
import type { AppIconName } from '../../types/domain'

function getMemoryIcon(icon: string): AppIconName {
  if (icon === 'train' || icon === '🚂') {
    return 'train'
  }

  return 'flower'
}

export function MemoriesPage() {
  const { state } = useAppState()
  const [tab, setTab] = useState<'family' | 'journal' | 'story'>('family')
  const [story, setStory] = useState(0)
  const entry = state.journal[Math.min(story, Math.max(0, state.journal.length - 1))]

  const selectTab = (id: 'family' | 'journal' | 'story') => {
    setTab(id)
  }

  const showPreviousStory = () => {
    setStory(story - 1)
  }

  const showNextStory = () => {
    setStory(story + 1)
  }

  return (
    <>
      <PageHeader
        title="Family & memories"
        eyebrow="People and stories"
        description="Reconnect with the people, places and stories that matter most."
        back={{ href: 'home', label: 'Home' }}
      />
      <div className="tabs" role="tablist">
        {(
          [
            ['family', 'Family'],
            ['journal', 'My memories'],
            ['story', 'Memory story'],
          ] as const
        ).map(([id, label]) => {
          return (
            <button
              key={id}
              role="tab"
              aria-selected={tab === id}
              onClick={() => {
                selectTab(id)
              }}
            >
              {label}
            </button>
          )
        })}
      </div>
      {tab === 'family' &&
        (state.family.length ? (
          <div className="fam">
            {state.family.map((person) => {
              return (
                <article className="card person" key={person.id}>
                  <Avatar person={person} />
                  <h2>{person.name}</h2>
                  <p className="rel">Your {person.rel.toLowerCase()}</p>
                  <p className="muted">{person.desc}</p>
                </article>
              )
            })}
          </div>
        ) : (
          <EmptyState>No family members saved yet.</EmptyState>
        ))}
      {tab === 'journal' &&
        (state.journal.length ? (
          <div className="journal">
            {state.journal.map((item) => {
              return (
                <article className="card entry" key={item.id}>
                  <div className="ephoto">
                    {item.photo ? (
                      <img src={item.photo} alt="" />
                    ) : (
                      <AppIcon name={getMemoryIcon(item.icon)} size="2.4em" />
                    )}
                  </div>
                  <div>
                    <p className="eyebrow">{item.when}</p>
                    <h2>{item.title}</h2>
                    <p>{item.text}</p>
                    {item.audio && <audio controls src={item.audio} />}
                  </div>
                </article>
              )
            })}
          </div>
        ) : (
          <EmptyState>No memories saved yet.</EmptyState>
        ))}
      {tab === 'story' &&
        (entry ? (
          <article className="card story">
            <p className="eyebrow">
              Memory {story + 1} of {state.journal.length}
            </p>
            <div className="ephoto">
              {entry.photo ? (
                <img src={entry.photo} alt="" />
              ) : (
                <AppIcon name={getMemoryIcon(entry.icon)} size="2.4em" />
              )}
            </div>
            <h2>{entry.title}</h2>
            <p className="muted">{entry.when}</p>
            <p className="txt">{entry.text}</p>
            <div className="row">
              <button className="btn" disabled={story === 0} onClick={showPreviousStory}>
                <AppIcon name="arrow-left" size={18} />
                Before
              </button>
              <button
                className="btn"
                disabled={story >= state.journal.length - 1}
                onClick={showNextStory}
              >
                Next
                <AppIcon name="arrow-right" size={18} />
              </button>
            </div>
          </article>
        ) : (
          <EmptyState>Add memories first to make a story.</EmptyState>
        ))}
    </>
  )
}
