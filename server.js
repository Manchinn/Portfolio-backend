// ============================================
// Portfolio Backend API - Express.js
// ============================================

import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const STATIC_DIR = process.env.STATIC_DIR || path.join(__dirname, 'public')

// ============================================
// Middleware
// ============================================

// CORS Configuration
app.use(cors({
  origin: FRONTEND_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

// Parse JSON
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Static assets (e.g., profile images)
app.use('/static', express.static(STATIC_DIR))

// ============================================
// Routes & Data
// ============================================

import apiRoutes from './services/api.js';

// Mount API routes from services
app.use('/api', apiRoutes);

// ============================================
// Additional API Routes (Contact & Health)
// ============================================

/**
 * POST /api/contact
 * ส่งข้อความติดต่อ
 * Body: { name, email, message }
 */
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: name, email, message'
      })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email format'
      })
    }

    // TODO: ส่ง email จริง (ใช้ nodemailer)
    // sendEmail({ from: email, name, message })

    // ตัวอย่าง: บันทึกลง database หรือ logging
    console.log('Contact form submission:', { name, email, message, timestamp: new Date() })

    res.status(200).json({
      success: true,
      message: 'Message received! Thank you for contacting me.'
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    })
  }
})

/**
 * GET /api/health
 * ตรวจสอบว่า server ใช้งานได้
 */
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date()
  })
})

// ============================================
// Error Handling
// ============================================

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: `Route ${req.method} ${req.path} not found`
  })
})

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Server error:', err)
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  })
})

// ============================================
// Start Server
// ============================================

app.listen(PORT, () => {
  console.log(`Portfolio Backend API is running on port ${PORT} (frontend origin: ${FRONTEND_URL})`)
})

export default app
