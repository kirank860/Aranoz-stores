import React from 'react';
import { Link } from 'react-router-dom';
import products from '../data/products';
import BannerCarousel from '../components/BannerCarousel';

const categories = [
  { name: 'Mobile', icon: '📱' },
  { name: 'Cosmetics', icon: '💄' },
  { name: 'Electronics', icon: '🔌' },
  { name: 'Furniture', icon: '🛋️' },
  { name: 'Watches', icon: '⌚' },
  { name: 'Decor', icon: '🪴' },
  { name: 'Accessories', icon: '👜' },
];

const dealProducts = products.slice(0, 6);

const Home = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Banner Carousel */}
      <div className="min-h-[350px] flex items-center justify-center">
        <BannerCarousel />
      </div>

      {/* Categories */}
      <section className="container mx-auto px-4 mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Shop From <span className="text-blue-600">Top Categories</span></h2>
        <div className="flex gap-6 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <div key={cat.name} className="flex flex-col items-center min-w-[90px]">
              <div className="text-4xl bg-white shadow p-4 rounded-full mb-2 border border-gray-200">{cat.icon}</div>
              <span className="text-gray-700 font-medium text-sm">{cat.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Deals Carousel */}
      <section className="container mx-auto px-4 mb-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Grab the best deal on <span className="text-blue-600">Smartphones</span></h2>
          <Link to="/products" className="text-blue-600 font-semibold hover:underline">View All</Link>
        </div>
        <div className="flex gap-6 overflow-x-auto pb-2">
          {dealProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl shadow-md min-w-[220px] max-w-[220px] flex-shrink-0 p-4 flex flex-col items-center relative group">
              <img src={product.image} alt={product.name} className="w-32 h-32 object-cover rounded-xl mb-3 group-hover:scale-105 transition" />
              <h3 className="text-base font-bold text-gray-800 mb-1 text-center truncate w-full">{product.name}</h3>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-blue-600 font-bold text-lg">₹{(product.price * 80).toLocaleString()}</span>
                <span className="text-gray-400 line-through text-sm">₹{(product.price * 100).toLocaleString()}</span>
              </div>
              <span className="text-green-600 text-xs font-semibold mb-2">Save - ₹{(product.price * 20).toLocaleString()}</span>
              <Link to={`/products/${product.id}`} className="mt-auto bg-blue-600 text-white px-4 py-1 rounded-lg text-sm font-semibold hover:bg-blue-700 transition">View</Link>
              <span className="absolute top-3 right-3 bg-blue-100 text-blue-700 text-xs font-bold px-2 py-0.5 rounded-full shadow">56% OFF</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home; 