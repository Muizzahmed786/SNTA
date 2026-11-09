import { ROUTINE_TYPES } from '../../data/catalog'
import { formatDate, time12 } from '../../lib/date'
import { useAppState } from '../../state/AppStateContext'
import { AppIcon } from '../../components/AppIcon'
import { PageHeader } from '../../components/ui'

export function DayPage() {
  const { state, isDone, toggleDone } = useAppState()
  const list = [...state.routine].sort((first, second) => {
    return first.time.localeCompare(second.time)
  })
  const completedCount = list.filter((item) => {
    return isDone(item.id)
  }).length

  return (
    <>
      <PageHeader
        title="My day"
        eyebrow="02 · Daily orientation"
        description={`${formatDate(new Date())} · ${completedCount} of ${list.length} activities completed`}
        back={{ href: 'home', label: 'Home' }}
      />
      <div className="daylist">
        {list.map((item) => {
          const done = isDone(item.id)
          return (
            <div className={`dayitem ${done ? 'is-done' : ''}`} key={item.id}>
              <span className="t">{time12(item.time)}</span>
              <span className="ic" aria-hidden="true">
                <AppIcon name={ROUTINE_TYPES[item.type][0]} size="1em" />
              </span>
              <div className="what">
                <strong>{item.title}</strong>
                {item.note && <span className="muted small">{item.note}</span>}
              </div>
              <button
                className="btn sm"
                onClick={() => {
                  toggleDone(item.id)
                }}
              >
                {done && <AppIcon name="check" size={18} />}
                {done ? 'Done' : 'Mark done'}
              </button>
            </div>
          )
        })}
      </div>
    </>
  )
}
