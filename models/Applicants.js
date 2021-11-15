const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ApplicantsSchema = new Schema({
  id_applicant: ObjectId,
  full_name: { type: String, required: true},
  birth_date: { type: Date, required: true},
  phone_number: { type: Boolean, required: true},
  email: String,
  address: String,
  profile: String,
  availability:  { type: Boolean, required: true},
})

module.exports = mongoose.model('Applicants',ApplicantsSchema)