"use client";

import { useState } from "react";

interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  type: 'application' | 'interview' | 'offer' | 'rejection' | 'acceptance';
  status: 'completed' | 'upcoming' | 'pending';
}

interface ApplicationTimelineProps {
  applicationId: number;
  events: TimelineEvent[];
}

export default function ApplicationTimeline({ applicationId, events }: ApplicationTimelineProps) {
  const [expandedEvents, setExpandedEvents] = useState<Set<string>>(new Set());

  const toggleEvent = (eventId: string) => {
    const newExpanded = new Set(expandedEvents);
    if (newExpanded.has(eventId)) {
      newExpanded.delete(eventId);
    } else {
      newExpanded.add(eventId);
    }
    setExpandedEvents(newExpanded);
  };

  const getEventIcon = (type: TimelineEvent['type'], status: TimelineEvent['status']) => {
    if (type === 'application') return '📤';
    if (type === 'interview') return status === 'upcoming' ? '📅' : '✅';
    if (type === 'offer') return status === 'pending' ? '🎯' : '🎉';
    if (type === 'rejection') return '❌';
    if (type === 'acceptance') return '✅';
    return '📋';
  };

  const getEventColor = (type: TimelineEvent['type'], status: TimelineEvent['status']) => {
    if (status === 'upcoming') return 'border-blue-200 bg-blue-50';
    if (status === 'pending') return 'border-amber-200 bg-amber-50';
    if (status === 'completed') {
      if (type === 'rejection') return 'border-red-200 bg-red-50';
      if (type === 'acceptance') return 'border-emerald-200 bg-emerald-50';
      return 'border-green-200 bg-green-50';
    }
    return 'border-gray-200 bg-gray-50';
  };

  const getEventIconColor = (type: TimelineEvent['type'], status: TimelineEvent['status']) => {
    if (status === 'upcoming') return 'text-blue-600';
    if (status === 'pending') return 'text-amber-600';
    if (status === 'completed') {
      if (type === 'rejection') return 'text-red-600';
      if (type === 'acceptance') return 'text-emerald-600';
      return 'text-green-600';
    }
    return 'text-gray-600';
  };

  const sortedEvents = [...events].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="relative">
      {/* Timeline Line */}
      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>
      
      {/* Timeline Events */}
      <div className="space-y-6">
        {sortedEvents.map((event, index) => (
          <div key={event.id} className="relative flex items-start gap-4">
            {/* Timeline Dot */}
            <div className={`relative z-10 w-12 h-12 rounded-full border-2 flex items-center justify-center ${getEventColor(event.type, event.status)}`}>
              <span className={`text-lg ${getEventIconColor(event.type, event.status)}`}>
                {getEventIcon(event.type, event.status)}
              </span>
              
              {/* Status Indicator */}
              {event.status === 'upcoming' && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-600 rounded-full animate-pulse"></div>
              )}
              {event.status === 'pending' && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-600 rounded-full"></div>
              )}
            </div>

            {/* Event Content */}
            <div className="flex-1 min-w-0">
              <div 
                className={`bg-white rounded-xl border p-4 cursor-pointer transition-all duration-200 hover:shadow-medium ${
                  expandedEvents.has(event.id) ? 'ring-2 ring-navy ring-opacity-20' : ''
                } ${getEventColor(event.type, event.status)}`}
                onClick={() => toggleEvent(event.id)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-medium text-navy mb-1">{event.title}</h4>
                    <p className="text-sm text-gray-500">
                      {new Date(event.date).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <svg 
                      className={`w-4 h-4 transition-transform ${expandedEvents.has(event.id) ? 'rotate-180' : ''}`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
                
                <p className="text-sm text-gray-600 mb-2">{event.description}</p>
                
                {/* Expanded Content */}
                {expandedEvents.has(event.id) && (
                  <div className="mt-4 pt-4 border-t border-gray-200 space-y-3 animate-slide-up">
                    {event.type === 'interview' && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <span className="text-xs text-gray-500 uppercase tracking-wider">Format</span>
                          <p className="text-sm font-medium text-gray-900">Video Call</p>
                        </div>
                        <div>
                          <span className="text-xs text-gray-500 uppercase tracking-wider">Duration</span>
                          <p className="text-sm font-medium text-gray-900">45 minutes</p>
                        </div>
                      </div>
                    )}
                    
                    {event.type === 'offer' && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <span className="text-xs text-gray-500 uppercase tracking-wider">Salary</span>
                          <p className="text-sm font-medium text-gray-900">$65,000 - $85,000</p>
                        </div>
                        <div>
                          <span className="text-xs text-gray-500 uppercase tracking-wider">Start Date</span>
                          <p className="text-sm font-medium text-gray-900">June 15, 2024</p>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex gap-3">
                      <button className="btn btn-primary btn-sm">View Details</button>
                      {event.status === 'upcoming' && (
                        <button className="btn btn-outline btn-sm">Reschedule</button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
