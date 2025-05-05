import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import products from '../data/products';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';
import { selectUser } from '../features/auth/authSlice';
import LoginModal from '../components/LoginModal';

const allCategories = ['All', ...Array.from(new Set(products.map(p => p.category)))];
const sortOptions = [
  { value: 'default', label: 'Default' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A to Z' },
  { value: 'name-desc', label: 'Name: Z to A' },
];

// Generate a random rating for demo purposes
const getRandomRating = (id) => 3 + (id % 3) + Math.random() * 2;

function QuickViewModal({ product, open, onClose, onAddToCart }) {
  if (!open || !product) return null;
  const rating = getRandomRating(product.id);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative animate-fade-in">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-blue-600 text-2xl font-bold">&times;</button>
        <img src={product.image} alt={product.name} className="w-full h-56 object-contain rounded-xl mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{product.name}</h2>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xl text-blue-600 font-semibold">${product.price}</span>
          <span className="text-yellow-400 flex items-center text-sm font-bold">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg key={i} className={`h-4 w-4 ${i < Math.floor(rating) ? 'fill-yellow-400' : 'fill-gray-200'}`} viewBox="0 0 20 20"><polygon points="10,1 12.59,7.36 19.51,7.64 14,12.14 15.82,18.99 10,15.27 4.18,18.99 6,12.14 0.49,7.64 7.41,7.36" /></svg>
            ))}
            <span className="ml-1 text-gray-500">{rating.toFixed(1)}</span>
          </span>
        </div>
        <p className="text-gray-600 mb-4 text-sm">{product.description}</p>
        <button
          onClick={() => onAddToCart(product, 1)}
          className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold text-lg shadow-md hover:bg-green-700 transition mb-2"
        >
          Add to Cart
        </button>
        <Link to={`/products/${product.id}`} className="block text-center text-blue-600 hover:underline text-sm">View Full Details</Link>
      </div>
    </div>
  );
}

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('default');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();
  const [quickView, setQuickView] = useState(null);
  const [loginOpen, setLoginOpen] = useState(false);
  const user = useSelector(selectUser);

  let filteredProducts = products;

  // Apply category filter
  if (selectedCategory !== 'All') {
    filteredProducts = filteredProducts.filter(product => product.category === selectedCategory);
  }

  // Apply search filter
  if (searchQuery) {
    filteredProducts = filteredProducts.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  // Apply price range filter
  filteredProducts = filteredProducts.filter(product =>
    product.price >= priceRange.min && product.price <= priceRange.max
  );

  // Apply sorting
  filteredProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'name-desc':
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });

  // Handler for Add to Cart
  const handleAddToCart = (product, quantity = 1) => {
    if (!user) {
      setLoginOpen(true);
      return;
    }
    dispatch(addToCart({ product, quantity }));
  };

  return (
    <div>
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
      <QuickViewModal
        product={quickView}
        open={!!quickView}
        onClose={() => setQuickView(null)}
        onAddToCart={handleAddToCart}
      />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-10 text-center tracking-tight">Shop All Products</h1>
        
        {/* Search and Filters */}
        <div className="mb-10 space-y-6">
          {/* Search Bar */}
          <div className="max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Category Filter */}
          <div className="flex justify-center">
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

          {/* Sort and Price Range */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-6">
            <div className="flex items-center gap-2">
              <label className="text-gray-700 font-medium">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-gray-700 font-medium">Price Range:</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
                  className="w-20 px-2 py-1 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="0"
                />
                <span>-</span>
                <input
                  type="number"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
                  className="w-20 px-2 py-1 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="0"
                />
              </div>
            </div>
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
                      onClick={() => handleAddToCart(product, 1)}
                      disabled={isOutOfStock}
                      className={`block w-full py-2 rounded-lg font-semibold shadow transition ${isOutOfStock ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-green-600 text-white hover:bg-green-700'}`}
                    >
                      Add to Cart
                    </button>
                  </div>
                  <button
                    onClick={() => setQuickView(product)}
                    className="mt-2 w-full bg-white border border-blue-200 text-blue-600 font-semibold py-2 rounded-lg hover:bg-blue-50 transition"
                  >
                    Quick View
                  </button>
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