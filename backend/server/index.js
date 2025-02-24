require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db.js');
const authRoutes = require('./routes/authRoutes.js');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Server is running...');
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});