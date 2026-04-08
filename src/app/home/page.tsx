"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OpportunityCard from "@/components/OpportunityCard";
import { OPPORTUNITIES, FIELDS, COUNTRIES } from "@/data/opportunities";
import { UserProfile, loadProfile, loadSaved, toggleSaved, computeMatch } from "@/lib/matching";

interface FilterState {
  field: string;
  country: string;
  goal: string;
  ieltsRequired: boolean | null;
  deadlineRange: string;
  sortBy: string;
}

export default function HomePage() {
  const searchParams = useSearchParams();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [saved, setSaved] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<number[]>([]);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    field: "All Fields",
    country: "All Countries", 
    goal: "all",
    ieltsRequired: null,
    deadlineRange: "all",
    sortBy: "match"
  });
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  useEffect(() => {
    setProfile(loadProfile());
    setSaved(loadSaved());
    
    // Handle search parameters
    const search = searchParams.get('search');
    const results = searchParams.get('results');
    
    if (search && results) {
      setSearchQuery(search);
      try {
        const resultIds = JSON.parse(results);
        setSearchResults(resultIds);
        setIsSearchActive(true);
      } catch (error) {
        console.error('Error parsing search results:', error);
      }
    }
  }, [searchParams]);

  function handleSave(id: number) {
    setSaved((prev) => toggleSaved(id, prev));
  }

  const updateFilter = (key: keyof FilterState, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearAllFilters = () => {
    setFilters({
      field: "All Fields",
      country: "All Countries",
      goal: "all", 
      ieltsRequired: null,
      deadlineRange: "all",
      sortBy: "match"
    });
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.field !== "All Fields") count++;
    if (filters.country !== "All Countries") count++;
    if (filters.goal !== "all") count++;
    if (filters.ieltsRequired !== null) count++;
    if (filters.deadlineRange !== "all") count++;
    return count;
  };

  const allOpps = OPPORTUNITIES.map((o) => ({ ...o, score: computeMatch(o, profile) }));

  // If search is active, filter by search results first
  const searchFilteredOpps = isSearchActive 
    ? allOpps.filter((o) => searchResults.includes(o.id))
    : allOpps;

  const filtered = searchFilteredOpps.filter((o) => {
    // Field filter
    if (filters.field !== "All Fields" && o.field !== filters.field) return false;
    
    // Country filter
    if (filters.country !== "All Countries" && o.country !== filters.country) return false;
    
    // Goal filter
    if (filters.goal !== "all" && o.goal !== filters.goal) return false;
    
    // IELTS filter
    if (filters.ieltsRequired !== null && o.ielts_required !== filters.ieltsRequired) return false;
    
    // Deadline filter
    if (filters.deadlineRange !== "all") {
      const daysUntilDeadline = Math.ceil((new Date(o.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
      if (filters.deadlineRange === "urgent" && daysUntilDeadline > 7) return false;
      if (filters.deadlineRange === "month" && daysUntilDeadline > 30) return false;
      if (filters.deadlineRange === "closed" && daysUntilDeadline > 0) return false;
    }
    
    return true;
  });

  // Sort filtered opportunities
  const sorted = [...filtered].sort((a, b) => {
    switch (filters.sortBy) {
      case "match":
        return b.score - a.score;
      case "deadline":
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      case "title":
        return a.title.localeCompare(b.title);
      default:
        return b.score - a.score;
    }
  });

  const recommended = sorted.filter((o) => o.score >= 70);
  const other = sorted.filter((o) => o.score < 70);

  return (
    <div className="page-enter">
      <Navbar />
      <div className="px-6 py-8 max-w-7xl mx-auto">
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-serif text-3xl text-navy mb-2">
                {isSearchActive ? `Search Results: "${searchQuery}"` : "Your Opportunities"}
              </h1>
              <p className="text-gray-600 text-sm">
                {isSearchActive 
                  ? `Found ${sorted.length} result${sorted.length !== 1 ? 's' : ''} for "${searchQuery}"`
                  : `${profile ? "Matched to your profile" : "Browse all opportunities"} · ${sorted.length} opportunities`
                }
                {getActiveFiltersCount() > 0 && ` · ${getActiveFiltersCount()} filter${getActiveFiltersCount() > 1 ? 's' : ''} applied`}
                {isSearchActive && (
                  <button 
                    onClick={() => window.location.href = '/home'}
                    className="ml-2 text-emerald-600 hover:text-emerald-700 underline text-sm"
                  >
                    Clear search
                  </button>
                )}
              </p>
            </div>
            {profile && (
              <Link 
                href="/dashboard" 
                className="btn btn-outline btn-sm"
              >
                📊 View Dashboard
              </Link>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 items-start">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5 sticky top-20 lg:top-24 shadow-soft mobile-sidebar">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-navy text-sm uppercase tracking-wider">Filters</h3>
                {getActiveFiltersCount() > 0 && (
                  <button
                    onClick={clearAllFilters}
                    className="text-xs text-gray-500 hover:text-red-600 transition-colors"
                  >
                    Clear all
                  </button>
                )}
              </div>

              {/* Field filter */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Field</h4>
                <div className="flex flex-wrap gap-2">
                  {FIELDS.map((f) => (
                    <button
                      key={f}
                      onClick={() => updateFilter('field', f)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                        filters.field === f
                          ? "bg-navy text-white border-navy"
                          : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                      } border`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              {/* Country filter */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Country</h4>
                <div className="flex flex-wrap gap-2">
                  {COUNTRIES.map((c) => (
                    <button
                      key={c}
                      onClick={() => updateFilter('country', c)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                        filters.country === c
                          ? "bg-navy text-white border-navy"
                          : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                      } border`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Goal filter */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Opportunity Type</h4>
                <div className="space-y-2">
                  {[
                    { value: 'all', label: 'All Types' },
                    { value: 'study', label: 'Study Programs' },
                    { value: 'internship', label: 'Internships' }
                  ].map((goal) => (
                    <button
                      key={goal.value}
                      onClick={() => updateFilter('goal', goal.value)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        filters.goal === goal.value
                          ? "bg-navy text-white"
                          : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {goal.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Advanced Filters Toggle */}
              <button
                onClick={() => setIsFilterExpanded(!isFilterExpanded)}
                className="w-full flex items-center justify-between px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm font-medium text-gray-700 transition-colors"
              >
                <span>Advanced Filters</span>
                <svg
                  className={`w-4 h-4 transition-transform ${isFilterExpanded ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Advanced Filters */}
              {isFilterExpanded && (
                <div className="mt-4 space-y-4 animate-slide-up">
                  {/* IELTS Required */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-3">IELTS Required</h4>
                    <div className="space-y-2">
                      {[
                        { value: null, label: 'All' },
                        { value: true, label: 'Required' },
                        { value: false, label: 'Not Required' }
                      ].map((ielts) => (
                        <button
                          key={ielts.value?.toString() || 'all'}
                          onClick={() => updateFilter('ieltsRequired', ielts.value)}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                            filters.ieltsRequired === ielts.value
                              ? "bg-navy text-white"
                              : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                          }`}
                        >
                          {ielts.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Deadline Range */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Deadline</h4>
                    <div className="space-y-2">
                      {[
                        { value: 'all', label: 'All Deadlines' },
                        { value: 'urgent', label: 'Urgent (within 7 days)' },
                        { value: 'month', label: 'This Month' }
                      ].map((deadline) => (
                        <button
                          key={deadline.value}
                          onClick={() => updateFilter('deadlineRange', deadline.value)}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                            filters.deadlineRange === deadline.value
                              ? "bg-navy text-white"
                              : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                          }`}
                        >
                          {deadline.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Sort By */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Sort By</h4>
                    <div className="space-y-2">
                      {[
                        { value: 'match', label: 'Best Match' },
                        { value: 'deadline', label: 'Deadline' },
                        { value: 'title', label: 'Title A-Z' }
                      ].map((sort) => (
                        <button
                          key={sort.value}
                          onClick={() => updateFilter('sortBy', sort.value)}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                            filters.sortBy === sort.value
                              ? "bg-navy text-white"
                              : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                          }`}
                        >
                          {sort.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <hr className="my-4 border-gray-200" />

              {/* Coming soon panel */}
              <div style={{ background: "var(--navy)", borderRadius: 12, padding: "1rem", color: "#fff" }}>
                <div
                  style={{
                    fontSize: 12,
                    color: "rgba(255,255,255,0.5)",
                    marginBottom: 6,
                    textTransform: "uppercase",
                    letterSpacing: ".08em",
                  }}
                >
                  Coming Soon
                </div>
                {["🛣️ Learning paths", "🤝 Peer mentorship", "✈️ Study abroad guide", "📁 Portfolio builder"].map(
                  (item) => (
                    <div key={item} style={{ fontSize: 13, marginBottom: 4, color: "rgba(255,255,255,0.7)" }}>
                      {item}
                    </div>
                  )
                )}
              </div>

              {!profile && (
                <div
                  style={{
                    marginTop: "1rem",
                    background: "var(--emerald-light)",
                    borderRadius: 12,
                    padding: "1rem",
                    fontSize: 13,
                    color: "#065F46",
                    lineHeight: 1.6,
                  }}
                >
                  <strong>Tip:</strong>{" "}
                  <Link href="/onboarding" style={{ color: "#065F46", fontWeight: 600 }}>
                    Set up your profile
                  </Link>{" "}
                  to get personalized match scores.
                </div>
              )}
            </div>
          </aside>

          {/* Mobile Filter Toggle */}
          <div className="lg:hidden mb-4">
            <button
              onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
              className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-xl shadow-soft"
            >
              <span className="text-sm font-medium text-gray-700">
                Filters {getActiveFiltersCount() > 0 && `(${getActiveFiltersCount()})`}
              </span>
              <svg 
                className={`w-5 h-5 transition-transform ${isMobileFilterOpen ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          {/* Main content */}
          <main className="lg:col-span-3">
            {recommended.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="section-label mb-2">Top Picks</p>
                    <h2 className="font-serif text-2xl text-navy">
                      Recommended for You
                    </h2>
                  </div>
                  <span className="badge badge-emerald">{recommended.length} matches</span>
                </div>
                <div className="grid gap-4">
                  {recommended.map((o) => (
                    <OpportunityCard key={o.id} opp={o} profile={profile} saved={saved} onSave={handleSave} />
                  ))}
                </div>
              </div>
            )}

            {other.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-serif text-xl text-navy">
                    Other Opportunities
                  </h2>
                  <span className="badge badge-gray">{other.length} listed</span>
                </div>
                <div className="grid gap-4">
                  {other.map((o) => (
                    <OpportunityCard key={o.id} opp={o} profile={profile} saved={saved} onSave={handleSave} />
                  ))}
                </div>
              </div>
            )}

            {sorted.length === 0 && (
              <div className="text-center py-16 text-gray-500">
                <div className="text-6xl mb-4">??</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No opportunities found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your filters or search terms</p>
                <button onClick={clearAllFilters} className="btn btn-outline">
                  Clear Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
      
      {/* Mobile Filter Overlay */}
      {isMobileFilterOpen && (
        <>
          <div 
            className="overlay open"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="mobile-filters open">
            <div className="bg-white rounded-t-2xl p-4 max-h-[70vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-navy text-lg">Filters</h3>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-2 text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* Mobile Filter Content */}
              <div className="space-y-6">
                {/* Field filter */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Field</h4>
                  <div className="flex flex-wrap gap-2">
                    {FIELDS.map((f) => (
                      <button
                        key={f}
                        onClick={() => updateFilter('field', f)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                          filters.field === f
                            ? "bg-navy text-white border-navy"
                            : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                        } border`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Country filter */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Country</h4>
                  <div className="flex flex-wrap gap-2">
                    {COUNTRIES.map((c) => (
                      <button
                        key={c}
                        onClick={() => updateFilter('country', c)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                          filters.country === c
                            ? "bg-navy text-white border-navy"
                            : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                        } border`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Goal filter */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Opportunity Type</h4>
                  <div className="space-y-2">
                    {[
                      { value: 'all', label: 'All Types' },
                      { value: 'study', label: 'Study Programs' },
                      { value: 'internship', label: 'Internships' }
                    ].map((goal) => (
                      <button
                        key={goal.value}
                        onClick={() => updateFilter('goal', goal.value)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                          filters.goal === goal.value
                            ? "bg-navy text-white"
                            : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        {goal.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Clear and Apply buttons */}
                <div className="flex gap-3 pt-4 border-t border-gray-200">
                  <button
                    onClick={clearAllFilters}
                    className="flex-1 btn btn-outline"
                  >
                    Clear All
                  </button>
                  <button
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="flex-1 btn btn-primary"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      
      <Footer />
    </div>
  );
}
