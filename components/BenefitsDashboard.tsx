
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';

export type DashboardTab = 'players' | 'clubs' | 'clubplus' | 'history';

interface BenefitsDashboardProps {
  initialTab: DashboardTab;
  onClose: () => void;
}

const BenefitsDashboard: React.FC<BenefitsDashboardProps> = ({ initialTab, onClose }) => {
  const [activeTab, setActiveTab] = useState<DashboardTab>(initialTab);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  // Reset scroll to top when changing tabs
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [activeTab]);

  const playerBenefits = [
    { title: "Independencia Total", desc: "Juega sin depender de tu grupo fijo de siempre." },
    { title: "El Partido es Prioridad", desc: "Organizas con antelación y el sistema asegura que salga." },
    { title: "Adiós al Caos", desc: "Gestión impecable: apuntarse, borrarse o sustituir sin drama." },
    { title: "Condiciones Claras", desc: "Eliges club, nivel y formato antes de entrar." },
    { title: "Menos Plantones", desc: "Sistema de compromiso que reduce bajas de última hora." },
    { title: "Inclusión Real", desc: "Espacios seguros y activos para nuevas jugadoras." }
  ];

  const clubPlusPoints = [
    { id: "01", title: "Integración total Partido + Pista", desc: "Organizar un partido queda conectado con la reserva real del club." },
    { id: "02", title: "Disponibilidad real de pistas", desc: "Se trabaja con información real, no con suposiciones." },
    { id: "03", title: "Reserva directa desde el flujo", desc: "Menos pasos, menos llamadas: se cierra pista con mayor eficacia." },
    { id: "04", title: "Aviso automático Minuto 1", desc: "La app te avisa justo cuando se abre el plazo para reservar al instante.", highlight: true },
    { id: "05", title: "Menos partidos caídos", desc: "La probabilidad de 'no hay pista' baja drásticamente." },
    { id: "06", title: "Reubicación inteligente Smart", desc: "Cambio a otro club con disponibilidad sin romper el partido." },
    { id: "07", title: "Operativa limpia (No WhatsApp)", desc: "Comunicación, cambios y sustituciones centralizados sin caos." },
    { id: "08", title: "Ocupación estable y rentable", desc: "Más reservas confirmadas y continuidad semanal en el club." },
    { id: "09", title: "Fidelización con retorno real", desc: "Las bonificaciones se consumen en el club vía bono monedero." },
    { id: "10", title: "Cuidado del Jugador Motor", desc: "Detectas quién genera actividad y lo conviertes en aliado." },
    { id: "11", title: "Convivencia perfecta Mixta", desc: "Socios locales + comunidad abierta en armonía total." },
    { id: "12", title: "Doble motor de actividad", desc: "Liga interna Radical + Partidos abiertos jugarmaspickleball." },
    { id: "13", title: "Datos para decisiones", desc: "Trazabilidad completa de horarios, potencia y perfiles." },
    { id: "14", title: "Reputación: 'Aquí jugar es fácil'", desc: "La experiencia fluida genera recomendación y pertenencia." },
    { id: "15", title: "Ventaja Competitiva Local", desc: "El modelo más atractivo para el jugador amateur en Zaragoza." }
  ];

  return (
    <motion.div
      ref={scrollContainerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[500] flex justify-center items-start pt-12 pb-12 px-2 md:px-12 bg-slate-900/70 dark:bg-black/98 backdrop-blur-2xl overflow-y-auto transition-colors duration-500"
    >
      <motion.div
        initial={{ scale: 0.95, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-white dark:bg-[#0D0D0D] border border-slate-200 dark:border-white/10 w-full max-w-7xl rounded-[2.5rem] md:rounded-[3rem] shadow-2xl relative overflow-hidden my-auto transition-colors duration-500"
      >
        {/* Glow Background */}
        <div className={`absolute -top-40 -left-40 w-[600px] h-[600px] blur-[150px] rounded-full pointer-events-none transition-colors duration-1000 ${activeTab === 'history' ? 'bg-[#38BDF8]/10 dark:bg-[#38BDF8]/15' : 'bg-[#38BDF8]/5 dark:bg-[#38BDF8]/5'}`} />

        {/* Header Section */}
        <div className="p-6 md:p-14 border-b border-slate-100 dark:border-white/5 relative z-10 transition-colors">
          <div className="flex justify-between items-start mb-10">
            <div className="flex items-center gap-4">
              <Logo isDark={false} className="h-12 md:h-16" />
            </div>
            <button
              onClick={onClose}
              className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center bg-slate-100 dark:bg-white/5 hover:bg-[#38BDF8] hover:text-black rounded-xl md:rounded-2xl transition-all group border border-slate-200 dark:border-white/10"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M18 6 6 18M6 6l12 12" /></svg>
            </button>
          </div>

          <div className="flex flex-wrap gap-2 md:gap-4 p-2 bg-slate-50 dark:bg-white/5 w-fit rounded-2xl md:rounded-[2rem] border border-slate-200 dark:border-white/10 transition-colors overflow-x-auto max-w-full">
            {[
              { id: 'players', label: 'Jugadores' },
              { id: 'clubs', label: 'Club' },
              { id: 'clubplus', label: 'Club Plus' },
              { id: 'history', label: 'Historia' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as DashboardTab)}
                className={`px-4 py-2.5 md:px-6 md:py-4 rounded-xl font-black uppercase text-[10px] md:text-xs tracking-widest transition-all duration-500 whitespace-nowrap ${activeTab === tab.id ? 'bg-[#38BDF8] text-black shadow-lg scale-105' : 'text-slate-500 dark:text-gray-500 hover:text-slate-900 dark:hover:text-white'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 md:p-14 relative z-10 transition-colors">
          <AnimatePresence mode="wait">
            {activeTab === 'players' && (
              <motion.div key="players" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="grid grid-cols-1 lg:grid-cols-3 gap-10 md:gap-12">
                <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {playerBenefits.map((b, i) => (
                    <div key={i} className="group p-10 rounded-[2.5rem] border-2 bg-slate-50 dark:bg-white/[0.03] border-slate-100 dark:border-white/5 hover:border-[#38BDF8]/40 transition-all duration-500 flex flex-col justify-between shadow-sm hover:shadow-2xl">
                      <div>
                        <span className="text-5xl md:text-6xl font-black font-heading italic block mb-8 transition-all duration-500 text-slate-300 dark:text-[#38BDF8]/40 group-hover:text-[#1E293B] dark:group-hover:text-[#38BDF8]">
                          0{i + 1}
                        </span>
                        <h4 className="text-2xl font-black italic uppercase leading-none mb-4 tracking-tighter text-slate-800 dark:text-white group-hover:text-[#0F172A] dark:group-hover:text-[#38BDF8] transition-colors">{b.title}</h4>
                        <p className="text-base md:text-lg font-bold leading-relaxed text-slate-500 dark:text-gray-400 group-hover:text-slate-900 dark:group-hover:text-gray-300 transition-colors">{b.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-[#38BDF8] p-10 rounded-[2.5rem] md:rounded-[3rem] text-black shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[350px]">
                  <div className="absolute top-0 right-0 p-8 opacity-10"><svg width="150" height="150" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg></div>
                  <div>
                    <h4 className="font-black uppercase italic text-4xl mb-8 leading-[0.85] tracking-tighter">EL TIEMPO<br />ES DINERO</h4>
                    <div className="space-y-6">
                      <div className="flex justify-between items-center border-b border-black/20 pb-4">
                        <span className="font-black text-xs uppercase tracking-widest">Organizador/a</span>
                        <span className="bg-black text-[#38BDF8] px-6 py-2 rounded-full font-black text-lg shadow-xl">+1,00€</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-black text-xs uppercase tracking-widest">Jugador/a</span>
                        <span className="bg-black/15 px-6 py-2 rounded-full font-black text-lg">+0,25€</span>
                      </div>
                    </div>
                  </div>
                  <p className="mt-8 text-xs font-black uppercase opacity-70 tracking-[0.2em] italic border-t border-black/20 pt-6">Bono Monedero Club Convenio</p>
                </div>
              </motion.div>
            )}

            {activeTab === 'clubs' && (
              <motion.div key="clubs" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Card 1: Modelo Estándar (Combined) */}
                <div className="p-10 border border-slate-200 dark:border-white/10 rounded-[2.5rem] md:rounded-[3rem] bg-slate-50 dark:bg-white/[0.02] transition-colors shadow-sm flex flex-col">
                  <span className="text-slate-400 dark:text-gray-500 font-black text-sm uppercase tracking-[0.4em] mb-10 block">Modelo Estándar:</span>

                  <div className="space-y-12">
                    {/* Sub-level 1: Club Libre */}
                    <div>
                      <h4 className="text-slate-900 dark:text-white text-2xl font-black italic uppercase mb-4 leading-none tracking-tighter transition-colors">Nivel: Club Normal</h4>
                      <ul className="space-y-3 text-slate-700 dark:text-gray-400 font-bold text-lg transition-colors">
                        <li className="flex gap-4">✓ Visibilidad básica buscador</li>
                        <li className="flex gap-4">✓ Sin fidelización monedero</li>
                      </ul>
                    </div>

                    <div className="h-px bg-slate-200 dark:bg-white/10 w-full" />

                    {/* Sub-level 2: Club Convenio */}
                    <div>
                      <h4 className="text-slate-900 dark:text-white text-2xl font-black italic uppercase mb-4 leading-none tracking-tighter transition-colors">Nivel: Club Convenio</h4>
                      <ul className="space-y-3 text-slate-700 dark:text-gray-400 font-bold text-lg transition-colors">
                        <li className="flex gap-4">✓ Visibilidad mejorada buscador</li>
                        <li className="flex flex-col">
                          <div className="flex gap-4">✓ Fidelización monedero:</div>
                          <div className="pl-8 mt-2 space-y-2 text-base opacity-90 font-black italic uppercase tracking-tight">
                            <div className="flex gap-2"><span>.</span> Organizador +1'00 €</div>
                            <div className="flex gap-2"><span>.</span> Jugador +0'25 €</div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Card 2: Business Premium */}
                <div className="p-10 border-4 border-[#38BDF8] dark:border-[#38BDF8] rounded-[2.5rem] md:rounded-[3rem] bg-[#38BDF8]/5 dark:bg-[#38BDF8]/10 shadow-2xl transition-all flex flex-col relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" /></svg>
                  </div>
                  <span className="text-[#0F172A] dark:text-[#38BDF8] font-black text-sm uppercase tracking-[0.4em] mb-10 block transition-colors italic">Business Premium</span>
                  <h4 className="text-slate-900 dark:text-white text-4xl font-black italic uppercase mb-8 leading-none tracking-tighter transition-colors">CLUB CONVENIO + APP RADICAL</h4>

                  <ul className="space-y-4 text-slate-700 dark:text-gray-400 font-bold text-lg mb-12">
                    <li className="flex gap-4">✓ Visibilidad preferente buscador</li>
                    <li className="flex gap-4">✓ Gestión de reservas directa</li>
                    <li className="flex gap-4">✓ Fidelización monedero</li>
                  </ul>

                  <div className="space-y-6 flex-grow flex flex-col justify-center">
                    <div className="bg-[#38BDF8] p-8 rounded-3xl flex flex-col sm:flex-row justify-between items-center gap-4 shadow-2xl shadow-black/10">
                      <span className="text-black font-black uppercase tracking-tighter italic text-3xl">Incentivo Organizador</span>
                      <span className="text-black font-black text-5xl italic">+1€</span>
                    </div>
                    <div className="bg-slate-900 dark:bg-white/5 border border-slate-800 dark:border-white/10 p-8 rounded-3xl flex flex-col sm:flex-row justify-between items-center gap-4 text-[#38BDF8] transition-colors shadow-2xl shadow-black/10">
                      <span className="font-black uppercase tracking-tighter italic text-3xl">Incentivo Jugador</span>
                      <span className="font-black text-5xl italic">+0,25€</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'clubplus' && (
              <motion.div key="clubplus" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="transition-colors">
                <div className="text-center mb-16 md:mb-24 px-6 md:px-0">
                  <span className="text-[#0F172A] dark:text-[#38BDF8] font-black text-[10px] md:text-base uppercase tracking-[0.4em] mb-6 block transition-colors">CAPACIDAD TÉCNICA TOTAL</span>
                  <h3 className="text-[2.2rem] sm:text-5xl md:text-7xl font-black italic uppercase font-heading tracking-tight text-slate-900 dark:text-white transition-colors leading-[0.85] flex flex-col items-center gap-2 max-w-full mx-auto">
                    <span className="block w-full text-center pr-2">PILARES DEL</span>
                    <span className="relative inline-block mt-2 pr-2">
                      <span className="text-gradient relative z-10">CLUB PLUS</span>
                      <span className="absolute -bottom-1 left-0 w-full h-2 md:h-5 bg-[#38BDF8] -z-10 opacity-80 rounded-full" />
                    </span>
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-colors">
                  {clubPlusPoints.map((p) => (
                    <div key={p.id} className={`group p-10 rounded-[2.5rem] border-2 transition-all duration-500 flex flex-col justify-between h-full ${p.highlight ? 'bg-[#38BDF8]/5 dark:bg-[#38BDF8]/10 border-[#38BDF8] scale-[1.03] shadow-2xl' : 'bg-slate-50 dark:bg-white/[0.03] border-slate-100 dark:border-white/5 hover:border-[#38BDF8]/40 shadow-sm hover:shadow-2xl'}`}>
                      <div>
                        <span className={`text-5xl md:text-6xl font-black font-heading italic block mb-8 transition-all duration-500 ${p.highlight ? 'text-[#0F172A] dark:text-[#38BDF8]' : 'text-slate-300 dark:text-[#38BDF8]/40 group-hover:text-[#1E293B] dark:group-hover:text-[#38BDF8]'}`}>{p.id}</span>
                        <h4 className={`text-2xl font-black italic uppercase leading-none mb-4 tracking-tighter transition-colors ${p.highlight ? 'text-slate-900 dark:text-white' : 'text-slate-800 dark:text-white group-hover:text-[#0F172A] dark:group-hover:text-[#38BDF8]'}`}>{p.title}</h4>
                        <p className={`text-base md:text-lg leading-relaxed transition-colors font-bold ${p.highlight ? 'text-slate-700 dark:text-white/80' : 'text-slate-500 dark:text-gray-500 group-hover:text-slate-900 dark:group-hover:text-gray-400'}`}>{p.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'history' && (
              <motion.div key="history" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-6xl mx-auto pb-12 transition-colors">
                {/* Manifesto Header */}
                <div className="text-center mb-24 md:mb-40 relative px-4">
                  <span className="text-[#0F172A] dark:text-[#38BDF8] font-black text-sm uppercase tracking-[0.6em] mb-12 block transition-colors">ZARAGOZA · DESDE 2006</span>

                  <div className="flex flex-col gap-2 items-center justify-center">
                    <span className="font-heading text-4xl md:text-6xl font-extralight text-slate-500 dark:text-white/60 uppercase tracking-[0.3em] md:tracking-[0.4em] leading-none mb-4 transition-colors">
                      NO NACIMOS COMO
                    </span>
                    <h3 className="font-heading text-6xl md:text-[9rem] lg:text-[12rem] font-black italic text-slate-900 dark:text-white uppercase tracking-[-0.06em] leading-[0.75] mb-8 md:mb-12 relative transition-colors shadow-sm">
                      NEGOCIO
                    </h3>
                    <div className="flex items-center gap-6 md:gap-12 mb-8 md:mb-12">
                      <div className="h-[3px] w-12 md:w-32 bg-slate-900 dark:bg-white/30 transition-colors" />
                      <span className="text-[#0F172A] dark:text-[#38BDF8] font-black text-2xl md:text-5xl italic tracking-tighter uppercase transition-colors">SINO POR</span>
                      <div className="h-[3px] w-12 md:w-32 bg-slate-900 dark:bg-white/30 transition-colors" />
                    </div>
                    <h3 className="font-heading text-7xl md:text-[9rem] lg:text-[12rem] font-black italic text-[#0F172A] dark:text-[#38BDF8] uppercase tracking-[-0.06em] leading-[0.75] drop-shadow-sm transition-colors">
                      NECESIDAD
                    </h3>
                  </div>
                </div>

                {/* Personal Story & Phases */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20 items-start px-4 transition-colors">
                  <div className="lg:col-span-4 lg:sticky lg:top-32 transition-colors">
                    <div className="relative group transition-colors">
                      <div className="absolute -inset-4 bg-[#38BDF8]/20 rounded-[3rem] blur-2xl opacity-40" />
                      <div className="bg-white dark:bg-[#1A1A1A] border border-slate-200 dark:border-white/10 p-10 md:p-12 rounded-[3rem] relative overflow-hidden transition-colors shadow-2xl">
                        <img
                          src="/jose-luis-support.webp"
                          alt="José Luis Bellot"
                          className="w-20 h-20 rounded-full border-4 border-white dark:border-black/50 shadow-xl mb-8 object-cover"
                        />
                        <h4 className="text-slate-900 dark:text-white text-2xl md:text-3xl font-black italic uppercase mb-6 leading-none tracking-tighter transition-colors">
                          José Luis Bellot
                        </h4>
                        <p>
                          "Hace 18 años creé <span className="text-slate-900 dark:text-white">jugarmaspadel</span> para ordenar la forma de organizar partidos. Aquella experiencia demostró que cuando la comunidad funciona, el deporte crece.
                        </p>
                        <p className="mt-4">
                          Hoy nace <span className="text-[#38BDF8]">jugarmaspickleball</span> para aplicar todo lo aprendido y ayudar a que el pickleball en Zaragoza crezca desde el principio con más orden y más comunidad."
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-8 space-y-24 transition-colors">
                    {/* Phase 1: Evolution */}
                    <div className="relative pl-12 border-l-4 border-[#38BDF8] transition-colors">
                      <div className="absolute top-0 -left-[14px] w-6 h-6 rounded-full bg-[#38BDF8] border-4 border-white dark:border-black shadow-lg" />
                      <h5 className="text-[#0F172A] dark:text-[#38BDF8] font-black uppercase text-xs tracking-[0.4em] mb-6 transition-colors">UNA EXPERIENCIA QUE VUELVE A EMPEZAR</h5>
                      <div className="space-y-6 text-slate-800 dark:text-gray-300 text-xl md:text-2xl leading-relaxed font-bold transition-colors">
                        <p>
                          Hace 18 años nació <span className="text-slate-900 dark:text-white">jugarmaspadel</span> en Zaragoza con una idea muy simple: organizar mejor a los jugadores para que jugar fuera más fácil.
                        </p>
                        <p>
                          La comunidad creció hasta 600 jugadores activos y más de 50 partidos diarios. <span className="text-[#38BDF8] italic">No fue casualidad. Fue porque el sistema funcionaba.</span>
                        </p>
                        <p>
                          Hoy esa experiencia se aplica al pickleball con <span className="text-slate-900 dark:text-white underline decoration-[#38BDF8] decoration-4 underline-offset-8">jugarmaspickleball</span>.
                        </p>
                      </div>
                    </div>

                    {/* Phase 2: The Opportunity */}
                    <div className="relative pl-12 border-l-4 border-slate-100 dark:border-white/10 transition-colors">
                      <div className="absolute top-0 -left-[14px] w-6 h-6 rounded-full bg-slate-900 dark:bg-white/20 border-4 border-white dark:border-black shadow-lg transition-colors" />
                      <h5 className="text-[#0F172A] dark:text-[#38BDF8] font-black uppercase text-xs tracking-[0.4em] mb-6 transition-colors">LA GRAN OPORTUNIDAD DEL PICKLEBALL</h5>
                      <div className="space-y-6 text-slate-800 dark:text-gray-300 text-xl md:text-2xl leading-relaxed font-bold transition-colors">
                        <p>
                          El pickleball tiene una gran oportunidad: sus instalaciones son más accesibles y el deporte está creciendo con fuerza en España y en Europa.
                        </p>
                        <p className="bg-slate-50 dark:bg-white/5 p-8 rounded-3xl border border-slate-200 dark:border-white/5 italic shadow-sm transition-colors">
                          Si ese crecimiento se hace de forma organizada, puede ser más ordenado, más sostenible y más comunitario que el que vivió el pádel.
                        </p>
                        <p>
                          Por eso nace <span className="text-[#38BDF8]">jugarmaspickleball</span>: una comunidad que conecta jugadores, organiza partidos y colabora con los clubes para que el pickleball crezca con sentido desde el primer día.
                        </p>
                        <div className="flex items-center flex-nowrap gap-1 md:gap-2 pt-6 overflow-x-auto pb-2">
                          {['Organizas', 'Se completa', 'Reservas pista', 'A JUGAR'].map((step, i) => (
                            <div key={i} className="flex items-center gap-1 md:gap-2 shrink-0">
                              <span className="bg-[#38BDF8] text-black px-3 py-1.5 md:px-4 md:py-2 rounded-lg font-black text-[10px] md:text-xs italic uppercase tracking-tight shadow-md">{step}</span>
                              {i < 3 && <span className="text-slate-300 dark:text-white/20 text-[10px] md:text-xs">→</span>}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Phase 3: The Pact */}
                    <div className="relative pl-12 border-l-4 border-[#38BDF8] transition-colors">
                      <div className="absolute top-0 -left-[14px] w-6 h-6 rounded-full bg-[#38BDF8] border-4 border-white dark:border-black shadow-lg animate-pulse" />
                      <h5 className="text-[#0F172A] dark:text-[#38BDF8] font-black uppercase text-xs tracking-[0.4em] mb-6 transition-colors">COMUNIDAD Y CLUBES: VOLVER A RECONOCER LO QUE FUNCIONA</h5>
                      <div className="space-y-6 text-slate-800 dark:text-gray-300 text-xl md:text-2xl leading-relaxed font-bold transition-colors">
                        <p>
                          Esta comunidad ya demostró lo que genera: actividad constante y consumo real en los clubes. Recuperar lo que funciona requiere algo claro: <strong className="text-slate-900 dark:text-white transition-colors italic">que los clubes valoren a la comunidad que llena sus pistas.</strong>
                        </p>
                        <p>
                          Cuando club y comunidad caminan juntos, el pickleball deja de ser fricción y vuelve a ser crecimiento. Hoy, con la app APP Radical más actualizada, recuperamos ese orden que Zaragoza necesita.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Final Shared CTA Area - Always visible at bottom of all tabs */}
          <div className="mt-24 md:mt-40 bg-slate-900 dark:bg-white p-10 md:p-24 rounded-[3.5rem] md:rounded-[4.5rem] text-white dark:text-black text-center relative overflow-hidden shadow-2xl mx-2 md:mx-4 transition-all">
            <div className="absolute inset-0 bg-gradient-to-br from-[#38BDF8]/10 to-transparent pointer-events-none" />
            <h3 className="text-4xl md:text-8xl font-black italic uppercase font-heading leading-[0.8] tracking-tighter mb-12 relative z-10 transition-colors">
              "SI ALGÚN DÍA JUGASTE AQUÍ,<br />
              <span className="opacity-40">SABES DE QUÉ HABLO"</span>
            </h3>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 relative z-10">
              <a
                href="https://www.radicalpadel.com/PROGRAMA/S_autenticar.php"
                target="_blank"
                className="w-full sm:w-auto px-16 py-8 bg-[#38BDF8] text-black rounded-2xl font-black text-2xl md:text-3xl italic uppercase tracking-tighter hover:scale-110 transition-transform shadow-2xl"
              >
                EMPEZAR AHORA
              </a>
            </div>
            <p className="mt-12 text-xs font-black uppercase tracking-[0.5em] opacity-60 italic">Zaragoza Pickleball Hub · Since 2006</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default BenefitsDashboard;
