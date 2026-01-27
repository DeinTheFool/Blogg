import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)


export async function isAuthenticated() {
    const { data: { session } } = await supabase.auth.getSession()
    return !!session
}


export async function getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser()
    return user
}


export async function logout() {
    await supabase.auth.signOut()
    localStorage.removeItem('user_token')
    localStorage.removeItem('user_email')
    window.location.href = '/'
}