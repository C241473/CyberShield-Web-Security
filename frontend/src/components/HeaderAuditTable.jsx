import React, { useState } from 'react';
import { ShieldAlert, CheckCircle2, AlertTriangle, XCircle, Info, Filter } from 'lucide-react';

export default function HeaderAuditTable({ headersAudit }) {
  const [filter, setFilter] = useState('ALL');

  const filteredHeaders = headersAudit.filter(h => {
    if (filter === 'FAIL') return h.status === 'FAIL';
    if (filter === 'WARN') return h.status === 'WARN';
    if (filter === 'PASS') return h.status === 'PASS';
    return true;
  });

  const getStatusBadge = (status) => {
    if (status === 'PASS') {
      return (
        <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded text-xs font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>PASS</span>
        </span>
      );
    }
    if (status === 'WARN') {
      return (
        <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded text-xs font-mono font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30">
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>WARNING</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded text-xs font-mono font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/30">
        <XCircle className="w-3.5 h-3.5" />
        <span>MISSING</span>
      </span>
    );
  };

  const getSeverityBadge = (severity) => {
    const colors = {
      CRITICAL: 'bg-rose-950 text-rose-300 border-rose-800',
      HIGH: 'bg-orange-950 text-orange-300 border-orange-800',
      MEDIUM: 'bg-amber-950 text-amber-300 border-amber-800',
      LOW: 'bg-slate-800 text-slate-300 border-slate-700'
    };
    return (
      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border uppercase tracking-wider ${colors[severity] || colors.LOW}`}>
        {severity}
      </span>
    );
  };

  return (
    <div className="cyber-glass rounded-2xl p-6 border border-slate-800 my-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 mb-6 gap-4">
        <div>
          <h2 className="text-xl font-bold text-white font-mono flex items-center space-x-2">
            <ShieldAlert className="w-5 h-5 text-cyan-400" />
            <span>HTTP Security Headers Audit</span>
          </h2>
          <p className="text-slate-400 text-xs mt-1">Detailed evaluation of security response headers sent by the server.</p>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center space-x-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800 font-mono text-xs">
          <button
            onClick={() => setFilter('ALL')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${filter === 'ALL' ? 'bg-cyan-500/20 text-cyan-400 font-semibold border border-cyan-500/30' : 'text-slate-400 hover:text-white'}`}
          >
            All ({headersAudit.length})
          </button>
          <button
            onClick={() => setFilter('FAIL')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${filter === 'FAIL' ? 'bg-rose-500/20 text-rose-400 font-semibold border border-rose-500/30' : 'text-slate-400 hover:text-white'}`}
          >
            Missing ({headersAudit.filter(h => h.status === 'FAIL').length})
          </button>
          <button
            onClick={() => setFilter('WARN')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${filter === 'WARN' ? 'bg-amber-500/20 text-amber-400 font-semibold border border-amber-500/30' : 'text-slate-400 hover:text-white'}`}
          >
            Warnings ({headersAudit.filter(h => h.status === 'WARN').length})
          </button>
          <button
            onClick={() => setFilter('PASS')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${filter === 'PASS' ? 'bg-emerald-500/20 text-emerald-400 font-semibold border border-emerald-500/30' : 'text-slate-400 hover:text-white'}`}
          >
            Passed ({headersAudit.filter(h => h.status === 'PASS').length})
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm font-mono border-collapse">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider bg-slate-950/40">
              <th className="py-3 px-4">Header</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Severity</th>
              <th className="py-3 px-4">Observed Value</th>
              <th className="py-3 px-4">Security Analysis</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {filteredHeaders.map((item, idx) => (
              <tr key={idx} className="hover:bg-slate-900/50 transition-colors">
                <td className="py-4 px-4 font-semibold text-white">{item.header}</td>
                <td className="py-4 px-4">{getStatusBadge(item.status)}</td>
                <td className="py-4 px-4">{getSeverityBadge(item.severity)}</td>
                <td className="py-4 px-4 text-slate-300 max-w-xs truncate" title={item.value}>
                  <code className="bg-slate-900 px-2 py-1 rounded text-cyan-300 border border-slate-800">
                    {item.value}
                  </code>
                </td>
                <td className="py-4 px-4 text-slate-400 text-xs max-w-md leading-relaxed">
                  <p className="text-slate-300">{item.description}</p>
                  {item.recommendation && (
                    <p className="text-cyan-400 mt-1 flex items-center space-x-1">
                      <Info className="w-3 h-3 flex-shrink-0" />
                      <span>{item.recommendation}</span>
                    </p>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
