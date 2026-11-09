export const pad = (value: number) => {
  return String(value).padStart(2, '0')
}

export const dateKey = (date = new Date()) => {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

export const uid = () => {
  return Math.random().toString(36).slice(2, 10)
}

export const daysAgo = (days: number) => {
  const date = new Date()
  date.setDate(date.getDate() - days)

  return date
}

export const parseDateKey = (key: string) => {
  const [year, month, day] = key.split('-').map(Number)

  return new Date(year, month - 1, day)
}

export const atTime = (time: string, base = new Date()) => {
  const [hour, minute] = time.split(':').map(Number)
  const date = new Date(base)
  date.setHours(hour, minute, 0, 0)

  return date
}

export const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export const formatShort = (date: Date) => {
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
}

export const formatTime = (date: Date) => {
  return date.toLocaleTimeString('en-IN', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
}

export const time12 = (time: string) => {
  return formatTime(atTime(time))
}
export const greeting = () => {
  const hour = new Date().getHours()
  return hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'
}
