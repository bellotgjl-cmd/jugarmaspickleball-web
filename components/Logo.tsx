
import React from 'react';

interface LogoProps {
  className?: string;
  isDark?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = "h-10 md:h-12", isDark = false }) => {
  // Colores de marca definidos para máxima fidelidad
  const neonGreen = "#38BDF8";
  const darkBlue = "#0F172A";
  const white = "#FFFFFF";
  const textMain = isDark ? white : darkBlue;

  return (
    <div className={`relative flex items-center group transition-all duration-500 ${className}`}>
      {/* Glow dinámico en hover */}
      <div className="absolute -inset-3 bg-[#38BDF8]/25 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      
      <svg 
        viewBox="0 0 380 80" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-full w-auto relative z-10 transition-transform duration-500 group-hover:scale-105"
      >
        {/* ICONO PALA PICKLEBALL VECTORIAL */}
        <g>
          {/* Cara de la pala */}
          <rect x="22" y="8" width="36" height="50" rx="6" fill={neonGreen} />
          {/* Mango */}
          <rect x="36" y="58" width="8" height="16" fill={neonGreen} />
          {/* Base del mango */}
          <path d="M34 74 H46 V76 Q46 78 43 78 H37 Q34 78 34 76 Z" fill={neonGreen} />
          {/* Detalle interno / grip */}
          <rect x="37" y="60" width="6" height="12" rx="2" fill={isDark ? darkBlue : white} fillOpacity="0.3" />
        </g>
        
        {/* TEXTO JUGAR MÁS PICKLEBALL (Tipografía optimizada para SVG) */}
        <text 
          x="85" 
          y="35" 
          style={{ font: "900 28px 'Space Grotesk', sans-serif" }} 
          fill={textMain}
        >
          JUGAR <tspan fill={neonGreen}>MÁS</tspan>
        </text>
        <text 
          x="85" 
          y="65" 
          style={{ font: "900 28px 'Space Grotesk', sans-serif" }} 
          fill={textMain}
        >
          PICKLEBALL
        </text>
        
        {/* INDICADOR ZARAGOZA */}
        <rect x="250" y="45" width="90" height="20" rx="4" fill={isDark ? white : "black"} fillOpacity={isDark ? "0.15" : "1"} />
        <text 
          x="258" 
          y="59" 
          style={{ font: "800 11px 'Inter', sans-serif" }} 
          fill={neonGreen}
          letterSpacing="1.5"
        >
          ZARAGOZA
        </text>
      </svg>
      
      {/* Separador y comunidad (Desktop) */}
      <div className="ml-6 border-l-2 border-slate-200 dark:border-white/10 pl-6 hidden xl:flex flex-col justify-center transition-colors">
        <span className="text-[10px] font-black text-slate-400 dark:text-gray-500 uppercase tracking-[0.3em] leading-tight">
          COMUNIDAD
        </span>
        <span className="text-[9px] font-bold text-[#38BDF8] bg-black px-2 py-0.5 rounded mt-1 w-fit leading-tight">
          HUB #1 ARAGÓN
        </span>
      </div>
    </div>
  );
};

export default Logo;
