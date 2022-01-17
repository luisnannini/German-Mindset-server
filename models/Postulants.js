const mongoose = require('mongoose');

const { Schema } = mongoose;

const PostulantSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    birthday: { type: Date, required: true },
    available: { type: Boolean, required: true },
    phone: { type: Number, required: true },
    profiles: { type: mongoose.Schema.Types.ObjectId, ref: 'Profiles', required: true },
    studies: {
      primaryStudies: {
        startDate: { type: Date },
        endDate: { type: Date },
        school: { type: String },
      },
      secondaryStudies: {
        startDate: { type: Date },
        endDate: { type: Date },
        school: { type: String },
      },
      tertiaryStudies: [{
        startDate: { type: Date },
        endDate: { type: Date },
        description: { type: String },
        institute: { type: String },
        _id: false,
      }],
      universityStudies: [{
        startDate: { type: Date },
        endDate: { type: Date },
        description: { type: String },
        institute: { type: String },
        _id: false,
      }],
      informalStudies: [{
        startDate: { type: Date },
        endDate: { type: Date },
        description: { type: String },
        institute: { type: String },
        _id: false,
      }],
    },
    workExperience: [{
      company: { type: String },
      startDate: { type: Date },
      endDate: { type: Date },
      description: { type: String },
      _id: false,
    }],
    firebaseUid: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Postulants', PostulantSchema);
