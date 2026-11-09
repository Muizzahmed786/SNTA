import { useAppState } from '../../state/AppStateContext'
import { AppIcon } from '../../components/AppIcon'
import { Card, PageHeader } from '../../components/ui'

export function HelpPage() {
  const { state } = useAppState()
  const primary =
    state.contacts.find((contact) => {
      return contact.primary
    }) ?? state.contacts[0]
  const medical = state.medical

  return (
    <>
      <PageHeader
        title="Help"
        eyebrow="06 · Immediate support"
        description="Important contacts and medical information, kept clear and easy to reach."
        back={{ href: state.mode === 'caregiver' ? 'care' : 'home', label: 'Back' }}
      />
      {primary && (
        <Card className="call">
          <p className="eyebrow">Call your family</p>
          <h2>
            {primary.name} · {primary.rel}
          </h2>
          <p className="phone">{primary.phone}</p>
          <a className="btn primary big" href={`tel:${primary.phone.replace(/\s/g, '')}`}>
            <AppIcon name="call" size={24} />
            Call {primary.name}
          </a>
        </Card>
      )}
      <Card className="sos">
        <p className="eyebrow">Emergency</p>
        <h2>If someone is hurt or in danger, call 112</h2>
        <p className="phone">112</p>
        <p>112 is India&apos;s emergency number. SNTA does not call emergency services for you.</p>
      </Card>
      <Card>
        <h2>Medical information card</h2>
        <dl>
          {medical.showId && (
            <>
              <dt>Name</dt>
              <dd>{medical.name}</dd>
              <dt>Date of birth</dt>
              <dd>{medical.dob}</dd>
              <dt>Lives</dt>
              <dd>{medical.lives}</dd>
            </>
          )}
          <dt>Conditions</dt>
          <dd>{medical.conditions}</dd>
          <dt>Allergies</dt>
          <dd>
            <strong>{medical.allergies}</strong>
          </dd>
          <dt>Medicines</dt>
          <dd>{medical.meds}</dd>
        </dl>
      </Card>
    </>
  )
}
