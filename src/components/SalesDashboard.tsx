'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Phone, MessageCircle, FileText, Award, TrendingUp, Clock, DollarSign } from 'lucide-react';

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
}

interface SalesDashboardProps {
  userRole?: string;
}

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
      ]
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
      ]
    }
  ]);

  const [selectedProspect, setSelectedProspect] = useState<Prospect | null>(null);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 text-center"
      >
        <h1 className="font-display text-4xl font-bold text-charcoal mb-4">
          Sales Rep Dashboard
        </h1>
        <p className="text-xl text-charcoal/70 max-w-3xl mx-auto">
          Comprehensive prospect information and conversation tools to close deals faster
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Prospects List */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-charcoal/10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl font-semibold text-charcoal">
                Prospects ({prospects.length})
              </h2>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 text-sm bg-accent-indigo/10 text-accent-indigo rounded-lg">
                  New
                </button>
                <button className="px-3 py-1.5 text-sm border border-charcoal/20 rounded-lg">
                  Filter
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {prospects.map((prospect, index) => (
                <motion.div
                  key={prospect.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setSelectedProspect(prospect)}
                  className={`p-4 rounded-xl cursor-pointer transition-all ${
                    selectedProspect?.id === prospect.id
                      ? 'bg-accent-indigo/10 border border-accent-indigo/20'
                      : 'bg-charcoal/5 hover:bg-charcoal/10 border border-transparent'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium text-charcoal">{prospect.name}</h3>
                      <p className="text-sm text-charcoal/60">{prospect.email}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Award className="w-4 h-4 text-accent-gold" />
                      <span className="text-sm font-medium text-charcoal">{prospect.storyScore}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 mt-3 text-sm text-charcoal/60">
                    <span className="flex items-center gap-1">
                      <FileText className="w-3 h-3" />
                      {prospect.format}
                    </span>
                    <span className="flex items-center gap-1">
                      <DollarSign className="w-3 h-3" />
                      {prospect.budget}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {prospect.timeline}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Prospect Detail */}
        <div className="lg:col-span-2">
          {selectedProspect ? (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-lg p-8 border border-charcoal/10"
            >
              <div className="flex items-start justify-between mb-8">
                <div>
                  <h2 className="font-display text-2xl font-bold text-charcoal mb-2">
                    {selectedProspect.name}
                  </h2>
                  <p className="text-charcoal/60">{selectedProspect.email}</p>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold bg-gradient-to-r from-accent-indigo to-accent-gold bg-clip-text text-transparent">
                    {selectedProspect.storyScore}/100
                  </div>
                  <div className="text-sm text-charcoal/60">Story Score</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="font-display text-lg font-semibold text-charcoal mb-3">Project Info</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm text-charcoal/60">Format</div>
                      <div className="font-medium">{selectedProspect.format}</div>
                    </div>
                    <div>
                      <div className="text-sm text-charcoal/60">Budget Range</div>
                      <div className="font-medium">{selectedProspect.budget}</div>
                    </div>
                    <div>
                      <div className="text-sm text-charcoal/60">Timeline</div>
                      <div className="font-medium">{selectedProspect.timeline}</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-display text-lg font-semibold text-charcoal mb-3">Story Concept</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm text-charcoal/60">Logline</div>
                      <div className="font-medium italic">"{selectedProspect.logline}"</div>
                    </div>
                    <div>
                      <div className="text-sm text-charcoal/60">Description</div>
                      <div className="text-sm text-charcoal/70">{selectedProspect.description}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="font-display text-lg font-semibold text-charcoal mb-3 flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 text-accent-indigo" />
                    Talking Points
                  </h3>
                  <ul className="space-y-3">
                    {selectedProspect.talkingPoints.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2 p-3 bg-accent-indigo/5 rounded-lg">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent-indigo mt-2 flex-shrink-0"></div>
                        <span className="text-charcoal/80 text-sm">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-display text-lg font-semibold text-charcoal mb-3 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-accent-gold" />
                    Objection Handling
                  </h3>
                  <ul className="space-y-3">
                    {selectedProspect.objectionHandling.map((objection, idx) => (
                      <li key={idx} className="p-3 bg-accent-gold/5 rounded-lg">
                        <span className="text-charcoal/80 text-sm">{objection}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="font-display text-lg font-semibold text-charcoal mb-3 flex items-center gap-2">
                  <Award className="w-5 h-5 text-accent-indigo" />
                  Matched Case Studies
                </h3>
                <div className="space-y-4">
                  {selectedProspect.matchedCaseStudies.map((study, idx) => (
                    <div key={idx} className="p-4 bg-charcoal/5 rounded-lg">
                      <h4 className="font-medium text-charcoal mb-1">{study.title}</h4>
                      <p className="text-sm text-accent-indigo mb-2">{study.outcome}</p>
                      <p className="text-sm text-charcoal/70 italic">"{study.testimonial}"</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <button className="flex-1 flex items-center justify-center gap-2 bg-accent-indigo text-white py-3 px-6 rounded-lg font-medium hover:bg-accent-indigo/90 transition-colors">
                  <Phone className="w-4 h-4" />
                  Schedule Call
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 border border-charcoal/20 text-charcoal py-3 px-6 rounded-lg font-medium hover:bg-charcoal/5 transition-colors">
                  <Calendar className="w-4 h-4" />
                  Add Note
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-2xl shadow-lg p-16 border border-charcoal/10 text-center"
            >
              <div className="text-6xl mb-4">👋</div>
              <h3 className="font-display text-xl font-semibold text-charcoal mb-2">
                Select a Prospect
              </h3>
              <p className="text-charcoal/60">
                Choose a prospect from the list to view detailed information and conversation tools
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}