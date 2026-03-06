import Anthropic from '@anthropic-ai/sdk';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rules = readFileSync(join(__dirname, 'rules.md'), 'utf-8');

const client = new Anthropic();

export const COMPLIANCE_SYSTEM_PROMPT = `Du bist ein Compliance-Spezialist für Finanzdienstleistungen mit tiefem Kenntnisstand des WpHG (Wertpapierhandelsgesetz).

Deine Aufgabe ist es, sicherzustellen dass alle Texte die folgenden Anforderungen erfüllen:

${rules}

Grundregeln für jeden Text:
- Keine persönlichen Anlageempfehlungen (§ 2 Abs. 8 WpHG)
- Keine ungeprüften Eignungsbehauptungen (§ 64 WpHG)
- Keine Vermittlungstätigkeit implizieren (§ 2 Abs. 8 Satz 1 Nr. 3, 4 WpHG)
- Marketingmitteilungen klar als solche kennzeichnen (§ 63 Abs. 6 WpHG)
- Alle Informationen redlich, eindeutig und nicht irreführend (§ 63 Abs. 1 WpHG)`;

/**
 * Prüft einen Text auf Compliance-Verstöße gegen das WpHG.
 * @param {string} text - Der zu prüfende Text
 * @returns {Promise<string>} - Compliance-Report
 */
export async function checkCompliance(text) {
  const response = await client.messages.create({
    model: 'claude-opus-4-6',
    max_tokens: 2048,
    thinking: { type: 'adaptive' },
    system: COMPLIANCE_SYSTEM_PROMPT,
    messages: [{
      role: 'user',
      content: `Prüfe diesen Text auf Compliance-Verstöße gegen das WpHG und erstelle einen strukturierten Report:

**Format:**
## Gesamtbewertung
[COMPLIANT ✅ | WARNUNG ⚠️ | VERSTOSS ❌]

## Gefundene Probleme
Für jedes Problem:
- **Problem:** [Beschreibung]
- **Gesetzesgrundlage:** [§ ...]
- **Textpassage:** "[relevante Stelle]"
- **Empfehlung:** [Korrekturvorschlag]

## Zusammenfassung
[Kurze Einschätzung]

---
**Zu prüfender Text:**
${text}`
    }]
  });

  return response.content.find(b => b.type === 'text')?.text;
}

/**
 * Generiert neuen Text mit den Compliance-Regeln als Grundlage.
 * @param {string} prompt - Was generiert werden soll
 * @returns {Promise<string>} - Generierter, compliant-geprüfter Text
 */
export async function generateCompliantText(prompt) {
  const stream = client.messages.stream({
    model: 'claude-opus-4-6',
    max_tokens: 4096,
    thinking: { type: 'adaptive' },
    system: COMPLIANCE_SYSTEM_PROMPT,
    messages: [{ role: 'user', content: prompt }]
  });

  const finalMessage = await stream.finalMessage();
  return finalMessage.content.find(b => b.type === 'text')?.text;
}
