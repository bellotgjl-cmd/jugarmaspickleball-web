
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AddTestimonialModal from './AddTestimonialModal';
import { getAdminReplies, saveAdminReply, getTestimonials, updateTestimonialStatus, deleteTestimonial } from '../services/api';

const initialTestimonials = [
  {
    id: "t0",
    name: "José Luis Bellot",
    level: "Fundador de la Comunidad",
    quote: "Llevo más de 18 años organizando partidos desde Zaragoza. Nunca he dejado de jugar por falta de gente. Eso me enseñó que el secreto no es la suerte: es el sistema. Hoy aplicamos esa experiencia del pádel para que el pickleball crezca mejor.",
    avatar: "/jose-luis-support.webp"
  },
  {
    id: "t1",
    name: "David Navarro",
    level: "Radical (Nivel 5)",
    quote: "Me flipa organizar partidos así: lo configuro todo a mi gusto (lugar, hora, nivel y condiciones) y luego solo me queda esperar a que se complete. Simple, rápido y perfecto.",
    avatar: "https://i.pravatar.cc/150?u=david"
  },
  {
    id: "t2",
    name: "Marta Sánchez",
    level: "Medio (Nivel 11)",
    quote: "Me encanta esta comunidad porque es abierta e integradora. A veces los grupos de chicas pueden ser bastante cerrados y cuesta entrar o sentirse parte. Aquí, en cambio, la integración es inmediata: te apuntas, encajas y juegas. Así de fácil… y así da gusto.",
    avatar: "https://i.pravatar.cc/150?u=marta"
  },
  {
    id: "t3",
    name: "Raúl Giménez",
    level: "Radical Pro (Nivel 3)",
    quote: "Mi opción favorita es apuntarme a los partidos que me encajan. Por mi trabajo, muchas veces no sé hasta última hora si podré jugar, así que entro, miro lo que hay disponible y me apunto al momento. Además, con “Filtro Rápido” es todavía más fácil: en un solo toque me lista todos los partidos a los que puedo apuntarme porque cumplo los criterios del organizador.",
    avatar: "https://i.pravatar.cc/150?u=raul"
  }
];

interface AdminReply {
  text: string;
  adminName: string;
  adminAvatar: string;
  date: string;
}

interface TestimonialsProps {
  isAdmin?: boolean;
}

