const authService  = require('../services/auth.service');
const asyncHandler = require('../middlewares/async_handler.middlewear');
const HTTP_STATUS  = require('../enums/http-status.enum');

class AuthController {

  signup = asyncHandler(async (req, res) => {
    const result = await authService.signup(req.body);
    res.status(HTTP_STATUS.CREATED).json(result);
  });

  login = asyncHandler(async (req, res) => {
    const result = await authService.login(req.body);
    res.status(HTTP_STATUS.OK).json(result);
  });
}

module.exports = new AuthController();