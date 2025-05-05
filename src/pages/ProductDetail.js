import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';
import { selectUser } from '../features/auth/authSlice';
import LoginModal from '../components/LoginModal';
import products from '../data/products';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [loginOpen, setLoginOpen] = useState(false);
  const product = products.find((p) => p.id === Number(id));

  if (!product) return <div className="text-center py-20 text-2xl">Product not found.</div>;

  const handleAddToCart = () => {
    if (!user) {
      setLoginOpen(true);
      return;
    }
    dispatch(addToCart({ product, quantity }));
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleBuyNow = () => {
    if (!user) {
      setLoginOpen(true);
      return;
    }
    dispatch(addToCart({ product, quantity }));
    navigate('/checkout');
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Product Image */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden relative group">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <span className="absolute top-4 left-4 bg-blue-100 text-blue-700 text-xs font-bold px-4 py-1 rounded-full shadow">
            {product.category}
          </span>
          {product.stock === 0 && (
            <span className="absolute top-4 right-4 bg-red-600 text-white text-xs font-bold px-4 py-1 rounded-full shadow">
              Out of Stock
            </span>
          )}
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
              <div className="flex items-center border rounded-lg overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 bg-gray-100 hover:bg-gray-200 transition"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <input
                  type="number"
                  id="quantity"
                  min="1"
                  max={product.stock}
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Math.min(product.stock, parseInt(e.target.value) || 1)))}
                  className="w-16 text-center border-x py-2 focus:outline-none"
                />
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="px-3 py-2 bg-gray-100 hover:bg-gray-200 transition"
                  disabled={quantity >= product.stock}
                >
                  +
                </button>
              </div>
              <span className="text-gray-500">(In stock: {product.stock})</span>
            </div>
            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className={`flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg shadow-md transition-transform duration-200 ${
                  isAnimating ? 'scale-105 bg-green-500' : 'hover:bg-blue-700'
                } ${product.stock === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isAnimating ? 'Added!' : 'Add to Cart'}
              </button>
              <button
                onClick={handleBuyNow}
                disabled={product.stock === 0}
                className={`flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold text-lg shadow-md hover:bg-green-700 transition ${
                  product.stock === 0 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                Buy Now
              </button>
            </div>
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