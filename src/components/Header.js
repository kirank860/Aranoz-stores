import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCartIcon, Bars3Icon, XMarkIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartCount } from '../features/cart/cartSlice';
import { selectUser, logout } from '../features/auth/authSlice';
import AuthModal from './AuthModal';

const navLinks = [
  { name: 'Home', to: '/' },
  { name: 'Products', to: '/products' },
];

const Header = () => {
  const cartCount = useSelector(selectCartCount);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [avatarOpen, setAvatarOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  return (
    <header className="bg-white/80 backdrop-blur shadow-md sticky top-0 z-30 transition-all">
      <AuthModal open={authModalOpen} onClose={() => setAuthModalOpen(false)} />
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="text-2xl font-extrabold text-blue-700 tracking-tight flex-shrink-0">
            <span className="bg-blue-100 px-2 py-1 rounded-lg mr-2">🛒</span> MegaMart
          </Link>

          {/* Search Bar (centered, wide) */}
          <form className="hidden lg:flex flex-1 mx-8 max-w-2xl" onSubmit={e => e.preventDefault()}>
            <input
              type="text"
              placeholder="Search for products, brands, categories..."
              className="w-full px-4 py-2 rounded-l-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-sm"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-r-lg font-semibold hover:bg-blue-700 transition">Search</button>
          </form>

          {/* Desktop Nav & Actions */}
          <div className="hidden lg:flex items-center gap-2">
            <nav className="flex items-center gap-2 mr-4">
              {navLinks.map(link => (
                <Link key={link.name} to={link.to} className="text-gray-600 hover:text-blue-700 font-medium px-3 py-2 rounded-lg transition">
                  {link.name}
                </Link>
              ))}
            </nav>
            <Link to="/cart" className="relative flex items-center px-3 py-2 hover:bg-blue-50 rounded-lg transition">
              <ShoppingCartIcon className="h-6 w-6 text-blue-700" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold rounded-full px-2 py-0.5 shadow-lg animate-bounce">
                  {cartCount}
                </span>
              )}
            </Link>
            {/* User Avatar/Dropdown */}
            <div className="ml-2 relative">
              {user ? (
                <>
                  <button
                    className="p-1 rounded-full hover:bg-blue-100 transition flex items-center"
                    onClick={() => setAvatarOpen((open) => !open)}
                  >
                    <img
                      src={user.photoURL || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user.displayName || user.email)}
                      alt={user.displayName || user.email}
                      className="h-8 w-8 rounded-full border-2 border-blue-200 object-cover"
                    />
                  </button>
                  {avatarOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50 animate-fade-in">
                      <div className="px-4 py-2 border-b text-gray-800 font-semibold flex items-center gap-2">
                        <img
                          src={user.photoURL || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user.displayName || user.email)}
                          alt={user.displayName || user.email}
                          className="h-8 w-8 rounded-full border border-blue-100 object-cover"
                        />
                        <span className="truncate">{user.displayName || user.email}</span>
                      </div>
                      <button
                        onClick={() => { dispatch(logout()); setAvatarOpen(false); }}
                        className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 font-semibold"
                      >
                        Log out
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <button className="ml-2 p-1 rounded-full hover:bg-blue-100 transition" onClick={() => setAuthModalOpen(true)}>
                  <UserCircleIcon className="h-8 w-8 text-blue-700" />
                </button>
              )}
            </div>
          </div>

          {/* Hamburger for mobile/tablet */}
          <button
            className="lg:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <XMarkIcon className="h-7 w-7 text-blue-700" />
            ) : (
              <Bars3Icon className="h-7 w-7 text-blue-700" />
            )}
          </button>
        </div>

        {/* Mobile/Tablet Search Bar */}
        <form className="flex lg:hidden mt-3" onSubmit={e => e.preventDefault()}>
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 rounded-l-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-sm"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-r-lg font-semibold hover:bg-blue-700 transition">Go</button>
        </form>

        {/* Mobile/Tablet Nav Drawer */}
        {menuOpen && (
          <nav className="lg:hidden bg-white shadow-lg rounded-lg mt-3 p-4 flex flex-col space-y-4 animate-fade-in absolute left-0 right-0 z-40">
            {navLinks.map(link => (
              <Link key={link.name} to={link.to} className="text-gray-700 font-medium text-lg" onClick={() => setMenuOpen(false)}>
                {link.name}
              </Link>
            ))}
            <Link to="/cart" className="relative flex items-center text-lg" onClick={() => setMenuOpen(false)}>
              <ShoppingCartIcon className="h-6 w-6 text-blue-700" />
              <span className="ml-1">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-blue-600 text-white text-xs font-bold rounded-full px-2 py-0.5 shadow-lg animate-bounce">
                  {cartCount}
                </span>
              )}
            </Link>
            <button className="p-1 rounded-full hover:bg-blue-100 transition self-start" onClick={() => setAuthModalOpen(true)}>
              <UserCircleIcon className="h-8 w-8 text-blue-700" />
            </button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header; 