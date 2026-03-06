#!/usr/bin/env node
/**
 * CLI-Tool zum Compliance-Check von Texten.
 *
 * Verwendung:
 *   node check-compliance.js "Text der geprüft werden soll"
 *   echo "Text" | node check-compliance.js
 *   npm run compliance -- "Text der geprüft werden soll"
 */

import { checkCompliance } from './compliance/agent.js';
import { readFileSync } from 'fs';

// Text aus Argument oder stdin lesen
let text = process.argv[2];

if (!text) {
  try {
    text = readFileSync('/dev/stdin', 'utf-8').trim();
  } catch {
    console.error('❌ Kein Text angegeben.');
    console.error('');
    console.error('Verwendung:');
    console.error('  node check-compliance.js "Text der geprüft werden soll"');
    console.error('  echo "Text" | node check-compliance.js');
    console.error('  npm run compliance -- "Text der geprüft werden soll"');
    process.exit(1);
  }
}

console.log('🔍 Compliance-Check läuft...\n');

const result = await checkCompliance(text);
console.log(result);
