//Data
const applicants = require('../data/applicants.json')

//Status = true > applicant got a job postulation

const showApllicants = (req,res) =>{
    res.json(applicants.filter((applicant) => applicant.state === true ))
};
const cancelPostulation = (req,res)=>{
    const found = applicants.find(applicant => applicant.id === parseInt(req.params.id));
    if (found){
        applicants.forEach(applicant => {
            if(applicant.state === true){
                applicant.state = false
                res.json({applicant})
            }
        })
    }else{
        res.send('Applicant not found');
    }
}

module.exports = {
    showApllicants: showApllicants,
    cancelPostulation: cancelPostulation
}