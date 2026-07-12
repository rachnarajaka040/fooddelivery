"use client";

import Link from "next/link";
import { useState } from "react";
import { restaurants, categories } from "@/lib/data";

function RestaurantCard({ r }: { r: (typeof restaurants)[0] }) {
  const stars = "⭐".repeat(Math.round(r.rating));

  return (
    <Link href={`/restaurants/${r.id}`} style={{ textDecoration: "none" }}>
      <div
        className="card"
        id={`restaurant-${r.id}`}
        style={{
          overflow: "hidden",
          cursor: "pointer",
          opacity: r.isOpen ? 1 : 0.6,
        }}
      >
        {/* Image area */}
        <div
          style={{
            height: 160,
            background: "linear-gradient(135deg, #1a1a2e, #0f3460)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 72,
            position: "relative",
          }}
        >
          {r.image}
          {r.discount && (
            <span
              className="badge badge-primary"
              style={{
                position: "absolute",
                top: 12,
                left: 12,
                background: "#ff6b35",
                color: "white",
                border: "none",
                fontWeight: 700,
              }}
            >
              {r.discount}
            </span>
          )}
          {!r.isOpen && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(0,0,0,0.6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 16,
                fontWeight: 700,
                color: "#a0a0b8",
              }}
            >
              CLOSED
            </div>
          )}
          <span
            style={{
              position: "absolute",
              top: 12,
              right: 12,
              background: "rgba(0,0,0,0.6)",
              borderRadius: 8,
              padding: "4px 8px",
              fontSize: 12,
              color: "white",
            }}
          >
            📍 {r.distance}
          </span>
        </div>

        {/* Content */}
        <div style={{ padding: "16px 20px 20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: "white" }}>{r.name}</h3>
            <div
              style={{
                background: "#22c55e",
                color: "white",
                borderRadius: 8,
                padding: "2px 8px",
                fontSize: 13,
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              ⭐ {r.rating}
            </div>
          </div>

          <p style={{ color: "#a0a0b8", fontSize: 13, marginBottom: 12 }}>{r.cuisine}</p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
            {r.tags.map((tag) => (
              <span key={tag} className="badge badge-primary" style={{ fontSize: 11 }}>
                {tag}
              </span>
            ))}
          </div>

          <div className="divider" style={{ margin: "12px 0" }} />

          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#a0a0b8" }}>
            <span>🕐 {r.deliveryTime}</span>
            <span>{r.deliveryFee === 0 ? "🆓 Free Delivery" : `🛵 ₹${r.deliveryFee}`}</span>
            <span>📋 Min ₹{r.minOrder}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function RestaurantsPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("rating");

  const filtered = restaurants
    .filter((r) => {
      const matchSearch =
        r.name.toLowerCase().includes(search.toLowerCase()) ||
        r.cuisine.toLowerCase().includes(search.toLowerCase());
      return matchSearch;
    })
    .sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "delivery") return parseInt(a.deliveryTime) - parseInt(b.deliveryTime);
      if (sortBy === "fee") return a.deliveryFee - b.deliveryFee;
      return 0;
    });

  return (
    <div style={{ paddingTop: 90, minHeight: "100vh" }}>
      {/* Header */}
      <section
        style={{
          background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
          padding: "50px 0 40px",
          borderBottom: "1px solid rgba(255,107,53,0.1)",
        }}
      >
        <div className="container">
          <h1
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "clamp(28px, 5vw, 42px)",
              fontWeight: 800,
              marginBottom: 8,
            }}
          >
            🍽️ All Restaurants
          </h1>
          <p style={{ color: "#a0a0b8", marginBottom: 28 }}>
            {filtered.length} restaurants available near you
          </p>

          {/* Search + Sort */}
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <input
              id="restaurant-search"
              className="input-field"
              type="text"
              placeholder="🔍 Search restaurants or cuisines..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ maxWidth: 400 }}
            />
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                background: "rgba(26,26,46,0.8)",
                border: "1px solid rgba(255,107,53,0.2)",
                borderRadius: 12,
                padding: "12px 16px",
                color: "white",
                fontSize: 14,
                outline: "none",
                cursor: "pointer",
              }}
            >
              <option value="rating">⭐ Sort by Rating</option>
              <option value="delivery">🕐 Sort by Delivery Time</option>
              <option value="fee">🛵 Sort by Delivery Fee</option>
            </select>
          </div>
        </div>
      </section>

      {/* Category Pills */}
      <section style={{ padding: "24px 0", borderBottom: "1px solid rgba(255,107,53,0.08)" }}>
        <div className="container">
          <div style={{ display: "flex", gap: 12, overflowX: "auto", paddingBottom: 4 }}>
            {categories.map((cat) => (
              <button
                key={cat.id}
                id={`cat-${cat.id}`}
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  background: activeCategory === cat.id ? "#ff6b35" : "rgba(255,107,53,0.1)",
                  border: `1px solid ${activeCategory === cat.id ? "#ff6b35" : "rgba(255,107,53,0.2)"}`,
                  borderRadius: 24,
                  padding: "8px 20px",
                  color: "white",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  transition: "all 0.3s",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <span>{cat.emoji}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Restaurant Grid */}
      <section className="section">
        <div className="container">
          <div className="grid-restaurants">
            {filtered.map((r, i) => (
              <div
                key={r.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${i * 0.08}s`, opacity: 0 }}
              >
                <RestaurantCard r={r} />
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: "80px 0" }}>
              <div style={{ fontSize: 64, marginBottom: 16 }}>🍽️</div>
              <h3 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>No restaurants found</h3>
              <p style={{ color: "#a0a0b8" }}>Try a different search term</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
