const express = require("express");
const router = express.Router();
const userRouter = require("./userRouter");
const adminRouter = require("./adminRouter");

router.get("/", function (req, res) {
  res.send("Hello, this is the root path");
});

router.use("/users", userRouter);
router.use("/admin", adminRouter);

module.exports = router;
