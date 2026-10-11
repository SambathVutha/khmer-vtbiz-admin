import type { User, Session } from '@supabase/supabase-js'

export const useAuth = () => {
  const supabase = useSupabase()
  const user = useState<User | null>('supabase_auth_user', () => null)
  const session = useState<Session | null>('supabase_auth_session', () => null)
  const isInitialized = useState<boolean>('supabase_auth_initialized', () => false)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const isAuthenticated = computed(() => !!session.value && !!user.value)

  const getFriendlyErrorMessage = (err: any): string => {
    const msg = err?.message || ''
    const code = err?.code || ''

    if (code === 'invalid_credentials' || msg.includes('Invalid login credentials')) {
      return 'Invalid credentials. Only authorized Super Admin access is permitted.'
    }
    if (code === 'email_not_confirmed' || msg.includes('Email not confirmed')) {
      return 'Super Admin account is not confirmed in Supabase.'
    }
    if (code === 'email_address_invalid' || msg.includes('invalid')) {
      return 'Please enter a valid username or email address.'
    }
    if (msg.toLowerCase().includes('rate limit')) {
      return 'Too many login attempts. Please wait a few moments and try again.'
    }
    return msg || 'Authentication failed. Please verify your credentials.'
  }

  // Initialize session from Supabase on client mount
  const initAuth = async () => {
    if (import.meta.client && !isInitialized.value) {
      try {
        const { data } = await supabase.auth.getSession()
        if (data.session) {
          session.value = data.session
          user.value = data.session.user ?? null
        }

        supabase.auth.onAuthStateChange((_event, currentSession) => {
          session.value = currentSession
          user.value = currentSession?.user ?? null
        })

        isInitialized.value = true
      } catch (err) {
        console.error('Failed to initialize Supabase session:', err)
      }
    }
  }

  // Log in Super Admin via Supabase Auth
  const login = async (identifier: string, pass: string) => {
    loading.value = true
    error.value = null

    try {
      let email = identifier.trim()
      if (!email.includes('@')) {
        email = `${email.toLowerCase()}@khmervtbiz.com`
      }

      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password: pass
      })

      if (authError) {
        throw authError
      }

      user.value = data.user
      session.value = data.session
      loading.value = false

      await navigateTo('/dashboard')
      return { success: true, user: data.user }
    } catch (err: any) {
      loading.value = false
      const friendlyMsg = getFriendlyErrorMessage(err)
      error.value = friendlyMsg
      return { success: false, error: friendlyMsg }
    }
  }

  // Log out Super Admin
  const logout = async () => {
    loading.value = true
    try {
      await supabase.auth.signOut()
      user.value = null
      session.value = null
    } catch (err) {
      console.error('Logout error:', err)
    } finally {
      loading.value = false
      await navigateTo('/login')
    }
  }

  return {
    user,
    session,
    isAuthenticated,
    loading,
    error,
    login,
    logout,
    initAuth
  }
}
