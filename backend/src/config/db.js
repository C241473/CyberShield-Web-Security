const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const DB_FILE = path.join(__dirname, '../../data/scans_fallback.json');

let isMongoConnected = false;

const connectDB = async () => {
  const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/cybershield';
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 3000
    });
    isMongoConnected = true;
    console.log(`[CyberShield DB] Connected to MongoDB at ${mongoURI}`);
  } catch (error) {
    isMongoConnected = false;
    console.warn(`[CyberShield DB] MongoDB connection failed (${error.message}). Operating with local storage fallback.`);
    ensureLocalDbFile();
  }
};

const ensureLocalDbFile = () => {
  const dir = path.dirname(DB_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify([], null, 2));
  }
};

const getLocalScans = () => {
  ensureLocalDbFile();
  try {
    const data = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(data || '[]');
  } catch (err) {
    return [];
  }
};

const saveLocalScan = (scanObj) => {
  ensureLocalDbFile();
  const scans = getLocalScans();
  const existingIdx = scans.findIndex(s => s._id === scanObj._id || s.url === scanObj.url);
  if (existingIdx >= 0) {
    scans[existingIdx] = scanObj;
  } else {
    scans.unshift(scanObj);
  }
  // keep max 50 scans
  const trimmed = scans.slice(0, 50);
  fs.writeFileSync(DB_FILE, JSON.stringify(trimmed, null, 2));
  return scanObj;
};

const deleteLocalScan = (id) => {
  ensureLocalDbFile();
  let scans = getLocalScans();
  scans = scans.filter(s => s._id !== id);
  fs.writeFileSync(DB_FILE, JSON.stringify(scans, null, 2));
};

module.exports = {
  connectDB,
  isMongoConnected: () => isMongoConnected,
  getLocalScans,
  saveLocalScan,
  deleteLocalScan
};
