const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ApplicantsSchema = new Schema({
  id_applicant: ObjectId,
  full_name: { type: String, required: true},
  birth_date: Date,
  phone_number: String,
  email: String,
  address: String,
  profile: String,
  availability: Boolean,
})

module.exports = mongoose.model('Applicants',ApplicantsSchema)