// rask js for å laste opp testsidenes funksjoner
import { renderPostForm } from './components/post-form.js'
import { renderPostList } from './components/post-list.js'
import { createClient } from '@supabase/supabase-js'

const formContainer = document.getElementById('post-form')
const listContainer = document.getElementById('post-list')
const VITE_SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const VITE_SUPABASE_SERVICE_KEY = import.meta.env.VITE_SUPABASE_SERVICE_KEY
const supabase = createClient(VITE_SUPABASE_URL, VITE_SUPABASE_SERVICE_KEY)
const { data, error } = await supabase.auth.refreshSession()


renderPostForm(formContainer, async () => {
  await renderPostList(listContainer)
})


renderPostList(listContainer)


function getPost() { // finne ID, lagre som variabel, bruke ID for å finne data
  let postID = id;
  // redirect med id
  
}