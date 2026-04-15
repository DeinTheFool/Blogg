import { supabase } from './modules/supabase.js'

export async function handleLogin(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error) {
    throw error
  }

  localStorage.setItem('user_token', data.session.access_token)
  localStorage.setItem('user_email', data.user.email)

  return data
}
