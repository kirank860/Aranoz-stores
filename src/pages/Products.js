import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import products from '../data/products';
import { useCart } from '../components/CartContext';

const allCategories = ['All', ...Array.from(new Set(products.map(p => p.category)))];

// Generate a random rating for demo purposes
const getRandomRating = (id) => 3 + (id % 3) + Math.random() * 2;

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { addToCart } = useCart();
  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(product => product.category === selectedCategory);

  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-10 text-center tracking-tight">Shop All Products</h1>
        {/* Category Filter */}
        <div className="mb-10 flex justify-center">
          <div className="flex flex-wrap gap-4">
            {allCategories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-semibold shadow-sm transition duration-200 border-2 ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white border-blue-600 scale-105'
                    : 'bg-white text-gray-800 border-gray-200 hover:bg-blue-50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {filteredProducts.map((product) => {
            const rating = getRandomRating(product.id);
            const isOutOfStock = product.stock === 0;
            return (
              <div
                key={product.id}
                className="bg-white rounded-2xl shadow-xl overflow-hidden hover:scale-105 transform transition duration-300 group relative border border-gray-100 hover:border-blue-200"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-56 object-cover group-hover:opacity-90 transition duration-200"
                />
                <div className="absolute top-4 left-4 bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                  {product.category}
                </div>
                {isOutOfStock && (
                  <div className="absolute top-4 right-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow">Out of Stock</div>
                )}
                <div className="p-6 flex flex-col gap-2">
                  <h3 className="text-lg font-bold text-gray-800 mb-1 truncate" title={product.name}>
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-xl text-blue-600 font-semibold">${product.price}</p>
                    <span className="text-yellow-400 flex items-center text-sm font-bold">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg key={i} className={`h-4 w-4 ${i < Math.floor(rating) ? 'fill-yellow-400' : 'fill-gray-200'}`} viewBox="0 0 20 20"><polygon points="10,1 12.59,7.36 19.51,7.64 14,12.14 15.82,18.99 10,15.27 4.18,18.99 6,12.14 0.49,7.64 7.41,7.36" /></svg>
                      ))}
                      <span className="ml-1 text-gray-500">{rating.toFixed(1)}</span>
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm line-clamp-2 mb-4">{product.description}</p>
                  <div className="flex gap-2">
                    <Link
                      to={`/products/${product.id}`}
                      className="block w-full bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700 transition font-semibold shadow"
                    >
                      View Details
                    </Link>
                    <button
                      onClick={() => addToCart(product, 1)}
                      disabled={isOutOfStock}
                      className={`block w-full py-2 rounded-lg font-semibold shadow transition ${isOutOfStock ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-green-600 text-white hover:bg-green-700'}`}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Products; 