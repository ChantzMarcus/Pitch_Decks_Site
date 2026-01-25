import { db } from '@/db';
import { leads } from '@/db/schema';
import { desc, sql } from 'drizzle-orm';
import type { Lead } from '@/db/schema';
import LeadActions from './LeadActions';

export const dynamic = 'force-dynamic';

async function getLeads() {
  // Sort by lead score descending (hot leads first), then by date
  return await db.select()
    .from(leads)
    .orderBy(desc(leads.leadScore), desc(leads.createdAt))
    .limit(100);
}

function getPriorityBadge(score: number) {
  if (score >= 75) return { label: 'HOT', color: 'bg-red-500 text-white animate-pulse' };
  if (score >= 50) return { label: 'WARM', color: 'bg-orange-400 text-white' };
  if (score >= 25) return { label: 'COOL', color: 'bg-blue-400 text-white' };
  return { label: 'NEW', color: 'bg-gray-300 text-gray-700' };
}

function formatTimeAgo(date: Date | null) {
  if (!date) return '-';
  const now = new Date();
  const diffMs = now.getTime() - new Date(date).getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);

  if (diffHours < 1) return 'Just now';
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays}d ago`;
  return new Date(date).toLocaleDateString();
}

export default async function AdminLeadsPage() {
  const allLeads = await getLeads();

  const hotLeads = allLeads.filter((l: Lead) => (l.leadScore || 0) >= 75);
  const warmLeads = allLeads.filter((l: Lead) => (l.leadScore || 0) >= 50 && (l.leadScore || 0) < 75);
  const newLeads = allLeads.filter((l: Lead) => l.status === 'new');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Priority Alert Banner */}
      {hotLeads.length > 0 && (
        <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white py-3 px-6">
          <div className="max-w-7xl mx-auto flex items-center gap-3">
            <span className="animate-pulse">🔥</span>
            <span className="font-medium">
              {hotLeads.length} hot lead{hotLeads.length > 1 ? 's' : ''} need{hotLeads.length === 1 ? 's' : ''} attention!
            </span>
            <a href="#leads-table" className="ml-auto text-sm underline hover:no-underline">
              View now →
            </a>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1">Lead Management</h1>
            <p className="text-gray-600">Prioritized by score • Hot leads first</p>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
              Export CSV
            </button>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700">
              Refresh
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-gray-300">
            <div className="text-sm text-gray-600 mb-1">Total Leads</div>
            <div className="text-3xl font-bold text-gray-900">{allLeads.length}</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-red-500">
            <div className="text-sm text-gray-600 mb-1">🔥 Hot (75+)</div>
            <div className="text-3xl font-bold text-red-600">{hotLeads.length}</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-orange-400">
            <div className="text-sm text-gray-600 mb-1">Warm (50-74)</div>
            <div className="text-3xl font-bold text-orange-600">{warmLeads.length}</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-blue-500">
            <div className="text-sm text-gray-600 mb-1">Need Follow-up</div>
            <div className="text-3xl font-bold text-blue-600">{newLeads.length}</div>
          </div>
        </div>

        {/* Leads Table */}
        <div id="leads-table" className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h2 className="font-semibold text-gray-900">All Leads</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Priority
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Story
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Budget
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Scores
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {allLeads.map((lead: Lead) => {
                  const priority = getPriorityBadge(lead.leadScore || 0);
                  const isHot = (lead.leadScore || 0) >= 75;

                  return (
                    <tr
                      key={lead.id}
                      className={`hover:bg-gray-50 ${isHot ? 'bg-red-50/50' : ''}`}
                    >
                      {/* Priority */}
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded text-xs font-bold ${priority.color}`}>
                          {priority.label}
                        </span>
                        <div className="text-xs text-gray-500 mt-1">
                          Score: {lead.leadScore || 0}
                        </div>
                      </td>

                      {/* Contact */}
                      <td className="px-4 py-4">
                        <div className="text-sm font-medium text-gray-900">{lead.name}</div>
                        <div className="text-sm text-gray-500">{lead.email}</div>
                        {lead.phone && (
                          <div className="text-xs text-gray-400">{lead.phone}</div>
                        )}
                      </td>

                      {/* Story */}
                      <td className="px-4 py-4 max-w-xs">
                        <div className="text-sm font-medium text-gray-900">
                          {lead.format || 'Not specified'}
                        </div>
                        {lead.logline && (
                          <div className="text-xs text-gray-500 truncate max-w-xs" title={lead.logline}>
                            {lead.logline.slice(0, 60)}...
                          </div>
                        )}
                        <div className="text-xs text-gray-400 mt-1">
                          {formatTimeAgo(lead.createdAt)}
                        </div>
                      </td>

                      {/* Budget */}
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className={`text-sm font-medium ${
                          lead.budget === '$50K+' ? 'text-green-600' :
                          lead.budget === '$15-50K' ? 'text-blue-600' :
                          'text-gray-600'
                        }`}>
                          {lead.budget || '-'}
                        </span>
                        <div className="text-xs text-gray-400">
                          {lead.startTiming || '-'}
                        </div>
                      </td>

                      {/* Scores */}
                      <td className="px-4 py-4 whitespace-nowrap">
                        {lead.overallScore ? (
                          <div>
                            <div className="flex items-center gap-2">
                              <span className={`text-sm font-bold ${
                                lead.overallScore >= 80 ? 'text-green-600' :
                                lead.overallScore >= 60 ? 'text-blue-600' :
                                'text-gray-600'
                              }`}>
                                AI: {lead.overallScore}
                              </span>
                            </div>
                            <div className="text-xs text-gray-400 mt-1">
                              O:{lead.originalityScore} E:{lead.emotionalScore} C:{lead.commercialScore}
                            </div>
                          </div>
                        ) : (
                          <span className="text-xs text-gray-400 italic">Pending</span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                          lead.status === 'qualified' ? 'bg-green-100 text-green-800' :
                          lead.status === 'contacted' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {lead.status || 'new'}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-4 whitespace-nowrap">
                        <LeadActions lead={lead} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {allLeads.length === 0 && (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">📭</div>
              <p className="text-gray-500">No leads yet</p>
              <p className="text-sm text-gray-400 mt-1">They&apos;ll appear here when someone submits a story</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
