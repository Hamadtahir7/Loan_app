const AppError = require('./app-error');
const HTTP_STATUS = require('../enums/http-status.enum');

class ValidationError extends AppError {
  constructor(message = 'Validation failed') {
    super(message, HTTP_STATUS.BAD_REQUEST);
  }
}

module.exports = ValidationError;
