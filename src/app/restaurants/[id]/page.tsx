"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { restaurants, menuItems } from "@/lib/data";
import { useCart } from "@/context/CartContext";

export default function RestaurantDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addItem, updateQty, state } = useCart();
  const [activeCategory, setActiveCategory] = useState("All");
  const [addedIds, setAddedIds] = useState<Set<string>>(new Set());

  const restaurant = restaurants.find((r) => r.id === params.id);
  const menu = menuItems.filter((m) => m.restaurantId === params.id);
  const categories = ["All", ...Array.from(new Set(menu.map((m) => m.category)))];

  const filtered =
    activeCategory === "All" ? menu : menu.filter((m) => m.category === activeCategory);

  if (!restaurant) {
    return (
      <div style={{ paddingTop: 120, textAlign: "center", minHeight: "100vh" }}>
        <div style={{ fontSize: 64 }}>🍽️</div>
        <h2 style={{ marginTop: 16, fontSize: 24 }}>Restaurant not found</h2>
        <button className="btn-primary" style={{ marginTop: 20 }} onClick={() => router.push("/restaurants")}>
          Browse Restaurants
        </button>
      </div>
    );
  }

  const handleAdd = (item: (typeof menuItems)[0]) => {
    addItem(item);
    setAddedIds((prev) => new Set(prev).add(item.id));
    setTimeout(() => {
      setAddedIds((prev) => {
        const next = new Set(prev);
        next.delete(item.id);
        return next;
      });
    }, 1500);
  };

  const getQty = (id: string) => state.items.find((i) => i.id === id)?.quantity ?? 0;

  return (
    <div style={{ paddingTop: 70, minHeight: "100vh" }}>
      {/* Hero */}
      <div
        style={{
          height: 280,
          background: "linear-gradient(135deg, #1a1a2e 0%, #0f3460 50%, #16213e 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 100,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <span className="animate-float">{restaurant.image}</span>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(15,15,26,0.9) 0%, transparent 60%)",
          }}
        />
        <div style={{ position: "absolute", bottom: 30, left: 0, right: 0 }}>
          <div className="container">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 12 }}>
              <div>
                <h1 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 800, fontSize: "clamp(24px,4vw,36px)" }}>
                  {restaurant.name}
                </h1>
                <p style={{ color: "#a0a0b8", fontSize: 14 }}>{restaurant.cuisine}</p>
              </div>
              <div style={{ display: "flex", gap: 20, fontSize: 14 }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ color: "#22c55e", fontWeight: 700, fontSize: 20 }}>⭐ {restaurant.rating}</div>
                  <div style={{ color: "#a0a0b8", fontSize: 12 }}>{restaurant.reviews} reviews</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ color: "#ff6b35", fontWeight: 700, fontSize: 16 }}>🕐 {restaurant.deliveryTime}</div>
                  <div style={{ color: "#a0a0b8", fontSize: 12 }}>Delivery</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ color: "#f7c59f", fontWeight: 700, fontSize: 16 }}>
                    {restaurant.deliveryFee === 0 ? "FREE" : `₹${restaurant.deliveryFee}`}
                  </div>
                  <div style={{ color: "#a0a0b8", fontSize: 12 }}>Delivery fee</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingTop: 32, paddingBottom: 60, display: "grid", gridTemplateColumns: "1fr 340px", gap: 32 }}>
        {/* Menu */}
        <div>
          {/* Category Tabs */}
          <div style={{ display: "flex", gap: 10, marginBottom: 28, overflowX: "auto" }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  background: activeCategory === cat ? "#ff6b35" : "rgba(255,107,53,0.1)",
                  border: `1px solid ${activeCategory === cat ? "#ff6b35" : "rgba(255,107,53,0.2)"}`,
                  borderRadius: 20,
                  padding: "7px 18px",
                  color: "white",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  transition: "all 0.3s",
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Menu Items */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {filtered.map((item) => {
              const qty = getQty(item.id);
              const justAdded = addedIds.has(item.id);

              return (
                <div
                  key={item.id}
                  id={`menu-${item.id}`}
                  className="card"
                  style={{
                    display: "flex",
                    gap: 16,
                    padding: 16,
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      width: 90,
                      height: 90,
                      borderRadius: 12,
                      background: "linear-gradient(135deg, #1a1a2e, #0f3460)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 44,
                      flexShrink: 0,
                    }}
                  >
                    {item.image}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                      <span style={{ fontSize: 10 }}>{item.isVeg ? "🟢" : "🔴"}</span>
                      <h3 style={{ fontSize: 16, fontWeight: 700 }}>{item.name}</h3>
                      {item.isPopular && (
                        <span className="badge badge-warning" style={{ fontSize: 10 }}>🔥 Popular</span>
                      )}
                    </div>
                    <p style={{ color: "#a0a0b8", fontSize: 13, marginBottom: 8, lineHeight: 1.5 }}>
                      {item.description}
                    </p>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <span style={{ fontSize: 18, fontWeight: 800, color: "#ff6b35" }}>₹{item.price}</span>
                      {item.calories && (
                        <span style={{ color: "#a0a0b8", fontSize: 12 }}>🔥 {item.calories} kcal</span>
                      )}
                    </div>
                  </div>
                  {/* Add button */}
                  {qty === 0 ? (
                    <button
                      onClick={() => handleAdd(item)}
                      className="btn-primary"
                      style={{ padding: "9px 20px", fontSize: 13, flexShrink: 0 }}
                    >
                      {justAdded ? "✓ Added!" : "+ Add"}
                    </button>
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        background: "rgba(255,107,53,0.15)",
                        border: "1px solid rgba(255,107,53,0.3)",
                        borderRadius: 12,
                        padding: "4px 8px",
                        flexShrink: 0,
                      }}
                    >
                      <button
                        onClick={() => updateQty(item.id, qty - 1)}
                        style={{ background: "none", border: "none", color: "#ff6b35", fontSize: 18, cursor: "pointer", fontWeight: 700 }}
                      >
                        −
                      </button>
                      <span style={{ fontWeight: 700, minWidth: 20, textAlign: "center" }}>{qty}</span>
                      <button
                        onClick={() => updateQty(item.id, qty + 1)}
                        style={{ background: "none", border: "none", color: "#ff6b35", fontSize: 18, cursor: "pointer", fontWeight: 700 }}
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Sticky Cart Summary */}
        <div style={{ position: "sticky", top: 90, alignSelf: "flex-start" }}>
          <div className="glass-strong" style={{ borderRadius: 20, padding: 24 }}>
            <h3 style={{ fontWeight: 700, fontSize: 18, marginBottom: 20 }}>🛒 Your Order</h3>
            {state.items.length === 0 ? (
              <div style={{ textAlign: "center", padding: "30px 0", color: "#a0a0b8" }}>
                <div style={{ fontSize: 40, marginBottom: 10 }}>🍽️</div>
                <p>Add items to get started</p>
              </div>
            ) : (
              <>
                <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 20, maxHeight: 300, overflowY: "auto" }}>
                  {state.items.map((item) => (
                    <div key={item.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: 14 }}>{item.name} × {item.quantity}</span>
                      <span style={{ fontWeight: 700, color: "#ff6b35" }}>₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
                <div className="divider" />
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 16, marginBottom: 8 }}>
                  <span style={{ color: "#a0a0b8" }}>Subtotal</span>
                  <span style={{ fontWeight: 700 }}>₹{state.total}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
                  <span style={{ color: "#a0a0b8" }}>Delivery fee</span>
                  <span style={{ fontWeight: 700, color: "#22c55e" }}>
                    {restaurant.deliveryFee === 0 ? "FREE" : `₹${restaurant.deliveryFee}`}
                  </span>
                </div>
                <button
                  id="place-order-btn"
                  className="btn-primary"
                  style={{ width: "100%", padding: "14px", fontSize: 15 }}
                  onClick={() => router.push("/cart")}
                >
                  Proceed to Checkout →
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .container > div[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
