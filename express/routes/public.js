const { Router } = require("express");
const router = Router();

// Show all the featured products
router.get("/products", (req, res) => {
  res.send("All the prodcts available");
});

// const multer = require("multer");
// const path = require("path");

// const ensureUploadsDirectory = () => {
//   const uploadDir = path.join(__dirname, "uploads/");
//   //console.log(uploadDir);
//   const fs = require("fs");

//   if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir);
//   }
// };

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     ensureUploadsDirectory();
//     cb(null, "D:/IntechGiants/MERNStack/node/express/uploads");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// const upload = multer({ storage: storage });

// router.post("/uploadPhoto", upload.single("image"), (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ error: "No file uploaded." });
//   }

//   const fileName = req.file.filename;
//   const filePath = req.file.path;
//   res.json({
//     message: "File uploaded successfully.",
//     fileName: fileName,
//     filePath: filePath,
//   });
// });

// module.exports = router;

module.exports = router;