const Testimonials: React.FC<TestimonialsProps> = ({ isAdmin }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [replies, setReplies] = useState<Record<string, AdminReply>>({});
  const [userTestimonials, setUserTestimonials] = useState<any[]>([]);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setReplies(getAdminReplies());
    setUserTestimonials(getTestimonials());
  }, []);

  const refreshTestimonials = () => {
    setUserTestimonials(getTestimonials());
  };

  const handleStatusToggle = async (id: string, currentStatus: boolean) => {
    await updateTestimonialStatus(id, !currentStatus);
    refreshTestimonials();
  };

  const handleDelete = async (id: string) => {
    if (confirm('¿Seguro que quieres eliminar este testimonio?')) {
      await deleteTestimonial(id);
      refreshTestimonials();
    }
  };

  const handleReplySubmit = async (testimonialId: string) => {
    if (!replyText.trim()) return;
    setIsSubmitting(true);
    const success = await saveAdminReply(testimonialId, replyText);
    if (success) {
      setReplies(getAdminReplies());
      setReplyingTo(null);
      setReplyText('');
    }
    setIsSubmitting(false);
  };

  const allTestimonials = [
    ...initialTestimonials.map(t => ({ ...t, approved: true, isInitial: true })),
    ...userTestimonials.map(t => ({ ...t, isInitial: false }))
  ];

  const visibleTestimonials = isAdmin
    ? allTestimonials
    : allTestimonials.filter(t => t.approved);

  return (
    <section className="py-32 bg-white dark:bg-[#0A0A0A] relative overflow-hidden transition-colors duration-500">
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#38BDF8]/10 blur-[120px] rounded-full pointer-events-none transition-colors" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <span className="text-[#0F172A] dark:text-[#38BDF8] font-black text-sm uppercase tracking-[0.5em] mb-4 block transition-colors">COMUNIDAD REAL</span>
          <h2 className="font-heading text-4xl md:text-7xl font-black italic tracking-tighter uppercase text-slate-900 dark:text-white transition-colors">LO QUE DICEN EN <span className="text-[#0F172A] dark:text-[#38BDF8] transition-colors">ZARAGOZA</span></h2>
          {isAdmin && (
            <div className="mt-4 inline-block bg-[#38BDF8] text-black px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
              Modo Gestión Activo
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {visibleTestimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`bg-slate-50 dark:bg-[#141414] border p-10 rounded-[2.5rem] hover:border-[#38BDF8]/40 transition-all group relative shadow-sm hover:shadow-2xl flex flex-col h-full ${!t.approved ? 'border-dashed border-red-500/50 opacity-70' : 'border-slate-200 dark:border-white/5'
                }`}
            >
              {!t.approved && (
                <div className="absolute top-4 right-8 bg-red-500 text-white text-[8px] font-black uppercase px-2 py-1 rounded-full shadow-lg">
                  Pendiente de aprobación
                </div>
              )}

              <div className="flex items-center gap-5 mb-8">
                <div className="w-12 h-12 rounded-full bg-[#38BDF8]/10 flex items-center justify-center text-[#0F172A] dark:text-[#38BDF8] font-black italic shadow-inner border border-[#38BDF8]/20">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-black text-slate-900 dark:text-white text-xl tracking-tight transition-colors">{t.name}</h4>
                  <span className="text-xs font-black text-[#0F172A] dark:text-[#38BDF8] uppercase tracking-[0.1em] transition-colors">{t.level}</span>
                </div>
              </div>

              <p className="text-slate-700 dark:text-gray-400 font-bold italic leading-relaxed relative z-10 text-lg transition-colors flex-grow">
                "{t.quote}"
              </p>

              {/* Admin Management Tools */}
              {isAdmin && !t.isInitial && (
                <div className="mt-6 pt-4 border-t border-slate-200 dark:border-white/5 flex gap-2 relative z-20">
                  <button
                    onClick={() => handleStatusToggle(t.id, t.approved)}
                    className={`flex-grow py-2 rounded-lg font-black uppercase text-[10px] transition-all ${t.approved
                      ? 'bg-orange-500/10 text-orange-500 hover:bg-orange-500 hover:text-white'
                      : 'bg-green-500/10 text-green-500 hover:bg-green-500 hover:text-white'
                      }`}
                  >
                    {t.approved ? 'Ocultar' : 'Aprobar'}
                  </button>
                  <button
                    onClick={() => handleDelete(t.id)}
                    className="px-4 py-2 bg-red-500/10 text-red-500 rounded-lg font-black uppercase text-[10px] hover:bg-red-500 hover:text-white transition-all"
                  >
                    Eliminar
                  </button>
                </div>
              )}

              {/* Admin Reply Display */}
              <AnimatePresence>
                {replies[t.id] && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-8 pt-6 border-t border-slate-200 dark:border-white/5"
                  >
                    <div className="bg-[#38BDF8]/5 dark:bg-white/[0.03] border-l-4 border-[#38BDF8] p-4 rounded-r-2xl">
                      <div className="flex items-center gap-3 mb-2">
                        <img src={replies[t.id].adminAvatar} className="w-8 h-8 rounded-full border border-[#38BDF8]" />
                        <span className="text-[10px] font-black uppercase text-[#0F172A] dark:text-[#38BDF8] tracking-widest">Respuesta de José Luis Bellot</span>
                        <span className="ml-auto text-[8px] font-black text-slate-400 uppercase">Staff JMP</span>
                      </div>
                      <p className="text-xs md:text-sm font-bold text-slate-900 dark:text-white italic leading-relaxed">
                        {replies[t.id].text}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Admin Reply Action */}
              {isAdmin && !replies[t.id] && (
                <div className="mt-6 pt-4 border-t border-slate-200 dark:border-white/5">
                  {replyingTo === t.id ? (
                    <div className="space-y-3">
                      <textarea
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Escribe tu respuesta como José Luis..."
                        className="w-full text-xs font-bold p-3 bg-white dark:bg-black/40 border border-[#38BDF8]/30 rounded-xl outline-none focus:border-[#38BDF8]"
                        rows={3}
                      />
                      <div className="flex gap-2">
                        <button
                          disabled={isSubmitting}
                          onClick={() => handleReplySubmit(t.id)}
                          className="flex-grow py-2 bg-[#38BDF8] text-black font-black uppercase text-[10px] rounded-lg"
                        >
                          {isSubmitting ? 'Enviando...' : 'Publicar Respuesta'}
                        </button>
                        <button
                          onClick={() => setReplyingTo(null)}
                          className="px-4 py-2 bg-slate-200 dark:bg-white/10 font-black uppercase text-[10px] rounded-lg"
                        >
                          Cancelar
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setReplyingTo(t.id)}
                      className="w-full py-2 bg-[#38BDF8]/10 text-[#0F172A] dark:text-[#38BDF8] font-black uppercase text-[10px] border border-[#38BDF8]/20 rounded-lg hover:bg-[#38BDF8] hover:text-black transition-all"
                    >
                      Responder como Administrador
                    </button>
                  )}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Call to Action for Visitors */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto bg-slate-900 dark:bg-white p-8 md:p-12 rounded-[3rem] text-center shadow-2xl transition-all"
        >
          <h3 className="text-3xl md:text-4xl font-black italic uppercase text-[#38BDF8] dark:text-black mb-6 tracking-tighter">¿Ya formas parte de la comunidad?</h3>
          <p className="text-white/80 dark:text-black/60 font-bold text-lg mb-10 max-w-2xl mx-auto italic">Queremos saber cómo ha cambiado tu juego y tus fines de semana desde que usas Jugar Más Pickleball en Zaragoza.</p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn-heartbeat px-10 py-5 bg-[#38BDF8] text-black font-black text-xl md:text-2xl italic uppercase rounded-2xl border-4 border-white/10 dark:border-black/10 hover:scale-105 active:scale-95 transition-all shadow-2xl"
          >
            Añadir mi testimonio
          </button>
        </motion.div>
      </div>

      <AnimatePresence>
        {isModalOpen && <AddTestimonialModal onClose={() => setIsModalOpen(false)} />}
      </AnimatePresence>
    </section>
  );
};

export default Testimonials;
