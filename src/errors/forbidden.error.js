const AppError = require('./app-error');
const HTTP_STATUS = require('../enums/http-status.enum');

class ForbiddenError extends AppError {
  constructor(message = 'Access forbidden') {
    super(message, HTTP_STATUS.FORBIDDEN);
  }
}

module.exports = ForbiddenError;