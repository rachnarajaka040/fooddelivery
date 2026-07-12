"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

const ORDER_STEPS = [
  { id: 1, icon: "✅", label: "Order Confirmed", desc: "Your order has been placed successfully", time: "12:30 PM" },
  { id: 2, icon: "👨‍🍳", label: "Preparing", desc: "Restaurant is preparing your delicious food", time: "12:33 PM" },
  { id: 3, icon: "🛵", label: "Out for Delivery", desc: "Your order is on the way", time: "12:48 PM" },
  { id: 4, icon: "🏠", label: "Delivered", desc: "Enjoy your meal!", time: "1:05 PM" },
];

export default function TrackPage() {
  const { state, clearCart } = useCart();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [ordered, setOrdered] = useState(false);

  useEffect(() => {
    if (ordered) {
      const intervals = [1000, 4000, 8000, 14000];
      intervals.forEach((delay, index) => {
        setTimeout(() => setCurrentStep(index + 1), delay);
      });
    }
  }, [ordered]);

  const handlePlaceOrder = () => {
    setOrdered(true);
    clearCart();
  };

  if (!ordered) {
    return (
      <div style={{ paddingTop: 90, minHeight: "100vh", paddingBottom: 60 }}>
        <div
          style={{
            background: "linear-gradient(135deg, #1a1a2e, #16213e)",
            padding: "50px 0 40px",
            borderBottom: "1px solid rgba(255,107,53,0.1)",
            marginBottom: 50,
          }}
        >
          <div className="container">
            <h1 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 800, fontSize: "clamp(24px,4vw,36px)" }}>
              🛵 Track Your Order
            </h1>
          </div>
        </div>

        <div className="container" style={{ maxWidth: 600 }}>
          <div
            className="glass-strong"
            style={{ borderRadius: 24, padding: 40, textAlign: "center" }}
          >
            <div style={{ fontSize: 80, marginBottom: 20 }} className="animate-float">🍔</div>
            <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 12 }}>Ready to place your order?</h2>
            <p style={{ color: "#a0a0b8", marginBottom: 32, lineHeight: 1.7 }}>
              Click the button below to simulate placing an order and watch the real-time tracking in action!
            </p>
            <button
              id="simulate-order-btn"
              className="btn-primary animate-pulse-glow"
              style={{ padding: "16px 40px", fontSize: 16, marginBottom: 16 }}
              onClick={handlePlaceOrder}
            >
              🚀 Place Demo Order
            </button>
            <br />
            <button
              onClick={() => router.push("/restaurants")}
              style={{ background: "none", border: "none", color: "#a0a0b8", cursor: "pointer", fontSize: 14 }}
            >
              ← Add items from restaurants first
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: 90, minHeight: "100vh", paddingBottom: 60 }}>
      {/* Header */}
      <div
        style={{
          background: "linear-gradient(135deg, #1a1a2e, #16213e)",
          padding: "50px 0 40px",
          borderBottom: "1px solid rgba(255,107,53,0.1)",
          marginBottom: 50,
        }}
      >
        <div className="container">
          <h1 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 800, fontSize: "clamp(24px,4vw,36px)" }}>
            🛵 Tracking Your Order
          </h1>
          <p style={{ color: "#a0a0b8", marginTop: 8 }}>Order #FD{Math.floor(Math.random() * 90000 + 10000)}</p>
        </div>
      </div>

      <div className="container" style={{ maxWidth: 700 }}>
        {/* Map Placeholder */}
        <div
          style={{
            height: 200,
            background: "linear-gradient(135deg, #1a1a2e 0%, #0f3460 50%, #16213e 100%)",
            borderRadius: 20,
            marginBottom: 32,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid rgba(255,107,53,0.15)",
            position: "relative",
            overflow: "hidden",
            fontSize: 14,
            color: "#a0a0b8",
          }}
        >
          <div style={{ position: "absolute", inset: 0 }}>
            {/* Animated dots representing a map */}
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  width: 4,
                  height: 4,
                  borderRadius: "50%",
                  background: "rgba(255,107,53,0.3)",
                  left: `${(i * 37 + 10) % 90}%`,
                  top: `${(i * 53 + 15) % 80}%`,
                }}
              />
            ))}
          </div>

          {/* Animated delivery icon */}
          <div
            style={{
              position: "absolute",
              fontSize: 32,
              left: `${Math.min(currentStep * 22 + 5, 80)}%`,
              top: "40%",
              transition: "left 2s ease",
            }}
          >
            🛵
          </div>

          <div style={{ position: "absolute", bottom: 12, left: "50%", transform: "translateX(-50%)", fontSize: 12 }}>
            📍 Live tracking map
          </div>
        </div>

        {/* Steps */}
        <div
          className="glass-strong"
          style={{ borderRadius: 20, padding: "32px 28px", marginBottom: 28 }}
        >
          <h3 style={{ fontWeight: 700, fontSize: 18, marginBottom: 28 }}>Order Progress</h3>

          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {ORDER_STEPS.map((step, idx) => {
              const isDone = currentStep > idx;
              const isActive = currentStep === idx + 1;

              return (
                <div key={step.id} style={{ display: "flex", gap: 16, position: "relative" }}>
                  {/* Line */}
                  {idx < ORDER_STEPS.length - 1 && (
                    <div
                      style={{
                        position: "absolute",
                        left: 20,
                        top: 44,
                        width: 2,
                        height: 56,
                        background: isDone
                          ? "linear-gradient(180deg, #ff6b35, #ff6b35)"
                          : "rgba(255,107,53,0.15)",
                        transition: "background 0.5s ease",
                        zIndex: 0,
                      }}
                    />
                  )}

                  {/* Icon */}
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      background: isDone
                        ? "#ff6b35"
                        : isActive
                        ? "rgba(255,107,53,0.3)"
                        : "rgba(255,255,255,0.05)",
                      border: `2px solid ${isDone || isActive ? "#ff6b35" : "rgba(255,255,255,0.1)"}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 18,
                      flexShrink: 0,
                      zIndex: 1,
                      transition: "all 0.5s ease",
                      boxShadow: isActive ? "0 0 20px rgba(255,107,53,0.5)" : "none",
                    }}
                    className={isActive ? "animate-pulse-glow" : ""}
                  >
                    {isDone ? "✓" : step.icon}
                  </div>

                  {/* Content */}
                  <div style={{ paddingBottom: 36, flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <h4
                        style={{
                          fontSize: 16,
                          fontWeight: 700,
                          color: isDone || isActive ? "white" : "#a0a0b8",
                          transition: "color 0.3s",
                        }}
                      >
                        {step.label}
                      </h4>
                      {isDone && (
                        <span style={{ color: "#a0a0b8", fontSize: 12 }}>{step.time}</span>
                      )}
                    </div>
                    <p
                      style={{
                        color: isDone || isActive ? "#a0a0b8" : "rgba(100,100,120,0.7)",
                        fontSize: 13,
                        marginTop: 4,
                        lineHeight: 1.5,
                        transition: "color 0.3s",
                      }}
                    >
                      {step.desc}
                    </p>
                    {isActive && (
                      <div
                        className="animate-fade-in"
                        style={{
                          marginTop: 8,
                          display: "flex",
                          gap: 4,
                        }}
                      >
                        {[0, 1, 2].map((i) => (
                          <div
                            key={i}
                            style={{
                              width: 6,
                              height: 6,
                              borderRadius: "50%",
                              background: "#ff6b35",
                              animation: `pulse-glow 1s ease-in-out ${i * 0.3}s infinite`,
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ETA card */}
        {currentStep < 4 && (
          <div
            style={{
              background: "linear-gradient(135deg, rgba(255,107,53,0.15), rgba(247,197,159,0.1))",
              border: "1px solid rgba(255,107,53,0.3)",
              borderRadius: 16,
              padding: "20px 24px",
              display: "flex",
              alignItems: "center",
              gap: 16,
            }}
          >
            <div style={{ fontSize: 40 }}>🕐</div>
            <div>
              <p style={{ color: "#a0a0b8", fontSize: 13 }}>Estimated delivery</p>
              <p style={{ fontSize: 22, fontWeight: 800, color: "#ff6b35" }}>30–45 minutes</p>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div
            className="animate-bounce-in"
            style={{
              background: "linear-gradient(135deg, rgba(34,197,94,0.15), rgba(34,197,94,0.05))",
              border: "1px solid rgba(34,197,94,0.3)",
              borderRadius: 20,
              padding: "32px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 60, marginBottom: 12 }}>🎉</div>
            <h3 style={{ fontSize: 22, fontWeight: 800, color: "#22c55e", marginBottom: 8 }}>
              Order Delivered!
            </h3>
            <p style={{ color: "#a0a0b8", marginBottom: 24 }}>Enjoy your meal! Rate your experience:</p>
            <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 24 }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star} style={{ fontSize: 32, cursor: "pointer" }}>⭐</span>
              ))}
            </div>
            <button
              id="order-again-btn"
              className="btn-primary"
              onClick={() => router.push("/restaurants")}
            >
              Order Again 🍔
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
