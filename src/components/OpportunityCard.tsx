"use client";

import Link from "next/link";
import { useState } from "react";
import { Opportunity, FLAGS } from "@/data/opportunities";
import { UserProfile, computeMatch, getFit } from "@/lib/matching";

interface Props {
  opp: Opportunity;
  profile: UserProfile | null;
  saved: number[];
  onSave: (id: number) => void;
}

export default function OpportunityCard({ opp, profile, saved, onSave }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const score = computeMatch(opp, profile);
  const fit = getFit(score);
  const isSaved = saved.includes(opp.id);
  const daysUntilDeadline = Math.ceil((new Date(opp.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  const isUrgent = daysUntilDeadline <= 7;

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onSave(opp.id);
  };

  const getDeadlineColor = () => {
    if (daysUntilDeadline <= 3) return "text-red-600 bg-red-50";
    if (daysUntilDeadline <= 7) return "text-amber-600 bg-amber-50";
    return "text-gray-600 bg-gray-50";
  };

  const getDeadlineIcon = () => {
    if (daysUntilDeadline <= 3) return "⏰";
    if (daysUntilDeadline <= 7) return "⚠️";
    return "📅";
  };

  return (
    <div className="card card-interactive group mobile-card-touch">
      <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            {/* Company/Organization Info */}
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-lg">{FLAGS[opp.country] ?? "??"}</span>
              </div>
              <div className="min-w-0">
                <div className="text-sm font-medium text-gray-900 truncate">
                  {opp.field} Opportunity
                </div>
                <div className="text-xs text-gray-500">
                  {opp.field} · {opp.goal === "study" ? "Study" : "Internship"}
                </div>
              </div>
            </div>

            {/* Title and Badges */}
            <div className="space-y-2">
              <div className="flex items-start gap-2 flex-wrap">
                <Link
                  href={`/opportunity/${opp.id}`}
                  className="font-serif text-lg font-semibold text-navy hover:text-emerald transition-colors line-clamp-2 flex-1"
                >
                  {opp.title}
                </Link>
                {isUrgent && (
                  <span className="badge badge-error text-xs px-2 py-1">
                    Urgent
                  </span>
                )}
              </div>
              
              {/* Match Score and Location */}
              <div className="flex items-center gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-12 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500 ease-out"
                      style={{ 
                        width: `${score}%`,
                        backgroundColor: fit.color 
                      }}
                    />
                  </div>
                  <span className="font-medium" style={{ color: fit.color }}>
                    {score}% match
                  </span>
                </div>
                <span className="text-gray-400">·</span>
                <span className="text-gray-600 flex items-center gap-1">
                  <span>{FLAGS[opp.country] ?? "??"}</span>
                  {opp.country}
                </span>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            className={`p-2 sm:p-2 rounded-lg transition-all duration-200 hover:scale-105 touch-manipulation ${
              isSaved 
                ? "bg-amber-100 text-amber-600 hover:bg-amber-200" 
                : "bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600"
            }`}
            title={isSaved ? "Remove from saved" : "Save opportunity"}
          >
            <svg className="w-5 h-5" fill={isSaved ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          </button>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {opp.tags.slice(0, isExpanded ? opp.tags.length : 3).map((tag) => (
            <span key={tag} className="tag-pill text-xs">
              {tag}
            </span>
          ))}
          {opp.tags.length > 3 && !isExpanded && (
            <button
              onClick={() => setIsExpanded(true)}
              className="text-xs text-emerald-600 hover:text-emerald-700 font-medium"
            >
              +{opp.tags.length - 3} more
            </button>
          )}
        </div>

        {/* Description Preview */}
        <div className="text-sm text-gray-600 leading-relaxed line-clamp-2">
          {opp.description || "Discover this amazing opportunity that matches your profile and career goals."}
        </div>

        {/* Footer with Actions and Deadline */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-4">
            {/* Deadline */}
            <div className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium ${getDeadlineColor()}`}>
              <span>{getDeadlineIcon()}</span>
              <span>
                {daysUntilDeadline <= 0 ? "Closed" : 
                 daysUntilDeadline === 1 ? "Tomorrow" : 
                 `${daysUntilDeadline} days left`}
              </span>
            </div>

            {/* Opportunity Type */}
            <span className="text-xs text-gray-500 px-2 py-1 bg-gray-50 rounded-md">
              {opp.goal === "study" ? "Study Program" : "Internship"}
            </span>
          </div>

          {/* Primary actions */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsExpanded((v) => !v)}
              className="px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {isExpanded ? "Less details" : "More details"}
            </button>
            <a
              href={opp.official}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary btn-sm"
            >
              Apply Now
            </a>
          </div>
        </div>

        {/* Expanded Content */}
        {isExpanded && (
          <div className="pt-4 border-t border-gray-100 space-y-3 animate-slide-up">
            <div className="text-sm text-gray-600">
              {opp.description || "Discover this amazing opportunity that matches your profile and career goals."}
            </div>
            
            {/* Additional Details */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Field:</span>
                <span className="ml-2 font-medium">{opp.field}</span>
              </div>
              <div>
                <span className="text-gray-500">Goal:</span>
                <span className="ml-2 font-medium">{opp.goal === "study" ? "Study Program" : "Internship"}</span>
              </div>
              <div>
                <span className="text-gray-500">IELTS Required:</span>
                <span className="ml-2 font-medium">{opp.ielts_required ? "Yes" : "No"}</span>
              </div>
              <div>
                <span className="text-gray-500">Country:</span>
                <span className="ml-2 font-medium">{opp.country}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <Link
                href={`/opportunity/${opp.id}`}
                className="btn btn-primary flex-1 text-center"
              >
                View Details
              </Link>
              <a
                href={opp.official}
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline flex-1 text-center"
              >
                Apply Now
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
