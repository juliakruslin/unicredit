# UniCredit Projekt – Arbeitsregeln für Claude

## Compliance (WpHG)

**WICHTIG:** Dieses Projekt unterliegt strengen regulatorischen Anforderungen nach dem WpHG (Wertpapierhandelsgesetz). Die vollständigen Compliance-Regeln sind in `compliance/rules.md` definiert.

**Vor jeder Textgenerierung oder Textänderung im App-Inhalt:**
- Lies `compliance/rules.md` als Grundlage
- Stelle sicher dass kein generierter Text persönliche Anlageempfehlungen enthält (§ 2 Abs. 8 WpHG)
- Stelle sicher dass keine Eignungsbehauptungen ohne Geeignetheitsprüfung gemacht werden (§ 64 WpHG)
- Marketinginhalte müssen klar als solche erkennbar sein (§ 63 Abs. 6 WpHG)

**Compliance-Check ausführen:**
```bash
npm run compliance -- "Text der geprüft werden soll"
```

## Projekt-Kontext

- **Repo:** github.com/juliakruslin/unicredit
- **Stack:** React + Vite
- **Basis:** Übernommen aus bank-austria-kurs, umgebaut für UniCredit Branding
- **Logo:** `/public/unicredit-logo.png`
