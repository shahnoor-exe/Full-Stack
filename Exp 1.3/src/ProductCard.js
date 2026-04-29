import React from 'react';
import './ProductCard.css';

// ProductCard Component - Receives props for dynamic data
function ProductCard(props) {
  // Destructure props for easier access
  const { name, price, image, description, inStock } = props;

  return (
    <div className="product-card">
      {/* Product Image */}
      <div className="product-image">
        <img src={image} alt={name} />
        
        {/* Stock Status Badge - Conditional Rendering */}
        <div className={`stock-badge ${inStock ? 'in-stock' : 'out-of-stock'}`}>
          {inStock ? '✓ In Stock' : '✗ Out of Stock'}
        </div>
      </div>

      {/* Product Details */}
      <div className="product-details">
        <h3 className="product-name">{name}</h3>
        <p className="product-description">{description}</p>
        
        {/* Price Section */}
        <div className="product-footer">
          <span className="product-price">${price}</span>
          
          {/* Buy Button - Disabled if out of stock */}
          <button 
            className="buy-button" 
            disabled={!inStock}
          >
            {inStock ? 'Add to Cart' : 'Unavailable'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
