const AppError = require('./app-error');
const HTTP_STATUS = require('../enums/http-status.enum');

class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized') {
    super(message, HTTP_STATUS.UNAUTHORIZED);
  }
}

module.exports = UnauthorizedError;