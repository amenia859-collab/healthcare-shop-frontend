import { Link } from "react-router-dom";
import "../App.css";

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <img src={product.imageUrl} alt={product.title} />
      <h3>{product.name}</h3>
      <p className="price">{product.price} USD </p>
      <Link to={`/details/${product._id}`} className="details-link">
        Voir détails
      </Link>
    </div>
  );
};

export default ProductCard;
