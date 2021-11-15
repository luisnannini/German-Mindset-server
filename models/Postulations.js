const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const PostulationsSchema = new Schema({
  id_postulation: ObjectId,
  id_clients: ObjectId,
  id_profile: ObjectId,
  description: { type: String, required: true},
})

module.exports = mongoose.model('postulations',PostulationsSchema)