'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Check, Sparkles } from 'lucide-react';

// Types for form data
export interface TeaserScore {
  overall: number;
  category: string;
  budgetTier: string;
}

export interface QuestionnaireData {
  // Step 1: Emotional Connection
  timeline: string;
  personalMeaning: string[];
  projectFor: string;

  // Step 2: Creative Scope
  format: string;
  materials: string[];
  excitedParts: string[];
  involvement: string;

  // Step 3: Timing + Investment (KEY QUALIFICATION)
  startTiming: string;
  budget: string;

  // Step 4: Story Summary
  logline: string;
  description: string;

  // Step 5: Contact (captured at END)
  name: string;
  email: string;
  phone?: string;
  wantConsult: boolean;
}

const STEPS = [
  { title: 'Your Journey', subtitle: 'Tell us about your story' },
  { title: 'Format & Materials', subtitle: 'What shape is your vision?' },
  { title: 'Timeline & Investment', subtitle: 'Help us understand your goals' },
  { title: 'Your Story', subtitle: 'Share your vision' },
  { title: 'Your Results', subtitle: 'One last step' },
];

interface StoryQuestionnaireProps {
  onComplete?: (data: QuestionnaireData, score?: TeaserScore) => void;
}

export default function StoryQuestionnaire({ onComplete }: StoryQuestionnaireProps) {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<QuestionnaireData>({
    // Default values - no email upfront!
    name: '',
    email: '',
    phone: '',
    timeline: '',
    personalMeaning: [],
    projectFor: '',
    format: '',
    materials: [],
    excitedParts: [],
    involvement: '',
    startTiming: '',
    budget: '',
    logline: '',
    description: '',
    wantConsult: false,
  });

  // Calculate progress (now 5 steps instead of 6)
  const progress = ((step + 1) / STEPS.length) * 100;

  const handleNext = () => {
    if (step < STEPS.length - 1) {
      setDirection(1);
      setStep(step + 1);
    }
  };

  const handlePrev = () => {
    if (step > 0) {
      setDirection(-1);
      setStep(step - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/questionnaire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        onComplete?.(formData, result.teaserScore);
      } else {
        // Handle validation errors
        console.error('Submission failed:', result);
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Network error:', error);
      setIsSubmitting(false);
    }
  };

  const updateFormData = (field: keyof QuestionnaireData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleArrayItem = (field: keyof QuestionnaireData, value: string) => {
    setFormData((prev) => {
      const arr = prev[field] as string[];
      return {
        ...prev,
        [field]: arr.includes(value)
          ? arr.filter((item) => item !== value)
          : [...arr, value],
      };
    });
  };

  return (
    <div className="min-h-screen bg-paper py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-charcoal/70">
              Step {step + 1} of {STEPS.length}
            </span>
            <span className="text-sm text-charcoal/50">{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-charcoal/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-accent-indigo to-accent-gold"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mt-4"
          >
            <p className="text-charcoal font-display text-xl">
              {STEPS[step].title}
            </p>
            <p className="text-charcoal/60 text-sm">{STEPS[step].subtitle}</p>
          </motion.div>
        </div>

        {/* Form Steps */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={step}
              initial={{ opacity: 0, x: direction > 0 ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -50 : 50 }}
              transition={{ duration: 0.3 }}
            >
              {/* STEP 1: Emotional Connection (NO EMAIL!) */}
              {step === 0 && (
                <div className="space-y-6">
                  <p className="text-charcoal/70">
                    This helps us understand your journey and what this project
                    means to you. No commitment, just discovery.
                  </p>

                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-3">
                      How long have you been working on this story?
                    </label>
                    <div className="space-y-2">
                      {[
                        'Just started – it\'s a new idea',
                        'A few months – I\'ve been slowly building it',
                        '1–2 years – this project matters deeply to me',
                        '3+ years – this story has been in my heart a long time',
                        'I haven\'t started yet – but I know it needs to exist',
                      ].map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => updateFormData('timeline', option)}
                          className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-all ${
                            formData.timeline === option
                              ? 'border-accent-indigo bg-accent-indigo/10'
                              : 'border-charcoal/20 hover:border-charcoal/40'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                formData.timeline === option
                                  ? 'border-accent-indigo bg-accent-indigo'
                                  : 'border-charcoal/30'
                              }`}
                            >
                              {formData.timeline === option && (
                                <Check size={14} className="text-white" />
                              )}
                            </div>
                            <span className="text-sm">{option}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-3">
                      What does this project mean to you personally?
                      <span className="text-charcoal/50 font-normal">
                        {' '}
                        (Select all that apply)
                      </span>
                    </label>
                    <div className="space-y-2">
                      {[
                        'It\'s my baby – I\'ve poured my heart into it',
                        'It\'s based on my life or someone close to me',
                        'It\'s a story I believe the world needs to hear',
                        'It\'s a creative idea I\'m exploring',
                        'It\'s a tribute or legacy project',
                      ].map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => toggleArrayItem('personalMeaning', option)}
                          className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-all ${
                            formData.personalMeaning.includes(option)
                              ? 'border-accent-indigo bg-accent-indigo/10'
                              : 'border-charcoal/20 hover:border-charcoal/40'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                                formData.personalMeaning.includes(option)
                                  ? 'border-accent-indigo bg-accent-indigo'
                                  : 'border-charcoal/30'
                              }`}
                            >
                              {formData.personalMeaning.includes(option) && (
                                <Check size={14} className="text-white" />
                              )}
                            </div>
                            <span className="text-sm">{option}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-3">
                      Who is this project for?
                    </label>
                    <div className="space-y-2">
                      {[
                        'Me – I want to see it come to life',
                        'Someone else – I\'m helping them develop it',
                        'A larger audience – I think it has commercial/streaming potential',
                        'Not sure yet – I just know it deserves attention',
                      ].map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => updateFormData('projectFor', option)}
                          className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-all ${
                            formData.projectFor === option
                              ? 'border-accent-indigo bg-accent-indigo/10'
                              : 'border-charcoal/20 hover:border-charcoal/40'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                formData.projectFor === option
                                  ? 'border-accent-indigo bg-accent-indigo'
                                  : 'border-charcoal/30'
                              }`}
                            >
                              {formData.projectFor === option && (
                                <Check size={14} className="text-white" />
                              )}
                            </div>
                            <span className="text-sm">{option}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Creative Scope */}
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-3">
                      What form do you envision this story taking?
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {['Feature Film', 'Limited Series / TV Show', 'Documentary', 'Animation'].map(
                        (option) => (
                          <button
                            key={option}
                            type="button"
                            onClick={() => updateFormData('format', option)}
                            className={`px-4 py-3 rounded-lg border-2 text-sm transition-all ${
                              formData.format === option
                                ? 'border-accent-indigo bg-accent-indigo/10 text-accent-indigo'
                                : 'border-charcoal/20 hover:border-charcoal/40'
                            }`}
                          >
                            {option}
                          </button>
                        )
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-3">
                      What materials do you currently have?
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {[
                        'Finished book/manuscript',
                        'Journal, notes, or outline',
                        'A script or draft',
                        'A pitch deck',
                        'Just an idea',
                      ].map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => toggleArrayItem('materials', option)}
                          className={`px-4 py-2 rounded-full border-2 text-sm transition-all ${
                            formData.materials.includes(option)
                              ? 'border-accent-indigo bg-accent-indigo/10 text-accent-indigo'
                              : 'border-charcoal/20 hover:border-charcoal/40'
                          }`}
                        >
                          {formData.materials.includes(option) && (
                            <Check size={14} className="inline mr-1" />
                          )}
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-3">
                      Which part excites you most?
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        'Screenplay writing',
                        'Pitch deck creation',
                        'Budget & schedule',
                        'Talent attachment',
                        'Full packaging',
                      ].map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => toggleArrayItem('excitedParts', option)}
                          className={`px-4 py-3 rounded-lg border-2 text-sm transition-all ${
                            formData.excitedParts.includes(option)
                              ? 'border-accent-indigo bg-accent-indigo/10'
                              : 'border-charcoal/20 hover:border-charcoal/40'
                          }`}
                        >
                          {formData.excitedParts.includes(option) && (
                            <Check size={14} className="inline mr-1" />
                          )}
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-3">
                      How involved do you want to be?
                    </label>
                    <div className="space-y-2">
                      {[
                        'Very involved — part of every step',
                        'Collaborative — trust the team',
                        'Hands-off — let professionals handle it',
                      ].map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => updateFormData('involvement', option)}
                          className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-all ${
                            formData.involvement === option
                              ? 'border-accent-indigo bg-accent-indigo/10'
                              : 'border-charcoal/20 hover:border-charcoal/40'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                formData.involvement === option
                                  ? 'border-accent-indigo bg-accent-indigo'
                                  : 'border-charcoal/30'
                              }`}
                            >
                              {formData.involvement === option && (
                                <Check size={14} className="text-white" />
                              )}
                            </div>
                            <span className="text-sm">{option}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: Timing + Investment (BUDGET QUALIFICATION) */}
              {step === 2 && (
                <div className="space-y-6">
                  <p className="text-charcoal/70">
                    This helps us recommend the right path for your project. No wrong answers.
                  </p>

                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-3">
                      When are you hoping to start?
                    </label>
                    <div className="space-y-2">
                      {[
                        'ASAP – I\'m ready now',
                        'Within 1–3 months',
                        'This year – need to prepare first',
                        'Just exploring – not sure yet',
                      ].map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => updateFormData('startTiming', option)}
                          className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-all ${
                            formData.startTiming === option
                              ? 'border-accent-indigo bg-accent-indigo/10'
                              : 'border-charcoal/20 hover:border-charcoal/40'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                formData.startTiming === option
                                  ? 'border-accent-indigo bg-accent-indigo'
                                  : 'border-charcoal/30'
                              }`}
                            >
                              {formData.startTiming === option && (
                                <Check size={14} className="text-white" />
                              )}
                            </div>
                            <span className="text-sm">{option}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-3">
                      What level of investment are you considering?
                    </label>
                    <p className="text-xs text-charcoal/50 mb-3">
                      This helps us tailor our recommendations to your situation
                    </p>
                    <div className="space-y-2">
                      {[
                        {
                          label: 'Exploring ($0-$5K)',
                          value: '<$5K',
                          desc: 'Just starting out, want to understand options',
                        },
                        {
                          label: 'Specific Parts ($5K-$15K)',
                          value: '$5-15K',
                          desc: 'Interested in pitch deck or specific services',
                        },
                        {
                          label: 'Serious About This ($15K-$50K)',
                          value: '$15-50K',
                          desc: 'Ready to meaningfully invest in packaging',
                        },
                        {
                          label: 'Full Package ($50K+)',
                          value: '$50K+',
                          desc: 'Want studio-caliber packaging from A-Z',
                        },
                        {
                          label: 'Not Sure Yet',
                          value: 'unsure',
                          desc: 'I\'d love to talk with someone first',
                        },
                      ].map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => updateFormData('budget', option.value)}
                          className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-all ${
                            formData.budget === option.value
                              ? 'border-accent-indigo bg-accent-indigo/10'
                              : 'border-charcoal/20 hover:border-charcoal/40'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div
                              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                                formData.budget === option.value
                                  ? 'border-accent-indigo bg-accent-indigo'
                                  : 'border-charcoal/30'
                              }`}
                            >
                              {formData.budget === option.value && (
                                <Check size={14} className="text-white" />
                              )}
                            </div>
                            <div>
                              <span className="text-sm font-medium block">{option.label}</span>
                              {option.desc && (
                                <span className="text-xs text-charcoal/50 block">
                                  {option.desc}
                                </span>
                              )}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: Story Summary */}
              {step === 3 && (
                <div className="space-y-6">
                  <p className="text-charcoal/70">
                    Now share your story with us. This is what our team will evaluate.
                  </p>

                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      Your logline (one sentence summary)
                    </label>
                    <textarea
                      value={formData.logline}
                      onChange={(e) => updateFormData('logline', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:ring-2 focus:ring-accent-indigo focus:border-transparent resize-none"
                      placeholder="In a world where... a hero must..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      Tell us more (optional but helpful)
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => updateFormData('description', e.target.value)}
                      rows={5}
                      className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:ring-2 focus:ring-accent-indigo focus:border-transparent resize-none"
                      placeholder="Share your story, characters, themes, or whatever feels important..."
                    />
                  </div>
                </div>
              )}

              {/* STEP 5: Contact + Submit (AFTER investment!) */}
              {step === 4 && (
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-accent-indigo/10 to-accent-gold/10 -m-6 mt-0 p-6 rounded-t-2xl">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles size={20} className="text-accent-indigo" />
                      <span className="font-display text-lg font-bold text-charcoal">
                        Almost Done!
                      </span>
                    </div>
                    <p className="text-charcoal/70 text-sm">
                      We'll analyze your story and send you a free professional evaluation.
                      Your full report will arrive by email within minutes.
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      Your name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => updateFormData('name', e.target.value)}
                      className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:ring-2 focus:ring-accent-indigo focus:border-transparent"
                      placeholder="First name is fine"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      Your email address
                    </label>
                    <p className="text-xs text-charcoal/50 mb-2">
                      We'll send your full story analysis here
                    </p>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateFormData('email', e.target.value)}
                      className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:ring-2 focus:ring-accent-indigo focus:border-transparent"
                      placeholder="you@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-3">
                      Would you like a free follow-up consultation?
                    </label>
                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={() => updateFormData('wantConsult', true)}
                        className={`flex-1 px-6 py-4 rounded-lg border-2 transition-all ${
                          formData.wantConsult
                            ? 'border-accent-indigo bg-accent-indigo/10 text-accent-indigo'
                            : 'border-charcoal/20 hover:border-charcoal/40'
                        }`}
                      >
                        Yes, please!
                      </button>
                      <button
                        type="button"
                        onClick={() => updateFormData('wantConsult', false)}
                        className={`flex-1 px-6 py-4 rounded-lg border-2 transition-all ${
                          !formData.wantConsult
                            ? 'border-accent-indigo bg-accent-indigo/10 text-accent-indigo'
                            : 'border-charcoal/20 hover:border-charcoal/40'
                        }`}
                      >
                        Not right now
                      </button>
                    </div>
                  </div>

                  {formData.wantConsult && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                    >
                      <label className="block text-sm font-medium text-charcoal mb-2">
                        Phone number (for consultation)
                      </label>
                      <input
                        type="tel"
                        value={formData.phone || ''}
                        onChange={(e) => updateFormData('phone', e.target.value)}
                        className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:ring-2 focus:ring-accent-indigo focus:border-transparent"
                        placeholder="(optional)"
                      />
                    </motion.div>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex gap-4 mt-8 pt-6 border-t border-charcoal/10">
            {step > 0 && (
              <button
                type="button"
                onClick={handlePrev}
                className="flex items-center gap-2 px-6 py-3 border-2 border-charcoal/20 text-charcoal rounded-lg hover:border-charcoal/40 transition-colors"
              >
                <ArrowLeft size={18} />
                Back
              </button>
            )}

            <div className="flex-1" />

            {step < STEPS.length - 1 ? (
              <button
                type="button"
                onClick={handleNext}
                disabled={
                  (step === 2 && !formData.budget) ||
                  (step === 3 && !formData.logline)
                }
                className="flex items-center gap-2 px-6 py-3 bg-accent-indigo text-white rounded-lg hover:bg-accent-indigo/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
                <ArrowRight size={18} />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting || !formData.name || !formData.email || !formData.logline}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-accent-indigo to-accent-gold text-white font-medium rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Analyzing...' : 'Get My Free Story Score'}
                <Sparkles size={18} />
              </button>
            )}
          </div>
        </div>

        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-6 text-sm text-charcoal/50"
        >
          No judgment zone • Our team has helped 100+ creators shape their stories
        </motion.div>
      </div>
    </div>
  );
}
