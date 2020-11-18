const mongoose = require('mongoose');


const sampleSchema = mongoose.Schema({
  customerName: { type: String, maxlength: 100, minlength: 1, required: true},
  product: { type: String, maxlength: 100, minlength: 1, required: true},
  units: { type: Number },
  zone: {type: String },
  address: {type: String },
  deliveryDate: {type: Date },
}, { timestamps: true });

module.exports = mongoose.model('Sample', sampleSchema);
