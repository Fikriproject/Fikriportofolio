import React from 'react';

const TechStackIcon = ({ TechStackIcon, Language, Level }) => {
  return (
    <div className="group relative p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-slate-900/90 to-[#0B0F17]/90 backdrop-blur-xl border border-white/10 hover:border-indigo-500/40 transition-all duration-300 ease-in-out flex flex-col items-center justify-between gap-3 hover:scale-105 cursor-pointer shadow-lg hover:shadow-indigo-500/10 min-h-[160px] sm:min-h-[175px]">
      <div className="relative flex items-center justify-center pt-2">
        <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full opacity-0 group-hover:opacity-100 blur transition duration-300"></div>
        <img 
          src={TechStackIcon} 
          alt={`${Language} icon`} 
          className="relative h-12 w-12 sm:h-14 sm:w-14 object-contain transform group-hover:scale-110 transition-transform duration-300"
          loading="lazy"
        />
      </div>

      <div className="flex flex-col items-center gap-1.5 w-full pb-1">
        <span className="text-slate-200 font-bold text-sm sm:text-base tracking-wide group-hover:text-white transition-colors duration-300 text-center truncate max-w-full px-1">
          {Language}
        </span>
        {Level && (
          <span className="text-[11px] font-medium text-slate-400 px-2.5 py-0.5 rounded-md border border-slate-700/60 bg-slate-950/50 group-hover:border-slate-600 transition-colors">
            {Level}
          </span>
        )}
      </div>
    </div>
  );
};

export default TechStackIcon;