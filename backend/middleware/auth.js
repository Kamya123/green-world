const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = (roles = []) => {
  if (typeof roles === 'string') {
    roles = [roles];
  }

  return [
    (req, res, next) => {
      const token = req.header('Authorization').replace('Bearer ', '');
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    },
    async (req, res, next) => {
      const user = await User.findById(req.user.userId);
      if (!user || !roles.includes(user.role)) {
        return res.status(403).json({ message: 'Access forbidden' });
      }
      next();
    },
  ];
};

module.exports = auth;
