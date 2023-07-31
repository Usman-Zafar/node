// authMiddleware.js

const auth = (req, res, next) => {
  // Perform your authentication logic here, such as finding the user from the DB based on userId
  // const user = findUserFromDB(req.userId);

  // For the sake of this example, let's assume the user is authenticated and call `next()` to proceed.
  // If the user is not authenticated, you can send an error response with res.status() and return.

  // if user matches the hitted API
  next();
  // otherwise
  //res.status(401).json({ error: "Unauthorized" });
};

module.exports = auth;
