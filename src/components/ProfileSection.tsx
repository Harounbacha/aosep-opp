"use client";

import { ReactNode } from "react";

interface ProfileSectionProps {
  title: string;
  children: ReactNode;
  isEditing: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
}

export default function ProfileSection({ 
  title, 
  children, 
  isEditing, 
  onEdit, 
  onSave, 
  onCancel 
}: ProfileSectionProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-soft">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-serif text-xl text-navy">{title}</h3>
        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <button
                onClick={onSave}
                className="btn btn-primary btn-sm"
              >
                Save
              </button>
              <button
                onClick={onCancel}
                className="btn btn-outline btn-sm"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={onEdit}
              className="btn btn-outline btn-sm"
            >
              Edit
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="animate-slide-up">
        {children}
      </div>
    </div>
  );
}
