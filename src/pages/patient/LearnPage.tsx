import { PageHeader } from '../../components/ui'

export function LearnPage() {
  return (
    <>
      <PageHeader
        title="Learn"
        eyebrow="Helpful guidance"
        description="Practical, general information for people living with dementia and their caregivers."
        back={{ href: 'home', label: 'Back' }}
      />
      <p className="note">
        This is general information, not medical advice. Always talk to a doctor about diagnosis,
        medicines and care.
      </p>
      {[
        [
          'Understanding dementia',
          'Dementia can affect memory, thinking, communication and everyday tasks.',
        ],
        [
          'Supporting a person',
          'Use short sentences, offer simple choices and allow plenty of time.',
        ],
        [
          'Looking after yourself',
          'Caregiving can be demanding. Rest and ask family or professionals for help.',
        ],
      ].map(([title, text]) => {
        return (
          <details className="acc card" key={title}>
            <summary>{title}</summary>
            <p>{text}</p>
          </details>
        )
      })}
    </>
  )
}
