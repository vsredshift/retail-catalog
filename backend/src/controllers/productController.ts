import { Request, Response } from "express";
import { addProduct, getProducts } from "../data/products.js";
import { Product } from "../models/product.js";
import { damerauLevenshtein } from "../utils/damerauLevenshtein.js";

/**
 * @description Get paginated list of products
 * @route       GET v1/api/products?page=1&limit=10
 * @access      Public
 */
export const getAllProducts = (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;

  const allProducts = getProducts();
  const totalItems = allProducts.length;
  const totalPages = Math.ceil(totalItems / limit);

  if (page > totalPages && totalItems > 0) {
    res.status(400).json({ message: "Page number exceeds the total pages" });
    return;
  }

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const paginated = allProducts.slice(startIndex, endIndex);

  res.json({
    page,
    limit,
    totalItems,
    totalPages,
    products: paginated,
  });
};

/**
 * @description Add a new product
 * @route       POST v1/api/products
 * @access      Private
 */
export const createProduct = (req: Request, res: Response) => {
  const { name, category, description, price, imageUrl } = req.body;

  if (!name || !category || !description || !price || !imageUrl) {
    res.status(400).json({ message: "All fields are required" });
    return;
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

/**
 * @description Get a single product
 * @route       GET v1/api/products/:id
 * @access      Public
 */
export const getProductById = (req: Request, res: Response) => {
  const { id } = req.params;
  const products = getProducts();

  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    res.status(404).json({ message: "Product not found" });
    return;
  }

  res.json(product);
};

/**
 * @description Search for a product by name
 * @route       GET v1/api/search?name=<ProductName>
 * @access      Public
 */
export const searchProducts = (req: Request, res: Response) => {
  const { name } = req.query;

  if (!name || typeof name !== "string") {
    res.status(400).json({ message: "Query parameter 'name' is required" });
    return;
  }

  const searchTerm = name.toLowerCase().trim();
  const allProducts = getProducts();
  const maxDistance = 3; // For fuzzy match, e.g., "kalax" vs "kallax"

  const matches = allProducts
    .map((product) => {
      const productName = product.name.toLowerCase();
      const nameWords = productName.split(/\s+/);

      const score = (() => {
        if (productName.startsWith(searchTerm)) return 0;
        if (productName.includes(searchTerm)) return 1;
        if (nameWords.some((word) => word.startsWith(searchTerm))) return 2;

        const distance = damerauLevenshtein(productName, searchTerm);
        return distance <= maxDistance ? 3 + distance : Infinity;
      })();

      return { product, score };
    })
    .filter((entry) => entry.score !== Infinity)
    .sort((a, b) => a.score - b.score)
    .map((entry) => entry.product);

  res.json({
    count: matches.length,
    results: matches,
  });
};

