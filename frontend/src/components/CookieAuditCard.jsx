import React from 'react';
import { Cookie, ShieldAlert, CheckCircle2, AlertTriangle, Lock } from 'lucide-react';

export default function CookieAuditCard({ cookiesAudit }) {
  if (!cookiesAudit) return null;

  const { totalCookies, secureCount, httpOnlyCount, sameSiteCount, vulnerableCookies } = cookiesAudit;

  return (
    <div className="cyber-glass rounded-2xl p-6 border border-slate-800">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
        <h3 className="text-white font-bold font-mono text-base flex items-center space-x-2">
          <Cookie className="w-5 h-5 text-cyan-400" />
          <span>Cookie Security Flags Audit</span>
        </h3>
        <span className="text-xs font-mono text-slate-400">
          Total Cookies Discovered: <strong className="text-white">{totalCookies}</strong>
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs mb-6">
        {/* Secure Flag */}
        <div className="bg-slate-900/70 p-3.5 rounded-xl border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-slate-400 block mb-0.5">Secure Flag</span>
            <span className="text-slate-200 font-bold text-sm">{secureCount} / {totalCookies}</span>
          </div>
          {secureCount === totalCookies && totalCookies > 0 ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          ) : (
            <AlertTriangle className="w-5 h-5 text-amber-400" />
          )}
        </div>

        {/* HttpOnly Flag */}
        <div className="bg-slate-900/70 p-3.5 rounded-xl border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-slate-400 block mb-0.5">HttpOnly Flag</span>
            <span className="text-slate-200 font-bold text-sm">{httpOnlyCount} / {totalCookies}</span>
          </div>
          {httpOnlyCount === totalCookies && totalCookies > 0 ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          ) : (
            <AlertTriangle className="w-5 h-5 text-amber-400" />
          )}
        </div>

        {/* SameSite Flag */}
        <div className="bg-slate-900/70 p-3.5 rounded-xl border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-slate-400 block mb-0.5">SameSite Flag</span>
            <span className="text-slate-200 font-bold text-sm">{sameSiteCount} / {totalCookies}</span>
          </div>
          {sameSiteCount === totalCookies && totalCookies > 0 ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          ) : (
            <AlertTriangle className="w-5 h-5 text-amber-400" />
          )}
        </div>
      </div>

      {vulnerableCookies && vulnerableCookies.length > 0 ? (
        <div className="bg-rose-950/20 rounded-xl p-4 border border-rose-900/40">
          <h4 className="text-rose-400 font-mono text-xs font-bold flex items-center space-x-2 mb-2">
            <ShieldAlert className="w-4 h-4" />
            <span>Vulnerable Cookies Identified:</span>
          </h4>
          <div className="space-y-2 font-mono text-xs">
            {vulnerableCookies.map((c, idx) => (
              <div key={idx} className="bg-slate-950/80 p-2.5 rounded-lg border border-rose-900/30">
                <div className="text-slate-200 font-semibold mb-1">Cookie: <code className="text-rose-300">{c.name}</code></div>
                <ul className="list-disc list-inside text-rose-300/80 text-[11px] space-y-0.5">
                  {c.issues.map((iss, i) => (
                    <li key={i}>{iss}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-emerald-950/20 rounded-xl p-4 border border-emerald-900/40 text-xs font-mono text-emerald-300 flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>All analyzed cookies are properly secured with Secure, HttpOnly, and SameSite protection flags.</span>
        </div>
      )}
    </div>
  );
}
