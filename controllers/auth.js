const Users = require('../models/Users');
const Firebase = require('../helper/firebase');

const register = async ({ body: { email, password } }, res) => {
  try {
    const newFirebaseUser = await Firebase.auth().createUser({
      email,
      password,
    });
    const userCreated = new Users({
      email,
      firebaseUid: newFirebaseUser.uid,
    });
    const userSaved = await userCreated.save();
    return res.status(201).json({
      message: 'User created',
      data: userSaved,
    });
  } catch (error) {
    return res.status(400).json({ message: error.toString() });
  }
};

module.exports = {
  register,
};
