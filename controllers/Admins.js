const Admins = require('../models/Admins')

const getAdmins = (req, res)=>{
  Admins.find()
    .then((Admins) =>{
      return res.status(200).json(Admins)
    })
    .catch((error) =>{
      return res.status(400).json(error)
    })
}

module.exports= {getAdmins}