const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

// Routes
// const authRoute = require('./routes/auth');
const taskRoute = require('./routes/tasks');

// Connect to the database
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('💾 Connected to the database');
  })
  .catch((error) => {
    console.error(`Error connecting to the database. \n${error}`);
  });

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
// app.use('/api/user', authRoute);
app.use('/api', taskRoute);

app.listen(port, () =>
  console.log(`💻 Server is listening on port ${port}...`),
);
