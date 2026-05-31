import { readFileSync } from "node:fs";

const requiredFiles = ["public/index.html", "public/styles.css", "public/app.js", "server.mjs"];
for (const file of requiredFiles) {
  readFileSync(file, "utf8");
}

const html = readFileSync("public/index.html", "utf8");
const checks = [
  ["dashboard title", "DevOps Mentorship Portal"],
  ["student approval section", "Student approvals"],
  ["assignment creation section", "Create assignment"],
  ["submission review section", "Submission review queue"],
  ["announcement section", "Announcements"],
  ["script reference", "app.js"],
  ["stylesheet reference", "styles.css"],
];

const missing = checks.filter(([, needle]) => !html.includes(needle));
if (missing.length > 0) {
  console.error("Missing expected content:");
  for (const [label, needle] of missing) {
    console.error(`- ${label}: ${needle}`);
  }
  process.exit(1);
}

console.log(`Static frontend check passed for ${requiredFiles.length} files and ${checks.length} content assertions.`);
