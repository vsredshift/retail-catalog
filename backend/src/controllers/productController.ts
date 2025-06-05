import { Request, Response } from "express";
import { products } from "../data/products.js";

/**
 * @description Get all products
 * @route       GET v1/api/products
 * @access      Public
 */
export const getProducts = (req: Request, res: Response) => {
  res.json(products);
}