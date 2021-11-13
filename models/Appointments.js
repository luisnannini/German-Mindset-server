const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const AppointmentsSchema = new Schema ({
  id_applicant: ObjectId,
  id_psychologist: ObjectId,
  date: Date,
  time: String,
})

module.exports = mongoose.model('Appointments',AppointmentsSchema)