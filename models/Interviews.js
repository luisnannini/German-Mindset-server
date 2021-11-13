const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const InterviewSchema = new Schema ({
  id_user: String,
  id_clients: String,
  id_postulation: String,
  date: Date,
  time_range: String,
  result: Boolean,
})