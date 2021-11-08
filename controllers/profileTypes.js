const fs = require('fs');

const data = fs.readFileSync('./data/profile_type.json');
const profileTypes = JSON.parse(data);

//Get all profileType
const getAll = (req, res) => {
  res.json(profileTypes);
};

//Single profileType by ID
const getById = (req, res) => {
    const found = profileTypes.some(profileType => profileType.id === parseInt(req.params.id));
    if (found) {
      res.json(profileTypes.filter(profileType => profileType.id === parseInt(req.params.id)));
    } else {
      res.send(400, {"Msg":"Profile type not found"});
    }
  };

  
//Single profileType by profile name
const getByName = (req, res) => {
    const found = profileTypes.some(profileType => profileType.profile === req.params.profile);
    if (found) {
        res.json(profileTypes.filter(profileType => profileType.profile === req.params.profile));
    } else {
      res.send(400, {"Msg":"Profile type not found"});
    }
};


module.exports = {
    getAll: getAll,
    getById: getById,
    getByName: getByName,
  };