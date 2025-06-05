import { useEffect, useState } from "react";
import type { Product } from "../types/product";
import axios from "axios";
import { ProductList } from "../components/ProductList";

export const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios.get("http://localhost:5000/v1/api/products").then((res) => {
      setProducts(res.data.products);
    });
  }, []);

  return <div>
    <h1>Product Catalogue</h1>
    <h3>{products.length}</h3>
    <ProductList products={products}/>
  </div>;
};
