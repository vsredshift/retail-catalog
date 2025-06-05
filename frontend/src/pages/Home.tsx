import { useEffect, useState } from "react";
import type { Product } from "../types/product";
import { ProductList } from "../components/ProductList";
import { api } from "../api";

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const limit = 6;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let res;

        if (searchTerm.trim() === "") {
          res = await api.get(`/products`, { params: { page: 1, limit } });
          setProducts(res.data.products);
          setTotalItems(res.data.totalItems);
        } else {
          res = await api.get(`/search`, { params: { name: searchTerm } });
          setProducts(res.data.results || []);
          setTotalItems(res.data.count || 0);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
        setTotalItems(0);
      }
    };

    fetchProducts();
  }, [searchTerm]);

  return (
    <div className="home-container">
      <h1>Product Catalog</h1>

      <form
        onSubmit={(e) => e.preventDefault()}
        style={{ marginBottom: "1rem", textAlign: "center" }}
      >
        <input
          type="text"
          placeholder="Search products"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "0.5rem 1rem",
            borderRadius: "0.5rem",
            border: "1px solid #ccc",
            fontSize: "1rem",
            width: "60%",
            maxWidth: "400px",
          }}
        />
      </form>

      <p>
        Showing {products.length} of {totalItems} products
        {searchTerm && ` matching "${searchTerm}"`}
      </p>

      <ProductList products={products} />

      {products.length === 0 && <p className="no-products">No products found.</p>}
    </div>
  );
};

export default Home;
