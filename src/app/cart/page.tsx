"use client";

import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { state, updateQty, removeItem, clearCart } = useCart();
  const router = useRouter();

  const deliveryFee = state.total > 0 ? 29 : 0;
  const tax = Math.round(state.total * 0.05);
  const grandTotal = state.total + deliveryFee + tax;

  return (
    <div style={{ paddingTop: 90, minHeight: "100vh", paddingBottom: 60 }}>
      {/* Header */}
      <div
        style={{
          background: "linear-gradient(135deg, #1a1a2e, #16213e)",
          padding: "40px 0 30px",
          borderBottom: "1px solid rgba(255,107,53,0.1)",
          marginBottom: 40,
        }}
      >
        <div className="container">
          <h1 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 800, fontSize: "clamp(24px,4vw,36px)" }}>
            🛒 Your Cart
          </h1>
          <p style={{ color: "#a0a0b8", marginTop: 6 }}>
            {state.itemCount} item{state.itemCount !== 1 ? "s" : ""} in your cart
          </p>
        </div>
      </div>

      <div
        className="container"
        style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 32, alignItems: "flex-start" }}
      >
        {/* Cart Items */}
        <div>
          {state.items.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "80px 40px",
                background: "linear-gradient(135deg, #1a1a2e, #16213e)",
                borderRadius: 20,
                border: "1px solid rgba(255,107,53,0.1)",
              }}
            >
              <div style={{ fontSize: 80, marginBottom: 20 }}>🛒</div>
              <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 12 }}>Your cart is empty</h2>
              <p style={{ color: "#a0a0b8", marginBottom: 28 }}>
                Looks like you haven&apos;t added anything yet
              </p>
              <button
                id="browse-restaurants-btn"
                className="btn-primary"
                onClick={() => router.push("/restaurants")}
              >  

              
                Browse Restaurants
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {state.items.map((item) => (
                <div
                  key={item.id}
                  id={`cart-item-${item.id}`}
                  className="card"
                  style={{ display: "flex", alignItems: "center", gap: 16, padding: "16px 20px" }}
                >
                  <div
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: 12,
                      background: "linear-gradient(135deg, #1a1a2e, #0f3460)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 40,
                      flexShrink: 0,
                    }}
                  >
                    {item.image}
                  </div>

                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>{item.name}</h3>
                    <p style={{ color: "#a0a0b8", fontSize: 13 }}>{item.description.slice(0, 60)}...</p>
                  </div>

                  {/* Quantity Controls */}
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <button
                      onClick={() => updateQty(item.id, item.quantity - 1)}
                      style={{
                        width: 32, height: 32, borderRadius: 8,
                        background: "rgba(255,107,53,0.15)",
                        border: "1px solid rgba(255,107,53,0.3)",
                        color: "#ff6b35", fontSize: 18, cursor: "pointer", fontWeight: 700,
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}
                    >
                      −
                    </button>
                    <span style={{ fontWeight: 700, fontSize: 16, minWidth: 24, textAlign: "center" }}>
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQty(item.id, item.quantity + 1)}
                      style={{
                        width: 32, height: 32, borderRadius: 8,
                        background: "#ff6b35",
                        border: "none",
                        color: "white", fontSize: 18, cursor: "pointer", fontWeight: 700,
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}
                    >
                      +
                    </button>
                  </div>

                  <div style={{ textAlign: "right", flexShrink: 0, minWidth: 80 }}>
                    <div style={{ fontSize: 18, fontWeight: 800, color: "#ff6b35" }}>
                      ₹{item.price * item.quantity}
                    </div>
                    <div style={{ color: "#a0a0b8", fontSize: 12 }}>₹{item.price} each</div>
                  </div>

                  <button
                    onClick={() => removeItem(item.id)}
                    style={{
                      background: "rgba(239,68,68,0.1)",
                      border: "1px solid rgba(239,68,68,0.3)",
                      borderRadius: 8, padding: "6px 10px",
                      color: "#ef4444", cursor: "pointer", fontSize: 13,
                    }}
                  >
                    🗑️
                  </button>
                </div>
              ))}

              <button
                onClick={clearCart}
                style={{
                  background: "none", border: "1px solid rgba(239,68,68,0.3)",
                  borderRadius: 12, padding: "10px", color: "#ef4444",
                  cursor: "pointer", fontSize: 14, fontWeight: 600,
                }}
              >
                🗑️ Clear Cart
              </button>
            </div>
          )}
        </div>

        {/* Order Summary */}
        {state.items.length > 0 && (
          <div className="glass-strong" style={{ borderRadius: 20, padding: 28, position: "sticky", top: 90 }}>
            <h3 style={{ fontWeight: 700, fontSize: 20, marginBottom: 24 }}>Order Summary</h3>

            {/* Coupon */}
            <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
              <input
                id="coupon-input"
                className="input-field"
                placeholder="Enter coupon code"
                style={{ flex: 1 }}
              />
              <button className="btn-outline" style={{ padding: "12px 14px", fontSize: 13 }}>Apply</button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 20 }}>
              {[
                { label: "Subtotal", value: `₹${state.total}` },
                { label: "Delivery fee", value: deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`, color: deliveryFee === 0 ? "#22c55e" : undefined },
                { label: "Taxes (5%)", value: `₹${tax}` },
              ].map(({ label, value, color }) => (
                <div key={label} style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "#a0a0b8", fontSize: 15 }}>{label}</span>
                  <span style={{ fontWeight: 600, color: color || "white" }}>{value}</span>
                </div>
              ))}
            </div>

            <div className="divider" />

            <div style={{ display: "flex", justifyContent: "space-between", padding: "16px 0 24px", fontSize: 18 }}>
              <span style={{ fontWeight: 700 }}>Total</span>
              <span style={{ fontWeight: 800, color: "#ff6b35", fontSize: 22 }}>₹{grandTotal}</span>
            </div>

            {/* Delivery info */}
            <div
              style={{
                background: "rgba(34,197,94,0.1)",
                border: "1px solid rgba(34,197,94,0.2)",
                borderRadius: 12,
                padding: "12px 16px",
                marginBottom: 20,
                fontSize: 13,
                color: "#22c55e",
              }}
            >
              🕐 Estimated delivery: <strong>30-45 mins</strong>
            </div>

            <button
              id="checkout-btn"
              className="btn-primary animate-pulse-glow"
              style={{ width: "100%", padding: "16px", fontSize: 16 }}
              onClick={() => router.push("/track")}
            >
              Place Order 🚀
            </button>

            <div style={{ textAlign: "center", marginTop: 16, color: "#a0a0b8", fontSize: 12 }}>
              🔒 Secure payment · SSL encrypted
            </div>
          </div>
        )}
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
