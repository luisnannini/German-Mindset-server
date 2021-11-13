const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ApplicantsSchema = new Schema({
  id_applicant: ObjectId,
  full_name: String,
  birth_date: Date,
  phone_number: String,
  address: String,
  availability: Boolean,
})