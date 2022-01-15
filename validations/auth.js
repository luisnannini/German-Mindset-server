const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordLetters = /[a-zA-Z]/;
const passwordNumbers = /[0-9]/;

const required = (req, res, next) => {
  if (!req.body.email) {
    return res.status(400).send({ message: 'Email is required' });
  }
  if (!req.body.email.match(emailRegex)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }
  if (!req.body.password) {
    return res.status(400).send({ message: 'Password is required' });
  }
  if (req.body.password.length < 8) {
    return res
      .status(400)
      .send({ message: 'Password must be at least 8 characters' });
  }
  if (req.body.password.search(passwordLetters) < 0
  || req.body.password.search(passwordNumbers) < 0) {
    return res
      .status(400)
      .send({ message: 'Password must contain letters and numbers' });
  }
  return next();
};

module.exports = {
  required,
};
