import React, { useState } from 'react';
import { Search, ShieldAlert, ArrowRight, Sparkles, Globe, RefreshCw } from 'lucide-react';

export default function UrlInputForm({ onScan, isLoading }) {
  const [url, setUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!url.trim()) return;
    onScan(url.trim());
  };

  const setPreset = (presetUrl) => {
    setUrl(presetUrl);
    onScan(presetUrl);
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-8">
      <div className="cyber-glass rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-2xl relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute -top-24 -left-24 w-60 h-60 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -right-24 w-60 h-60 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="text-center max-w-2xl mx-auto mb-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Defensive Security Diagnostic Tool</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-2 font-sans">
            Analyze Website Security <span className="cyber-gradient-text">& Headers</span>
          </h1>
          <p className="text-slate-400 text-sm">
            Enter a target URL to audit HTTPS, SSL certificate validity, HSTS, CSP, cookie security flags, and server vulnerability leaks.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="relative max-w-2xl mx-auto">
          <div className="relative flex items-center">
            <div className="absolute left-4 text-slate-400 pointer-events-none">
              <Globe className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              disabled={isLoading}
              className="w-full bg-slate-950/90 text-white placeholder-slate-500 pl-12 pr-36 py-4 rounded-xl border border-slate-700/80 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all font-mono text-sm sm:text-base shadow-inner disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isLoading || !url.trim()}
              className="absolute right-2 top-2 bottom-2 px-6 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-semibold font-mono text-sm rounded-lg flex items-center space-x-2 transition-all shadow-cyber-glow disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-95"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                  <span>Scanning...</span>
                </>
              ) : (
                <>
                  <span>Scan Target</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Quick presets */}
        <div className="mt-4 flex items-center justify-center space-x-2 text-xs text-slate-400 font-mono">
          <span className="text-slate-500">Quick Test Targets:</span>
          <button
            type="button"
            onClick={() => setPreset('https://example.com')}
            className="px-2.5 py-1 rounded-md bg-slate-800/60 hover:bg-slate-700 text-slate-300 hover:text-cyan-400 border border-slate-700 transition-colors"
          >
            example.com
          </button>
          <button
            type="button"
            onClick={() => setPreset('https://github.com')}
            className="px-2.5 py-1 rounded-md bg-slate-800/60 hover:bg-slate-700 text-slate-300 hover:text-cyan-400 border border-slate-700 transition-colors"
          >
            github.com
          </button>
          <button
            type="button"
            onClick={() => setPreset('http://neverssl.com')}
            className="px-2.5 py-1 rounded-md bg-slate-800/60 hover:bg-slate-700 text-slate-300 hover:text-amber-400 border border-slate-700 transition-colors"
          >
            neverssl.com (HTTP)
          </button>
        </div>
      </div>
    </div>
  );
}
