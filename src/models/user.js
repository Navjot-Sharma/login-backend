const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true, maxlength: 255, minlength: 1 },
  password: { type: String, required: true },
  name: { type: String, maxlength: 100, minlength: 1, required: true},
  alias: { type: String, maxlength: 100, minlength: 1, required: true},
  representativeName: { type: String, maxlength: 100, minlength: 1, required: true},
  phone: { type: Number, maxlength: 12 , required: true },
  role: { type: Number, default: 0 },
  age: { type: Number },
  companyName: {type: String },
  location: {type: String },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
