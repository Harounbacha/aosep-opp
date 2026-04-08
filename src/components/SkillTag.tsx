"use client";

import { useState } from "react";

interface SkillTagProps {
  skill: string;
  isEditing: boolean;
  onRemove?: () => void;
}

export default function SkillTag({ skill, isEditing, onRemove }: SkillTagProps) {
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemove = () => {
    setIsRemoving(true);
    setTimeout(() => {
      onRemove?.();
      setIsRemoving(false);
    }, 200);
  };

  return (
    <div 
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
        isEditing 
          ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' 
          : 'bg-gray-100 text-gray-700 border border-gray-200'
      } ${isRemoving ? 'opacity-50 scale-95' : ''}`}
    >
      <span>{skill}</span>
      {isEditing && onRemove && (
        <button
          onClick={handleRemove}
          className="text-emerald-600 hover:text-emerald-700 transition-colors"
          title="Remove skill"
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}
