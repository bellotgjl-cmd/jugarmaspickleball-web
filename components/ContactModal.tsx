
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { saveContactMessage } from '../services/api';

interface ContactModalProps {
  onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ onClose }) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    message: '',
    consent: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.consent) return;
    setLoading(true);
    setError(null);

    try {
      const res = await saveContactMessage({ email: formData.email, message: formData.message });
      if (res.success) {
        setStep('success');
      } else {
        setError(res.error || 'Ocurrió un error inesperado');
      }
    } catch (err) {
      setError('Error de conexión. Por favor, inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[400] flex items-center justify-center p-4 bg-slate-900/60 dark:bg-black/90 backdrop-blur-md"
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
              <h3 className="text-3xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white mb-2 leading-none">Contacto Directo</h3>
              <p className="text-slate-500 dark:text-gray-400 text-sm font-bold uppercase tracking-widest mb-8 italic">Zaragoza Pickleball Hub · Equipo Técnico</p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 dark:text-gray-500 uppercase tracking-widest mb-2">Tu Email de contacto</label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="ejemplo@email.com"
                    className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:border-[#38BDF8] outline-none transition-all font-bold"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black text-slate-400 dark:text-gray-500 uppercase tracking-widest mb-2">Tu Mensaje o Consulta</label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Cuéntanos qué necesitas: dudas sobre la app, clubes, niveles..."
                    className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:border-[#38BDF8] outline-none transition-all font-bold resize-none"
                  />
                </div>

                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    required
                    checked={formData.consent}
                    onChange={e => setFormData({ ...formData, consent: e.target.checked })}
                    className="mt-1 w-5 h-5 accent-[#38BDF8] border-2 border-slate-200 dark:border-white/10"
                  />
                  <span className="text-[10px] md:text-xs font-bold text-slate-500 dark:text-gray-400 leading-tight group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                    Doy mi consentimiento para que el equipo de Jugar Más Pickleball Zaragoza me responda vía email.
                  </span>
                </label>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-bold uppercase tracking-widest p-4 rounded-xl text-center"
                  >
                    {error}
                  </motion.div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-5 bg-[#38BDF8] text-black font-black uppercase italic tracking-tighter text-xl rounded-xl hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 shadow-xl border-2 border-black/5"
                >
                  {loading ? 'Enviando...' : 'Enviar Mensaje'}
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div key="success" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-8">
              <div className="w-20 h-20 bg-[#38BDF8] text-black rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z" /></svg>
              </div>
              <h3 className="text-3xl font-black italic uppercase text-slate-900 dark:text-white mb-4">¡Mensaje Recibido!</h3>
              <p className="text-slate-600 dark:text-gray-400 font-bold italic text-lg leading-relaxed">
                Gracias por contactar. Un miembro de nuestro equipo en Zaragoza te responderá lo antes posible.
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

export default ContactModal;
