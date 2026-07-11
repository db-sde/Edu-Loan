import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.widget.css'
import App from './App.tsx'

const DEFAULT_CONTAINER_ID = 'db-education-loan-calculator'

// document.currentScript is only valid during synchronous script execution,
// so it must be captured here, before any async/deferred mounting happens.
const currentScript = document.currentScript as HTMLScriptElement | null

function mount() {
  const targetId = currentScript?.dataset.target
  let container = document.getElementById(targetId || DEFAULT_CONTAINER_ID)

  if (!container) {
    container = document.createElement('div')
    container.id = targetId || DEFAULT_CONTAINER_ID
    if (currentScript?.parentNode) {
      currentScript.parentNode.insertBefore(container, currentScript.nextSibling)
    } else {
      document.body.appendChild(container)
    }
  }

  createRoot(container).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mount)
} else {
  mount()
}
