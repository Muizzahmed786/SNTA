export type Mode = 'patient' | 'caregiver'
export type AppIconName =
  | 'appointment'
  | 'arrow-left'
  | 'arrow-right'
  | 'basket'
  | 'brain'
  | 'calendar'
  | 'call'
  | 'camera'
  | 'cards'
  | 'check'
  | 'circle'
  | 'close'
  | 'dice'
  | 'family'
  | 'flower'
  | 'games'
  | 'grid'
  | 'handshake'
  | 'heart'
  | 'home'
  | 'image'
  | 'meal'
  | 'medicine'
  | 'message'
  | 'moon'
  | 'mood-anxious'
  | 'mood-calm'
  | 'mood-confused'
  | 'mood-frustrated'
  | 'mood-happy'
  | 'mood-sad'
  | 'mood-tired'
  | 'number-order'
  | 'pin'
  | 'search'
  | 'shapes'
  | 'sleeping'
  | 'sort'
  | 'star'
  | 'sun'
  | 'text'
  | 'train'
  | 'volume'
  | 'walking'
export type RoutineType =
  'wake' | 'meal' | 'med' | 'activity' | 'exercise' | 'family' | 'appt' | 'sleep' | 'other'
export type MoodId = 'happy' | 'calm' | 'sad' | 'anxious' | 'confused' | 'tired' | 'frustrated'

export interface RoutineItem {
  id: string
  time: string
  title: string
  type: RoutineType
  note?: string
}
export interface GameSession {
  id: string
  game: string
  cat: string
  date: string
  mins: number
  diff: number | null
  enjoy?: number
  players?: string[] | null
}
export interface MoodEntry {
  id: string
  date: string
  mood: MoodId
  by: string
}
export interface Observation {
  id: string
  date: string
  cat: string
  text: string
  by: string
}
export interface Appointment {
  id: string
  date: string
  time: string
  title: string
  with: string
}
export interface FamilyMember {
  id: string
  name: string
  rel: string
  desc: string
  av: number
  photo: string | null
}
export interface JournalEntry {
  id: string
  title: string
  when: string
  text: string
  icon: string
  photo: string | null
  audio: string | null
}
export interface Contact {
  id: string
  name: string
  rel: string
  phone: string
  primary: boolean
}
export interface MedicalInfo {
  name: string
  dob: string
  blood: string
  conditions: string
  allergies: string
  meds: string
  lives: string
  showId: boolean
}
export interface Settings {
  name: string
  text: number
  theme: 'light' | 'dark'
  contrast: boolean
  sound: boolean
  voice: boolean
  simple: boolean
  pin: string
}
export interface SharingSettings {
  who: string
  activity: boolean
  mood: boolean
  notes: boolean
  routine: boolean
  log: { when: string; text: string }[]
}

export interface AppState {
  v: 1
  sample: boolean
  mode: Mode
  settings: Settings
  routine: RoutineItem[]
  done: Record<string, Record<string, string>>
  snooze: Record<string, number>
  sessions: GameSession[]
  moods: MoodEntry[]
  prefs: Record<string, { diff: number; len: number }>
  observations: Observation[]
  appts: Appointment[]
  family: FamilyMember[]
  journal: JournalEntry[]
  contacts: Contact[]
  medical: MedicalInfo
  sharing: SharingSettings
}

export interface GameDefinition {
  id: string
  name: string
  cat: string
  icon: AppIconName
  how: string
}
