const fs = require('fs');
const applicantsData = fs.readFileSync('./data/1-create-applicant-data.json');
const cvData = fs.readFileSync('./data/2-input-personaldata-experience-etc.json');
const availabilityData = fs.readFileSync('./data/6-availability.json');
const availability = JSON.parse(availabilityData);
const cv = JSON.parse(cvData);
const applicants = JSON.parse(applicantsData);

// Create applicant - Register    
const registerApplicant = (req, res) => {
    const newApplicant = {
        id: 'newMember',
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        dateOfBirth: req.body.dateOfBirth,
        address: req.body.address,
        password: req.body.password
    }
    if(!newApplicant.firstName || !newApplicant.lastName || !newApplicant.email || !newApplicant.phoneNumber
        || !newApplicant.dateOfBirth || !newApplicant.address || !newApplicant.password) {
        return res.status(400).json({
            error: 'Not able to complete registration',
            message: 'firstName, lastName, email, phoneNumber, dateOfBirth, address and password are required'
        })
    }
    applicants.push(newApplicant);
    res.json(applicants);
}

// Create CV and set time range
const createCV = (req, res) => {
    const newCV = {
        id: applicants[applicants.length - 1].id,
        primaryStudies: req.body.primaryStudies,
        secondaryStudies: req.body.secondaryStudies,
        tertiaryStudies: req.body.tertiaryStudies,
        universityStudies: req.body.universityStudies,
        courses: req.body.courses,
        experience: req.body.experience,
        otherInfo: req.body.otherInfo,
        from: req.body.from,
        to: req.body.to,
        days: req.body.days
    }
    if (!newCV.primaryStudies || !newCV.secondaryStudies || !newCV.tertiaryStudies || !newCV.universityStudies ||
        !newCV.courses || !newCV.otherInfo) {
            newCV.primaryStudies = null;
            newCV.secondaryStudies = null;
            newCV.tertiaryStudies = null;
            newCV.universityStudies = null;
            newCV.courses = null;
            newCV.otherInfo = null;
        } else if (!newCV.experience || !newCV.from || !newCV.to || !newCV.days) {
            return res.status(400).json({
                error: 'Not able to complete registration',
                message: 'experience, from, to and days are required'
            })
        }
    cv.push(newCV);
    res.json(newCV);
}

// Change availability
const changeAvailability = (req, res) => {
    const found = availability.some(availability => availability.id == parseInt(req.params.id));
    if(found) {
        const setAvailability = {
            availability: req.body.availability
        };
        availability.forEach(availability => {
            if(availability.id == parseInt(req.params.id)) {
                if(setAvailability.availability === true) {
                    res.json( { msg: 'Applicant is now available for interviews'})
                } else if (setAvailability.availability === false) {
                    res.json({ msg: 'Applicant is now not available for interviews'})
                } else {
                    res.status(400);
                    res.json({ msg: 'availability must be a Boolean'})
                }
            }
        });
    }   
}



module.exports = {
    registerApplicant: registerApplicant,
    createCV: createCV,
    changeAvailability: changeAvailability
}