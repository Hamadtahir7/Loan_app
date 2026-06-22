require('dotenv').config();

const express = require('express');
const cors = require('cors');

const router = require('./src/routes/index');
const { sequelize } = require('./src/models');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api', router);

// 404 handler — catches any route that didn't match above
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global error handler — must stay last
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';

  res.status(status).json({
    message: message,
    status: status
  });
});

sequelize.authenticate()
  .then(() => {
    console.log('Database connection successful');
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch(err => {
    console.error('Database connection failed:', err.message);
  });