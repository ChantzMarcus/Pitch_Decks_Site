'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CalendarIcon,
  PhoneIcon,
  MessageCircleIcon,
  FileTextIcon,
  AwardIcon,
  TrendingUpIcon,
  ClockIcon,
  DollarSignIcon,
  FilterIcon,
  SearchIcon,
  DownloadIcon,
  CloseIcon,
  PlusIcon,
} from './icons/FilmIcons';

interface Note {
  id: string;
  content: string;
  timestamp: Date;
  author: string;
}

interface Prospect {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  storyScore: number;
  format: string;
  budget: string;
  timeline: string;
  logline: string;
  description: string;
  talkingPoints: string[];
  objectionHandling: string[];
  matchedCaseStudies: Array<{
    title: string;
    outcome: string;
    testimonial: string;
  }>;
  notes?: Note[];
  status?: 'new' | 'contacted' | 'qualified' | 'closed';
}

type FilterType = 'all' | 'high-score' | 'medium-score' | 'low-score' | 'asap' | 'budget-high';
type SortType = 'score-desc' | 'score-asc' | 'name-asc' | 'date-desc';

interface SalesDashboardProps {
  userRole?: string;
}

const BUDGET_ORDER: Record<string, number> = {
  '$100K+': 5,
  '$50K-$100K': 4,
  '$25K-$50K': 3,
  '$10K-$25K': 2,
  'Under $10K': 1,
};

