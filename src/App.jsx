import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import "./App.css";

/* ==========================================================================
   ⌚ 1. WATCH DATA (PRODUCTS)
   Edit prices, names, descriptions, or image paths here.
   ========================================================================== */
const watches = [
  {
    id: 1,
    name: "AP Royal Oak Concept Flying Tourbillon GMT",
    brand: "Audemars Piguet",
    price: 2999,
    description:
      "A masterwork of horological engineering, the Royal Oak Concept Flying Tourbillon GMT pushes the boundaries of watchmaking with its skeletonized architecture and dual-timezone complication housed in forged carbon.",
    images: [
      "/images/AP royal oak concept flying tourbillon gmt (1).png",
      "/images/AP royal oak concept flying tourbillon gmt (2).jpg",
      "/images/AP royal oak concept flying tourbillon gmt (3).avif",
      "/images/AP royal oak concept flying tourbillon gmt (4).jpg",
      "/images/AP royal oak concept flying tourbillon gmt (5).jpg",
    ],
  },
  {
    id: 2,
    name: "AP Royal Oak Perpetual Calendar Ultra-Thin (Ref. 26586TI)",
    brand: "Audemars Piguet",
    price: 2849,
    description:
      "The thinnest perpetual calendar ever crafted by AP, the 26586TI in titanium redefines elegance. Its integrated bracelet and moonphase display epitomize the Art of Precision.",
    images: [
      "/images/AP royal oak perpetual calendar ultra-thin (ref. 26586ti) (1).jpg",
      "/images/AP royal oak perpetual calendar ultra-thin (ref. 26586ti) (2).jpg",
      "/images/AP royal oak perpetual calendar ultra-thin (ref. 26586ti) (3).jpg",
      "/images/AP royal oak perpetual calendar ultra-thin (ref. 26586ti) (4).jpg",
      "/images/AP royal oak perpetual calendar ultra-thin (ref. 26586ti) (5).jpg",
    ],
  },
  {
    id: 3,
    name: "Jacob & Co Bugatti Chiron Tourbillon Baguette",
    brand: "Jacob & Co",
    price: 2999,
    description:
      "Born from the union of two icons, this extraordinary timepiece houses a miniature W16 engine in its movement. Set with baguette-cut diamonds, it is the pinnacle of automotive-inspired watchmaking.",
    images: [
      "/images/Jacob and Co Bugatti Chiron Tourbillon Baguette (1).jpg",
      "/images/Jacob and Co Bugatti Chiron Tourbillon Baguette (2).jpg",
      "/images/Jacob and Co Bugatti Chiron Tourbillon Baguette (3).jpg",
      "/images/Jacob and Co Bugatti Chiron Tourbillon Baguette (4).jpg",
      "/images/Jacob and Co Bugatti Chiron Tourbillon Baguette (5).jpg",
    ],
  },
  {
    id: 4,
    name: "Jacob & Co Astronomia Dragon",
    brand: "Jacob & Co",
    price: 2950,
    description:
      "A mythical guardian encircles the tri-axial tourbillon of the Astronomia Dragon. Hand-carved and enameled in breathtaking detail, each piece is a wearable sculpture of legend.",
    images: [
      "/images/Jacob and Co Astronomia Dragon (1).jpg",
      "/images/Jacob and Co Astronomia Dragon (2).jpg",
      "/images/Jacob and Co Astronomia Dragon (3).webp",
      "/images/Jacob and Co Astronomia Dragon (4).jpg",
      "/images/Jacob and Co Astronomia Dragon (5).jpg",
    ],
  },
  {
    id: 5,
    name: "Jacob & Co Astronomia Solar",
    brand: "Jacob & Co",
    price: 2799,
    description:
      "The cosmos on your wrist. The Astronomia Solar features a rotating solar system with a 1-carat diamond as the sun. Its four-arm movement rotates once every 10 minutes — pure magic.",
    images: [
      "/images/jacob and co astronomia solar (1).jpg",
      "/images/jacob and co astronomia solar (2).jpg",
      "/images/jacob and co astronomia solar (3).jpg",
      "/images/jacob and co astronomia solar (4).jpg",
      "/images/jacob and co astronomia solar (5).jpg",
    ],
  },
  {
    id: 6,
    name: "Jacob & Co Shri Ram Mandir Edition",
    brand: "Jacob & Co",
    price: 2699,
    description:
      "A devotional masterpiece celebrating the consecration of the Shri Ram Mandir in Ayodhya. Hand-painted enamel depicts the sacred temple in extraordinary detail on a grand complication movement.",
    images: [
      "/images/jacob and co shri ram mandir edition (1).jpg",
      "/images/jacob and co shri ram mandir edition (2).webp",
      "/images/jacob and co shri ram mandir edition (3).webp",
      "/images/jacob and co shri ram mandir edition (4).jpg",
      "/images/jacob and co shri ram mandir edition (5).jpg",
    ],
  },
  {
    id: 7,
    name: "Patek Philippe Grandmaster Chime 6300/403G",
    brand: "Patek Philippe",
    price: 2999,
    description:
      "The most complicated watch Patek Philippe has ever created for sale. Twenty complications, five chiming modes, and a reversible case in white gold — this is watchmaking's ultimate achievement.",
    images: [
      "/images/Patek Philippe Grandmaster Chime 6300403G (1).jpg",
      "/images/Patek Philippe Grandmaster Chime 6300403G (2).jpg",
      "/images/Patek Philippe Grandmaster Chime 6300403G (3).jpg",
      "/images/Patek Philippe Grandmaster Chime 6300403G (4).jpg",
      "/images/Patek Philippe Grandmaster Chime 6300403G (5).jpg",
    ],
  },
  {
    id: 8,
    name: "Patek Philippe Grandmaster Chime Ref. 6300A-010",
    brand: "Patek Philippe",
    price: 2899,
    description:
      "The legendary steel variant produced exclusively for Only Watch 2019. The rarest steel Patek ever made, it sold for a record-breaking sum and represents the apex of collectible horology.",
    images: [
      "/images/patek philippe Grandmaster Chime Ref. 6300A-010 (1).jpg",
      "/images/patek philippe Grandmaster Chime Ref. 6300A-010 (2).jpg",
      "/images/patek philippe Grandmaster Chime Ref. 6300A-010 (3).jpg",
      "/images/patek philippe Grandmaster Chime Ref. 6300A-010 (4).jpg",
      "/images/patek philippe Grandmaster Chime Ref. 6300A-010 (5).jpg",
    ],
  },
  {
    id: 9,
    name: "Patek Philippe Nautilus 5724",
    brand: "Patek Philippe",
    price: 2599,
    description:
      "Gerald Genta's iconic porthole design reimagined with precious stones. The Nautilus 5724 sets a new standard for luxury sports watches, with its diamond-set bezel and integrated bracelet.",
    images: [
      "/images/Patek Philippe Nautilus 5724 (1).jpg",
      "/images/Patek Philippe Nautilus 5724 (2).jpg",
      "/images/Patek Philippe Nautilus 5724 (3).avif",
      "/images/Patek Philippe Nautilus 5724 (4).jpg",
      "/images/Patek Philippe Nautilus 5724 (5).jpg",
    ],
  },
  {
    id: 10,
    name: "Richard Mille RM 052",
    brand: "Richard Mille",
    price: 2799,
    description:
      "A skull-shaped tourbillon that confronts mortality through art. The RM 052 skeleton movement is visible through a sapphire crystal case, making death itself a mechanism to admire.",
    images: [
      "/images/Richard Mille RM 052 (1).png",
      "/images/Richard Mille RM 052 (2).jpg",
      "/images/Richard Mille RM 052 (3).jpg",
      "/images/Richard Mille RM 052 (4).jpg",
      "/images/Richard Mille RM 052 (5).jpg",
    ],
  },
  {
    id: 11,
    name: "Richard Mille RM 53-01 Tourbillon",
    brand: "Richard Mille",
    price: 2899,
    description:
      "Engineered for Pablo Mac Donough, this polo-inspired tourbillon withstands 5000g shocks. Its cable-suspended movement is a feat of aerospace engineering wrapped in a luxury timepiece.",
    images: [
      "/images/Richard Mille RM 53-01 Tourbillon (1).jpg",
      "/images/Richard Mille RM 53-01 Tourbillon (2).jpg",
      "/images/Richard Mille RM 53-01 Tourbillon (3).jpg",
      "/images/Richard Mille RM 53-01 Tourbillon (4).jpg",
      "/images/Richard Mille RM 53-01 Tourbillon (5).jpg",
    ],
  },
  {
    id: 12,
    name: "Richard Mille RM 65-01",
    brand: "Richard Mille",
    price: 2750,
    description:
      "The world's first split-seconds chronograph with automatic winding in a Richard Mille case. Its grade 5 titanium architecture and RMAL1 movement represent the cutting edge of mechanical chronography.",
    images: [
      "/images/Richard Mille RM 65-01 (1).jpg",
      "/images/Richard Mille RM 65-01 (2).jpg",
      "/images/Richard Mille RM 65-01 (3).jpg",
      "/images/Richard Mille RM 65-01 (4).jpg",
      "/images/Richard Mille RM 65-01 (5).jpg",
    ],
  },
  {
    id: 13,
    name: "Rolex Cosmograph Daytona",
    brand: "Rolex",
    price: 1999,
    description:
      "Born on the racing circuits of Daytona Beach, this legendary chronograph has defined sporting elegance for over six decades. Its tachymeter bezel and precision Calibre 4130 are icons of the genre.",
    images: [
      "/images/Rolex Cosmograph Daytona (1).jpg",
      "/images/Rolex Cosmograph Daytona (2).jpg",
      "/images/Rolex Cosmograph Daytona (3).jpg",
      "/images/Rolex Cosmograph Daytona (4).jpg",
      "/images/Rolex Cosmograph Daytona (5).jpg",
    ],
  },
  {
    id: 14,
    name: "Rolex Daytona Rainbow Rose Gold",
    brand: "Rolex",
    price: 2499,
    description:
      "The most coveted Daytona in existence. An Everest rainbow of baguette-cut sapphires crowns the bezel, while the Everose gold case glows with warmth. This is the unicorn of the modern watch world.",
    images: [
      "/images/rolex daytona rainbow rose gold (1).jpg",
      "/images/rolex daytona rainbow rose gold (2).jpg",
      "/images/rolex daytona rainbow rose gold (3).jpg",
      "/images/rolex daytona rainbow rose gold (4).jpg",
      "/images/rolex daytona rainbow rose gold (5).jpg",
    ],
  },
  {
    id: 15,
    name: "Rolex GMT-Master II",
    brand: "Rolex",
    price: 1799,
    description:
      "The traveler's companion since 1954. The GMT-Master II tracks two time zones simultaneously with its iconic two-tone ceramic bezel, combining Rolex's legendary robustness with effortless cool.",
    images: [
      "/images/Rolex GMT-Master II (1).jpg",
      "/images/Rolex GMT-Master II (2).jpg",
      "/images/Rolex GMT-Master II (3).jpg",
      "/images/Rolex GMT-Master II (4).jpg",
      "/images/Rolex GMT-Master II (5).jpg",
    ],
  },
];


