
import React, { useState, useEffect } from 'react';
import Header from './components/Header.tsx';
import Hero from './components/Hero.tsx';
import Features from './components/Features.tsx';
import FirstSteps from './components/FirstSteps.tsx';
import LevelTest from './components/LevelTest.tsx';
import Testimonials from './components/Testimonials.tsx';
import FAQ from './components/FAQ.tsx';
import Footer from './components/Footer.tsx';
import AIChatbot from './components/AIChatbot.tsx';
import BenefitsDashboard, { DashboardTab } from './components/BenefitsDashboard.tsx';
import ContactModal from './components/ContactModal.tsx';
import { AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
  const [showBenefits, setShowBenefits] = useState<DashboardTab | null>(null);
  const [showContact, setShowContact] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const toggleAdmin = () => {
    setIsAdminMode(!isAdminMode);
    if (!isAdminMode) {
      alert("Modo Administrador activado: Bienvenida José Luis Bellot.");
    }
  };

  const handleAINavigation = (destination: string) => {
    const sectionMap: Record<string, string> = {
      'pasos': 'pasos',
      'beneficios': 'beneficios',
      'test': 'test',
      'faq': 'faq',
    };

    const dashboardMap: Record<string, DashboardTab> = {
      'players': 'players',
      'clubs': 'clubs',
      'clubplus': 'clubplus',
      'historia': 'history'
    };

    if (destination === 'contacto') {
      setShowContact(true);
      setShowBenefits(null);
    } else if (dashboardMap[destination]) {
      setShowBenefits(dashboardMap[destination]);
      setShowContact(false);
    } else if (sectionMap[destination]) {
      const el = document.getElementById(sectionMap[destination]);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        setShowBenefits(null);
        setShowContact(false);
      }
    } else {
      setShowContact(true);
    }
  };

  return (
    <div className="min-h-screen selection:bg-[#38BDF8] selection:text-black bg-slate-50 dark:bg-[#0A0A0A] text-slate-900 dark:text-white transition-colors duration-500 overflow-x-hidden">
      <Header
        onShowBenefits={(type) => setShowBenefits(type)}
        onShowContact={() => setShowContact(true)}
        onScrollToSection={(id) => handleAINavigation(id)}
        isDarkMode={isDarkMode}
        onToggleTheme={toggleTheme}
      />

      <AnimatePresence>
        {showBenefits && (
          <BenefitsDashboard
            initialTab={showBenefits}
            onClose={() => setShowBenefits(null)}
          />
        )}
        {showContact && (
          <ContactModal
            onClose={() => setShowContact(false)}
          />
        )}
      </AnimatePresence>

      <main className="pt-20">
        <Hero onShowBenefits={(type) => setShowBenefits(type)} />

        <div className="bg-[#38BDF8] py-8 relative z-20 transform -rotate-1 origin-center scale-105 overflow-hidden border-y-4 border-black/10">
          <div className="container mx-auto px-4 whitespace-nowrap overflow-hidden">
            <div className="inline-flex animate-marquee">
              <div className="flex items-center gap-12 font-heading font-black text-black text-2xl italic tracking-tighter uppercase px-6">
                <span>IMAGINA UNA COMUNIDAD DE 15.000 JUGADORES EN ZARAGOZA</span>
                <span>•</span>
                <span>PARTIDOS EN &lt; 5 MINUTOS</span>
                <span>•</span>
                <span>RECONOCIMIENTO DE LOS CLUBES</span>
                <span>•</span>
                <span>APP Radical ECOSYSTEM</span>
                <span>•</span>
              </div>
              <div className="flex items-center gap-12 font-heading font-black text-black text-2xl italic tracking-tighter uppercase px-6">
                <span>IMAGINA UNA COMUNIDAD DE 15.000 JUGADORES EN ZARAGOZA</span>
                <span>•</span>
                <span>PARTIDOS EN &lt; 5 MINUTOS</span>
                <span>•</span>
                <span>RECONOCIMIENTO DE LOS CLUBES</span>
                <span>•</span>
                <span>APP Radical ECOSYSTEM</span>
                <span>•</span>
              </div>
            </div>
          </div>
        </div>

        <div id="pasos">
          <FirstSteps />
        </div>

        <Features />

        <LevelTest />

        <section className="py-24 bg-[#0A0A0A] relative overflow-hidden transition-colors duration-500">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#38BDF8]/5 blur-[120px] rounded-full opacity-50 pointer-events-none" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-16 md:gap-24">
              <div className="md:w-1/2">
                <div className="relative group">
                  <div className="absolute -inset-4 bg-[#38BDF8]/20 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#38BDF8] to-transparent rounded-[2.5rem] opacity-20 group-hover:opacity-100 blur-sm transition-opacity" />
                  <div className="relative bg-white/5 border border-white/10 p-2 rounded-[2.5rem] overflow-hidden shadow-2xl">
                    <img
                      src="/jose-luis-support.webp"
                      alt="Soporte Zaragoza - José Luis Bellot"
                      className="rounded-[2rem] grayscale hover:grayscale-0 transition-all duration-1000 aspect-[4/5] object-cover scale-105 group-hover:scale-100 animate-neon-glow"
                    />
                  </div>
                </div>
              </div>
              <div className="md:w-1/2">
                <span className="text-[#38BDF8] font-black text-xs uppercase tracking-[0.5em] mb-6 block italic">ZARAGOZA PICKLEBALL HUB</span>
                <h3 className="font-heading text-4xl md:text-6xl font-black italic text-white uppercase leading-[0.9] tracking-tighter mb-8">
                  ¿DUDAS SOBRE<br />EL NIVEL O<br />LOS CLUBES?
                </h3>
                <p className="text-gray-400 text-lg md:text-xl font-bold italic mb-10 leading-relaxed">
                  Si tienes una consulta técnica sobre tu ranking, quieres sugerir una mejora o simplemente quieres saber por dónde empezar en Zaragoza, escríbenos directamente.
                </p>
                <button
                  onClick={() => setShowContact(true)}
                  className="group flex items-center gap-4 bg-[#38BDF8] text-black px-12 py-6 rounded-2xl font-black text-2xl italic uppercase tracking-tighter hover:scale-105 transition-all shadow-2xl"
                >
                  Hablar con Soporte
                  <svg className="group-hover:translate-x-2 transition-transform" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z" /></svg>
                </button>
                <p className="mt-8 text-[10px] text-gray-500 font-black uppercase tracking-[0.4em]">Respuesta técnica garantizada en Zaragoza.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-32 bg-white dark:bg-[#0A0A0A] relative border-y border-slate-200 dark:border-white/5 overflow-hidden">
          <div className="absolute inset-0 bg-[#38BDF8]/5 opacity-20 pointer-events-none" />
          <div className="container mx-auto px-4 text-center relative z-10">
            <h3 className="font-heading text-4xl md:text-7xl font-bold mb-8 tracking-tighter text-slate-900 dark:text-white">SI TE GUSTA EL PICKLEBALL, <br /><span className="text-[#38BDF8] drop-shadow-sm dark:drop-shadow-none">DEJA DE DEPENDER DEL AZAR.</span></h3>
            <p className="text-slate-500 dark:text-gray-400 mb-12 max-w-2xl mx-auto text-xl font-bold leading-relaxed">Únete a la plataforma que está cambiando las reglas del juego en Zaragoza. Juntarnos, organizarnos y jugar más.</p>
            <div className="flex justify-center px-4">
              <a
                href="https://www.radicalpadel.com/PROGRAMA/S_autenticar.php"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-heartbeat px-12 py-6 bg-[#38BDF8] text-black font-black text-2xl md:text-3xl italic uppercase rounded-2xl hover:scale-110 active:scale-95 transition-all shadow-2xl block w-full sm:w-auto border-4 border-white dark:border-black"
              >
                Empezar a jugar hoy
              </a>
            </div>
            <p className="mt-8 text-xs font-black text-slate-400 dark:text-gray-600 uppercase tracking-widest italic">💛 Siente la diferencia y trae a tus amigos.</p>
          </div>
        </section>

        <Testimonials isAdmin={isAdminMode} />

        <div id="faq">
          <FAQ onShowContact={() => setShowContact(true)} />
        </div>
      </main>

      <Footer
        onShowBenefits={(type) => setShowBenefits(type)}
        onShowContact={() => setShowContact(true)}
        onToggleAdmin={toggleAdmin}
        isAdmin={isAdminMode}
      />

      {/* Barra Social Flotante */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-[150] hidden xl:flex flex-col gap-4">
        <a
          href="https://www.facebook.com/jugarmaspickleball"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl flex items-center justify-center text-slate-400 hover:text-black hover:bg-[#38BDF8] hover:border-[#38BDF8] transition-all duration-500 hover:scale-110 group shadow-2xl"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
          <span className="absolute right-16 bg-black text-[#38BDF8] px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-[#38BDF8]/30 shadow-[0_0_15px_#38BDF840]">
            Muro de Facebook
          </span>
        </a>
        <a
          href="https://www.instagram.com/joseluisbellot/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl flex items-center justify-center text-slate-400 hover:text-black hover:bg-[#38BDF8] hover:border-[#38BDF8] transition-all duration-500 hover:scale-110 group shadow-2xl"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
          <span className="absolute right-16 bg-black text-[#38BDF8] px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-[#38BDF8]/30 shadow-[0_0_15px_#38BDF840]">
            Instagram Jugar Más Pickleball
          </span>
        </a>
        <a
          href="https://www.linkedin.com/in/jos%C3%A9-luis-bellot-a9b06012/recent-activity/all/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl flex items-center justify-center text-slate-400 hover:text-black hover:bg-[#38BDF8] hover:border-[#38BDF8] transition-all duration-500 hover:scale-110 group shadow-2xl"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
          <span className="absolute right-16 bg-black text-[#38BDF8] px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-[#38BDF8]/30 shadow-[0_0_15px_#38BDF840]">
            Publicaciones LinkedIn
          </span>
        </a>
      </div>

      <AIChatbot onNavigate={handleAINavigation} />
    </div>
  );
};

export default App;
