//Day and time availability

const psychologistsAvailability = (req, res) => {
    const found = applicants.some(applicant => applicant.id === parseInt(req.params.id));
      if (found) {
        res.json(applicants.filter(applicant => applicant.id !== parseInt(req.params.id)));
      } else {
        res.send('Applicant not found');
      }
  }