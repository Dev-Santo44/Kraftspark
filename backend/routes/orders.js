// routes/orders.js
const express = require('express');
const Order = require('../models/Order.js')
const router = express.Router();

router.post('/orders', async (req, res) => {
  console.log("Received order request:", req.body);  // Add this line for debugging
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    console.error("Order creation failed:", error);
    res.status(500).json({ error: "Order could not be created" });
  }
});
router.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    console.error("Fetching orders failed:", error);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

router.delete('/orders/:orderId', async (req, res) => {
  const { orderId } = req.params;
  try {
    const order = await Order.findByIdAndDelete(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ error: "Error deleting order" });
  }
});

module.exports= router;
