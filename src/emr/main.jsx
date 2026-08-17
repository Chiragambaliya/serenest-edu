import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './emr.css'

createRoot(document.getElementById('emr-root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
