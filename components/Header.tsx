
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DashboardTab } from './BenefitsDashboard.tsx';
import Logo from './Logo.tsx';

interface HeaderProps {
  onShowBenefits?: (type: DashboardTab) => void;
  onShowContact?: () => void;
  onScrollToSection?: (sectionId: string) => void;
  isDarkMode?: boolean;
  onToggleTheme?: () => void;
  isMobileView?: boolean;
  onToggleMobileView?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  onShowBenefits,
  onShowContact,
  onScrollToSection,
  isDarkMode,
  onToggleTheme,
  isMobileView,
  onToggleMobileView
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  const navItems = [
    { id: 'players', type: 'benefit', label: 'Ventajas Jugadores' },
    { id: 'clubs', type: 'benefit', label: 'Ventajas Clubes' },
    { id: 'clubplus', type: 'benefit', label: 'Ventajas Club Pro' },
    { id: 'faq', type: 'section', label: 'FAQ' },
    { id: 'history', type: 'benefit', label: 'Historia' }
  ];

  const handleNavClick = (item: { id: string, type: string }) => {
    if (item.type === 'benefit') {
      onShowBenefits?.(item.id as DashboardTab);
    } else if (item.type === 'section') {
      onScrollToSection?.(item.id);
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[200] bg-white/80 dark:bg-[#0A0A0A]/90 backdrop-blur-xl border-b border-slate-200 dark:border-white/10 transition-colors duration-500">
      <div className="container mx-auto px-4 h-24 flex items-center justify-between">
        <div className="cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <Logo isDark={isDarkMode} className="h-10 md:h-12" />
        </div>

        <nav className="hidden lg:flex items-center gap-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item)}
              className="relative px-3 py-3 rounded-2xl text-[9px] font-black uppercase tracking-[0.1em] transition-all duration-700 group overflow-hidden border border-slate-200 dark:border-white/5 hover:border-[#38BDF8]/50 bg-slate-100 dark:bg-white/[0.02] hover:bg-slate-200 dark:hover:bg-white/[0.08]"
            >
              <div className="absolute inset-0 bg-[#38BDF8] opacity-0 group-hover:opacity-15 blur-[40px] transition-all duration-1000 scale-150" />
              <span className="relative z-10 text-slate-500 dark:text-gray-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors duration-500">
                {item.label}
              </span>
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-slate-300 dark:via-white/10 to-transparent group-hover:via-[#38BDF8] group-hover:shadow-[0_0_20px_#38BDF8] transition-all duration-500 scale-x-0 group-hover:scale-x-75" />
            </button>
          ))}
          <button
            onClick={onShowContact}
            className="px-6 py-3 ml-2 bg-[#38BDF8] text-black rounded-2xl text-[9px] font-black uppercase tracking-[0.1em] hover:scale-105 transition-all shadow-lg"
          >
            Contacto
          </button>
        </nav>

        <div className="flex items-center gap-4">
          <button
            onClick={onToggleTheme}
            className="w-10 h-10 flex items-center justify-center bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-slate-600 dark:text-gray-400 hover:bg-[#38BDF8] hover:text-black transition-all"
          >
            {isDarkMode ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
            )}
          </button>





          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden w-12 h-12 flex items-center justify-center bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl text-slate-900 dark:text-white hover:bg-[#38BDF8] hover:text-black transition-all active:scale-90"
          >
            {isMenuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M18 6 6 18M6 6l12 12" /></svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white dark:bg-[#0A0A0A] border-t border-slate-200 dark:border-white/10 overflow-hidden"
          >
            <div className="container mx-auto px-4 py-8 flex flex-col gap-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item)}
                  className="w-full p-5 bg-slate-50 dark:bg-white/5 rounded-2xl text-left border border-slate-100 dark:border-white/5 active:bg-[#38BDF8] active:text-black transition-all"
                >
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-700 dark:text-white">{item.label}</span>
                </button>
              ))}
              <button
                onClick={() => { onShowContact?.(); setIsMenuOpen(false); }}
                className="w-full p-5 bg-[#38BDF8] rounded-2xl text-left border border-black/10 transition-all"
              >
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-black">Contacto Directo</span>
              </button>

              <div className="flex justify-center gap-6 mt-4 pt-8 border-t border-slate-100 dark:border-white/5">
                <a
                  href="https://www.facebook.com/jugarmaspickleball"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-2xl flex items-center justify-center text-slate-500 dark:text-gray-400 active:bg-[#38BDF8] active:text-black transition-all"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
                </a>
                <a
                  href="https://www.instagram.com/joseluisbellot/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-2xl flex items-center justify-center text-slate-500 dark:text-gray-400 active:bg-[#38BDF8] active:text-black transition-all"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
                </a>
                <a
                  href="https://www.linkedin.com/in/jos%C3%A9-luis-bellot-a9b06012/recent-activity/all/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-2xl flex items-center justify-center text-slate-500 dark:text-gray-400 active:bg-[#38BDF8] active:text-black transition-all"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
