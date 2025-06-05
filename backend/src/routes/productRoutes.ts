import express from "express";
import { createProduct, getAllProducts, getProductById, searchProducts } from "../controllers/productController.js";

const router = express.Router();

router.route("/products/").get(getAllProducts).post(createProduct);
router.route("/products/:id").get(getProductById);
router.route("/search").get(searchProducts);

export default router;