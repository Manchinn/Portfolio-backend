# Backend API Guide & Integration

## 📋 Overview

Portfolio Backend API คือ Express.js server ที่ใช้ serve portfolio data สำหรับ frontend application

### Architecture

```
Portfolio Frontend (React)
        ↓
   api.js (HTTP wrapper)
        ↓
   portfolioService.js (static/API switcher)
        ↓
   Backend API (Express.js)
        ↓
   Database (or static data)
```

---

## 🚀 Getting Started

### 1️⃣ Installation

```bash
# ไปที่ backend directory
cd portfolio-backend

# ติดตั้ง dependencies
npm install
```

### 2️⃣ Setup Environment Variables

```bash
# Copy .env.example เป็น .env
cp .env.example .env

# Edit .env ตั้งค่า:
# PORT=3000 (หรือ port อื่น)
# FRONTEND_URL=http://localhost:5173
```

### 3️⃣ Run Server

```bash
# Development mode (with auto-reload)
npm run dev

# Or start normally
npm start

# Output:
# ╔════════════════════════════════════════════╗
# ║  Portfolio Backend API is running          ║
# ║  Server: http://localhost:3000             ║
# ║  Frontend: http://localhost:5173           ║
# ╚════════════════════════════════════════════╝
```

---

## 📡 API Endpoints

### Public Endpoints (No Auth Required)

#### 1. GET `/api/profile`
**ดึงข้อมูล profile**

```bash
curl http://localhost:3000/api/profile
```

**Response:**
```json
{
  "success": true,
  "data": {
    "name": "ชินกฤต",
    "title": "Frontend Developer",
    "bio": "...",
    "email": "...",
    "phone": "...",
    "location": "Thailand",
    "resume": "/resume.pdf"
  }
}
```

---

#### 2. GET `/api/skills`
**ดึงข้อมูล skills ตามหมวดหมู่**

```bash
curl http://localhost:3000/api/skills
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "category": "Frontend",
      "items": [
        { "name": "React", "level": "Advanced" },
        ...
      ]
    },
    ...
  ]
}
```

---

#### 3. GET `/api/experiences`
**ดึงประวัติการทำงาน**

```bash
curl http://localhost:3000/api/experiences
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "year": "2024 - Present",
      "position": "Frontend Developer",
      "company": "Company Name",
      "description": "...",
      "achievements": ["..."]
    },
    ...
  ]
}
```

---

#### 4. GET `/api/projects`
**ดึงรายการโปรเจค**

```bash
curl http://localhost:3000/api/projects
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Project Name",
      "description": "...",
      "tech": ["React", "Node.js"],
      "image": "...",
      "github": "...",
      "demo": "...",
      "highlights": ["..."]
    },
    ...
  ]
}
```

---

#### 5. GET `/api/projects/:id`
**ดึงรายละเอียดโปรเจคเดียว**

```bash
curl http://localhost:3000/api/projects/1
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "...",
    ...
  }
}
```

---

#### 6. GET `/api/socials`
**ดึงข้อมูล social links**

```bash
curl http://localhost:3000/api/socials
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "name": "GitHub",
      "url": "https://github.com/...",
      "icon": "github",
      "color": "hover:text-gray-800"
    },
    ...
  ]
}
```

---

#### 7. POST `/api/contact`
**ส่งข้อความติดต่อ**

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "message": "Hello, I want to work with you!"
  }'
```

**Request Body:**
```json
{
  "name": "string (required)",
  "email": "string (required, valid email)",
  "message": "string (required)"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Message received! Thank you for contacting me."
}
```

**Errors:**
```json
{
  "success": false,
  "error": "Missing required fields: name, email, message"
}
```

---

#### 8. GET `/api/health`
**ตรวจสอบ server status**

```bash
curl http://localhost:3000/api/health
```

**Response:**
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2024-01-20T10:30:00.000Z"
}
```

---

## 🔌 Frontend Integration

### Step 1: Update Frontend .env

```bash
# portfolio/.env
VITE_USE_API=true
VITE_API_URL=http://localhost:3000/api
```

### Step 2: How It Works

**Frontend Service Layer Flow:**

```
Component
    ↓
Hook (useSkills, useProjects, etc.)
    ↓
portfolioService.getSkills() [src/services/portfolioService.js]
    ↓
Check VITE_USE_API flag
    ├─ true: Call API (api.js)
    └─ false: Return static data
    ↓
api.js makes HTTP request to http://localhost:3000/api/skills
    ↓
Backend returns data
    ↓
Component receives { data, loading, error }
```

### Step 3: Example Component Usage

```jsx
// src/components/Sections/Projects.jsx
import { useProjects } from '../../hooks/usePortfolioData'
import Loading from '../Loading'

export default function Projects() {
  const { data: projects, loading, error } = useProjects()

  if (loading) return <Loading />
  if (error) return <ErrorDisplay error={error} />

  return (
    <section id="projects">
      {projects.map(project => (
        <ProjectCard key={project.id} {...project} />
      ))}
    </section>
  )
}
```

