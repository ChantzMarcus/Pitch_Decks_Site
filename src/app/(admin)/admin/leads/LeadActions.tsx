'use client';

import { useState } from 'react';
import type { Lead } from '@/db/schema';

interface LeadActionsProps {
  lead: Lead;
}

export default function LeadActions({ lead }: LeadActionsProps) {
  const [status, setStatus] = useState(lead.status || 'new');
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusChange = async (newStatus: string) => {
    setIsUpdating(true);
    try {
      const response = await fetch('/api/leads/update-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leadId: lead.id, status: newStatus }),
      });

      if (response.ok) {
        setStatus(newStatus);
      }
    } catch (error) {
      console.error('Failed to update status:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      {/* Quick Email */}
      <a
        href={`mailto:${lead.email}?subject=Your Story Submission - 848 Washington Media&body=Hi ${lead.name?.split(' ')[0]},%0D%0A%0D%0AThank you for submitting your story to us.%0D%0A%0D%0A`}
        className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
        title="Send email"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      </a>

      {/* Quick Call (if phone exists) */}
      {lead.phone && (
        <a
          href={`tel:${lead.phone}`}
          className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
          title="Call"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        </a>
      )}

      {/* Quick Status Toggle */}
      {status !== 'contacted' ? (
        <button
          onClick={() => handleStatusChange('contacted')}
          disabled={isUpdating}
          className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors disabled:opacity-50"
          title="Mark as contacted"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </button>
      ) : (
        <button
          onClick={() => handleStatusChange('qualified')}
          disabled={isUpdating}
          className="p-2 text-blue-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors disabled:opacity-50"
          title="Mark as qualified"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      )}

      {/* View Details Dropdown */}
      <div className="relative group">
        <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </button>

        {/* Dropdown Menu */}
        <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 hidden group-hover:block z-10">
          <button
            onClick={() => handleStatusChange('new')}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            Reset to New
          </button>
          <button
            onClick={() => handleStatusChange('contacted')}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            Mark Contacted
          </button>
          <button
            onClick={() => handleStatusChange('qualified')}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            Mark Qualified
          </button>
          <hr className="my-1" />
          <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
            View Full Details
          </button>
        </div>
      </div>
    </div>
  );
}
