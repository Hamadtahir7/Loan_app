const checkRole = (requiredRole) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    if (req.user.role !== requiredRole) {
      return res.status(403).json({ message: `Only ${requiredRole}s can access this resource` });
    }

    next();
  };
};

module.exports = checkRole;
