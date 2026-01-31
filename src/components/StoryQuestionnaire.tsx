'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, ArrowLeft, Check, Sparkles, Loader2 } from 'lucide-react';
import LoadingScreen from '@/components/LoadingScreen';
import { FileUpload, UploadedFile } from '@/components/FileUpload';
import { UploadedFileDisplay } from '@/components/FileUpload';
import { extractTextFromFile, truncateText } from '@/lib/extract-text';
import MilestoneCelebration from '@/components/ui/MilestoneCelebration';
import MagneticButton from '@/components/ui/MagneticButton';

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
  uploadedFile?: {
    url: string;
    name: string;
    extractedText?: string;
  };

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

// Define questions for each step
const QUESTIONS = [
  // Step 0: Your Journey (3 questions)
  [
    {
      id: 'timeline',
      label: 'How long have you been working on this story?',
      type: 'single',
      options: [
        'Just started – it\'s a new idea',
        'A few months – I\'ve been slowly building it',
        '1–2 years – this project matters deeply to me',
        '3+ years – this story has been in my heart a long time',
        'I haven\'t started yet – but I know it needs to exist',
      ],
    },
    {
      id: 'personalMeaning',
      label: 'What does this project mean to you personally?',
      sublabel: '(Select all that apply)',
      type: 'multiple',
      options: [
        'It\'s my baby – I\'ve poured my heart into it',
        'It\'s based on my life or someone close to me',
        'It\'s a story I believe the world needs to hear',
        'It\'s a creative idea I\'m exploring',
        'It\'s a tribute or legacy project',
      ],
    },
    {
      id: 'projectFor',
      label: 'Who is this project for?',
      type: 'single',
      options: [
        'Me – I want to see it come to life',
        'Someone else – I\'m helping them develop it',
        'A larger audience – I think it has commercial/streaming potential',
        'Not sure yet – I just know it deserves attention',
      ],
    },
  ],
  // Step 1: Format & Materials (4 questions)
  [
    {
      id: 'format',
      label: 'What form do you envision this story taking?',
      type: 'single',
      options: ['Feature Film', 'Limited Series / TV Show', 'Documentary', 'Animation'],
      grid: true,
    },
    {
      id: 'materials',
      label: 'What materials do you currently have?',
      type: 'multiple',
      options: [
        'Finished book/manuscript',
        'Journal, notes, or outline',
        'A script or draft',
        'A pitch deck',
        'Just an idea',
      ],
      chips: true,
    },
    {
      id: 'excitedParts',
      label: 'Which part excites you most?',
      type: 'multiple',
      options: [
        'Screenplay writing',
        'Pitch deck creation',
        'Budget & schedule',
        'Talent attachment',
        'Full packaging',
      ],
      grid: true,
    },
    {
      id: 'involvement',
      label: 'How involved do you want to be?',
      type: 'single',
      options: [
        'Very involved — part of every step',
        'Collaborative — trust the team',
        'Hands-off — let professionals handle it',
      ],
    },
  ],
  // Step 2: Timeline & Investment (2 questions)
  [
    {
      id: 'startTiming',
      label: 'When are you hoping to start?',
      type: 'single',
      options: [
        'ASAP – I\'m ready now',
        'Within 1–3 months',
        'This year – need to prepare first',
        'Just exploring – not sure yet',
      ],
    },
    {
      id: 'budget',
      label: 'What level of investment are you considering?',
      sublabel: 'This helps us tailor our recommendations to your situation',
      type: 'single',
      options: [
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
      ],
      detailed: true,
    },
  ],
  // Step 3: Your Story (3 questions - file upload, logline, description)
  [
    {
      id: 'fileUpload',
      label: 'Upload Your Story',
      sublabel: '(PDF, DOCX, MD, TXT up to 10MB)',
      type: 'file',
    },
    {
      id: 'logline',
      label: 'Your logline (one sentence summary)',
      type: 'textarea',
      placeholder: 'In a world where... a hero must...',
      rows: 3,
    },
    {
      id: 'description',
      label: 'Tell us more (optional but helpful)',
      type: 'textarea',
      placeholder: 'Share your story, characters, themes, or whatever feels important...',
      rows: 5,
    },
  ],
  // Step 4: Contact (3 questions)
  [
    {
      id: 'name',
      label: 'Your name',
      type: 'text',
      placeholder: 'First name is fine',
    },
    {
      id: 'email',
      label: 'Your email address',
      sublabel: 'We\'ll send your full story analysis here',
      type: 'email',
      placeholder: 'you@email.com',
    },
    {
      id: 'wantConsult',
      label: 'Would you like a free follow-up consultation?',
      type: 'boolean',
      options: ['Yes, please!', 'Not right now'],
    },
  ],
];