export default function SalesDashboard({ userRole = 'sales-rep' }: SalesDashboardProps) {
  const [prospects, setProspects] = useState<Prospect[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      createdAt: '2023-05-15',
      storyScore: 82,
      format: 'Feature Film',
      budget: '$50K-$100K',
      timeline: 'ASAP',
      logline: 'A detective discovers her partner is the serial killer she\'s been hunting.',
      description: 'Psychological thriller exploring themes of trust and betrayal...',
      talkingPoints: [
        'Strong psychological thriller concept',
        'High commercial potential in current market',
        'Ready to invest significant budget'
      ],
      objectionHandling: [
        'If budget concern: We offer flexible payment plans for serious creators',
        'If timeline concern: We can expedite the process for urgent projects'
      ],
      matchedCaseStudies: [
        {
          title: 'Thriller Success Story',
          outcome: 'Secured $2M funding',
          testimonial: 'They delivered beyond expectations...'
        }
      ],
      notes: [],
      status: 'new'
    },
    {
      id: '2',
      name: 'Michael Chen',
      email: 'michael@example.com',
      createdAt: '2023-05-18',
      storyScore: 76,
      format: 'TV Series',
      budget: '$10K-$25K',
      timeline: '3-6 months',
      logline: 'A group of teenagers discover a supernatural mystery in their small town.',
      description: 'Supernatural teen drama with elements of horror...',
      talkingPoints: [
        'Popular genre with proven market demand',
        'Young demographic with high engagement',
        'Series format allows for ongoing revenue'
      ],
      objectionHandling: [
        'If budget concern: We have packages specifically for indie creators',
        'If timeline concern: We can create a pilot episode to attract investors'
      ],
      matchedCaseStudies: [
        {
          title: 'Teen Drama Hit',
          outcome: 'Picked up by streaming platform',
          testimonial: 'Their guidance helped us secure distribution...'
        }
      ],
      notes: [],
      status: 'contacted'
    },
    {
      id: '3',
      name: 'Elena Rodriguez',
      email: 'elena@example.com',
      createdAt: '2023-05-20',
      storyScore: 91,
      format: 'Feature Film',
      budget: '$100K+',
      timeline: 'ASAP',
      logline: 'A retired assassin is forced back into action when her past threatens her family.',
      description: 'High-octane action thriller with strong character development...',
      talkingPoints: [
        'Exceptional story score (91/100)',
        'High budget capability - premium package candidate',
        'Urgent timeline indicates strong motivation'
      ],
      objectionHandling: [
        'If timing concern: We have expedited options for urgent projects',
        'If budget concern: Consider this an investment in a proven concept'
      ],
      matchedCaseStudies: [
        {
          title: 'Action Feature Success',
          outcome: 'Secured $5M funding + distribution deal',
          testimonial: 'The pitch materials were instrumental in our success...'
        }
      ],
      notes: [],
      status: 'qualified'
    },
    {
      id: '4',
      name: 'James Wilson',
      email: 'james@example.com',
      createdAt: '2023-05-22',
      storyScore: 58,
      format: 'Short Film',
      budget: 'Under $10K',
      timeline: '3-6 months',
      logline: 'A coming-of-age story set in rural America.',
      description: 'Character-driven drama with festival potential...',
      talkingPoints: [
        'Heartfelt concept with festival appeal',
        'Good entry point for long-term relationship',
        'Could expand to feature format'
      ],
      objectionHandling: [
        'If budget concern: Our starter package is perfect for short films',
        'If value concern: Many successful features started as award-winning shorts'
      ],
      matchedCaseStudies: [
        {
          title: 'Short Film Festival Winner',
          outcome: 'Best Short at Sundance, led to feature deal',
          testimonial: 'The deck helped us get noticed by distributors...'
        }
      ],
      notes: [],
      status: 'new'
    }
  ]);

  const [selectedProspect, setSelectedProspect] = useState<Prospect | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [sortBy, setSortBy] = useState<SortType>('score-desc');
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [newNote, setNewNote] = useState('');

  // Filter and sort prospects
  const filteredProspects = useMemo(() => {
    let filtered = [...prospects];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (activeFilter === 'high-score') {
      filtered = filtered.filter(p => p.storyScore >= 80);
    } else if (activeFilter === 'medium-score') {
      filtered = filtered.filter(p => p.storyScore >= 60 && p.storyScore < 80);
    } else if (activeFilter === 'low-score') {
      filtered = filtered.filter(p => p.storyScore < 60);
    } else if (activeFilter === 'asap') {
      filtered = filtered.filter(p => p.timeline === 'ASAP');
    } else if (activeFilter === 'budget-high') {
      filtered = filtered.filter(p => BUDGET_ORDER[p.budget] >= 4);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      if (sortBy === 'score-desc') return b.storyScore - a.storyScore;
      if (sortBy === 'score-asc') return a.storyScore - b.storyScore;
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
      if (sortBy === 'date-desc') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      return 0;
    });

    return filtered;
  }, [prospects, searchQuery, activeFilter, sortBy]);

  // Export to CSV
  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Score', 'Format', 'Budget', 'Timeline', 'Status', 'Created'];
    const rows = filteredProspects.map(p => [
      p.name,
      p.email,
      p.storyScore,
      p.format,
      p.budget,
      p.timeline,
      p.status || 'new',
      p.createdAt
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `prospects-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Add note to prospect
  const addNote = () => {
    if (!selectedProspect || !newNote.trim()) return;

    const note: Note = {
      id: Date.now().toString(),
      content: newNote,
      timestamp: new Date(),
      author: userRole
    };

    const updatedProspects = prospects.map(p =>
      p.id === selectedProspect.id
        ? { ...p, notes: [...(p.notes || []), note] }
        : p
    );

    setProspects(updatedProspects);
    setSelectedProspect({
      ...selectedProspect,
      notes: [...(selectedProspect.notes || []), note]
    });
    setNewNote('');
  };

  // Update prospect status
  const updateStatus = (prospectId: string, status: Prospect['status']) => {
    const updatedProspects = prospects.map(p =>
      p.id === prospectId ? { ...p, status } : p
    );
    setProspects(updatedProspects);
    if (selectedProspect?.id === prospectId) {
      setSelectedProspect({ ...selectedProspect, status });
    }
  };

  // Status badge colors
  const getStatusColor = (status?: Prospect['status']) => {
    switch (status) {
      case 'new': return 'bg-accent-indigo/20 text-accent-indigo-glow';
      case 'contacted': return 'bg-accent-teal/20 text-accent-teal';
      case 'qualified': return 'bg-accent-gold/20 text-accent-gold';
      case 'closed': return 'bg-green-500/20 text-green-400';
      default: return 'bg-white/10 text-paper-muted';
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 text-center"
      >
        <h1 className="font-display text-4xl font-bold text-paper mb-4">
          Sales Rep Dashboard
        </h1>
        <p className="text-xl text-paper-muted max-w-3xl mx-auto">
          Comprehensive prospect information and conversation tools to close deals faster
        </p>
      </motion.div>

      {/* Stats Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
      >
        {[
          { label: 'Total Prospects', value: prospects.length, color: 'text-accent-indigo' },
          { label: 'High Score (80+)', value: prospects.filter(p => p.storyScore >= 80).length, color: 'text-accent-gold' },
          { label: 'ASAP Timeline', value: prospects.filter(p => p.timeline === 'ASAP').length, color: 'text-accent-red' },
          { label: 'Qualified', value: prospects.filter(p => p.status === 'qualified').length, color: 'text-accent-teal' },
        ].map((stat, i) => (
          <div key={i} className="bg-charcoal-light rounded-xl p-4 border border-white/5 text-center">
            <div className={`text-3xl font-bold ${stat.color}`}>{stat.value}</div>
            <div className="text-sm text-paper-muted">{stat.label}</div>
          </div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Prospects List */}
        <div className="lg:col-span-1">
          <div className="bg-charcoal-light rounded-2xl shadow-lg p-6 border border-white/5">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl font-semibold text-paper">
                Prospects ({filteredProspects.length})
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={exportToCSV}
                  className="px-3 py-1.5 text-sm border border-white/10 rounded-lg hover:bg-white/5 transition-colors flex items-center gap-1"
                  title="Export to CSV"
                >
                  <DownloadIcon className="w-3 h-3" />
                </button>
                <button
                  onClick={() => setShowFilterMenu(!showFilterMenu)}
                  className={`px-3 py-1.5 text-sm border rounded-lg transition-colors flex items-center gap-1 ${
                    showFilterMenu || activeFilter !== 'all'
                      ? 'border-accent-indigo/50 bg-accent-indigo/20 text-accent-indigo-glow'
                      : 'border-white/10 hover:bg-white/5'
                  }`}
                >
                  <FilterIcon className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Search Bar */}
            <div className="mb-4 relative">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-paper-muted" />
              <input
                type="text"
                placeholder="Search prospects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-charcoal-medium border border-white/10 rounded-lg text-paper placeholder:text-paper-muted focus:outline-none focus:ring-2 focus:ring-accent-indigo/50"
              />
            </div>

            {/* Filter Menu */}
            <AnimatePresence>
              {showFilterMenu && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-4 overflow-hidden"
                >
                  <div className="bg-charcoal-medium rounded-lg p-3 space-y-2">
                    <div className="text-xs text-paper-muted uppercase tracking-wide mb-2">Filter by Score</div>
                    {(['all', 'high-score', 'medium-score', 'low-score'] as FilterType[]).map(filter => (
                      <button
                        key={filter}
                        onClick={() => { setActiveFilter(filter); }}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                          activeFilter === filter
                            ? 'bg-accent-indigo/20 text-accent-indigo-glow'
                            : 'hover:bg-white/5 text-paper-muted'
                        }`}
                      >
                        {filter === 'all' ? 'All Prospects' :
                         filter === 'high-score' ? 'High Score (80+)' :
                         filter === 'medium-score' ? 'Medium Score (60-79)' :
                         'Low Score (<60)'}
                      </button>
                    ))}
                    <div className="text-xs text-paper-muted uppercase tracking-wide mb-2 mt-4">Filter by Attributes</div>
                    {(['asap', 'budget-high'] as FilterType[]).map(filter => (
                      <button
                        key={filter}
                        onClick={() => { setActiveFilter(filter); }}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                          activeFilter === filter
                            ? 'bg-accent-indigo/20 text-accent-indigo-glow'
                            : 'hover:bg-white/5 text-paper-muted'
                        }`}
                      >
                        {filter === 'asap' ? 'ASAP Timeline' : 'High Budget ($50K+)'}
                      </button>
                    ))}
                    <div className="text-xs text-paper-muted uppercase tracking-wide mb-2 mt-4">Sort By</div>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as SortType)}
                      className="w-full px-3 py-2 bg-charcoal border border-white/10 rounded-lg text-paper text-sm focus:outline-none focus:ring-2 focus:ring-accent-indigo/50"
                    >
                      <option value="score-desc">Score (High to Low)</option>
                      <option value="score-asc">Score (Low to High)</option>
                      <option value="name-asc">Name (A-Z)</option>
                      <option value="date-desc">Newest First</option>
                    </select>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-3">
              {filteredProspects.map((prospect, index) => (
                <motion.div
                  key={prospect.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setSelectedProspect(prospect)}
                  className={`p-4 rounded-xl cursor-pointer transition-all ${
                    selectedProspect?.id === prospect.id
                      ? 'bg-accent-indigo/20 border border-accent-indigo/30'
                      : 'bg-charcoal-medium hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-paper truncate">{prospect.name}</h3>
                        <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-medium ${getStatusColor(prospect.status)}`}>
                          {prospect.status || 'new'}
                        </span>
                      </div>
                      <p className="text-sm text-paper-muted truncate">{prospect.email}</p>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <AwardIcon className="w-4 h-4 text-accent-gold" />
                      <span className="text-sm font-medium text-paper">{prospect.storyScore}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-sm text-paper-muted">
                    <span className="flex items-center gap-1">
                      <FileTextIcon className="w-3 h-3" />
                      {prospect.format}
                    </span>
                    <span className="flex items-center gap-1">
                      <DollarSignIcon className="w-3 h-3" />
                      {prospect.budget}
                    </span>
                  </div>
                </motion.div>
              ))}
              {filteredProspects.length === 0 && (
                <div className="text-center py-8 text-paper-muted">
                  No prospects match your filters
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Prospect Detail */}
        <div className="lg:col-span-2">
          {selectedProspect ? (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              key={selectedProspect.id}
              className="bg-charcoal-light rounded-2xl shadow-lg p-8 border border-white/5"
            >
              <div className="flex items-start justify-between mb-8">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="font-display text-2xl font-bold text-paper">
                      {selectedProspect.name}
                    </h2>
                    <select
                      value={selectedProspect.status || 'new'}
                      onChange={(e) => updateStatus(selectedProspect.id, e.target.value as Prospect['status'])}
                      className="px-3 py-1 bg-charcoal-medium border border-white/10 rounded-lg text-sm text-paper focus:outline-none focus:ring-2 focus:ring-accent-indigo/50"
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="qualified">Qualified</option>
                      <option value="closed">Closed</option>
                    </select>
                  </div>
                  <p className="text-paper-muted">{selectedProspect.email}</p>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold bg-gradient-to-r from-accent-indigo to-accent-gold bg-clip-text text-transparent">
                    {selectedProspect.storyScore}/100
                  </div>
                  <div className="text-sm text-paper-muted">Story Score</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="font-display text-lg font-semibold text-paper mb-3">Project Info</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm text-paper-muted">Format</div>
                      <div className="font-medium text-paper">{selectedProspect.format}</div>
                    </div>
                    <div>
                      <div className="text-sm text-paper-muted">Budget Range</div>
                      <div className="font-medium text-paper">{selectedProspect.budget}</div>
                    </div>
                    <div>
                      <div className="text-sm text-paper-muted">Timeline</div>
                      <div className="font-medium text-paper">{selectedProspect.timeline}</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-display text-lg font-semibold text-paper mb-3">Story Concept</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm text-paper-muted">Logline</div>
                      <div className="font-medium italic text-paper">"{selectedProspect.logline}"</div>
                    </div>
                    <div>
                      <div className="text-sm text-paper-muted">Description</div>
                      <div className="text-sm text-paper-muted">{selectedProspect.description}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="font-display text-lg font-semibold text-paper mb-3 flex items-center gap-2">
                    <MessageCircleIcon className="w-5 h-5 text-accent-indigo" />
                    Talking Points
                  </h3>
                  <ul className="space-y-3">
                    {selectedProspect.talkingPoints.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2 p-3 bg-accent-indigo/10 rounded-lg">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent-indigo mt-2 flex-shrink-0"></div>
                        <span className="text-paper-muted text-sm">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-display text-lg font-semibold text-paper mb-3 flex items-center gap-2">
                    <TrendingUpIcon className="w-5 h-5 text-accent-gold" />
                    Objection Handling
                  </h3>
                  <ul className="space-y-3">
                    {selectedProspect.objectionHandling.map((objection, idx) => (
                      <li key={idx} className="p-3 bg-accent-gold/10 rounded-lg">
                        <span className="text-paper-muted text-sm">{objection}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="font-display text-lg font-semibold text-paper mb-3 flex items-center gap-2">
                  <AwardIcon className="w-5 h-5 text-accent-indigo" />
                  Matched Case Studies
                </h3>
                <div className="space-y-4">
                  {selectedProspect.matchedCaseStudies.map((study, idx) => (
                    <div key={idx} className="p-4 bg-charcoal-medium rounded-lg">
                      <h4 className="font-medium text-paper mb-1">{study.title}</h4>
                      <p className="text-sm text-accent-indigo mb-2">{study.outcome}</p>
                      <p className="text-sm text-paper-muted italic">"{study.testimonial}"</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notes Section */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-display text-lg font-semibold text-paper flex items-center gap-2">
                    <CalendarIcon className="w-5 h-5 text-accent-indigo" />
                    Notes ({selectedProspect.notes?.length || 0})
                  </h3>
                  <button
                    onClick={() => setShowNotesModal(!showNotesModal)}
                    className="px-3 py-1.5 text-sm bg-accent-indigo/20 text-accent-indigo-glow rounded-lg hover:bg-accent-indigo/30 transition-colors flex items-center gap-1"
                  >
                    <PlusIcon className="w-3 h-3" />
                    Add Note
                  </button>
                </div>

                <AnimatePresence>
                  {showNotesModal && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mb-4 overflow-hidden"
                    >
                      <div className="bg-charcoal-medium rounded-lg p-4">
                        <textarea
                          value={newNote}
                          onChange={(e) => setNewNote(e.target.value)}
                          placeholder="Add a note about this prospect..."
                          rows={3}
                          className="w-full px-3 py-2 bg-charcoal border border-white/10 rounded-lg text-paper placeholder:text-paper-muted focus:outline-none focus:ring-2 focus:ring-accent-indigo/50 resize-none mb-3"
                        />
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => { setShowNotesModal(false); setNewNote(''); }}
                            className="px-4 py-2 text-sm border border-white/10 rounded-lg text-paper hover:bg-white/5 transition-colors"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => { addNote(); setShowNotesModal(false); }}
                            disabled={!newNote.trim()}
                            className="px-4 py-2 text-sm bg-accent-indigo text-white rounded-lg hover:bg-accent-indigo/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Save Note
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="space-y-3">
                  {(selectedProspect.notes || []).length === 0 ? (
                    <div className="text-center py-6 text-paper-muted text-sm">
                      No notes yet. Click "Add Note" to create one.
                    </div>
                  ) : (
                    (selectedProspect.notes || []).map((note) => (
                      <motion.div
                        key={note.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-charcoal-medium rounded-lg"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <span className="text-xs text-accent-indigo">
                            {note.author}
                          </span>
                          <span className="text-xs text-paper-muted">
                            {new Date(note.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-sm text-paper">{note.content}</p>
                      </motion.div>
                    ))
                  )}
                </div>
              </div>

              <div className="flex gap-4">
                <button className="flex-1 flex items-center justify-center gap-2 bg-accent-indigo text-white py-3 px-6 rounded-lg font-medium hover:bg-accent-indigo/90 transition-colors">
                  <PhoneIcon className="w-4 h-4" />
                  Schedule Call
                </button>
                <a
                  href={`mailto:${selectedProspect.email}`}
                  className="flex-1 flex items-center justify-center gap-2 border border-white/10 text-paper py-3 px-6 rounded-lg font-medium hover:bg-white/5 transition-colors"
                >
                  <CalendarIcon className="w-4 h-4" />
                  Send Email
                </a>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-charcoal-light rounded-2xl shadow-lg p-16 border border-white/5 text-center"
            >
              <div className="text-6xl mb-4">👋</div>
              <h3 className="font-display text-xl font-semibold text-paper mb-2">
                Select a Prospect
              </h3>
              <p className="text-paper-muted">
                Choose a prospect from the list to view detailed information and conversation tools
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
