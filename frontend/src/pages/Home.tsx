import { useEffect, useState } from "react";
import type { Product } from "../types/product";
import { ProductList } from "../components/ProductList";
import { api } from "../api";

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [page, setPage] = useState(1);
  const limit = 6;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get(`/products`, {
          params: { page, limit },
        });

        const newProducts = res.data.products;
        setProducts((prev) => [...prev, ...newProducts]);
        setTotalItems(res.data.totalItems);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [page]);

  return (
    <div className="home-container">
      <h1>Product Catalog</h1>
      <p>Showing {Math.min(page * limit, totalItems)} of {totalItems} products</p>
      <ProductList products={products} />
      {products.length < totalItems ? (
        <button
          className="show-more-btn"
          onClick={() => setPage((prev) => prev + 1)}
        >
          Show More
        </button>
      ) : (
        <p className="no-more-products">No more products to show.</p>
      )}
    </div>
  );
};

export default Home;
