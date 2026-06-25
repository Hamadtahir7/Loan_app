require('dotenv').config();
const express = require('express');
const cors = require('cors');
const routes = require('./src/routes/index');
const errorMiddleware = require('./src/middlewares/error.middleware');
const db = require('./src/database/models');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/api', routes);

app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

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