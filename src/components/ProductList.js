import ProductCard from "./ProductCard";
import "../App.css";

const ProductList = ({ products }) => {
  if (!products || products.length === 0) {
    return (
      <p style={{ textAlign: "center", fontSize: "18px" }}>
        Aucun produit trouvé
      </p>
    );
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
