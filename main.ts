// ai-joke-03 entry (Node 22, standard library only): writes one fixed one-liner
// about working beside an AI coding agent to /output/entry.txt.
// The joke lives in a single constant, so both runs write byte-identical output.

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const JOKE = 'My agent writes code in seconds and apologies in paragraphs.';

// Output guard: the gate requires 1-280 Unicode code points and at least one
// non-whitespace character, so refuse to write anything outside those bounds.
const jokePoints = [...JOKE].length;
if (jokePoints < 1 || jokePoints > 280) {
  throw new Error(`joke must be 1-280 characters, got ${jokePoints}`);
}
if (!/\S/.test(JOKE)) {
  throw new Error('joke must contain a non-whitespace character');
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'entry.txt'), JOKE + '\n', 'utf8');
