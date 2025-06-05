import type { Product } from "../types/product";

interface ProductListProps {
  products: Product[];
}

export const ProductList = ({ products }: ProductListProps) => {
  if (!products.length) return <p>No products found</p>;

  return (
    <div>
      {products.map((product) => (
        <div key={product.id} style={{ marginBottom: "1rem" }}>
          <img src={product.imageUrl} alt={product.name} width={100} />
          <h3>{product.name}</h3>
          <p>{product.category}</p>
          <p>{product.price}</p>
          <p>{product.description}</p>
        </div>
      ))}
    </div>
  );
};
