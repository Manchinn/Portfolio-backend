# Portfolio Backend API

Express.js backend server สำหรับ Portfolio website - ให้บริการ portfolio data API

## 🎯 Features

- ✅ RESTful API endpoints สำหรับทั้งหมดของ portfolio sections
- ✅ CORS enabled สำหรับ frontend integration
- ✅ Error handling และ validation
- ✅ Health check endpoint
- ✅ Contact form submission handling
- ✅ Environment-based configuration
- ✅ Ready for database integration

## 🚀 Quick Start

### Prerequisites
- Node.js 14+ และ npm

### Installation

```bash
# Clone repository
git clone <your-repo>
cd portfolio-backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Start development server
npm run dev
```

Server จะ run on `http://localhost:3000` (สามารถเปลี่ยน PORT ใน .env)

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/profile` | ดึงข้อมูล profile |
| GET | `/api/skills` | ดึงข้อมูล skills |
| GET | `/api/experiences` | ดึงประวัติการทำงาน |
| GET | `/api/projects` | ดึงรายการ projects |
| GET | `/api/projects/:id` | ดึง project เดียว |
| GET | `/api/socials` | ดึง social links |
| POST | `/api/contact` | ส่งข้อความติดต่อ |
| GET | `/api/health` | ตรวจสอบ server status |

## ⚙️ Configuration

### Environment Variables (.env)

```bash
PORT=3000
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

### CORS Setup

Backend allows requests จาก `FRONTEND_URL` เท่านั้น เพื่อความปลอดภัย

## 🔌 Frontend Integration

### 1. Update Frontend .env

```bash
VITE_USE_API=true
VITE_API_URL=http://localhost:3000/api
```

### 2. Automatic Integration

Frontend จะใช้ custom hooks ที่เชื่อมต่อกับ backend API:

```javascript
// example usage
import { useProjects } from '../../hooks/usePortfolioData'

const { data: projects, loading, error } = useProjects()
```

### 3. Fallback Mechanism

ถ้า backend ไม่ respond ก็จะ fallback ไปใช้ static data อัตโนมัติ

## 📝 Data Format

### Request/Response Format

**Success Response:**
```json
{
  "success": true,
  "data": { /* ... */ }
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "Error message"
}
```

## 🧪 Testing Endpoints

```bash
# Test health
curl http://localhost:3000/api/health

# Get profile
curl http://localhost:3000/api/profile

# Get all projects
curl http://localhost:3000/api/projects

# Get single project
curl http://localhost:3000/api/projects/1

# Submit contact form
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "message": "Hello!"
  }'
```

## 📂 Project Structure

```
portfolio-backend/
├── server.js              # Main application
├── package.json           # Dependencies & scripts
├── .env                   # Local environment config
├── .env.example           # Environment template
├── INTEGRATION_GUIDE.md   # Detailed integration docs
└── README.md              # This file
```

## 🔧 Customization

### Modify Portfolio Data

Edit `portfolioData` object ใน `server.js`:

```javascript
const portfolioData = {
  profile: { /* ... */ },
  skills: [ /* ... */ ],
  experiences: [ /* ... */ ],
  projects: [ /* ... */ ],
  socials: [ /* ... */ ]
}
```

### Connect to Database

Replace static data with database queries:

```javascript
app.get('/api/profile', async (req, res) => {
  const profile = await Profile.findOne()
  res.json({ success: true, data: profile })
})
```

### Enable Email Sending

1. Configure nodemailer ใน `.env`:
```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

2. Uncomment email sending code ใน POST `/api/contact`

## 🚢 Deployment

### Heroku

```bash
heroku create your-portfolio-api
heroku config:set FRONTEND_URL=https://your-portfolio.vercel.app
git push heroku main
```

### Other Platforms

- **Vercel**: Convert to serverless functions
- **Railway**: Connect repo and auto-deploy
- **DigitalOcean**: Use App Platform or droplets
- **Your Server**: Use PM2 for process management

See `INTEGRATION_GUIDE.md` for detailed deployment instructions

## 📚 Documentation

- [Detailed Integration Guide](./INTEGRATION_GUIDE.md) - Complete setup & API docs
- [Frontend API Service](../portfolio/src/services/api.js) - Frontend HTTP client
- [Portfolio Service Layer](../portfolio/src/services/portfolioService.js) - Data switching logic
- [Custom Hooks](../portfolio/src/hooks/usePortfolioData.js) - React hooks for data fetching

## 🛠️ Available Scripts

```bash
npm run dev      # Start development server with auto-reload
npm start        # Start production server
npm test         # Run tests (if configured)
npm run build    # Build for production (if needed)
```

## 🐛 Troubleshooting

### CORS Error?
→ Check `FRONTEND_URL` in `.env` matches your frontend origin

### Port Already in Use?
→ Change `PORT` in `.env` or kill the process on that port

### Connection Refused?
→ Make sure backend is running and accessible

See `INTEGRATION_GUIDE.md` for more troubleshooting tips

## 📋 Response Examples

### GET /api/profile
```json
{
  "success": true,
  "data": {
    "name": "ชินกฤต",
    "title": "Frontend Developer",
    "bio": "...",
    "email": "your.email@example.com",
    "phone": "+66...",
    "location": "Thailand",
    "resume": "/resume.pdf"
  }
}
```

### GET /api/skills
```json
{
  "success": true,
  "data": [
    {
      "category": "Frontend",
      "items": [
        { "name": "React", "level": "Advanced" },
        { "name": "Tailwind CSS", "level": "Advanced" }
      ]
    }
  ]
}
```

### POST /api/contact
```json
{
  "success": true,
  "message": "Message received! Thank you for contacting me."
}
```

## ✨ Features to Add

- [ ] Database integration (MongoDB/PostgreSQL)
- [ ] Authentication & Admin panel
- [ ] Blog system
- [ ] Newsletter subscription
- [ ] Analytics tracking
- [ ] Rate limiting
- [ ] API documentation (Swagger)
- [ ] Automated tests

## 📄 License

MIT

## 🙋 Support

For detailed integration and deployment guide, see [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md)

---

Made with ❤️ for your portfolio
