// rask js for å laste opp testsidenes funksjoner
import { renderPostForm } from './components/post-form.js'
import { renderPostList } from './components/post-list.js'
import { isAuthenticated, getCurrentUser, logout } from './modules/supabase.js'

const formContainer = document.getElementById('post-form')
const listContainer = document.getElementById('post-list')
const userInfo = document.getElementById('user-info')

// Viser lasteprossessen
function showLoading() {
  formContainer.innerHTML = '<p>Checking authentication...</p>'
  listContainer.innerHTML = ''
}

// Sjekker om brukeren er logget inn
async function initApp() {
  showLoading()
  
  try {
    console.log('Starting auth check...')
    const authenticated = await isAuthenticated()
    console.log('Auth check result:', authenticated)
    
    if (!authenticated) {
      console.log('Not authenticated, redirecting to login')
      window.location.replace('/assets/login.html')
      return
    }
    
    // Viser siden om brukeren er logget inn
    const user = await getCurrentUser()
    console.log('Welcome,', user.email)
    
    // Bruker-info og log ut knapp
    userInfo.innerHTML = `
      <div style="display: flex; align-items: center; gap: 15px;">
        <span>${user.email}</span>
        <button id="logout-btn" style="padding: 8px 16px; background: #f44336; color: white; border: none; border-radius: 4px; cursor: pointer;">Logout</button>
      </div>
    `
    
    const logoutBtn = document.getElementById('logout-btn')
    logoutBtn.addEventListener('click', () => {
      logout()
    })
    
    // Henter post-utfylling og post-liste
    renderPostForm(formContainer, async () => {
      await renderPostList(listContainer)
    })
    
    renderPostList(listContainer)
  } catch (error) {
    console.error('Error initializing app:', error)
    formContainer.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`
    window.location.replace('/assets/login.html')
  }
}

// Kjører bare på index for å forhindre uendelig loop
if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
  document.addEventListener('DOMContentLoaded', initApp)
}