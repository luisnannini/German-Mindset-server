const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const AdminSchema = new Schema({
  id_admin: ObjectId,
  full_name: String,
  username: String,
  password: String,
});

module.exports = mongoose.model('Admins',AdminSchema)