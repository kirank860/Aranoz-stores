import React, { useState, useEffect, useRef } from 'react';

const banners = [
  {
    image: 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=600&q=80',
    title: 'SMART WEARABLE.',
    subtitle: 'Best Deal Online on smart watches',
    offer: 'UP to 80% OFF',
    bg: 'bg-[#23294a]',
    cta: { label: 'Shop Smart Watches', link: '/products' },
  },
  {
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80',
    title: 'CLASSIC WATCHES.',
    subtitle: 'Timeless style for every occasion',
    offer: 'UP to 60% OFF',
    bg: 'bg-[#1a2238]',
    cta: { label: 'Shop Watches', link: '/products' },
  },
  {
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
    title: 'PORTABLE AUDIO.',
    subtitle: 'Bluetooth speakers & more',
    offer: 'UP to 50% OFF',
    bg: 'bg-[#2d3250]',
    cta: { label: 'Shop Audio', link: '/products' },
  },
  {
    image: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=600&q=80',
    title: 'HEADPHONES.',
    subtitle: 'Experience high-fidelity sound',
    offer: 'UP to 70% OFF',
    bg: 'bg-[#23294a]',
    cta: { label: 'Shop Headphones', link: '/products' },
  },
];

const BannerCarousel = () => {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef(null);
  const touchStartX = useRef(null);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearTimeout(timeoutRef.current);
  }, [current]);

  const goTo = (idx) => setCurrent(idx);
  const prev = () => setCurrent((prev) => (prev - 1 + banners.length) % banners.length);
  const next = () => setCurrent((prev) => (prev + 1) % banners.length);

  // Swipe support
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (diff > 50) prev();
    else if (diff < -50) next();
    touchStartX.current = null;
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-lg h-[350px] md:h-[400px]">
      {banners.map((banner, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-all duration-700 ease-in-out ${idx === current ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-95 z-0'} ${banner.bg}`}
          style={{ pointerEvents: idx === current ? 'auto' : 'none' }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="flex flex-col md:flex-row items-center h-full p-8 md:p-12">
            <div className="flex-1 text-white">
              <p className="text-lg md:text-xl font-medium mb-2 opacity-80">{banner.subtitle}</p>
              <h2 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight">{banner.title}</h2>
              <p className="text-xl md:text-2xl font-bold mb-6 opacity-90">{banner.offer}</p>
              <a
                href={banner.cta.link}
                className="inline-block bg-blue-600 text-white px-6 py-2 rounded-full font-semibold shadow hover:bg-blue-700 transition mb-4"
              >
                {banner.cta.label}
              </a>
              <div className="flex gap-2 mt-6">
                {banners.map((_, i) => (
                  <span
                    key={i}
                    className={`inline-block w-6 h-2 rounded-full transition-all duration-300 ${i === current ? 'bg-white' : 'bg-white/30'}`}
                    onClick={() => goTo(i)}
                  />
                ))}
              </div>
            </div>
            <div className="flex-1 flex justify-center items-center">
              <img
                src={banner.image}
                alt={banner.title}
                className="w-64 h-64 object-contain drop-shadow-xl"
              />
            </div>
          </div>
        </div>
      ))}
      {/* Navigation Arrows */}
      <button
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-white text-blue-700 w-12 h-12 rounded-full shadow flex items-center justify-center z-20 border-2 border-white hover:bg-blue-100 transition"
        aria-label="Previous"
      >
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" /></svg>
      </button>
      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white text-blue-700 w-12 h-12 rounded-full shadow flex items-center justify-center z-20 border-2 border-white hover:bg-blue-100 transition"
        aria-label="Next"
      >
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" /></svg>
      </button>
    </div>
  );
};

export default BannerCarousel; 