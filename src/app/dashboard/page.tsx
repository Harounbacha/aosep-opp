"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { loadProfile, loadSaved } from "@/lib/matching";
import { OPPORTUNITIES } from "@/data/opportunities";
import { useLanguage } from "@/lib/LanguageContext";

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

interface DashboardStats {
  totalSaved: number;
  totalApplied: number;
  interviewsScheduled: number;
  offersReceived: number;
  profileCompletion: number;
}

export default function Dashboard() {
  const { t } = useLanguage();
  const [applications, setApplications] = useState<Application[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    totalSaved: 0,
    totalApplied: 0,
    interviewsScheduled: 0,
    offersReceived: 0,
    profileCompletion: 0,
  });
  const [activeTab, setActiveTab] = useState<'overview' | 'applications' | 'analytics'>('overview');
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);

  useEffect(() => {
    // Load user data
    const profile = loadProfile();
    const saved = loadSaved();
    
    // Generate mock applications based on saved opportunities
    const mockApplications: Application[] = saved.map((id, index) => {
      const opportunity = OPPORTUNITIES.find(opp => opp.id === id);
      if (!opportunity) return null;
      
      const statuses: Application['status'][] = ['saved', 'applied', 'interview', 'offered', 'rejected', 'accepted'];
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
      
      return {
        id: index + 1,
        opportunityId: id,
        opportunityTitle: opportunity.title,
        organization: opportunity.field + " Opportunity",
        status: randomStatus,
        appliedDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
        deadline: opportunity.deadline,
        lastUpdated: new Date().toISOString(),
        notes: Math.random() > 0.5 ? "Preparing application materials" : undefined,
      };
    }).filter(Boolean) as Application[];

    setApplications(mockApplications);

    // Calculate stats
    const newStats: DashboardStats = {
      totalSaved: saved.length,
      totalApplied: mockApplications.filter(app => app.status !== 'saved').length,
      interviewsScheduled: mockApplications.filter(app => app.status === 'interview').length,
      offersReceived: mockApplications.filter(app => app.status === 'offered').length,
      profileCompletion: profile ? 85 : 0, // Mock completion percentage
    };
    setStats(newStats);
  }, []);

  const getStatusColor = (status: Application['status']) => {
    switch (status) {
      case 'saved': return 'text-gray-600 bg-gray-100';
      case 'applied': return 'text-blue-600 bg-blue-100';
      case 'interview': return 'text-purple-600 bg-purple-100';
      case 'offered': return 'text-emerald-600 bg-emerald-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      case 'accepted': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
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
      case 'saved': return t.dashboard.status.saved;
      case 'applied': return t.dashboard.status.applied;
      case 'interview': return t.dashboard.status.interview;
      case 'offered': return t.dashboard.status.offered;
      case 'rejected': return t.dashboard.status.rejected;
      case 'accepted': return t.dashboard.status.accepted;
      default: return t.dashboard.status.saved;
    }
  };

  const getDaysUntilDeadline = (deadline: string) => {
    const days = Math.ceil((new Date(deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    return days;
  };

  const getDeadlineColor = (days: number) => {
    if (days <= 3) return 'text-red-600';
    if (days <= 7) return 'text-amber-600';
    if (days <= 14) return 'text-yellow-600';
    return 'text-gray-600';
  };

  return (
    <div className="page-enter">
      <Navbar />
      <div className="px-6 py-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-serif text-3xl text-navy mb-2">
            {t.dashboard.title}
          </h1>
          <p className="text-gray-600">
            {t.dashboard.subtitle}
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-soft">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-500 text-sm font-medium">{t.dashboard.saved}</span>
              <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                <span className="text-emerald-600 text-sm">📋</span>
              </div>
            </div>
            <div className="text-2xl font-bold text-navy">{stats.totalSaved}</div>
            <div className="text-xs text-gray-500">{t.dashboard.savedDesc}</div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-soft">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-500 text-sm font-medium">{t.dashboard.applied}</span>
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 text-sm">📤</span>
              </div>
            </div>
            <div className="text-2xl font-bold text-navy">{stats.totalApplied}</div>
            <div className="text-xs text-gray-500">{t.dashboard.appliedDesc}</div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-soft">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-500 text-sm font-medium">{t.dashboard.interviews}</span>
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-purple-600 text-sm">📅</span>
              </div>
            </div>
            <div className="text-2xl font-bold text-navy">{stats.interviewsScheduled}</div>
            <div className="text-xs text-gray-500">{t.dashboard.interviewsDesc}</div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-soft">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-500 text-sm font-medium">{t.dashboard.offers}</span>
              <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                <span className="text-emerald-600 text-sm">🎉</span>
              </div>
            </div>
            <div className="text-2xl font-bold text-navy">{stats.offersReceived}</div>
            <div className="text-xs text-gray-500">{t.dashboard.offersDesc}</div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-soft">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-500 text-sm font-medium">{t.dashboard.profile}</span>
              <div className="w-8 h-8 bg-navy-100 rounded-lg flex items-center justify-center">
                <span className="text-navy-600 text-sm">👤</span>
              </div>
            </div>
            <div className="text-2xl font-bold text-navy">{stats.profileCompletion}%</div>
            <div className="text-xs text-gray-500">{t.dashboard.profileDesc}</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: t.dashboard.overview, icon: '📊' },
              { id: 'applications', label: t.dashboard.applications, icon: '📋' },
              { id: 'analytics', label: t.dashboard.analytics, icon: '📈' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-navy text-navy'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="min-h-[400px]">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Applications */}
              <div>
                <h3 className="font-serif text-xl text-navy mb-4">{t.dashboard.recentApplications}</h3>
                <div className="space-y-4">
                  {applications.slice(0, 5).map((app) => (
                    <div key={app.id} className="bg-white rounded-xl border border-gray-200 p-4 shadow-soft">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-medium text-navy mb-1">{app.opportunityTitle}</h4>
                          <p className="text-sm text-gray-600">{app.organization}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
                          {getStatusIcon(app.status)} {getStatusLabel(app.status)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{new Date(app.appliedDate).toLocaleDateString()}</span>
                        <span className={getDeadlineColor(getDaysUntilDeadline(app.deadline))}>
                          {getDaysUntilDeadline(app.deadline)} {t.dashboard.daysLeft}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                {applications.length > 5 && (
                  <Link href="/dashboard?tab=applications" className="btn btn-outline w-full mt-4">
                    {t.dashboard.viewAll}
                  </Link>
                )}
              </div>

              {/* Upcoming Deadlines */}
              <div>
                <h3 className="font-serif text-xl text-navy mb-4">{t.dashboard.upcomingDeadlines}</h3>
                <div className="space-y-3">
                  {applications
                    .filter(app => app.status === 'applied' || app.status === 'interview')
                    .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
                    .slice(0, 5)
                    .map((app) => {
                      const daysUntil = getDaysUntilDeadline(app.deadline);
                      return (
                        <div key={app.id} className="bg-white rounded-xl border border-gray-200 p-4 shadow-soft">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-navy flex-1 mr-2">{app.opportunityTitle}</h4>
                            <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                              daysUntil <= 3 ? 'bg-red-100 text-red-700' :
                              daysUntil <= 7 ? 'bg-amber-100 text-amber-700' :
                              'bg-gray-100 text-gray-700'
                            }`}>
                              {daysUntil <= 0 ? t.dashboard.overdue : `${daysUntil} ${t.dashboard.daysLeft}`}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">{app.organization}</p>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'applications' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-serif text-xl text-navy">{t.dashboard.allApplications}</h3>
                <div className="flex items-center gap-4">
                  <select className="form-control text-sm w-40">
                    <option value="all">{t.dashboard.allStatus}</option>
                    <option value="saved">{t.dashboard.status.saved}</option>
                    <option value="applied">{t.dashboard.status.applied}</option>
                    <option value="interview">{t.dashboard.status.interview}</option>
                    <option value="offered">{t.dashboard.status.offered}</option>
                  </select>
                  <button className="btn btn-primary btn-sm">{t.dashboard.export}</button>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl border border-gray-200 shadow-soft overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.dashboard.table.opportunity}</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.dashboard.table.organization}</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.dashboard.table.status}</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.dashboard.table.applied}</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.dashboard.table.deadline}</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.dashboard.table.actions}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {applications.map((app) => (
                        <tr key={app.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <Link href={`/opportunity/${app.opportunityId}`} className="font-medium text-navy hover:text-emerald">
                              {app.opportunityTitle}
                            </Link>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">{app.organization}</td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
                              {getStatusIcon(app.status)} {getStatusLabel(app.status)}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {new Date(app.appliedDate).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4">
                            <span className={`text-sm font-medium ${getDeadlineColor(getDaysUntilDeadline(app.deadline))}`}>
                              {getDaysUntilDeadline(app.deadline)} days
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <button className="text-gray-400 hover:text-gray-600">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-4h-4v4m0 0h4m-4 0h4" />
                                </svg>
                              </button>
                              <button className="text-gray-400 hover:text-gray-600">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m0 0v-6m0 0h4m-4 0h4" />
                                </svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Application Funnel */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-soft">
                <h3 className="font-serif text-xl text-navy mb-4">{t.dashboard.applicationFunnel}</h3>
                <div className="space-y-4">
                  {[
                    { label: t.dashboard.savedDesc, count: stats.totalSaved, color: 'bg-gray-200' },
                    { label: t.dashboard.appliedDesc, count: stats.totalApplied, color: 'bg-blue-200' },
                    { label: t.dashboard.interviewsDesc, count: stats.interviewsScheduled, color: 'bg-purple-200' },
                    { label: t.dashboard.offersDesc, count: stats.offersReceived, color: 'bg-emerald-200' },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{item.label}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-gray-100 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${item.color}`}
                            style={{ width: `${(item.count / Math.max(stats.totalSaved, 1)) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-navy w-8 text-right">{item.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Success Rate */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-soft">
                <h3 className="font-serif text-xl text-navy mb-4">{t.dashboard.successMetrics}</h3>
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-emerald-600 mb-2">
                      {stats.totalApplied > 0 ? Math.round((stats.offersReceived / stats.totalApplied) * 100) : 0}%
                    </div>
                    <div className="text-sm text-gray-600">{t.dashboard.offerRate}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      {stats.interviewsScheduled > 0 ? Math.round((stats.interviewsScheduled / stats.totalApplied) * 100) : 0}%
                    </div>
                    <div className="text-sm text-gray-600">{t.dashboard.interviewRate}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-lg font-bold text-navy">{stats.totalApplied}</div>
                      <div className="text-xs text-gray-600">{t.dashboard.totalApplications}</div>
                    </div>
                    <div className="text-center p-4 bg-emerald-50 rounded-lg">
                      <div className="text-lg font-bold text-emerald-600">{stats.offersReceived}</div>
                      <div className="text-xs text-gray-600">{t.dashboard.totalOffers}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
