const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./db/db');
const dotenv =require('dotenv');
dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB 
connectDB();
 
  

// Routes

app.use('/api/users', require('./Router/UserRouter'));
// app.use('/api/products', require('./routes/products'));

 
app.get('/', (req, res) => {
  res.send('Welcome to the KFTR API');
});

// error handling middleware
app.use(( req, res) => {
  res.status(404).json({ message: 'Route not found' });
});
module.exports = app;