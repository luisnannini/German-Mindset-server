const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ProfileSchema = new Schema ({
  id_profile: ObjectId,
  description: { type: String, required: true},
})

module.exports = mongoose.model('Profiles', ProfileSchema)