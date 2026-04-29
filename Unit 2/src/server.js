require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Product CRUD API is running");
});

app.use("/api/products", productRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
