import React, { useState } from 'react';
import { Lightbulb, Copy, Check, Terminal, Shield, Code2 } from 'lucide-react';

export default function RecommendationsCard({ recommendations }) {
  const [copiedIdx, setCopiedIdx] = useState(null);
  const [activeTab, setActiveTab] = useState('express'); // 'express', 'nginx', 'apache', 'cloudflare'

  if (!recommendations || recommendations.length === 0) {
    return (
      <div className="cyber-glass rounded-2xl p-6 border border-slate-800 my-8 bg-emerald-950/10">
        <h3 className="text-emerald-400 font-bold font-mono text-base flex items-center space-x-2">
          <Check className="w-5 h-5 text-emerald-400" />
          <span>No Critical Fixes Required!</span>
        </h3>
        <p className="text-slate-400 text-xs font-mono mt-1">
          Your server headers and SSL configurations meet strong defensive security standards.
        </p>
      </div>
    );
  }

  const copyToClipboard = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div className="cyber-glass rounded-2xl p-6 border border-slate-800 my-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 mb-6 gap-4">
        <div>
          <h2 className="text-xl font-bold text-white font-mono flex items-center space-x-2">
            <Lightbulb className="w-5 h-5 text-amber-400" />
            <span>Actionable Security Fixes & Code Snippets</span>
          </h2>
          <p className="text-slate-400 text-xs mt-1">
            Copy production-ready configuration snippets to resolve identified header vulnerabilities.
          </p>
        </div>

        {/* Server Framework Selector */}
        <div className="flex items-center space-x-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800 font-mono text-xs">
          {['express', 'nginx', 'apache', 'cloudflare'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-lg uppercase tracking-wider transition-colors ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab === 'express' ? 'Express.js' : tab}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        {recommendations.map((rec, idx) => {
          const codeSnippet = rec.fixSnippet ? rec.fixSnippet[activeTab] : null;

          return (
            <div key={idx} className="bg-slate-900/80 rounded-xl p-5 border border-slate-800">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-white font-bold font-mono text-base flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                  <span>{rec.title}</span>
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                  {rec.severity} SEVERITY
                </span>
              </div>

              <p className="text-slate-300 text-xs font-sans leading-relaxed mb-4">
                {rec.description}
              </p>

              {codeSnippet && (
                <div className="relative bg-slate-950 rounded-xl border border-slate-800 overflow-hidden font-mono text-xs">
                  <div className="flex items-center justify-between px-4 py-2 bg-slate-900/90 border-b border-slate-800 text-slate-400 text-[11px]">
                    <div className="flex items-center space-x-2">
                      <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                      <span className="uppercase">{activeTab} Configuration Code</span>
                    </div>
                    <button
                      onClick={() => copyToClipboard(codeSnippet, idx)}
                      className="flex items-center space-x-1 text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      {copiedIdx === idx ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Snippet</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="p-4 text-cyan-300 overflow-x-auto leading-relaxed">
                    <code>{codeSnippet}</code>
                  </pre>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
