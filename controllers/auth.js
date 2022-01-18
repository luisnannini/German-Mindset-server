const Admins = require('../models/Admins');
const Postulants = require('../models/Postulants');
const Psychologists = require('../models/Psychologists');
const Firebase = require('../helper/firebase');

const registerAdmin = async (req, res) => {
  try {
    // Create user in Firebase
    const newFirebaseUser = await Firebase.auth().createUser({
      email: req.body.email,
      password: req.body.password,
    });
    // Create new user
    const userCreated = new Admins({
      email: req.body.email,
      password: req.body.password,
      username: req.body.username,
      name: req.body.name,
      firebaseUid: newFirebaseUser.uid,
    });
    // Save the new user on DB
    const userSaved = await userCreated.save();
    await Firebase.auth().setCustomUserClaims(newFirebaseUser.uid, { role: 'ADMIN' });
    // Response with the new user created
    return res.status(201).json({
      message: 'User created',
      data: userSaved,
    });
  } catch (error) {
    // Return error
    return res.status(400).json({ message: error.toString() });
  }
};

const registerPostulant = async (req, res) => {
  try {
    // Create user in Firebase
    const newFirebaseUser = await Firebase.auth().createUser({
      email: req.body.email,
      password: req.body.password,
    });
    // Create new user
    const userCreated = new Postulants({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      address: req.body.address,
      birthday: req.body.birthday,
      available: req.body.available,
      phone: req.body.phone,
      profiles: req.body.profiles,
      studies: req.body.studies,
      workExperience: req.body.workExperience,
      firebaseUid: newFirebaseUser.uid,
    });
    // Save the new user on DB
    const userSaved = await userCreated.save();
    await Firebase.auth().setCustomUserClaims(newFirebaseUser.uid, { role: 'POSTULANT' });
    // Response with the new user created
    return res.status(201).json({
      message: 'User created',
      data: userSaved,
    });
  } catch (error) {
    // Return error
    return res.status(400).json({ message: error.toString() });
  }
};

const registerPsychologist = async (req, res) => {
  try {
    // Create user in Firebase
    const newFirebaseUser = await Firebase.auth().createUser({
      email: req.body.email,
      password: req.body.password,
    });
    // Create new user
    const userCreated = new Psychologists({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      availability: req.body.availability,
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      firebaseUid: newFirebaseUser.uid,
    });
    // Save the new user on DB
    const userSaved = await userCreated.save();
    // eslint-disable-next-line no-underscore-dangle
    await Firebase.auth().setCustomUserClaims(newFirebaseUser.uid, { role: 'PSYCHOLOGIST', id: userSaved._id });
    // Response with the new user created
    return res.status(201).json({
      message: 'User created',
      data: userSaved,
    });
  } catch (error) {
    // Return error
    return res.status(400).json({ message: error.toString() });
  }
};

module.exports = {
  registerAdmin,
  registerPostulant,
  registerPsychologist,
};
