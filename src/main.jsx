import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { TelemetryProvider } from './telemetry/TelemetryProvider'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <TelemetryProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </TelemetryProvider>
    </ThemeProvider>
  </StrictMode>,
)
