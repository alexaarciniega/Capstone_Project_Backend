require("dotenv").config();
const express = require('express')
const { append } = require("express/lib/response");
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
const productsRoutes = require("./routes/products.routes");

app.use(express.json())
app.use(cors())

app.use((error, req, res, next) => {
    console.error(error.stack);
    res.status(500).json({ message: error.message });
  });

  //Routes
app.use(productsRoutes);

const connectDb = () => {
    try {
      mongoose.connect(process.env.DB_URI);
      console.log("Database connected");
    } catch (error) {
      console.log(error);
    }
  };

app.listen(process.env.PORT, () => {
    connectDb();
    console.log("Server is listening on PORT "+ process.env.PORT);
})