// rask js for å laste opp testsidenes funksjoner
import { renderPostForm } from './components/post-form.js'
import { renderPostList } from './components/post-list.js'

const formContainer = document.getElementById('post-form')
const listContainer = document.getElementById('post-list')

renderPostForm(formContainer, async () => {
  await renderPostList(listContainer)
})


renderPostList(listContainer)
