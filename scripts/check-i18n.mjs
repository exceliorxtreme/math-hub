import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const { DICT } = await import(pathToFileURL(path.resolve('utils/i18n.js')).href);

function listSourceFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === '.git' || entry.name === 'node_modules' || entry.name === 'vendor') return [];
      return listSourceFiles(full);
    }
    return entry.isFile() && /\.(html|js)$/.test(entry.name) ? [full] : [];
  });
}

const used = new Map();
for (const file of listSourceFiles('.')) {
  const source = readFileSync(file, 'utf8');
  for (const match of source.matchAll(/data-i18n=["']([^"']+)["']/g)) {
    if (!used.has(match[1])) used.set(match[1], new Set());
    used.get(match[1]).add(file);
  }
  for (const match of source.matchAll(/\bt\(["']([^"']+)["']\)/g)) {
    if (!used.has(match[1])) used.set(match[1], new Set());
    used.get(match[1]).add(file);
  }
}

let failed = false;
for (const lang of Object.keys(DICT)) {
  const missing = [...used.keys()].filter((key) => !(key in DICT[lang])).sort();
  if (!missing.length) {
    console.log(`${lang}: all ${used.size} used i18n keys are present`);
    continue;
  }

  failed = true;
  console.error(`${lang}: missing ${missing.length} i18n keys`);
  for (const key of missing) {
    console.error(`  ${key}: ${[...used.get(key)].join(', ')}`);
  }
}

const languages = Object.keys(DICT);
const base = new Set(Object.keys(DICT[languages[0]]));
for (const lang of languages.slice(1)) {
  const keys = new Set(Object.keys(DICT[lang]));
  const missing = [...base].filter((key) => !keys.has(key));
  const extra = [...keys].filter((key) => !base.has(key));
  if (missing.length || extra.length) {
    failed = true;
    console.error(`${lang}: key set differs from ${languages[0]}`);
    if (missing.length) console.error(`  missing: ${missing.join(', ')}`);
    if (extra.length) console.error(`  extra: ${extra.join(', ')}`);
  }
}

if (failed) process.exit(1);
