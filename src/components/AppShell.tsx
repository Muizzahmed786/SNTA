import { useEffect, type ReactNode } from 'react'
import { useAppState } from '../state/AppStateContext'
import { navigate } from '../hooks/useHashRoute'
import type { AppIconName } from '../types/domain'
import { AppIcon } from './AppIcon'

const PATIENT_LINKS: { href: string; icon: AppIconName; label: string }[] = [
  { href: 'home', icon: 'home', label: 'Home' },
  { href: 'games', icon: 'games', label: 'Games' },
  { href: 'day', icon: 'calendar', label: 'My day' },
  { href: 'memories', icon: 'family', label: 'Family' },
  { href: 'help', icon: 'call', label: 'Help' },
]

function BrandMark() {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true">
      <rect width="40" height="40" rx="12" style={{ fill: 'var(--accent)' }} />
      <circle
        cx="15"
        cy="20"
        r="7.5"
        fill="none"
        style={{ stroke: 'var(--accent-ink)' }}
        strokeWidth="3"
      />
      <circle
        cx="25"
        cy="20"
        r="7.5"
        fill="none"
        style={{ stroke: 'var(--accent-ink)' }}
        strokeWidth="3"
        opacity=".7"
      />
    </svg>
  )
}

export function AppShell({ route, children }: { route: string; children: ReactNode }) {
  const { state, setMode, update } = useAppState()
  const caregiver = state.mode === 'caregiver'

  const changeMode = (mode: 'patient' | 'caregiver') => {
    if (
      mode === 'caregiver' &&
      state.settings.pin &&
      window.prompt('Enter the caregiver PIN') !== state.settings.pin
    ) {
      return
    }

    setMode(mode)
    navigate(mode === 'caregiver' ? 'care' : 'home')
  }

  const toggleTheme = () => {
    update((draft) => {
      draft.settings.theme = draft.settings.theme === 'light' ? 'dark' : 'light'
    })
  }

  useThemeEffect(state.settings, state.mode)
  const routeLabel = getRouteLabel(route, caregiver)

  return (
    <div className={`app app--${state.mode}`}>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <header className="top">
        <div className="wrap top-in">
          <a className="brand" href={caregiver ? '#care' : '#home'}>
            <BrandMark />
            <span>
              <b>SNTA</b>
              {caregiver ? (
                <small>Remember More. Connect More. Live Better.</small>
              ) : (
                <small className="patient-status">
                  <i aria-hidden="true" /> Offline and private
                </small>
              )}
            </span>
          </a>
          <div className="top-right">
            <button
              className="theme-toggle"
              type="button"
              aria-label={`Switch to ${state.settings.theme === 'light' ? 'dark' : 'light'} mode`}
              aria-pressed={state.settings.theme === 'dark'}
              onClick={toggleTheme}
            >
              <AppIcon name={state.settings.theme === 'light' ? 'moon' : 'sun'} size={18} />
              <span>{state.settings.theme === 'light' ? 'Dark' : 'Light'}</span>
            </button>
            <div className="mode" role="group" aria-label="Choose view">
              <button
                type="button"
                aria-pressed={!caregiver}
                onClick={() => {
                  changeMode('patient')
                }}
              >
                Patient
              </button>
              <button
                type="button"
                aria-pressed={caregiver}
                onClick={() => {
                  changeMode('caregiver')
                }}
              >
                Caregiver
              </button>
            </div>
            {caregiver && (
              <a className="help-btn" href="#help">
                <AppIcon name="call" size={18} />
                Help
              </a>
            )}
          </div>
        </div>
        {caregiver && (
          <nav className="cnav" aria-label="Caregiver sections">
            <div className="wrap">
              {[
                ['care', 'Overview'],
                ['care-routine', 'Routine'],
                ['care-notes', 'Mood & notes'],
                ['progress', 'Activity'],
                ['care-memories', 'Memories'],
                ['report', 'Care report'],
                ['learn', 'Learn'],
                ['care-settings', 'Settings'],
              ].map(([href, label]) => {
                return (
                  <a
                    key={href}
                    href={`#${href}`}
                    aria-current={route === href ? 'page' : undefined}
                  >
                    {label}
                  </a>
                )
              })}
            </div>
          </nav>
        )}
        {caregiver && (
          <div className="system-strip">
            <div className="wrap">
              <span>
                <i aria-hidden="true" /> Offline companion
              </span>
              <span>{routeLabel}</span>
              <span>Private on this device</span>
            </div>
          </div>
        )}
      </header>
      <main
        id="main"
        className={`wrap page page--${route.replace(/[^a-z0-9-]/g, '')}`}
        tabIndex={-1}
      >
        {children}
      </main>
      {!caregiver && (
        <nav className="bnav patient-nav" aria-label="Main menu">
          <div className="wrap">
            {PATIENT_LINKS.map(({ href, icon, label }) => {
              return (
                <a key={href} href={`#${href}`} aria-current={route === href ? 'page' : undefined}>
                  <AppIcon name={icon} size={24} />
                  {label}
                </a>
              )
            })}
          </div>
        </nav>
      )}
    </div>
  )
}

function getRouteLabel(route: string, caregiver: boolean) {
  if (route.startsWith('play-') || route.startsWith('board-')) {
    return 'Cognitive activity'
  }

  if (caregiver) {
    return 'Care workspace'
  }

  return 'Daily companion'
}

function useThemeEffect(
  settings: { text: number; theme: 'light' | 'dark'; contrast: boolean },
  mode: 'patient' | 'caregiver',
) {
  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty('--fs', ['18px', '20px', '23px'][settings.text] ?? '20px')
    root.dataset.theme = settings.theme
    root.dataset.mode = mode
    if (settings.contrast) {
      root.setAttribute('data-contrast', 'high')
    } else {
      root.removeAttribute('data-contrast')
    }
    document.body.classList.toggle('patient', mode === 'patient')
    document.body.classList.toggle('caregiver', mode === 'caregiver')
  }, [settings.text, settings.theme, settings.contrast, mode])
}
