const HTTP_status = require('../enums/http-status.enum');

const errorMiddleware = (err, req, res, next) => {
  const status = err.status || HTTP_status.INTERNAL_SERVER_ERROR;
  const message = err.message || 'Internal Server Error';

  res.status(status).json({
    status,
    message,
  });
};

module.exports = errorMiddleware;