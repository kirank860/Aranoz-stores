import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCartIcon, Bars3Icon, XMarkIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { useCart } from './CartContext';

const Header = () => {
  const { cartCount } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState('');

  return (
    <header className="bg-white/80 backdrop-blur shadow-md sticky top-0 z-30 transition-all">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <Link to="/" className="text-2xl font-bold text-gray-800">
            E-Shop
          </Link>

          {/* Search Bar */}
          <form className="hidden md:flex flex-1 mx-8 max-w-lg" onSubmit={e => e.preventDefault()}>
            <input
              type="text"
              placeholder="Search products, brands, categories..."
              className="w-full px-4 py-2 rounded-l-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-sm"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-r-lg font-semibold hover:bg-blue-700 transition">Search</button>
          </form>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-600 hover:text-gray-900 font-medium">Home</Link>
            <Link to="/products" className="text-gray-600 hover:text-gray-900 font-medium">Products</Link>
            <Link to="/cart" className="text-gray-600 hover:text-gray-900 relative">
              <div className="flex items-center">
                <ShoppingCartIcon className="h-6 w-6" />
                <span className="ml-1">Cart</span>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-3 bg-blue-600 text-white text-xs font-bold rounded-full px-2 py-0.5 shadow-lg animate-bounce">{cartCount}</span>
                )}
              </div>
            </Link>
            <button className="ml-2 p-1 rounded-full hover:bg-blue-100 transition">
              <UserCircleIcon className="h-8 w-8 text-gray-700" />
            </button>
          </nav>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <XMarkIcon className="h-7 w-7 text-gray-800" />
            ) : (
              <Bars3Icon className="h-7 w-7 text-gray-800" />
            )}
          </button>
        </div>

        {/* Mobile Search Bar */}
        <form className="flex md:hidden mt-3" onSubmit={e => e.preventDefault()}>
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 rounded-l-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-sm"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-r-lg font-semibold hover:bg-blue-700 transition">Go</button>
        </form>

        {/* Mobile Nav Drawer */}
        {menuOpen && (
          <nav className="md:hidden bg-white shadow-lg rounded-lg mt-3 p-4 flex flex-col space-y-4 animate-fade-in absolute left-0 right-0 z-40">
            <Link to="/" className="text-gray-700 font-medium" onClick={() => setMenuOpen(false)}>
              Home
            </Link>
            <Link to="/products" className="text-gray-700 font-medium" onClick={() => setMenuOpen(false)}>
              Products
            </Link>
            <Link to="/cart" className="text-gray-700 font-medium relative" onClick={() => setMenuOpen(false)}>
              <div className="flex items-center">
                <ShoppingCartIcon className="h-6 w-6" />
                <span className="ml-1">Cart</span>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-3 bg-blue-600 text-white text-xs font-bold rounded-full px-2 py-0.5 shadow-lg animate-bounce">{cartCount}</span>
                )}
              </div>
            </Link>
            <button className="p-1 rounded-full hover:bg-blue-100 transition self-start">
              <UserCircleIcon className="h-8 w-8 text-gray-700" />
            </button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header; 