/* ==========================================================================
   🎥 2. SCROLL CANVAS (HERO ANIMATION)
   This controls the Apple-style background video scrubbing.
   ========================================================================== */
function ScrollCanvas({ totalFrames = 240 }) {
  const canvasRef = useRef(null);
  const framesRef = useRef([]);
  const loadedRef = useRef(false);
  const rafRef = useRef(null);
  const tunnelRef = useRef(null);

  const drawFrame = useCallback((index) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    // 🔥 HD SMOOTHING ENABLED HERE 🔥
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    const img = framesRef.current[index];
    if (!img) return;

    // High-res screen setup
    canvas.width = window.innerWidth * window.devicePixelRatio;
    canvas.height = window.innerHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    
    const w = window.innerWidth;
    const h = window.innerHeight;
    
    // 🔥 THE FIX: Mobile vs Desktop Scaling Logic 🔥
    let scale;
    if (w > h) {
      // Desktop: Scale to fit the height (centers the watch elegantly)
      scale = h / img.height;
    } else {
      // Mobile/Tablet Portrait: Scale to cover the whole screen
      scale = Math.max(w / img.width, h / img.height);
    }
    
    const x = (w - img.width * scale) / 2;
    const y = (h - img.height * scale) / 2;
    
    ctx.clearRect(0, 0, w, h);
    ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
  }, []);

  useEffect(() => {
    let cancelled = false;

    const loadFrames = async () => {
      // Fire all 240 image requests at the exact same time
      const promises = [];
      const loadedArray = new Array(totalFrames);

      for (let i = 1; i <= totalFrames; i++) {
        const img = new Image();
        const num = String(i).padStart(3, "0");
        const index = i - 1;

        const promise = new Promise((res) => {
          img.onload = () => {
            loadedArray[index] = img;
            res();
          };
          img.onerror = () => {
            loadedArray[index] = img; // Prevent freezing if 1 frame fails
            res();
          };
        });

        // Trigger the download
        img.src = `/frames/frame-${num}.jpg`;
        promises.push(promise);

        // Draw the very first frame immediately so the screen isn't blank
        if (i === 1) {
          promise.then(() => {
            if (!cancelled) {
              framesRef.current = loadedArray;
              loadedRef.current = true;
              drawFrame(0);
            }
          });
        }
      }

      // Wait for the background downloads to finish concurrently
      await Promise.all(promises);
      if (!cancelled) {
        framesRef.current = loadedArray;
        loadedRef.current = true;
      }
    };

    loadFrames();

    const onScroll = () => {
      if (!loadedRef.current || !tunnelRef.current) return;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const tunnel = tunnelRef.current;
        const rect = tunnel.getBoundingClientRect();
        const tunnelScrollable = tunnel.offsetHeight - window.innerHeight;
        const scrolled = Math.max(0, -rect.top);
        const fraction = Math.min(scrolled / tunnelScrollable, 1);
        const frameIndex = Math.min(
          Math.floor(fraction * (framesRef.current.length - 1)),
          framesRef.current.length - 1
        );
        drawFrame(Math.max(0, frameIndex));
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", () => {
      drawFrame(0); // Redraw on window resize
    });
    return () => {
      cancelled = true;
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [totalFrames, drawFrame]);

  const tunnelHeight = `${totalFrames * 12}px`;

  return (
    <div ref={tunnelRef} className="scroll-tunnel" style={{ height: tunnelHeight }}>
      <div className="scroll-canvas-sticky">
        <div className="hero-overlay-content">
          <p className="hero-eyebrow">Est. In Excellence</p>
          <h1 className="hero-title">
            Time Is The<br />
            <span className="gold-text">Ultimate Luxury</span>
          </h1>
          <p className="hero-sub">
            Curated replicas of the world's most coveted timepieces,<br />
            crafted for the discerning collector.
          </p>
          <a href="#collection" className="btn-hero">Explore Collection</a>
        </div>
        <canvas ref={canvasRef} className="scroll-canvas" />
        <div className="hero-scroll-hint">
          <span>Scroll to discover</span>
          <div className="scroll-line" />
        </div>
      </div>
    </div>
  );
}


