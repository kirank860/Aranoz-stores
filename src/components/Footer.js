import React from 'react';
import { Link } from 'react-router-dom';

const social = [
  { name: 'Twitter', href: '#', icon: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 22.4.36a9.09 9.09 0 0 1-2.88 1.1A4.52 4.52 0 0 0 16.11 0c-2.5 0-4.52 2.01-4.52 4.5 0 .35.04.7.11 1.03C7.69 5.4 4.07 3.67 1.64.9c-.38.65-.6 1.4-.6 2.2 0 1.52.77 2.86 1.95 3.65A4.48 4.48 0 0 1 .96 6v.06c0 2.13 1.52 3.91 3.56 4.31-.37.1-.76.16-1.16.16-.28 0-.55-.03-.81-.08.55 1.7 2.16 2.94 4.07 2.97A9.05 9.05 0 0 1 0 19.54a12.8 12.8 0 0 0 6.95 2.03c8.34 0 12.9-6.91 12.9-12.9 0-.2 0-.39-.01-.58A9.22 9.22 0 0 0 23 3z" /></svg>
  ) },
  { name: 'Facebook', href: '#', icon: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0" /></svg>
  ) },
  { name: 'Instagram', href: '#', icon: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.241 1.308 3.608.058 1.266.069 1.646.069 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.241 1.246-3.608 1.308-1.266.058-1.646.069-4.85.069s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.241-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608C4.515 2.497 5.782 2.225 7.148 2.163 8.414 2.105 8.794 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.775.13 4.602.402 3.635 1.37 2.668 2.338 2.396 3.511 2.338 4.788 2.28 6.068 2.267 6.477 2.267 12c0 5.523.013 5.932.071 7.212.058 1.277.33 2.45 1.297 3.418.967.968 2.14 1.24 3.417 1.298 1.28.058 1.689.071 7.212.071s5.932-.013 7.212-.071c1.277-.058 2.45-.33 3.417-1.298.967-.968 1.239-2.141 1.297-3.418.058-1.28.071-1.689.071-7.212s-.013-5.932-.071-7.212c-.058-1.277-.33-2.45-1.297-3.418C19.45.402 18.277.13 17 .072 15.721.013 15.312 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" /></svg>
  ) },
];

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          <div>
            <h3 className="text-2xl font-extrabold mb-4">E-Shop</h3>
            <p className="text-gray-400 mb-4">Your one-stop destination for all your shopping needs.</p>
            <div className="flex gap-3 mt-4">
              {social.map((s) => (
                <a key={s.name} href={s.href} className="bg-gray-800 hover:bg-blue-600 rounded-full p-2 transition" aria-label={s.name} target="_blank" rel="noopener noreferrer">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white">Home</Link></li>
              <li><Link to="/products" className="text-gray-400 hover:text-white">Products</Link></li>
              <li><Link to="/cart" className="text-gray-400 hover:text-white">Cart</Link></li>
              <li><Link to="/" className="text-gray-400 hover:text-white">About</Link></li>
              <li><Link to="/" className="text-gray-400 hover:text-white">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Newsletter</h3>
            <form className="flex flex-col gap-3">
              <input type="email" placeholder="Your email address" className="px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition">Subscribe</button>
            </form>
            <p className="text-xs text-gray-500 mt-2">Get the latest deals and updates.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <p className="text-gray-400 mb-2">Email: support@eshop.com</p>
            <p className="text-gray-400 mb-2">Phone: (123) 456-7890</p>
            <p className="text-gray-400">123 Market Street, City, Country</p>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} E-Shop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 