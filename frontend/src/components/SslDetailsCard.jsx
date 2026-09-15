import React from 'react';
import { Lock, ShieldCheck, Calendar, Cpu, CheckCircle2, AlertTriangle, Key } from 'lucide-react';

export default function SslDetailsCard({ sslInfo }) {
  if (!sslInfo) return null;

  return (
    <div className="cyber-glass rounded-2xl p-6 border border-slate-800">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
        <h3 className="text-white font-bold font-mono text-base flex items-center space-x-2">
          <Lock className="w-5 h-5 text-cyan-400" />
          <span>SSL / TLS Certificate Diagnostics</span>
        </h3>
        {sslInfo.valid ? (
          <span className="flex items-center space-x-1 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Valid Certificate</span>
          </span>
        ) : (
          <span className="flex items-center space-x-1 text-xs font-mono text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/30">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Invalid / Expired</span>
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
        {/* Certificate Issuer */}
        <div className="bg-slate-900/70 p-3.5 rounded-xl border border-slate-800">
          <div className="text-slate-500 mb-1 flex items-center space-x-1">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>ISSUER</span>
          </div>
          <div className="text-slate-200 font-semibold truncate" title={sslInfo.issuer}>
            {sslInfo.issuer || 'N/A'}
          </div>
        </div>

        {/* Expiration Days */}
        <div className="bg-slate-900/70 p-3.5 rounded-xl border border-slate-800">
          <div className="text-slate-500 mb-1 flex items-center space-x-1">
            <Calendar className="w-3.5 h-3.5 text-cyan-400" />
            <span>VALIDITY REMAINING</span>
          </div>
          <div className="text-slate-200 font-semibold">
            <span className={sslInfo.daysRemaining < 30 ? 'text-amber-400 font-bold' : 'text-emerald-400 font-bold'}>
              {sslInfo.daysRemaining} Days
            </span>
          </div>
        </div>

        {/* TLS Protocol */}
        <div className="bg-slate-900/70 p-3.5 rounded-xl border border-slate-800">
          <div className="text-slate-500 mb-1 flex items-center space-x-1">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span>TLS PROTOCOL</span>
          </div>
          <div className="text-slate-200 font-semibold">
            {sslInfo.protocol || 'TLS 1.3'}
          </div>
        </div>

        {/* Cipher Suite */}
        <div className="bg-slate-900/70 p-3.5 rounded-xl border border-slate-800">
          <div className="text-slate-500 mb-1 flex items-center space-x-1">
            <Key className="w-3.5 h-3.5 text-cyan-400" />
            <span>CIPHER SUITE</span>
          </div>
          <div className="text-cyan-300 font-semibold truncate" title={sslInfo.cipher}>
            {sslInfo.cipher || 'TLS_AES_256_GCM_SHA384'}
          </div>
        </div>
      </div>

      {sslInfo.sans && sslInfo.sans.length > 0 && (
        <div className="mt-4 pt-3 border-t border-slate-800/80">
          <span className="text-slate-500 font-mono text-xs block mb-1.5">Subject Alternative Names (SANs):</span>
          <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
            {sslInfo.sans.map((san, idx) => (
              <span key={idx} className="bg-slate-900 text-slate-300 px-2 py-0.5 rounded border border-slate-800">
                {san}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
