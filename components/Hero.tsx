
import React from 'react';
import { motion } from 'framer-motion';
import { DashboardTab } from './BenefitsDashboard.tsx';

interface HeroProps {
  onShowBenefits?: (type: DashboardTab) => void;
}

const Hero: React.FC<HeroProps> = ({ onShowBenefits }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <section className="relative pt-32 pb-20 overflow-hidden min-h-[90vh] flex items-center">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_#38BDF815_0%,_transparent_70%)] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.span
            variants={itemVariants}
            className="inline-block px-5 py-2 mb-8 text-xs font-black tracking-[0.4em] text-[#1E293B] dark:text-[#38BDF8] uppercase bg-[#38BDF8]/15 dark:bg-[#38BDF8]/10 rounded-full border border-[#38BDF8]/30 shadow-sm"
          >
            EL FUTURO DEL PICKLEBALL
          </motion.span>
          <motion.h1
            variants={itemVariants}
            className="font-heading text-5xl md:text-8xl font-black mb-8 leading-[0.85] tracking-tighter text-slate-900 dark:text-white transition-colors uppercase"
          >
            EL PICKLEBALL VA A CRECER. <br />
            <span className="text-gradient transition-colors">HAGÁMOSLO CON ORDEN DESDE EL PRINCIPIO.</span>
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-slate-700 dark:text-gray-400 text-xl md:text-3xl max-w-4xl mx-auto mb-8 leading-relaxed font-bold transition-colors"
          >
            Aplicamos al pickleball la experiencia de más de 18 años organizando la comunidad amateur de pádel en Zaragoza, ahora con el soporte de la <span className="text-slate-900 dark:text-white font-black underline decoration-[#38BDF8] decoration-4 underline-offset-4">APP Radical</span>.
          </motion.p>
          <motion.div
            variants={itemVariants}
            className="text-slate-600 dark:text-gray-400 text-lg md:text-xl max-w-3xl mx-auto mb-12 font-medium flex flex-col gap-4"
          >
            <p>Cuando la comunidad está organizada, jugar deja de depender de la suerte.</p>
            <p>Con jugarmaspickleball los jugadores encuentran partidos de su nivel, los organizadores pueden crear actividad fácilmente y los clubes reciben una comunidad activa que llena sus pistas.</p>
            <p className="italic text-slate-500">El mismo modelo que ya funcionó con jugarmaspadel, ahora adaptado al pickleball.</p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-6 max-w-2xl mx-auto">
            <a
              href="https://www.radicalpadel.com/PROGRAMA/S_autenticar.php"
              target="_blank"
              rel="noopener noreferrer"
              className="group btn-heartbeat w-full sm:w-auto px-10 py-5 bg-[#38BDF8] text-black rounded-2xl font-black text-xl md:text-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-4 shadow-[0_20px_60px_rgba(204,255,0,0.4)] border-4 border-white dark:border-black"
            >
              Únete y empieza a jugar
              <svg className="group-hover:translate-x-2 transition-transform" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
            </a>
            <button
              onClick={() => onShowBenefits?.('history')}
              className="w-full sm:w-auto px-10 py-5 bg-slate-900 text-white dark:bg-white/10 dark:text-white rounded-2xl font-black text-xl md:text-2xl hover:bg-slate-800 dark:hover:bg-white/20 transition-all uppercase tracking-tighter border-2 border-slate-700 dark:border-white/20"
            >
              Nuestra Historia nos Avala
            </button>
          </motion.div>

          <motion.div variants={itemVariants} className="mt-16 flex flex-col items-center gap-6 text-sm font-black text-slate-500 dark:text-gray-500 uppercase tracking-[0.3em] transition-colors">
            <div className="flex gap-3">
              {[1, 2, 3, 4, 5].map(i => (
                <svg key={i} width="24" height="24" viewBox="0 0 24 24" fill="#1E293B" className="dark:fill-[#38BDF8] drop-shadow-sm transition-colors animate-neon-glow" style={{ animationDelay: `${i * 200}ms` }}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
              ))}
            </div>
            <span className="italic">La experiencia de 18 años en pádel al servicio del futuro del pickleball.</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
