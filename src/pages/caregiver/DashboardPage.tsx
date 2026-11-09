import { AppIcon } from '../../components/AppIcon'
import { Card, PageHeader, SampleBanner, StatCard } from '../../components/ui'
import { ROUTINE_TYPES, moodById } from '../../data/catalog'
import { dateKey, formatDate, time12 } from '../../lib/date'
import { useAppState } from '../../state/AppStateContext'

export function DashboardPage() {
  const { state, isDone, toggleDone } = useAppState()
  const today = dateKey()
  const sessions = state.sessions.filter((session) => {
    return dateKey(new Date(session.date)) === today
  })
  const mood = state.moods
    .filter((entry) => {
      return dateKey(new Date(entry.date)) === today
    })
    .at(-1)
  const done = state.routine.filter((item) => {
    return isDone(item.id)
  }).length

  return (
    <>
      {state.sample && <SampleBanner />}
      <PageHeader
        title={`${state.settings.name}'s day so far`}
        eyebrow="Care workspace · Overview"
        description={`${formatDate(new Date())} · A clear snapshot of today's care and activity.`}
      />
      <div className="stats">
        <StatCard label="Routine done" value={`${done} / ${state.routine.length}`} />
        <StatCard label="Activities today" value={sessions.length} />
        <StatCard
          label="Mood today"
          value={
            mood ? (
              <span className="mood-inline">
                <AppIcon name={moodById(mood.mood).icon} size={30} />
                {moodById(mood.mood).label}
              </span>
            ) : (
              '—'
            )
          }
        />
      </div>
      <div className="grid2">
        <Card>
          <h2>Today&apos;s routine</h2>
          <ul className="clist">
            {state.routine.map((item) => {
              return (
                <li key={item.id}>
                  <span className="t">{time12(item.time)}</span>
                  <span className="grow">
                    <AppIcon name={ROUTINE_TYPES[item.type][0]} size={20} />
                    {item.title}
                  </span>
                  <button
                    className="btn sm"
                    onClick={() => {
                      toggleDone(item.id)
                    }}
                  >
                    {isDone(item.id) ? 'Undo' : 'Mark done'}
                  </button>
                </li>
              )
            })}
          </ul>
        </Card>
        <Card>
          <h2>Recent notes</h2>
          <ul className="clist">
            {state.observations
              .slice(-3)
              .reverse()
              .map((item) => {
                return (
                  <li key={item.id}>
                    <span>
                      <strong>{item.cat}</strong>
                      <br />
                      {item.text}
                    </span>
                  </li>
                )
              })}
          </ul>
          <a className="btn" href="#care-notes">
            Add a note
          </a>
        </Card>
      </div>
    </>
  )
}
