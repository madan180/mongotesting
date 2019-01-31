const mongoose = require('mongoose');

let schema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, unique: true, required: true },
  email: { type: String, required: true, default: 'Not-Available'},
  rank: { type: Number }
}, { collection: 'vendors' });

//Creating the model, model is the runtime object instance of the schema
module.exports = mongoose.model("vendors", schema);




