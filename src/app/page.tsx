"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { restaurants, categories, menuItems } from "@/lib/data";
import { useCart } from "@/context/CartContext";

const HERO_STATS = [
  { value: "500+", label: "Restaurants" },
  { value: "50K+", label: "Happy Customers" },
  { value: "30 min", label: "Avg Delivery" },
  { value: "4.8 ⭐", label: "App Rating" },
];

const FEATURES = [
  { icon: "⚡", title: "Lightning Fast", desc: "Average delivery in under 30 minutes" },
  { icon: "🔒", title: "Secure Payment", desc: "100% safe & encrypted transactions" },
  { icon: "📱", title: "Live Tracking", desc: "Track your order in real time" },
  { icon: "🎁", title: "Exclusive Deals", desc: "Daily offers & loyalty rewards" },
];

export default function HomePage() {
  const { addItem } = useCart();
  const [activeCategory, setActiveCategory] = useState("all");
  const [heroText, setHeroText] = useState(0);
  const [addedId, setAddedId] = useState<string | null>(null);

  const heroTexts = ["Hungry? 🍕", "Craving? 🍔", "Starving? 🍜"];

  useEffect(() => {
    const t = setInterval(() => setHeroText((p) => (p + 1) % heroTexts.length), 2500);
    return () => clearInterval(t);
  }, []);

  const popularItems = menuItems.filter((m) => m.isPopular).slice(0, 6);

  const handleAdd = (item: (typeof menuItems)[0]) => {
    addItem(item);
    setAddedId(item.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <div style={{ overflowX: "hidden" }}>
      {/* ─── HERO ───────────────────────────────────────────────────── */}
      <section
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 40%, #0f3460 100%)",
          display: "flex",
          alignItems: "center",
          paddingTop: 80,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background blobs */}
        {[
          { size: 500, x: -150, y: -100, color: "rgba(255,107,53,0.06)" },
          { size: 400, x: "60%", y: "20%", color: "rgba(247,197,159,0.05)" },
          { size: 300, x: "80%", y: "60%", color: "rgba(255,107,53,0.04)" },
        ].map((blob, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: blob.size,
              height: blob.size,
              borderRadius: "50%",
              background: blob.color,
              left: blob.x,
              top: blob.y,
              filter: "blur(60px)",
              pointerEvents: "none",
            }}
          />
        ))}

        <div className="container" style={{ position: "relative", zIndex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
          {/* Left */}
          <div className="animate-fade-in-up">
            <div className="badge badge-primary" style={{ marginBottom: 20, fontSize: 13 }}>
              🔥 #1 Food Delivery Platform
            </div>
            <h1
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "clamp(36px, 5vw, 68px)",
                fontWeight: 900,
                lineHeight: 1.1,
                marginBottom: 24,
              }}
            >
              <span key={heroText} className="animate-fade-in" style={{ display: "block", color: "#ff6b35" }}>
                {heroTexts[heroText]}
              </span>
              <span>
                We&apos;ll Deliver
                <br />
                <span className="gradient-text">In Minutes.</span>
              </span>
            </h1>

            <p style={{ color: "#a0a0b8", fontSize: 18, lineHeight: 1.7, marginBottom: 36, maxWidth: 480 }}>
              Order from 500+ top restaurants near you. Fresh food, blazing fast delivery, tracked live — every single time.
            </p>

            {/* Search bar */}
            <div
              className="glass"
              style={{
                display: "flex",
                gap: 0,
                borderRadius: 16,
                overflow: "hidden",
                maxWidth: 500,
                marginBottom: 40,
              }}
            >
              <input
                id="hero-location-input"
                className="input-field"
                placeholder="📍 Enter your delivery address..."
                style={{ border: "none", background: "transparent", flex: 1 }}
              />
              <Link href="/restaurants" style={{ textDecoration: "none" }}>
                <button
                  id="find-food-btn"
                  className="btn-primary"
                  style={{ borderRadius: 0, padding: "14px 24px" }}
                >
                  Find Food →
                </button>
              </Link>
            </div>

            {/* Stats */}
            <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
              {HERO_STATS.map((stat) => (
                <div key={stat.label}>
                  <div style={{ fontSize: 22, fontWeight: 800, color: "#ff6b35" }}>{stat.value}</div>
                  <div style={{ fontSize: 12, color: "#a0a0b8", marginTop: 2 }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Food cards floating */}
          <div
            style={{
              position: "relative",
              height: 500,
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gridTemplateRows: "1fr 1fr 1fr",
              gap: 16,
            }}
            className="animate-fade-in"
          >
            {restaurants.slice(0, 4).map((r, i) => (
              <Link
                key={r.id}
                href={`/restaurants/${r.id}`}
                style={{
                  textDecoration: "none",
                  animation: `float ${2.5 + i * 0.4}s ease-in-out ${i * 0.3}s infinite`,
                  gridColumn: i === 0 || i === 3 ? "span 1" : "span 1",
                }}
              >
                <div
                  className="card"
                  style={{ padding: 16, height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}
                >
                  <div style={{ fontSize: 40, textAlign: "center" }}>{r.image}</div>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: 13 }}>{r.name}</p>
                    <p style={{ color: "#a0a0b8", fontSize: 11 }}>{r.deliveryTime}</p>
                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
                      <span style={{ fontSize: 11, color: "#22c55e" }}>⭐ {r.rating}</span>
                      {r.discount && <span style={{ fontSize: 10, color: "#ff6b35", fontWeight: 700 }}>{r.discount}</span>}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <style>{`@media(max-width:768px){.container>div[style*="grid-template-columns: 1fr 1fr"]{grid-template-columns:1fr!important}.container>div[style*="height: 500px"]{display:none!important}}`}</style>
      </section>

      {/* ─── CATEGORIES ─────────────────────────────────────────────── */}
      <section className="section" style={{ background: "rgba(26,26,46,0.3)" }}>
        <div className="container">
          <h2 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 800, fontSize: "clamp(24px,3vw,36px)", textAlign: "center", marginBottom: 8 }}>
            What Are You Craving?
          </h2>
          <p style={{ color: "#a0a0b8", textAlign: "center", marginBottom: 40 }}>Pick a cuisine and we&apos;ll find the perfect spot</p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
            {categories.map((cat) => (
              <button
                key={cat.id}
                id={`home-cat-${cat.id}`}
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  background: activeCategory === cat.id
                    ? "linear-gradient(135deg, #ff6b35, #e85520)"
                    : "rgba(255,107,53,0.08)",
                  border: `1px solid ${activeCategory === cat.id ? "transparent" : "rgba(255,107,53,0.2)"}`,
                  borderRadius: 20,
                  padding: "10px 22px",
                  color: "white",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.3s",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  boxShadow: activeCategory === cat.id ? "0 8px 20px rgba(255,107,53,0.3)" : "none",
                }}
              >
                <span style={{ fontSize: 20 }}>{cat.emoji}</span>
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ─── POPULAR ITEMS ──────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
            <div>
              <h2 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 800, fontSize: "clamp(22px,3vw,34px)" }}>
                🔥 Most Popular
              </h2>
              <p style={{ color: "#a0a0b8", marginTop: 4 }}>Loved by thousands of foodies</p>
            </div>
            <Link href="/restaurants" style={{ textDecoration: "none" }}>
              <button className="btn-outline">View All →</button>
            </Link>
          </div>

          <div className="grid-menu">
            {popularItems.map((item, i) => (
              <div
                key={item.id}
                id={`popular-${item.id}`}
                className="card animate-fade-in-up"
                style={{ overflow: "hidden", animationDelay: `${i * 0.1}s`, opacity: 0 }}
              >
                <div
                  style={{
                    height: 140,
                    background: "linear-gradient(135deg, #1a1a2e, #0f3460)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 60,
                    position: "relative",
                  }}
                >
                  {item.image}
                  <span
                    className="badge badge-warning"
                    style={{ position: "absolute", top: 10, left: 10, fontSize: 10 }}
                  >
                    🔥 Popular
                  </span>
                  <span
                    style={{
                      position: "absolute",
                      top: 10,
                      right: 10,
                      fontSize: 10,
                      padding: "3px 8px",
                      borderRadius: 8,
                      background: item.isVeg ? "rgba(34,197,94,0.2)" : "rgba(239,68,68,0.2)",
                      color: item.isVeg ? "#22c55e" : "#ef4444",
                      border: `1px solid ${item.isVeg ? "rgba(34,197,94,0.4)" : "rgba(239,68,68,0.4)"}`,
                      fontWeight: 600,
                    }}
                  >
                    {item.isVeg ? "🟢 Veg" : "🔴 Non-veg"}
                  </span>
                </div>

                <div style={{ padding: "14px 16px 18px" }}>
                  <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>{item.name}</h3>
                  <p style={{ color: "#a0a0b8", fontSize: 12, marginBottom: 12, lineHeight: 1.5 }}>
                    {item.description.slice(0, 65)}...
                  </p>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <span style={{ fontSize: 20, fontWeight: 800, color: "#ff6b35" }}>₹{item.price}</span>
                      {item.calories && (
                        <span style={{ color: "#a0a0b8", fontSize: 11, marginLeft: 8 }}>🔥 {item.calories}</span>
                      )}
                    </div>
                    <button
                      onClick={() => handleAdd(item)}
                      className="btn-primary"
                      style={{ padding: "7px 16px", fontSize: 12 }}
                    >
                      {addedId === item.id ? "✓" : "+ Add"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── RESTAURANTS ────────────────────────────────────────────── */}
      <section className="section" style={{ background: "rgba(26,26,46,0.3)" }}>
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
            <div>
              <h2 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 800, fontSize: "clamp(22px,3vw,34px)" }}>
                🏆 Top Restaurants
              </h2>
              <p style={{ color: "#a0a0b8", marginTop: 4 }}>The best of the best near you</p>
            </div>
            <Link href="/restaurants" style={{ textDecoration: "none" }}>
              <button className="btn-outline">See All →</button>
            </Link>
          </div>

          <div className="grid-restaurants">
            {restaurants.slice(0, 3).map((r, i) => (
              <Link
                key={r.id}
                href={`/restaurants/${r.id}`}
                style={{ textDecoration: "none" }}
              >
                <div
                  className="card animate-fade-in-up"
                  style={{ overflow: "hidden", animationDelay: `${i * 0.12}s`, opacity: 0 }}
                >
                  <div
                    style={{
                      height: 150,
                      background: "linear-gradient(135deg, #1a1a2e, #0f3460)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 60,
                      position: "relative",
                    }}
                  >
                    {r.image}
                    {r.discount && (
                      <span
                        style={{
                          position: "absolute",
                          top: 12,
                          left: 12,
                          background: "#ff6b35",
                          color: "white",
                          borderRadius: 8,
                          padding: "4px 10px",
                          fontSize: 12,
                          fontWeight: 700,
                        }}
                      >
                        {r.discount}
                      </span>
                    )}
                  </div>
                  <div style={{ padding: "16px 20px 20px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                      <h3 style={{ fontSize: 17, fontWeight: 700 }}>{r.name}</h3>
                      <span
                        style={{
                          background: "#22c55e",
                          color: "white",
                          borderRadius: 8,
                          padding: "2px 8px",
                          fontSize: 13,
                          fontWeight: 700,
                        }}
                      >
                        ⭐ {r.rating}
                      </span>
                    </div>
                    <p style={{ color: "#a0a0b8", fontSize: 13, marginBottom: 12 }}>{r.cuisine}</p>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      {r.tags.map((t) => (
                        <span key={t} className="badge badge-primary" style={{ fontSize: 11 }}>{t}</span>
                      ))}
                    </div>
                    <div className="divider" style={{ margin: "12px 0" }} />
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#a0a0b8" }}>
                      <span>🕐 {r.deliveryTime}</span>
                      <span>{r.deliveryFee === 0 ? "🆓 Free" : `🛵 ₹${r.deliveryFee}`}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURES ───────────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <h2
            style={{
              fontFamily: "'Poppins',sans-serif",
              fontWeight: 800,
              fontSize: "clamp(22px,3vw,34px)",
              textAlign: "center",
              marginBottom: 50,
            }}
          >
            Why Choose <span className="gradient-text">FoodRush?</span>
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 24 }}>
            {FEATURES.map((f, i) => (
              <div
                key={f.title}
                className="card animate-fade-in-up"
                style={{ padding: "32px 24px", textAlign: "center", animationDelay: `${i * 0.1}s`, opacity: 0 }}
              >
                <div
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 16,
                    background: "rgba(255,107,53,0.15)",
                    border: "1px solid rgba(255,107,53,0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 28,
                    margin: "0 auto 18px",
                  }}
                >
                  {f.icon}
                </div>
                <h3 style={{ fontWeight: 700, fontSize: 17, marginBottom: 10 }}>{f.title}</h3>
                <p style={{ color: "#a0a0b8", fontSize: 14, lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ─────────────────────────────────────────────── */}
      <section style={{ padding: "60px 0" }}>
        <div className="container">
          <div
            style={{
              background: "linear-gradient(135deg, #ff6b35 0%, #e85520 50%, #c44010 100%)",
              borderRadius: 28,
              padding: "60px 40px",
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div style={{ position: "absolute", fontSize: 120, opacity: 0.1, top: -20, left: -20 }}>🍕</div>
            <div style={{ position: "absolute", fontSize: 100, opacity: 0.08, bottom: -20, right: -20 }}>🍔</div>
            <div style={{ position: "relative", zIndex: 1 }}>
              <h2
                style={{
                  fontFamily: "'Poppins',sans-serif",
                  fontWeight: 900,
                  fontSize: "clamp(24px,4vw,42px)",
                  marginBottom: 16,
                }}
              >
                Ready to Order? 🚀
              </h2>
              <p style={{ fontSize: 17, opacity: 0.9, marginBottom: 32, maxWidth: 500, margin: "0 auto 32px" }}>
                Join 50,000+ happy customers. Your first order gets 30% off!
              </p>
              <Link href="/restaurants">
                <button
                  id="cta-order-btn"
                  style={{
                    background: "white",
                    color: "#ff6b35",
                    border: "none",
                    borderRadius: 14,
                    padding: "16px 40px",
                    fontSize: 17,
                    fontWeight: 800,
                    cursor: "pointer",
                    transition: "all 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-3px)";
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 15px 35px rgba(0,0,0,0.3)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
                  }}
                >
                  Order Now →
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
