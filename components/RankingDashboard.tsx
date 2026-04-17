
import React from 'react';
import { motion } from 'framer-motion';
import { Icons } from '../constants';

interface RankingDashboardProps {
  onClose: () => void;
  onContinue: () => void;
}

const levels = [
  { ranking: 'Básico', level: 18, points: '1800 – 1700' },
  { ranking: 'Básico', level: 17, points: '1699 – 1600' },
  { ranking: 'Básico', level: 16, points: '1599 – 1500' },
  { ranking: 'Medio-', level: 15, points: '1499 – 1400' },
  { ranking: 'Medio-', level: 14, points: '1399 – 1300' },
  { ranking: 'Medio-', level: 13, points: '1299 – 1200' },
  { ranking: 'Medio', level: 12, points: '1199 – 1100' },
  { ranking: 'Medio', level: 11, points: '1099 – 1000' },
  { ranking: 'Medio', level: 10, points: '999 – 900' },
  { ranking: 'Medio+', level: 9, points: '899 – 800' },
  { ranking: 'Medio+', level: 8, points: '799 – 700' },
  { ranking: 'Radical', level: 7, points: '699 – 600' },
  { ranking: 'Radical', level: 6, points: '599 – 500' },
  { ranking: 'Radical', level: 5, points: '499 – 400' },
  { ranking: 'Radical', level: 4, points: '399 – 300' },
  { ranking: 'Radical Pro', level: 3, points: '299 – 200' },
  { ranking: 'Radical Pro', level: 2, points: '199 – 100' },
  { ranking: 'Radical Pro', level: 1, points: '99 – 0' },
];

