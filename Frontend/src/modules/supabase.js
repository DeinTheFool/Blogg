import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

// start session når appen lastes
let sessionInitialized = false

export async function initializeSession() {
  if (sessionInitialized) return
  
  try {
    const { data, error } = await supabase.auth.getSession()
    if (error) {
      console.error('Session initialization error:', error)
    }
    sessionInitialized = true
  } catch (error) {
    console.error('Error initializing session:', error)
    sessionInitialized = true
  }
}

export async function isAuthenticated() {
    // passer på at en session blir gjenopptatt før den går gjennom hele prosessen
    await initializeSession()
    
    try {
      const { data: { session }, error } = await supabase.auth.getSession()
      
      if (error) {
        console.error('Error checking session:', error)
        return false
      }
      
      console.log('Session check - authenticated:', !!session)
      if (session) {
        console.log('Session user:', session.user.email)
      }
      
      return !!session
    } catch (error) {
      console.error('Exception in isAuthenticated:', error)
      return false
    }
}


export async function getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser()
    return user
}


export async function logout() {
    try {
        await supabase.auth.signOut()
        localStorage.removeItem('user_token')
        localStorage.removeItem('user_email')
        window.location.replace('/assets/login.html')
    } catch (error) {
        console.error('Logout error:', error)
        window.location.replace('/assets/login.html')
    }
}