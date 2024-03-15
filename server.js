const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// configuring .env 
dotenv.config();

const PORT = process.env.PORT || 8080;

// Router import 
const userRoutes = require('./routes/userRoutes');
const blogRoutes = require('./routes/blogRoutes');

connectDB();    // databse connection

// rest object
const app = express();

// middlewares
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

// routes
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/blog', blogRoutes);
// listen 
app.listen(PORT, ()=>{
    console.log(`Server running on ${process.env.DEV_MODE} mode on ${PORT}`);
})