const RankingDashboard: React.FC<RankingDashboardProps> = ({ onClose, onContinue }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-[500] flex justify-center items-start pb-4 md:pb-12 bg-slate-900/60 dark:bg-black/95 backdrop-blur-xl overflow-y-auto transition-colors duration-500 cursor-pointer"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-[#141414] border-x border-b border-slate-200 dark:border-white/10 w-full max-w-5xl rounded-b-[2.5rem] shadow-2xl relative transition-colors cursor-default"
      >
        {/* Mobile-only floating close button for better UX */}
        <button
          onClick={onClose}
          className="md:hidden fixed top-6 right-6 z-[600] w-12 h-12 bg-[#38BDF8] text-black rounded-full shadow-2xl flex items-center justify-center border-4 border-white dark:border-black active:scale-90 transition-transform"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><path d="M18 6 6 18M6 6l12 12" /></svg>
        </button>

        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#38BDF8]/5 dark:bg-[#38BDF8]/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none transition-colors" />

        {/* Header */}
        <div className="sticky top-0 z-[100] p-8 md:p-12 bg-white/95 dark:bg-[#141414]/95 backdrop-blur-md border-b border-slate-100 dark:border-white/5 flex justify-between items-start transition-colors rounded-t-[2.5rem]">
          <div>
            <span className="text-[#334155] dark:text-[#38BDF8] font-black text-[10px] md:text-xs uppercase tracking-[0.5em] mb-2 block">Sistema de Ranking Oficial</span>
            <h2 className="text-3xl md:text-5xl font-black italic tracking-tighter uppercase font-heading text-slate-900 dark:text-white transition-colors">Tabla de Niveles <span className="text-slate-300 dark:text-gray-500 transition-colors">(18 → 1)</span></h2>
          </div>
          <button
            onClick={onClose}
            className="hidden md:flex p-3 bg-slate-100 dark:bg-white/5 hover:bg-[#38BDF8] rounded-full transition-all text-slate-500 dark:text-white/50 hover:text-black border border-slate-200 dark:border-white/10"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M18 6 6 18M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="p-8 md:p-12 space-y-16 relative z-10 transition-colors">

          {/* Section 1: The Table */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 relative">
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-slate-100 dark:bg-[#38BDF8]/30 -translate-x-1/2 transition-colors" />

            {[levels.slice(0, 9), levels.slice(9)].map((group, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="grid grid-cols-3 text-[10px] font-black text-slate-400 dark:text-gray-500 uppercase tracking-widest pb-4 border-b border-slate-100 dark:border-white/5 px-4 transition-colors">
                  <span>Ranking</span>
                  <span className="text-center">Nivel</span>
                  <span className="text-right">Puntuación</span>
                </div>
                {group.map((l) => (
                  <div
                    key={l.level}
                    className={`grid grid-cols-3 py-3.5 px-4 rounded-xl transition-all border border-transparent hover:border-[#38BDF8]/40 hover:bg-[#38BDF8]/5 group ${l.level <= 3 ? 'bg-slate-50 dark:bg-white/[0.02]' : ''
                      }`}
                  >
                    <span className={`font-black uppercase italic text-xs md:text-sm transition-colors ${l.level <= 3 ? 'text-[#334155] dark:text-[#38BDF8]' : 'text-slate-500 dark:text-gray-400'}`}>
                      {l.ranking}
                    </span>
                    <span className="text-center font-black font-heading text-lg md:text-xl text-slate-900 dark:text-white transition-colors">{l.level}</span>
                    <span className="text-right text-[10px] md:text-xs font-black text-slate-400 dark:text-gray-500 group-hover:text-slate-900 dark:group-hover:text-white transition-colors uppercase italic">{l.points}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Section 2: Adjustment Logic */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 transition-colors">
            {[
              { id: "1", title: "Media Pareja", desc: "Se calcula la media de nivel de cada pareja." },
              { id: "2", title: "Dificultad", desc: "La diferencia define la dificultad del partido." },
              { id: "3", title: "Resultado", desc: "Ganadores restan puntos · Perdedores suman." },
              { id: "4", title: "Empate", desc: "Victoria parcial para la pareja de menor nivel." },
            ].map(step => (
              <div key={step.id} className="bg-slate-50 dark:bg-white/5 p-6 rounded-2xl border border-slate-100 dark:border-white/5 transition-colors shadow-sm">
                <span className="text-[#334155] dark:text-[#38BDF8] font-black mb-3 block text-xl font-heading tracking-tighter italic">0{step.id}</span>
                <h4 className="font-black text-xs mb-2 uppercase tracking-tight text-slate-900 dark:text-white italic">{step.title}</h4>
                <p className="text-[10px] md:text-xs text-slate-500 dark:text-gray-500 font-bold leading-relaxed transition-colors uppercase tracking-tight">{step.desc}</p>
              </div>
            ))}
          </div>

          {/* Section 3: Key Rules */}
          <div className="bg-[#38BDF8] rounded-3xl p-8 md:p-12 text-black flex flex-col md:flex-row gap-8 items-center justify-between overflow-hidden relative shadow-2xl transition-all">
            <div className="absolute top-0 right-0 opacity-10 pointer-events-none translate-x-1/4 -translate-y-1/4">
              <svg width="400" height="400" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
            </div>

            <div className="max-w-xl relative z-10">
              <h3 className="text-2xl md:text-3xl font-black italic uppercase font-heading mb-4 leading-none tracking-tighter">Regla de Equilibrio (Handicap)</h3>
              <p className="font-bold text-sm md:text-base opacity-80 italic">
                Si los niveles están descompensados, el partido impacta poco o nada. Para que tu ranking se mueva con sentido, <span className="font-black italic underline decoration-black decoration-2 underline-offset-4">busca siempre partidos equilibrados.</span>
              </p>
            </div>

            <div className="flex flex-col gap-4 w-full md:w-auto relative z-10">
              <div className="bg-black text-white p-6 rounded-2xl border border-black/10 shadow-xl">
                <span className="block text-[10px] font-black uppercase tracking-widest mb-1 text-[#38BDF8]">Nuevos Jugadores</span>
                <p className="font-black text-xs italic uppercase tracking-tighter">Ajuste rápido en tus primeros 10 partidos para encontrar tu nivel real.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 border-t border-slate-100 dark:border-white/5 text-center text-[8px] md:text-[10px] text-slate-400 dark:text-gray-600 font-black uppercase tracking-[0.5em] transition-colors">
          Basado en el algoritmo oficial de APP Radical
        </div>
      </motion.div>
    </motion.div>
  );
};

export default RankingDashboard;
