const AppError = require('./app-error');
const HTTP_STATUS = require('../enums/http-status.enum');

class ConflictError extends AppError {
  constructor(message = 'Resource conflict') {
    super(message, HTTP_STATUS.CONFLICT);
  }
}

module.exports = ConflictError;