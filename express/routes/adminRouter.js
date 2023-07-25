const express = require("express");
const router = express.Router();

router.get("/getAdmin/:id", function (req, res) {
  console.log("Router Working");
  res.send("JHSDF:FGSJFL");
});

router.get("/addUser/:id", function (req, res) {
  console.log("This is add user router");
  res.send("Add User");
});

router.get("/deleteUser/:id", function (req, res) {
  console.log("This is delete User router");
  res.send("User Delete");
});

module.exports = router;
