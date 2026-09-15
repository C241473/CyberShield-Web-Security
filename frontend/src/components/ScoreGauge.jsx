import React from 'react';
import { ShieldCheck, ShieldAlert, ShieldX, Award } from 'lucide-react';

export default function ScoreGauge({ score, grade, riskLevel, domain }) {
  // Score color map
  const getScoreColor = (s) => {
    if (s >= 90) return { text: 'text-emerald-400', border: 'border-emerald-500', bg: 'bg-emerald-500/10', stroke: '#10b981', glow: 'shadow-cyber-green' };
    if (s >= 75) return { text: 'text-cyan-400', border: 'border-cyan-500', bg: 'bg-cyan-500/10', stroke: '#00f2fe', glow: 'shadow-cyber-glow' };
    if (s >= 55) return { text: 'text-amber-400', border: 'border-amber-500', bg: 'bg-amber-500/10', stroke: '#f59e0b', glow: 'shadow-amber-500/20' };
    return { text: 'text-rose-400', border: 'border-rose-500', bg: 'bg-rose-500/10', stroke: '#ef4444', glow: 'shadow-cyber-red' };
  };

  const style = getScoreColor(score);
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className={`cyber-glass rounded-2xl p-6 border border-slate-800 flex flex-col items-center justify-center text-center relative overflow-hidden ${style.glow}`}>
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none"></div>

      <div className="flex items-center space-x-2 text-slate-400 text-xs font-mono mb-2 uppercase tracking-widest">
        <Award className="w-4 h-4 text-cyan-400" />
        <span>SECURITY SCORE</span>
      </div>

      <div className="w-full max-w-[200px] h-[1px] bg-gradient-to-r from-transparent via-slate-700 to-transparent mb-4"></div>

      {/* SVG Circular Gauge */}
      <div className="relative w-44 h-44 flex items-center justify-center my-2">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="88"
            cy="88"
            r={radius}
            className="text-slate-800"
            strokeWidth="10"
            stroke="currentColor"
            fill="transparent"
          />
          <circle
            cx="88"
            cy="88"
            r={radius}
            stroke={style.stroke}
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="flex items-baseline font-mono font-extrabold text-white">
            <span className={`text-4xl ${style.text}`}>{score}</span>
            <span className="text-slate-500 text-lg ml-1">/ 100</span>
          </div>
          <span className={`text-xs font-semibold px-2 py-0.5 rounded mt-1 border ${style.border} ${style.bg} ${style.text}`}>
            Grade {grade}
          </span>
        </div>
      </div>

      <div className="mt-3">
        <h3 className="text-white font-semibold text-base font-mono">{domain}</h3>
        <p className={`text-xs font-mono mt-0.5 ${style.text}`}>
          Overall Assessment: {riskLevel}
        </p>
      </div>
    </div>
  );
}
