const mongoose = require('mongoose');

const scanReportSchema = new mongoose.Schema({
  url: { type: String, required: true },
  domain: { type: String, required: true },
  score: { type: Number, required: true },
  grade: { type: String, required: true },
  riskLevel: { type: String, required: true },
  
  summaryChecklist: {
    https: { type: String, required: true },       // 'PASS', 'WARN', 'FAIL'
    hsts: { type: String, required: true },
    csp: { type: String, required: true },
    xFrameOptions: { type: String, required: true },
    secureCookies: { type: String, required: true },
    serverHeader: { type: String, required: true }
  },

  headersAudit: [{
    header: String,
    value: String,
    status: String, // 'PASS', 'WARN', 'FAIL'
    severity: String, // 'CRITICAL', 'HIGH', 'MEDIUM', 'LOW', 'INFO'
    description: String,
    recommendation: String
  }],

  sslInfo: {
    hasSsl: Boolean,
    valid: Boolean,
    issuer: String,
    subject: String,
    validFrom: String,
    validTo: String,
    daysRemaining: Number,
    cipher: String,
    protocol: String,
    sans: [String],
    error: String
  },

  cookiesAudit: {
    totalCookies: Number,
    secureCount: Number,
    httpOnlyCount: Number,
    sameSiteCount: Number,
    vulnerableCookies: [{
      name: String,
      issues: [String]
    }]
  },

  techStack: [{
    name: String,
    category: String,
    confidence: String
  }],

  recommendations: [{
    title: String,
    severity: String,
    description: String,
    fixSnippet: {
      express: String,
      nginx: String,
      apache: String,
      cloudflare: String
    }
  }],

  scannedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ScanReport', scanReportSchema);
