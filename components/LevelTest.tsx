
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { saveLead } from '../services/api.ts';
import { PlayerLevel } from '../types.ts';
import RankingDashboard from './RankingDashboard.tsx';

const LevelTest: React.FC = () => {
  const [step, setStep] = useState<'intro' | 'form' | 'success'>('intro');
  const [showDashboard, setShowDashboard] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    whatsapp: '',
    level: PlayerLevel.MEDIO,
    consent: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const result = await saveLead({
      email: formData.email,
      whatsapp: formData.whatsapp,
      type: 'level_test',
      level: formData.level
    });
    setLoading(false);
    if (result.success) setStep('success');
  };

  return (
    <section id="test" className="py-24 relative overflow-hidden bg-slate-50 dark:bg-black transition-colors duration-500">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#38BDF8]/5 to-transparent pointer-events-none" />

      <AnimatePresence>
        {showDashboard && (
          <RankingDashboard
            onClose={() => setShowDashboard(false)}
            onContinue={() => {
              setShowDashboard(false);
              setStep('form');
            }}
          />
        )}
      </AnimatePresence>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto bg-white dark:bg-[#141414] border border-slate-200 dark:border-white/10 rounded-[2rem] overflow-hidden shadow-2xl flex flex-col md:flex-row transition-colors">

          <div className="md:w-5/12 p-8 md:p-12 bg-[#38BDF8] text-black flex flex-col justify-between">
            <div>
              <h2 className="font-heading text-3xl font-black mb-4 uppercase italic leading-[0.9] tracking-tighter">¿CUÁL ES TU NIVEL REAL?</h2>
              <p className="font-black mb-8 opacity-90 text-sm">Contar con un nivel ranking real hace que disfrutes de partidos competidos.</p>

              <ul className="space-y-4">
                {['10 Partidos validan tu Ranking.', 'Acceso a partidos de tu nivel.'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 font-black text-sm uppercase italic">
                    <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center shrink-0 shadow-lg">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#38BDF8" strokeWidth="4"><polyline points="20 6 9 17 4 12" /></svg>
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>


          </div>

          <div className="md:w-7/12 p-8 md:p-12 transition-colors">
            <AnimatePresence mode="wait">
              {step === 'intro' && (
                <motion.div
                  key="intro"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex flex-col justify-center h-full"
                >
                  <h3 className="text-2xl font-black italic uppercase tracking-tight text-slate-900 dark:text-white mb-6">Nivel Amateur Ranking:</h3>
                  <div className="text-slate-500 dark:text-gray-400 mb-8 space-y-3 text-sm md:text-base leading-relaxed font-bold transition-colors">
                    <p>El sistema usa un algoritmo tipo <span className="text-slate-900 dark:text-white font-black italic underline decoration-[#38BDF8] decoration-2">ELO</span>.</p>
                    <p>El objetivo es llevar a cada jugador al nivel que le corresponde en no más de 10 Partidos según: <span className="text-[#0F172A] dark:text-[#38BDF8] font-black italic uppercase transition-colors">GANAS / PIERDES / EMPATAS</span>.</p>
                    <p className="bg-slate-50 dark:bg-white/5 p-4 rounded-xl border-l-4 border-[#38BDF8] shadow-sm">
                      ➡️ <span className="text-slate-700 dark:text-white font-black italic uppercase text-xs">Traducción práctica:</span> si el partido está descompensado, el ranking se mueve poco o nada. Si está equilibrado, se mueve más.
                    </p>
                  </div>
                  <button
                    onClick={() => setShowDashboard(true)}
                    className="btn-heartbeat w-full py-5 bg-slate-900 dark:bg-white text-white dark:text-black font-black uppercase italic tracking-widest rounded-xl hover:scale-105 transition-all shadow-xl"
                  >
                    Tabla de Nivel Ranking
                  </button>
                </motion.div>
              )}

              {step === 'form' && (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-black italic uppercase text-slate-900 dark:text-white">Hacer el Test Oficial</h3>
                    <button
                      type="button"
                      onClick={() => setStep('intro')}
                      className="text-xs font-black text-[#0F172A] dark:text-[#38BDF8] hover:underline uppercase tracking-widest transition-colors"
                    >
                      Volver
                    </button>
                  </div>
                  <div>
                    <label className="block text-xs font-black text-slate-500 dark:text-gray-500 uppercase tracking-[0.2em] mb-2">Tu Email (Resultados)</label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      placeholder="ejemplo@email.com"
                      className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:border-[#38BDF8] outline-none transition-all font-bold"
                    />
                  </div>

                  <button
                    disabled={loading}
                    className="btn-heartbeat w-full py-5 bg-[#38BDF8] text-black font-black uppercase italic tracking-tighter text-xl rounded-xl hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-2xl border-2 border-black/10"
                  >
                    {loading ? 'Procesando...' : 'Finalizar y Ver Resultado'}
                  </button>
                </motion.form>
              )}

              {step === 'success' && (
                <motion.div
                  key="success"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center py-10"
                >
                  <div className="w-20 h-20 bg-[#38BDF8]/10 rounded-full flex items-center justify-center text-[#0F172A] dark:text-[#38BDF8] mx-auto mb-6 shadow-inner">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><polyline points="20 6 9 17 4 12" /></svg>
                  </div>
                  <h3 className="text-3xl font-black italic uppercase text-slate-900 dark:text-white mb-4">¡Petición Recibida!</h3>
                  <p className="text-slate-600 dark:text-gray-400 mb-8 font-bold italic text-lg">Estamos analizando tus datos. En menos de 5 minutos recibirás tu informe de nivel por email.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LevelTest;
