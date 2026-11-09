import { useEffect, useState } from 'react'

const readRoute = () => {
  return window.location.hash.slice(1) || 'home'
}

export function useHashRoute() {
  const [route, setRoute] = useState(readRoute)

  useEffect(() => {
    const onChange = () => {
      setRoute(readRoute())
    }

    window.addEventListener('hashchange', onChange)

    return () => {
      window.removeEventListener('hashchange', onChange)
    }
  }, [])

  return route
}

export const navigate = (route: string) => {
  window.location.hash = route
}
