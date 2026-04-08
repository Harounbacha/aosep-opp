// src/lib/matching.ts

import { Opportunity } from "@/data/opportunities";

export interface UserProfile {
  field: string;
  level: string;
  english: string;
  ielts: "yes" | "no";
  goal: "study" | "internship";
}

export function computeMatch(opp: Opportunity, profile: UserProfile | null): number {
  if (!profile) return 70;
  let score = 0;
  if (opp.field === profile.field) score += 40;
  const userHasIelts = profile.ielts === "yes";
  if (!opp.ielts_required || userHasIelts) score += 30;
  if (opp.goal === profile.goal) score += 30;
  return Math.min(score, 100);
}

export function getFit(score: number): {
  label: string;
  color: string;
  bgColor: string;
  textColor: string;
} {
  if (score >= 70) return { label: "Good Match", color: "#0E9F6E", bgColor: "#E6F7F1", textColor: "#065F46" };
  if (score >= 40) return { label: "Possible", color: "#F59E0B", bgColor: "#FEF3C7", textColor: "#92400E" };
  return { label: "Hard Match", color: "#EF4444", bgColor: "#FEE2E2", textColor: "#991B1B" };
}

export function loadProfile(): UserProfile | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem("aosep_profile");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveProfile(profile: UserProfile): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("aosep_profile", JSON.stringify(profile));
}

export function loadSaved(): number[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem("aosep_saved");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function toggleSaved(id: number, current: number[]): number[] {
  const next = current.includes(id) ? current.filter((x) => x !== id) : [...current, id];
  if (typeof window !== "undefined") {
    localStorage.setItem("aosep_saved", JSON.stringify(next));
  }
  return next;
}
