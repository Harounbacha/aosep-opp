"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { OPPORTUNITIES, FLAGS } from "@/data/opportunities";
import { UserProfile, loadProfile, loadSaved, toggleSaved, computeMatch, getFit } from "@/lib/matching";

export default function OpportunityDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [saved, setSaved] = useState<number[]>([]);

  const opp = OPPORTUNITIES.find((o) => o.id === Number(id));

  useEffect(() => {
    setProfile(loadProfile());
    setSaved(loadSaved());
  }, []);

  if (!opp) {
    return (
      <div>
        <Navbar />
        <div style={{ textAlign: "center", padding: "5rem", color: "#6B7280" }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", color: "var(--navy)" }}>Opportunity not found</h2>
          <button className="btn btn-primary" style={{ marginTop: "1rem" }} onClick={() => router.push("/home")}>
            Back to Opportunities
          </button>
        </div>
      </div>
    );
  }

  const score = computeMatch(opp, profile);
  const fit = getFit(score);
  const isSaved = saved.includes(opp.id);

  function handleSave() {
    setSaved((prev) => toggleSaved(opp!.id, prev));
  }

  // SVG circle math
  const r = 34;
  const circumference = 2 * Math.PI * r;
  const dashOffset = circumference * (1 - score / 100);

  return (
    <div className="page-enter">
      <Navbar />
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "2rem 1.5rem" }}>
        <button
          onClick={() => router.push("/home")}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            color: "#6B7280",
            fontSize: 14,
            cursor: "pointer",
            background: "none",
            border: "none",
            padding: "6px 0",
            transition: "color .15s",
            marginBottom: "1rem",
          }}
        >
          ← Back to Opportunities
        </button>

        {/* Hero card */}
        <div
          style={{
            background: "var(--navy)",
            borderRadius: 20,
            padding: "2rem",
            color: "#fff",
            marginBottom: "2rem",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              right: -40,
              top: -40,
              width: 160,
              height: 160,
              background: "rgba(255,255,255,0.04)",
              borderRadius: "50%",
            }}
          />
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>{FLAGS[opp.country] || "🌍"}</div>
          <h1
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "1.8rem",
              color: "#fff",
              marginBottom: ".75rem",
            }}
          >
            {opp.title}
          </h1>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center", marginBottom: "1rem" }}>
            {[
              { icon: "🌍", label: opp.country },
              { icon: "⏰", label: opp.deadline },
              { icon: "📚", label: opp.field },
            ].map((m) => (
              <div key={m.label} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 14, color: "rgba(255,255,255,0.7)" }}>
                {m.icon} <strong style={{ color: "#fff" }}>{m.label}</strong>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {opp.tags.map((t) => (
              <span
                key={t}
                style={{
                  background: "rgba(255,255,255,0.15)",
                  color: "#fff",
                  fontSize: 12,
                  padding: "3px 10px",
                  borderRadius: 6,
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Two-column layout */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "1.5rem", alignItems: "start" }}>
          {/* Left column */}
          <div>
            {/* Simplified explanation */}
            <div className="card" style={{ padding: "1.5rem", marginBottom: "1.25rem" }}>
              <h2
                style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: "1.1rem",
                  color: "var(--navy)",
                  marginBottom: "1rem",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                📋 Simplified Explanation
              </h2>
              {opp.simplified.map((s, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: ".75rem" }}>
                  <div
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      marginTop: 1,
                      fontSize: 11,
                      fontWeight: 700,
                      background: i === 0 ? "var(--emerald-light)" : "#FEF3C7",
                      color: i === 0 ? "#065F46" : "#92400E",
                    }}
                  >
                    {i === 0 ? "✓" : "i"}
                  </div>
                  <span style={{ fontSize: 14, lineHeight: 1.6 }}>{s}</span>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="card" style={{ padding: "1.5rem", marginBottom: "1.25rem" }}>
              <h2
                style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: "1.1rem",
                  color: "var(--navy)",
                  marginBottom: "1rem",
                }}
              >
                📖 About This Opportunity
              </h2>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: "#6B7280" }}>{opp.description}</p>
            </div>

            {/* Steps */}
            <div className="card" style={{ padding: "1.5rem" }}>
              <h2
                style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: "1.1rem",
                  color: "var(--navy)",
                  marginBottom: "1rem",
                }}
              >
                🪜 Step-by-Step Application Guide
              </h2>
              {opp.steps.map((s, i) => (
                <div key={i} style={{ display: "flex", gap: 14, marginBottom: "1.1rem", alignItems: "flex-start" }}>
                  <div
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: "50%",
                      background: "var(--navy)",
                      color: "#fff",
                      fontSize: 12,
                      fontWeight: 600,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      marginTop: 1,
                    }}
                  >
                    {i + 1}
                  </div>
                  <div style={{ fontSize: 14, lineHeight: 1.6, color: "var(--text)" }}>{s}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right sidebar */}
          <div>
            {/* Match score */}
            <div className="card" style={{ padding: "1.5rem", marginBottom: "1.25rem", textAlign: "center" }}>
              <p
                style={{
                  fontSize: 12,
                  color: "#6B7280",
                  marginBottom: 12,
                  textTransform: "uppercase",
                  letterSpacing: ".08em",
                }}
              >
                Your Match Score
              </p>
              <div style={{ position: "relative", width: 90, height: 90, margin: "0 auto 1rem" }}>
                <svg viewBox="0 0 80 80" width={90} height={90}>
                  <circle cx={40} cy={40} r={r} fill="none" stroke="var(--cream-dark)" strokeWidth={6} />
                  <circle
                    cx={40}
                    cy={40}
                    r={r}
                    fill="none"
                    stroke={fit.color}
                    strokeWidth={6}
                    strokeDasharray={circumference}
                    strokeDashoffset={dashOffset}
                    strokeLinecap="round"
                    transform="rotate(-90 40 40)"
                  />
                </svg>
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "'DM Serif Display', serif",
                    fontSize: 20,
                    color: "var(--navy)",
                    fontWeight: 700,
                  }}
                >
                  {score}%
                </div>
              </div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "8px 18px",
                  borderRadius: 10,
                  fontWeight: 600,
                  fontSize: 14,
                  background: fit.bgColor,
                  color: fit.textColor,
                }}
              >
                {fit.label}
              </div>
            </div>

            {/* Requirements */}
            <div className="card" style={{ padding: "1.5rem", marginBottom: "1.25rem" }}>
              <h2
                style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: "1.05rem",
                  color: "var(--navy)",
                  marginBottom: "1rem",
                }}
              >
                📋 Key Requirements
              </h2>
              {[
                {
                  ok: !opp.ielts_required,
                  label: opp.ielts_required ? "IELTS required" : "No IELTS required",
                },
                {
                  ok: true,
                  label: opp.goal === "study" ? "Study-focused program" : "Internship / work program",
                },
                { ok: true, label: `${opp.field} field` },
              ].map((req, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: ".75rem" }}>
                  <div
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      fontSize: 11,
                      fontWeight: 700,
                      background: req.ok ? "var(--emerald-light)" : "#FEF3C7",
                      color: req.ok ? "#065F46" : "#92400E",
                    }}
                  >
                    {req.ok ? "✓" : "!"}
                  </div>
                  <span style={{ fontSize: 13 }}>{req.label}</span>
                </div>
              ))}
            </div>

            {/* Apply button */}
            <a
              href={opp.official}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                width: "100%",
                padding: "15px",
                fontSize: 16,
                borderRadius: 12,
                background: "var(--emerald)",
                color: "#fff",
                fontWeight: 600,
                textDecoration: "none",
                transition: "background .18s",
                marginBottom: 10,
              }}
            >
              Apply Now →
            </a>

            <button
              onClick={handleSave}
              className="btn btn-ghost"
              style={{ width: "100%", justifyContent: "center" }}
            >
              {isSaved ? "★ Saved" : "☆ Save for Later"}
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
