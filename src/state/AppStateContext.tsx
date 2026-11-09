import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { createSeedState } from '../data/seed'
import { dateKey, uid } from '../lib/date'
import type { AppState, GameSession, Mode, MoodId } from '../types/domain'

const STORAGE_KEY = 'snta.v1'
type Mutator = (draft: AppState) => void

interface AppStateValue {
  state: AppState
  update: (mutator: Mutator) => void
  setMode: (mode: Mode) => void
  isDone: (id: string, day?: string) => boolean
  toggleDone: (id: string) => void
  addMood: (mood: MoodId, by?: string) => void
  addSession: (session: Omit<GameSession, 'id' | 'date'>) => void
  restoreSample: () => void
  clearData: () => void
}

const AppStateContext = createContext<AppStateValue | null>(null)

function loadState(): AppState {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored) as AppState

      if (parsed?.v === 1) {
        const defaults = createSeedState()

        return {
          ...parsed,
          settings: {
            ...defaults.settings,
            ...parsed.settings,
          },
        }
      }
    }
  } catch {
    /* fall back to sample data */
  }
  return createSeedState()
}

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(loadState)
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      /* storage may be full */
    }
  }, [state])

  const update = useCallback((mutator: Mutator) => {
    setState((current) => {
      const next = structuredClone(current)
      mutator(next)
      return next
    })
  }, [])
  const setMode = useCallback(
    (mode: Mode) => {
      update((draft) => {
        draft.mode = mode
      })
    },
    [update],
  )

  const isDone = useCallback(
    (id: string, day = dateKey()) => {
      return Boolean(state.done[day]?.[id])
    },
    [state.done],
  )

  const toggleDone = useCallback(
    (id: string) => {
      update((draft) => {
        const day = dateKey()
        draft.done[day] ??= {}

        if (draft.done[day][id]) {
          delete draft.done[day][id]
        } else {
          draft.done[day][id] = new Date().toISOString()
        }

        delete draft.snooze[id]
      })
    },
    [update],
  )

  const addMood = useCallback(
    (mood: MoodId, by?: string) => {
      update((draft) => {
        draft.moods.push({
          id: uid(),
          date: new Date().toISOString(),
          mood,
          by: by ?? draft.settings.name,
        })
      })
    },
    [update],
  )

  const addSession = useCallback(
    (session: Omit<GameSession, 'id' | 'date'>) => {
      update((draft) => {
        draft.sessions.push({ ...session, id: uid(), date: new Date().toISOString() })
      })
    },
    [update],
  )

  const restoreSample = useCallback(() => {
    setState(createSeedState())
  }, [])
  const clearData = useCallback(() => {
    const empty = createSeedState()
    setState({
      ...empty,
      sample: false,
      mode: 'caregiver',
      settings: { ...empty.settings, name: 'Friend' },
      routine: [],
      done: {},
      sessions: [],
      moods: [],
      observations: [],
      appts: [],
      family: [],
      journal: [],
      contacts: [],
      medical: {
        name: '',
        dob: '',
        blood: '',
        conditions: '',
        allergies: '',
        meds: '',
        lives: '',
        showId: false,
      },
    })
  }, [])

  const value = useMemo(() => {
    return {
      state,
      update,
      setMode,
      isDone,
      toggleDone,
      addMood,
      addSession,
      restoreSample,
      clearData,
    }
  }, [state, update, setMode, isDone, toggleDone, addMood, addSession, restoreSample, clearData])
  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>
}

export function useAppState() {
  const context = useContext(AppStateContext)

  if (!context) {
    throw new Error('useAppState must be used within AppStateProvider')
  }

  return context
}
