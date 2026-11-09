import { AppIcon } from '../../components/AppIcon'
import { PageHeader } from '../../components/ui'
import { moodById } from '../../data/catalog'
import { useAppState } from '../../state/AppStateContext'

export function ReportPage() {
  const { state } = useAppState()
  const text = `SNTA care summary for ${state.medical.name || state.settings.name}\nGames: ${state.sessions.length}\nMood check-ins: ${state.moods.length}\nCaregiver notes: ${state.observations.length}`
  const totalMinutes = Math.round(
    state.sessions.reduce((total, session) => {
      return total + session.mins
    }, 0),
  )

  const copyReport = () => {
    void navigator.clipboard.writeText(text)
  }

  const printReport = () => {
    window.print()
  }

  return (
    <>
      <PageHeader
        title="Care report"
        eyebrow="Care workspace · Summary"
        description="A concise, printable record of recent activity, mood check-ins and observations."
        actions={
          <>
            <button className="btn primary" onClick={copyReport}>
              Copy report
            </button>
            <button className="btn" onClick={printReport}>
              Print
            </button>
          </>
        }
      />
      <article className="card report">
        <h2>{state.medical.name || state.settings.name} · Care summary</h2>
        <div>
          <h3>Activity</h3>
          <p>
            {state.sessions.length} games, about {totalMinutes} minutes.
          </p>
        </div>
        <div>
          <h3>Recent moods</h3>
          <ul>
            {state.moods.slice(-7).map((mood) => {
              return (
                <li key={mood.id}>
                  <span className="mood-inline">
                    <AppIcon name={moodById(mood.mood).icon} size={20} />
                    {moodById(mood.mood).label} · {mood.by}
                  </span>
                </li>
              )
            })}
          </ul>
        </div>
        <div>
          <h3>Caregiver observations</h3>
          <ul>
            {state.observations.slice(-7).map((observation) => {
              return (
                <li key={observation.id}>
                  <strong>{observation.cat}:</strong> {observation.text}
                </li>
              )
            })}
          </ul>
        </div>
        <p className="small muted">
          This report shows participation and observations only. It is not a clinical assessment.
        </p>
      </article>
    </>
  )
}
