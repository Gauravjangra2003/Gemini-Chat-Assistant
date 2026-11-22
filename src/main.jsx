import { ClerkLoaded, ClerkLoading, ClerkProvider, Show } from '@clerk/react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AuthPage from './components/AuthPage.jsx'
import { clerkAppearance } from './clerkAppearance.js'

const root = createRoot(document.getElementById('root'))

if (!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY) {
  root.render(
    <div className="h-dvh flex items-center justify-center bg-gray-100 p-6">
      <div className="max-w-md bg-white rounded-2xl border border-red-200 shadow-sm p-6 text-center">
        <h1 className="text-lg font-bold text-red-600">Missing VITE_CLERK_PUBLISHABLE_KEY</h1>
        <p className="text-sm text-gray-600 mt-2">
          Add it to your .env file locally, or to your hosting provider's environment variables, then rebuild.
        </p>
      </div>
    </div>
  )
} else {
  root.render(
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
    </StrictMode>
  )
}
