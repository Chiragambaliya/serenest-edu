import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { applyTheme, DEFAULT_THEME } from './themes'
import './index.css'
import App from './App.jsx'

applyTheme(DEFAULT_THEME)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
