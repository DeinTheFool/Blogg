import { supabase } from '../modules/supabase.js'

export async function renderPostList(container) {
  container.innerHTML = '<h2>Poster</h2><p>Loading…</p>'

  try {
    const { data, error } = await supabase
      .from('posts')
      .select('id, title, slug, excerpt, created_at')
      .order('created_at', { ascending: false })

    if (error) throw error

    if (!data || data.length === 0) {
      container.innerHTML = '<h2>Posts</h2><p>No posts yet.</p>'
      return
    }

    const list = document.createElement('div')
    list.className = 'post-list'

    data.forEach(post => {
      const el = document.createElement('article')
      el.className = 'post-card'
      el.id = post.id
      const date = post.created_at ? new Date(post.created_at).toLocaleString() : ''
      el.innerHTML = `
        <h3>${escapeHtml(post.title)}</h3>
        <p class="meta">${date}</p>
        <p>${escapeHtml(post.excerpt || '')}</p>
      `
      list.appendChild(el)
    })

    container.innerHTML = '<h2>Posts</h2>'
    container.appendChild(list)
  } catch (err) {
    console.error('Failed to load posts', err)
    container.innerHTML = `<h2>Posts</h2><p class="error">Failed to load posts: ${escapeHtml(err.message || err)}</p>`
  }
}

function escapeHtml(str) {
  if (!str) return ''
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
