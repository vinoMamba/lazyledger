import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Application } from './application'
import { QueryClient } from '@tanstack/react-query'
import { Providers } from './providers'

const root = document.getElementById('root')
if (!root) {
  throw new Error('Root element not found')
}

const queryClient = new QueryClient()



createRoot(root).render(
  <StrictMode>
    <Providers reactQuery={{ client: queryClient }}>
      <Application />
    </Providers>
  </StrictMode>,
)
