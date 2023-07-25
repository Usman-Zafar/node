const express = require("express");
const router = express.Router();

router.get("/getUser/:id", function (req, res) {
  console.log("user Router Working");
  res.send("JHSDF:FGSJFL");
});

router.get("/addPost/:id", function (req, res) {
  console.log("This is add Post Router");
  res.send("Add Post");
});

router.get("/editPost/:id", function (req, res) {
  console.log("Edit Post Router Working");
  res.send("Edit Post");
});

module.exports = router;