interface StoryQuestionnaireProps {
  onComplete?: (data: QuestionnaireData, score?: TeaserScore, leadId?: string) => void;
}

export default function StoryQuestionnaire({ onComplete }: StoryQuestionnaireProps) {
  const [step, setStep] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  const [extractedText, setExtractedText] = useState('');
  const [isExtracting, setIsExtracting] = useState(false);
  const [inputMode, setInputMode] = useState<'upload' | 'type'>('upload');
  const [showMilestone, setShowMilestone] = useState(false);
  const [milestoneMessage, setMilestoneMessage] = useState('');
  const [previousProgress, setPreviousProgress] = useState(0);
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

  // Calculate total questions and current progress
  const totalQuestions = QUESTIONS.reduce((sum, stepQuestions) => sum + stepQuestions.length, 0);
  const currentQuestionNumber = QUESTIONS.slice(0, step).reduce((sum, q) => sum + q.length, 0) + questionIndex + 1;
  const progress = (currentQuestionNumber / totalQuestions) * 100;

  // Check for milestones and trigger celebrations
  useEffect(() => {
    const milestones = [25, 50, 75, 100];
    const currentMilestone = milestones.find(m => progress >= m && previousProgress < m);
    
    if (currentMilestone) {
      const messages = {
        25: "Great start! You're 25% done",
        50: "Halfway there! Keep going!",
        75: "Almost done! You're at 75%",
        100: "Complete! 🎉"
      };
      setMilestoneMessage(messages[currentMilestone as keyof typeof messages]);
      setShowMilestone(true);
    }
    
    setPreviousProgress(progress);
  }, [progress, previousProgress]);

  const getCurrentQuestion = () => {
    return QUESTIONS[step]?.[questionIndex];
  };

  const canGoNext = () => {
    const question = getCurrentQuestion();
    if (!question) return false;

    // Special validation for specific questions
    if (question.id === 'budget' && !formData.budget) return false;
    if (question.id === 'logline' && !formData.logline && !uploadedFile && !extractedText) return false;
    if (question.id === 'name' && !formData.name) return false;
    if (question.id === 'email' && !formData.email) return false;

    return true;
  };

  const handleNext = () => {
    const currentStepQuestions = QUESTIONS[step];
    
    // Move to next question in current step
    if (questionIndex < currentStepQuestions.length - 1) {
      setDirection(1);
      setQuestionIndex(questionIndex + 1);
    } 
    // Move to next step
    else if (step < STEPS.length - 1) {
      setDirection(1);
      setStep(step + 1);
      setQuestionIndex(0);
    }
  };

  const handlePrev = () => {
    // Move to previous question in current step
    if (questionIndex > 0) {
      setDirection(-1);
      setQuestionIndex(questionIndex - 1);
    } 
    // Move to previous step
    else if (step > 0) {
      setDirection(-1);
      setStep(step - 1);
      setQuestionIndex(QUESTIONS[step - 1].length - 1);
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
        // Pass leadId if available for async processing tracking
        onComplete?.(formData, result.teaserScore, result.leadId);
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

  const handleFileUpload = async (file: UploadedFile) => {
    setUploadedFile(file);
    setIsExtracting(true);

    try {
      const response = await fetch(file.url);
      const blob = await response.blob();
      const fileObj = new File([blob], file.name, { type: file.type });

      const result = await extractTextFromFile(fileObj);

      if (result.error) {
        console.error('Text extraction failed:', result.error);
        setExtractedText('');
      } else {
        const truncated = truncateText(result.text, 10000);
        setExtractedText(truncated);

        // Auto-fill logline if empty
        if (!formData.logline.trim() && result.text) {
          const firstLine = result.text.split('\n')[0].substring(0, 200);
          updateFormData('logline', firstLine);
        }

        // Store in form data
        updateFormData('uploadedFile', {
          url: file.url,
          name: file.name,
          extractedText: truncated,
        });
      }
    } catch (err) {
      console.error('Failed to extract text from file:', err);
      setExtractedText('');
    } finally {
      setIsExtracting(false);
    }
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    setExtractedText('');
    updateFormData('uploadedFile', undefined);
  };

  return (
    <>
    <div className="min-h-screen bg-paper py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Enhanced Progress Bar with Step Indicators */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-charcoal/70">
              Question {currentQuestionNumber} of {totalQuestions}
            </span>
            <span className="text-sm text-charcoal/50 font-semibold">{Math.round(progress)}%</span>
          </div>
          
          {/* Step Indicators */}
          <div className="flex items-center justify-between mb-3">
            {STEPS.map((stepItem, idx) => {
              const stepStart = QUESTIONS.slice(0, idx).reduce((sum, q) => sum + q.length, 0);
              const stepEnd = stepStart + QUESTIONS[idx].length;
              const stepProgress = idx < step 
                ? 100 
                : idx === step 
                  ? ((questionIndex + 1) / QUESTIONS[idx].length) * 100
                  : 0;
              
              return (
                <div key={idx} className="flex-1 flex items-center">
                  <div className="flex-1 flex flex-col items-center">
                    <motion.div
                      className={`w-10 h-10 rounded-full flex items-center justify-center border-2 font-semibold text-sm transition-all ${
                        idx < step
                          ? 'bg-accent-indigo border-accent-indigo text-white'
                          : idx === step
                            ? 'bg-accent-indigo/20 border-accent-indigo text-accent-indigo'
                            : 'bg-charcoal/10 border-charcoal/20 text-charcoal/40'
                      }`}
                      animate={{ 
                        scale: idx === step ? [1, 1.1, 1] : 1 
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: idx === step ? Infinity : 0
                      }}
                    >
                      {idx < step ? (
                        <Check size={18} />
                      ) : (
                        idx + 1
                      )}
                    </motion.div>
                    <p className={`text-xs mt-2 text-center max-w-[60px] ${
                      idx === step ? 'text-charcoal font-medium' : 'text-charcoal/40'
                    }`}>
                      {stepItem.title.split(' ')[0]}
                    </p>
                  </div>
                  {idx < STEPS.length - 1 && (
                    <div className="flex-1 h-0.5 mx-2 bg-charcoal/10 relative overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-accent-indigo to-accent-gold"
                        initial={{ width: 0 }}
                        animate={{ width: idx < step ? '100%' : '0%' }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Progress Bar */}
          <div className="h-3 bg-charcoal/10 rounded-full overflow-hidden shadow-inner">
            <motion.div
              className="h-full bg-gradient-to-r from-accent-indigo via-accent-gold to-accent-indigo relative overflow-hidden"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{
                  x: ['-100%', '200%']
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'linear'
                }}
              />
            </motion.div>
          </div>

          <motion.div
            key={`${step}-${questionIndex}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mt-4"
          >
            <p className="text-charcoal font-display text-xl font-bold">
              {STEPS[step].title}
            </p>
            <p className="text-charcoal/60 text-sm mt-1">{STEPS[step].subtitle}</p>
          </motion.div>
        </div>

        {/* Form Steps */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={`${step}-${questionIndex}`}
              initial={{ opacity: 0, x: direction > 0 ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -50 : 50 }}
              transition={{ duration: 0.3 }}
            >
              {(() => {
                const question = getCurrentQuestion();
                if (!question) return null;

                // Show intro text only for first question of each step
                const showIntro = questionIndex === 0;
                const introTexts = [
                  'This helps us understand your journey and what this project means to you. No commitment, just discovery.',
                  '',
                  'This helps us recommend the right path for your project. No wrong answers.',
                  'Now share your story with us. Upload a file or enter it directly.',
                  '',
                ];

                return (
                  <div className="space-y-6">
                    {showIntro && introTexts[step] && (
                      <p className="text-charcoal/70">{introTexts[step]}</p>
                    )}

                    {/* Render question based on type */}
                    {question.type === 'single' && 'options' in question && (
                      <div>
                        <label className="block text-sm font-medium text-charcoal mb-3">
                          {question.label}
                          {'sublabel' in question && question.sublabel && (
                            <span className="text-charcoal/50 font-normal ml-2">
                              {question.sublabel}
                            </span>
                          )}
                        </label>
                        {'detailed' in question && question.detailed ? (
                          <div className="space-y-3">
                            {question.options.map((option: any) => {
                              const isSelected = formData[question.id as keyof QuestionnaireData] === option.value;
                              return (
                                <motion.button
                                  key={option.value}
                                  type="button"
                                  onClick={() => updateFormData(question.id as keyof QuestionnaireData, option.value)}
                                  whileHover={{ scale: 1.01, x: 4 }}
                                  whileTap={{ scale: 0.99 }}
                                  animate={{
                                    scale: isSelected ? 1.02 : 1,
                                    boxShadow: isSelected 
                                      ? '0 8px 24px rgba(99, 102, 241, 0.25)' 
                                      : '0 2px 8px rgba(0, 0, 0, 0.08)'
                                  }}
                                  transition={{ duration: 0.2 }}
                                  className={`relative w-full text-left px-5 py-4 rounded-xl border-2 transition-all ${
                                    isSelected
                                      ? 'border-accent-indigo bg-gradient-to-r from-accent-indigo/15 to-accent-indigo/5'
                                      : 'border-charcoal/20 bg-white hover:border-accent-indigo/40 hover:bg-charcoal/5'
                                  }`}
                                >
                                  {isSelected && (
                                    <motion.div
                                      layoutId="detailedCardGlow"
                                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-accent-indigo/10 via-accent-gold/10 to-accent-indigo/10"
                                      initial={false}
                                      transition={{ duration: 0.3 }}
                                    />
                                  )}
                                  <div className="flex items-start gap-4 relative z-10">
                                    <motion.div
                                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                                        isSelected
                                          ? 'border-accent-indigo bg-accent-indigo'
                                          : 'border-charcoal/30 bg-white'
                                      }`}
                                      animate={{
                                        scale: isSelected ? [1, 1.2, 1] : 1
                                      }}
                                      transition={{ duration: 0.3 }}
                                    >
                                      {isSelected && (
                                        <motion.div
                                          initial={{ scale: 0, rotate: -180 }}
                                          animate={{ scale: 1, rotate: 0 }}
                                          transition={{ delay: 0.1 }}
                                        >
                                          <Check size={14} className="text-white" />
                                        </motion.div>
                                      )}
                                    </motion.div>
                                    <div>
                                      <span className={`text-sm font-medium block ${isSelected ? 'text-accent-indigo' : 'text-charcoal'}`}>
                                        {option.label}
                                      </span>
                                      {option.desc && (
                                        <span className="text-xs text-charcoal/50 block mt-1">{option.desc}</span>
                                      )}
                                    </div>
                                  </div>
                                </motion.button>
                              );
                            })}
                          </div>
                        ) : 'grid' in question && question.grid ? (
                          <div className="grid grid-cols-2 gap-2">
                            {question.options.map((option: string) => (
                              <button
                                key={option}
                                type="button"
                                onClick={() => updateFormData(question.id as keyof QuestionnaireData, option)}
                                className={`px-4 py-3 rounded-lg border-2 text-sm transition-all ${
                                  formData[question.id as keyof QuestionnaireData] === option
                                    ? 'border-accent-indigo bg-accent-indigo/10 text-accent-indigo'
                                    : 'border-charcoal/20 hover:border-charcoal/40'
                                }`}
                              >
                                {option}
                              </button>
                            ))}
                          </div>
                        ) : (
                          <div className="space-y-3">
                            {Array.isArray(question.options) && question.options.every((opt: any) => typeof opt === 'string') && 
                              (question.options as string[]).map((option: string) => {
                                const isSelected = formData[question.id as keyof QuestionnaireData] === option;
                                return (
                                  <motion.button
                                    key={option}
                                    type="button"
                                    onClick={() => updateFormData(question.id as keyof QuestionnaireData, option)}
                                    whileHover={{ scale: 1.01, x: 4 }}
                                    whileTap={{ scale: 0.99 }}
                                    animate={{
                                      scale: isSelected ? 1.02 : 1,
                                      boxShadow: isSelected 
                                        ? '0 8px 24px rgba(99, 102, 241, 0.25)' 
                                        : '0 2px 8px rgba(0, 0, 0, 0.08)'
                                    }}
                                    transition={{ duration: 0.2 }}
                                    className={`relative w-full text-left px-5 py-4 rounded-xl border-2 transition-all ${
                                      isSelected
                                        ? 'border-accent-indigo bg-gradient-to-r from-accent-indigo/15 to-accent-indigo/5'
                                        : 'border-charcoal/20 bg-white hover:border-accent-indigo/40 hover:bg-charcoal/5'
                                    }`}
                                  >
                                    {isSelected && (
                                      <motion.div
                                        layoutId="standardCardGlow"
                                        className="absolute inset-0 rounded-xl bg-gradient-to-r from-accent-indigo/10 via-accent-gold/10 to-accent-indigo/10"
                                        initial={false}
                                        transition={{ duration: 0.3 }}
                                      />
                                    )}
                                    <div className="flex items-center gap-4 relative z-10">
                                      <motion.div
                                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                                          isSelected
                                            ? 'border-accent-indigo bg-accent-indigo'
                                            : 'border-charcoal/30 bg-white'
                                        }`}
                                        animate={{
                                          scale: isSelected ? [1, 1.2, 1] : 1
                                        }}
                                        transition={{ duration: 0.3 }}
                                      >
                                        {isSelected && (
                                          <motion.div
                                            initial={{ scale: 0, rotate: -180 }}
                                            animate={{ scale: 1, rotate: 0 }}
                                            transition={{ delay: 0.1 }}
                                          >
                                            <Check size={14} className="text-white" />
                                          </motion.div>
                                        )}
                                      </motion.div>
                                      <span className={`text-sm font-medium ${isSelected ? 'text-accent-indigo' : 'text-charcoal'}`}>
                                        {option}
                                      </span>
                                    </div>
                                  </motion.button>
                                );
                              })}
                          </div>
                        )}
                      </div>
                    )}

                    {question.type === 'multiple' && 'options' in question && (
                      <div>
                        <label className="block text-sm font-medium text-charcoal mb-3">
                          {question.label}
                          {'sublabel' in question && question.sublabel && (
                            <span className="text-charcoal/50 font-normal ml-2">
                              {question.sublabel}
                            </span>
                          )}
                        </label>
                        {'chips' in question && question.chips ? (
                          <div className="flex flex-wrap gap-2">
                            {question.options.map((option: string) => (
                              <button
                                key={option}
                                type="button"
                                onClick={() => toggleArrayItem(question.id as keyof QuestionnaireData, option)}
                                className={`px-4 py-2 rounded-full border-2 text-sm transition-all ${
                                  (formData[question.id as keyof QuestionnaireData] as string[]).includes(option)
                                    ? 'border-accent-indigo bg-accent-indigo/10 text-accent-indigo'
                                    : 'border-charcoal/20 hover:border-charcoal/40'
                                }`}
                              >
                                {(formData[question.id as keyof QuestionnaireData] as string[]).includes(option) && (
                                  <Check size={14} className="inline mr-1" />
                                )}
                                {option}
                              </button>
                            ))}
                          </div>
                        ) : 'grid' in question && question.grid ? (
                          <div className="grid grid-cols-2 gap-2">
                            {question.options.map((option: string) => (
                              <button
                                key={option}
                                type="button"
                                onClick={() => toggleArrayItem(question.id as keyof QuestionnaireData, option)}
                                className={`px-4 py-3 rounded-lg border-2 text-sm transition-all ${
                                  (formData[question.id as keyof QuestionnaireData] as string[]).includes(option)
                                    ? 'border-accent-indigo bg-accent-indigo/10'
                                    : 'border-charcoal/20 hover:border-charcoal/40'
                                }`}
                              >
                                {(formData[question.id as keyof QuestionnaireData] as string[]).includes(option) && (
                                  <Check size={14} className="inline mr-1" />
                                )}
                                {option}
                              </button>
                            ))}
                          </div>
                        ) : (
                          <div className="space-y-2">
                            {Array.isArray(question.options) && question.options.every((opt: any) => typeof opt === 'string') &&
                              (question.options as string[]).map((option: string) => (
                              <button
                                key={option}
                                type="button"
                                onClick={() => toggleArrayItem(question.id as keyof QuestionnaireData, option)}
                                className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-all ${
                                  (formData[question.id as keyof QuestionnaireData] as string[]).includes(option)
                                    ? 'border-accent-indigo bg-accent-indigo/10'
                                    : 'border-charcoal/20 hover:border-charcoal/40'
                                }`}
                              >
                                <div className="flex items-center gap-3">
                                  <div
                                    className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                                      (formData[question.id as keyof QuestionnaireData] as string[]).includes(option)
                                        ? 'border-accent-indigo bg-accent-indigo'
                                        : 'border-charcoal/30'
                                    }`}
                                  >
                                    {(formData[question.id as keyof QuestionnaireData] as string[]).includes(option) && (
                                      <Check size={14} className="text-white" />
                                    )}
                                  </div>
                                  <span className="text-sm">{option}</span>
                                </div>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {question.type === 'file' && (
                      <div>
                        <label className="block text-sm font-medium text-charcoal mb-3">
                          {question.label}
                          {'sublabel' in question && question.sublabel && (
                            <span className="text-charcoal/50 font-normal ml-2">
                              {question.sublabel}
                            </span>
                          )}
                        </label>

                        {/* Mode Toggle */}
                        {!uploadedFile && !extractedText && (
                          <div className="flex gap-2 mb-4 p-1 bg-charcoal/5 rounded-lg">
                            <button
                              type="button"
                              onClick={() => setInputMode('upload')}
                              className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                                inputMode === 'upload'
                                  ? 'bg-white text-charcoal shadow-sm'
                                  : 'text-charcoal/60 hover:text-charcoal'
                              }`}
                            >
                              Upload File
                            </button>
                            <button
                              type="button"
                              onClick={() => setInputMode('type')}
                              className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                                inputMode === 'type'
                                  ? 'bg-white text-charcoal shadow-sm'
                                  : 'text-charcoal/60 hover:text-charcoal'
                              }`}
                            >
                              Type Text
                            </button>
                          </div>
                        )}

                        {/* Upload Mode */}
                        {inputMode === 'upload' && !uploadedFile && (
                          <FileUpload
                            onUploadComplete={handleFileUpload}
                            onUploadError={(err) => console.error(err)}
                            accept=".pdf,.doc,.docx,.md,.markdown,.txt,text/markdown,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                            maxSize={10 * 1024 * 1024}
                            folder="story-uploads"
                            disabled={isExtracting}
                          />
                        )}

                        {/* Type Text Mode */}
                        {inputMode === 'type' && !uploadedFile && (
                          <div>
                            <textarea
                              value={extractedText}
                              onChange={(e) => {
                                setExtractedText(e.target.value);
                                // Auto-update logline if empty
                                if (!formData.logline.trim() && e.target.value) {
                                  const firstLine = e.target.value.split('\n')[0].substring(0, 200);
                                  updateFormData('logline', firstLine);
                                }
                                // Store in form data
                                updateFormData('uploadedFile', {
                                  url: '',
                                  name: 'typed-text',
                                  extractedText: e.target.value,
                                });
                              }}
                              rows={12}
                              className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:ring-2 focus:ring-accent-indigo focus:border-transparent resize-none"
                              placeholder="Type or paste your story here..."
                            />
                            <p className="mt-2 text-xs text-charcoal/50">
                              {extractedText.length} characters
                            </p>
                          </div>
                        )}

                        {/* Uploaded File Display */}
                        {uploadedFile && (
                          <div>
                            <UploadedFileDisplay
                              file={uploadedFile}
                              onRemove={() => {
                                handleRemoveFile();
                                setInputMode('upload');
                              }}
                            />
                            {isExtracting && (
                              <div className="mt-3 flex items-center gap-2 text-sm text-accent-indigo">
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Extracting text from file...
                              </div>
                            )}
                            {extractedText && !isExtracting && (
                              <div className="mt-3 text-sm text-green-600">
                                ✓ Text extracted successfully ({extractedText.length} characters)
                              </div>
                            )}
                          </div>
                        )}

                        {/* Typed Text Display */}
                        {!uploadedFile && extractedText && inputMode === 'type' && (
                          <div className="mt-3 p-3 bg-charcoal/5 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium text-charcoal">Typed text</span>
                              <button
                                type="button"
                                onClick={() => {
                                  setExtractedText('');
                                  updateFormData('uploadedFile', undefined);
                                  setInputMode('upload');
                                }}
                                className="text-xs text-charcoal/50 hover:text-red-500 transition-colors"
                              >
                                Clear
                              </button>
                            </div>
                            <p className="text-xs text-charcoal/50">
                              {extractedText.length} characters entered
                            </p>
                          </div>
                        )}

                        {(uploadedFile || (extractedText && inputMode === 'type')) && questionIndex < QUESTIONS[step].length - 1 && (
                          <div className="flex items-center gap-4 mt-6">
                            <div className="flex-1 h-px bg-charcoal/10" />
                            <span className="text-sm text-charcoal/50">or continue below</span>
                            <div className="flex-1 h-px bg-charcoal/10" />
                          </div>
                        )}
                      </div>
                    )}

                    {question.type === 'textarea' && (
                      <div>
                        <label className="block text-sm font-medium text-charcoal mb-2">
                          {question.label}
                        </label>
                        <textarea
                          value={formData[question.id as keyof QuestionnaireData] as string}
                          onChange={(e) => updateFormData(question.id as keyof QuestionnaireData, e.target.value)}
                          rows={'rows' in question ? question.rows || 3 : 3}
                          className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:ring-2 focus:ring-accent-indigo focus:border-transparent resize-none"
                          placeholder={'placeholder' in question ? question.placeholder : ''}
                        />
                      </div>
                    )}

                    {question.type === 'text' && (
                      <div>
                        <label className="block text-sm font-medium text-charcoal mb-2">
                          {question.label}
                          {'sublabel' in question && question.sublabel && (
                            <p className="text-xs text-charcoal/50 mb-2 mt-1">{question.sublabel}</p>
                          )}
                        </label>
                        <input
                          type="text"
                          value={formData[question.id as keyof QuestionnaireData] as string}
                          onChange={(e) => updateFormData(question.id as keyof QuestionnaireData, e.target.value)}
                          className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:ring-2 focus:ring-accent-indigo focus:border-transparent"
                          placeholder={'placeholder' in question ? question.placeholder : ''}
                        />
                      </div>
                    )}

                    {question.type === 'email' && (
                      <div>
                        <label className="block text-sm font-medium text-charcoal mb-2">
                          {question.label}
                          {'sublabel' in question && question.sublabel && (
                            <p className="text-xs text-charcoal/50 mb-2 mt-1">{question.sublabel}</p>
                          )}
                        </label>
                        <input
                          type="email"
                          value={formData[question.id as keyof QuestionnaireData] as string}
                          onChange={(e) => updateFormData(question.id as keyof QuestionnaireData, e.target.value)}
                          className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:ring-2 focus:ring-accent-indigo focus:border-transparent"
                          placeholder={'placeholder' in question ? question.placeholder : ''}
                        />
                      </div>
                    )}

                    {question.type === 'boolean' && 'options' in question && Array.isArray(question.options) && (
                      <div>
                        <label className="block text-sm font-medium text-charcoal mb-3">
                          {question.label}
                        </label>
                        <div className="flex gap-4">
                          {(question.options as string[]).map((option: string, idx: number) => (
                            <button
                              key={option}
                              type="button"
                              onClick={() => updateFormData(question.id as keyof QuestionnaireData, idx === 0)}
                              className={`flex-1 px-6 py-4 rounded-lg border-2 transition-all ${
                                (formData[question.id as keyof QuestionnaireData] as boolean) === (idx === 0)
                                  ? 'border-accent-indigo bg-accent-indigo/10 text-accent-indigo'
                                  : 'border-charcoal/20 hover:border-charcoal/40'
                              }`}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                        {formData.wantConsult && question.id === 'wantConsult' && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="mt-4"
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

                    {/* Show special message for last step */}
                    {step === 4 && questionIndex === 0 && (
                      <div className="bg-gradient-to-r from-accent-indigo/10 to-accent-gold/10 -m-6 mt-6 p-6 rounded-2xl">
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
                    )}
                  </div>
                );
              })()}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex gap-4 mt-8 pt-6 border-t border-charcoal/10">
            {(step > 0 || questionIndex > 0) && (
              <MagneticButton
                onClick={handlePrev}
                className="flex items-center gap-2 px-6 py-3 border-2 border-charcoal/20 text-charcoal rounded-lg hover:border-charcoal/40 transition-colors"
              >
                <ArrowLeft size={18} />
                Back
              </MagneticButton>
            )}

            <div className="flex-1" />

            {step < STEPS.length - 1 || questionIndex < QUESTIONS[step].length - 1 ? (
              <MagneticButton
                onClick={handleNext}
                disabled={!canGoNext()}
                className="flex items-center gap-2 px-6 py-3 bg-accent-indigo text-white rounded-lg hover:bg-accent-indigo/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-accent-indigo/30"
              >
                Continue
                <ArrowRight size={18} />
              </MagneticButton>
            ) : (
              <MagneticButton
                onClick={handleSubmit}
                disabled={isSubmitting || !formData.name || !formData.email || (!formData.logline && !uploadedFile && !extractedText)}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-accent-indigo to-accent-gold text-white font-medium rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-accent-indigo/30"
              >
                {isSubmitting ? 'Analyzing...' : 'Get My Free Story Score'}
                <Sparkles size={18} />
              </MagneticButton>
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

    {/* Milestone Celebration */}
    <MilestoneCelebration
      show={showMilestone}
      message={milestoneMessage}
      onComplete={() => setShowMilestone(false)}
    />

    {/* Loading Screen during submission */}
    {isSubmitting && (
      <LoadingScreen
        message="Processing Your Story..."
        subtext="Your story concept is being processed through our proprietary system and compared to similar success stories!"
        duration={4000}
      />
    )}
    </>
  );
}
