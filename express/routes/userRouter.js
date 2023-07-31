// const express = require("express");
// const router = express.Router();
// var jwt = require("jsonwebtoken");

// // router.get("/", function (req, res) {
// //   console.log("User Router Working");
// //   res.send("JHSDF:FGSJFL");
// // });

// // router.post("/", function (req, res) {
// //   console.log("This is Display Users router");
// //   res.send("Display User Router");
// // });

// // router.delete("/", function (req, res) {
// //   console.log("This is Delete Posts Route");
// //   res.send("Delete Posts");
// // });

// // router.put("/", function (req, res) {
// //   console.log("This is Delete Posts Route");
// //   res.send("Put Route");
// // });

// // function userMiddleWare(req, res, next) {
// //   console.log("My middleware");
// //   req.params.id += 5;
// //   //res.send("Middleware");
// //   next();
// // }

// // router.get("/register/:id", userMiddleWare, function (req, res) {
// //   console.log("MiddleWare Router Working");
// //   res.send(req.params.id);
// // });

// const registeredUser = [];

// router.post("/User/signUp", function (req, res) {
//   console.log("=======req.body=======", req.body);
//   registeredUser.push(req.body);
//   res.send("User Recieved");
// });

// router.post("/User/signIn", function (req, res) {
//   console.log("=======req.body=======", req.body);
//   const result = registeredUser.filter(
//     (user) =>
//       user.userName === req.body.userName && user.password === req.body.password
//   );
//   console.log("=======Matched User=======", result);
//   if (result.length) {
//     var token = jwt.sign(result[0], "shhhhh");
//     res.send(token);
//   } else {
//     res.status(401).send("Authentication Failed");
//   }
// });

// // router.get("/getUsers", function (req, res) {
// //   console.log("=======req.body=======", req.headers.authorization);
// //   const token = req.headers.authorization;
// //   const user = jwt.verify(token, "shhhhh");
// //   console.log("=======requesting user=======", user);
// //   res.send("Okay");
// // });

// //Admins

// const registeredAdmin = [];

// router.post("/Admin/signUp", function (req, res) {
//   console.log("=======req.body=======", req.body);
//   registeredAdmin.push(req.body);zm
//   res.send("Admin Account Created");
// });

// router.post("/Admin/signIn", function (req, res) {
//   console.log("=======req.body=======", req.body);
//   const result = registeredAdmin.filter(
//     (user) =>
//       user.userName === req.body.userName && user.password === req.body.password
//   );
//   console.log("=======Matched User=======", result);
//   if (result.length) {
//     var token = jwt.sign(result[0], "shhhhh");
//     res.send(token);
//   } else {
//     res.status(401).send("Authentication Failed");
//   }
// });

// router.get("/Admin/getUsers", function (req, res) {
//   console.log("=======req.body=======", req.headers.authorization);
//   const token = req.headers.authorization;
//   const user = jwt.verify(token, "shhhhh");
//   console.log("=======requesting user=======", user);
//   if (user) {
//     res.send("Print Users");
//     console.log("Users List", registeredUser);
//   } else {
//     console.log("You dont have autherization");
//   }
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
var jwt = require("jsonwebtoken");
const { signInAdmin } = require("../controllers/admin");
const authMiddleware = require("../middleware/authMiddleware");
const {
  signUpPurchaser,
  signInPurchaser,
} = require("../controllers/purchaser");

router.get("/signin/admin", authMiddleware, signInAdmin);
router.post("/signup/purchaser", authMiddleware, signUpPurchaser);
router.post("/signin/purchaser", authMiddleware, signInPurchaser);

const registeredUsers = [];
router.post("/signup/user", authMiddleware, function (req, res) {
  // console.log("============= req.body===== ", req.body);
  // const result = registeredUsers.filter(
  //   (user) =>
  //     user.userName === req.body.userName && user.password === req.body.password
  // );
  // console.log("--------- matched user ------- ", result);
  // if (result.length) {
  //   var token = jwt.sign(result[0], "shhhhh");
  //   res.send(token);
  // } else {
  //   res.status(401).send("Authentication failed");
  // }
});
router.post("/signin/user", authMiddleware, function (req, res) {
  // console.log("============= req.body===== ", req.body);
  // const result = registeredUsers.filter(
  //   (user) =>
  //     user.userName === req.body.userName && user.password === req.body.password
  // );
  // console.log("--------- matched user ------- ", result);
  // if (result.length) {
  //   var token = jwt.sign(result[0], "shhhhh");
  //   res.send(token);
  // } else {
  //   res.status(401).send("Authentication failed");
  // }
});

module.exports = router;
