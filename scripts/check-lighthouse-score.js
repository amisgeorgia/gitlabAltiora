const fs = require('fs');

const reportPath = process.argv[2] || './lighthouse-report.json';
const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));

const categories = ['performance', 'accessibility', 'best-practices', 'seo'];
const MIN_SCORE = 0.90;
let failed = false;

console.log('\n=== Lighthouse Scores ===\n');
categories.forEach(key => {
  const score = report.categories[key]?.score ?? 0;
  const label = report.categories[key]?.title ?? key;
  const pct = Math.round(score * 100);
  const status = score >= MIN_SCORE ? '✅' : '❌ FAIL';
  console.log(`${status} ${label}: ${pct}/100 (seuil: ${MIN_SCORE * 100})`);
  if (score < MIN_SCORE) failed = true;
});

console.log('');
process.exit(failed ? 1 : 0);
