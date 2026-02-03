// src/components/navigation/SideNavigation.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  X,
  Home,
  Grid3x3,
  FileText,
  Mail,
  Play,
  Info,
  ChevronLeft,
  ChevronRight,
  Menu
} from 'lucide-react';

interface SideNavigationProps {
  decks?: Array<{ id: string; title: string }>;
}

interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  section?: string;
}

export default function SideNavigation({ decks = [] }: SideNavigationProps) {
  const [leftOpen, setLeftOpen] = useState(false);
  const [rightOpen, setRightOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const pathname = usePathname();

  // Track scroll position for active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      const scrollPosition = window.scrollY + 100;

      sections.forEach((section) => {
        const sectionElement = section as HTMLElement;
        const sectionTop = sectionElement.offsetTop;
        const sectionHeight = sectionElement.offsetHeight;
        const sectionId = sectionElement.id;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const leftNavItems: NavItem[] = [
    { id: 'home', label: 'Home', href: '/', icon: Home },
    { id: 'gallery', label: 'Gallery', href: '/gallery', icon: Grid3x3 },
    { id: 'questionnaire', label: 'Get Scored', href: '/questionnaire', icon: FileText },
  ];

  // Section navigation (right side)
  const rightNavItems: NavItem[] = [
    { id: 'hero', label: 'Hero', href: '#hero', section: 'hero', icon: Play },
    { id: 'featured', label: 'Featured', href: '#featured', section: 'featured', icon: Play },
    { id: 'services', label: 'Services', href: '#services', section: 'services', icon: Info },
    { id: 'projects', label: 'Projects', href: '#projects', section: 'projects', icon: Grid3x3 },
    { id: 'testimonials', label: 'Reviews', href: '#testimonials', section: 'testimonials', icon: Mail },
    { id: 'contact', label: 'Contact', href: '#contact', section: 'contact', icon: Mail },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const NavButton = ({
    open,
    setOpen,
    side,
  }: {
    open: boolean;
    setOpen: (open: boolean) => void;
    side: 'left' | 'right';
  }) => (
    <motion.button
      className={`fixed top-1/2 -translate-y-1/2 z-50 p-2 rounded-full shadow-lg backdrop-blur-md border border-white/20
        ${side === 'left' ? 'left-0 rounded-l-none' : 'right-0 rounded-r-none'}
        ${open ? 'bg-accent-indigo' : 'bg-charcoal/80 hover:bg-accent-indigo/80'}
        text-white transition-colors`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setOpen(!open)}
    >
      <motion.div
        animate={{ rotate: open ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {open ? <X size={20} /> : side === 'left' ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
      </motion.div>
    </motion.button>
  );

  return (
    <>
      {/* Left Navigation - Main Pages */}
      <NavButton open={leftOpen} setOpen={setLeftOpen} side="left" />

      <AnimatePresence>
        {leftOpen && (
          <motion.nav
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed left-0 top-0 bottom-0 w-64 bg-charcoal/95 backdrop-blur-xl border-r border-white/10 z-40"
          >
            <div className="p-6">
              <h2 className="font-display text-xl font-bold text-paper mb-6">Navigation</h2>
              <ul className="space-y-2">
                {leftNavItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;

                  return (
                    <li key={item.id}>
                      <Link
                        href={item.href}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all group
                          ${isActive
                            ? 'bg-accent-indigo text-white shadow-lg shadow-accent-indigo/30'
                            : 'text-paper-muted hover:bg-white/10 hover:text-paper'
                          }`}
                      >
                        <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'group-hover:text-accent-indigo'}`} />
                        <span className="font-medium">{item.label}</span>
                        {isActive && (
                          <motion.div
                            layoutId="activeIndicator"
                            className="ml-auto w-2 h-2 rounded-full bg-white"
                          />
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Right Navigation - Sections */}
      <NavButton open={rightOpen} setOpen={setRightOpen} side="right" />

      <AnimatePresence>
        {rightOpen && (
          <motion.nav
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 bottom-0 w-56 bg-charcoal/95 backdrop-blur-xl border-l border-white/10 z-40"
          >
            <div className="p-6">
              <h2 className="font-display text-xl font-bold text-paper mb-6">Sections</h2>
              <ul className="space-y-2">
                {rightNavItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.section;

                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => scrollToSection(item.href)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all w-full group
                          ${isActive
                            ? 'bg-accent-indigo text-white shadow-lg shadow-accent-indigo/30'
                            : 'text-paper-muted hover:bg-white/10 hover:text-paper'
                          }`}
                      >
                        <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'group-hover:text-accent-indigo'}`} />
                        <span className="font-medium text-sm">{item.label}</span>
                        {isActive && (
                          <motion.div
                            layoutId="activeSectionIndicator"
                            className="ml-auto w-2 h-2 rounded-full bg-white"
                          />
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Mobile Menu Button */}
      <motion.button
        className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-accent-indigo text-white shadow-lg shadow-accent-indigo/30 md:hidden"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setRightOpen(!rightOpen)}
      >
        <Menu size={24} />
      </motion.button>
    </>
  );
}
