// src/components/GettingStartedGuide.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Lightbulb, 
  Users, 
  Star, 
  Play, 
  CheckCircle, 
  ArrowRight,
  Sparkles,
  Target,
  TrendingUp,
  Award
} from 'lucide-react';
import Link from 'next/link';

export default function GettingStartedGuide() {
  const [activeTab, setActiveTab] = useState('resources');

  const resources = [
    {
      id: 'template',
      title: 'Pitch Deck Template',
      description: 'Download our industry-standard template to get started with your pitch deck',
      icon: FileText,
      category: 'template',
      difficulty: 'Beginner',
      duration: '30 min'
    },
    {
      id: 'guide',
      title: 'Story Structure Guide',
      description: 'Learn the essential elements that make pitch decks successful',
      icon: Lightbulb,
      category: 'guide',
      difficulty: 'Beginner',
      duration: '15 min'
    },
    {
      id: 'examples',
      title: 'Success Stories',
      description: 'Browse examples of pitch decks that secured funding and distribution',
      icon: Star,
      category: 'examples',
      difficulty: 'All Levels',
      duration: '20 min'
    },
    {
      id: 'community',
      title: 'Creator Community',
      description: 'Join our community of filmmakers and creators for support and feedback',
      icon: Users,
      category: 'community',
      difficulty: 'All Levels',
      duration: 'Instant'
    }
  ];

  const categories = [
    { id: 'resources', label: 'Resources', count: 4 },
    { id: 'guides', label: 'Guides', count: 3 },
    { id: 'templates', label: 'Templates', count: 2 },
    { id: 'examples', label: 'Examples', count: 5 }
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-3 px-6 py-2 bg-accent-indigo/10 rounded-full mb-6">
          <Sparkles className="w-5 h-5 text-accent-indigo" />
          <span className="text-sm font-medium text-accent-indigo">Just Getting Started</span>
        </div>
        
        <h2 className="font-display text-4xl md:text-5xl font-bold text-charcoal mb-6">
          Your Journey Starts Here
        </h2>
        
        <p className="text-xl text-charcoal/70 mb-8">
          Whether you're a first-time creator or looking to refine your approach, 
          we have everything you need to create a compelling pitch deck.
        </p>
      </div>

      {/* Quick Start Steps */}
      <div className="grid md:grid-cols-3 gap-8">
        {[
          {
            icon: Target,
            title: 'Define Your Vision',
            description: 'Clarify your story concept and target audience'
          },
          {
            icon: TrendingUp,
            title: 'Structure Your Pitch',
            description: 'Organize your content with proven storytelling frameworks'
          },
          {
            icon: Award,
            title: 'Polish & Present',
            description: 'Refine your deck for maximum impact and professional presentation'
          }
        ].map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl p-8 shadow-lg border border-charcoal/10 text-center"
          >
            <div className="w-16 h-16 bg-accent-indigo/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <step.icon className="w-8 h-8 text-accent-indigo" />
            </div>
            
            <h3 className="font-display text-xl font-bold text-charcoal mb-3">
              {step.title}
            </h3>
            
            <p className="text-charcoal/70">
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Resource Categories */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-charcoal/10">
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === category.id
                  ? 'bg-accent-indigo text-white'
                  : 'bg-charcoal/5 text-charcoal hover:bg-charcoal/10'
              }`}
            >
              {category.label} ({category.count})
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {resources.map((resource, index) => (
            <motion.div
              key={resource.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-4 p-6 bg-charcoal/5 rounded-xl hover:bg-charcoal/10 transition-colors cursor-pointer"
            >
              <div className="w-12 h-12 bg-accent-indigo/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <resource.icon className="w-6 h-6 text-accent-indigo" />
              </div>
              
              <div className="flex-1">
                <h3 className="font-semibold text-charcoal mb-2">{resource.title}</h3>
                <p className="text-charcoal/70 text-sm mb-3">{resource.description}</p>
                
                <div className="flex items-center gap-4 text-xs text-charcoal/60">
                  <span className="flex items-center gap-1">
                    <CheckCircle size={12} />
                    {resource.difficulty}
                  </span>
                  <span>{resource.duration}</span>
                </div>
              </div>
              
              <ArrowRight className="w-5 h-5 text-charcoal/40" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center">
        <div className="bg-gradient-to-r from-accent-indigo to-accent-gold rounded-2xl p-12 text-center text-white">
          <h3 className="font-display text-3xl font-bold mb-4">
            Ready to Start Your Journey?
          </h3>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Take the first step with our free story assessment and get personalized recommendations for your project.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/questionnaire"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-charcoal font-medium rounded-lg hover:bg-white/90 transition-colors"
            >
              Get Free Story Score
              <ArrowRight size={18} />
            </Link>
            
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/30 text-white font-medium rounded-lg hover:bg-white/10 transition-colors"
            >
              <Play size={18} />
              View Examples
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}