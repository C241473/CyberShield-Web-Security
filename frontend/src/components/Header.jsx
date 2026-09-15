import React from 'react';
import { ShieldCheck, Lock, Activity, Database } from 'lucide-react';

export default function Header({ onReset }) {
  return (
    <header className="border-b border-slate-800 bg-[#0c121e]/90 backdrop-blur sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div 
          onClick={onReset}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-0.5 flex items-center justify-center shadow-cyber-glow group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-cyan-400 group-hover:text-cyan-300" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold tracking-tight text-white font-mono">
                Cyber<span className="cyber-gradient-text">Shield</span>
              </span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 uppercase tracking-widest">
                v1.0 Pro
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">Defensive Web Vulnerability & Header Scanner</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800 text-xs text-slate-300 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Engine: Active</span>
          </div>

          <a 
            href="#history" 
            className="text-xs text-slate-400 hover:text-cyan-400 font-mono flex items-center space-x-1 transition-colors"
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Scan History</span>
          </a>
        </div>
      </div>
    </header>
  );
}
