import { supabase } from '../modules/supabase.js'

export function renderPostForm(container, onSuccess) {
  container.innerHTML = `
    <h2>Lag blogg</h2>
    <form id="post-create-form">
      <div>
        <label>Tittel<br><input name="title" required></label>
      </div>
      <div>
        <label>Utdrag<br><textarea name="excerpt"></textarea></label>
      </div>
      <div>
        <label>Content<br><textarea name="content" required></textarea></label>
      </div>
      <div>
        <button type="submit">Ferdig</button>
        <span id="post-form-status" style="margin-left:12px"></span>
      </div>
    </form>
  `

  const form = container.querySelector('#post-create-form')
  const statusEl = container.querySelector('#post-form-status')

  form.addEventListener('submit', async (ev) => {
    ev.preventDefault()
    statusEl.textContent = 'Saving…'

    const formData = new FormData(form)
    const title = formData.get('title').trim()
    const excerpt = formData.get('excerpt').trim()
    const content = formData.get('content').trim()

    if (!title || !content) {
      statusEl.textContent = 'Trenger tittel og innhold'
      return
    }

    try {
      const slug = slugify(title)
      const { data, error } = await supabase.from('posts').insert([
        { title, slug, excerpt, content, status: 'published' }
      ]).select()

      if (error) throw error

      statusEl.textContent = 'Saved.'
      form.reset()
      if (typeof onSuccess === 'function') onSuccess(data[0])
    } catch (err) {
      console.error('Failed to save post', err)
      statusEl.textContent = 'Error: ' + (err.message || err)
    }
  })
}

function slugify(s) {
  return String(s)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}
