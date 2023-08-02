//Using Mongo
const { getCollection } = require("../db/connect");
const { ObjectId } = require("mongodb");
const purchaserControllers = {};

// Controller for Purchaser Signup
purchaserControllers.Signup = async (req, res) => {
  const { email, password } = req.body;

  const purchasersCollection = await getCollection("Purchasers");
  const existingPurchaser = await purchasersCollection.findOne({ email });

  if (existingPurchaser) {
    return res
      .status(400)
      .json({ error: "Purchaser with this email already exists." });
  }

  const newPurchaser = { email, password };
  await purchasersCollection.insertOne(newPurchaser);

  res.send("Purchaser Signup Successful");
};

// Controller for Purchaser Signin
purchaserControllers.Signin = async (req, res) => {
  const { email, password } = req.body;

  const purchasersCollection = await getCollection("Purchasers");
  const existingPurchaser = await purchasersCollection.findOne({ email });

  if (!existingPurchaser) {
    return res
      .status(404)
      .json({ error: "Purchaser with this email does not exist." });
  }

  if (existingPurchaser.password !== password) {
    return res.status(401).json({ error: "Incorrect password." });
  }

  res.send("Purchaser Signin Successful");
};
//Controller for Purchaser to View All Products
purchaserControllers.viewProducts = async (req, res) => {
  const productsCollection = await getCollection("Products");
  const products = await productsCollection.find({}).toArray();
  res.json(products);
};

// Controller to send Products in Cart
purchaserControllers.addProductToCart = async (req, res) => {
  const { productId } = req.params.id;
  const cartCollection = await getCollection("Cart");
  res.send(`Product with ID ${productId} has been added to the cart.`);
};

// Controller to view Products available in Cart
purchaserControllers.viewCartProducts = async (req, res) => {
  const cartCollection = await getCollection("Cart");
  // Assuming you have a way to associate cart items with the purchaser, for example, using req.userId
  const cartItems = await cartCollection
    .find({ purchaserId: req.userId })
    .toArray();
  res.json(cartItems);
};

// Controller for Purchaser to Checkout
purchaserControllers.checkout = async (req, res) => {
  const cartCollection = await getCollection("Cart");
  const orderCollection = await getCollection("Orders");

  // Assuming you have a way to associate cart items with the purchaser, for example, using req.userId
  const cartItems = await cartCollection
    .find({ purchaserId: req.userId })
    .toArray();

  // Assuming you have a way to calculate the total amount and other details for the order
  const order = {
    purchaserId: req.userId,
    items: cartItems,
    totalAmount: 100, // Replace with the actual calculated total amount
    createdAt: new Date(),
  };

  await orderCollection.insertOne(order);

  // Assuming you have a way to handle payment processing (e.g., using Stripe API)
  // Implement the payment processing logic here...

  // Clear the cart after successful checkout
  await cartCollection.deleteMany({ purchaserId: req.userId });

  res.send("Checkout via Stripe");
};

// Controller to View Order List
purchaserControllers.viewOrders = async (req, res) => {
  const orderCollection = await getCollection("Orders");
  // Assuming you have a way to associate orders with the purchaser, for example, using req.userId
  const orders = await orderCollection
    .find({ purchaserId: req.userId })
    .toArray();
  res.json(orders);
};
module.exports = purchaserControllers;

//Using Mongoose
