import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { Product } from "../models/product.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const raw = fs.readFileSync(path.join(__dirname, "products.json"), "utf-8");
const products: Product[] = JSON.parse(raw);

export const getProducts = () => products;
export const addProduct = (product: Product) => {
  products.push(product);
};
