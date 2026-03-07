
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenAI, Type } from "@google/genai";

const SYSTEM_INSTRUCTION = `Eres el Navegador de Jugar Más Pickleball Zaragoza. Tu función NO es responder dudas directamente, sino guiar al usuario a la sección correcta de la web.

Debes analizar la intención del usuario y clasificarla en uno de estos destinos:
- 'pasos': Para saber cómo empezar o descargar la app APP Radical.
- 'beneficios': Para conocer las ventajas generales de la comunidad.
- 'test': Para información sobre niveles o hacer el test de nivel.
- 'faq': Para dudas comunes y preguntas frecuentes.
- 'contacto': Para soporte técnico, dudas específicas o contacto directo.
- 'players': Ventajas detalladas de jugadores.
- 'clubs': Ventajas para clubes.
- 'clubplus': Ventajas técnicas del Club Plus.
- 'historia': Trayectoria desde 2006.

REGLAS CRÍTICAS:
1. NO respondas la duda. Di algo como: "Te llevo a la sección de niveles para que lo veas en detalle..."
2. Responde SIEMPRE con el formato JSON definido.
3. Si la duda es ambigua o no encaja en los destinos anteriores, elige 'contacto'.`;

interface AIChatbotProps {
  isDarkMode?: boolean;
  onNavigate: (destination: string) => void;
}

const AIChatbot: React.FC<AIChatbotProps> = ({ isDarkMode, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'model', text: string}[]>([
    { role: 'model', text: '¡Hola! Soy tu asistente en Zaragoza. Dime qué buscas y te llevaré a la sección exacta.' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsTyping(true);

    const apiKey = process.env.API_KEY;

    // Fallback si no hay API Key configurada en Vercel
    if (!apiKey || apiKey === "undefined") {
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          role: 'model', 
          text: 'Estamos realizando tareas de mantenimiento en el asistente. Mientras tanto, te abro el formulario de contacto directo.' 
        }]);
        setIsTyping(false);
        setTimeout(() => onNavigate('contacto'), 2000);
      }, 1000);
      return;
    }

    try {
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMessage,
        config: { 
          systemInstruction: SYSTEM_INSTRUCTION,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              message: { type: Type.STRING, description: "Mensaje breve de guía al usuario" },
              destination: { type: Type.STRING, description: "ID de destino" }
            },
            required: ["message", "destination"]
          }
        }
      });

      const data = JSON.parse(response.text || '{}');
      const text = data.message || 'Te dirijo a nuestro contacto para ayudarte mejor.';
      
      setMessages(prev => [...prev, { role: 'model', text }]);
      
      setTimeout(() => {
        onNavigate(data.destination || 'contacto');
        if (window.innerWidth < 768) setIsOpen(false);
      }, 1500);

    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: 'Perdona, he tenido un pequeño error técnico. Te abro el contacto para ayudarte.' }]);
      setTimeout(() => onNavigate('contacto'), 1500);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="absolute bottom-20 right-0 w-[380px] max-w-[90vw] h-[550px] bg-white dark:bg-[#141414] border border-slate-200 dark:border-white/10 rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden"
          >
            <div className="bg-[#38BDF8] p-6 flex justify-between items-center shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-black rounded-full animate-pulse" />
                <span className="text-black font-black text-sm tracking-widest uppercase italic">ZARAGOZA PICKLEBALL HUB</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-black/60 hover:text-black transition-colors">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M18 6 6 18M6 6l12 12"/></svg>
              </button>
            </div>

            <div ref={scrollRef} className="flex-grow p-6 overflow-y-auto space-y-6 bg-slate-50 dark:bg-black/20">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-4 rounded-2xl text-sm font-medium leading-relaxed ${
                    m.role === 'user' 
                      ? 'bg-[#38BDF8] text-black rounded-br-none font-black italic' 
                      : 'bg-white dark:bg-white/5 text-slate-700 dark:text-gray-300 border border-slate-200 dark:border-white/10 rounded-bl-none shadow-sm font-bold'
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-white/5 p-4 rounded-2xl flex gap-1.5 shadow-sm border border-slate-200 dark:border-none">
                    <span className="w-2 h-2 bg-[#38BDF8] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-[#38BDF8] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-[#38BDF8] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-slate-200 dark:border-white/5 bg-white dark:bg-black/40 backdrop-blur-sm">
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="flex gap-3"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="¿A qué sección te llevo?"
                  className="flex-grow bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:border-[#38BDF8] outline-none transition-all font-bold"
                />
                <button 
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="bg-[#38BDF8] text-black p-3 rounded-xl hover:scale-105 disabled:opacity-50 transition-all shadow-lg active:scale-95"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-[#38BDF8] text-black rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-90 transition-all z-50 relative group"
      >
        <span className="absolute -top-14 right-0 bg-slate-900 dark:bg-white text-white dark:text-black px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap shadow-2xl">
           ¿Te ayudo a navegar?
        </span>
        {isOpen ? (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M18 6 6 18M6 6l12 12"/></svg>
        ) : (
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10" /><path d="m16 12-4-4-4 4" /><path d="M12 16V8" /></svg>
        )}
      </button>
    </div>
  );
};

export default AIChatbot;
