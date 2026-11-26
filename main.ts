// Funniest Cat Voicemail Greeting — u-eager-stork-81-9647-funniest-cat-voicemail-greeting-8eaad443
// Writes one voicemail greeting (<=120 chars, one line) to entry.txt.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "You've reached Pickles. I'm napping in the box you threw away. Leave a message after the beep, then bring snacks.";

// Self-checking gate: the sealed scorer requires UTF-8 text of 1-120
// characters, not only whitespace, on one line.
function gate(text: string): void {
  if (typeof text !== "string" || text.trim().length === 0) {
    throw new Error("gate failed: entry is empty or whitespace-only");
  }
  if (text.length > 120) {
    throw new Error(`gate failed: entry is ${text.length} chars, over the 120 cap`);
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("gate failed: entry must be a single line");
  }
}

gate(ENTRY);

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");

// Read-back re-gate: re-read what was written and re-check it, so a
// truncated or altered write can never pass silently.
const written = readFileSync(outPath, "utf8");
gate(written);
if (written !== ENTRY) {
  throw new Error("re-gate failed: entry.txt does not match the entry exactly");
}
console.log(ENTRY);
