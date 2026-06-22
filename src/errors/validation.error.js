const AppError = require('./app-error');
const HTTP_status = require('../enums/http-status.enum');

class ValidationError extends AppError {
  constructor(message = 'Validation Error') {
    super(message, HTTP_status.BAD_REQUEST);
  }
}

module.exports = ValidationError;
