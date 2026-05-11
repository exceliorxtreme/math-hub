import { readdirSync } from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

function listModules(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return listModules(full);
    return entry.isFile() && entry.name.endsWith('.js') ? [full] : [];
  });
}

let failed = false;
let count = 0;
for (const file of listModules('modules')) {
  count += 1;
  try {
    await import(pathToFileURL(path.resolve(file)).href);
  } catch (error) {
    failed = true;
    console.error(`Import failed: ${file}`);
    console.error(error);
  }
}

if (failed) process.exit(1);
console.log(`ES module imports OK: ${count} files`);
