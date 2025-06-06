import { useEffect, useState } from "react";
import type { Product } from "../types/product";
import { ProductList } from "../components/ProductList";
import { api } from "../api";

const limit = 6;

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let res;

        if (searchTerm.trim() === "") {
          res = await api.get(`/products`, { params: { page, limit } });
          const fetchedProducts = res.data.products;
          setProducts((prev) => [...prev, ...fetchedProducts]);
          setTotalItems(res.data.totalItems);
        } else {
          res = await api.get(`/search`, { params: { name: searchTerm } });
          const results = res.data.results || [];
          const productsFromSearch = results.map((r: any) => r.product);
          setProducts(productsFromSearch);
          setTotalItems(res.data.count);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
        setTotalItems(0);
      }
    };

    const debounceTimer = setTimeout(fetchProducts, 300);

    return () => clearTimeout(debounceTimer);
  }, [page, searchTerm]);

  // Reset page to 1 when searchTerm changes
  useEffect(() => {
    setPage(1);
  }, [searchTerm]);

  const isSearching = searchTerm.trim() !== "";
  const showPagination = !isSearching && products.length < totalItems;
  const showNoProducts = products.length === 0;

  return (
    <div className="home-container">
      <h1>Product Catalog</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        style={{ marginBottom: "1rem", textAlign: "center" }}
      >
        <input
          type="text"
          placeholder="Search products..."
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
        {isSearching
          ? `Found ${products.length} products matching "${searchTerm}"`
          : `Showing ${products.length} of ${totalItems} products`}
      </p>

      <>
        <ProductList products={products} />

        {showPagination ? (
          <button
            className="show-more-btn"
            onClick={() => setPage((prev) => prev + 1)}
          >
            Show More
          </button>
        ) : showNoProducts ? (
          <p>No products found.</p>
        ) : null}
      </>
    </div>
  );
};

export default Home;
