# Frontend ↔ Backend Connection Guide

## 🔗 Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│ React Component (e.g., Projects.jsx)                        │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ↓
         useProjects() - Custom Hook
         Returns: { data, loading, error, refetch }
                       │
                       ↓
┌─────────────────────────────────────────────────────────────┐
│ portfolioService.getProjects()                              │
│ (src/services/portfolioService.js)                          │
│                                                              │
│ Checks: VITE_USE_API = true/false                           │
└──────────────────────┬──────────────────────────────────────┘
                       │
              ┌────────┴────────┐
              ↓                 ↓
    ┌─────────────────┐  ┌─────────────────┐
    │ VITE_USE_API    │  │ VITE_USE_API    │
    │    = true       │  │    = false      │
    └────────┬────────┘  └────────┬────────┘
             │                    │
             ↓                    ↓
    ┌─────────────────┐  ┌─────────────────┐
    │  api.js         │  │ portfolio.js    │
    │ (HTTP client)   │  │ (Static data)   │
    └────────┬────────┘  └────────┬────────┘
             │                    │
             ↓                    │
    GET http://localhost:3000     │
    /api/projects                 │
             │                    │
             ↓                    │
    ┌─────────────────┐           │
    │  Backend API    │           │
    │  (Express.js)   │           │
    └────────┬────────┘           │
             │                    │
             ├────────┬───────────┘
             ↓        ↓
        { success: true, data: [...] }
             │        │
             └────────┴───────────┐
                                  ↓
                    Component receives data
                    Re-renders with new data
```

---

## ✅ Setup Checklist

### Backend Setup (portfolio-backend/)
- [ ] Run `npm install`
- [ ] Copy `.env.example` to `.env`
- [ ] Update PORT and FRONTEND_URL in `.env`
- [ ] Run `npm run dev`
- [ ] Test with `test-api.bat` (Windows) or `bash test-api.sh` (Mac/Linux)
- [ ] Verify all endpoints return `"success": true`

### Frontend Setup (portfolio/)
- [ ] Update `.env`:
  ```bash
  VITE_USE_API=true
  VITE_API_URL=http://localhost:3000/api
  ```
- [ ] Run `npm run dev`
- [ ] Open http://localhost:5173
- [ ] Check browser DevTools Network tab for API calls
- [ ] Verify data loads from backend

### Environment Variables Comparison

#### Backend (.env in portfolio-backend/)
```bash
PORT=3000
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

#### Frontend (.env in portfolio/)
```bash
VITE_USE_API=true
VITE_API_URL=http://localhost:3000/api
```

---

## 🔄 Request-Response Examples

### Example 1: Get Skills

**Frontend Request** (automatically made by `useSkills()` hook)
```javascript
fetch('http://localhost:3000/api/skills')
```

**Backend Response**
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

**Frontend Usage**
```jsx
const { data: skills, loading, error } = useSkills()

if (loading) return <Loading />
if (error) return <ErrorDisplay error={error} />

return skills.map(skillGroup => (
  <SkillGroup key={skillGroup.category} {...skillGroup} />
))
```

---

### Example 2: Submit Contact Form

**Frontend Request** (from Contact.jsx)
```javascript
const response = await fetch('http://localhost:3000/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    message: 'Hello!'
  })
})
```

**Backend Validation**
```javascript
// Checks:
- name exists and is string
- email exists and valid format
- message exists and is string
```

**Backend Response (Success)**
```json
{
  "success": true,
  "message": "Message received! Thank you for contacting me."
}
```

**Backend Response (Error)**
```json
{
  "success": false,
  "error": "Invalid email format"
}
```

**Frontend Usage**
```jsx
const handleSubmit = async (formData) => {
  try {
    const res = await fetch(`${API_URL}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    const json = await res.json()

    if (json.success) {
      alert('Message sent!')
    } else {
      alert(`Error: ${json.error}`)
    }
  } catch (error) {
    alert(`Failed: ${error.message}`)
  }
}
```

---

## 🧠 Understanding the Service Layer

### How portfolioService.js Works

```javascript
// src/services/portfolioService.js

