import React from 'react';
import { CheckCircle2, AlertTriangle, XCircle, Shield, Server, Lock, FileCode, Cookie } from 'lucide-react';

export default function StatusBadgeGrid({ summaryChecklist, techStack }) {
  const getBadgeIcon = (status) => {
    if (status === 'PASS') {
      return (
        <span className="flex items-center space-x-1 font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/30">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>✅ PASS</span>
        </span>
      );
    }
    if (status === 'WARN') {
      return (
        <span className="flex items-center space-x-1 font-mono text-amber-400 font-bold bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/30">
          <AlertTriangle className="w-4 h-4 text-amber-400" />
          <span>⚠️ WARN</span>
        </span>
      );
    }
    return (
      <span className="flex items-center space-x-1 font-mono text-rose-400 font-bold bg-rose-500/10 px-2.5 py-1 rounded-md border border-rose-500/30">
        <XCircle className="w-4 h-4 text-rose-400" />
        <span>🔴 MISSING</span>
      </span>
    );
  };

  const checks = [
    { key: 'https', label: 'HTTPS Protocol', icon: Lock, status: summaryChecklist.https },
    { key: 'hsts', label: 'HSTS Enabled', icon: Shield, status: summaryChecklist.hsts },
    { key: 'csp', label: 'Content-Security-Policy', icon: FileCode, status: summaryChecklist.csp },
    { key: 'xFrameOptions', label: 'X-Frame-Options', icon: Shield, status: summaryChecklist.xFrameOptions },
    { key: 'secureCookies', label: 'Secure Cookie Flags', icon: Cookie, status: summaryChecklist.secureCookies },
    { key: 'serverHeader', label: 'Server Header Protection', icon: Server, status: summaryChecklist.serverHeader }
  ];

  return (
    <div className="cyber-glass rounded-2xl p-6 border border-slate-800 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800">
          <h3 className="text-white font-bold font-mono text-base flex items-center space-x-2">
            <Shield className="w-5 h-5 text-cyan-400" />
            <span>QUICK DEFENSIVE CHECKLIST</span>
          </h3>
          <span className="text-xs text-slate-400 font-mono">6 Realtime Checks</span>
        </div>

        <div className="space-y-3 font-mono">
          {checks.map((check) => {
            const IconComponent = check.icon;
            return (
              <div
                key={check.key}
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-all"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-1.5 rounded-lg bg-slate-800 text-slate-300">
                    <IconComponent className="w-4 h-4 text-cyan-400" />
                  </div>
                  <span className="text-sm text-slate-200">{check.label}</span>
                </div>
                {getBadgeIcon(check.status)}
              </div>
            );
          })}
        </div>
      </div>

      {/* Tech Stack Footer Badges */}
      <div className="mt-6 pt-4 border-t border-slate-800">
        <div className="text-xs font-mono text-slate-400 mb-2">Detected Tech Stack:</div>
        <div className="flex flex-wrap gap-1.5">
          {techStack && techStack.length > 0 ? (
            techStack.map((tech, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded text-xs font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/20"
              >
                {tech.name}
              </span>
            ))
          ) : (
            <span className="text-xs text-slate-500 font-mono">Unknown Stack</span>
          )}
        </div>
      </div>
    </div>
  );
}
