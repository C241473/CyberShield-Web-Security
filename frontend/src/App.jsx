import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import UrlInputForm from './components/UrlInputForm';
import ScoreGauge from './components/ScoreGauge';
import StatusBadgeGrid from './components/StatusBadgeGrid';
import HeaderAuditTable from './components/HeaderAuditTable';
import SslDetailsCard from './components/SslDetailsCard';
import CookieAuditCard from './components/CookieAuditCard';
import RecommendationsCard from './components/RecommendationsCard';
import RecentScans from './components/RecentScans';
import { scanWebsite, getScanHistory, deleteScan } from './services/api';
import { ShieldCheck, Download, RefreshCw, AlertCircle, Sparkles, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [currentReport, setCurrentReport] = useState(null);
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await getScanHistory();
      if (res.data) {
        setScans(res.data);
      }
    } catch (err) {
      console.warn('Failed to load scan history:', err);
    }
  };

  const handleScan = async (url) => {
    setLoading(true);
    setError(null);
    try {
      const res = await scanWebsite(url);
      if (res.data) {
        setCurrentReport(res.data);
        await fetchHistory();
      }
    } catch (err) {
      const errMsg = err.response?.data?.error || err.message || 'Scan failed to complete.';
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteScan(id);
      if (currentReport && currentReport._id === id) {
        setCurrentReport(null);
      }
      await fetchHistory();
    } catch (err) {
      console.error('Failed to delete scan:', err);
    }
  };

  const exportReportJson = () => {
    if (!currentReport) return;
    const jsonStr = JSON.stringify(currentReport, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CyberShield_Report_${currentReport.domain}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col font-sans">
      <Header onReset={() => setCurrentReport(null)} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <UrlInputForm onScan={handleScan} isLoading={loading} />

        {/* Error Alert */}
        {error && (
          <div className="max-w-4xl mx-auto mb-8 bg-rose-950/40 border border-rose-800 text-rose-300 p-4 rounded-xl flex items-center space-x-3 font-mono text-sm shadow-cyber-red">
            <AlertCircle className="w-5 h-5 flex-shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        {/* Loading Spinner */}
        {loading && (
          <div className="cyber-glass rounded-2xl p-12 max-w-2xl mx-auto text-center border border-slate-800 my-8 shadow-2xl">
            <div className="w-16 h-16 border-4 border-cyan-500/20 border-t-cyan-400 rounded-full animate-spin mx-auto mb-4"></div>
            <h3 className="text-xl font-bold font-mono text-white mb-2">Analyzing Defensive Security Controls</h3>
            <div className="space-y-1 font-mono text-xs text-slate-400">
              <p>• Validating SSL/TLS Certificate chain & handshake...</p>
              <p>• Inspecting HTTP security headers (HSTS, CSP, XFO, XCTO)...</p>
              <p>• Auditing Cookie security flags (Secure, HttpOnly, SameSite)...</p>
              <p>• Checking Server version leakage and technology stack...</p>
            </div>
          </div>
        )}

        {/* Audit Results Dashboard */}
        {!loading && currentReport && (
          <div className="space-y-8 animate-fadeIn">
            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-slate-900/60 p-4 rounded-2xl border border-slate-800 gap-4">
              <div>
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">Security Audit Target</span>
                <h2 className="text-2xl font-bold text-white font-mono flex items-center space-x-2">
                  <span>{currentReport.domain}</span>
                  <a href={currentReport.url} target="_blank" rel="noreferrer" className="text-cyan-400 text-xs hover:underline">
                    ({currentReport.url})
                  </a>
                </h2>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={exportReportJson}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-mono font-semibold rounded-xl border border-slate-700 flex items-center space-x-2 transition-all hover:scale-105"
                >
                  <Download className="w-4 h-4" />
                  <span>Export JSON Report</span>
                </button>
              </div>
            </div>

            {/* Top Overview Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-5">
                <ScoreGauge
                  score={currentReport.score}
                  grade={currentReport.grade}
                  riskLevel={currentReport.riskLevel}
                  domain={currentReport.domain}
                />
              </div>
              <div className="lg:col-span-7">
                <StatusBadgeGrid
                  summaryChecklist={currentReport.summaryChecklist}
                  techStack={currentReport.techStack}
                />
              </div>
            </div>

            {/* Detailed Audits */}
            <HeaderAuditTable headersAudit={currentReport.headersAudit} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <SslDetailsCard sslInfo={currentReport.sslInfo} />
              <CookieAuditCard cookiesAudit={currentReport.cookiesAudit} />
            </div>

            <RecommendationsCard recommendations={currentReport.recommendations} />
          </div>
        )}

        {/* Scan History Section */}
        <RecentScans
          scans={scans}
          onSelectScan={(report) => {
            setCurrentReport(report);
            window.scrollTo({ top: 300, behavior: 'smooth' });
          }}
          onDeleteScan={handleDelete}
        />
      </main>

      <footer className="border-t border-slate-800 bg-[#070a12] py-6 text-center text-slate-500 font-mono text-xs">
        <p>CyberShield Defensive Security Suite — Empowering Web Security Audits</p>
      </footer>
    </div>
  );
}
