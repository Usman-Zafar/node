const express = require("express");
const router = express.Router();
const userRouter = require("./userRouter");
const adminRouter = require("./adminRouter");
var jwt = require("jsonwebtoken");

function middleWare(req, res, next) {
  //console.log("My middleware");
  req.params.id += 1;
  //res.send("Middleware");
  next();
}

router.get("/", middleWare, function (req, res) {
  res.send("Hello, this is the root path");
});

// Router for global Middleware
router.get("/:id", middleWare, function (req, res) {
  res.send(req.params.id);
});

//Users
const registeredUser = [];

router.post("/User/signUp", function (req, res) {
  console.log("=======req.body=======", req.body);
  registeredUser.push(req.body);
  res.send("User Recieved");
});

router.post("/User/signIn", function (req, res) {
  console.log("=======req.body=======", req.body);
  const result = registeredUser.filter(
    (user) =>
      user.userName === req.body.userName && user.password === req.body.password
  );
  console.log("=======Matched User=======", result);
  if (result.length) {
    var token = jwt.sign(result[0], "shhhhh");
    res.send(token);
  } else {
    res.status(401).send("Authentication Failed");
  }
});

// router.get("/getUsers", function (req, res) {
//   console.log("=======req.body=======", req.headers.authorization);
//   const token = req.headers.authorization;
//   const user = jwt.verify(token, "shhhhh");
//   console.log("=======requesting user=======", user);
//   res.send("Okay");
// });

//Admins

const registeredAdmin = [];

router.post("/Admin/signUp", function (req, res) {
  console.log("=======req.body=======", req.body);
  registeredAdmin.push(req.body);
  res.send("Admin Account Created");
});

router.post("/Admin/signIn", function (req, res) {
  console.log("=======req.body=======", req.body);
  const result = registeredAdmin.filter(
    (user) =>
      user.userName === req.body.userName && user.password === req.body.password
  );
  console.log("=======Matched User=======", result);
  if (result.length) {
    var token = jwt.sign(result[0], "shhhhh");
    res.send(token);
  } else {
    res.status(401).send("Authentication Failed");
  }
});

router.get("/Admin/getUsers", function (req, res) {
  console.log("=======req.body=======", req.headers.authorization);
  const token = req.headers.authorization;
  const user = jwt.verify(token, "shhhhh");
  console.log("=======requesting user=======", user);
  if (user) {
    res.send("Print Users");
    console.log("Users List", registeredUser);
  } else {
    console.log("You dont have autherization");
  }
});

router.use("/users", userRouter);
router.use("/admin", adminRouter);

module.exports = router;
