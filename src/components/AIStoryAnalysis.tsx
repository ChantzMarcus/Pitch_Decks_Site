'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, RotateCcw, FileText, Upload, X, Loader2 } from 'lucide-react';
import { FileUpload, UploadedFile } from '@/components/FileUpload';
import { UploadedFileDisplay } from '@/components/FileUpload';
import { extractTextFromFile, truncateText } from '@/lib/extract-text';
import CinematicLoader from '@/components/CinematicLoader';

interface StoryAnalysis {
  totalScore: number;
  breakdown: {
    originality: number;
    emotionalImpact: number;
    commercialPotential: number;
    formatReadiness: number;
    clarityOfVision: number;
  };
  analysis: string;
  recommendations: string[];
}

interface ContactInfo {
  name: string;
  email: string;
}

export default function AIStoryAnalysis() {
  const [logline, setLogline] = useState('');
  const [description, setDescription] = useState('');
  const [analysis, setAnalysis] = useState<StoryAnalysis | null>(null);
  const [analysisPreview, setAnalysisPreview] = useState<any>(null); // Basic preview results
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  const [extractedText, setExtractedText] = useState('');
  const [isExtracting, setIsExtracting] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactInfo, setContactInfo] = useState<ContactInfo>({ name: '', email: '' });
  const [analysisId, setAnalysisId] = useState<string | null>(null);

  const analyzeStory = async () => {
    // Validate: need either logline or uploaded file
    if (!logline.trim() && !extractedText) {
      setError('Please enter a logline or upload a file');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Call the real AI API
      const response = await fetch('/api/ai-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          logline: logline.trim() || 'Story from uploaded file',
          description: description || undefined,
          uploadedFileText: extractedText || undefined,
          uploadedFileName: uploadedFile?.name || undefined,
          contactInfo: contactInfo.name && contactInfo.email ? contactInfo : undefined,
        }),
      });

      if (!response.ok) {
        throw new Error('Analysis failed');
      }

      const result = await response.json();

      if (result.success) {
        // Store the basic preview results
        setAnalysisPreview(result.analysis);
        setAnalysisId(result.analysis.analysisId);

        // If user provided contact info, show success message
        if (result.analysis.requiresContactInfo) {
          setShowContactForm(true);
        } else {
          // Analysis is being prepared and will be sent to user
          setError('');
        }
      } else {
        throw new Error(result.error || 'Analysis failed');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze story. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setLogline('');
    setDescription('');
    setAnalysis(null);
    setError('');
    setUploadedFile(null);
    setExtractedText('');
  };

  const handleFileUpload = async (file: UploadedFile) => {
    setUploadedFile(file);
    setIsExtracting(true);
    setError('');

    try {
      // Create a File object from the URL for text extraction
      const response = await fetch(file.url);
      const blob = await response.blob();
      const fileObj = new File([blob], file.name, { type: file.type });

      const result = await extractTextFromFile(fileObj);

      if (result.error) {
        setError(result.error);
        setExtractedText('');
      } else {
        const truncated = truncateText(result.text, 10000);
        setExtractedText(truncated);

        // Auto-fill logline if empty and we have text
        if (!logline.trim() && result.text) {
          const firstLine = result.text.split('\n')[0].substring(0, 200);
          setLogline(firstLine);
        }
      }
    } catch (err) {
      setError('Failed to extract text from file. Please try again.');
      setExtractedText('');
    } finally {
      setIsExtracting(false);
    }
  };

  const handleUploadError = (errorMessage: string) => {
    setError(errorMessage);
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    setExtractedText('');
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-xl p-8 border border-charcoal/10"
      >
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-3 bg-accent-indigo/10 rounded-full mb-4 relative">
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent-gold rounded-full border-2 border-white"></div>
            <Sparkles className="w-8 h-8 text-accent-indigo" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent-gold/10 border border-accent-gold/20 rounded-full mb-3">
            <span className="text-xs font-semibold text-accent-gold uppercase tracking-wide">Exclusive Access</span>
          </div>
          <h2 className="font-display text-3xl font-bold text-charcoal mb-3">
            Proprietary Story Analysis System
          </h2>
          <p className="text-charcoal/70 max-w-2xl mx-auto mb-3">
            Our exclusive evaluation system leverages proprietary algorithms trained on decades of industry data from major studios, streaming platforms, and production companies.
          </p>
          <p className="text-sm text-charcoal/60 max-w-2xl mx-auto">
            This is the same methodology trusted by top-tier producers and executives to assess commercial viability, market potential, and production readiness. Upload a file or enter your story directly.
          </p>
        </div>

        {!analysisPreview ? (
          <div className="space-y-6">
            {/* File Upload Section */}
            {!uploadedFile ? (
              <div>
                <label className="block text-sm font-medium text-charcoal mb-3">
                  Upload Your Story
                  <span className="text-charcoal/50 font-normal ml-2">
                    (PDF, DOCX, MD, TXT up to 10MB)
                  </span>
                </label>
                <FileUpload
                  onUploadComplete={handleFileUpload}
                  onUploadError={handleUploadError}
                  accept=".pdf,.doc,.docx,.md,.markdown,.txt,text/markdown,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  maxSize={10 * 1024 * 1024}
                  folder="story-uploads"
                  disabled={isExtracting || isLoading}
                />
              </div>
            ) : (
              <div>
                <UploadedFileDisplay
                  file={uploadedFile}
                  onRemove={handleRemoveFile}
                />
                {isExtracting && (
                  <div className="mt-3 flex items-center gap-2 text-sm text-accent-indigo">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Extracting text from file...
                  </div>
                )}
                {extractedText && (
                  <div className="mt-3 text-sm text-green-600">
                    ✓ Text extracted successfully ({extractedText.length} characters)
                  </div>
                )}
              </div>
            )}

            {/* Divider */}
            {uploadedFile && (
              <div className="flex items-center gap-4">
                <div className="flex-1 h-px bg-charcoal/10" />
                <span className="text-sm text-charcoal/50">or enter manually</span>
                <div className="flex-1 h-px bg-charcoal/10" />
              </div>
            )}

            {/* Manual Input Section */}
            <div>
              <label htmlFor="logline" className="block text-sm font-medium text-charcoal mb-2">
                Story Logline
                {extractedText && (
                  <span className="text-xs text-charcoal/50 ml-2">(auto-filled from file)</span>
                )}
              </label>
              <textarea
                id="logline"
                value={logline}
                onChange={(e) => setLogline(e.target.value)}
                placeholder="In a world where..."
                rows={2}
                className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:ring-2 focus:ring-accent-indigo focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-charcoal mb-2">
                Additional Description
                <span className="text-charcoal/50 font-normal ml-2">(optional)</span>
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Provide additional details about your story concept..."
                rows={4}
                className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:ring-2 focus:ring-accent-indigo focus:border-transparent transition-all"
              />
            </div>

            {error && (
              <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">
                {error}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={analyzeStory}
                disabled={isLoading || isExtracting}
                className="flex-1 bg-accent-indigo text-white py-4 px-6 rounded-lg font-medium hover:bg-accent-indigo/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Running Proprietary Analysis...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Run Exclusive Analysis
                  </>
                )}
              </button>

              <button
                onClick={resetForm}
                className="px-6 py-4 border border-charcoal/20 rounded-lg font-medium hover:bg-charcoal/5 transition-colors flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-5 h-5" />
                Reset
              </button>
            </div>

            {/* Contact Form for Full Analysis */}
            {showContactForm && !analysisPreview && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-6 bg-accent-indigo/5 rounded-xl border border-accent-indigo/20"
              >
                <h3 className="font-semibold text-charcoal mb-4">Access Full Proprietary Report</h3>
                <p className="text-charcoal/70 mb-4">
                  Enter your contact information to receive the complete analysis report with detailed insights, market positioning, and production recommendations—the same comprehensive evaluation used by industry executives.
                </p>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-sm font-medium text-charcoal mb-1">
                      Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={contactInfo.name}
                      onChange={(e) => setContactInfo({...contactInfo, name: e.target.value})}
                      className="w-full px-4 py-2 border border-charcoal/20 rounded-lg focus:ring-2 focus:ring-accent-indigo focus:border-transparent"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-sm font-medium text-charcoal mb-1">
                      Email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={contactInfo.email}
                      onChange={(e) => setContactInfo({...contactInfo, email: e.target.value})}
                      className="w-full px-4 py-2 border border-charcoal/20 rounded-lg focus:ring-2 focus:ring-accent-indigo focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={analyzeStory}
                      disabled={!contactInfo.name || !contactInfo.email}
                      className="flex-1 bg-accent-indigo text-white py-2 px-4 rounded-lg font-medium hover:bg-accent-indigo/90 transition-colors disabled:opacity-50"
                    >
                      Send My Proprietary Report
                    </button>

                    <button
                      onClick={() => setShowContactForm(false)}
                      className="px-4 py-2 border border-charcoal/20 rounded-lg font-medium hover:bg-charcoal/5 transition-colors"
                    >
                      Later
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent-indigo/10 rounded-full mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-indigo"></span>
                <span className="text-xs font-medium text-accent-indigo">Proprietary Evaluation System</span>
              </div>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="text-7xl font-bold bg-gradient-to-r from-accent-indigo to-accent-gold bg-clip-text text-transparent mb-2"
              >
                {analysisPreview.overallScore}/100
              </motion.div>
              <div className="text-lg text-charcoal/70 mb-2">Industry-Standard Story Score</div>
              <p className="text-sm text-charcoal/60 max-w-md mx-auto">
                Based on proprietary algorithms trained on data from major studios and streaming platforms
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {Object.entries(analysisPreview.breakdown).map(([key, value], index) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="text-center p-4 bg-charcoal/5 rounded-lg"
                >
                  <div className="text-3xl font-bold text-accent-indigo">{String(value)}</div>
                  <div className="text-xs text-charcoal/60 capitalize mt-1">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Preview vs Full Analysis Message */}
            <div className="pt-6">
              <h3 className="font-display text-xl font-semibold text-charcoal mb-3">Proprietary Analysis Preview</h3>
              <div className="bg-charcoal/5 p-4 rounded-lg border border-charcoal/10">
                <p className="text-charcoal/80 mb-4">
                  {analysisPreview.message}
                </p>

                {analysisPreview.requiresContactInfo && (
                  <div className="mt-4 p-4 bg-gradient-to-br from-accent-indigo/10 to-accent-gold/5 rounded-lg border border-accent-indigo/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-4 h-4 text-accent-indigo" />
                      <h4 className="font-medium text-charcoal">Access Complete Proprietary Report</h4>
                    </div>
                    <p className="text-charcoal/70 text-sm mb-3">
                      Enter your contact information to receive the full analysis report—the same comprehensive evaluation used by industry executives, including detailed market positioning, competitive analysis, and production recommendations.
                    </p>
                    <button
                      onClick={() => setShowContactForm(true)}
                      className="bg-accent-indigo text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-accent-indigo/90 transition-colors"
                    >
                      Unlock Full Proprietary Report
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button
                onClick={resetForm}
                className="flex-1 bg-accent-indigo text-white py-4 px-6 rounded-lg font-medium hover:bg-accent-indigo/90 transition-colors"
              >
                Analyze Another Story
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Cinematic loading overlay */}
      {isLoading && <CinematicLoader />}
    </div>
  );
}
