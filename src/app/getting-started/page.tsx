// src/app/getting-started/page.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Sparkles, FileText, Users, Star } from 'lucide-react';
import Link from 'next/link';

export default function GettingStartedPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    timeline: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call to store lead
    await new Promise(resolve => setTimeout(resolve, 1000));

    setSubmitted(true);
    setLoading(false);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-paper to-charcoal/5 py-20 flex items-center">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl shadow-xl p-12 border border-charcoal/10"
          >
            <div className="inline-flex items-center justify-center p-4 bg-accent-indigo/10 rounded-full mb-6">
              <CheckCircle className="w-12 h-12 text-accent-indigo" />
            </div>
            <h1 className="font-display text-3xl font-bold text-charcoal mb-4">
              Thank You!
            </h1>
            <p className="text-lg text-charcoal/70 mb-6">
              We've received your information and will be in touch shortly with resources to help you get started on your pitch deck.
            </p>
            <Link 
              href="/"
              className="inline-block bg-accent-indigo text-white py-3 px-8 rounded-lg font-medium hover:bg-accent-indigo/90 transition-colors"
            >
              Back to Home
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-paper to-charcoal/5 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-accent-indigo/10 border border-accent-indigo/20 mb-6">
            <Star className="w-4 h-4 text-accent-indigo" />
            <span className="text-sm font-medium text-accent-indigo">
              Just Getting Started
            </span>
          </div>
          
          <h1 className="font-display text-5xl md:text-6xl font-bold text-charcoal mb-6">
            Getting Started with Your Pitch Deck
          </h1>
          <p className="text-xl text-charcoal/70 max-w-3xl mx-auto">
            Whether you're just beginning your journey or need foundational resources, we're here to help you every step of the way.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Benefits Section */}
          <div>
            <h2 className="font-display text-3xl font-bold text-charcoal mb-8">What We Offer Beginners</h2>
            
            <div className="space-y-6">
              {[
                {
                  icon: FileText,
                  title: "Educational Resources",
                  description: "Access our library of guides, templates, and best practices for creating effective pitch decks."
                },
                {
                  icon: Users,
                  title: "Community Support",
                  description: "Connect with other creators and get advice from our community of filmmakers and entrepreneurs."
                },
                {
                  icon: Sparkles,
                  title: "Foundation Building",
                  description: "Learn the fundamentals of storytelling, market positioning, and investor readiness."
                }
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-sm border border-charcoal/10"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-accent-indigo/10 rounded-lg flex items-center justify-center">
                    <benefit.icon className="w-6 h-6 text-accent-indigo" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-charcoal mb-1">{benefit.title}</h3>
                    <p className="text-charcoal/70">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Form Section */}
          <div>
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-charcoal/10 sticky top-8">
              <h2 className="font-display text-2xl font-bold text-charcoal mb-6">
                Tell Us About Your Project
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-charcoal mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:ring-2 focus:ring-accent-indigo focus:border-transparent transition-all"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-charcoal mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:ring-2 focus:ring-accent-indigo focus:border-transparent transition-all"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label htmlFor="projectType" className="block text-sm font-medium text-charcoal mb-2">
                    Project Type
                  </label>
                  <select
                    id="projectType"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:ring-2 focus:ring-accent-indigo focus:border-transparent transition-all"
                  >
                    <option value="">Select your project type</option>
                    <option value="feature-film">Feature Film</option>
                    <option value="tv-series">TV Series</option>
                    <option value="documentary">Documentary</option>
                    <option value="short-film">Short Film</option>
                    <option value="digital-content">Digital Content</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="timeline" className="block text-sm font-medium text-charcoal mb-2">
                    Timeline
                  </label>
                  <select
                    id="timeline"
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:ring-2 focus:ring-accent-indigo focus:border-transparent transition-all"
                  >
                    <option value="">Select your timeline</option>
                    <option value="just-starting">Just getting started</option>
                    <option value="3-6-months">3-6 months</option>
                    <option value="6-12-months">6-12 months</option>
                    <option value="12-months-plus">12+ months</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-accent-indigo text-white py-4 px-6 rounded-lg font-medium hover:bg-accent-indigo/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Processing...
                    </>
                  ) : (
                    'Get Started Resources'
                  )}
                </button>
              </form>

              <p className="text-sm text-charcoal/60 mt-4 text-center">
                We'll send you a starter kit with resources tailored to your project.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}