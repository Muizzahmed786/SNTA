import { createRoot } from 'react-dom/client'
import '@fontsource/atkinson-hyperlegible/latin-400.css'
import '@fontsource/atkinson-hyperlegible/latin-700.css'
import '@fontsource/ibm-plex-mono/latin-500.css'
import '@fontsource/ibm-plex-mono/latin-600.css'
import '@fontsource/lexend/latin-600.css'
import '@fontsource/lexend/latin-700.css'
import App from './App'
import './styles.css'

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('The React root element was not found.')
}

createRoot(rootElement).render(<App />)
