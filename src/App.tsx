import { useEffect, type ReactNode } from 'react'
import { AppShell } from './components/AppShell'
import { useHashRoute } from './hooks/useHashRoute'
import { AppStateProvider, useAppState } from './state/AppStateContext'
import { HomePage } from './pages/patient/HomePage'
import { GamesPage } from './pages/patient/GamesPage'
import { DayPage } from './pages/patient/DayPage'
import { MemoriesPage } from './pages/patient/MemoriesPage'
import { MoodPage } from './pages/patient/MoodPage'
import { ActivityPage } from './pages/patient/ActivityPage'
import { HelpPage } from './pages/patient/HelpPage'
import { LearnPage } from './pages/patient/LearnPage'
import { DashboardPage } from './pages/caregiver/DashboardPage'
import { RoutinePage } from './pages/caregiver/RoutinePage'
import { NotesPage } from './pages/caregiver/NotesPage'
import { ProgressPage } from './pages/caregiver/ProgressPage'
import { CareMemoriesPage } from './pages/caregiver/CareMemoriesPage'
import { ReportPage } from './pages/caregiver/ReportPage'
import { SettingsPage } from './pages/caregiver/SettingsPage'
import { GamePage } from './features/games/GamePage'
import { BoardGamePage } from './features/games/BoardGamePage'

const CARE_ROUTES = new Set([
  'care',
  'care-routine',
  'care-notes',
  'progress',
  'care-memories',
  'report',
  'care-settings',
])

function Routes() {
  const route = useHashRoute()
  const { state, setMode } = useAppState()

  useEffect(() => {
    if (CARE_ROUTES.has(route) && state.mode !== 'caregiver' && !state.settings.pin) {
      setMode('caregiver')
    }

    if (
      (route === 'home' || route.startsWith('play-') || route.startsWith('board-')) &&
      state.mode !== 'patient'
    ) {
      setMode('patient')
    }
  }, [route, state.mode, state.settings.pin, setMode])

  let page: ReactNode

  if (route.startsWith('play-')) {
    page = <GamePage id={route.slice(5)} />
  } else if (route.startsWith('board-')) {
    page = <BoardGamePage id={route.slice(6)} />
  } else {
    page = (
      {
        home: <HomePage />,
        games: <GamesPage />,
        day: <DayPage />,
        memories: <MemoriesPage />,
        mood: <MoodPage />,
        activity: <ActivityPage />,
        help: <HelpPage />,
        learn: <LearnPage />,
        care: <DashboardPage />,
        'care-routine': <RoutinePage />,
        'care-notes': <NotesPage />,
        progress: <ProgressPage />,
        'care-memories': <CareMemoriesPage />,
        report: <ReportPage />,
        'care-settings': <SettingsPage />,
      } as Record<string, ReactNode>
    )[route] ?? <HomePage />
  }

  return <AppShell route={route}>{page}</AppShell>
}

export default function App() {
  return (
    <AppStateProvider>
      <Routes />
    </AppStateProvider>
  )
}
