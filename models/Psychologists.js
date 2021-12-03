const mongoose = require('mongoose');

const { Schema } = mongoose;

const availabilityDaySchema = new Schema({
  availability: {
    type: Boolean,
    required: true,
  },
  from: {
    type: String,
    default: 1000,
  },
  to: {
    type: String,
    default: 1800,
  },
}, { _id: false });

const availabilitySchema = new Schema({
  monday: {
    type: availabilityDaySchema,
    default: false,
  },
  tuesday: {
    type: availabilityDaySchema,
    default: false,
  },
  wednesday: {
    type: availabilityDaySchema,
    default: false,
  },
  thursday: {
    type: availabilityDaySchema,
    default: false,
  },
  friday: {
    type: availabilityDaySchema,
    default: false,
  },
  saturday: {
    type: availabilityDaySchema,
    default: false,
  },
  sunday: {
    type: availabilityDaySchema,
    default: false,
  },
}, { _id: false });

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
    availability: {
      type: availabilitySchema,
    },
    username: {
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
  },
  { timestamps: true },
);

module.exports = mongoose.model('Psychologists', PsychologistSchema);
