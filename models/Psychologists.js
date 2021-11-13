const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const PsychologistSchema = new Schema({
  id_psychologist: ObjectId,
  full_name: { type: String, required: true},
  email: { type: String, required: true},
  license: String,
  address: String,
  phone_number: { type: String, required: true},
  birth_date: Date,
});

module.exports = mongoose.model('Psychologists', PsychologistSchema)