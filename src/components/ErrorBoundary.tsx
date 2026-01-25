'use client';

import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error Boundary Component
 * Catches JavaScript errors anywhere in the child component tree
 * Displays a fallback UI instead of crashing the entire app
 */
export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    // TODO: Send error to monitoring service (Sentry, LogRocket, etc.)
    // logErrorToService(error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <div className="min-h-screen bg-paper flex items-center justify-center px-6">
          <div className="max-w-md w-full text-center">
            {/* Error Icon */}
            <div className="relative w-20 h-20 mx-auto mb-6">
              <div className="absolute inset-0 bg-red-100 rounded-full animate-pulse" />
              <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
                <AlertTriangle className="text-red-500" size={36} />
              </div>
            </div>

            {/* Error Message */}
            <h1 className="font-display text-3xl font-bold text-charcoal mb-3">
              Oops! Something went wrong
            </h1>
            <p className="text-charcoal/60 mb-8">
              {process.env.NODE_ENV === 'development'
                ? this.state.error?.message || 'An unexpected error occurred'
                : 'We encountered an unexpected error. Please try again.'}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={this.handleReset}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent-indigo text-white font-medium rounded-lg hover:bg-accent-indigo/90 transition-colors"
                aria-label="Try again"
              >
                <RefreshCw size={18} />
                Try Again
              </button>
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-charcoal text-charcoal font-medium rounded-lg hover:bg-charcoal hover:text-white transition-colors"
                aria-label="Go to home page"
              >
                <Home size={18} />
                Go Home
              </Link>
            </div>

            {/* Development Info */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-8 text-left">
                <summary className="cursor-pointer text-sm text-charcoal/50 hover:text-charcoal transition-colors">
                  Error Details
                </summary>
                <pre className="mt-3 p-4 bg-charcoal/5 rounded-lg text-xs text-charcoal/70 overflow-auto max-h-64">
                  {this.state.error.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * Hook-based error boundary wrapper for simpler usage
 */
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  fallback?: React.ReactNode
) {
  return function WithErrorBoundaryWrapper(props: P) {
    return (
      <ErrorBoundary fallback={fallback}>
        <Component {...props} />
      </ErrorBoundary>
    );
  };
}

/**
 * Async Error Boundary for handling async errors
 * Use this for components that fetch data or have async operations
 */
export function AsyncErrorBoundary({
  children,
  fallback,
}: {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  const [hasError, setHasError] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);

  React.useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      setHasError(true);
      setError(new Error(event.message));
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  if (hasError) {
    return fallback || (
      <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-700">An error occurred: {error?.message}</p>
      </div>
    );
  }

  return <>{children}</>;
}
