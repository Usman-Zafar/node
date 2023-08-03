//Using Mongo
// const { getCollection } = require("../db/connect");
// const { ObjectId } = require("mongodb");
// const sellerControllers = {};

// // Controller to Signup for Seller
// sellerControllers.Signup = async (req, res) => {
//   const { email, password } = req.body;

//   const sellersCollection = await getCollection("Sellers");
//   const existingSeller = await sellersCollection.findOne({ email });

//   if (existingSeller) {
//     return res
//       .status(400)
//       .json({ error: "Seller with this email already exists." });
//   }

//   const newSeller = { email, password };
//   await sellersCollection.insertOne(newSeller);

//   res.send("Seller Signup Successful");
// };

// // Controller for Seller for Signin
// sellerControllers.Signin = async (req, res) => {
//   const { email, password } = req.body;

//   const sellersCollection = await getCollection("Sellers");
//   const existingSeller = await sellersCollection.findOne({ email });

//   if (!existingSeller) {
//     return res
//       .status(404)
//       .json({ error: "Seller with this email does not exist." });
//   }

//   if (existingSeller.password !== password) {
//     return res.status(401).json({ error: "Incorrect password." });
//   }

//   res.send("Seller Signin Successful");
// };

// // Controller to Create Sellers Products
// sellerControllers.createProduct = async (req, res) => {
//   const { name, description } = req.body;
//   const productsCollection = await getCollection("Products");
//   const newProduct = {
//     name: name,
//     description: description,
//   };

//   await productsCollection.insertOne(newProduct);
//   res.send("Seller Create Products Successful");
// };

// // Controller to edit Sellers own Products
// sellerControllers.editProduct = async (req, res) => {
//   const { id } = req.params;
//   const productsCollection = await getCollection("Products");

//   const objectId = new ObjectId(id);
//   const product = await productsCollection.findOne({ _id: objectId });
//   if (!product) {
//     return res.status(404).json({ error: "Product with this ID not found." });
//   }

//   const { name, description } = req.body;
//   const updatedProduct = {
//     name: name || product.name,
//     description: description || product.description,
//   };

//   await productsCollection.updateOne(
//     { _id: objectId },
//     { $set: updatedProduct }
//   );

//   res.send(`Edit Product with ID ${objectId} Successful`);
// };

// // Controller to Delete the Products:

// sellerControllers.deleteProduct = async (req, res) => {
//   const { id } = req.params;
//   const productsCollection = await getCollection("Products");

//   const objectId = new ObjectId(id);
//   const product = await productsCollection.findOne({ _id: objectId });
//   if (!product) {
//     return res.status(404).json({ error: "Product with this ID not found." });
//   }

//   await productsCollection.deleteOne({ _id: objectId });

//   res.send(`Delete Product with ID ${objectId} Successful`);
// };

// // Controller to View Sellers own Orders
// sellerControllers.viewOrders = async (req, res) => {
//   const ordersCollection = await getCollection("Orders");
//   // Assuming you have a way to associate orders with the seller, for example, using req.userId
//   const orders = await ordersCollection
//     .find({ sellerId: req.userId })
//     .toArray();
//   res.json(orders);
// };

// // Controller to View Sellers own Products
// sellerControllers.viewProduct = async (req, res) => {
//   const productsCollection = await getCollection("Products");
//   // Assuming you have a way to associate products with the seller, for example, using req.userId
//   const products = await productsCollection
//     .find({ sellerId: req.userId })
//     .toArray();
//   res.json(products);
// };

// // Controller to edit Sellers own Order Status
// sellerControllers.editOrderStatus = async (req, res) => {
//   const { orderId } = req.params; // Assuming you have a route parameter for orderId
//   const ordersCollection = await getCollection("Orders");
//   res.send(`Change Status of Order with ID ${orderId}`);
// };

// module.exports = sellerControllers;

//Using Mongoose
const Seller = require("../modals/sellerModal");
const Purchaser = require("../modals/purchaserModal");
const Product = require("../modals/productModal");
const Order = require("../modals/orderModal");
const jwt = require("jsonwebtoken");
const { uploadToCloudinary } = require("../middlewares/saveimage");
const sellerControllers = {};

// Controller to Signup for Seller
sellerControllers.Signup = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded." });
  }
  try {
    const { email, password, firstname, lastname } = req.body;
    // console.log(email, password, firstname, lastname);

    const existingSeller = await Seller.findOne({ email });

    if (existingSeller) {
      return res
        .status(400)
        .json({ error: "Seller with this email already exists." });
    }

    const newSeller = { email, password, firstname, lastname };
    const seller = await Seller.create(newSeller);
    uploadToCloudinary(req.file, function (err, cloudinaryUrl) {
      if (err) {
        // Handle the error if the upload to Cloudinary fails
        return res
          .status(500)
          .json({ error: "Failed to upload to Cloudinary" });
      }
    });

    res.send({ msg: "Seller Signup Successful", seller });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to sign up seller" });
  }
};

// Controller for Seller for Signin
sellerControllers.Signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingSeller = await Seller.findOne({ email });

    if (!existingSeller) {
      return res
        .status(404)
        .json({ error: "Seller with this email does not exist." });
    }

    if (existingSeller.password !== password) {
      return res.status(401).json({ error: "Incorrect password." });
    }

    const token = jwt.sign({ id: existingSeller.id }, "Secret-Key", {
      expiresIn: "340924903294434",
    });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Failed to sign in seller" });
  }
};

// Controller to Create Sellers Products
sellerControllers.createProduct = async (req, res) => {
  const { name, description, price, stock } = req.body;
  const sellerId = req.userId;

  try {
    const newProduct = {
      name: name,
      description: description,
      sellerId: sellerId,
      price: price,
      stock: stock,
    };
    const product = await Product.create(newProduct);
    res.send({ msg: "Seller Create Products Successful", product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create product" });
  }
};

// Controller to edit Sellers own Products
sellerControllers.editProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ error: "Product with this ID not found." });
    }

    const { name, description } = req.body;
    product.name = name || product.name;
    product.description = description || product.description;
    await product.save();

    res.send(`Edit Product with ID ${id} Successful`);
  } catch (error) {
    res.status(500).json({ message: "Failed to edit product" });
  }
};

// Controller to Delete the Products:
sellerControllers.deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ error: "Product with this ID not found." });
    }
    if (product.sellerId == req.userId) {
      await Product.findByIdAndDelete(id);
      return res.send(`Delete Product with ID ${id} Successful`);
    }
    res.status(201).json({ error: "Bad Request" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete product" });
  }
};

// Controller to View Sellers own Orders
sellerControllers.viewOrders = async (req, res) => {
  try {
    // Assuming you have a way to associate orders with the seller, for example, using req.userId
    const orders = await Order.find({ seller: req.userId }).populate(
      "products"
    );
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch seller orders" });
  }
};

// Controller to View Sellers own Products
sellerControllers.viewProduct = async (req, res) => {
  try {
    const products = await Product.find({ sellerId: req.userId });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch seller products" });
  }
};

// Controller to edit Sellers own Order Status
sellerControllers.editOrderStatus = async (req, res) => {
  const { orderId } = req.params; // Assuming you have a route parameter for orderId
  res.send(`Change Status of Order with ID ${orderId}`);
};

module.exports = sellerControllers;
