import type { AppIconName, GameDefinition, MoodId, RoutineType } from '../types/domain'

export const ROUTINE_TYPES: Record<RoutineType, [AppIconName, string]> = {
  wake: ['sun', 'Wake up'],
  meal: ['meal', 'Meal'],
  med: ['medicine', 'Medicine'],
  activity: ['games', 'Activity'],
  exercise: ['walking', 'Exercise'],
  family: ['message', 'Family time'],
  appt: ['appointment', 'Appointment'],
  sleep: ['sleeping', 'Bedtime'],
  other: ['pin', 'Other'],
}

export const MOODS: { id: MoodId; icon: AppIconName; label: string }[] = [
  { id: 'happy', icon: 'mood-happy', label: 'Happy' },
  { id: 'calm', icon: 'mood-calm', label: 'Calm' },
  { id: 'sad', icon: 'mood-sad', label: 'Sad' },
  { id: 'anxious', icon: 'mood-anxious', label: 'Anxious' },
  { id: 'confused', icon: 'mood-confused', label: 'Confused' },
  { id: 'tired', icon: 'mood-tired', label: 'Tired' },
  { id: 'frustrated', icon: 'mood-frustrated', label: 'Frustrated' },
]
export const moodById = (id: MoodId) => {
  return (
    MOODS.find((mood) => {
      return mood.id === id
    }) ?? MOODS[1]
  )
}
export const HARD_MOODS: MoodId[] = ['sad', 'anxious', 'confused', 'frustrated']
export const OBSERVATION_CATEGORIES = [
  'Confusion',
  'Sleep',
  'Mood',
  'Familiar tasks',
  'Appetite',
  'Social engagement',
  'Other',
]

export const GAMES: GameDefinition[] = [
  {
    id: 'match',
    name: 'Matching pairs',
    cat: 'Memory',
    icon: 'cards',
    how: 'Turn over two cards at a time and find matching pictures.',
  },
  {
    id: 'sequence',
    name: 'Follow the flowers',
    cat: 'Memory',
    icon: 'flower',
    how: 'Watch the flowers, then tap them in the same order.',
  },
  {
    id: 'missing',
    name: 'What went away?',
    cat: 'Memory',
    icon: 'basket',
    how: 'Look at the pictures and choose the one that went away.',
  },
  {
    id: 'faces',
    name: 'Familiar faces',
    cat: 'Memory',
    icon: 'family',
    how: 'Look at a familiar person and choose their name.',
  },
  {
    id: 'odd',
    name: 'Spot the different one',
    cat: 'Attention',
    icon: 'search',
    how: 'Choose the picture that is different.',
  },
  {
    id: 'pattern',
    name: 'What comes next?',
    cat: 'Reasoning',
    icon: 'shapes',
    how: 'Look at the pattern and choose what comes next.',
  },
  {
    id: 'category',
    name: 'Sort it out',
    cat: 'Reasoning',
    icon: 'sort',
    how: 'Choose the group that the picture belongs to.',
  },
  {
    id: 'picword',
    name: 'Name the picture',
    cat: 'Language',
    icon: 'image',
    how: 'Choose the word that names the picture.',
  },
  {
    id: 'word',
    name: 'Finish the word',
    cat: 'Language',
    icon: 'text',
    how: 'Choose the missing letter.',
  },
  {
    id: 'order',
    name: 'Put in order',
    cat: 'Visual-spatial',
    icon: 'number-order',
    how: 'Tap the items in the right order.',
  },
]

export const BOARD_GAMES: GameDefinition[] = [
  {
    id: 'snakes',
    name: 'Snakes and Ladders',
    cat: 'Social',
    icon: 'dice',
    how: 'Take turns rolling the dice. The first to reach 100 wins.',
  },
  {
    id: 'ttt',
    name: 'Noughts and Crosses',
    cat: 'Social',
    icon: 'circle',
    how: 'Take turns and get three in a row.',
  },
  {
    id: 'c4',
    name: 'Connect Four',
    cat: 'Social',
    icon: 'grid',
    how: 'Take turns and line up four counters.',
  },
  {
    id: 'teammatch',
    name: 'Team memory match',
    cat: 'Social',
    icon: 'handshake',
    how: 'Work together to find every matching pair.',
  },
]

export const gameById = (id: string) => {
  return [...GAMES, ...BOARD_GAMES].find((game) => {
    return game.id === id
  })
}
