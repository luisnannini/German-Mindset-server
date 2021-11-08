const fs = require('fs');

const data = fs.readFileSync('./data/profile_type.json');
const profileTypes = JSON.parse(data);

//Get all profileType
const getAll = (req, res) => {
  res.json(profileTypes);
};

//Single profileType by ID
const getById = (req, res) => {
    const found = profileTypes.some(profileType => profileType.type.id === parseInt(req.params.id));
    if (found) {
      res.json(profileTypes.filter(profileType => profileType.type.id === parseInt(req.params.id)));
    } else {
      res.send(400, {"Msg":"Profile type not found"});
    }
};

//Single profileType by profile name
const getByName = (req, res) => {
    const found = profileTypes.some(profileType => profileType.type.profile === req.params.profile);
    if (found) {
        res.json(profileTypes.filter(profileType => profileType.type.profile === req.params.profile));
    } else {
      res.send(400, {"Msg":"Profile type not found"});
    }
};

//Show anual report
const getReport = (req, res) => {
  console.log(req.params.id)
  const found = profileTypes.some(profileType => profileType.type.id === parseInt(req.params.id));
  if (found) {
    profileTypes.forEach(profileType => {
      if(profileType.type.id === parseInt(req.params.id)) {
        res.json(`${profileType.type.month}`);
      }
    })
  }else{
    res.send(400, {"Msg":"Profile type not found"});
  }
}

module.exports = {
    getAll: getAll,
    getById: getById,
    getByName: getByName,
    getReport: getReport
  };
