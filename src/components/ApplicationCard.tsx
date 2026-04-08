"use client";

import { useState } from "react";
import Link from "next/link";

interface Application {
  id: number;
  opportunityId: number;
  opportunityTitle: string;
  organization: string;
  status: 'saved' | 'applied' | 'interview' | 'offered' | 'rejected' | 'accepted';
  appliedDate: string;
  deadline: string;
  lastUpdated: string;
  notes?: string;
}

interface ApplicationCardProps {
  application: Application;
  onUpdateStatus?: (id: number, status: Application['status']) => void;
}

export default function ApplicationCard({ application, onUpdateStatus }: ApplicationCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showStatusMenu, setShowStatusMenu] = useState(false);

  const getStatusColor = (status: Application['status']) => {
    switch (status) {
      case 'saved': return 'text-gray-600 bg-gray-100 border-gray-200';
      case 'applied': return 'text-blue-600 bg-blue-100 border-blue-200';
      case 'interview': return 'text-purple-600 bg-purple-100 border-purple-200';
      case 'offered': return 'text-emerald-600 bg-emerald-100 border-emerald-200';
      case 'rejected': return 'text-red-600 bg-red-100 border-red-200';
      case 'accepted': return 'text-green-600 bg-green-100 border-green-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getStatusIcon = (status: Application['status']) => {
    switch (status) {
      case 'saved': return '📋';
      case 'applied': return '📤';
      case 'interview': return '📅';
      case 'offered': return '🎉';
      case 'rejected': return '❌';
      case 'accepted': return '✅';
      default: return '📋';
    }
  };

  const getStatusLabel = (status: Application['status']) => {
    switch (status) {
      case 'saved': return 'Saved';
      case 'applied': return 'Applied';
      case 'interview': return 'Interview Scheduled';
      case 'offered': return 'Offer Received';
      case 'rejected': return 'Rejected';
      case 'accepted': return 'Accepted';
      default: return 'Saved';
    }
  };

  const getNextStatuses = (currentStatus: Application['status']): Application['status'][] => {
    switch (currentStatus) {
      case 'saved': return ['applied'];
      case 'applied': return ['interview', 'rejected'];
      case 'interview': return ['offered', 'rejected'];
      case 'offered': return ['accepted', 'rejected'];
      case 'rejected': return [];
      case 'accepted': return [];
      default: return [];
    }
  };

  const handleStatusUpdate = (newStatus: Application['status']) => {
    if (onUpdateStatus) {
      onUpdateStatus(application.id, newStatus);
      setShowStatusMenu(false);
    }
  };

  const getDaysUntilDeadline = (deadline: string) => {
    const days = Math.ceil((new Date(deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    return days;
  };

  const getDeadlineColor = (days: number) => {
    if (days <= 3) return 'text-red-600 bg-red-50';
    if (days <= 7) return 'text-amber-600 bg-amber-50';
    if (days <= 14) return 'text-yellow-600 bg-yellow-50';
    return 'text-gray-600 bg-gray-50';
  };

  const daysUntilDeadline = getDaysUntilDeadline(application.deadline);

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-soft overflow-hidden hover:shadow-medium transition-all duration-200">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(application.status)}`}>
                {getStatusIcon(application.status)} {getStatusLabel(application.status)}
              </span>
              {application.notes && (
                <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded text-xs font-medium">
                  📝 Note
                </span>
              )}
            </div>
            <Link 
              href={`/opportunity/${application.opportunityId}`}
              className="font-serif text-lg font-semibold text-navy hover:text-emerald transition-colors"
            >
              {application.opportunityTitle}
            </Link>
            <p className="text-sm text-gray-600 mt-1">{application.organization}</p>
          </div>
          
          {/* Status Update Menu */}
          {onUpdateStatus && getNextStatuses(application.status).length > 0 && (
            <div className="relative">
              <button
                onClick={() => setShowStatusMenu(!showStatusMenu)}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 19v.01" />
                </svg>
              </button>
              
              {showStatusMenu && (
                <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-xl border border-gray-200 shadow-medium z-10">
                  <div className="py-2">
                    <p className="px-4 py-2 text-xs text-gray-500 uppercase tracking-wider">Update Status</p>
                    {getNextStatuses(application.status).map((status) => (
                      <button
                        key={status}
                        onClick={() => handleStatusUpdate(status)}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                          status === 'rejected' ? 'text-red-600' :
                          status === 'accepted' ? 'text-green-600' :
                          status === 'offered' ? 'text-emerald-600' :
                          status === 'interview' ? 'text-purple-600' :
                          'text-blue-600'
                        }`}
                      >
                        {getStatusIcon(status)} {getStatusLabel(status)}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500 uppercase tracking-wider text-xs">Applied</span>
            <p className="font-medium text-gray-900">
              {new Date(application.appliedDate).toLocaleDateString()}
            </p>
          </div>
          <div>
            <span className="text-gray-500 uppercase tracking-wider text-xs">Deadline</span>
            <p className={`font-medium ${getDeadlineColor(daysUntilDeadline)}`}>
              {daysUntilDeadline <= 0 ? 'Overdue' : `${daysUntilDeadline} days`}
            </p>
          </div>
          <div>
            <span className="text-gray-500 uppercase tracking-wider text-xs">Last Updated</span>
            <p className="font-medium text-gray-900">
              {new Date(application.lastUpdated).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Notes */}
        {application.notes && (
          <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-amber-700">📝</span>
              <span className="text-sm font-medium text-amber-700">Notes</span>
            </div>
            <p className="text-sm text-amber-800">{application.notes}</p>
          </div>
        )}

        {/* Expand/Collapse Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-center gap-2 py-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          <span>{isExpanded ? 'Show Less' : 'Show More'}</span>
          <svg 
            className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="border-t border-gray-200 p-4 bg-gray-50 animate-slide-up">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Actions */}
            <div>
              <h4 className="font-medium text-navy mb-3">Quick Actions</h4>
              <div className="space-y-2">
                <Link 
                  href={`/opportunity/${application.opportunityId}`}
                  className="btn btn-outline btn-sm w-full"
                >
                  View Opportunity
                </Link>
                {application.status === 'applied' && (
                  <button className="btn btn-primary btn-sm w-full">
                    Withdraw Application
                  </button>
                )}
                {application.status === 'interview' && (
                  <div className="grid grid-cols-2 gap-2">
                    <button className="btn btn-outline btn-sm">
                      Reschedule
                    </button>
                    <button className="btn btn-primary btn-sm">
                      Join Interview
                    </button>
                  </div>
                )}
                {application.status === 'offered' && (
                  <div className="grid grid-cols-2 gap-2">
                    <button className="btn btn-outline btn-sm text-red-600 border-red-200 hover:bg-red-50">
                      Decline
                    </button>
                    <button className="btn btn-primary btn-sm">
                      Accept Offer
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Timeline Preview */}
            <div>
              <h4 className="font-medium text-navy mb-3">Recent Activity</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
                  <span className="text-blue-600">📤</span>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Application Submitted</p>
                    <p className="text-xs text-gray-500">
                      {new Date(application.appliedDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                {application.status !== 'saved' && application.status !== 'applied' && (
                  <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
                    <span className="text-gray-600">📋</span>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">Status Updated</p>
                      <p className="text-xs text-gray-500">
                        {new Date(application.lastUpdated).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                )}
              </div>
              <Link 
                href={`/dashboard?application=${application.id}`}
                className="btn btn-outline btn-sm w-full mt-3"
              >
                View Full Timeline
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
