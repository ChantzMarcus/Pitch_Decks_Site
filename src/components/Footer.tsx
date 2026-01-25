'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, Mail, Instagram, Linkedin, Youtube } from 'lucide-react';
import Link from 'next/link';

const footerLinks = {
  company: [
    { label: 'About', href: '/about' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Contact', href: '/contact' },
  ],
  resources: [
    { label: 'Questionnaire', href: '/questionnaire' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Blog', href: '/blog' },
  ],
  legal: [
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
  ],
};

const socialLinks = [
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Youtube, href: 'https://youtube.com', label: 'YouTube' },
  { icon: Mail, href: 'mailto:hello@filmdecks.biz', label: 'Email' },
];

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="group relative inline-block overflow-hidden"
    >
      <span className="relative z-10 block py-1 transition-colors duration-300 group-hover:text-accent-indigo">
        {label}
      </span>
      <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-accent-indigo transition-all duration-300 group-hover:w-full" />
    </Link>
  );
}

function SocialLink({ href, icon: Icon, label }: { href: string; icon: any; label: string }) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative p-3"
    >
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: 'spring', stiffness: 300, damping: 10 }}
      >
        <Icon className="w-5 h-5 text-charcoal/60 group-hover:text-accent-indigo transition-colors" />
      </motion.div>
    </a>
  );
}

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-paper border-t border-charcoal/10 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-indigo rounded-full filter blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-gold rounded-full filter blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-24">
        {/* Main content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="font-display text-2xl font-semibold text-charcoal mb-4">
                FilmDecks
              </h3>
              <p className="text-charcoal/60 mb-6 max-w-sm">
                Professional pitch packaging for film and TV. Get your story funded with expert packaging, financial analysis, and creative development. We help you get everything you need to go to market.
              </p>

              {/* Email CTA */}
              <a
                href="mailto:hello@filmdecks.biz"
                className="group inline-flex items-center gap-2 text-accent-indigo hover:gap-3 transition-all"
              >
                <span className="border-b border-accent-indigo pb-0.5">
                  hello@filmdecks.biz
                </span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </motion.div>
          </div>

          {/* Links columns */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="font-medium text-charcoal mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <FooterLink {...link} />
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="font-medium text-charcoal mb-4">Resources</h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <FooterLink {...link} />
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="font-medium text-charcoal mb-4">Social</h4>
            <div className="flex gap-1">
              {socialLinks.map((link) => (
                <SocialLink key={link.label} {...link} />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-charcoal/10 gap-4">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm text-charcoal/50"
          >
            © {new Date().getFullYear()} FilmDecks. All rights reserved.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex gap-6"
          >
            {footerLinks.legal.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-charcoal/50 hover:text-charcoal transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </motion.div>

          {/* Scroll to top */}
          <motion.button
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            onClick={scrollToTop}
            className="group p-3 rounded-full border border-charcoal/10 hover:border-charcoal/30 hover:bg-charcoal/5 transition-all"
            aria-label="Scroll to top"
          >
            <ArrowUpRight className="w-5 h-5 text-charcoal/50 group-hover:text-charcoal transition-colors" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}

// Minimal footer variant
export function MinimalFooter() {
  return (
    <footer className="bg-paper border-t border-charcoal/10 py-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-display text-lg text-charcoal">FilmDecks</p>
          <p className="text-sm text-charcoal/50">
            © {new Date().getFullYear()} All rights reserved.
          </p>
          <div className="flex gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                aria-label={link.label}
                target="_blank"
                rel="noopener noreferrer"
                className="text-charcoal/50 hover:text-accent-indigo transition-colors"
              >
                <link.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
