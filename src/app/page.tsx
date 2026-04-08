import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const FEATURES = [
  {
    icon: "🎯",
    title: "Guided Opportunities",
    desc: "Discover scholarships, internships, and programs matched to your profile with a simple match score.",
    now: true,
  },
  {
    icon: "🛣️",
    title: "Learning Paths",
    desc: "Structured skill development tracks from beginner to industry-ready — curated for the Algerian context.",
    now: false,
  },
  {
    icon: "🤝",
    title: "Peer Mentorship",
    desc: "Connect with Algerian students who have already walked the path you want to take.",
    now: false,
  },
  {
    icon: "🏛️",
    title: "Training Centers",
    desc: "Physical community hubs across Algeria with guided learning sessions and events.",
    now: false,
  },
  {
    icon: "✈️",
    title: "Study Abroad Guidance",
    desc: "End-to-end support for overseas university applications, visa processes, and scholarships.",
    now: false,
  },
  {
    icon: "📁",
    title: "Portfolio Builder",
    desc: "Build a verifiable professional profile visible to local and global employers.",
    now: false,
  },
];

const STATS = [
  { val: "12+", label: "Opportunities Listed" },
  { val: "12", label: "Countries Covered" },
  { val: "3", label: "Fields Supported" },
  { val: "Free", label: "Always Free to Use" },
];

export default function LandingPage() {
  return (
    <div className="page-enter">
      <Navbar />

      {/* Hero */}
      <section
        style={{
          minHeight: "90vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "4rem 1.5rem",
          position: "relative",
          overflow: "hidden",
        }}
        className="hero-gradient"
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "6px 16px",
            background: "var(--emerald-light)",
            color: "#065F46",
            borderRadius: 20,
            fontSize: 13,
            fontWeight: 500,
            marginBottom: "2rem",
            border: "1px solid rgba(14,159,110,0.2)",
          }}
        >
          🇩🇿 Built for Algerian Students
        </div>

        <h1
          style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: "clamp(2.4rem, 5vw, 4rem)",
            color: "var(--navy)",
            maxWidth: 780,
            marginBottom: "1.25rem",
            lineHeight: 1.15,
          }}
        >
          Find the best{" "}
          <em style={{ fontStyle: "italic", color: "var(--emerald)" }}>global opportunities</em>
          <br />
          for Algerian students
        </h1>

        <p
          style={{
            fontSize: "clamp(1rem, 2vw, 1.15rem)",
            color: "#6B7280",
            maxWidth: 560,
            marginBottom: "2.5rem",
            lineHeight: 1.7,
          }}
        >
          AOSEP matches you with scholarships, internships, and programs worldwide — then guides you step-by-step
          through every application.
        </p>

        <div style={{ display: "flex", gap: 12, alignItems: "center", justifyContent: "center", flexWrap: "wrap" }}>
          <Link
            href="/onboarding"
            className="btn btn-primary"
            style={{ padding: "13px 32px", fontSize: 16, textDecoration: "none" }}
          >
            Get Started →
          </Link>
          <Link href="/home" className="btn btn-ghost" style={{ textDecoration: "none" }}>
            Browse Opportunities
          </Link>
        </div>

        <div style={{ display: "flex", gap: 6, justifyContent: "center", marginTop: "3rem" }}>
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              style={{
                width: i === 0 ? 18 : 6,
                height: 6,
                borderRadius: i === 0 ? 3 : "50%",
                background: i === 0 ? "var(--emerald)" : "var(--border)",
              }}
            />
          ))}
        </div>
      </section>

      {/* Stats strip */}
      <div
        style={{
          background: "var(--navy)",
          padding: "2rem 1.5rem",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "1rem",
          textAlign: "center",
        }}
      >
        {STATS.map((s) => (
          <div key={s.val}>
            <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: "2rem", color: "#fff" }}>{s.val}</div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Features */}
      <section style={{ padding: "5rem 1.5rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <p className="section-label" style={{ marginBottom: "0.75rem" }}>
              What We Do
            </p>
            <h2
              style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
                color: "var(--navy)",
                marginBottom: "1rem",
              }}
            >
              Everything you need to access global opportunities
            </h2>
            <p style={{ color: "#6B7280", maxWidth: 500, margin: "0 auto", fontSize: 15 }}>
              Our first release focuses on what matters most: matching you to the right opportunities and telling you
              exactly how to get them.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1.25rem",
            }}
          >
            {FEATURES.map((f) => (
              <div
                key={f.title}
                style={{
                  background: "#fff",
                  border: "1px solid var(--border)",
                  borderRadius: 16,
                  padding: "1.5rem",
                  boxShadow: "var(--shadow)",
                }}
              >
                {!f.now && (
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      padding: "2px 10px",
                      background: "var(--cream-dark)",
                      borderRadius: 10,
                      fontSize: 11,
                      color: "#6B7280",
                      fontWeight: 500,
                      marginBottom: 8,
                    }}
                  >
                    Coming Soon
                  </div>
                )}
                <div
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: 10,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "1rem",
                    background: f.now ? "var(--emerald-light)" : "var(--cream-dark)",
                    fontSize: 20,
                  }}
                >
                  {f.icon}
                </div>
                <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.15rem", color: "var(--navy)", marginBottom: 6 }}>
                  {f.title}
                </h3>
                <p style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.6 }}>{f.desc}</p>
                {f.now && (
                  <div style={{ marginTop: "1rem" }}>
                    <Link
                      href="/onboarding"
                      className="btn btn-emerald btn-sm"
                      style={{ textDecoration: "none", fontSize: 13 }}
                    >
                      Try Now →
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        style={{
          padding: "4rem 1.5rem",
          background: "var(--navy)",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <h2
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "2rem",
              color: "#fff",
              marginBottom: "1rem",
            }}
          >
            Ready to find your opportunity?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.6)", marginBottom: "2rem", lineHeight: 1.7 }}>
            Tell us about yourself in 2 minutes, and we'll show you the best opportunities available right now for
            Algerian students.
          </p>
          <Link
            href="/onboarding"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "13px 32px",
              background: "var(--emerald)",
              color: "#fff",
              borderRadius: 12,
              fontWeight: 600,
              fontSize: 16,
              textDecoration: "none",
              transition: "background .15s",
            }}
          >
            Get Started — It&apos;s Free →
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
