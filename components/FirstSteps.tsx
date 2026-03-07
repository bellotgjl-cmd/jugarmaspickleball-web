
import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  {
    id: "01",
    title: "Entra en la comunidad",
    desc: "Únete a nuestro ecosistema en Zaragoza y conoce a otros jugadores."
  },
  {
    id: "02",
    title: "Descarga APP Radical",
    desc: "La herramienta técnica donde sucede toda la magia de la gestión."
  },
  {
    id: "03",
    title: "Apúntate a un partido por nivel",
    desc: "Busca el partido que te encaje y reserva tu plaza en segundos."
  },
  {
    id: "04",
    title: "Juega",
    desc: "Salta a la pista y disfruta de un partido equilibrado y sin líos."
  }
];

const FirstSteps: React.FC = () => {
  return (
    <section className="py-24 bg-white dark:bg-[#0A0A0A] border-b border-slate-100 dark:border-white/5 transition-colors duration-500">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <span className="text-[#1E293B] dark:text-[#38BDF8] font-black text-xs md:text-sm uppercase tracking-[0.5em] mb-4 block">GUÍA RÁPIDA</span>
          <h2 className="font-heading text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white transition-colors">PRIMEROS PASOS</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {steps.map((step, i) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative group p-10 rounded-[2.5rem] bg-slate-50 dark:bg-white/[0.03] border-2 border-slate-100 dark:border-white/5 hover:border-[#38BDF8]/40 transition-all duration-500 flex flex-col shadow-sm hover:shadow-2xl"
            >
              <div className="flex-grow">
                <span className="text-5xl md:text-7xl font-black font-heading italic block mb-8 transition-all duration-500 text-slate-300 dark:text-[#38BDF8]/40 group-hover:text-[#1E293B] dark:group-hover:text-[#38BDF8]">
                  {step.id}
                </span>
                <h3 className="text-2xl font-black italic uppercase leading-none mb-6 tracking-tighter text-slate-800 dark:text-white group-hover:text-[#1E293B] dark:group-hover:text-[#38BDF8] transition-colors leading-[0.9]">
                  {step.title}
                </h3>
                <p className="text-slate-600 dark:text-gray-400 text-base md:text-lg font-bold leading-relaxed border-l-4 border-[#38BDF8] pl-6 transition-colors uppercase italic tracking-tight group-hover:text-slate-900 dark:group-hover:text-gray-300">
                  {step.desc}
                </p>
              </div>

              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-6 text-slate-200 dark:text-white/10 -translate-y-1/2">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FirstSteps;
