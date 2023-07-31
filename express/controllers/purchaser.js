const registeredPurchaser = [];

function signUpPurchaser(req, res) {
  // console.log("============= req.body===== ", req.body);
  // const result = registeredPurchaser.filter(
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
}

function signInPurchaser(req, res) {
  // console.log("============= req.body===== ", req.body);
  // const result = registeredPurchaser.filter(
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
}

module.exports = {
  signUpPurchaser: signUpPurchaser,
  signInPurchaser: signInPurchaser,
};
