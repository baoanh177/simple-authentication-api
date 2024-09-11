const jwt = require("jsonwebtoken");

module.exports = {
  createAccess: (data) => {
    const { JWT_SECRET, ACCESS_TOKEN_EXPIRE } = process.env;
    return jwt.sign(data, JWT_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRE });
  },
  createRefresh: () => {
    const { JWT_SECRET, REFRESH_TOKEN_EXPIRE } = process.env;
    const code = new Date().getTime() + Math.random().toString();
    return jwt.sign({ code }, JWT_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRE });
  },
  decodeToken: (token) => {
    try {
      const { JWT_SECRET } = process.env;
      return jwt.verify(token, JWT_SECRET);
    } catch (error) {
      return null;
    }
  },
};
