
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// ✅ Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// ✅ Serve static files for uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/clubs', require('./routes/clubRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/enroll', require('./routes/enrollmentRoutes'));
app.use('/api/enrollment-requests', require('./routes/enrollmentRequestRoutes'));

// ✅ Health check (useful for Render)
app.get('/', (req, res) => {
  res.send('🎉 API is running');
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
