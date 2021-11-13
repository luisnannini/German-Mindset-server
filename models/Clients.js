const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ClientsSchema = new Schema ({
  id_clients: ObjectId,
  company_name: String,
  address: String,
  phone_number: String,
  email: String,
  contact: {
    full_name:String,
    phone_number: String,
    email: String,
    description: String,
  }
})