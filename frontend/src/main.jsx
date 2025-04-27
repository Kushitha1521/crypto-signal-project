import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AdSenseAd from './AdSenseAd.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AdSenseAd/>
    <App />
  </StrictMode>,
)
