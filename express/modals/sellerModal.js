const mongoose = require("mongoose");
const { Schema } = mongoose;

const sellerSchema = new Schema({
  firstname: {
    type: String,
    // required: true,
  },
  lastname: {
    type: String,
    // required: true,
  },
  email: {
    type: String,
    // required: true,
    unique: true,
  },
  password: {
    type: String,
    // required: true,
  },
  pic: {
    type: String,
  },
});

const Seller = mongoose.model("Seller", sellerSchema);

module.exports = Seller;
