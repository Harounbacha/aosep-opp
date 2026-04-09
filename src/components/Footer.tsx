"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  const comingSoon = [
    t.landing.features.learningPaths.title,
    t.landing.features.peerMentorship.title,
    t.landing.features.trainingCenters.title,
    t.landing.features.studyAbroad.title,
    t.landing.features.portfolioBuilder.title,
    "Global Mobility Support",
  ];
  return (
    <footer
      style={{
        background: "var(--navy)",
        color: "rgba(255,255,255,0.6)",
        padding: "2rem 1.5rem",
        marginTop: "4rem",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "2rem",
          paddingBottom: "2rem",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}
        className="md:grid-cols-[1fr_2fr] md:gap-[3rem]"
      >
        <div>
          <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.3rem", color: "#fff", marginBottom: 8 }}>
            AOSEP
          </div>
          <p style={{ fontSize: 13, lineHeight: 1.7 }}>
            {t.footer.description}
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
            {t.footer.getStarted} →
          </Link>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1.5rem" }} className="md:grid-cols-3">
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
              {t.footer.platform}
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
              {t.footer.comingSoon}
            </div>
            {comingSoon.slice(0, 3).map((item: string) => (
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
              {t.footer.roadmap}
            </div>
            {comingSoon.slice(3).map((item: string) => (
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
        <span>© {t.footer.copyright}</span>
        <span>{t.footer.builtBy}</span>
      </div>
    </footer>
  );
}
