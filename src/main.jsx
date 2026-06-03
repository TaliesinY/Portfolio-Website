import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Portfolio from "./TaliesinPortfolio.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Portfolio />
  </StrictMode>
)