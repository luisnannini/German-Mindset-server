const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const PsychologistSchema = new Schema({
  id_psychologist: ObjectId,
  full_name: String,
  email: String,
  license: String,
  address: String,
  phone_number: String,
  birth_date: Date,
});