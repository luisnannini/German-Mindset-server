const mongoose = require('mongoose');

const { Schema } = mongoose;

const PsychologistSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: Number,
    address: String,
    firebaseUid: { type: String, required: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Psychologists', PsychologistSchema);