export async function getProjects() {
  // Step 1: Check environment variable
  if (process.env.VITE_USE_API) {
    try {
      // Step 2a: Try API
      return await api.fetchProjects()
    } catch (error) {
      // Step 2b: Fallback to static data
      console.warn('API failed, using static data:', error.message)
      return staticData.projects
    }
  } else {
    // Step 3: Use static data directly
    return staticData.projects
  }
}
```

### Benefits of This Pattern

1. **Smooth Migration**: Start with static data, switch to API anytime
2. **Reliability**: Never crashes due to API failure
3. **Development**: Easy testing without backend
4. **Production**: Live backend data with fallback
5. **Flexibility**: Switch between modes in `.env`

---

## 🐛 Debugging Tips

### Browser DevTools Network Tab

When frontend makes API calls, you'll see:

```
GET http://localhost:3000/api/projects  200 OK
GET http://localhost:3000/api/skills    200 OK
POST http://localhost:3000/api/contact  200 OK
```

### Check Response Data

```javascript
// In Component
const { data, loading, error } = useProjects()

// In DevTools Console:
console.log(data)    // Should show array of projects
console.log(loading) // Should be false when loaded
console.log(error)   // Should be null if no error
```

### Backend Logs

When you run `npm run dev`, backend logs all requests:

```
GET  /api/projects       200
POST /api/contact        200
GET  /api/projects/1     200
GET  /api/nonexistent    404
```

### CORS Issues?

If you see this error:
```
Access to XMLHttpRequest blocked by CORS policy
```

Fix:
1. Make sure backend is running
2. Check `.env` PORT is correct
3. Verify FRONTEND_URL in backend `.env` matches your frontend origin
4. Restart backend after changing `.env`

---

## 📝 Common Scenarios

### Scenario 1: Switch to API Mode

**Current**: Using static data
```bash
# portfolio/.env
VITE_USE_API=false
```

**To switch to API**:
```bash
# Step 1: Start backend
cd portfolio-backend
npm run dev
# → Backend running on http://localhost:3000

# Step 2: Update frontend .env
cd portfolio
# Edit .env:
VITE_USE_API=true
VITE_API_URL=http://localhost:3000/api

# Step 3: Reload frontend browser
# Data now comes from backend!
```

### Scenario 2: Backend API Offline

If backend goes down:
1. Frontend will retry the API call
2. After timeout, `portfolioService` returns static data
3. Console shows warning but app keeps working
4. No user-facing error

### Scenario 3: Deploy to Production

**Frontend** (Vercel/Netlify)
```bash
# .env.production
VITE_USE_API=true
VITE_API_URL=https://api.your-domain.com
```

**Backend** (Heroku/Railway/Own Server)
```bash
# .env
PORT=3000
FRONTEND_URL=https://your-portfolio.vercel.app
```

---

## 🚀 Quick Start Commands

### Terminal 1: Start Backend
```bash
cd portfolio-backend
npm install
npm run dev
# Output: Server running on http://localhost:3000
```

### Terminal 2: Start Frontend
```bash
cd portfolio
npm install
# Edit .env: VITE_USE_API=true
npm run dev
# Output: Frontend running on http://localhost:5173
```

### Terminal 3: Test API (Optional)
```bash
cd portfolio-backend
bash test-api.sh  # Mac/Linux
# or
test-api.bat      # Windows
```

---

## ✨ Response Format Standard

All API responses follow this format for consistency:

### Success
```json
{
  "success": true,
  "data": { /* actual data */ }
}
```

### Error
```json
{
  "success": false,
  "error": "error message"
}
```

### Frontend Always Checks
```javascript
if (response.success) {
  // Use response.data
} else {
  // Use response.error
}
```

---

## 📚 File Reference

| File | Purpose |
|------|---------|
| `src/services/api.js` | HTTP requests to backend |
| `src/services/portfolioService.js` | Static/API switcher |
| `src/hooks/usePortfolioData.js` | React hooks |
| `.env` (frontend) | Frontend config |
| `.env` (backend) | Backend config |
| `server.js` | Express app |
| `INTEGRATION_GUIDE.md` | Detailed guide |

---

## 🎯 Next Steps

1. ✅ Backend running on http://localhost:3000
2. ✅ Frontend running on http://localhost:5173
3. ✅ API calls working (check Network tab)
4. 📝 Customize portfolio data in backend `server.js`
5. 🚀 Deploy both to production

---

Need help? Check:
- Backend logs: Terminal where you ran `npm run dev` (backend)
- Frontend logs: Browser DevTools Console
- Network tab: Browser DevTools Network tab
- Error messages: `INTEGRATION_GUIDE.md` troubleshooting section