### Step 4: API Response Format

All endpoints return this format:

**Success:**
```json
{
  "success": true,
  "data": {...}
}
```

**Error:**
```json
{
  "success": false,
  "error": "Error message"
}
```

**Frontend api.js handling:**
```javascript
// src/services/api.js
export async function fetchProfile() {
  const res = await fetch(`${VITE_API_URL}/profile`)
  const json = await res.json()
  
  if (!json.success) {
    throw new Error(json.error || 'Failed to fetch profile')
  }
  
  return json.data
}
```

---

## 🔄 Static vs API Mode

### Static Mode (Development)
```bash
# portfolio/.env
VITE_USE_API=false
```
- Data from `src/data/portfolio.js`
- No backend needed
- Fast for testing
- Frontend falls back to static if API fails

### API Mode (Production)
```bash
# portfolio/.env
VITE_USE_API=true
VITE_API_URL=http://localhost:3000/api (dev)
# or
VITE_API_URL=https://api.your-domain.com/api (production)
```
- Data from backend server
- Real-time updates
- Scalable
- Requires backend running

---

## 🛡️ CORS Configuration

Backend allows requests from:
```javascript
origin: process.env.FRONTEND_URL // http://localhost:5173 in dev
methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
credentials: true
```

**For Production:**
```bash
# Update .env
FRONTEND_URL=https://your-portfolio-domain.com
```

---

## 📝 Customization

### Add Custom Data

Edit `server.js` portfolioData object:

```javascript
const portfolioData = {
  profile: {
    name: "Your Name",
    title: "Your Title",
    email: "your.email@example.com",
    // ... more fields
  },
  skills: [ /* ... */ ],
  experiences: [ /* ... */ ],
  projects: [ /* ... */ ],
  socials: [ /* ... */ ]
}
```

### Connect to Database

Replace static `portfolioData` with database queries:

```javascript
// Example: MongoDB with Mongoose
app.get('/api/profile', async (req, res) => {
  try {
    const profile = await Profile.findOne()
    res.json({ success: true, data: profile })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})
```

### Add Contact Email Sending

Install and configure nodemailer:

```javascript
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
})

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: process.env.SMTP_USER,
      subject: `New Contact from ${name}`,
      html: `<p>From: ${email}</p><p>${message}</p>`
    })

    res.json({ success: true, message: 'Email sent!' })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})
```

---

## 🚢 Deployment

### Deploy to Heroku

```bash
# 1. Create Heroku app
heroku create your-portfolio-api

# 2. Set environment variables
heroku config:set FRONTEND_URL=https://your-portfolio.vercel.app
heroku config:set PORT=3000

# 3. Deploy
git push heroku main

# 4. Check logs
heroku logs --tail
```

### Deploy to Vercel (Serverless)

Create `api/index.js` instead of `server.js`:

```javascript
export default function handler(req, res) {
  // Handle request...
}
```

### Deploy to Your Server

```bash
# 1. SSH to server
ssh user@your-server.com

# 2. Clone repo
git clone https://github.com/yourname/portfolio-backend.git
cd portfolio-backend

# 3. Install and start
npm install
npm start

# 4. Use PM2 for auto-restart
npm install -g pm2
pm2 start server.js --name "portfolio-api"
pm2 save
pm2 startup
```

---

## 🧪 Testing

### Using cURL

```bash
# Test health
curl http://localhost:3000/api/health

# Test get profile
curl http://localhost:3000/api/profile

# Test contact form
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","message":"Hello!"}'
```

### Using Postman

1. Import the API endpoints
2. Set `{{BASE_URL}}` to `http://localhost:3000/api`
3. Test each endpoint

---

## 🐛 Troubleshooting

### CORS Error
```
Access to XMLHttpRequest blocked by CORS policy
```
**Solution:** Update `FRONTEND_URL` in `.env` to match your frontend origin

### Connection Refused
```
Error: connect ECONNREFUSED 127.0.0.1:3000
```
**Solution:** Make sure backend is running (`npm run dev`)

### Timeout
```
Error: fetch timeout after 10000ms
```
**Solution:** Increase timeout in `src/services/api.js`

---

## 📚 Project Structure

```
portfolio-backend/
├── server.js          # Main Express app
├── package.json       # Dependencies
├── .env              # Environment variables
├── .env.example      # Template
└── README.md         # This file
```

---

## 🔗 Related Documentation

- [Frontend API Integration](../portfolio/API_INTEGRATION.md)
- [Frontend Service Layer](../portfolio/src/services/)
- [Custom Hooks](../portfolio/src/hooks/usePortfolioData.js)

---

## 📞 Support

For issues or questions:
1. Check the troubleshooting section above
2. Review frontend `src/services/api.js` for expected format
3. Check browser console for errors
4. Check server logs for API errors

---

Generated with ❤️ for your portfolio
