const fs = require("fs");

const reportPaths = process.argv.slice(2);

if (reportPaths.length !== 3) {
  console.error("Usage: node select-lighthouse-median.js <report1> <report2> <report3>");
  process.exit(1);
}

const reports = reportPaths.map((path) => {
  const report = JSON.parse(fs.readFileSync(path, "utf8"));

  return {
    path,
    report,
    performance: report.categories?.performance?.score ?? 0,
  };
});

reports.sort((a, b) => a.performance - b.performance);

const median = reports[1];

console.log("\n=== Lighthouse Performance Runs ===\n");

reports.forEach(({ path, performance }) => {
  console.log(`${path}: ${Math.round(performance * 100)}/100`);
});

console.log(
  `\nMedian performance: ${Math.round(median.performance * 100)}/100 (${median.path})`
);

fs.copyFileSync(median.path, "./lighthouse-report.json");

console.log("Selected report: ./lighthouse-report.json\n");