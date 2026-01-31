'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User } from 'lucide-react';

interface Notification {
  id: string;
  message: string;
  location?: string;
  timeAgo: string;
  action: string;
}

const mockNotifications: Notification[] = [
  { id: '1', message: 'Sarah from Los Angeles', location: 'LA', timeAgo: '2 min ago', action: 'got her story scored' },
  { id: '2', message: 'Michael from New York', location: 'NY', timeAgo: '5 min ago', action: 'submitted their project' },
  { id: '3', message: 'Emma from London', location: 'UK', timeAgo: '8 min ago', action: 'received expert feedback' },
  { id: '4', message: 'David from Toronto', location: 'CA', timeAgo: '12 min ago', action: 'got their story approved' },
  { id: '5', message: 'Lisa from Chicago', location: 'IL', timeAgo: '15 min ago', action: 'started their evaluation' },
];

/**
 * Social Proof Notification
 * Shows recent activity to create urgency and FOMO
 * Appears in bottom-right corner
 */
export default function SocialProofNotification() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Show first notification after 3 seconds
    const timer1 = setTimeout(() => {
      setNotifications([mockNotifications[0]]);
    }, 3000);

    // Rotate notifications every 8 seconds
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const nextIndex = (prev + 1) % mockNotifications.length;
        setNotifications([mockNotifications[nextIndex]]);
        return nextIndex;
      });
    }, 8000);

    return () => {
      clearTimeout(timer1);
      clearInterval(interval);
    };
  }, []);

  const handleDismiss = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="fixed bottom-24 right-4 z-40 space-y-3">
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: 100, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="bg-charcoal border border-paper/20 rounded-lg shadow-xl p-4 max-w-xs"
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 bg-accent-indigo/20 rounded-full flex items-center justify-center">
                <User className="text-accent-indigo" size={18} />
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-paper text-sm font-medium">
                  <span className="text-accent-gold">{notification.message}</span>
                </p>
                <p className="text-paper-muted text-xs mt-1">
                  {notification.action} • {notification.timeAgo}
                </p>
              </div>

              <button
                onClick={() => handleDismiss(notification.id)}
                className="flex-shrink-0 p-1 text-paper-muted hover:text-paper transition-colors"
                aria-label="Dismiss"
              >
                <X size={14} />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
