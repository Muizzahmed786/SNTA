import { useState, type ReactNode } from 'react'
import type { FamilyMember, GameDefinition } from '../types/domain'
import { AppIcon } from './AppIcon'

const SAMPLE_BANNER_DISMISSED_KEY = 'snta-sample-banner-dismissed'

function isSampleBannerDismissed() {
  try {
    return window.localStorage.getItem(SAMPLE_BANNER_DISMISSED_KEY) === 'true'
  } catch {
    return false
  }
}

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <section className={`card ${className}`}>{children}</section>
}
export function PageHeader({
  title,
  back,
  eyebrow = 'SNTA · Daily support',
  description,
  actions,
  children,
}: {
  title: string
  back?: { href: string; label: string }
  eyebrow?: string
  description?: string
  actions?: ReactNode
  children?: ReactNode
}) {
  return (
    <header className="page-intro">
      <div className="page-intro__meta">
        <span className="eyebrow">{eyebrow}</span>
        {back && (
          <a className="page-intro__back" href={`#${back.href}`}>
            <AppIcon name="arrow-left" size={18} />
            {back.label}
          </a>
        )}
      </div>
      <div className="page-intro__body">
        <div className="page-intro__copy">
          <h1>{title}</h1>
          {description && <p>{description}</p>}
        </div>
        {actions && <div className="page-intro__actions">{actions}</div>}
      </div>
      {children && <div className="page-intro__extra">{children}</div>}
    </header>
  )
}
export function SampleBanner() {
  const [visible, setVisible] = useState(() => {
    return !isSampleBannerDismissed()
  })

  const dismiss = () => {
    setVisible(false)

    try {
      window.localStorage.setItem(SAMPLE_BANNER_DISMISSED_KEY, 'true')
    } catch {
      // The notice can still be dismissed for the current session.
    }
  }

  if (!visible) {
    return null
  }

  return (
    <aside className="banner" aria-label="Sample information notice">
      <span>
        Example details for Asha. Change them in <a href="#care-settings">Caregiver › Settings</a>.
      </span>
      <button className="banner-dismiss" type="button" onClick={dismiss}>
        <AppIcon name="close" size={16} />
        Dismiss
      </button>
    </aside>
  )
}
export function GameTile({
  game,
  kind = 'play',
  tag,
}: {
  game: GameDefinition
  kind?: 'play' | 'board'
  tag?: string
}) {
  return (
    <a className="gtile" href={`#${kind}-${game.id}`}>
      <span className="gi" aria-hidden="true">
        <AppIcon name={game.icon} size="1em" strokeWidth={1.65} />
      </span>
      <strong>{game.name}</strong>
      <span className="sub">{game.cat}</span>
      {tag && <span className="pill good">{tag}</span>}
    </a>
  )
}
export function Avatar({ person, size = '' }: { person: FamilyMember; size?: 'sm' | 'xl' | '' }) {
  return (
    <div className={`avatar av${person.av % 6} ${size}`} aria-hidden="true">
      {person.photo ? <img src={person.photo} alt="" /> : person.name.trim()[0] || '?'}
    </div>
  )
}
export function StatCard({
  label,
  value,
  children,
}: {
  label: string
  value: ReactNode
  children?: ReactNode
}) {
  return (
    <div className="stat">
      <span className="l">{label}</span>
      <span className="v">{value}</span>
      {children}
    </div>
  )
}
export function EmptyState({ children }: { children: ReactNode }) {
  return <p className="note">{children}</p>
}