/* ==========================================================================
   🛒 3. CART ICON COMPONENT
   The bag icon in the top right navbar.
   ========================================================================== */
function CartIcon({ count, onClick }) {
  return (
    <button className="cart-btn" onClick={onClick} aria-label="Open cart">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 01-8 0" />
      </svg>
      {count > 0 && <span className="cart-count">{count}</span>}
    </button>
  );
}


/* ==========================================================================
   🃏 4. WATCH CARD COMPONENT
   The individual watch squares in the main collection grid.
   ========================================================================== */
function WatchCard({ watch, onClick, onAddToCart }) {
  const [imgError, setImgError] = useState(false);
  return (
    <div className="watch-card" onClick={() => onClick(watch)}>
      <div className="card-img-wrap">
        {imgError ? (
          <div className="img-fallback"><span>⌚</span></div>
        ) : (
          <img
            src={watch.images[0]}
            alt={watch.name}
            className="card-img"
            onError={() => setImgError(true)}
            loading="lazy"
          />
        )}
        <div className="card-overlay">
          <span className="view-label">View Details</span>
        </div>
      </div>
      <div className="card-body">
        <span className="card-brand">{watch.brand}</span>
        <h3 className="card-name">{watch.name}</h3>
        <div className="card-footer">
          <span className="card-price">₹{watch.price.toLocaleString("en-IN")}</span>
          <button
            className="btn-cart-small"
            onClick={(e) => { e.stopPropagation(); onAddToCart(watch); }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}


/* ==========================================================================
   📖 5. PRODUCT DETAIL PAGE
   The full screen that opens when you click a watch.
   ========================================================================== */
function ProductPage({ watch, onBack, onAddToCart, allWatches, onSelectWatch }) {
  const [activeImg, setActiveImg] = useState(0);
  const [imgError, setImgError] = useState({});

  const related = useMemo(() => {
    return allWatches
      .filter((w) => w.id !== watch.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
  }, [allWatches, watch.id]);

  const handleWhatsApp = () => {
    const msg = `Hello Ahir Watches, I want to order the ${watch.name} priced at ₹${watch.price.toLocaleString("en-IN")}. Please confirm availability.`;
    window.open(`https://wa.me/916354971686?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <div className="product-page">
      <button className="back-btn" onClick={onBack}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M5 12l7-7M5 12l7 7" />
        </svg>
        Back to Collection
      </button>

      <div className="pp-hero">
        <div className="pp-gallery">
          <div className="pp-main-img-wrap">
            {imgError[activeImg] ? (
              <div className="img-fallback large"><span>⌚</span></div>
            ) : (
              <img
                src={watch.images[activeImg]}
                alt={watch.name}
                className="pp-main-img"
                onError={() => setImgError((p) => ({ ...p, [activeImg]: true }))}
              />
            )}
          </div>
          <div className="pp-thumbs">
            {watch.images.map((src, i) => (
              <button
                key={i}
                className={`thumb-btn ${activeImg === i ? "active" : ""}`}
                onClick={() => setActiveImg(i)}
              >
                {imgError[i] ? (
                  <span className="thumb-fallback">⌚</span>
                ) : (
                  <img src={src} alt={`View ${i + 1}`} onError={() => setImgError((p) => ({ ...p, [i]: true }))} />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="pp-info">
          <span className="modal-brand">{watch.brand}</span>
          <h1 className="pp-name">{watch.name}</h1>
          <div className="modal-divider" />

          <div className="pp-specs">
            <span className="spec-chip">Premium Replica</span>
            <span className="spec-chip">Free Shipping</span>
            <span className="spec-chip">COD Available</span>
          </div>

          <p className="modal-desc">{watch.description}</p>

          <div className="pp-price-row">
            <span className="pp-price">₹{watch.price.toLocaleString("en-IN")}</span>
            <span className="pp-price-note">Incl. all taxes</span>
          </div>

          <div className="pp-actions">
            <button className="btn-cart" onClick={() => onAddToCart(watch)}>
              🛒 Add to Cart
            </button>
            <button className="btn-whatsapp" onClick={handleWhatsApp}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              </svg>
              Order on WhatsApp
            </button>
          </div>

          <div className="pp-delivery">
            <div className="delivery-row">
              <span>📦</span>
              <span>Ships within 2–4 business days · Kosamba, Gujarat</span>
            </div>
            <div className="delivery-row">
              <span>🔄</span>
              <span>Easy returns within 7 days</span>
            </div>
            <div className="delivery-row">
              <span>🔒</span>
              <span>Secure WhatsApp ordering</span>
            </div>
          </div>
        </div>
      </div>

      <div className="pp-related">
        <h2 className="related-title">You May Also Like</h2>
        <div className="related-grid-full">
          {related.map((r) => (
            <div key={r.id} className="related-card-full" onClick={() => onSelectWatch(r)}>
              <div className="rcf-img-wrap">
                <img src={r.images[0]} alt={r.name} className="rcf-img" onError={(e) => { e.target.style.display = "none"; }} />
                <div className="card-overlay"><span className="view-label">View Details</span></div>
              </div>
              <span className="related-brand">{r.brand}</span>
              <span className="related-name">{r.name}</span>
              <span className="related-price">₹{r.price.toLocaleString("en-IN")}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


/* ==========================================================================
   🛍️ 6. CART DRAWER
   The side panel that slides out when you click the cart icon.
   ========================================================================== */
function CartDrawer({ cart, onClose, onRemove }) {
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  const handleWhatsAppAll = () => {
    const lines = cart.map(
      (i) => `• ${i.name} × ${i.qty} = ₹${(i.price * i.qty).toLocaleString("en-IN")}`
    );
    const msg = `Hello Ahir Watches! I want to place the following order:\n\n${lines.join("\n")}\n\nTotal: ₹${total.toLocaleString("en-IN")}\n\nPlease confirm availability.`;
    window.open(`https://wa.me/916354971686?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <div className="cart-backdrop" onClick={onClose}>
      <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h3>Your Cart</h3>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        {cart.length === 0 ? (
          <p className="cart-empty">Your cart is empty.</p>
        ) : (
          <>
            <ul className="cart-list">
              {cart.map((item) => (
                <li key={item.id} className="cart-item">
                  <img src={item.images[0]} alt={item.name} className="cart-item-img" onError={(e) => { e.target.style.display = "none"; }} />
                  <div className="cart-item-info">
                    <span className="cart-item-name">{item.name}</span>
                    <span className="cart-item-price">₹{(item.price * item.qty).toLocaleString("en-IN")} × {item.qty}</span>
                  </div>
                  <button className="cart-remove" onClick={() => onRemove(item.id)}>✕</button>
                </li>
              ))}
            </ul>
            <div className="cart-total">
              <span>Total</span>
              <span>₹{total.toLocaleString("en-IN")}</span>
            </div>
            <button className="btn-whatsapp full" onClick={handleWhatsAppAll}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              </svg>
              Order All via WhatsApp
            </button>
          </>
        )}
      </div>
    </div>
  );
}


/* ==========================================================================
   🍞 7. TOAST NOTIFICATION
   The small popup that says "Added to cart" at the bottom.
   ========================================================================== */
function Toast({ message, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2200);
    return () => clearTimeout(t);
  }, [onDone]);
  return <div className="toast">{message}</div>;
}


/* ==========================================================================
   🚀 8. MAIN APP
   The core structure combining Navbar, Hero, and the logic.
   ========================================================================== */
export default function App() {
  const [page, setPage] = useState(null);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [filter, setFilter] = useState("All");

  const brands = ["All", ...new Set(watches.map((w) => w.brand))];
  const filtered = filter === "All" ? watches : watches.filter((w) => w.brand === filter);

  useEffect(() => {
    const handlePop = () => setPage(null);
    window.addEventListener("popstate", handlePop);
    return () => window.removeEventListener("popstate", handlePop);
  }, []);

  const openProduct = useCallback((watch) => {
    window.history.pushState({ watchId: watch.id }, "", `#watch-${watch.id}`);
    setPage(watch);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const goBack = useCallback(() => { window.history.back(); }, []);

  const addToCart = useCallback((watch) => {
    setCart((prev) => {
      const exists = prev.find((i) => i.id === watch.id);
      if (exists) return prev.map((i) => i.id === watch.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...watch, qty: 1 }];
    });
    setToast(`${watch.name.split(" ").slice(0, 3).join(" ")} added to cart`);
  }, []);

  const removeFromCart = useCallback((id) => setCart((prev) => prev.filter((i) => i.id !== id)), []);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  const Navbar = (
    <nav className="navbar">
      <div className="nav-logo" onClick={() => { if (page) goBack(); }} style={{ cursor: page ? "pointer" : "default" }}>
        <span className="logo-mark">⌚</span>
        <span className="logo-text">AHIR <em>WATCHES</em></span>
      </div>
      <div className="nav-tagline">Luxury Timepieces · Kosamba, Gujarat</div>
      <CartIcon count={cartCount} onClick={() => setCartOpen(true)} />
    </nav>
  );

  return (
    <div className="app">
      {Navbar}

      {/* ── HOME PAGE VIEW ── */}
      {!page && (
        <>
          <section className="scroll-section">
            <ScrollCanvas totalFrames={240} />
          </section>

          <section className="collection" id="collection">
            <div className="section-header">
              <p className="section-eyebrow">Our Collection</p>
              <h2 className="section-title">15 Exceptional Timepieces</h2>
            </div>

            <div className="filter-bar">
              {brands.map((b) => (
                <button key={b} className={`filter-btn ${filter === b ? "active" : ""}`} onClick={() => setFilter(b)}>
                  {b}
                </button>
              ))}
            </div>

            <div className="watch-grid">
              {filtered.map((w) => (
                <WatchCard key={w.id} watch={w} onClick={openProduct} onAddToCart={addToCart} />
              ))}
            </div>
          </section>

          <footer className="footer">
            <div className="footer-inner">
              <div className="footer-brand">
                <span className="logo-mark lg">⌚</span>
                <span className="footer-name">AHIR WATCHES</span>
                <p className="footer-tagline">Where Time Meets Craftsmanship</p>
              </div>
              <div className="footer-contacts">
                <div className="contact-block">
                  <span className="contact-label">Address</span>
                  <span className="contact-val">FX84+92M, Kosamba,<br />Gujarat 394120</span>
                </div>
                <div className="contact-block">
                  <span className="contact-label">WhatsApp</span>
                  <a href="https://wa.me/916354971686" className="contact-val link" target="_blank" rel="noreferrer">+91 6354971686</a>
                </div>
                <div className="contact-block">
                  <span className="contact-label">Instagram</span>
                  <a href="https://www.instagram.com/autoverse_ai69?igsh=MWN6Z2k1dm8yZ240dw==" className="contact-val link" target="_blank" rel="noreferrer">@autoverse_ai69</a>
                </div>
              </div>
              <div className="footer-cta">
                <a href="https://wa.me/916354971686" className="btn-whatsapp" target="_blank" rel="noreferrer">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  </svg>
                  Chat With Us
                </a>
              </div>
            </div>
            <div className="footer-bottom">
              <p>© 2026 Ahir Watches · All rights reserved · Kosamba, Gujarat</p>
            </div>
          </footer>
        </>
      )}

      {/* ── PRODUCT PAGE VIEW ── */}
      {page && (
        <ProductPage
          watch={page}
          onBack={goBack}
          onAddToCart={addToCart}
          allWatches={watches}
          onSelectWatch={openProduct}
        />
      )}

      {/* ── OVERLAYS ── */}
      {cartOpen && <CartDrawer cart={cart} onClose={() => setCartOpen(false)} onRemove={removeFromCart} />}
      {toast && <Toast message={`✔ ${toast}`} onDone={() => setToast(null)} />}
    </div>
  );
}