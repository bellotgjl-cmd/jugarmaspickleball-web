
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQProps {
  onShowContact?: () => void;
}

const faqs = [
  {
    q: "¿Esto es solo para Zaragoza?",
    a: (
      <>
        De momento, sí. Nuestro foco principal es Zaragoza porque queremos asegurar una comunidad fuerte, activa y geográficamente cercana que realmente pase del chat a las pistas.<br /><br />
        Sin embargo, ¡queremos que APP Radical siga creciendo! Si tu provincia o comunidad autónoma aún no tiene una comunidad activa y tienes ganas de liderar el movimiento en tu zona, tú puedes ser quien la cree, la promocione y la haga crecer.<br /><br />
        Si te interesa ser el referente de APP Radical en tu ciudad, contacta a través de <a href="https://www.radicalpickleball.com" target="_blank" rel="noopener noreferrer" className="text-[#0F172A] dark:text-[#38BDF8] underline font-black">www.radicalpickleball.com</a>
      </>
    )
  },
  {
    q: "¿Necesito ser socio/a de un club?",
    a: "No. jugarmaspickleball es abierto. Lo importante es que el partido se gestione bien a través de la app y se respeten las normas de cada club donde se juegue."
  },
  {
    q: "¿Dudas sobre qué nivel elegir para empezar?",
    a: "No te preocupes por la precisión absoluta el primer día. Selecciona el nivel que consideres más cercano a tu juego actual; el sistema está diseñado para ser dinámico. Durante tu primer partido, te recomendamos solicitar la validación de tus compañeros de pista para confirmar tu ranking. Podrás ajustarlo manualmente en la app en cualquier momento antes de que se introduzca el resultado final del encuentro. A partir de ahí, nuestro algoritmo se encargará de que tu progresión sea real y justa."
  },
  {
    q: "¿Quién decide las condiciones del partido?",
    a: "El organizador es el jefe. Decide club, hora, nivel y formato (masc/fem/mixto). Así te apuntas solo a lo que realmente te encaja."
  },
  {
    q: "¿Puedo borrarme si me surge algo?",
    a: "Sí, la app APP Radical permite borrarte y gestionar sustituciones de forma automática para no dejar colgados a los otros 3 jugadores."
  },
  {
    q: "¿Qué papel tiene APP Radical?",
    a: "Es nuestra herramienta tecnológica. Mientras nosotros ponemos la comunidad y la pasión en Zaragoza, ellos ponen el mejor software del mercado para que todo funcione sin fallos."
  },
  {
    id: "contact-trigger",
    q: "¿No encuentras la respuesta a tus dudas?",
    a: "Si has navegado por toda la web y sigues con alguna duda específica sobre tu nivel, un club o el funcionamiento de la app, no te preocupes. Queremos que tu experiencia en Zaragoza sea perfecta y fluida."
  }
];

const FAQ: React.FC<FAQProps> = ({ onShowContact }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-32 bg-slate-50 dark:bg-[#0A0A0A] transition-colors duration-500">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-20">
          <h2 className="font-heading text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white transition-colors">
            PREGUNTAS <span className="text-[#0F172A] dark:text-[#38BDF8] transition-colors">FRECUENTES</span>
          </h2>
          <p className="text-slate-600 dark:text-gray-500 font-bold uppercase tracking-widest text-xs mt-4 transition-colors">Todo lo que necesitas saber antes de entrar a pista.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className={`border rounded-2xl overflow-hidden bg-white dark:bg-[#141414] shadow-sm transition-colors ${faq.id === 'contact-trigger' ? 'border-[#38BDF8]/50' : 'border-slate-200 dark:border-white/5'}`}>
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full p-6 text-left flex justify-between items-center group transition-all hover:bg-slate-50 dark:hover:bg-white/5"
              >
                <span className={`font-black text-lg md:text-xl pr-8 uppercase italic tracking-tight transition-colors ${openIndex === i ? 'text-[#0F172A] dark:text-[#38BDF8]' : 'text-slate-800 dark:text-white group-hover:text-[#0F172A] dark:group-hover:text-[#38BDF8]'}`}>
                  {faq.q}
                </span>
                <span className={`text-[#0F172A] dark:text-[#38BDF8] transform transition-transform duration-300 ${openIndex === i ? 'rotate-180 scale-125' : ''}`}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                </span>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-0 text-slate-700 dark:text-gray-400 font-bold italic leading-relaxed text-base md:text-lg border-t border-slate-100 dark:border-white/5 mt-4 pt-6 transition-colors">
                      {faq.a}

                      {faq.id === 'contact-trigger' && (
                        <div className="mt-8">
                          <button
                            onClick={onShowContact}
                            className="bg-[#38BDF8] text-black px-8 py-4 rounded-xl font-black uppercase italic tracking-tighter text-sm md:text-base hover:scale-105 transition-all shadow-xl flex items-center gap-3"
                          >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z" /></svg>
                            Enviar mi duda al equipo
                          </button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
