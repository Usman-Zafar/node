const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
  console.log("Admin Router Working");
  res.send("JHSDF:FGSJFL");
});

router.post("/", function (req, res) {
  console.log("This is Display Admin router");
  res.send("Display User Router");
});

router.delete("/", function (req, res) {
  console.log("This is Delete Admin Route");
  res.send("Delete Posts");
});

router.put("/", function (req, res) {
  console.log("This is Delete Admin Route");
  res.send("Put Route");
});

module.exports = router;
