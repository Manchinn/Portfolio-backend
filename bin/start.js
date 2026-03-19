import app from '../server.js';

const PORT = process.env.PORT || 3000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

app.listen(PORT, () => {
  console.log(`Portfolio Backend API is running on port ${PORT} (frontend origin: ${FRONTEND_URL})`);
});
