
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { saveLead } from '../services/api';

const DownloadGuide: React.FC = () => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await saveLead({ email, type: 'guide_download' });
    setLoading(false);
    setSent(true);
  };

  return (
    <section id="guia" className="py-24 bg-[#141414]">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
          
          <div className="md:w-1/2">
            <div className="relative">
              <img 
                src="https://picsum.photos/seed/pickleball-guide/600/800" 
                alt="Guía de Pickleball" 
                className="rounded-2xl shadow-2xl relative z-10 w-full max-w-sm mx-auto transform -rotate-3 hover:rotate-0 transition-transform duration-500"
              />
              <div className="absolute top-10 -right-4 w-full h-full bg-[#38BDF8]/20 rounded-2xl blur-2xl" />
            </div>
          </div>

          <div className="md:w-1/2">
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">GUÍA: LOS 10 ERRORES QUE TE IMPIDEN SUBIR DE NIVEL</h2>
            <p className="text-gray-400 text-lg mb-8">Descarga gratis el PDF que ha ayudado a más de 5,000 jugadores a corregir su bandeja y posicionamiento en pista.</p>
            
            {sent ? (
              <div className="bg-[#38BDF8]/10 border border-[#38BDF8]/20 p-6 rounded-xl text-[#38BDF8] font-bold">
                ¡Enlace de descarga enviado! Revisa tu bandeja de entrada.
              </div>
            ) : (
              <form onSubmit={handleDownload} className="flex flex-col sm:flex-row gap-3">
                <input 
                  required
                  type="email" 
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Tu mejor email..."
                  className="flex-grow bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:border-[#38BDF8] outline-none"
                />
                <button 
                  disabled={loading}
                  className="bg-[#38BDF8] text-black font-bold px-8 py-4 rounded-xl hover:bg-[#b3e600] transition-colors whitespace-nowrap disabled:opacity-50"
                >
                  {loading ? 'Procesando...' : 'Descargar PDF Gratis'}
                </button>
              </form>
            )}
            <p className="mt-4 text-[10px] text-gray-600 uppercase tracking-widest font-bold">Sin spam, solo pickleball de calidad.</p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default DownloadGuide;
