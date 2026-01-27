'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Send, Loader2 } from 'lucide-react';

/**
 * Quick Lead Capture Form
 * For outbound campaigns (scraped leads from Reddit, LinkedIn, book authors)
 * Qualifies leads before human outreach
 */
interface LeadData {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  timeline: string;
  referredFrom?: string;
}

export default function LeadCaptureForm({
  source = 'direct',
  onCapture,
}: {
  source?: string;
  onCapture?: (data: LeadData) => void;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState<LeadData>({
    name: '',
    email: '',
    projectType: '',
    budget: '',
    timeline: '',
    referredFrom: source,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/lead-capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSuccess(true);
        onCapture?.(formData);
      }
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-green-50 border-2 border-green-200 rounded-2xl p-8 text-center"
      >
        <CheckCircle className="text-green-500 mx-auto mb-4" size={48} />
        <h3 className="font-display text-2xl font-bold text-green-800 mb-2">
          Thanks for your interest!
        </h3>
        <p className="text-green-700">
          We'll review your project and reach out within 24-48 hours with
          personalized feedback.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-charcoal mb-2">
          Your Name *
        </label>
        <input
          type="text"
          id="name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:ring-2 focus:ring-accent-indigo focus:border-transparent outline-none transition-all"
          placeholder="John Smith"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-charcoal mb-2">
          Email Address *
        </label>
        <input
          type="email"
          id="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:ring-2 focus:ring-accent-indigo focus:border-transparent outline-none transition-all"
          placeholder="john@example.com"
        />
      </div>

      <div>
        <label htmlFor="projectType" className="block text-sm font-medium text-charcoal mb-2">
          Project Type *
        </label>
        <select
          id="projectType"
          required
          value={formData.projectType}
          onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
          className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:ring-2 focus:ring-accent-indigo focus:border-transparent outline-none transition-all bg-white"
        >
          <option value="">Select one...</option>
          <option value="feature-film">Feature Film</option>
          <option value="tv-series">TV Series</option>
          <option value="documentary">Documentary</option>
          <option value="short-film">Short Film</option>
          <option value="web-series">Web Series</option>
          <option value="book-adaptation">Book Adaptation</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="budget" className="block text-sm font-medium text-charcoal mb-2">
            Budget Range *
          </label>
          <select
            id="budget"
            required
            value={formData.budget}
            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
            className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:ring-2 focus:ring-accent-indigo focus:border-transparent outline-none transition-all bg-white"
          >
            <option value="">Select...</option>
            <option value="exploring">Exploring</option>
            <option value="<5k">Under $5K</option>
            <option value="5-15k">$5K - $15K</option>
            <option value="15-50k">$15K - $50K</option>
            <option value="50k+">$50K+</option>
          </select>
        </div>

        <div>
          <label htmlFor="timeline" className="block text-sm font-medium text-charcoal mb-2">
            Timeline *
          </label>
          <select
            id="timeline"
            required
            value={formData.timeline}
            onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
            className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:ring-2 focus:ring-accent-indigo focus:border-transparent outline-none transition-all bg-white"
          >
            <option value="">Select...</option>
            <option value="asap">ASAP</option>
            <option value="1-3mo">1-3 months</option>
            <option value="3-6mo">3-6 months</option>
            <option value="6mo+">6+ months</option>
            <option value="flexible">Flexible</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-accent-indigo text-white font-medium rounded-lg hover:bg-accent-indigo/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-accent-indigo focus:ring-offset-2"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="animate-spin" size={20} />
            <span>Submitting...</span>
          </>
        ) : (
          <>
            <Send size={20} />
            <span>Get Free Assessment</span>
          </>
        )}
      </button>

      <p className="text-xs text-center text-charcoal/50">
        By submitting, you agree to our privacy policy. We'll never spam or share your information.
      </p>
    </form>
  );
}
