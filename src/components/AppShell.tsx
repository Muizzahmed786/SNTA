import { useEffect, type ReactNode } from 'react'
import { useAppState } from '../state/AppStateContext'
import { navigate } from '../hooks/useHashRoute'
import type { AppIconName } from '../types/domain'
import { AppIcon } from './AppIcon'

const PATIENT_LINKS: { href: string; icon: AppIconName; label: string }[] = [
  { href: 'home', icon: 'home', label: 'Home' },
  { href: 'games', icon: 'games', label: 'Games' },
  { href: 'day', icon: 'calendar', label: 'My day' },
  { href: 'memories', icon: 'family', label: 'Memories' },
  { href: 'help', icon: 'call', label: 'Help' },
]

const CARE_LINKS: { href: string; icon: AppIconName; label: string }[] = [
  { href: 'care', icon: 'home', label: 'Overview' },
  { href: 'care-routine', icon: 'calendar', label: 'Routine' },
  { href: 'care-notes', icon: 'message', label: 'Mood & notes' },
  { href: 'progress', icon: 'star', label: 'Activity' },
  { href: 'care-memories', icon: 'camera', label: 'Memories' },
  { href: 'report', icon: 'text', label: 'Care report' },
  { href: 'learn', icon: 'brain', label: 'Guidance' },
  { href: 'care-settings', icon: 'shapes', label: 'Settings' },
]

function BrandMark() {
  return (
    <svg className="brand-mark" viewBox="0 0 48 48" aria-hidden="true">
      <path
        d="M24 5c8 5 13 11 13 19S32 38 24 43c-8-5-13-11-13-19S16 10 24 5Z"
        fill="currentColor"
      />
      <path
        d="M24 12c-4.7 3.2-7.5 7.2-7.5 12s2.8 8.8 7.5 12c4.7-3.2 7.5-7.2 7.5-12S28.7 15.2 24 12Z"
        fill="var(--brand-cutout)"
      />
      <path d="M24 13v22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

function Brand({ caregiver }: { caregiver: boolean }) {
  return (
    <a className="brand" href={caregiver ? '#care' : '#home'} aria-label="SNTA home">
      <BrandMark />
      <span className="brand-copy">
        <b>SNTA</b>
        <small>{caregiver ? 'Care companion' : 'A familiar place, every day'}</small>
      </span>
    </a>
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

  return (
    <div className={`app app--${state.mode}`}>
      <a className="skip" href="#main">
        Skip to content
      </a>
      {caregiver ? (
        <div className="care-shell">
          <aside className="care-rail">
            <Brand caregiver />
            <div className="care-person">
              <span className="care-person__avatar" aria-hidden="true">
                {state.settings.name.trim()[0] || 'A'}
              </span>
              <span>
                <small>Supporting</small>
                <strong>{state.settings.name}</strong>
              </span>
            </div>
            <nav className="care-nav" aria-label="Caregiver sections">
              {CARE_LINKS.map(({ href, icon, label }) => (
                <a key={href} href={`#${href}`} aria-current={route === href ? 'page' : undefined}>
                  <AppIcon name={icon} size={20} />
                  <span>{label}</span>
                </a>
              ))}
            </nav>
            <div className="care-rail__footer">
              <button className="view-switch" type="button" onClick={() => changeMode('patient')}>
                <AppIcon name="arrow-left" size={18} />
                Open patient view
              </button>
              <span className="privacy-note">
                <i aria-hidden="true" /> Stored privately on this device
              </span>
            </div>
          </aside>
          <div className="care-canvas">
            <header className="care-topbar">
              <Brand caregiver />
              <nav className="care-mobile-nav" aria-label="Caregiver sections">
                {CARE_LINKS.slice(0, 6).map(({ href, icon, label }) => (
                  <a
                    key={href}
                    href={`#${href}`}
                    aria-current={route === href ? 'page' : undefined}
                  >
                    <AppIcon name={icon} size={18} />
                    {label}
                  </a>
                ))}
              </nav>
              <div className="top-actions">
                <button
                  className="icon-button"
                  type="button"
                  onClick={toggleTheme}
                  aria-label="Toggle colour theme"
                >
                  <AppIcon name={state.settings.theme === 'light' ? 'moon' : 'sun'} size={20} />
                </button>
                <a className="help-chip" href="#help">
                  <AppIcon name="call" size={18} /> Help
                </a>
              </div>
            </header>
            <main
              id="main"
              className={`page page--${route.replace(/[^a-z0-9-]/g, '')}`}
              tabIndex={-1}
            >
              {children}
            </main>
          </div>
        </div>
      ) : (
        <>
          <header className="patient-top">
            <div className="wrap patient-top__in">
              <Brand caregiver={false} />
              <div className="top-actions">
                <span className="patient-status">
                  <i aria-hidden="true" /> Private & offline
                </span>
                <button
                  className="icon-button"
                  type="button"
                  onClick={toggleTheme}
                  aria-label="Toggle colour theme"
                >
                  <AppIcon name={state.settings.theme === 'light' ? 'moon' : 'sun'} size={22} />
                </button>
                <button
                  className="caregiver-entry"
                  type="button"
                  onClick={() => changeMode('caregiver')}
                >
                  Caregiver view
                  <AppIcon name="arrow-right" size={18} />
                </button>
              </div>
            </div>
          </header>
          <main
            id="main"
            className={`wrap page page--${route.replace(/[^a-z0-9-]/g, '')}`}
            tabIndex={-1}
          >
            {children}
          </main>
          <nav className="patient-nav" aria-label="Main menu">
            <div>
              {PATIENT_LINKS.map(({ href, icon, label }) => (
                <a key={href} href={`#${href}`} aria-current={route === href ? 'page' : undefined}>
                  <AppIcon name={icon} size={24} />
                  <span>{label}</span>
                </a>
              ))}
            </div>
          </nav>
        </>
      )}
    </div>
  )
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
