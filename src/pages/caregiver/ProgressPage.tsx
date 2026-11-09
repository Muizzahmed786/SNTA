import { Card, PageHeader, StatCard } from '../../components/ui'
import { useAppState } from '../../state/AppStateContext'

export function ProgressPage() {
  const { state } = useAppState()
  const minutes = Math.round(
    state.sessions.reduce((total, session) => {
      return total + session.mins
    }, 0),
  )
  const categories = Object.entries(
    state.sessions.reduce<Record<string, number>>((all, session) => {
      return {
        ...all,
        [session.cat]: (all[session.cat] ?? 0) + 1,
      }
    }, {}),
  )
  const activeDays = new Set(
    state.sessions.map((session) => {
      return new Date(session.date).toDateString()
    }),
  ).size

  return (
    <>
      <PageHeader
        title="Activity"
        eyebrow="Care workspace · Progress"
        description="See participation patterns at a glance. These measures support care; they are not a clinical score."
      />
      <div className="stats">
        <StatCard label="Games played" value={state.sessions.length} />
        <StatCard label="Time playing" value={`${minutes} min`} />
        <StatCard label="Days active" value={activeDays} />
      </div>
      <Card>
        <h2>Activity by category</h2>
        {categories.map(([cat, total]) => {
          return (
            <div className="hbar" key={cat}>
              <span>{cat}</span>
              <div className="meter">
                <i style={{ width: `${Math.min(100, total * 12)}%` }} />
              </div>
              <span>{total}</span>
            </div>
          )
        })}
        {!categories.length && <p className="note">No game activity recorded yet.</p>}
      </Card>
    </>
  )
}
