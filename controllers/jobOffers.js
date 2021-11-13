const fs = require('fs');

const data = fs.readFileSync('./data/job_offers.json');
const jobOffers = JSON.parse(data);

//Get all jobOffers
const getAll = (req, res) => {
    res.json(jobOffers);
};

// Single jobOffer by ID
const getById = (req, res) => {
    const found = jobOffers.some(jobOffer => jobOffer.id === parseInt(req.params.id));
    if (found) {
      res.json(jobOffers.filter(jobOffer => jobOffer.id === parseInt(req.params.id)));
    } else {
      res.send(400, {"Msg":"Offer not found"});
    }
};
  
// Single jobOffer by Company
const getByCompany = (req, res) => {
    const found = jobOffers.some(jobOffer => jobOffer.company === req.params.company);
    if (found) {
      res.json(jobOffers.filter(jobOffer => jobOffer.company === req.params.company));
    } else {
      res.send(typeof(req.params.company))
      res.send(400, {"Msg":"Offer not found"});
    }
};

//Function to create a random ID number
function generateRandomIntegerInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
let randomId = generateRandomIntegerInRange(100, 20000);

// Create new Job_offer
const createJobOffer = (req, res) => {
    const offerNew = req.body;
    const newJobOffer = {
      id: randomId,
      company: offerNew.company,
      description: offerNew.description,
      publication_date: offerNew.publication_date,
      applicants: offerNew.applicants ? offerNew.applicants : jobOffers.applicants,
      
    }
    //Check to require information
    if(!newJobOffer.company || !newJobOffer.description ||
      !newJobOffer.publication_date){
      return res.status(400).json({ msg: 'Please include all the information'});
    } else {
      jobOffers.push(newJobOffer);
      res.send(200, {jobOffers})
}};

//Update JobOffer
const updatejobOffer = (req, res) => {
    const found = jobOffers.some(jobOffer => jobOffer.id === parseInt(req.params.id));
    if (found) {
      const updatejobOffer = req.body;
      jobOffers.forEach(jobOffer => {
        if(jobOffer.id === parseInt(req.params.id)){
          jobOffer.company = updatejobOffer.company ? updatejobOffer.company : jobOffer.company,
          jobOffer.description = updatejobOffer.description ? updatejobOffer.description : jobOffer.description,
          jobOffer.publication_date = updatejobOffer.publication_date ? updatejobOffer.publication_date : jobOffer.publication_date,
          jobOffer.applicants = updatejobOffer.applicants ? updatejobOffer.applicants : jobOffer.applicants,
          res.json({ msg: 'Job Offer updated', jobOffers});
        }});
    } else {
      res.send('User not found');
    }
};

//Remove a jobOffer
const deletejobOffer = (req, res) => {
    const found = jobOffers.some(jobOffer => jobOffer.id === parseInt(req.params.id));
    if (found) {
      res.json(jobOffers.filter(jobOffer => jobOffer.id !== parseInt(req.params.id)));
    } else {
      res.send(400, {"Msg":"Offer not found"});
    }
}

module.exports = {
  getAll: getAll,
  getById: getById,
  getByCompany: getByCompany,
  createJobOffer: createJobOffer,
  updatejobOffer: updatejobOffer,
  deletejobOffer: deletejobOffer
}