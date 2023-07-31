// const express = require("express");
// const router = express.Router();
// const userRouter = require("./userRouter");
// const adminRouter = require("./adminRouter");
// var jwt = require("jsonwebtoken");

// function middleWare(req, res, next) {
//   //console.log("My middleware");
//   req.params.id += 1;
//   //res.send("Middleware");
//   next();
// }

// router.get("/", middleWare, function (req, res) {
//   res.send("Hello, this is the root path");
// });

// // Router for global Middleware
// router.get("/:id", middleWare, function (req, res) {
//   res.send(req.params.id);
// });

// router.use("/users", userRouter);
// router.use("/admin", adminRouter);

// module.exports = router;

const express = require("express");
const router = express.Router();
const userRouter = require("./userRouter");

router.use("/users/", userRouter);

module.exports = router;
