
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { saveTestimonial } from '../services/api';
import { PlayerLevel } from '../types';

interface AddTestimonialModalProps {
  onClose: () => void;
}

const AddTestimonialModal: React.FC<AddTestimonialModalProps> = ({ onClose }) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    level: PlayerLevel.MEDIO,
    quote: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await saveTestimonial(formData);
    setLoading(false);
    if (res.success) setStep('success');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-slate-900/60 dark:bg-black/90 backdrop-blur-md"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-white dark:bg-[#141414] w-full max-w-lg rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden border border-slate-200 dark:border-white/10"
      >
        <button onClick={onClose} className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M18 6 6 18M6 6l12 12" /></svg>
        </button>

        <AnimatePresence mode="wait">
          {step === 'form' ? (
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <h3 className="text-3xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white mb-2 leading-none">Comparte tu Experiencia</h3>
              <p className="text-slate-500 dark:text-gray-400 text-sm font-bold uppercase tracking-widest mb-8">Ayuda a otros jugadores a dar el paso</p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 dark:text-gray-500 uppercase tracking-widest mb-2">Tu Nombre Completo</label>
                    <input
                      required
                      type="text"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Ej. Juan Pérez"
                      className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:border-[#38BDF8] outline-none transition-all font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 dark:text-gray-500 uppercase tracking-widest mb-2">Tu Email (Para contactarte)</label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      placeholder="info@ejemplo.com"
                      className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:border-[#38BDF8] outline-none transition-all font-bold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-slate-400 dark:text-gray-500 uppercase tracking-widest mb-2">Tu Nivel de Pickleball</label>
                  <select
                    value={formData.level}
                    onChange={e => setFormData({ ...formData, level: e.target.value as PlayerLevel })}
                    className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:border-[#38BDF8] outline-none transition-all font-bold appearance-none cursor-pointer"
                  >
                    {Object.values(PlayerLevel).map(lvl => (
                      <option key={lvl} value={lvl} className="dark:bg-[#141414]">{lvl}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-slate-400 dark:text-gray-500 uppercase tracking-widest mb-2">Tu Opinión sobre la Comunidad</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.quote}
                    onChange={e => setFormData({ ...formData, quote: e.target.value })}
                    placeholder="¿Qué es lo que más te gusta de Jugar Más Pickleball Zaragoza?"
                    className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:border-[#38BDF8] outline-none transition-all font-bold resize-none"
                  />
                </div>

                <button
                  disabled={loading}
                  className="w-full py-5 bg-[#38BDF8] text-black font-black uppercase italic tracking-tighter text-xl rounded-xl hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 shadow-xl border-2 border-black/5"
                >
                  {loading ? 'Subiendo testimonio...' : 'Enviar mi testimonio'}
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div key="success" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-8">
              <div className="w-20 h-20 bg-[#38BDF8] text-black rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><polyline points="20 6 9 17 4 12" /></svg>
              </div>
              <h3 className="text-3xl font-black italic uppercase text-slate-900 dark:text-white mb-4">¡Gracias por sumar!</h3>
              <p className="text-slate-600 dark:text-gray-400 font-bold italic text-lg leading-relaxed">
                Tu testimonio será revisado por el equipo y aparecerá pronto en la web de Zaragoza.
              </p>
              <button onClick={onClose} className="mt-8 px-8 py-3 bg-slate-100 dark:bg-white/5 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-[#38BDF8] hover:text-black transition-all">
                Cerrar ventana
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default AddTestimonialModal;
