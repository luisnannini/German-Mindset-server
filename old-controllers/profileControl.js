// Data require
const profiles = require('../data/profiles-by-year.json');

function generateId(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}
//Add a new Professional Profile
const newProfile = (req, res) => {
    const addProfile = {
      id: generateId(100,200),
      profile: req.body.profile,
      applicants_year: req.body.applicants_year,
    }
    //Check the information
    if(!addProfile.profile || !addProfile.applicants_year){
      return res.status(400).json({ msg: 'Try again, some fields are incomplete'});
    } else {
      profiles.push(addProfile);
      res.send(200, {profiles})
    }
} 
//Edit the Professional Profile
const editProfile = (req, res) => {
    const found = profiles.find(profile => profile.id === parseInt(req.params.id));
    if (found) {
      const profileUpdated = req.body;
      profiles.forEach(profile => {
        if(profile.id === parseInt(req.params.id)){
          profile.profile = profileUpdated.profile ? profileUpdated.profile : profile.profile,
          profile.applicants_year = profileUpdated.applicants_year ? profileUpdated.applicants_year : profile.applicants_year,
          res.json({ msg: 'Member updated', profile})
        }});
    } else {
      res.send('Profile not found');
    }
};
//Delete Profile
const deleteProfile = (req, res) => {
    const found = profiles.find(profile => profile.id === parseInt(req.params.id));
    if (found) {
      res.json(profiles.filter(profile => profile.id !== parseInt(req.params.id)));
    } else {
      res.send('Profile not found');
    }
}
//Show the list of Profiles
const listProfiles = (req,res) =>{
    res.json(profiles);
}
module.exports = {
    newProfile: newProfile,
    deleteProfile: deleteProfile,
    editProfile: editProfile,
    listProfiles: listProfiles
};