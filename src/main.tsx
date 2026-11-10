import { createRoot } from 'react-dom/client'
import '@fontsource/atkinson-hyperlegible/latin-400.css'
import '@fontsource/atkinson-hyperlegible/latin-700.css'
import App from './App'
import './design-system.css'

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('The React root element was not found.')
}

createRoot(rootElement).render(<App />)
