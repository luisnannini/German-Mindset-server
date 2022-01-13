const firebase = require('../helper/firebase');

const updateFirebaseUser = (req, res) => {
  firebase.auth().updateUser(
    res.locals.updatedUser.firebaseUid,
    { email: req.body.email, password: req.body.password },
  )
    .then(() => res.status(200).json({
      message: `${res.locals.userType} successfully updated!`,
      data: res.locals.updatedUser,
    }))
    .catch((error) => {
      res.status(401)
        .json({ message: error.toString() });
    });
};

const deleteFirebaseUser = (req, res) => {
  firebase.auth().deleteUser(res.locals.uid)
    .then(() => res.status(204).send())
    .catch((error) => {
      res.status(401)
        .json({ message: error.toString() });
    });
};

module.exports = {
  updateFirebaseUser,
  deleteFirebaseUser,
};
