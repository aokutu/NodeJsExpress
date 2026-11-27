const fs = require('node:fs');
const path = require('node:path');

const scrubbedDir = path.join(__dirname, '..', 'data', 'scrubbed');

const chunkSize = 180;
const overlap = 30;
const step = chunkSize - overlap;

const txtFiles = fs
  .readdirSync(scrubbedDir)
  .filter((fileName) => fileName.endsWith('.txt'))
  .sort();

const allChunks = [];

for (const fileName of txtFiles) {
  const filePath = path.join(scrubbedDir, fileName);
  const text = fs.readFileSync(filePath, 'utf8');

  let fileChunkIndex = 0;
  for (let start = 0; start < text.length; start += step) {
    const slice = text.slice(start, start + chunkSize).trim();
    if (slice.length > 0) {
      allChunks.push({
        source: fileName,
        index: fileChunkIndex,
        content: slice,
      });
      fileChunkIndex += 1;
    }
  }
}

console.log(`Total chunks: ${allChunks.length}`);
console.log(JSON.stringify(allChunks, null, 2));