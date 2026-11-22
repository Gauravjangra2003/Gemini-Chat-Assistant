import { ClerkLoaded, ClerkLoading, ClerkProvider, Show } from '@clerk/react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AuthPage from './components/AuthPage.jsx'
import { clerkAppearance } from './clerkAppearance.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider afterSignOutUrl="/" appearance={clerkAppearance}>
      <ClerkLoading>
        <div className="h-dvh flex items-center justify-center bg-gray-100">
          <div className="w-10 h-10 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin" />
        </div>
      </ClerkLoading>
      <ClerkLoaded>
        <Show when="signed-out">
          <AuthPage />
        </Show>
        <Show when="signed-in">
          <App />
        </Show>
      </ClerkLoaded>
    </ClerkProvider>
  </StrictMode>,
)
