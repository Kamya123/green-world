const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const admin=require('./routes/admin')
require('dotenv').config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors({
    origin: `*`  ,
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,  
}));


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', admin);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected');
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
})
.catch((err) => {
  console.error('MongoDB connection error:', err);
});
