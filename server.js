// ============================================
// Portfolio Backend API - Express.js
// ============================================

import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
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

// Parse allowed origins from env (comma-separated) with FRONTEND_URL as fallback
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map(o => o.trim())
  : [FRONTEND_URL]

// ============================================
// Middleware
// ============================================

// Security headers (configured to work alongside CORS)
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' }
}))

// CORS Configuration
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g. server-to-server, curl)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

// Rate limiting for API routes (100 requests per 15 minutes per IP)
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests, please try again later.' }
})
app.use('/api', apiLimiter)

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
        message: 'Missing required fields: name, email, message'
      })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format'
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
      message: 'Internal server error'
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
    message: `Route ${req.method} ${req.path} not found`
  })
})

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Server error:', err)
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  })
})

export default app
