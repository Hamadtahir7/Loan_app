const HTTP_status = require('../enums/http-status.enum');

class AppError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status || HTTP_status.INTERNAL_SERVER_ERROR;
    this.name = this.constructor.name;
  }
}

module.exports = AppError;