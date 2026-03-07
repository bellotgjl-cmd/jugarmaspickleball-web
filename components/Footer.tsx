
import React from 'react';
import { DashboardTab } from './BenefitsDashboard';
import Logo from './Logo';

interface FooterProps {
  onShowBenefits?: (type: DashboardTab) => void;
  onShowContact?: () => void;
  onToggleAdmin?: () => void;
  isAdmin?: boolean;
}

const Footer: React.FC<FooterProps> = ({ onShowBenefits, onShowContact, onToggleAdmin, isAdmin }) => {
  return (
    <footer className="bg-[#0A0A0A] pt-20 pb-10 border-t border-white/10 transition-colors duration-500">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1 text-center md:text-left">
            <div className="mb-6 flex justify-center md:justify-start">
              {/* El footer es siempre oscuro, usamos el logo SVG con isDark={true} */}
              <Logo isDark={true} className="h-14 md:h-16" />
            </div>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed font-bold">
              La mayor comunidad tech de pickleball. Unimos talento, pasión y tecnología para mejorar tu juego en Zaragoza.
            </p>
          </div>

          <div className="text-center md:text-left">
            <h4 className="font-black mb-6 uppercase text-xs tracking-[0.3em] text-[#38BDF8]">Nuestra Oferta</h4>
            <ul className="space-y-4 text-sm md:text-base text-gray-300 font-bold">
              <li>
                <button onClick={() => onShowBenefits?.('players')} className="hover:text-[#38BDF8] transition-colors uppercase block w-full md:text-left">Ventajas Jugadores</button>
              </li>
              <li>
                <button onClick={() => onShowBenefits?.('clubs')} className="hover:text-[#38BDF8] transition-colors uppercase block w-full md:text-left">Ventajas Clubes</button>
              </li>
              <li>
                <button onClick={() => onShowBenefits?.('clubplus')} className="hover:text-[#38BDF8] transition-colors uppercase block w-full md:text-left">Ventajas Club Pro</button>
              </li>
              <li>
                <button onClick={() => onShowBenefits?.('history')} className="hover:text-[#38BDF8] transition-colors uppercase block w-full md:text-left">Historia JMP</button>
              </li>
              <li>
                <button onClick={onShowContact} className="text-[#38BDF8] hover:underline transition-colors uppercase block w-full md:text-left">Contacto Zaragoza</button>
              </li>
            </ul>
          </div>

          <div className="text-center md:text-left">
            <h4 className="font-black mb-6 uppercase text-xs tracking-[0.3em] text-[#38BDF8]">Legal</h4>
            <ul className="space-y-4 text-sm md:text-base text-gray-300 font-bold">
              <li><a href="#" className="hover:text-[#38BDF8] transition-colors uppercase block w-full md:text-left">Privacidad</a></li>
              <li><a href="#" className="hover:text-[#38BDF8] transition-colors uppercase block w-full md:text-left">Términos</a></li>
              <li><a href="#" className="hover:text-[#38BDF8] transition-colors uppercase block w-full md:text-left">Cookies</a></li>
            </ul>
          </div>

          <div className="text-center md:text-left">
            <h4 className="font-black mb-6 uppercase text-xs tracking-[0.3em] text-[#38BDF8]">Síguenos</h4>
            <div className="flex justify-center md:justify-start gap-4">
              {/* Facebook */}
              <a
                href="https://www.facebook.com/jugarmaspickleball"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-gray-400 hover:text-black hover:bg-[#38BDF8] hover:border-[#38BDF8] transition-all duration-300 hover:scale-110 shadow-lg"
                aria-label="Facebook"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
              </a>
              {/* Instagram */}
              <a
                href="https://www.instagram.com/joseluisbellot/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-gray-400 hover:text-black hover:bg-[#38BDF8] hover:border-[#38BDF8] transition-all duration-300 hover:scale-110 shadow-lg"
                aria-label="Instagram"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
              </a>
              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/jos%C3%A9-luis-bellot-a9b06012/recent-activity/all/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-gray-400 hover:text-black hover:bg-[#38BDF8] hover:border-[#38BDF8] transition-all duration-300 hover:scale-110 shadow-lg"
                aria-label="LinkedIn"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-gray-500 text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-center">
          <div className="flex flex-col items-center md:items-start gap-2">
            <p>© 2024 JUGAR MÁS PICKLEBALL. TODOS LOS DERECHOS RESERVADOS.</p>
            <button
              onClick={onToggleAdmin}
              className={`text-[8px] px-3 py-1 rounded border transition-all ${isAdmin ? 'bg-[#38BDF8] text-black border-transparent font-black' : 'border-white/10 hover:border-[#38BDF8] hover:text-[#38BDF8]'}`}
            >
              {isAdmin ? 'SESIÓN: JOSÉ LUIS BELLOT (ADMIN)' : 'ACCESO ADMINISTRADOR'}
            </button>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#38BDF8] rounded-full animate-pulse shadow-[0_0_8px_#38BDF8]" />
            Servidores Operativos Hub
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
