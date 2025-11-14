import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { Provider as JotaiProvider } from 'jotai'
import ThemeProvider from '@/components/ThemeProvider'
import { router } from '@/router'
import '@/styles/global.less'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <JotaiProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </JotaiProvider>
  </StrictMode>
)
