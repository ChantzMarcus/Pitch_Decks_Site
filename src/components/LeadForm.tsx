'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/Button';
import { createLead } from '@/db';
import { useState } from 'react';

const leadFormSchema = z.object({
  full_name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().optional(),
  project_description: z.string().min(20, 'Please provide more details about your interest'),
  user_type: z.enum(['Producer', 'Investor', 'Talent Agent', 'Studio Executive', 'Other']),
  budget_range: z.enum(['<$1M', '$1-5M', '$5-20M', '$20M+', 'Undisclosed']),
  timeline: z.enum(['Immediate', '3-6 months', '6-12 months', 'Exploring']),
});

type LeadFormValues = z.infer<typeof leadFormSchema>;

interface LeadFormProps {
  deckId?: string;
}

export default function LeadForm({ deckId }: LeadFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      user_type: 'Producer',
      budget_range: 'Undisclosed',
      timeline: 'Exploring'
    }
  });

  const onSubmit = async (data: LeadFormValues) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await createLead({
        name: data.full_name,
        email: data.email,
        phone: undefined,
        timeline: data.timeline,
        personalMeaning: [],
        projectFor: '',
        format: '',
        materials: [],
        excitedParts: [],
        involvement: '',
        startTiming: data.timeline,
        budget: data.budget_range,
        logline: data.project_description,
        description: `${data.user_type} - ${data.company || 'No company'}`,
        wantConsult: false,
        utmSource: 'website',
      } as any); // TODO: Update schema to match new questionnaire structure

      setSubmitSuccess(true);
      setTimeout(() => {
        setSubmitSuccess(false);
        reset();
      }, 3000);
    } catch (error) {
      console.error('Error submitting lead:', error);
      setSubmitError('Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-paper/50 rounded-2xl p-8 border border-charcoal/10">
      <h2 className="font-display text-3xl font-bold text-charcoal mb-6">
        Interested in this project?
      </h2>
      
      <p className="text-charcoal/70 mb-8">
        Reach out to discuss potential collaboration or investment opportunities.
      </p>
      
      {submitSuccess ? (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          <p className="font-medium">Thank you for your interest!</p>
          <p>We'll be in touch shortly to discuss this project.</p>
        </div>
      ) : null}
      
      {submitError ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {submitError}
        </div>
      ) : null}
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="full_name" className="block text-charcoal font-medium mb-2">
              Full Name *
            </label>
            <input
              id="full_name"
              type="text"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent-indigo focus:border-transparent ${
                errors.full_name ? 'border-red-500' : 'border-charcoal/20'
              }`}
              {...register('full_name')}
            />
            {errors.full_name && (
              <p className="mt-1 text-red-500 text-sm">{errors.full_name.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="email" className="block text-charcoal font-medium mb-2">
              Email Address *
            </label>
            <input
              id="email"
              type="email"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent-indigo focus:border-transparent ${
                errors.email ? 'border-red-500' : 'border-charcoal/20'
              }`}
              {...register('email')}
            />
            {errors.email && (
              <p className="mt-1 text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="company" className="block text-charcoal font-medium mb-2">
              Company
            </label>
            <input
              id="company"
              type="text"
              className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:ring-2 focus:ring-accent-indigo focus:border-transparent"
              {...register('company')}
            />
          </div>
          
          <div>
            <label htmlFor="user_type" className="block text-charcoal font-medium mb-2">
              I am a *
            </label>
            <select
              id="user_type"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent-indigo focus:border-transparent ${
                errors.user_type ? 'border-red-500' : 'border-charcoal/20'
              }`}
              {...register('user_type')}
            >
              <option value="Producer">Producer</option>
              <option value="Investor">Investor</option>
              <option value="Talent Agent">Talent Agent</option>
              <option value="Studio Executive">Studio Executive</option>
              <option value="Other">Other</option>
            </select>
            {errors.user_type && (
              <p className="mt-1 text-red-500 text-sm">{errors.user_type.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="budget_range" className="block text-charcoal font-medium mb-2">
              Budget Range *
            </label>
            <select
              id="budget_range"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent-indigo focus:border-transparent ${
                errors.budget_range ? 'border-red-500' : 'border-charcoal/20'
              }`}
              {...register('budget_range')}
            >
              <option value="&lt;$1M">&lt;$1M</option>
              <option value="$1-5M">$1-5M</option>
              <option value="$5-20M">$5-20M</option>
              <option value="$20M+">$20M+</option>
              <option value="Undisclosed">Undisclosed</option>
            </select>
            {errors.budget_range && (
              <p className="mt-1 text-red-500 text-sm">{errors.budget_range.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="timeline" className="block text-charcoal font-medium mb-2">
              Timeline *
            </label>
            <select
              id="timeline"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent-indigo focus:border-transparent ${
                errors.timeline ? 'border-red-500' : 'border-charcoal/20'
              }`}
              {...register('timeline')}
            >
              <option value="Immediate">Immediate</option>
              <option value="3-6 months">3-6 months</option>
              <option value="6-12 months">6-12 months</option>
              <option value="Exploring">Exploring</option>
            </select>
            {errors.timeline && (
              <p className="mt-1 text-red-500 text-sm">{errors.timeline.message}</p>
            )}
          </div>
        </div>
        
        <div>
          <label htmlFor="project_description" className="block text-charcoal font-medium mb-2">
            Project Description *
          </label>
          <textarea
            id="project_description"
            rows={4}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent-indigo focus:border-transparent ${
              errors.project_description ? 'border-red-500' : 'border-charcoal/20'
            }`}
            placeholder="Tell us more about your interest in this project..."
            {...register('project_description')}
          ></textarea>
          {errors.project_description && (
            <p className="mt-1 text-red-500 text-sm">{errors.project_description.message}</p>
          )}
        </div>
        
        <div className="pt-4">
          <Button 
            type="submit" 
            className="w-full md:w-auto px-8 py-4 text-lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Submit Interest'}
          </Button>
        </div>
      </form>
    </section>
  );
}