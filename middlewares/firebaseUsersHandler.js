const firebase = require('../helper/firebase');

const updateFirebaseUser = (req, res, next) => {
  firebase.auth().verifyIdToken(req.headers.token)
    .then((user) => {
      firebase.auth().updateUser(user.uid, { email: req.body.email })
        .then(() => next());
    })
    .catch((error) => {
      res.status(401)
        .json({ message: error.toString() });
    });
};

const deleteFirebaseUser = (req, res, next) => {
  firebase.auth().verifyIdToken(req.headers.token)
    .then((user) => {
      firebase.auth().deleteUser(user.uid)
        .then(() => next());
    })
    .catch((error) => {
      res.status(401)
        .json({ message: error.toString() });
    });
};

module.exports = {
  updateFirebaseUser,
  deleteFirebaseUser,
};
