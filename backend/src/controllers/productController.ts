import { Request, Response } from "express";
import { addProduct, getProducts } from "../data/products.js";
import { Product } from "../models/product.js";

/**
 * @description Get all products
 * @route       GET v1/api/products
 * @access      Public
 */
export const getAllProducts = (req: Request, res: Response) => {
  res.json(getProducts());
};

/**
 * @description Add a new product
 * @route       POST v1/api/products
 * @access      Private
 */
export const createProduct = (req: Request, res: Response) => {
  const { name, category, description, price, imageUrl } = req.body as Product;

  if (!name || !category || !description || !price || !imageUrl) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newProduct: Product = {
    id: Date.now(), // unique id
    name,
    category,
    description,
    price,
    imageUrl,
  };

  addProduct(newProduct);
  res.status(201).json(newProduct);
};
