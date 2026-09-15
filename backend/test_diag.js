const axios = require('axios');
const https = require('https');
const { performScan } = require('./src/services/scannerService');

async function debugUrl(url) {
  console.log(`\n============================\nDebugging: ${url}`);
  try {
    const res = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      },
      maxRedirects: 5,
      timeout: 10000
    });
    console.log('Status:', res.status);
    console.log('Response Headers:', res.headers);

    const scan = await performScan(url);
    console.log('Calculated Score:', scan.score, 'Grade:', scan.grade);
    console.log('Checklist:', scan.summaryChecklist);
  } catch (err) {
    console.error('Error fetching URL:', err.message);
  }
}

async function run() {
  await debugUrl('https://github.com');
  await debugUrl('https://google.com');
}

run();
