//const { MongoNetworkError } = require("mongodb");
const mongoose = require("mongoose");
mongoose
  .connect("mongodb://127.0.0.1:27017/testDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connection Successful"))
  .catch((err) => console.log(err));

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  //Which ever fields need to be added
  active: Boolean,
  type: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);

const user1 = new User({
  name: "Mohammad Usman Zafar",
  active: true,
  type: "Customer",
});

const user2 = new User({
  name: "Daud",
  active: true,
  type: "Seller",
});

const user3 = new User({
  name: "Umer",
  active: true,
  type: "Customer",
});

const user4 = new User({
  name: "Faizan",
  active: true,
  type: "Seller",
});

user1.save();
user2.save();
user3.save();
user4.save();
