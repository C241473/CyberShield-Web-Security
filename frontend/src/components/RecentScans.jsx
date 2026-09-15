import React from 'react';
import { History, ExternalLink, Trash2, ShieldCheck, ArrowUpRight } from 'lucide-react';

export default function RecentScans({ scans, onSelectScan, onDeleteScan }) {
  if (!scans || scans.length === 0) {
    return (
      <div className="cyber-glass rounded-2xl p-6 border border-slate-800 text-center font-mono my-8">
        <History className="w-8 h-8 text-slate-600 mx-auto mb-2" />
        <p className="text-slate-400 text-xs">No scan history recorded yet. Enter a website URL above to start auditing!</p>
      </div>
    );
  }

  const getScoreBadge = (score) => {
    if (score >= 90) return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
    if (score >= 75) return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30';
    if (score >= 55) return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
    return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
  };

  return (
    <div id="history" className="cyber-glass rounded-2xl p-6 border border-slate-800 my-8">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
        <div>
          <h2 className="text-xl font-bold text-white font-mono flex items-center space-x-2">
            <History className="w-5 h-5 text-cyan-400" />
            <span>Persistent Scan History & Reports</span>
          </h2>
          <p className="text-slate-400 text-xs mt-1">Saved reports from previous security audits (Stored in MongoDB).</p>
        </div>
        <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/30">
          {scans.length} Saved Scans
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {scans.map((scan) => (
          <div
            key={scan._id}
            className="bg-slate-900/80 rounded-xl p-4 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-start justify-between mb-2">
                <span className={`px-2.5 py-0.5 rounded text-xs font-mono font-bold border ${getScoreBadge(scan.score)}`}>
                  SCORE: {scan.score} / 100
                </span>
                <button
                  onClick={() => onDeleteScan(scan._id)}
                  title="Delete Scan"
                  className="text-slate-500 hover:text-rose-400 p-1 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <h3 className="text-white font-mono font-semibold text-sm truncate" title={scan.domain}>
                {scan.domain}
              </h3>
              <p className="text-slate-400 text-[11px] font-mono mt-0.5 truncate">{scan.url}</p>

              <div className="mt-3 flex flex-wrap gap-1">
                <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${scan.summaryChecklist?.https === 'PASS' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                  HTTPS: {scan.summaryChecklist?.https || 'N/A'}
                </span>
                <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${scan.summaryChecklist?.hsts === 'PASS' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                  HSTS: {scan.summaryChecklist?.hsts || 'N/A'}
                </span>
                <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${scan.summaryChecklist?.csp === 'PASS' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}`}>
                  CSP: {scan.summaryChecklist?.csp || 'N/A'}
                </span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-500 text-[11px]">
                {new Date(scan.scannedAt).toLocaleDateString()} {new Date(scan.scannedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
              <button
                onClick={() => onSelectScan(scan)}
                className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center space-x-1 transition-colors"
              >
                <span>View Report</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
