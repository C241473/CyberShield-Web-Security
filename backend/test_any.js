const { performScan } = require('./src/services/scannerService');

async function testRandomWebsites() {
  const sites = [
    'facebook.com',
    'prothomalo.com',
    'bdjobs.com',
    'stackoverflow.com',
    'wikipedia.org',
    'http://neverssl.com'
  ];

  for (const site of sites) {
    console.log('====================================');
    console.log('SCANNING USER INPUT TARGET:', site);
    const res = await performScan(site);
    console.log('Domain:', res.domain, '| Final URL:', res.url);
    console.log('Score:', res.score, '/ 100 | Grade:', res.grade, '| Risk:', res.riskLevel);
    console.log('Summary Checklist:', res.summaryChecklist);
    console.log('Tech Stack:', res.techStack.map(t => t.name).join(', '));
  }
}

testRandomWebsites();
