import { useState, useEffect, useRef } from "react";

/* ====== Loading Screen ====== */
function Loader() {
  const [hide, setHide] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setHide(true), 2000);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className={`fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center transition-all duration-700 ${hide ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
      <h1 className="text-white text-5xl md:text-7xl font-serif italic animate-pulse">Flavoria</h1>
      <p className="text-orange-500 text-xs uppercase tracking-[0.5em] mt-4">Fine Dining</p>
    </div>
  );
}

/* ====== WhatsApp Button ====== */
function WhatsAppBtn() {
  return (
    <a
      href="https://wa.me/21600000000?text=Hello%20Flavoria!%20I%20would%20like%20to%20book%20a%20table."
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 left-6 z-[60] bg-green-500 hover:bg-green-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all duration-300"
      title="Chat on WhatsApp"
    >
      <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current">
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.553 4.105 1.52 5.83L0 24l6.335-1.652A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75c-1.95 0-3.77-.57-5.3-1.55l-.38-.23-3.76.98 1-3.67-.25-.4A9.7 9.7 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75zm5.46-7.28c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.5 0 1.47 1.07 2.89 1.22 3.09.15.2 2.11 3.22 5.1 4.51.71.31 1.27.49 1.7.63.72.23 1.37.2 1.88.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35z"/>
      </svg>
    </a>
  );
}

/* ====== Cart Panel ====== */
function CartPanel({ cart, setCart, open, setOpen }) {
  const total = cart.reduce((sum, item) => sum + item.priceNum * item.qty, 0);

  const changeQty = (name, delta) => {
    setCart(prev => prev
      .map(i => i.name === name ? { ...i, qty: i.qty + delta } : i)
      .filter(i => i.qty > 0)
    );
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-[60] bg-orange-600 hover:bg-orange-700 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all duration-300"
      >
        🛒
        {cart.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-white text-orange-600 text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
            {cart.reduce((s, i) => s + i.qty, 0)}
          </span>
        )}
      </button>

      <div className={`fixed inset-0 z-[70] transition-all duration-300 ${open ? "visible" : "invisible"}`}>
        <div onClick={() => setOpen(false)} className={`absolute inset-0 bg-black/60 transition-opacity ${open ? "opacity-100" : "opacity-0"}`}></div>
        <div className={`absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col transition-transform duration-500 ${open ? "translate-x-0" : "translate-x-full"}`}>
          <div className="flex justify-between items-center p-6 border-b">
            <h3 className="text-2xl font-serif">Your Order</h3>
            <button onClick={() => setOpen(false)} className="text-3xl hover:text-orange-600">×</button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-5">
            {cart.length === 0 && (
              <p className="text-gray-400 text-center mt-10 italic">Your cart is empty...<br />Add something delicious! 🍽️</p>
            )}
            {cart.map(item => (
              <div key={item.name} className="flex gap-4 items-center">
                <img src={item.img} className="w-16 h-16 object-cover" alt={item.name} />
                <div className="flex-1">
                  <p className="font-medium text-sm">{item.name}</p>
                  <p className="text-orange-600 font-bold text-sm">{item.price}</p>
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={() => changeQty(item.name, -1)} className="w-7 h-7 border hover:bg-gray-100">−</button>
                  <span className="font-bold">{item.qty}</span>
                  <button onClick={() => changeQty(item.name, 1)} className="w-7 h-7 border hover:bg-gray-100">+</button>
                </div>
              </div>
            ))}
          </div>

          {cart.length > 0 && (
            <div className="p-6 border-t">
              <div className="flex justify-between mb-4">
                <span className="uppercase text-xs tracking-widest text-gray-500">Total</span>
                <span className="text-2xl font-bold text-orange-600">${total.toFixed(2)}</span>
              </div>
              <button
                onClick={() => { alert("Order confirmed! ✅ Thank you!"); setCart([]); setOpen(false); }}
                className="w-full bg-black text-white p-4 uppercase tracking-[0.25em] text-xs font-bold hover:bg-orange-600 transition"
              >
                Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

/* ====== Gallery Lightbox ====== */
function Lightbox({ img, onClose }) {
  if (!img) return null;
  return (
    <div onClick={onClose} className="fixed inset-0 z-[80] bg-black/90 flex items-center justify-center p-6 cursor-pointer">
      <button className="absolute top-6 right-8 text-white text-4xl hover:text-orange-500">×</button>
      <img src={img.replace("w=800", "w=1600")} className="max-h-[85vh] max-w-full object-contain" alt="Gallery" />
    </div>
  );
}

/* ====== Animation: يظهر المحتوى كي تهبطي ====== */
function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-1000 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
    >
      {children}
    </div>
  );
}

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [activeCat, setActiveCat] = useState("All");
  const [menuOpen, setMenuOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [lightboxImg, setLightboxImg] = useState(null);

  const addToCart = (dish) => {
    setCart(prev => {
      const exists = prev.find(i => i.name === dish.name);
      if (exists) return prev.map(i => i.name === dish.name ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...dish, qty: 1, priceNum: parseFloat(dish.price.replace("$", "")) }];
    });
    setCartOpen(true);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const categories = ["All", "Tapas", "Mains", "Seafood", "Drinks", "Desserts"];

  const dishes = [
    { name: "Iberian Ham Croquettes", price: "$14", cat: "Tapas", desc: "Creamy béchamel, crispy golden crust.", img: "https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&w=800&q=80" },
    { name: "Patatas Bravas", price: "$10", cat: "Tapas", desc: "Spicy tomato sauce, garlic aioli.", img: "https://images.unsplash.com/photo-1518013431117-eb1465fa5752?auto=format&fit=crop&w=800&q=80" },
    { name: "Gambas al Ajillo", price: "$16", cat: "Tapas", desc: "Sizzling garlic shrimp, chili oil.", img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80" },
    { name: "Truffle Mushroom Risotto", price: "$19", cat: "Mains", desc: "Wild mushrooms, parmesan, black truffle.", img: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=800&q=80" },
    { name: "Grilled Ribeye Steak", price: "$32", cat: "Mains", desc: "Herb butter, roasted vegetables.", img: "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=800&q=80" },
    { name: "Saffron Paella", price: "$26", cat: "Mains", desc: "Bomba rice, chicken, seafood, saffron.", img: "https://images.unsplash.com/photo-1534080564583-6be75777b70a?auto=format&fit=crop&w=800&q=80" },
    { name: "Crispy Braised Octopus", price: "$24", cat: "Seafood", desc: "Potatoes, smoked paprika, olive oil.", img: "https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&w=800&q=80" },
    { name: "Seared Tuna Tataki", price: "$22", cat: "Seafood", desc: "Sesame crust, ponzu, micro greens.", img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80" },
    { name: "Signature Sangria", price: "$12", cat: "Drinks", desc: "Red wine, seasonal fruits, spices.", img: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80" },
    { name: "Passion Mojito", price: "$11", cat: "Drinks", desc: "Fresh mint, passion fruit, lime.", img: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?auto=format&fit=crop&w=800&q=80" },
    { name: "Chocolate Lava Cake", price: "$11", cat: "Desserts", desc: "Molten center, vanilla ice cream.", img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80" },
    { name: "Crema Catalana", price: "$9", cat: "Desserts", desc: "Caramelized sugar, citrus cream.", img: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=80" },
  ];

  const filtered = activeCat === "All" ? dishes : dishes.filter(d => d.cat === activeCat);

  const gallery = [
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?auto=format&fit=crop&w=800&q=80",
  ];

  return (
    <div className="bg-white">

      <Loader />
      <WhatsAppBtn />
      <CartPanel cart={cart} setCart={setCart} open={cartOpen} setOpen={setCartOpen} />
      <Lightbox img={lightboxImg} onClose={() => setLightboxImg(null)} />

      {/* ===== NAVBAR ===== */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 px-6 md:px-10 ${
        scrolled ? "bg-black/95 py-4 shadow-lg" : "bg-transparent py-6"
      }`}>
        <div className="flex justify-between items-center text-white">
          <div className="text-xl md:text-2xl font-black tracking-widest uppercase">Flavoria</div>
          <div className="hidden md:flex space-x-10 text-xs font-medium uppercase tracking-[0.2em]">
            <a href="#menu" className="hover:text-orange-400 transition">Menu</a>
            <a href="#about" className="hover:text-orange-400 transition">Experience</a>
            <a href="#gallery" className="hover:text-orange-400 transition">Gallery</a>
            <a href="#reserve" className="hover:text-orange-400 transition">Reservation</a>
          </div>
          <a href="#reserve" className="hidden md:block border border-white px-6 py-2 text-xs uppercase tracking-widest hover:bg-orange-600 hover:border-orange-600 transition">
            Book a Table
          </a>
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-2xl">☰</button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-black/95 mt-4 p-6 flex flex-col space-y-4 text-white uppercase text-sm tracking-widest">
            <a href="#menu" onClick={() => setMenuOpen(false)}>Menu</a>
            <a href="#about" onClick={() => setMenuOpen(false)}>Experience</a>
            <a href="#gallery" onClick={() => setMenuOpen(false)}>Gallery</a>
            <a href="#reserve" onClick={() => setMenuOpen(false)}>Reservation</a>
          </div>
        )}
      </nav>

      {/* ===== HERO مع VIDEO ===== */}
      <div className="relative h-screen w-full overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=2000&q=80"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="https://videos.pexels.com/video-files/3196344/3196344-uhd_2560_1440_25fps.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/55"></div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
          <p className="text-xs md:text-sm uppercase tracking-[0.5em] mb-6 animate-pulse">Fine Dining · Tapas · Cocktails</p>
          <h1 className="text-6xl md:text-9xl font-serif italic mb-8">Flavoria</h1>
          <p className="max-w-xl text-base md:text-lg font-light leading-relaxed mb-10 text-gray-200">
            Where every plate is a story, and every night is a celebration.
          </p>
          <div className="flex flex-col md:flex-row gap-4">
            <a href="#menu" className="bg-orange-600 px-10 py-4 uppercase text-xs tracking-[0.25em] font-bold hover:bg-orange-700 hover:scale-105 transition-all duration-300">
              Explore The Menu
            </a>
            <a href="#reserve" className="border border-white px-10 py-4 uppercase text-xs tracking-[0.25em] font-bold hover:bg-white hover:text-black transition-all duration-300">
              Book a Table
            </a>
          </div>
        </div>

        <a href="#about" className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white text-3xl animate-bounce z-10">↓</a>
      </div>

      {/* ===== ABOUT ===== */}
      <section id="about" className="py-28 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <Reveal>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1000&q=80"
                className="w-full h-[480px] object-cover"
                alt="Interior"
              />
              <div className="absolute -bottom-6 -right-6 bg-orange-600 text-white p-8 hidden md:block">
                <p className="text-4xl font-serif">12+</p>
                <p className="text-xs uppercase tracking-widest">Years of Passion</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={200}>
            <h3 className="text-orange-600 uppercase tracking-[0.3em] text-xs mb-4 font-bold">Our Story</h3>
            <h2 className="text-4xl md:text-5xl font-serif mb-8 leading-tight">A Taste of Passion,<br />Crafted Daily.</h2>
            <p className="text-gray-500 font-light leading-relaxed mb-6">
              At Flavoria, every dish tells a story. Our chefs blend tradition with creativity,
              using only the freshest seasonal ingredients to deliver an unforgettable dining experience.
            </p>
            <p className="text-gray-500 font-light leading-relaxed mb-8">
              From intimate dinners to lively gatherings, our space is designed to make every moment special.
            </p>
            <a href="#menu" className="inline-block border-b-2 border-orange-600 pb-1 uppercase text-xs tracking-[0.25em] font-bold hover:text-orange-600 transition">
              Discover the menu →
            </a>
          </Reveal>
        </div>
      </section>

      {/* ===== MENU ===== */}
      <section id="menu" className="py-28 bg-[#0d0d0d] text-white px-6">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-14">
              <h3 className="text-orange-500 uppercase tracking-[0.3em] text-xs mb-3 font-bold">Selection</h3>
              <h2 className="text-5xl md:text-6xl font-serif">The Menu</h2>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="flex flex-wrap justify-center gap-3 md:gap-6 mb-16">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCat(cat)}
                  className={`uppercase text-xs tracking-[0.2em] px-5 py-2.5 border transition-all duration-300 ${
                    activeCat === cat
                      ? "bg-orange-600 border-orange-600 text-white"
                      : "border-gray-700 text-gray-400 hover:border-orange-600 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filtered.map((dish, i) => (
              <Reveal key={dish.name} delay={i * 80}>
                <div className="group cursor-pointer">
                  <div className="overflow-hidden mb-5 aspect-[4/5] relative">
                    <img
                      src={dish.img}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                      alt={dish.name}
                    />
                    <span className="absolute top-4 left-4 bg-black/70 text-orange-400 text-[10px] uppercase tracking-widest px-3 py-1.5">
                      {dish.cat}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <h4 className="text-lg font-medium group-hover:text-orange-400 transition">{dish.name}</h4>
                    <span className="text-orange-500 font-bold">{dish.price}</span>
                  </div>
                  <p className="text-gray-500 text-sm mt-2 font-light italic">{dish.desc}</p>
                  <button
                    onClick={() => addToCart(dish)}
                    className="mt-4 w-full border border-orange-600 text-orange-500 py-2.5 uppercase text-[10px] tracking-[0.25em] font-bold hover:bg-orange-600 hover:text-white transition-all duration-300"
                  >
                    + Add to Order
                  </button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== GALLERY ===== */}
      <section id="gallery" className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-14">
              <h3 className="text-orange-600 uppercase tracking-[0.3em] text-xs mb-3 font-bold">Moments</h3>
              <h2 className="text-5xl font-serif">The Atmosphere</h2>
            </div>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {gallery.map((img, i) => (
              <Reveal key={img} delay={i * 100}>
                <div onClick={() => setLightboxImg(img)} className="overflow-hidden aspect-square group cursor-pointer">
                  <img src={img} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" alt="Gallery" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIAL ===== */}
      <section className="py-24 bg-[#fafafa] px-6 text-center">
        <Reveal>
          <div className="max-w-3xl mx-auto">
            <p className="text-orange-600 text-5xl font-serif mb-6">“</p>
            <p className="text-2xl md:text-3xl font-serif italic text-gray-800 leading-relaxed mb-8">
              An absolutely unforgettable experience. The octopus was divine,
              the atmosphere magical. Flavoria is a must.
            </p>
            <p className="uppercase text-xs tracking-[0.3em] text-gray-500 font-bold">— Sarah M., Food Critic</p>
          </div>
        </Reveal>
      </section>

      {/* ===== RESERVATION ===== */}
      <section id="reserve" className="relative py-28 px-6 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2000&q=80"
          className="absolute inset-0 w-full h-full object-cover"
          alt="Restaurant"
        />
        <div className="absolute inset-0 bg-black/75"></div>
        <div className="relative max-w-4xl mx-auto grid md:grid-cols-2 gap-16 items-center text-white">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-serif mb-6">Book your Experience</h2>
            <p className="text-gray-300 font-light leading-relaxed mb-8">
              Join us for an unforgettable evening. Our team will confirm your table within 15 minutes.
            </p>
            <div className="space-y-3 text-sm text-gray-300 font-light">
              <p>📍 123 Avenue Habib Bourguiba, Tunis</p>
              <p>🕐 Tue – Sun · 6:00 PM – 1:00 AM</p>
              <p>📞 +216 00 000 000</p>
            </div>
          </Reveal>
          <Reveal delay={200}>
            <form className="space-y-4 text-black bg-white/95 p-8" onSubmit={(e) => { e.preventDefault(); alert("Reservation sent! ✅"); }}>
              <input type="text" placeholder="Your Name" required className="w-full p-4 bg-gray-100 outline-none focus:ring-2 focus:ring-orange-600" />
              <input type="tel" placeholder="Phone Number" required className="w-full p-4 bg-gray-100 outline-none focus:ring-2 focus:ring-orange-600" />
              <div className="flex gap-4">
                <input type="date" required className="w-1/2 p-4 bg-gray-100 outline-none" />
                <input type="time" required className="w-1/2 p-4 bg-gray-100 outline-none" />
              </div>
              <select className="w-full p-4 bg-gray-100 outline-none">
                <option>2 Guests</option>
                <option>3 Guests</option>
                <option>4 Guests</option>
                <option>5+ Guests</option>
              </select>
              <button className="w-full bg-orange-600 text-white p-4 uppercase tracking-[0.25em] text-xs font-bold hover:bg-orange-700 transition">
                Confirm Reservation
              </button>
            </form>
          </Reveal>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-black text-gray-400 py-14 px-6 text-center">
        <div className="text-white text-2xl font-black tracking-widest uppercase mb-4">Flavoria</div>
        <p className="text-sm font-light mb-6">Fine Dining · Tapas · Cocktails</p>
        <div className="flex justify-center space-x-8 text-xs uppercase tracking-widest mb-8">
          <a href="#" className="hover:text-orange-500 transition">Instagram</a>
          <a href="#" className="hover:text-orange-500 transition">Facebook</a>
          <a href="#" className="hover:text-orange-500 transition">TikTok</a>
        </div>
        <p className="text-xs text-gray-600">© 2025 Flavoria. All rights reserved.</p>
      </footer>

    </div>
  );
}

export default App;