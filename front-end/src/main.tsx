import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from '@/App.tsx'
import 'uno.css'
import '@/assets/style.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
