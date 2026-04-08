"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OpportunityCard from "@/components/OpportunityCard";
import { OPPORTUNITIES } from "@/data/opportunities";
import { UserProfile, loadProfile, loadSaved, toggleSaved } from "@/lib/matching";

export default function SavedPage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [saved, setSaved] = useState<number[]>([]);

  useEffect(() => {
    setProfile(loadProfile());
    setSaved(loadSaved());
  }, []);

  function handleSave(id: number) {
    setSaved((prev) => toggleSaved(id, prev));
  }

  const savedOpps = OPPORTUNITIES.filter((o) => saved.includes(o.id));

  return (
    <div className="page-enter">
      <Navbar />
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "2rem 1.5rem" }}>
        <div style={{ marginBottom: "1.5rem" }}>
          <h1
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "1.8rem",
              color: "var(--navy)",
              marginBottom: ".25rem",
            }}
          >
            Saved Opportunities
          </h1>
          <p style={{ color: "#6B7280", fontSize: 14 }}>{savedOpps.length} saved</p>
        </div>

        {savedOpps.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "5rem 2rem",
              maxWidth: 400,
              margin: "0 auto",
            }}
          >
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🔖</div>
            <h3
              style={{
                fontFamily: "'DM Serif Display', serif",
                color: "var(--navy)",
                marginBottom: ".5rem",
                fontSize: "1.3rem",
              }}
            >
              No saved opportunities yet
            </h3>
            <p style={{ color: "#6B7280", fontSize: 14, marginBottom: "1.5rem" }}>
              Browse opportunities and click the ☆ star to save them here for later.
            </p>
            <Link
              href="/home"
              className="btn btn-primary"
              style={{ textDecoration: "none" }}
            >
              Browse Opportunities →
            </Link>
          </div>
        ) : (
          <div style={{ display: "grid", gap: "1rem", maxWidth: 760 }}>
            {savedOpps.map((o) => (
              <OpportunityCard key={o.id} opp={o} profile={profile} saved={saved} onSave={handleSave} />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
