import React from 'react';
import ProductCard from './ProductCard';
import './App.css';

function App() {
  // Sample product data array - Random beginner-level products
  const products = [
    {
      id: 1,
      name: 'Wireless Mouse',
      price: 29.99,
      description: 'Ergonomic wireless mouse with smooth tracking',
      image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop',
      inStock: true
    },
    {
      id: 2,
      name: 'Coffee Mug',
      price: 12.50,
      description: 'Ceramic mug perfect for your morning coffee',
      image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&h=300&fit=crop',
      inStock: true
    },
    {
      id: 3,
      name: 'Notebook',
      price: 8.99,
      description: 'Premium quality notebook with 200 pages',
      image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=400&h=300&fit=crop',
      inStock: false
    },
    {
      id: 4,
      name: 'Desk Lamp',
      price: 45.00,
      description: 'LED desk lamp with adjustable brightness',
      image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=300&fit=crop',
      inStock: true
    },
    {
      id: 5,
      name: 'Water Bottle',
      price: 15.99,
      description: 'Stainless steel insulated water bottle',
      image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=300&fit=crop',
      inStock: true
    },
    {
      id: 6,
      name: 'Backpack',
      price: 55.00,
      description: 'Durable backpack with laptop compartment',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop',
      inStock: false
    }
  ];

  return (
    <div className="app">
      {/* Header Section */}
      <header className="app-header">
        <h1>🛍️ Product Store</h1>
        <p>ProductCard Component Experiment - React Props Demo</p>
      </header>

      {/* Product Grid - Displays all ProductCards */}
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            name={product.name}
            price={product.price}
            description={product.description}
            image={product.image}
            inStock={product.inStock}
          />
        ))}
      </div>

      {/* Footer with experiment info */}
      <footer className="app-footer">
        <p>Course Outcomes: CO1 (Fundamental Concepts) & CO2 (Interactive Front-end)</p>
      </footer>
    </div>
  );
}

export default App;
