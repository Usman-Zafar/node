const mongoose = require("mongoose");
const { Schema } = mongoose;

const purchaserSchema = new Schema({});

const Purchaser = mongoose.model("Purchaser", purchaserSchema);

module.exports = Purchaser;
