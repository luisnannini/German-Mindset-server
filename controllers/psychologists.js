//Day and time availability

const psychologistsAvailability = (req, res) => {
    const found = applicants.some(applicant => applicant.id === parseInt(req.params.id));
      if (found) {
        res.json(applicants.filter(applicant => applicant.id !== parseInt(req.params.id)));
      } else {
        res.send('Applicant not found');
      }
  }

  const psychologistsAvailability = (req, res) => {
    const availability = {
        from: req.body.from,
        to: req.body.to,
        days: req.body.days
    }
    if (newCV.from || newCV.to || newCV.days) {
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
    cv.push(availability);
    res.json(availability);
}