import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { createClient } from '@supabase/supabase-js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 8000


const supabaseUrl = process.env.SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('ERROR: Missing SUPABASE_URL or SUPABASE_SERVICE_KEY / SUPABASE_SERVICE_ROLE_KEY in .env')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)


const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions))
app.use(express.json())


app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() })
})


app.post('/missions', async (req, res) => {
  try {
    const { title, description, deadline, priority, requester_name, requester_email, requester_phone } = req.body

    
    if (!title || !requester_email) {
      return res.status(400).json({ error: 'Missing required fields: title, requester_email' })
    }

    
    const { data, error } = await supabase
      .from('missions')
      .insert([
        {
          title,
          description,
          deadline,
          priority: priority || 'medium',
          status: 'pending',
          requester_name,
          requester_email,
          requester_phone,
          created_at: new Date().toISOString()
        }
      ])
      .select()

    if (error) {
      console.error('Supabase error:', error)
      return res.status(500).json({ error: 'Failed to create mission', details: error.message })
    }

    res.status(201).json({ success: true, mission: data[0] })
  } catch (err) {
    console.error('Server error:', err)
    res.status(500).json({ error: 'Internal server error', details: err.message })
  }
})


app.get('/missions', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('missions')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      return res.status(500).json({ error: 'Failed to fetch missions', details: error.message })
    }

    res.json({ missions: data })
  } catch (err) {
    console.error('Server error:', err)
    res.status(500).json({ error: 'Internal server error', details: err.message })
  }
})


app.get('/missions/:id', async (req, res) => {
  try {
    const { id } = req.params

    const { data, error } = await supabase
      .from('missions')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      return res.status(404).json({ error: 'Mission not found', details: error.message })
    }

    res.json({ mission: data })
  } catch (err) {
    console.error('Server error:', err)
    res.status(500).json({ error: 'Internal server error', details: err.message })
  }
})


app.patch('/missions/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { status } = req.body

    if (!status) {
      return res.status(400).json({ error: 'Missing required field: status' })
    }

    const { data, error } = await supabase
      .from('missions')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()

    if (error) {
      return res.status(500).json({ error: 'Failed to update mission', details: error.message })
    }

    res.json({ success: true, mission: data[0] })
  } catch (err) {
    console.error('Server error:', err)
    res.status(500).json({ error: 'Internal server error', details: err.message })
  }
})


app.use((err, req, res, next) => {
  console.error('Unhandled error:', err)
  res.status(500).json({ error: 'Internal server error' })
})


app.listen(PORT, () => {
  console.log(`✓ Server running on http://localhost:${PORT}`)
  console.log(`✓ CORS enabled for: ${corsOptions.origin.join(', ')}`)
})
