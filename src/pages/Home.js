import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import products from '../data/products';
import BannerCarousel from '../components/BannerCarousel';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';
import { selectUser } from '../features/auth/authSlice';
import LoginModal from '../components/LoginModal';

const categories = [
  { name: 'Mobile', icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="7" y="2" width="10" height="20" rx="2" /><circle cx="12" cy="18" r="1" /></svg> },
  { name: 'Cosmetics', icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2v20M7 7h10M7 17h10" /></svg> },
  { name: 'Electronics', icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="10" rx="2" /><path d="M8 21h8" /></svg> },
  { name: 'Furniture', icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="10" width="18" height="7" rx="2" /><path d="M7 10V7a5 5 0 0 1 10 0v3" /></svg> },
  { name: 'Watches', icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="7" /><path d="M12 9v3l2 2" /><rect x="9" y="2" width="6" height="3" rx="1" /><rect x="9" y="19" width="6" height="3" rx="1" /></svg> },
  { name: 'Decor', icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 22c4-4 8-7 8-12A8 8 0 0 0 4 10c0 5 4 8 8 12z" /></svg> },
  { name: 'Accessories', icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="7" r="4" /><path d="M5.5 21a7.5 7.5 0 0 1 13 0" /></svg> },
];

const brands = [
  {
    name: 'Apple',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
    image: 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-14-pro-max-deep-purple-select?wid=940&hei=1112&fmt=png-alpha&.v=1660753619946',
    bg: 'bg-gray-900',
    offer: 'UP to 20% OFF',
  },
  {
    name: 'Samsung',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg',
    image: 'https://images.samsung.com/is/image/samsung/p6pim/in/sm-s918bzkgins/gallery/in-galaxy-s23-ultra-s918-sm-s918bzkgins-thumb-534192032?imwidth=480',
    bg: 'bg-blue-100',
    offer: 'UP to 25% OFF',
  },
  {
    name: 'Xiaomi',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/29/Xiaomi_logo.svg',
    image: 'https://i01.appmifile.com/webfile/globalimg/in/cms/6B7B7B2B-7B7B-7B7B-7B7B-7B7B7B7B7B7B.jpg',
    bg: 'bg-orange-50',
    offer: 'UP to 30% OFF',
  },
  {
    name: 'OnePlus',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/6/6e/OnePlus_logo.svg',
    image: 'https://image01.oneplus.net/ebp/202308/29/1-m00-4c-0c-cpgm7wacw2eabjvfaajqkqv7j6g303_840_840.png',
    bg: 'bg-red-100',
    offer: 'UP to 15% OFF',
  },
  {
    name: 'Sony',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Sony_wordmark.svg',
    image: 'https://www.sony.co.in/image/2e2e2e2e2e2e2e2e2e2e2e2e2e2e2e2e?fmt=png-alpha&wid=720',
    bg: 'bg-gray-100',
    offer: 'UP to 18% OFF',
  },
];

const essentials = [
  { name: 'Daily Essentials', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80', offer: 'UP to 50% OFF' },
  { name: 'Vegetables', image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=800&q=80', offer: 'UP to 50% OFF' },
  { name: 'Fruits', image: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=800&q=80', offer: 'UP to 50% OFF' },
  { name: 'Strawberry', image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80', offer: 'UP to 50% OFF' },
  { name: 'Mango', image: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=800&q=80', offer: 'UP to 50% OFF' },
  { name: 'Cherry', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80', offer: 'UP to 50% OFF' },
];

const dealProducts = products.slice(0, 6);
const electronics = products.filter(p => p.category === 'Electronics').slice(0, 8);
const trending = products.slice(-8);
const featured = products.filter(p => p.price > 100).slice(0, 4);

function ProductCarousel({ title, products, viewAllLink }) {
  const ref = useRef();
  const [scroll, setScroll] = useState(0);
  const scrollBy = 240;
  const scrollLeft = () => {
    if (ref.current) {
      ref.current.scrollBy({ left: -scrollBy, behavior: 'smooth' });
      setScroll(ref.current.scrollLeft - scrollBy);
    }
  };
  const scrollRight = () => {
    if (ref.current) {
      ref.current.scrollBy({ left: scrollBy, behavior: 'smooth' });
      setScroll(ref.current.scrollLeft + scrollBy);
    }
  };
  return (
    <section className="container mx-auto px-4 mb-12">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        {viewAllLink && <Link to={viewAllLink} className="text-blue-600 font-semibold hover:underline">View All</Link>}
      </div>
      <div className="relative">
        <button onClick={scrollLeft} className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-200 shadow rounded-full w-10 h-10 items-center justify-center hover:bg-blue-100 transition"><svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" /></svg></button>
        <div ref={ref} className="flex gap-6 overflow-x-auto pb-2 scrollbar-hide scroll-smooth">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl shadow-md min-w-[220px] max-w-[220px] flex-shrink-0 p-4 flex flex-col items-center relative group">
              <img src={product.image} alt={product.name} className="w-32 h-32 object-cover rounded-xl mb-3 group-hover:scale-105 transition" />
              <h3 className="text-base font-bold text-gray-800 mb-1 text-center truncate w-full">{product.name}</h3>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-blue-600 font-bold text-lg">${product.price}</span>
                <span className="text-gray-400 line-through text-sm">${(product.price * 1.2).toFixed(2)}</span>
              </div>
              <span className="text-green-600 text-xs font-semibold mb-2">Save - ${(product.price * 0.2).toFixed(2)}</span>
              <Link to={`/products/${product.id}`} className="mt-auto bg-blue-600 text-white px-4 py-1 rounded-lg text-sm font-semibold hover:bg-blue-700 transition">View</Link>
              <span className="absolute top-3 right-3 bg-blue-100 text-blue-700 text-xs font-bold px-2 py-0.5 rounded-full shadow">20% OFF</span>
            </div>
          ))}
        </div>
        <button onClick={scrollRight} className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-200 shadow rounded-full w-10 h-10 items-center justify-center hover:bg-blue-100 transition"><svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" /></svg></button>
      </div>
    </section>
  );
}

function BrandCarousel() {
  const ref = useRef();
  const [scroll, setScroll] = useState(0);
  const scrollBy = 340;
  const scrollLeft = () => {
    if (ref.current) {
      ref.current.scrollBy({ left: -scrollBy, behavior: 'smooth' });
      setScroll(ref.current.scrollLeft - scrollBy);
    }
  };
  const scrollRight = () => {
    if (ref.current) {
      ref.current.scrollBy({ left: scrollBy, behavior: 'smooth' });
      setScroll(ref.current.scrollLeft + scrollBy);
    }
  };
  return (
    <section className="container mx-auto px-4 mb-12">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800">
          Top <span className="text-blue-600">Electronics Brands</span>
        </h2>
        <Link to="/products" className="text-blue-600 font-semibold hover:underline flex items-center gap-1">View All <span>&#8250;</span></Link>
      </div>
      <div className="border-b-2 border-blue-100 mb-4 w-32" />
      <div className="relative">
        <button onClick={scrollLeft} className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-200 shadow rounded-full w-10 h-10 items-center justify-center hover:bg-blue-100 transition"><svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" /></svg></button>
        <div ref={ref} className="flex gap-6 overflow-x-auto pb-2 scrollbar-hide scroll-smooth">
          {brands.map((brand, idx) => (
            <div key={brand.name} className={`rounded-2xl shadow-md min-w-[90vw] sm:min-w-[320px] md:min-w-[340px] max-w-[340px] p-6 flex flex-col md:flex-row items-center ${brand.bg} text-white transition-all duration-500`} style={{ zIndex: 10 }}>
              <div className="flex flex-col items-start flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <img src={brand.logo} alt={brand.name} className="h-7 w-7 bg-white rounded-full p-1" />
                  <span className="font-bold text-base md:text-lg uppercase tracking-wide text-white/90">{brand.name}</span>
                </div>
                <div className="font-bold text-lg md:text-xl mb-2">{brand.offer}</div>
              </div>
              <img src={brand.image} alt={brand.name} className="h-24 md:h-32 w-auto object-contain ml-4" />
            </div>
          ))}
        </div>
        <button onClick={scrollRight} className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-200 shadow rounded-full w-10 h-10 items-center justify-center hover:bg-blue-100 transition"><svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" /></svg></button>
      </div>
      <div className="flex justify-center mt-4 gap-2">
        {brands.map((_, idx) => (
          <span key={idx} className={`inline-block w-3 h-3 rounded-full ${idx === 0 ? 'bg-blue-600' : 'bg-blue-200'}`} />
        ))}
      </div>
    </section>
  );
}

function EssentialsGrid() {
  return (
    <section className="container mx-auto px-4 mb-12">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800">
          Daily <span className="text-blue-600">Essentials</span>
        </h2>
        <Link to="/products" className="text-blue-600 font-semibold hover:underline flex items-center gap-1">View All <span>&#8250;</span></Link>
      </div>
      <div className="border-b-2 border-blue-100 mb-4 w-32" />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
        {essentials.map((item, idx) => (
          <div key={item.name} className={`rounded-2xl bg-white shadow-md p-4 flex flex-col items-center border-2 ${idx === 0 ? 'border-blue-400' : 'border-transparent'} transition-all`}>
            <img src={item.image} alt={item.name} className="h-20 w-20 object-contain mb-2 rounded-xl" />
            <div className="text-sm font-bold text-gray-700 text-center mb-1">{item.name}</div>
            <div className="text-xs text-gray-500 text-center font-semibold">{item.offer}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function FeaturedProducts() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [loginOpen, setLoginOpen] = useState(false);
  const handleAddToCart = (product, quantity = 1) => {
    if (!user) {
      setLoginOpen(true);
      return;
    }
    dispatch(addToCart({ product, quantity }));
  };
  return (
    <section className="container mx-auto px-4 mb-12">
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800">
          Featured <span className="text-blue-600">Products</span>
        </h2>
        <Link to="/products" className="text-blue-600 font-semibold hover:underline flex items-center gap-1">View All <span>&#8250;</span></Link>
      </div>
      <div className="border-b-2 border-blue-100 mb-4 w-32" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {featured.map((product) => (
          <div key={product.id} className="bg-white rounded-2xl shadow-md overflow-hidden group">
            <div className="relative">
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover group-hover:scale-105 transition duration-300" />
              <div className="absolute top-4 left-4 bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                {product.category}
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-800 mb-1">{product.name}</h3>
              <p className="text-blue-600 font-bold text-xl mb-2">${product.price}</p>
              <p className="text-gray-500 text-sm line-clamp-2 mb-4">{product.description}</p>
              <div className="flex gap-2">
                <Link
                  to={`/products/${product.id}`}
                  className="flex-1 bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700 transition font-semibold shadow"
                >
                  View Details
                </Link>
                <button
                  onClick={() => handleAddToCart(product, 1)}
                  className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition font-semibold shadow"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

const Home = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Banner Carousel */}
      <div className="min-h-[350px] flex items-center justify-center">
        <BannerCarousel />
      </div>
      {/* Top Brands */}
      <BrandCarousel />
      {/* Daily Essentials */}
      <EssentialsGrid />
      {/* Categories */}
      <section className="container mx-auto px-4 mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Shop From <span className="text-blue-600">Top Categories</span></h2>
          <button className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg font-semibold shadow hover:bg-blue-100 transition text-sm">View All Categories</button>
        </div>
        <div className="flex gap-6 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <div key={cat.name} className="flex flex-col items-center min-w-[90px]">
              <div className="bg-white shadow p-4 rounded-full mb-2 border border-gray-200 flex items-center justify-center hover:bg-blue-50 transition">{cat.icon}</div>
              <span className="text-gray-700 font-medium text-sm mt-1">{cat.name}</span>
            </div>
          ))}
        </div>
      </section>
      {/* Featured Products */}
      <FeaturedProducts />
      {/* Deals Carousel */}
      <ProductCarousel title="Grab the best deal on Smartphones" products={dealProducts} viewAllLink="/products" />
      <ProductCarousel title="Top Electronics" products={electronics} viewAllLink="/products" />
      <ProductCarousel title="Trending Now" products={trending} viewAllLink="/products" />
    </div>
  );
};

export default Home; 