const firebase = require('../helper/firebase');

const authMiddleware = ({ headers: { token } }, res, next) => {
  if (!token) {
    return res.status(400).json({ message: 'Provide a token' });
  }
  return firebase
    .auth()
    .verifyIdToken(token)
    .then(() => {
      next();
    })
    .catch((error) => {
      res.status(401).json({ message: error.toString() });
    });
};

module.exports = authMiddleware;
