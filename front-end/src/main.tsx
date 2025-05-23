import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import App from '@/App.tsx'
import 'uno.css'
import '@/assets/style.css';

const queryClient = new QueryClient()
const dev_mode = import.meta.env.VITE_DEV_MODE === 'true' ? true : false;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <App />
        {dev_mode && <ReactQueryDevtools position='bottom-right'/>}
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
)