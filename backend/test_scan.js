const { performScan } = require('./src/services/scannerService');

async function test() {
  console.log('--- Testing CyberShield Scanner Engine on https://example.com ---');
  try {
    const res = await performScan('https://example.com');
    console.log('Score:', res.score);
    console.log('Grade:', res.grade);
    console.log('Checklist:', res.summaryChecklist);
    console.log('SSL:', res.sslInfo);
    console.log('Headers Count:', res.headersAudit.length);
    console.log('Recommendations Count:', res.recommendations.length);
    console.log('SUCCESS!');
  } catch (err) {
    console.error('ERROR in test:', err);
  }
}

test();
