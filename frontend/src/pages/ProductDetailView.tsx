import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Product } from "../types/product";
import sofa from "../assets/sofa.jpg";
import axios from "axios";

const ProductDetailView = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get<Product>(
          `http://localhost:5000/v1/api/products/${id}`
        );
        setProduct(res.data);
      } catch (err) {
        console.error("Failed to fetch product:", err);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div className="product-detail">
      <button className="back-button" onClick={() => navigate(-1)}>
        Back
      </button>

      <div className="product-detail-container">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="product-image"
          onError={(e) => {
            e.currentTarget.onerror = null; // prevents infinite loop
            e.currentTarget.src = sofa;
          }}
        />
        <div className="product-info">
          <h1 className="product-name">{product.name}</h1>
          <p className="product-category">{product.category}</p>
          <p className="product-price">${product.price.toFixed(2)}</p>
          <p className="product-description">{product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailView;
