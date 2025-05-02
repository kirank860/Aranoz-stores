import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../components/CartContext';
import products from '../data/products';

const ProductDetail = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const { addToCart } = useCart();
  const product = products.find((p) => p.id === Number(id));

  if (!product) return <div className="text-center py-20 text-2xl">Product not found.</div>;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Product Image */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-96 object-cover"
          />
          <span className="absolute top-4 left-4 bg-blue-100 text-blue-700 text-xs font-bold px-4 py-1 rounded-full shadow">
            {product.category}
          </span>
        </div>

        {/* Product Info */}
        <div className="space-y-8">
          <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">{product.name}</h1>
          <p className="text-3xl font-bold text-blue-600">${product.price}</p>
          <p className="text-lg text-gray-600 mb-4">{product.description}</p>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <label htmlFor="quantity" className="text-gray-700 font-medium">
                Quantity:
              </label>
              <input
                type="number"
                id="quantity"
                min="1"
                max={product.stock}
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Math.min(product.stock, parseInt(e.target.value))))}
                className="w-20 px-3 py-2 border rounded-lg text-lg"
              />
              <span className="text-gray-500">(In stock: {product.stock})</span>
            </div>
            <button
              onClick={handleAddToCart}
              className={`w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg shadow-md transition-transform duration-200 ${isAnimating ? 'scale-105 bg-green-500' : 'hover:bg-blue-700'}`}
            >
              {isAnimating ? 'Added!' : 'Add to Cart'}
            </button>
          </div>
          <div className="border-t pt-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Product Details
            </h2>
            <ul className="space-y-2 text-gray-600 text-lg">
              <li>Category: {product.category}</li>
              <li>Stock: {product.stock} available</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail; 