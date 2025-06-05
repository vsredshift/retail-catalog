import { Link } from "react-router-dom";
import type { Product } from "../types/product";

interface ProductPreviewProps {
  product: Product;
}

const ProductPreview = ({ product }: ProductPreviewProps) => {
  return (
    <Link to={`/products/${product.id}`} className="product-preview">
      <div className="product-name">{product.name}</div>
      <div className="product-category">{product.category}</div>
      <div className="product-price">{product.price.toFixed(2)}</div>
    </Link>
  );
};

export default ProductPreview;
