require('dotenv').config();
const express = require('express');
const cors = require('cors');
const routes = require('./src/routes/index');
const errorMiddleware = require('./src/middlewares/error.middleware');
const db = require('./src/database/models');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: [
    'http://localhost:3001',
    'https://loan-frontend-black.vercel.app',
    'https://loan-frontend-git-main-algorithm4.vercel.app'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use('/api', routes);



app.use(errorMiddleware);

db.testConnection()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(() => {
    process.exit(1);
  });