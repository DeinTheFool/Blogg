// rask js for å laste opp testsidenes funksjoner
import { renderPostForm } from './components/post-form.js'
import { renderPostList } from './components/post-list.js'
import { createClient } from '@supabase/supabase-js'

const formContainer = document.getElementById('post-form')
const listContainer = document.getElementById('post-list')



renderPostForm(formContainer, async () => {
  await renderPostList(listContainer)
})


renderPostList(listContainer)


function getPost() { // finne ID, lagre som variabel, bruke ID for å finne data
  let postID = id;
  // redirect med id
  
}