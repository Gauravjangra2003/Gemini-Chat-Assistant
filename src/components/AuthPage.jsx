import { SignIn, SignUp } from '@clerk/react'

const FEATURES = [
  'Ask anything and get instant AI answers',
  'Your chat history, saved to your account',
  'Works smoothly on mobile and desktop',
]

function AuthPage() {
  const path = window.location.pathname
  const isSignUp = path.startsWith('/sign-up')
  if (!isSignUp && !path.startsWith('/sign-in')) {
    window.history.replaceState(null, '', '/sign-in')
  }

  return (
    <div className="min-h-dvh flex bg-gray-100">
      <section className="hidden lg:flex lg:w-1/2 flex-col justify-between bg-gradient-to-br from-blue-600 to-blue-800 text-white p-12">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white text-blue-600 font-bold flex items-center justify-center shadow-md">
            AI
          </div>
          <span className="text-xl font-bold tracking-tight">AI Assistant</span>
        </div>

        <div>
          <h1 className="text-4xl font-bold leading-tight">
            Your personal AI assistant,
            <br />
            ready when you are.
          </h1>
          <ul className="mt-8 space-y-4">
            {FEATURES.map((feature) => (
              <li key={feature} className="flex items-center gap-3 text-blue-50">
                <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-sm">✓</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <p className="text-sm text-blue-200">Powered by Google Gemini</p>
      </section>

      <section className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8">
        <div className="lg:hidden flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white font-bold flex items-center justify-center shadow-md">
            AI
          </div>
          <span className="text-xl font-bold text-gray-900 tracking-tight">AI Assistant</span>
        </div>

        {isSignUp ? (
          <SignUp routing="path" path="/sign-up" signInUrl="/sign-in" fallbackRedirectUrl="/" />
        ) : (
          <SignIn routing="path" path="/sign-in" signUpUrl="/sign-up" fallbackRedirectUrl="/" />
        )}
      </section>
    </div>
  )
}

export default AuthPage
