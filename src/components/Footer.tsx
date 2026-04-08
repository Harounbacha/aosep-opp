import Link from "next/link";

const COMING_SOON = [
  "Learning Paths",
  "Peer Mentorship",
  "Training Centers",
  "Study Abroad Guide",
  "Portfolio Builder",
  "Global Mobility Support",
];

export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--navy)",
        color: "rgba(255,255,255,0.6)",
        padding: "3rem 1.5rem",
        marginTop: "4rem",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 2fr",
          gap: "3rem",
          paddingBottom: "2rem",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <div>
          <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.3rem", color: "#fff", marginBottom: 8 }}>
            AOSEP
          </div>
          <p style={{ fontSize: 13, lineHeight: 1.7 }}>
            Algerian Open Systems &amp; Education Platform. Democratizing access to global opportunities for Algerian
            students.
          </p>
          <Link
            href="/onboarding"
            style={{
              display: "inline-block",
              marginTop: "1rem",
              padding: "7px 16px",
              borderRadius: 8,
              fontSize: 13,
              background: "transparent",
              color: "rgba(255,255,255,0.6)",
              border: "1px solid rgba(255,255,255,0.15)",
              textDecoration: "none",
            }}
          >
            Get Started →
          </Link>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}>
          <div>
            <div
              style={{
                fontSize: 12,
                letterSpacing: ".1em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.4)",
                marginBottom: ".75rem",
                fontWeight: 600,
              }}
            >
              Platform
            </div>
            {["Opportunities ✓", "Match Engine ✓", "Save & Track ✓"].map((item) => (
              <div key={item} style={{ fontSize: 13, marginBottom: ".5rem" }}>
                {item}
              </div>
            ))}
          </div>

          <div>
            <div
              style={{
                fontSize: 12,
                letterSpacing: ".1em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.4)",
                marginBottom: ".75rem",
                fontWeight: 600,
              }}
            >
              Coming Soon
            </div>
            {COMING_SOON.slice(0, 3).map((item) => (
              <div key={item} style={{ fontSize: 13, marginBottom: ".5rem", display: "flex", alignItems: "center", gap: 6 }}>
                {item}
                <span
                  style={{
                    fontSize: 10,
                    background: "rgba(255,255,255,0.1)",
                    padding: "2px 6px",
                    borderRadius: 4,
                  }}
                >
                  Soon
                </span>
              </div>
            ))}
          </div>

          <div>
            <div
              style={{
                fontSize: 12,
                letterSpacing: ".1em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.4)",
                marginBottom: ".75rem",
                fontWeight: 600,
              }}
            >
              Roadmap
            </div>
            {COMING_SOON.slice(3).map((item) => (
              <div key={item} style={{ fontSize: 13, marginBottom: ".5rem", display: "flex", alignItems: "center", gap: 6 }}>
                {item}
                <span
                  style={{
                    fontSize: 10,
                    background: "rgba(255,255,255,0.1)",
                    padding: "2px 6px",
                    borderRadius: 4,
                  }}
                >
                  Soon
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        style={{
          maxWidth: 1100,
          margin: "1.5rem auto 0",
          fontSize: 12,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "0.5rem",
        }}
      >
        <span>© 2026 AOSEP · University Center Si El-Houes, Barika</span>
        <span>Built by the AOSEP Team</span>
      </div>
    </footer>
  );
}
