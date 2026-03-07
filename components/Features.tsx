
import React from 'react';
import { motion } from 'framer-motion';
import { Icons } from '../constants';

const FeatureCard = ({ icon: Icon, title, desc, delay }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    className="bg-white dark:bg-[#141414] border border-slate-200 dark:border-white/5 p-8 rounded-[2rem] hover:border-[#38BDF8]/30 transition-all group shadow-sm hover:shadow-xl"
  >
    <div className="w-14 h-14 bg-[#38BDF8]/10 rounded-2xl flex items-center justify-center text-[#334155] dark:text-[#38BDF8] mb-8 group-hover:scale-110 group-hover:bg-[#38BDF8] group-hover:text-black transition-all">
      <Icon />
    </div>
    <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white group-hover:text-[#334155] dark:group-hover:text-[#38BDF8] transition-colors">{title}</h3>
    <p className="text-slate-500 dark:text-gray-400 leading-relaxed text-sm md:text-base font-medium">{desc}</p>
  </motion.div>
);

const Features: React.FC = () => {
  return (
    <section id="beneficios" className="py-32 bg-slate-50 dark:bg-[#0A0A0A] transition-colors duration-500">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <span className="text-[#334155] dark:text-[#38BDF8] font-black text-xs uppercase tracking-[0.3em] mb-4 block">POR QUÉ NOSOTROS</span>
            <h2 className="font-heading text-4xl md:text-6xl font-bold leading-tight text-slate-900 dark:text-white transition-colors">ZARAGOZA TIENE GANAS, <br /><span className="text-slate-400 dark:text-gray-500 transition-colors">NOSOTROS PONEMOS EL ORDEN.</span></h2>
          </div>
          <p className="text-slate-500 dark:text-gray-400 max-w-sm text-lg font-medium transition-colors">
            Usamos APP Radical para que la gestión sea impecable. Menos líos de WhatsApp, más pickleball real.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={Icons.Users}
            title="Comunidad Zaragoza"
            desc="Unimos a jugadores y jugadoras en la comunidad de Pickleball, mas grande y mejor organizada de Zaragoza. Crea tu partido, pon tus condiciones y a jugar."
            delay={0.1}
          />
          <FeatureCard 
            icon={Icons.Check}
            title="Sin Cancelaciones"
            desc="Nuestro sistema de reservas y sustituciones reduce las bajas de última hora. Si alguien falta, APP Radical te ayuda a cubrir el hueco."
            delay={0.2}
          />
          <FeatureCard 
            icon={Icons.Zap}
            title="Niveles Equilibrados"
            desc="Se acabó el jugar partidos desiguales. Filtra por nivel real y asegúrate de que cada punto cuente y te diviertas."
            delay={0.3}
          />
        </div>
      </div>
    </section>
  );
};

export default Features;
