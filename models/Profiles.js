const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ProfileSchema = new Schema ({
  id_profile: ObjectId,
  description: String,
})