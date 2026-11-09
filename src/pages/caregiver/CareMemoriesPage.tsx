import { useState, type ChangeEvent, type FormEvent } from 'react'
import { Avatar, Card, PageHeader } from '../../components/ui'
import { uid } from '../../lib/date'
import { useAppState } from '../../state/AppStateContext'

export function CareMemoriesPage() {
  const { state, update } = useAppState()
  const [name, setName] = useState('')
  const [rel, setRel] = useState('')

  const add = (event: FormEvent) => {
    event.preventDefault()

    update((draft) => {
      draft.family.push({
        id: uid(),
        name,
        rel,
        desc: '',
        av: draft.family.length % 6,
        photo: null,
      })
    })

    setName('')
    setRel('')
  }

  const updateName = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  const updateRelationship = (event: ChangeEvent<HTMLInputElement>) => {
    setRel(event.target.value)
  }

  const deleteFamilyMember = (id: string) => {
    update((draft) => {
      draft.family = draft.family.filter((person) => {
        return person.id !== id
      })
    })
  }

  const deleteJournalEntry = (id: string) => {
    update((draft) => {
      draft.journal = draft.journal.filter((entry) => {
        return entry.id !== id
      })
    })
  }

  return (
    <>
      <PageHeader
        title="Family & memories"
        eyebrow="Care workspace · Familiar connections"
        description="Maintain the people and stories that make memory activities personal and reassuring."
      />
      <div className="grid2">
        <Card>
          <h2>Family & familiar faces</h2>
          <ul className="clist">
            {state.family.map((person) => {
              return (
                <li key={person.id}>
                  <Avatar person={person} size="sm" />
                  <span className="grow">
                    <strong>{person.name}</strong> · {person.rel}
                    <br />
                    <span className="small muted">{person.desc}</span>
                  </span>
                  <button
                    className="btn sm danger"
                    onClick={() => {
                      deleteFamilyMember(person.id)
                    }}
                  >
                    Delete
                  </button>
                </li>
              )
            })}
          </ul>
          <form className="f" onSubmit={add}>
            <label className="l">
              Name
              <input value={name} onChange={updateName} required />
            </label>
            <label className="l">
              Relationship
              <input value={rel} onChange={updateRelationship} required />
            </label>
            <button className="btn primary">Add person</button>
          </form>
        </Card>
        <Card>
          <h2>Memory journal</h2>
          <ul className="clist">
            {state.journal.map((entry) => {
              return (
                <li key={entry.id}>
                  <span className="grow">
                    <strong>{entry.title}</strong> · {entry.when}
                    <br />
                    {entry.text}
                  </span>
                  <button
                    className="btn sm danger"
                    onClick={() => {
                      deleteJournalEntry(entry.id)
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
