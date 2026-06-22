const AppError = require('./app-error');
const HTTP_status = require('../enums/http-status.enum');

class NotFoundError extends AppError {
  constructor(message = 'Not Found') {
    super(message, HTTP_status.NOT_FOUND);
  }
}

module.exports = NotFoundError;
