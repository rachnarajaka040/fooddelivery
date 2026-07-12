export default function Footer() {
  return (
    <footer
      style={{
        background: "linear-gradient(180deg, #0f0f1a 0%, #060610 100%)",
        borderTop: "1px solid rgba(255,107,53,0.15)",
        padding: "60px 0 30px",
        marginTop: 80,
      }}
    >
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 40,
            marginBottom: 50,
          }}
        >
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <span style={{ fontSize: 28 }}>🍔</span>
              <span
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 800,
                  fontSize: 22,
                  background: "linear-gradient(135deg, #ff6b35, #f7c59f)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                FoodRush
              </span>
            </div>
            <p style={{ color: "#a0a0b8", fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>
              Delivering happiness to your doorstep. Order from the best restaurants near you.
            </p>
            <div style={{ display: "flex", gap: 12 }}>
              {["📱", "🐦", "📸", "💼"].map((icon, i) => (
                <button
                  key={i}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 8,
                    background: "rgba(255,107,53,0.1)",
                    border: "1px solid rgba(255,107,53,0.2)",
                    fontSize: 16,
                    cursor: "pointer",
                    transition: "all 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,107,53,0.3)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,107,53,0.1)";
                  }}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Links */}
          {[
            {
              title: "Company",
              links: ["About Us", "Careers", "Press", "Blog"],
            },
            {
              title: "For Partners",
              links: ["List Your Restaurant", "Delivery Partner", "Advertise", "API"],
            },
            {
              title: "Support",
              links: ["Help Center", "Safety", "Terms", "Privacy Policy"],
            },
          ].map((col) => (
            <div key={col.title}>
              <h4 style={{ color: "white", fontWeight: 700, marginBottom: 20, fontSize: 15 }}>
                {col.title}
              </h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      style={{
                        color: "#a0a0b8",
                        textDecoration: "none",
                        fontSize: 14,
                        transition: "color 0.3s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#ff6b35")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "#a0a0b8")}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="divider" />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 16,
            paddingTop: 20,
          }}
        >
          <p style={{ color: "#a0a0b8", fontSize: 13 }}>
            © 2024 FoodRush. All rights reserved.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ color: "#a0a0b8", fontSize: 13 }}>Built with</span>
            <span style={{ color: "#ff6b35" }}>❤️</span>
            <span style={{ color: "#a0a0b8", fontSize: 13 }}>using Next.js + Jenkins CI/CD</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
