// use this import syntax instead of const express = require('express') by adding the 'type': 'module' in package.json
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.route.js';
import cookieParser from 'cookie-parser';

dotenv.config();

// Connect to database
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Database connected'))
.catch(() => console.log('Database not connected', err))

const app = express();
const PORT = process.env.PORT || 5000

// Allows us to parse incoming requests: req.body into JSON
app.use(express.json())
// Allows us to parse incoming cookies
app.use(cookieParser()); 
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log('Server is running on port ' + PORT);
})
