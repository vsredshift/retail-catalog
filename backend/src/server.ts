import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import productRoutes from "../src/routes/productRoutes";

dotenv.config();

const app = express();

app
  .use(cors())
  .use(express.json())
  .use(express.urlencoded({ extended: false }));

app.use("/v1/api/products", productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
