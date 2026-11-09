import { useState, type ChangeEvent, type FormEvent } from 'react'
import { AppIcon } from '../../components/AppIcon'
import { Card, PageHeader } from '../../components/ui'
import { ROUTINE_TYPES } from '../../data/catalog'
import { time12, uid } from '../../lib/date'
import { useAppState } from '../../state/AppStateContext'
import type { RoutineType } from '../../types/domain'

export function RoutinePage() {
  const { state, update } = useAppState()
  const [time, setTime] = useState('12:00')
  const [type, setType] = useState<RoutineType>('other')
  const [title, setTitle] = useState('')

  const add = (event: FormEvent) => {
    event.preventDefault()

    update((draft) => {
      draft.routine.push({ id: uid(), time, type, title })
    })

    setTitle('')
  }

  const deleteRoutineItem = (id: string) => {
    update((draft) => {
      draft.routine = draft.routine.filter((item) => {
        return item.id !== id
      })
    })
  }

  const updateTime = (event: ChangeEvent<HTMLInputElement>) => {
    setTime(event.target.value)
  }

  const updateType = (event: ChangeEvent<HTMLSelectElement>) => {
    setType(event.target.value as RoutineType)
  }

  const updateTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  }

  return (
    <>
      <PageHeader
        title="Routine & appointments"
        eyebrow="Care workspace · Daily plan"
        description="Keep familiar activities, appointments and reminders in one dependable timeline."
      />
      <div className="grid2">
        <Card>
          <h2>Daily routine</h2>
          <ul className="clist">
            {[...state.routine]
              .sort((first, second) => {
                return first.time.localeCompare(second.time)
              })
              .map((item) => {
                return (
                  <li key={item.id}>
                    <span className="t">{time12(item.time)}</span>
                    <span className="grow">
                      <AppIcon name={ROUTINE_TYPES[item.type][0]} size={20} />
                      <strong>{item.title}</strong>
                    </span>
                    <button
                      className="btn sm danger"
                      onClick={() => {
                        deleteRoutineItem(item.id)
                      }}
                    >
                      Delete
                    </button>
                  </li>
                )
              })}
          </ul>
        </Card>
        <Card>
          <h2>Add a reminder</h2>
          <form className="f" onSubmit={add}>
            <label className="l">
              Time
              <input type="time" value={time} onChange={updateTime} required />
            </label>
            <label className="l">
              Type
              <select value={type} onChange={updateType}>
                {Object.entries(ROUTINE_TYPES).map(([id, value]) => {
                  return (
                    <option value={id} key={id}>
                      {value[1]}
                    </option>
                  )
                })}
              </select>
            </label>
            <label className="l">
              What to do
              <input value={title} onChange={updateTitle} required />
            </label>
            <button className="btn primary">Add reminder</button>
          </form>
        </Card>
      </div>
    </>
  )
}
