const Admins = require('../models/Admins');

const getAdmins = (req, res) => {
  Admins.find(req.query)
    .then((admins) => res.status(200).json({
      message: 'List of admins',
      data: admins,
    }))
    .catch((error) => res.status(400).json({
      message: error,
    }));
};

const createAdmin = (req, res) => {
  const adminCreated = new Admins({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  adminCreated.save((error, admin) => {
    if (error) {
      return res.status(400).json({ message: error });
    }
    return res.status(201).json({
      message: 'Admin created',
      data: admin,
    });
  });
};

const updateAdmin = async (req, res, next) => {
  Admins.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    },
    { new: true },
    (error, newAdmin) => {
      if (!newAdmin) {
        return res.status(404).json({
          message: `Admin with id: ${req.params.id} was not found`,
        });
      }
      if (error) {
        return res.status(400).json({
          message: error,
        });
      }
      res.locals.userType = 'Admin';
      res.locals.updatedUser = newAdmin;
      return next();
    },
  );
};

const deleteAdmin = (req, res, next) => {
  Admins.findByIdAndDelete(req.params.id, (error, doc) => {
    if (error) {
      return res.status(400).json({ message: `Admin with id ${req.params.id} does not exist.` });
    }
    res.locals.uid = doc.firebaseUid;
    return next();
  });
};

module.exports = {
  getAdmins,
  createAdmin,
  updateAdmin,
  deleteAdmin,
};
