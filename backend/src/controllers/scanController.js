const scannerService = require('../services/scannerService');
const ScanReport = require('../models/ScanReport');
const db = require('../config/db');

/**
 * Trigger new scan for a target URL
 */
exports.createScan = async (req, res) => {
  try {
    const { url } = req.body;
    if (!url || typeof url !== 'string') {
      return res.status(400).json({ error: 'Valid website URL is required.' });
    }

    console.log(`[CyberShield API] Initiating defensive security scan for: ${url}`);
    const scanData = await scannerService.performScan(url);

    let savedReport;
    if (db.isMongoConnected()) {
      const report = new ScanReport(scanData);
      savedReport = await report.save();
    } else {
      const id = 'local_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5);
      scanData._id = id;
      savedReport = db.saveLocalScan(scanData);
    }

    return res.status(201).json({
      message: 'Security scan completed successfully',
      data: savedReport
    });
  } catch (err) {
    console.error('[CyberShield API Scan Error]:', err);
    return res.status(500).json({
      error: 'Failed to complete security scan',
      details: err.message
    });
  }
};

/**
 * Fetch scan history
 */
exports.getScans = async (req, res) => {
  try {
    if (db.isMongoConnected()) {
      const reports = await ScanReport.find().sort({ scannedAt: -1 }).limit(30);
      return res.json({ data: reports });
    } else {
      const reports = db.getLocalScans();
      return res.json({ data: reports });
    }
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch scan history', details: err.message });
  }
};

/**
 * Fetch single scan report by ID
 */
exports.getScanById = async (req, res) => {
  try {
    const { id } = req.params;
    if (db.isMongoConnected() && !id.startsWith('local_')) {
      const report = await ScanReport.findById(id);
      if (!report) return res.status(404).json({ error: 'Scan report not found' });
      return res.json({ data: report });
    } else {
      const scans = db.getLocalScans();
      const report = scans.find(s => s._id === id);
      if (!report) return res.status(404).json({ error: 'Scan report not found' });
      return res.json({ data: report });
    }
  } catch (err) {
    return res.status(500).json({ error: 'Error retrieving scan report', details: err.message });
  }
};

/**
 * Delete a scan report by ID
 */
exports.deleteScan = async (req, res) => {
  try {
    const { id } = req.params;
    if (db.isMongoConnected() && !id.startsWith('local_')) {
      await ScanReport.findByIdAndDelete(id);
    } else {
      db.deleteLocalScan(id);
    }
    return res.json({ message: 'Scan report deleted successfully' });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to delete scan report', details: err.message });
  }
};
