const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT;
const multer = require("multer");
const routes = require("./routes/index");
const mongoose = require("mongoose");

app.use(express.json());
app.use(routes);

var cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "YOUR_CLOUD_NAME",
  api_key: "YOUR_API_KEY",
  api_secret: "YOUR_API_SECRET",
});

const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + file.originalname);
  },
});

const upload = multer({ storage });

mongoose.connect("mongodb://127.0.0.1:27017/E-Com", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  imageUrl: String,
});

const Product = mongoose.model("Product", productSchema, "Products");

app.use(express.static("public"));

app.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    const product = new Product({
      name: req.body.name,
      description: req.body.description,
      imageUrl: result.secure_url,
    });

    await product.save();

    res.json({ message: "Product added successfully.", product: product });
  } catch (error) {
    res.status(500).json({ error: "Error adding the product." });
  }
});

app.listen(port, () => {
  console.log(`Server is listening on Port:${port}..`);
});
