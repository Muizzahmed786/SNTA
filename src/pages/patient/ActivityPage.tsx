import { useAppState } from '../../state/AppStateContext'
import { daysAgo } from '../../lib/date'
import { PageHeader } from '../../components/ui'

export function ActivityPage() {
  const { state } = useAppState()
  const from = daysAgo(6)
  from.setHours(0, 0, 0, 0)
  const sessions = state.sessions.filter((item) => {
    return new Date(item.date) >= from
  })
  const minutes = Math.round(
    sessions.reduce((sum, item) => {
      return sum + item.mins
    }, 0),
  )

  return (
    <>
      <PageHeader
        title="What I have done"
        eyebrow="05 · Activity history"
        description="A gentle look back at the games and activities completed this week."
        back={{ href: 'home', label: 'Home' }}
      />
      <p className="activity-summary">
        This week you played <strong>{sessions.length} games</strong> for about{' '}
        <strong>{minutes} minutes</strong>.
      </p>
      <div className="glist">
        {sessions
          .slice()
          .reverse()
          .map((session) => {
            return (
              <div className="card" key={session.id}>
                <strong>{session.game}</strong>
                <span className="muted">{Math.round(session.mins)} minutes</span>
              </div>
            )
          })}
      </div>
      {!sessions.length && <p className="note">Play a game and it will appear here.</p>}
    </>
  )
}
