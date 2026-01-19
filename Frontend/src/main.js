import { renderPostForm } from './components/post-form.js'
import { renderPostList } from './components/post-list.js'

const formContainer = document.getElementById('post-form')
const listContainer = document.getElementById('post-list')

renderPostForm(formContainer, async () => {
  // refresh list after new post created
  await renderPostList(listContainer)
})

// initial load
renderPostList(listContainer)
