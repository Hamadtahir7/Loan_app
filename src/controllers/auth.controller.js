const authService = require('../services/auth.service');
const asyncHandler = require('../middlewares/async_handler.middlewear');

class AuthController {
  signup = asyncHandler(async (req, res) => {
    const result = await authService.signup(req.body);
    res.status(201).json(result);
  });

  login = asyncHandler(async (req, res) => {
    const result = await authService.login(req.body);
    res.status(200).json(result);
  });
}

module.exports = new AuthController();