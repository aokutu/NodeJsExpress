const fs = require('node:fs');
const path = require('node:path');

const txtsDir = path.join(__dirname, '..', 'data', 'txts');
const outputDir = path.join(__dirname, '..', 'data', 'scrubbed');

const emailPattern = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g;
const phonePattern = /(?:\+\d{1,3}[\s-]?\d{2,3}[\s-]?\d{3}[\s-]?\d{3,4}|\(\d{2,4}\)\s?\d{3,4}[-\s]?\d{3,4})/g;
const tokenPattern = /(?:Bearer\s+[A-Za-z0-9._-]{12,}|\bsk-(?:live|test)-[A-Za-z0-9_-]{10,}\b)/g;

const txtFiles = fs
  .readdirSync(txtsDir)
  .filter((fileName) => fileName.endsWith('.txt'))
  .sort();

for (const fileName of txtFiles) {
  const inputPath = path.join(txtsDir, fileName);
  const outputPath = path.join(outputDir, fileName);

  const originalText = fs.readFileSync(inputPath, 'utf8');
  const scrubbedText = originalText
    .replace(emailPattern, '[EMAIL]')
    .replace(phonePattern, '[PHONE]')
    .replace(tokenPattern, '[TOKEN]');

  fs.writeFileSync(outputPath, scrubbedText, 'utf8');
  console.log(`Saved scrubbed file: data/scrubbed/${fileName}`);
}