import type { Product } from "../types/product";
import ProductPreview from "./ProductPreview";

interface ProductListProps {
  products: Product[];
}

export const ProductList = ({ products }: ProductListProps) => {
  if (!products.length) return <p>No products found</p>;

  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductPreview key={product.id} product={product} />
      ))}
    </div>
  );
};
