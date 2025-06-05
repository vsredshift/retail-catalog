import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import productRoutes from "../src/routes/productRoutes.js";

dotenv.config();

const app = express();

app
  .use(express.json())
  .use(cors())
  .use(express.urlencoded({ extended: false }));

app.use("/v1/api/products", productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
