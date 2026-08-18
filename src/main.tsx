import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Pico styles the bare HTML elements. Our own sheets load after it so the
// project-specific classes keep the final say.
import '@picocss/pico/css/pico.jade.min.css'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
