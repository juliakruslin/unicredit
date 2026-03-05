import { useState, useEffect, useRef, useCallback } from "react";

const Q = {
  electricBlue: "#3e2eff", electricBlueHover: "#2a1fcc", electricBlueLight: "#d2dbff",
  deepBlue: "#0d0c1a", deepBlue70: "rgba(13,12,26,0.7)", deepBlue30: "rgba(13,12,26,0.3)",
  deepBlue10: "rgba(13,12,26,0.08)", deepBlue5: "rgba(13,12,26,0.04)",
  purple: "#825aff", lightBlue: "#0074cc", skyBlue: "#2196F3",
  grape: "#ac1d65", neutralDark: "#6b7280", white: "#ffffff",
  pageBg: "#ffffff",
  success: "#10b981", successBg: "#ecfdf5", warning: "#f59e0b", warningBg: "#fef3c7",
  danger: "#ef4444", dangerBg: "#fef2f2",
  radiusPill: "360px", radiusSm: "16px", radiusXs: "12px", radius: "20px",
  font: "'Inter', Arial, sans-serif",
};

const LEVELS = [
  { id: 1, title: "Warum investieren?", tag: "Die Motivation", color: Q.electricBlue, icon: "💡",
    desc: "Versteh, warum dein Geld auf dem Konto an Wert verliert und was du dagegen tun kannst.",
    modules: [
      { id: "1.1", title: "Dein Geld verliert heimlich an Wert", dur: "23 Min", type: "inflation" },
      { id: "1.2", title: "Was Investieren wirklich bedeutet", dur: "2 Min", type: "personality" },
      { id: "1.3", title: "Der Schneeball-Effekt", dur: "23 Min", type: "compound" },
      { id: "1.4", title: "Warum jetzt der richtige Zeitpunkt ist", dur: "2 Min", type: "timing" },
    ],
    transition: {
      heading: "Du bist nicht mehr jemand, der Investieren aufschiebt",
      changes: [
        "Du schaust auf dein Sparkonto anders nicht mehr als sicheren Hafen, sondern verstehst was Inflation damit macht",
        "Du hast den Schneeball-Effekt gespürt: je früher du anfängst, desto mächtiger wird er für dich",
        "Du bist motiviert zu starten nicht aus Zwang, sondern weil du weißt, was es kostet wenn du es nicht tust",
      ],
      nextTeaser: "Jetzt gehst du das quirion-Onboarding durch und verstehst zum ersten Mal wirklich, warum jede Frage gestellt wird.",
    },
  },
  { id: 2, title: "Dein Onboarding verstehen", tag: "Die Fragen erklärt", color: Q.purple, icon: "📋",
    desc: "Lern, was hinter den quirion-Fragen steckt von Risiko bis Anlagehorizont.",
    modules: [
      { id: "2.1", title: "Anlageziel & Zeithorizont", dur: "23 Min", type: "horizon" },
      { id: "2.2", title: "Risiko ist nicht, was du denkst", dur: "23 Min", type: "risk" },
      { id: "2.3", title: "Nachhaltigkeit & Geld", dur: "12 Min", type: "esg" },
      { id: "2.4", title: "Wie viel solltest du investieren?", dur: "23 Min", type: "budget" },
      { id: "2.5", title: "Kenntnisse & Bestätigung", dur: "12 Min", type: "knowledge" },
    ],
    transition: {
      heading: "Du weißt, warum du jede quirion-Frage so beantwortet hast",
      changes: [
        "Du gibst deinen Zeithorizont bewusst an nicht geraten, sondern mit echtem Verständnis dahinter",
        "Du könntest jemandem erklären, warum Risiko und kurzfristiger Verlust zwei verschiedene Dinge sind",
        "Du investierst genau die Summe, die zu deiner Situation passt mit Notgroschen und allem drum herum",
      ],
      nextTeaser: "Dein Portfolio ist fertig erstellt. Jetzt schaust du rein und verstehst, was drin steckt und warum.",
    },
  },
  { id: 3, title: "Dein Ergebnis verstehen", tag: "Portfolio erklärt", color: Q.skyBlue, icon: "📊",
    desc: "Dein Portfolio besteht aus ETFs versteh, warum und wie das für dich arbeitet.",
    modules: [
      { id: "3.1", title: "Was ist ein ETF?", dur: "23 Min", type: "etf" },
      { id: "3.2", title: "Dein Gleitpfad", dur: "23 Min", type: "glidepath" },
      { id: "3.3", title: "Dein ETF-Mix", dur: "2 Min", type: "etfmix" },
      { id: "3.4", title: "Was kostet quirion?", dur: "12 Min", type: "costs" },
    ],
    transition: {
      heading: "Du verstehst dein Portfolio nicht nur seinen Wert",
      changes: [
        "Du öffnest die quirion-App und weißt, was jede Position bedeutet und warum sie dort ist",
        "Du wirst bei Markteinbrüchen nicht mehr panisch verkaufen weil du verstehst, wie das System aufgebaut ist",
        "Dein Geld wird automatisch umgeschichtet, je näher dein Ziel rückt ohne dass du etwas tun musst",
      ],
      nextTeaser: "Jetzt machen wir dein Konto startklar. Ein letzter Schritt dann investierst du wirklich.",
    },
  },
  { id: 4, title: "Dein Konto sichern", tag: "KYC & Sicherheit", color: Q.grape, icon: "🔒",
    desc: "Warum braucht quirion deine Daten und wie sicher ist dein Geld wirklich?",
    modules: [
      { id: "4.1", title: "Warum die Identitätsprüfung?", dur: "12 Min", type: "kyc" },
      { id: "4.2", title: "Wie sicher ist mein Geld?", dur: "2 Min", type: "safety" },
    ],
    transition: {
      heading: "Du bist jetzt Investor:in nicht nur in der Theorie",
      changes: [
        "Du hast den Schritt gemacht, den die meisten Menschen ihr ganzes Leben aufschieben",
        "Dein Geld arbeitet ab sofort für dich auch wenn du schläfst, reist oder einfach lebst",
        "Du hast Klarheit: du weißt, was wo liegt, warum, und wie es mehrfach abgesichert ist",
      ],
      nextTeaser: "Im letzten Level holst du noch mehr raus. Kleine Stellschrauben große Wirkung über die Jahre.",
    },
  },
  { id: 5, title: "Mehr aus deinem Geld", tag: "Optimieren & Wachsen", color: Q.success, icon: "🚀",
    desc: "Entdecke, wie du noch mehr aus deinem Geld herausholst mit kleinen Stellschrauben.",
    modules: [
      { id: "5.1", title: "Was andere investieren", dur: "2 Min", type: "benchmark" },
      { id: "5.2", title: "Wo kannst du sparen?", dur: "23 Min", type: "savings" },
      { id: "5.3", title: "Dein Zukunfts-Ich", dur: "23 Min", type: "future" },
    ],
  },
];

// ─── SHARED UI COMPONENTS ───
function SubHead({ children }) {
  return <p style={{ fontWeight: 800, fontSize: 13, color: Q.deepBlue, textTransform: "uppercase", letterSpacing: 0.5, margin: "18px 0 6px 0" }}>{children}</p>;
}
function Bullets({ items }) {
  return (
    <ul style={{ paddingLeft: 20, margin: "8px 0 0" }}>
      {items.map((item, i) => <li key={i} style={{ fontSize: 14, lineHeight: 1.65, color: Q.deepBlue, marginBottom: 5 }} dangerouslySetInnerHTML={{ __html: item }} />)}
    </ul>
  );
}
function Para({ children }) {
  return <p style={{ fontSize: 14, lineHeight: 1.65, color: Q.deepBlue, margin: "0 0 10px" }}>{children}</p>;
}
const pill = (active, color) => ({
  padding: "8px 18px", borderRadius: Q.radiusPill,
  border: active ? `2px solid ${color}` : `1.5px solid ${Q.deepBlue10}`,
  background: active ? color + "0F" : Q.white, color: active ? color : Q.neutralDark,
  fontWeight: 600, fontSize: 14, cursor: "pointer", transition: "all .15s",
});
const cardSt = { background: Q.white, borderRadius: "16px", border: "none", padding: 24, boxShadow: "0 2px 16px rgba(13,12,26,0.07)" };
const bgSt = { background: "#f4f3f9", borderRadius: "16px", padding: 24 };

function Merke({ text }) {
  return (
    <div style={{ background: `linear-gradient(135deg, ${Q.electricBlue}08, ${Q.purple}0A)`, border: `1.5px solid ${Q.electricBlue}22`, borderRadius: Q.radiusSm, padding: "18px 20px", display: "flex", gap: 14, alignItems: "flex-start" }}>
      <span style={{ fontSize: 18, flexShrink: 0, marginTop: 1 }}>💡</span>
      <div>
        <div style={{ fontWeight: 800, fontSize: 11, color: Q.electricBlue, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>Merke dir</div>
        <p style={{ fontSize: 14, lineHeight: 1.55, color: Q.deepBlue, margin: 0 }}>{text}</p>
      </div>
    </div>
  );
}

function DoneBtn({ onClick }) {
  const [h, setH] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ width: "100%", padding: "16px 24px", borderRadius: Q.radiusPill, border: "none",
        background: h ? Q.electricBlueHover : Q.electricBlue, color: Q.white, fontWeight: 700, fontSize: 15,
        cursor: "pointer", transition: "all .2s", letterSpacing: -0.2,
        boxShadow: h ? `0 0 0 4px ${Q.electricBlueLight}` : "0 4px 20px rgba(62,46,255,0.25)" }}>
      Modul abschließen ✓
    </button>
  );
}

function Quiz({ question, options, explanation, onAnswer }) {
  const [ans, setAns] = useState(null);
  return (
    <div style={cardSt}>
      <p style={{ fontWeight: 700, color: Q.deepBlue, marginBottom: 14, fontSize: 15 }}>📝 {question}</p>
      {options.map((o, i) => (
        <button key={i} onClick={() => { setAns(i); onAnswer?.(i); }}
          style={{ display: "block", width: "100%", textAlign: "left", padding: "13px 18px", marginBottom: 8,
            borderRadius: Q.radiusXs, cursor: "pointer", fontWeight: 500, fontSize: 14, transition: "all .15s",
            border: ans === i ? `2px solid ${o.correct ? Q.success : Q.danger}` : `1.5px solid ${Q.deepBlue10}`,
            background: ans === i ? (o.correct ? Q.successBg : Q.dangerBg) : Q.white, color: Q.deepBlue }}>
          {o.text}{ans === i && (o.correct ? " ✅" : " ❌")}
        </button>
      ))}
      {ans !== null && <div style={{ ...bgSt, marginTop: 10, fontSize: 14, lineHeight: 1.55 }}>{explanation}</div>}
    </div>
  );
}

function Sld({ label, min, max, step, value, onChange, unit }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={{ fontSize: 12, fontWeight: 700, color: Q.neutralDark, textTransform: "uppercase", letterSpacing: 0.5 }}>{label}</label>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 6 }}>
        <input type="range" min={min} max={max} step={step || 1} value={value} onChange={e => onChange(+e.target.value)}
          style={{ flex: 1, accentColor: Q.electricBlue, height: 6 }} />
        <span style={{ fontWeight: 800, fontSize: 18, color: Q.electricBlue, minWidth: 80, textAlign: "right" }}>
          {typeof value === "number" ? value.toLocaleString("de-DE") : value}{unit || ""}
        </span>
      </div>
    </div>
  );
}

function StatBox({ label, value, sub, bg, color }) {
  return (
    <div style={{ flex: 1, padding: 16, background: bg || Q.deepBlue5, borderRadius: Q.radiusXs, textAlign: "center" }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: Q.neutralDark, textTransform: "uppercase", letterSpacing: 0.5 }}>{label}</div>
      <div style={{ fontSize: 24, fontWeight: 900, color: color || Q.deepBlue, marginTop: 4 }}>{value}</div>
      {sub && <div style={{ fontSize: 11, color: Q.neutralDark, marginTop: 2 }}>{sub}</div>}
    </div>
  );
}

// ─── INTERACTIVE MODULES ───
function InflationMod({ onDone }) {
  const [cash, setCash] = useState(20000);
  const [inflation, setInflation] = useState(2);

  const r = inflation / 100;
  const v10 = Math.round(cash * Math.pow(1 - r, 10));
  const v20 = Math.round(cash * Math.pow(1 - r, 20));
  const v30 = Math.round(cash * Math.pow(1 - r, 30));
  const loss = cash - v30;
  const lossPct = Math.round((loss / cash) * 100);

  const milestones = [
    { label: "Heute", value: cash, years: 0 },
    { label: "In 10 Jahren", value: v10, years: 10 },
    { label: "In 20 Jahren", value: v20, years: 20 },
    { label: "In 30 Jahren", value: v30, years: 30 },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
      <div style={bgSt}>
        <Para>Stell dir vor, du hast heute 20.000 Euro auf deinem Konto. Du sparst eisern und rührst das Geld nicht an. In 30 Jahren schaust du auf dein Konto es stehen immer noch 20.000 Euro drauf. Klingt gut? Hier ist die unbequeme Wahrheit: <strong>Für diese 20.000 Euro kannst du dir in 30 Jahren deutlich weniger leisten als heute.</strong></Para>
        <SubHead>Was Inflation bedeutet</SubHead>
        <Para>Inflation bedeutet, dass die Preise im Laufe der Zeit steigen. Die <strong>Europäische Zentralbank (EZB)</strong> hat das Ziel, die jährliche Preissteigerung bei rund <strong>2 Prozent</strong> zu halten. Klingt wenig. Die Langzeitwirkung ist aber enorm.</Para>
        <SubHead>Die gute Nachricht</SubHead>
        <Para>Inflation ist kein Naturgesetz, dem du machtlos ausgeliefert bist. Breit gestreute Aktienanlagen haben in den letzten Jahrzehnten durchschnittlich <strong>78 % pro Jahr</strong> erzielt weit mehr als die Inflationsrate. Wer investiert, gleicht die Inflation nicht nur aus, sondern baut darüber hinaus Vermögen auf.</Para>
      </div>

      {/* Calculator */}
      <div style={{ background: "#F6F7F8", borderRadius: 20, padding: 20 }}>
        <p style={{ fontWeight: 800, fontSize: 15, color: Q.deepBlue, margin: "0 0 16px" }}>💸 Was ist dein Geld in 30 Jahren noch wert?</p>
        <Sld label="Dein Cash-Vermögen heute" min={1000} max={200000} step={1000} value={cash} onChange={setCash} unit=" €" />
        <Sld label="Jährliche Inflation" min={1} max={5} step={0.5} value={inflation} onChange={setInflation} unit=" %" />

        {/* Milestone bars */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 6 }}>
          {milestones.map((m) => {
            const pct = (m.value / cash) * 100;
            const isToday = m.years === 0;
            return (
              <div key={m.years}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 4 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: isToday ? Q.deepBlue : Q.neutralDark }}>{m.label}</span>
                  <span style={{ fontWeight: 900, fontSize: 16, color: isToday ? Q.deepBlue : pct < 70 ? Q.danger : "#92400e" }}>
                    {m.value.toLocaleString("de-DE")} €
                  </span>
                </div>
                <div style={{ height: 10, borderRadius: 6, background: "#e0e4ef", overflow: "hidden" }}>
                  <div style={{
                    height: "100%", borderRadius: 6,
                    width: `${pct}%`,
                    background: isToday ? Q.electricBlue : pct < 70 ? Q.danger : "#f59e0b",
                    transition: "width .4s cubic-bezier(.4,0,.2,1)"
                  }} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Loss summary */}
        <div style={{ marginTop: 16, display: "flex", gap: 10 }}>
          <div style={{ flex: 1, background: Q.dangerBg, border: `1.5px solid ${Q.danger}22`, borderRadius: 14, padding: "14px 16px", textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: Q.danger, textTransform: "uppercase", letterSpacing: 0.4, marginBottom: 4 }}>Kaufkraftverlust</div>
            <div style={{ fontWeight: 900, fontSize: 22, color: Q.danger }}>−{loss.toLocaleString("de-DE")} €</div>
            <div style={{ fontSize: 11, color: Q.neutralDark, marginTop: 2 }}>in 30 Jahren</div>
          </div>
          <div style={{ flex: 1, background: "#fff3e0", border: "1.5px solid #f59e0b22", borderRadius: 14, padding: "14px 16px", textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#92400e", textTransform: "uppercase", letterSpacing: 0.4, marginBottom: 4 }}>Reale Kaufkraft</div>
            <div style={{ fontWeight: 900, fontSize: 22, color: "#92400e" }}>{100 - lossPct} %</div>
            <div style={{ fontSize: 11, color: Q.neutralDark, marginTop: 2 }}>vom heutigen Wert</div>
          </div>
        </div>
        <div style={{ marginTop: 12, fontSize: 12, color: Q.neutralDark, lineHeight: 1.55, textAlign: "center" }}>
          Dein Kontostand zeigt weiterhin <strong>{cash.toLocaleString("de-DE")} €</strong> aber du kannst dir nur noch Dinge im Wert von <strong style={{ color: Q.danger }}>{v30.toLocaleString("de-DE")} €</strong> dafür kaufen.
        </div>
      </div>

      <Quiz question="10.000 € auf dem Konto wie viel Kaufkraft bleibt in 20 Jahren?"
        options={[{ text: "10.000 €", correct: false }, { text: "ca. 6.700 €", correct: true }, { text: "ca. 8.200 €", correct: false }]}
        explanation="Richtig: ca. 6.700 €! Dein Kontostand bleibt gleich, aber du kannst dir nur noch Waren im Wert von ca. 6.700 € kaufen."
        onAnswer={() => {}} />
      <Merke text="Dein Geld auf dem Konto verliert jedes Jahr an Kaufkraft. Je länger du wartest, desto mehr verlierst du ohne es zu merken." />
      <DoneBtn onClick={onDone} />
    </div>
  );
}

function CompoundMod({ onDone }) {
  const [m, setM] = useState(100);
  const [y, setY] = useState(30);
  const invested = m * 12 * y;
  const fv = m * ((Math.pow(1 + 0.07 / 12, y * 12) - 1) / (0.07 / 12));
  const sav = m * 12 * y * 1.005;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
      <div style={bgSt}>
        <Para>Stell dir einen Schneeball vor, der einen langen Berghang hinunterrollt. Am Anfang ist er klein. Mit jeder Umdrehung nimmt er mehr Schnee auf und wird größer und je größer er wird, desto schneller wächst er. <strong>Genauso funktioniert dein Geld, wenn du investierst.</strong></Para>
        <SubHead>Wie der Zinseszinseffekt funktioniert</SubHead>
        <Para>Wenn du Geld anlegst, erzielst du eine Rendite also einen Gewinn. Das Entscheidende: Wenn du diesen Gewinn nicht abhebst, sondern weiter investiert lässt, erzielt auch er im nächsten Jahr eine Rendite. Deine Gewinne machen neue Gewinne. Das ist der Zinseszinseffekt.</Para>
        <Para>Ein einfaches Beispiel: Du investierst 100 € bei 5 % Rendite pro Jahr.</Para>
        <Bullets items={[
          "Jahr 1: 100 € → <strong>105 €</strong> (5 € Gewinn)",
          "Jahr 2: 105 € → <strong>110,25 €</strong> (5,25 € Gewinn mehr als im Jahr 1!)",
          "Jahr 3: 110,25 € → <strong>115,76 €</strong> (5,51 € Gewinn)",
        ]} />
        <Para>Jedes Jahr arbeitet mehr Geld für dich nicht nur deine ursprüngliche Einzahlung, sondern auch alle aufgelaufenen Gewinne.</Para>
        <SubHead>Warum der Startzeitpunkt so entscheidend ist</SubHead>
        <Para>Anna fängt mit 25 Jahren an, 200 € pro Monat zu investieren. Lisa fängt erst mit 35 an ebenfalls 200 €/Monat. Beide hören mit 65 auf. <strong>Ergebnis bei 8 % Rendite:</strong></Para>
        <Bullets items={[
          "Anna (40 Jahre): ca. <strong>649.000 €</strong> eingezahlt: 96.000 €",
          "Lisa (30 Jahre): ca. <strong>284.000 €</strong> eingezahlt: 72.000 €",
          "Lisas 10 Jahre Verzögerung kosten über <strong>360.000 €</strong> Endvermögen",
        ]} />
        <Para>Der Unterschied ist nicht Lisas Faulheit es ist schlicht die Zeit, die fehlt, damit der Schneeball rollen kann.</Para>
      </div>
      <div style={cardSt}>
        <p style={{ fontWeight: 700, color: Q.deepBlue, marginBottom: 14, fontSize: 15 }}>🧮 Dein persönlicher Zinseszins-Rechner</p>
        <Sld label="Monatlich investieren" min={25} max={1000} step={25} value={m} onChange={setM} unit=" €" />
        <Sld label="Wie lange?" min={5} max={40} value={y} onChange={setY} unit=" Jahre" />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 18 }}>
          <StatBox label="💤 Sparkonto" value={`${Math.round(sav).toLocaleString("de-DE")} €`} bg={Q.warningBg} color="#92400e" />
          <StatBox label="📈 Investiert (7 %)" value={`${Math.round(fv).toLocaleString("de-DE")} €`} bg={Q.successBg} color="#065f46" />
        </div>
        <div style={{ textAlign: "center", marginTop: 12, fontSize: 13, color: Q.neutralDark }}>
          Eingezahlt: <strong>{invested.toLocaleString("de-DE")} €</strong> · Gewinn: <strong style={{ color: Q.success }}>+{Math.round(fv - invested).toLocaleString("de-DE")} €</strong>
        </div>
      </div>
      <Merke text="Je früher du anfängst, desto stärker arbeitet der Schneeball-Effekt für dich. Schon kleine Beträge werden über die Zeit zu beachtlichen Summen." />
      <DoneBtn onClick={onDone} />
    </div>
  );
}

function RiskMod({ onDone }) {
  const [sel, setSel] = useState(null);
  const [qDone, setQDone] = useState(false);
  const risks = [
    { level: "Gering", range: "−2,9 % bis +5,0 %", emoji: "🚶", desc: "Langsam und sicher. Wenig Schwankungen, aber auch weniger Wachstum.", c: Q.lightBlue },
    { level: "Durchschnittlich", range: "−3,8 % bis +6,6 %", emoji: "🚴", desc: "Ein guter Mittelweg zwischen Sicherheit und Wachstum.", c: Q.purple },
    { level: "Überdurchschnittlich", range: "−7,0 % bis +12,2 %", emoji: "🏎️", desc: "Sportlich. Mehr Achterbahn, aber auch deutlich mehr Wachstum.", c: Q.warning },
    { level: "Sehr hoch", range: "−10,2 % bis +17,8 %", emoji: "🚀", desc: "Vollgas. Maximale Schwankungen, maximale Chancen.", c: Q.danger },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
      <div style={bgSt}>
        <Para>Markus investiert zum ersten Mal und schaut nach drei Monaten auf sein Depot: Statt 1.000 Euro zeigt es nur noch 870 Euro. Er ist erschrocken und will sofort verkaufen. Was er nicht weiß: Genau das wäre der teuerste Fehler, den er machen könnte.</Para>
        <SubHead>Was Risiko beim Investieren wirklich bedeutet</SubHead>
        <Para>„Risiko" klingt nach Verlust. Beim Investieren bedeutet es zunächst etwas anderes: <strong>Schwankungen</strong>. Der Wert deines Portfolios geht mal nach oben, mal nach unten das ist vollkommen normal und hat nichts mit Zockerei zu tun. Fachleute nennen das <strong>Volatilität</strong>.</Para>
        <Para>Ein Kursrückgang von 15 % ist kein realer Verlust solange du nicht verkaufst. Erst wenn du verkaufst, wird aus dem „Buchverlust" ein echter Verlust. Wer bei jedem Rückgang verkauft, macht aus einem vorübergehenden Minus ein dauerhaftes.</Para>
        <SubHead>Das Grundgesetz der Geldanlage</SubHead>
        <Para>Mehr Rendite ist immer mit mehr Schwankungen verbunden das ist kein Zufall, sondern ein Grundprinzip:</Para>
        <Bullets items={[
          "<strong>Wenig Schwankung, wenig Rendite:</strong> Tagesgeld, Festgeld ca. 13 % pro Jahr. Kaum Risiko, aber oft nicht genug, um die Inflation auszugleichen.",
          "<strong>Mehr Schwankung, mehr Rendite:</strong> Breit gestreute Aktien historisch ca. 78 % pro Jahr. Kurz­fristig kann der Wert sinken, langfristig zeigt er nach oben.",
        ]} />
        <SubHead>Warum langfristige Anleger mehr Risiko eingehen können</SubHead>
        <Para>Wer 10, 15 oder 20 Jahre investiert, hat Zeit, schlechte Phasen auszusitzen. Historisch hat ein breit gestreutes Aktienportfolio <strong>über jeden beliebigen 15-Jahres-Zeitraum</strong> eine positive Rendite erzielt selbst wenn man zum denkbar schlechtesten Zeitpunkt eingestiegen wäre. Zeit verwandelt Schwankungen in Wachstum.</Para>
      </div>
      <div style={cardSt}>
        <p style={{ fontWeight: 700, color: Q.deepBlue, marginBottom: 14, fontSize: 15 }}>🎢 Die quirion Risiko-Stufen erklärt</p>
        {risks.map((r, i) => (
          <button key={i} onClick={() => setSel(i)} style={{
            display: "flex", alignItems: "center", gap: 14, width: "100%", textAlign: "left",
            padding: "14px 16px", marginBottom: 8, borderRadius: Q.radiusXs, cursor: "pointer",
            border: sel === i ? `2px solid ${r.c}` : `1.5px solid ${Q.deepBlue10}`,
            background: sel === i ? r.c + "0C" : Q.white, transition: "all .15s",
          }}>
            <span style={{ fontSize: 26 }}>{r.emoji}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: Q.deepBlue }}>{r.level}</div>
              <div style={{ fontSize: 13, color: r.c, fontWeight: 700 }}>{r.range} p.a.</div>
              {sel === i && <div style={{ fontSize: 13, color: Q.neutralDark, marginTop: 4, lineHeight: 1.4 }}>{r.desc}</div>}
            </div>
          </button>
        ))}
      </div>
      <Quiz question={"Ein Verlust von 25% bedeutet, dass ich 25% meines Geldes fuer immer verliere."}
        options={[{ text: "Stimmt", correct: false }, { text: "Stimmt nicht", correct: true }]}
        explanation="Stimmt nicht! Ein Rückgang ist nur ein vorübergehender Buchverlust. Erst wenn du verkaufst, wird er real."
        onAnswer={() => setQDone(true)} />
      <Merke text="Mehr Risiko = mehr Möglichkeiten. Wähle die Stufe, bei der du nachts ruhig schlafen kannst aber denke langfristig." />
      <DoneBtn onClick={onDone} />
    </div>
  );
}

function EtfMod({ onDone }) {
  const [stockStep, setStockStep] = useState(0);
  const [hoveredAdv, setHoveredAdv] = useState(null);
  const [qDone, setQDone] = useState(false);

  const YEARS = ["Start", "Jahr 1", "Jahr 2", "Jahr 3", "Jahr 4"];
  const pricesA = [100, 118, 107, 141, 169]; // TechCo AG aufsteigend
  const pricesB = [100, 92,  74,  58,  41];  // RetailMax GmbH abstürzend
  const maxPrice = 180;

  const pctA = stockStep > 0 ? Math.round((pricesA[stockStep] / pricesA[0] - 1) * 100) : 0;
  const pctB = stockStep > 0 ? Math.round((pricesB[stockStep] / pricesB[0] - 1) * 100) : 0;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

      {/* 1 Was ist eine Aktie? */}
      <div style={{ background: "#F6F7F8", borderRadius: "20px", padding: "20px" }}>
        <SubHead>Was ist eine Aktie?</SubHead>
        <Para>Ein Unternehmen braucht Kapital, um zu wachsen. Statt einen Kredit aufzunehmen, kann es seine Firma in viele kleine Teile aufteilen diese Teile heißen <strong>Aktien</strong>. Wer eine Aktie kauft, wird Miteigentümer des Unternehmens. Steigt der Wert des Unternehmens, steigt auch der Wert deiner Aktie.</Para>
        <div style={{ display: "flex", gap: 8, marginTop: 14, alignItems: "center" }}>
          <div style={{ flex: 1, background: "#fff", borderRadius: "14px", padding: "14px", textAlign: "center" }}>
            <div style={{ fontSize: 28 }}>🏢</div>
            <div style={{ fontWeight: 800, fontSize: 13, color: Q.deepBlue, marginTop: 6 }}>Unternehmen</div>
            <div style={{ fontSize: 11, color: Q.neutralDark, marginTop: 2 }}>gibt Aktien aus</div>
          </div>
          <div style={{ fontSize: 20, color: Q.deepBlue30 }}>→</div>
          <div style={{ flex: 1, background: Q.electricBlue + "12", borderRadius: "14px", padding: "14px", textAlign: "center", border: `1.5px solid ${Q.electricBlue}25` }}>
            <div style={{ fontSize: 28 }}>🎫</div>
            <div style={{ fontWeight: 800, fontSize: 13, color: Q.electricBlue, marginTop: 6 }}>1 Aktie</div>
            <div style={{ fontSize: 11, color: Q.neutralDark, marginTop: 2 }}>= 1 kleines Stück</div>
          </div>
          <div style={{ fontSize: 20, color: Q.deepBlue30 }}>→</div>
          <div style={{ flex: 1, background: "#fff", borderRadius: "14px", padding: "14px", textAlign: "center" }}>
            <div style={{ fontSize: 28 }}>🙋</div>
            <div style={{ fontWeight: 800, fontSize: 13, color: Q.deepBlue, marginTop: 6 }}>Du</div>
            <div style={{ fontSize: 11, color: Q.neutralDark, marginTop: 2 }}>bist Miteigentümer</div>
          </div>
        </div>
      </div>

      {/* 2 Zwei Unternehmen, zwei Schicksale */}
      <div style={{ ...cardSt }}>
        <div style={{ fontWeight: 800, fontSize: 15, color: Q.deepBlue, marginBottom: 4 }}>Das Problem: Unternehmen entwickeln sich unterschiedlich</div>
        <p style={{ fontSize: 13, color: Q.neutralDark, lineHeight: 1.5, margin: "0 0 16px" }}>
          Klick dich durch die Jahre und sieh wie zwei Unternehmen auseinanderdriften.
        </p>

        {/* Year tabs */}
        <div style={{ display: "flex", gap: 6, marginBottom: 18 }}>
          {YEARS.map((y, i) => (
            <button key={i} onClick={() => setStockStep(i)} style={{
              flex: 1, padding: "7px 4px", borderRadius: "10px", border: "none", cursor: "pointer",
              background: stockStep === i ? Q.deepBlue : "#F6F7F8",
              color: stockStep === i ? "#fff" : Q.neutralDark,
              fontWeight: 700, fontSize: 11, transition: "all .2s",
            }}>{y}</button>
          ))}
        </div>

        {/* Price chart two bars side by side */}
        <div style={{ display: "flex", gap: 16, marginBottom: 14 }}>
          {[
            { name: "TechCo AG", prices: pricesA, color: Q.electricBlue, emoji: "💻" },
            { name: "RetailMax GmbH", prices: pricesB, color: Q.danger, emoji: "🏪" },
          ].map((co, ci) => {
            const pct = stockStep > 0 ? Math.round((co.prices[stockStep] / co.prices[0] - 1) * 100) : 0;
            return (
              <div key={ci} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ fontSize: 12, fontWeight: 800, color: Q.deepBlue, marginBottom: 8, textAlign: "center" }}>{co.emoji} {co.name}</div>
                <div style={{ display: "flex", gap: 4, alignItems: "flex-end", height: 100, marginBottom: 8 }}>
                  {co.prices.map((p, pi) => (
                    <div key={pi} style={{
                      width: 22, borderRadius: "5px 5px 0 0",
                      height: Math.round((p / maxPrice) * 100),
                      background: pi === stockStep ? co.color : co.color + "40",
                      transition: "height .4s ease",
                    }} />
                  ))}
                </div>
                <div style={{ fontWeight: 900, fontSize: 22, color: co.color }}>{co.prices[stockStep]} €</div>
                {stockStep > 0 && (
                  <div style={{ fontSize: 12, fontWeight: 700, color: pct >= 0 ? Q.success : Q.danger, marginTop: 2 }}>
                    {pct >= 0 ? "+" : ""}{pct} %
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {stockStep === YEARS.length - 1 && (
          <div style={{ background: Q.danger + "10", border: `1px solid ${Q.danger}25`, borderRadius: "12px",
            padding: "12px 14px", fontSize: 13, color: Q.deepBlue, lineHeight: 1.5 }}>
            ⚠️ Wer alles in <strong>RetailMax</strong> investiert hatte, verlor <strong>59 %</strong> seines Geldes. Wer nur <strong>TechCo</strong> hatte, versechzehnfachte fast. Das Problem: <em>Du weißt vorher nicht, welche Aktie welches Schicksal hat.</em>
          </div>
        )}
      </div>

      {/* 3 Warum viele Unternehmen? */}
      <div style={{ background: "#F6F7F8", borderRadius: "20px", padding: "20px" }}>
        <SubHead>Die Lösung: Nicht alles auf eine Karte setzen</SubHead>
        <Para>Was wäre, wenn du <em>beide</em> Unternehmen gehabt hättest und noch 23 weitere? RetailMax fällt, aber TechCo und die anderen gleichen es aus. Je mehr Unternehmen du hältst, desto weniger kann eine schlechte Aktie dein gesamtes Portfolio ruinieren.</Para>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: 12, marginBottom: 12 }}>
          {Array.from({ length: 25 }).map((_, i) => (
            <div key={i} style={{
              width: 28, height: 28, borderRadius: "6px",
              background: i === 3 ? Q.danger : i === 7 ? Q.warning : Q.success + "90",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 11, color: "#fff", fontWeight: 800,
              transition: "background .3s",
            }}>
              {i === 3 ? "↓" : i === 7 ? "~" : "↑"}
            </div>
          ))}
        </div>
        <div style={{ fontSize: 12, color: Q.neutralDark, lineHeight: 1.5 }}>
          25 Unternehmen im Portfolio. Eine Aktie bricht ein aber die anderen 24 gleichen es aus. Dein Gesamtvermögen bleibt stabil.
        </div>
      </div>

      {/* 4 Was ist ein ETF */}
      <div style={{ background: "#F6F7F8", borderRadius: "20px", padding: "20px" }}>
        <SubHead>Das ist genau das, was ein ETF macht</SubHead>
        <Para><strong>ETF</strong> steht für <em>Exchange Traded Fund</em> börsengehandelter Fonds. Ein ETF bündelt Hunderte oder Tausende Aktien in ein einziges Paket. Mit einem einzigen Kauf investierst du automatisch in all diese Unternehmen gleichzeitig.</Para>

        {/* ETF package visual */}
        <div style={{ background: "#fff", borderRadius: "14px", padding: "16px", marginTop: 12 }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
            {["🍎 Apple","💻 Microsoft","🚗 Toyota","🔌 NVIDIA","🧴 Nestlé","📦 Amazon","🏦 HSBC","✈️ Airbus","💊 Roche","+ 1.591 mehr"].map((c, i) => (
              <div key={i} style={{ padding: "4px 10px", background: Q.electricBlue + "12", borderRadius: "20px",
                fontSize: 11, fontWeight: 600, color: Q.electricBlue }}>
                {c}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ flex: 1, height: 2, background: Q.electricBlue + "40", borderRadius: 100 }} />
            <div style={{ fontSize: 11, color: Q.neutralDark, fontWeight: 600, whiteSpace: "nowrap" }}>= 1 ETF-Anteil</div>
            <div style={{ flex: 1, height: 2, background: Q.electricBlue + "40", borderRadius: 100 }} />
          </div>
          <div style={{ textAlign: "center", marginTop: 10, fontWeight: 900, fontSize: 16, color: Q.electricBlue }}>
            1 Kauf. 1.600 Unternehmen. Fertig.
          </div>
        </div>
      </div>

      {/* 5 Vorteile */}
      <div style={{ background: "#F6F7F8", borderRadius: "20px", padding: "20px" }}>
        <SubHead>Warum ETFs so beliebt sind</SubHead>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 8 }}>
          {[
            { icon: "💸", title: "Günstig", desc: "Jährliche Kosten von 0,10,3 % ein Bruchteil aktiv verwalteter Fonds.", color: Q.success },
            { icon: "🌍", title: "Automatisch gestreut", desc: "Ein Kauf deckt Tausende Unternehmen aus aller Welt ab.", color: Q.electricBlue },
            { icon: "🔍", title: "Transparent", desc: "Du weißt jederzeit genau, welche Unternehmen in deinem ETF stecken.", color: Q.purple },
            { icon: "🪙", title: "Ab 1 € investierbar", desc: "Kein Mindestbetrag. Auch kleine Sparbeträge funktionieren.", color: Q.warning },
          ].map((a, i) => (
            <div key={i} onMouseEnter={() => setHoveredAdv(i)} onMouseLeave={() => setHoveredAdv(null)}
              style={{ display: "flex", alignItems: "center", gap: 14, padding: "13px 16px",
                background: hoveredAdv === i ? "#fff" : "transparent",
                borderRadius: "14px", transition: "background .2s", cursor: "default" }}>
              <div style={{ width: 42, height: 42, borderRadius: "12px", background: a.color + "15",
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>
                {a.icon}
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: 14, color: Q.deepBlue }}>{a.title}</div>
                <div style={{ fontSize: 12, color: Q.neutralDark, lineHeight: 1.5, marginTop: 2 }}>{a.desc}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 14, padding: "12px 14px", background: Q.electricBlue + "0D", borderRadius: "12px",
          fontSize: 13, color: Q.deepBlue, lineHeight: 1.5 }}>
          Warren Buffett einer der erfolgreichsten Investoren der Welt empfahl seiner Frau, nach seinem Tod <strong>90 % des Erbes in einen einfachen ETF</strong> zu investieren. Nicht in Einzelaktien. Einen ETF.
        </div>
      </div>

      <Quiz question="In wie viele Firmen investierst du mit einem MSCI World ETF?"
        options={[
          { text: "Etwa 50 Firmen", correct: false },
          { text: "Etwa 500 Firmen", correct: false },
          { text: "Über 1.600 Firmen", correct: true },
        ]}
        explanation="Über 1.600 Unternehmen aus 23 Ländern und 11 Branchen darunter Apple, Microsoft, Nestlé und Toyota. Alles mit einem einzigen Kauf."
        onAnswer={() => setQDone(true)} />

      <Merke text="Ein ETF ist ein Paket aus vielen Firmen. Statt alles auf eine Karte zu setzen, bist du automatisch breit aufgestellt günstig, transparent und ohne Aufwand." />
      <DoneBtn onClick={onDone} />
    </div>
  );
}

function CostsMod({ onDone }) {
  const [amt, setAmt] = useState(10000);
  const qC = amt * 0.0068, bC = amt * 0.02;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
      <div style={bgSt}>
        <Para>Investieren kostet Geld das ist unvermeidbar. Aber wie viel du zahlst, macht über viele Jahre einen enormen Unterschied. Ein Kostenunterschied von 1,3 Prozentpunkten pro Jahr klingt nach wenig. Über 20 Jahre kann er die Hälfte deines Endvermögens ausmachen.</Para>
        <SubHead>Was die TER ist</SubHead>
        <Para>Jeder ETF hat eine jährliche Verwaltungsgebühr, die sogenannte <strong>TER (Total Expense Ratio)</strong>. Sie wird direkt aus dem Fondsvermögen entnommen du siehst sie nie als separate Abbuchung, aber sie wirkt sich auf deine Rendite aus. Günstige ETFs kosten 0,10,2 % pro Jahr.</Para>
        <SubHead>Was quirion kostet</SubHead>
        <Bullets items={[
          "<strong>quirion Digital:</strong> 0,48 % Servicegebühr + ca. 0,20 % ETF-Kosten = <strong>0,68 % p.a.</strong> gesamt",
          "<strong>Klassische Bankberatung:</strong> Oft 1,52,5 % p.a. durch Ausgabeaufschläge, Verwaltungsgebühren, Provisionen",
        ]} />
        <SubHead>Warum Kosten so viel ausmachen</SubHead>
        <Para>Stell dir vor, du investierst 20.000 € über 20 Jahre bei 7 % Bruttorendite:</Para>
        <Bullets items={[
          "Bei 0,68 % Kosten (quirion): ca. <strong>62.000 €</strong> Endvermögen",
          "Bei 2,0 % Kosten (Bankberater:in): ca. <strong>46.000 €</strong> Endvermögen",
          "Unterschied: über <strong>16.000 €</strong> nur wegen der Kosten",
        ]} />
        <Para>Die Kosten fressen nicht nur Gebühren, sondern auch den Zinseszinseffekt auf diesen Gebühren. Deswegen lohnt es sich, günstige Anbieter zu wählen.</Para>
      </div>
      <div style={cardSt}>
        <p style={{ fontWeight: 700, color: Q.deepBlue, marginBottom: 14, fontSize: 15 }}>💰 Kosten-Vergleich</p>
        <Sld label="Dein Anlagebetrag" min={1000} max={100000} step={1000} value={amt} onChange={setAmt} unit=" €" />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 14 }}>
          <StatBox label="quirion Digital" value={`${qC.toFixed(0)} €/J.`} sub="0,68 % p.a." bg={Q.successBg} color="#065f46" />
          <StatBox label="Bankberater:in" value={`${bC.toFixed(0)} €/J.`} sub="ca. 2,0 % p.a." bg={Q.dangerBg} color="#991b1b" />
        </div>
        <div style={{ textAlign: "center", marginTop: 14, fontSize: 14, fontWeight: 800, color: Q.success }}>
          Du sparst mit quirion: {(bC - qC).toFixed(0)} € pro Jahr
        </div>
      </div>
      <Merke text="quirion ist günstiger als die meisten Bankberater:innen und dein Geld wird professionell verwaltet." />
      <DoneBtn onClick={onDone} />
    </div>
  );
}

function SafetyMod({ onDone }) {
  const [qDone, setQDone] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
      <div style={bgSt}>
        <Para>Eine der häufigsten Fragen beim Investieren: „Aber was ist, wenn die Bank oder quirion pleitegeht? Ist mein Geld dann weg?" Die Antwort ist klar: <strong>Nein.</strong> Dein Geld ist durch mehrere unabhängige Mechanismen geschützt und diese Schutzmechanismen sind gesetzlich vorgeschrieben.</Para>
        {[
          {
            icon: "🔐", t: "Sondervermögen",
            d: "Das ist der wichtigste Schutz beim Investieren. Deine ETFs gehören rechtlich dir nicht quirion, nicht der Bank. Sie werden getrennt vom Betriebsvermögen von quirion verwahrt. Selbst wenn quirion morgen insolvent wäre, würden deine ETFs einfach auf ein anderes Depot übertragen. Niemand kann darauf zugreifen."
          },
          {
            icon: "🛡️", t: "Einlagensicherung",
            d: "Bargeld auf deinem Verrechnungskonto (z. B. nicht investierte Beträge) ist bis zu 100.000 Euro pro Person und Bank gesetzlich abgesichert. Das ist EU-weit Standard und gilt unabhängig davon, ob eine Bank Mitglied eines freiwilligen Sicherungsfonds ist."
          },
          {
            icon: "🏛️", t: "BaFin-Aufsicht",
            d: "quirion ist von der BaFin (Bundesanstalt für Finanzdienstleistungsaufsicht) reguliert und lizenziert. Die BaFin überwacht kontinuierlich, ob quirion die gesetzlichen Anforderungen erfüllt von Eigenkapitalvorschriften bis hin zu Kundenschutzmechanismen."
          },
        ].map((item, i) => (
          <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 18 }}>
            <span style={{ fontSize: 22, flexShrink: 0 }}>{item.icon}</span>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14, color: Q.deepBlue, marginBottom: 4 }}>{item.t}</div>
              <div style={{ fontSize: 14, color: Q.neutralDark, lineHeight: 1.6 }}>{item.d}</div>
            </div>
          </div>
        ))}
      </div>
      <Quiz question="Was passiert mit meinen ETFs, wenn quirion pleite geht?"
        options={[
          { text: "Sie sind weg", correct: false },
          { text: "Ich bekomme sie zurück sie gehören mir", correct: true },
          { text: "Die BaFin übernimmt alles", correct: false },
        ]}
        explanation="Richtig! Deine ETFs sind Sondervermögen wie ein Tresor, der dir gehört."
        onAnswer={() => setQDone(true)} />
      <Merke text="Dein Geld und deine ETFs sind mehrfach geschützt. quirion ist BaFin-reguliert." />
      <DoneBtn onClick={onDone} />
    </div>
  );
}

function FutureMod({ onDone }) {
  const [dream, setDream] = useState("reise");
  const [mo, setMo] = useState(150);
  const dreams = { reise: { l: "🌍 Weltreise", c: 15000 }, sabbat: { l: "🏖️ Sabbatical", c: 30000 }, wohnung: { l: "🏠 Eigenkapital", c: 50000 } };
  const r = 0.07 / 12, target = dreams[dream].c;
  const months = Math.log(target * r / mo + 1) / Math.log(1 + r);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
      <div style={bgSt}>
        <Para>Finanzielle Ziele fühlen sich oft abstrakt an „irgendwann mal aussorgen" oder „im Alter gut leben" sind keine konkreten Ziele. Forschungen zeigen: Menschen, die sich ein konkretes Ziel mit einer konkreten Summe und einem Datum setzen, sparen deutlich konsequenter als solche mit vagen Absichten.</Para>
        <SubHead>Dein Zukunfts-Ich braucht konkrete Zahlen</SubHead>
        <Para>Der Rechner unten hilft dir, aus einem Wunsch eine echte Planung zu machen. Du siehst sofort: Mit welchem monatlichen Betrag erreichst du welches Ziel in welcher Zeit? Das macht den Zinseszinseffekt greifbar und motiviert mehr als jede abstrakte Renditeberechnung.</Para>
        <SubHead>Kleine Anpassungen, große Wirkung</SubHead>
        <Para>Stell dir vor, du erhöhst deinen Monatsbeitrag um 25 Euro vielleicht durch ein gekündigtes Abo. Bei 7 % Rendite über 20 Jahre sind das zusätzlich fast <strong>13.000 Euro</strong> Endvermögen. Dein Zukunfts-Ich wird es dir danken.</Para>
      </div>
      <div style={cardSt}>
        <p style={{ fontWeight: 700, color: Q.deepBlue, marginBottom: 14, fontSize: 15 }}>🎯 Wähle deinen Traum</p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 18 }}>
          {Object.entries(dreams).map(([k, v]) => <button key={k} onClick={() => setDream(k)} style={pill(dream === k, Q.electricBlue)}>{v.l}</button>)}
        </div>
        <Sld label="Monatlicher Sparbetrag" min={25} max={500} step={25} value={mo} onChange={setMo} unit=" €" />
        <div style={{ marginTop: 20, padding: 24, borderRadius: Q.radiusSm, textAlign: "center",
          background: `linear-gradient(135deg, ${Q.electricBlue}06, ${Q.purple}08)`, border: `1.5px solid ${Q.electricBlue}15` }}>
          <div style={{ fontSize: 13, color: Q.neutralDark }}>Mit {mo} €/Monat erreichst du</div>
          <div style={{ fontSize: 30, fontWeight: 900, color: Q.electricBlue, margin: "4px 0" }}>{target.toLocaleString("de-DE")} €</div>
          <div style={{ fontSize: 16, color: Q.deepBlue }}>in ca. <strong>{(months / 12).toFixed(1)} Jahren</strong></div>
        </div>
      </div>
      <Merke text="Dein Zukunfts-Ich hängt von den Entscheidungen ab, die du heute triffst. Schon kleine Anpassungen machen einen riesigen Unterschied." />
      <DoneBtn onClick={onDone} />
    </div>
  );
}

// ─── TEXT-BASED MODULES ───
const TEXT = {
  personality: {
    t: `Viele Menschen haben ein falsches Bild vom Investieren. Sie denken an nervöse Börsenhändler, die auf blinkende Bildschirme starren, an Tagesspekulationen und daran, ständig Aktienkurse zu beobachten. <strong>Dieses Bild hat mit dem Investieren, das wir hier meinen, nichts zu tun.</strong><br/><br/><strong>Was Investieren wirklich bedeutet</strong><br/>Investieren bedeutet: dein Geld für dich arbeiten lassen. Du kaufst Anteile an echten Unternehmen weltweit und profitierst von deren Wachstum, ohne täglich eingreifen zu müssen. Stell dir einen Obstbaum vor: Du pflanzt ihn einmal, pflegst ihn etwas und erntest jahrelang Früchte, ohne jedes Jahr neu zu pflanzen. Ein gut aufgesetztes Investment funktioniert genauso.<br/><br/><strong>Warum investieren so wenige Deutsche?</strong><br/>In Deutschland investieren nur 17 % der Menschen in Aktien oder ähnliche Anlagen. In den USA sind es über 60 %. Der Unterschied liegt nicht am Geld Deutsche sparen sogar überdurchschnittlich viel. Der Unterschied liegt an Wissen und Einstellung.<br/><br/>Drei häufige Missverständnisse:<br/>• <strong>„Ich brauche viel Kapital"</strong> Bei quirion startest du ab 25 Euro monatlich.<br/>• <strong>„Das ist zu riskant"</strong> Wer langfristig breit gestreut investiert, hat historisch immer eine positive Rendite erzielt.<br/>• <strong>„Ich verstehe das nicht"</strong> Genau dafür ist dieser Kurs da.<br/><br/><strong>Wie quirion das Investieren vereinfacht</strong><br/>Als Robo-Advisor übernimmt quirion die gesamte Verwaltung für dich: Anlageauswahl, regelmäßige Anpassungen, Rebalancing. Du richtest einmal einen Sparplan ein der Rest läuft automatisch. Erfolgreiches Investieren ist bewusst langweilig gestaltet.`,
    m: "Investieren ist kein Vollzeitjob. Es ist ein System, das im Hintergrund für dich arbeitet sobald du es eingerichtet hast.",
  },
  timing: {
    t: `Tom plant seit Monaten, mit dem Investieren anzufangen. Jeden Monat findet er einen neuen Grund zu warten: „Die Kurse sind gerade zu hoch." Dann: „Es kommt bestimmt bald ein Crash." Dann: „Ich warte noch auf mehr Sicherheit." Währenddessen investiert seine Kollegin Sarah jeden Monat automatisch ihre 150 Euro ohne viel nachzudenken.<br/><br/>Nach zwei Jahren schaut Tom auf Sarahs Depot und denkt: „Hätte ich doch einfach angefangen."<br/><br/><strong>Den perfekten Einstiegszeitpunkt gibt es nicht</strong><br/>Studien zeigen: Selbst wer konsequent zum schlechtesten Zeitpunkt des Jahres also immer am Jahreshöchststand investiert hätte, wäre langfristig im Plus gelandet. Der Grund: Zeit gleicht ungünstige Einstiegszeitpunkte aus. Wirtschaftswachstum ist kein kurzfristiger Trend, sondern ein langfristiges Muster.<br/><br/>Unter Investor:innen gibt es dazu einen bekannten Grundsatz: <strong>„Time in the Market beats Timing the Market."</strong> Wie lange du investiert bist, ist wichtiger als wann du einsteigst.<br/><br/><strong>Das Dollar-Cost-Averaging-Prinzip</strong><br/>Wer regelmäßig einen festen Betrag investiert z. B. 100 Euro jeden Monat kauft automatisch manchmal bei höheren, manchmal bei niedrigeren Kursen. Im Durchschnitt ergibt sich so ein fairer Preis, ohne dass du den Markt beobachten musst. Das nennt man <strong>Durchschnittskosteneffekt</strong>.<br/><br/>Jeder Monat des Wartens ist ein Monat, in dem der Zinseszinseffekt <em>nicht</em> für dich arbeitet.`,
    m: "Den perfekten Zeitpunkt gibt es nicht. Wer wartet, verliert den wertvollsten Rohstoff beim Investieren: Zeit.",
    q: { question: "Was ist laut Forschung wichtiger beim Investieren?", options: [{ text: "Den richtigen Zeitpunkt abwarten", correct: false }, { text: "Möglichst lang investiert sein", correct: true }, { text: "Immer wenn Kurse fallen kaufen", correct: false }], explanation: "Richtig: 'Time in the Market' schlägt 'Timing the Market'. Wie lange du investiert bist, zählt mehr als wann du einsteigst." },
  },
  horizon: {
    t: `Wenn quirion beim Onboarding nach deinem Anlageziel und deinem Zeithorizont fragt, geht es nicht darum, dich zu irgendetwas zu verpflichten. Diese Angaben helfen dem System, das für deine Situation passende Portfolio zusammenzustellen.<br/><br/><strong>Was der Zeithorizont bedeutet</strong><br/>Der Zeithorizont ist einfach die Zeit, in der du dein investiertes Geld voraussichtlich nicht brauchst. Das beeinflusst, wie viel Schwankung dein Portfolio vertragen kann und damit, wie viel Wachstumspotenzial sinnvoll ist:<br/><br/>• <strong>Kurz (unter 3 Jahre):</strong> Du brauchst das Geld bald, z. B. für eine Anzahlung. Starke Kursschwankungen würden dich treffen. Portfolio: sehr konservativ, kaum Aktien.<br/>• <strong>Mittel (310 Jahre):</strong> Es gibt Zeit, kurze Schwankungsphasen auszusitzen. Portfolio: ausgewogen aus Aktien und Anleihen.<br/>• <strong>Lang (über 10 Jahre):</strong> Historisch hat ein breit gestreutes Aktienportfolio über jeden beliebigen 15-Jahres-Zeitraum eine positive Rendite erzielt. Mehr Zeit bedeutet mehr Wachstumspotenzial. Portfolio: wachstumsorientiert.<br/><br/><strong>Wichtig: Kein Lock-in</strong><br/>Die Angabe des Zeithorizonts bei quirion ist kein Vertrag und keine gesetzliche Bindung. Du kannst jederzeit Geld entnehmen oder deinen Plan anpassen. Die Angabe dient einzig dazu, das passende Portfolio zu berechnen.`,
    m: "Der Zeithorizont ist kein Vertrag er hilft quirion nur, das richtige Portfolio für dich zu wählen. Du bleibst jederzeit flexibel.",
    q: { question: `Eine Anlagedauer von 15 Jahren bedeutet, dass ich 15 Jahre lang nicht an mein Geld komme.`, options: [{ text: "Stimmt", correct: false }, { text: "Stimmt nicht", correct: true }], explanation: "Stimmt nicht. Du kannst jederzeit verkaufen und auf dein Geld zugreifen. Die Anlagedauer ist nur eine Planungsgrundlage kein Vertrag." } },
  esg: {
    t: `Im Onboarding fragt quirion, ob Nachhaltigkeit bei deiner Geldanlage eine Rolle spielen soll. Das klingt erst einmal abstrakt. Was genau steckt dahinter?<br/><br/><strong>Was „nachhaltig investieren" bedeutet</strong><br/>Beim nachhaltigen Investieren werden neben der Rendite auch weitere Kriterien bei der Auswahl von Unternehmen berücksichtigt. Die drei Hauptbereiche fasst man unter dem Kürzel <strong>ESG</strong> zusammen:<br/><br/>• <strong>E Environmental (Umwelt):</strong> Wie geht das Unternehmen mit Ressourcen und CO₂-Emissionen um?<br/>• <strong>S Social (Soziales):</strong> Wie behandelt es Mitarbeiter:innen, Zulieferer und die Gesellschaft?<br/>• <strong>G Governance (Unternehmensführung):</strong> Wird das Unternehmen transparent und verantwortungsvoll geführt?<br/><br/><strong>Die drei Optionen bei quirion</strong><br/>• <strong>„Nachhaltigkeit ist mir nicht wichtig":</strong> Dein Portfolio wird rein nach finanziellen Kriterien zusammengestellt.<br/>• <strong>„quirion soll entscheiden":</strong> quirion wählt ein Portfolio, das ESG-Kriterien berücksichtigt ohne dass du die Details kennen musst.<br/>• <strong>„Ich möchte es selbst bestimmen":</strong> Du kannst gezielter angeben, welche Ausschlusskriterien oder Schwerpunkte dir wichtig sind.<br/><br/><strong>Kein Richtig oder Falsch</strong><br/>Nachhaltige Portfolios haben in den letzten Jahren oft ähnlich oder besser abgeschnitten als konventionelle. Aber niemand kann garantieren, wie es in Zukunft aussieht. Wähle das, was zu deinen persönlichen Werten passt.`,
    m: "Es gibt kein Richtig oder Falsch. Entscheide so, wie es zu deinen Werten passt alle Optionen sind finanziell sinnvoll.",
  },
  budget: {
    t: `Bevor quirion dir eine Empfehlung gibt, wie viel du investieren solltest, fragt das System nach deiner finanziellen Ausgangssituation: Einkommen, Ausgaben, vorhandenes Vermögen. Das hat einen wichtigen Schutzgedanken dahinter.<br/><br/><strong>Investiere niemals Geld, das du kurzfristig brauchst</strong><br/>Stell dir vor: Du investierst 5.000 Euro. Nach einem Jahr sind es wegen eines Kursrückgangs nur noch 4.200 Euro. Gleichzeitig bricht deine Waschmaschine zusammen und kostet 800 Euro. Du musst verkaufen. Ergebnis: ein echter Verlust, der nur durch den Zeitdruck entstanden ist. Hätte das Geld auf dem Tagesgeldkonto gelegen, wäre nichts passiert.<br/><br/><strong>Schritt 1: Der Notgroschen</strong><br/>Bevor du anfängst zu investieren, solltest du eine eiserne Reserve haben: mindestens <strong>3 Monatsgehälter (netto)</strong> auf einem separaten Tagesgeldkonto. Dieses Geld rührst du nicht an außer für echte Notfälle. Erst wenn der Notgroschen steht, macht langfristiges Investieren Sinn.<br/><br/><strong>Schritt 2: Die 50-30-20-Regel</strong><br/>Eine bewährte Faustregel für die Aufteilung deines Einkommens:<br/>• <strong>50 %</strong> für fixe Ausgaben (Miete, Versicherungen, Abos)<br/>• <strong>30 %</strong> für flexible Ausgaben (Lebensmittel, Freizeit, Kleidung)<br/>• <strong>20 %</strong> zum Sparen und Investieren<br/><br/><strong>Schritt 3: Realismus schlägt Ehrgeiz</strong><br/>Es ist besser, 25 Euro monatlich konsequent über viele Jahre zu investieren, als 300 Euro für drei Monate und dann aufzugeben. Beim Zinseszinseffekt zählen vor allem Regelmäßigkeit und Zeit. Bei quirion beginnt es bereits ab 25 Euro monatlich.`,
    m: "Investiere nur Geld, das du wirklich nicht kurzfristig brauchst. Erst Notgroschen aufbauen, dann investieren in dieser Reihenfolge.",
  },
  knowledge: {
    t: `Gegen Ende des quirion-Onboardings wirst du nach deinen Kenntnissen und Erfahrungen mit Geldanlagen gefragt und musst zum Abschluss bestätigen, dass du die damit verbundenen Risiken verstanden hast. Das verwirrt manche. Warum fragt eine App nach meinem Finanzwissen?<br/><br/><strong>Hintergrund: die europäische Finanzmarktrichtlinie MiFID II</strong><br/>Die europäische Finanzmarktrichtlinie MiFID II schreibt vor, dass Finanzdienstleister prüfen müssen, ob ihre Produkte für die jeweilige Person geeignet sind. Das ist kein bürokratisches Hindernis es ist ein Verbraucherschutzgesetz, das verhindern soll, dass Menschen in Produkte investieren, die sie nicht verstehen oder die nicht zu ihrer Situation passen.<br/><br/><strong>Sei einfach ehrlich</strong><br/>Es gibt keine „falschen" Antworten, die dazu führen, dass du nicht investieren kannst. Wer wenig Erfahrung angibt, bekommt konservativere Empfehlungen und mehr Erklärungen. Niemand wird benachteiligt, weil er am Anfang steht im Gegenteil: Das System passt sich deiner Situation an.<br/><br/><strong>Was die abschließende Bestätigung bedeutet</strong><br/>Am Ende bestätigst du rechtlich verbindlich, dass du die Risiken einer Geldanlage kennst und verstehst. Das ist für alle Anbieter in Deutschland gesetzlich vorgeschrieben. Es bedeutet nicht, dass keine Risiken existieren es bedeutet, dass du informiert und bewusst entscheidest. Genau das hast du durch diesen Kurs getan.`,
    m: "Die Wissensabfrage dient deinem Schutz, nicht deiner Beurteilung. Nach diesem Kurs bist du gut vorbereitet, um die Bestätigung mit Überzeugung zu unterzeichnen.",
  },
  glidepath: {
    t: `Wenn du das quirion-Portfolio nach dem Onboarding siehst, begegnest du möglicherweise dem Begriff <strong>Gleitpfad</strong>. Klingt technisch ist aber ein sehr elegantes und nützliches Konzept.<br/><br/><strong>Was ein Gleitpfad ist</strong><br/>Ein Gleitpfad beschreibt, wie sich die Zusammensetzung deines Portfolios im Laufe der Zeit automatisch verändert. Mit zunehmender Annäherung an dein Anlageziel verschiebt quirion das Gewicht: weg von Aktien (höheres Wachstumspotenzial, stärkere Schwankungen) hin zu Anleihen (stabilere Wertentwicklung, weniger Schwankungen).<br/><br/><strong>Das Autobahn-Prinzip</strong><br/>Stell dir eine lange Autofahrt vor. Am Anfang kannst du schnell fahren du hast viel Zeit und kannst einen Umweg kompensieren. Kurz vor dem Ziel verlangsamst du, weil du die Ausfahrt nicht verpassen willst. Beim Investieren funktioniert es genauso:<br/><br/>• <strong>Frühphase (viele Jahre bis zum Ziel):</strong> Hoher Aktienanteil, z. B. 90 %. Viel Wachstumspotenzial, Zeit zum Aussitzen von Schwankungen.<br/>• <strong>Mittelphase:</strong> Aktienanteil sinkt schrittweise, Anleihenanteil steigt. Das Portfolio wird stabiler.<br/>• <strong>Zielphase (kurz vor dem Zieldatum):</strong> Deutlich höherer Anleihenanteil. Das aufgebaute Vermögen wird geschützt.<br/><br/><strong>quirion steuert das vollautomatisch</strong><br/>Du musst nicht selbst eingreifen, umschichten oder beobachten. Das System passt dein Portfolio entsprechend deiner ursprünglichen Angaben automatisch an Jahr für Jahr, unsichtbar im Hintergrund.`,
    m: "Der Gleitpfad ist dein Autopilot. Je näher das Ziel, desto vorsichtiger wird das Portfolio automatisch.",
  },
  etfmix: {
    t: `Wenn du das quirion-Portfolio siehst, findest du nicht einen einzigen ETF, sondern eine Auswahl verschiedener ETFs. Das hat einen guten Grund: Kein einzelner ETF deckt den gesamten Markt optimal ab.<br/><br/><strong>Was einen guten ETF-Mix ausmacht</strong><br/>quirion kombiniert verschiedene ETF-Kategorien, um eine möglichst breite und ausgewogene Streuung zu erreichen:<br/><br/>• <strong>Welt-ETFs (z. B. MSCI World):</strong> Die größten Unternehmen aus 23 Industrieländern Apple, Microsoft, Nestlé, Toyota. Das stabile Fundament jedes Portfolios. Enthält jedoch keine Schwellenländer.<br/>• <strong>Emerging Markets ETFs (z. B. MSCI Emerging Markets):</strong> Unternehmen aus aufstrebenden Volkswirtschaften wie China, Indien, Brasilien. Höheres Wachstumspotenzial, aber auch mehr Schwankungen. Ergänzt den MSCI World sinnvoll.<br/>• <strong>Small Cap ETFs:</strong> Kleinere Unternehmen, die im MSCI World nicht enthalten sind. Historisch haben sie langfristig eine leicht höhere Rendite erzielt als Großkonzerne mit etwas mehr Risiko.<br/>• <strong>Anleihen-ETFs:</strong> Der stabilisierende Teil des Portfolios. Je näher das Anlageziel, desto wichtiger werden sie (→ Gleitpfad).<br/><br/><strong>Warum quirion günstige ETFs wählt</strong><br/>Jeder ETF hat jährliche Kosten (TER). quirion wählt gezielt kostengünstige ETFs, weil jeder Euro, der nicht in Gebühren fließt, weiter investiert bleibt und durch den Zinseszinseffekt wächst. Über 20 Jahre macht das einen erheblichen Unterschied.`,
    m: "quirion kombiniert verschiedene ETF-Kategorien zu einem breiten, ausgewogenen Portfolio kostengünstig und automatisch verwaltet.",
  },
  kyc: {
    t: `Bevor du bei quirion wirklich investierst, musst du dich einmalig ausweisen. Dieser Schritt nennt sich <strong>KYC „Know Your Customer"</strong> (deutsch: Kenne deinen Kunden). Er klingt bürokratisch, hat aber einen konkreten Schutzgedanken.<br/><br/><strong>Warum das gesetzlich vorgeschrieben ist</strong><br/>Finanzinstitute in Deutschland und der gesamten EU sind gesetzlich verpflichtet, die Identität ihrer Kund:innen zu prüfen. Hintergrund: die EU-Geldwäscherichtlinie, die verhindern soll, dass Finanzdienstleister für illegale Aktivitäten wie Geldwäsche oder Terrorismusfinanzierung genutzt werden. Diese Regel gilt für jede Bank, jeden Broker, jeden Robo-Advisor ohne Ausnahme.<br/><br/><strong>Was genau passiert</strong><br/>Die Identitätsprüfung läuft vollständig digital ab du musst nirgendwo hinfahren:<br/>• <strong>Option 1 VideoIdent:</strong> Ein kurzer Videoanruf mit einem Mitarbeiter (ca. 35 Minuten). Du zeigst deinen Personalausweis oder Reisepass in die Kamera.<br/>• <strong>Option 2 AutoIdent per App:</strong> Du fotografierst deinen Ausweis mit dem Smartphone. Automatische Prüfung ohne menschliches Gegenüber.<br/><br/>Einmal erfolgreich abgeschlossen, ist diese Prüfung dauerhaft gültig. Du wirst sie nie wiederholen müssen.<br/><br/><strong>Datenschutz</strong><br/>quirion speichert deine Daten gemäß den Vorgaben der DSGVO (Datenschutz-Grundverordnung) und gibt sie nicht ohne rechtliche Grundlage weiter.`,
    m: "Die Identitätsprüfung ist einmalig, dauert 5 Minuten und schützt das gesamte Finanzsystem. Ausweis bereithalten fertig.",
  },
  benchmark: {
    t: `Es kann helfen zu wissen, wie andere Menschen mit dem Investieren umgehen nicht um sich zu vergleichen, sondern um zu verstehen, was realistische Beträge sind und welchen Unterschied kleine Erhöhungen machen.<br/><br/><strong>Was kleine Erhöhungen langfristig bewirken</strong><br/>Stell dir vor, du investierst 100 Euro monatlich über 25 Jahre bei 7 % durchschnittlicher Rendite. Das ergibt ein Endvermögen von ca. <strong>81.000 Euro</strong>. Wenn du nach 6 Monaten auf 125 Euro erhöhst also 25 Euro mehr wächst das Endvermögen auf ca. <strong>101.000 Euro</strong>. Mehr als 20.000 Euro Unterschied durch 25 Euro mehr im Monat.<br/><br/>Das ist der Zinseszinseffekt in der Praxis: Jeder zusätzliche Euro, der früher und länger investiert ist, wächst überproportional.<br/><br/><strong>Automatisierung schlägt Disziplin</strong><br/>Die erfolgreichsten Anleger:innen denken nicht täglich ans Investieren. Sie richten einmal einen automatischen Sparplan ein und der läuft, ohne dass man sich darum kümmern muss. Keine Entscheidungen, kein Vergessen, kein Stress. Wenn das Gehalt steigt, erhöht man den Sparplan einmal anpassen, fertig.<br/><br/>Wer nach 6 Monaten seinen Sparbetrag auch nur einmal leicht erhöht, hat am Ende statistisch deutlich mehr als jemand, der den Betrag nie angepasst hat.`,
    m: "Nicht der einzelne Betrag entscheidet sondern Regelmäßigkeit, Zeit und kleine Steigerungen im Laufe der Jahre.",
  },
  savings: {
    t: `Manchmal steckt das Potenzial zum Investieren bereits im eigenen Alltag nur ist es nicht auf den ersten Blick sichtbar. Kleine, wiederkehrende Ausgaben summieren sich still und leise zu erheblichen Beträgen.<br/><br/><strong>Wo Geld oft unbemerkt verschwindet</strong><br/>• <strong>Ungenutzte Abonnements:</strong> Viele Menschen zahlen für 35 Dienste, die sie kaum nutzen Streaming, Apps, Fitnessstudio. Oft 3080 Euro pro Monat.<br/>• <strong>Coffee-to-go:</strong> 3,50 Euro täglich × 220 Arbeitstage = rund 770 Euro pro Jahr.<br/>• <strong>Online-Impulskäufe:</strong> Shopping-Algorithmen sind darauf ausgelegt, dich in schwachen Momenten zum Kauf zu verleiten.<br/>• <strong>Doppelte Versicherungen:</strong> Viele haben Versicherungen, die sich überschneiden oder die sie nie brauchen werden.<br/><br/><strong>Drei praktische Strategien</strong><br/>1. <strong>Stundenlohn-Regel:</strong> Rechne Preise in Arbeitsstunden um. Eine Jacke für 150 Euro bei 15 Euro Nettostundenlohn = 10 Stunden Arbeit. Ist es das wert?<br/>2. <strong>7-Tage-Regel:</strong> Lasse alles, was mehr als 50 Euro kostet, eine Woche im Warenkorb liegen. Echte Bedürfnisse verschwinden nicht Impulse schon.<br/>3. <strong>Abonnement-Audit:</strong> Gehe deine Kontoauszüge der letzten drei Monate durch. Kündige jeden Dienst, den du in den letzten 30 Tagen nicht genutzt hast.<br/><br/><strong>Was das mit Investieren zu tun hat</strong><br/>15 Euro monatlich mehr z. B. durch ein gekündigtes Abo ergeben über 20 Jahre bei 7 % Rendite mehr als <strong>8.000 Euro</strong> zusätzliches Endvermögen. Geld, das du nicht unnötig ausgibst, kann dauerhaft für dich arbeiten.`,
    m: "Oft verstecken sich 50100 Euro im Monat, die statt für ungenutzte Abos für deine Zukunft arbeiten könnten.",
  },
};

function TextMod({ type, onDone }) {
  const d = TEXT[type];
  const [qDone, setQDone] = useState(!d?.q);
  if (!d) return <div style={bgSt}><p>Modul wird erstellt...</p><DoneBtn onClick={onDone} /></div>;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
      <div style={bgSt}><p style={{ fontSize: 15, lineHeight: 1.6, color: Q.deepBlue, margin: 0 }} dangerouslySetInnerHTML={{ __html: d.t }} /></div>
      {d.q && <Quiz {...d.q} onAnswer={() => setQDone(true)} />}
      <Merke text={d.m} />
      <DoneBtn onClick={onDone} />
    </div>
  );
}

// ─── ETF MIX MODULE ───
const ETF_TYPES = [
  {
    id: "world", name: "Welt-ETF", subtitle: "MSCI World Index", icon: "🌍", color: "#3e2eff",
    ter: "0,12 %", count: "1.600+", perf: "+18,4 %", perfUp: true, portfolioPct: 55,
    desc: "Die größten Unternehmen aus 23 Industrieländern. Das stabile Fundament jedes Portfolios kein Depot ohne ihn.",
    insight: "Der MSCI World enthält zwar \"World\" im Namen aber Schwellenländer wie China, Indien oder Brasilien fehlen komplett. Diese 23 Länder sind ausschließlich entwickelte Industrienationen.",
    holdings: [
      { name: "Apple Inc.", ticker: "AAPL", pct: 4.8, flag: "🇺🇸" },
      { name: "Microsoft Corp.", ticker: "MSFT", pct: 4.2, flag: "🇺🇸" },
      { name: "NVIDIA Corp.", ticker: "NVDA", pct: 3.9, flag: "🇺🇸" },
      { name: "Amazon.com Inc.", ticker: "AMZN", pct: 2.6, flag: "🇺🇸" },
      { name: "Alphabet Inc.", ticker: "GOOGL", pct: 2.1, flag: "🇺🇸" },
    ],
    regions: [
      { name: "USA", pct: 70, color: "#3e2eff" },
      { name: "Europa", pct: 16, color: "#825aff" },
      { name: "Japan", pct: 6, color: "#a78bfa" },
      { name: "Sonstige", pct: 8, color: "#c4b5fd" },
    ],
    quiz: {
      question: "Was fehlt im MSCI World, obwohl er \"World\" heißt?",
      options: [
        { text: "Europäische Unternehmen", correct: false },
        { text: "Unternehmen aus Schwellenländern wie China & Indien", correct: true },
        { text: "Amerikanische Tech-Konzerne", correct: false },
      ],
      explanation: "Genau! Der MSCI World umfasst nur 23 entwickelte Industrienationen. China, Indien, Brasilien & Co. sind nicht enthalten dafür gibt es den Emerging Markets ETF.",
    },
    tip: "Der MSCI World ist der Klassiker. Er allein deckt schon einen Großteil der globalen Wirtschaftsleistung ab.",
  },
  {
    id: "em", name: "Emerging Markets", subtitle: "MSCI Emerging Markets", icon: "🌏", color: "#f59e0b",
    ter: "0,18 %", count: "1.400+", perf: "+9,2 %", perfUp: true, portfolioPct: 20,
    desc: "Unternehmen aus China, Indien, Brasilien & Co. Mehr Wachstumspotenzial, aber auch stärkere Schwankungen.",
    insight: "Emerging Markets wachsen demografisch und wirtschaftlich schneller als viele Industrienationen. Indien wird bis 2030 voraussichtlich die drittgrößte Volkswirtschaft der Welt das spiegelt sich in diesen ETFs wider.",
    holdings: [
      { name: "Samsung Electronics", ticker: "005930", pct: 3.9, flag: "🇰🇷" },
      { name: "Taiwan Semiconductor", ticker: "TSM", pct: 3.7, flag: "🇹🇼" },
      { name: "Alibaba Group", ticker: "BABA", pct: 2.2, flag: "🇨🇳" },
      { name: "Reliance Industries", ticker: "RELIANCE", pct: 1.8, flag: "🇮🇳" },
      { name: "Tencent Holdings", ticker: "0700", pct: 1.6, flag: "🇨🇳" },
    ],
    regions: [
      { name: "China", pct: 30, color: "#f59e0b" },
      { name: "Indien", pct: 18, color: "#fbbf24" },
      { name: "Taiwan", pct: 15, color: "#fcd34d" },
      { name: "Sonstige", pct: 37, color: "#fde68a" },
    ],
    quiz: {
      question: "Warum haben Emerging Markets ETFs eine höhere Schwankung?",
      options: [
        { text: "Weil sie mehr Aktien enthalten", correct: false },
        { text: "Wegen politischer Risiken und weniger stabiler Währungen", correct: true },
        { text: "Weil sie teurer sind als andere ETFs", correct: false },
      ],
      explanation: "Richtig! In Schwellenländern spielen politische Stabilität, Währungsrisiken und wirtschaftliche Abhängigkeiten eine größere Rolle. Das erhöht das Risiko aber auch die Renditechance.",
    },
    tip: "Emerging Markets ergänzen den MSCI World um Wachstumsmärkte ideal für einen langen Anlagehorizont von 10+ Jahren.",
  },
  {
    id: "smallcap", name: "Small Caps", subtitle: "MSCI World Small Cap", icon: "🔬", color: "#10b981",
    ter: "0,35 %", count: "3.400+", perf: "+11,7 %", perfUp: true, portfolioPct: 10,
    desc: "Kleinere Unternehmen, die im MSCI World nicht enthalten sind. Historisch leicht höhere Rendite mit etwas mehr Schwankung.",
    insight: "Viele der innovativsten Unternehmen von heute waren gestern Small Caps. Amazon, Tesla und NVIDIA waren einmal \"zu klein\" für den MSCI World. Small Cap ETFs fangen genau diese Unternehmen früh ein.",
    holdings: [
      { name: "ITT Inc.", ticker: "ITT", pct: 0.28, flag: "🇺🇸" },
      { name: "Watts Water Tech.", ticker: "WTS", pct: 0.22, flag: "🇺🇸" },
      { name: "Saia Inc.", ticker: "SAIA", pct: 0.20, flag: "🇺🇸" },
      { name: "Watsco Inc.", ticker: "WSO", pct: 0.19, flag: "🇺🇸" },
      { name: "Kadant Inc.", ticker: "KAI", pct: 0.17, flag: "🇺🇸" },
    ],
    regions: [
      { name: "USA", pct: 61, color: "#10b981" },
      { name: "Europa", pct: 16, color: "#34d399" },
      { name: "Japan", pct: 13, color: "#6ee7b7" },
      { name: "Sonstige", pct: 10, color: "#a7f3d0" },
    ],
    quiz: {
      question: "Warum ist die größte Einzelposition im Small Cap ETF nur ~0,3 % so viel weniger als beim MSCI World (4,8 %)?",
      options: [
        { text: "Small Caps sind schlechtere Unternehmen", correct: false },
        { text: "Weil es viel mehr Positionen gibt die Last verteilt sich auf 3.400+ Firmen", correct: true },
        { text: "Small Cap ETFs sind günstiger und deshalb kleiner", correct: false },
      ],
      explanation: "Genau! Mit über 3.400 Unternehmen ist das Gewicht pro Aktie automatisch kleiner. Das ist Absicht maximale Streuung über viele kleinere Firmen.",
    },
    tip: "Mit 3.400+ Positionen der breiteste ETF im Mix. Die kleinen Gewichte pro Aktie sind Absicht maximale Streuung.",
  },
  {
    id: "bonds", name: "Anleihen", subtitle: "Global Aggregate Bond", icon: "🛡️", color: "#0074cc",
    ter: "0,10 %", count: "9.000+", perf: "+2,1 %", perfUp: true, portfolioPct: 15,
    desc: "Staatsanleihen und Unternehmensanleihen weltweit. Stabilisiert das Portfolio besonders wichtig kurz vor dem Anlageziel.",
    insight: "Anleihen und Aktien bewegen sich oft in entgegengesetzte Richtungen. Wenn Aktienmärkte fallen, steigen Anleihen häufig oder fallen zumindest weniger stark. Das macht sie zur perfekten Ergänzung.",
    holdings: [
      { name: "US Treasury 2Y", ticker: "UST2Y", pct: 4.1, flag: "🇺🇸" },
      { name: "Bund Deutschland 10Y", ticker: "BUND10", pct: 2.8, flag: "🇩🇪" },
      { name: "Japan Govt Bond 5Y", ticker: "JGB5Y", pct: 2.3, flag: "🇯🇵" },
      { name: "UK Gilt 5Y", ticker: "UKG5Y", pct: 1.9, flag: "🇬🇧" },
      { name: "France OAT 7Y", ticker: "OAT7Y", pct: 1.6, flag: "🇫🇷" },
    ],
    regions: [
      { name: "USA", pct: 44, color: "#0074cc" },
      { name: "Europa", pct: 32, color: "#3b9fd5" },
      { name: "Japan", pct: 14, color: "#72bde0" },
      { name: "Sonstige", pct: 10, color: "#a8d5ed" },
    ],
    quiz: {
      question: "Was passiert mit dem Anleihen-Anteil in deinem quirion-Portfolio, je näher dein Anlageziel rückt?",
      options: [
        { text: "Er bleibt konstant", correct: false },
        { text: "Er sinkt, weil Anleihen teurer werden", correct: false },
        { text: "Er steigt an, um das Portfolio stabiler zu machen", correct: true },
      ],
      explanation: "Richtig! Das nennt sich Gleitpfad. Kurz vor dem Zieldatum z. B. der Rente will man weniger Schwankung. Anleihen bremsen das Auf und Ab, auch wenn sie weniger Rendite bringen.",
    },
    tip: "Dein Sicherheitsnetz. Je näher dein Anlageziel rückt, desto mehr Anleihen das ist der Gleitpfad in Aktion.",
  },
];

const MIX_STEPS = [
  {
    title: "Das Klumpenrisiko",
    subtitle: "Was passiert, wenn du alles auf eine Karte setzt?",
    content: "Stell dir vor, du investierst dein gesamtes Geld in einen einzigen ETF z. B. 100 % MSCI World. Klingt gut, weil der MSCI World ja schon 1.600 Unternehmen enthält. Aber: Alle diese Unternehmen hängen von denselben Faktoren ab. Wirtschaftskrise? Alle fallen. Zinsanstieg? Alle leiden. Du hast zwar viele Aktien aber nur eine Risikoqelle.",
    visual: "klumpen",
  },
  {
    title: "ETFs reagieren unterschiedlich",
    subtitle: "Finanzkrise 2008 ein reales Beispiel",
    content: "2008 brach der globale Aktienmarkt ein. Aber nicht alle ETF-Typen wurden gleich hart getroffen. Anleihen stiegen sogar weil Anleger:innen in der Krise ihr Geld in sichere Staatsanleihen umschichteten. Das nennt man negative Korrelation: Wenn die einen fallen, steigen die anderen.",
    visual: "crash",
  },
];

function MixExplainer({ onDone }) {
  const [step, setStep] = useState(0);
  const s = MIX_STEPS[step];
  const isLast = step === MIX_STEPS.length - 1;

  const crash2008 = [
    { name: "MSCI World", pct: -54, color: "#3e2eff" },
    { name: "Emerging Markets", pct: -53, color: "#f59e0b" },
    { name: "Small Caps", pct: -55, color: "#10b981" },
    { name: "Anleihen", pct: +5, color: "#0074cc" },
  ];

  return (
    <div style={{ background: "#F6F7F8", borderRadius: "20px", overflow: "hidden" }}>
      {/* Step progress */}
      <div style={{ display: "flex", gap: 4, padding: "16px 20px 0" }}>
        {MIX_STEPS.map((_, i) => (
          <div key={i} style={{ flex: 1, height: 3, borderRadius: 100,
            background: i <= step ? Q.electricBlue : Q.deepBlue10, transition: "background .3s" }} />
        ))}
      </div>

      <div style={{ padding: "18px 20px 20px" }}>
        <div style={{ fontSize: 10, fontWeight: 800, color: Q.electricBlue, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 4 }}>
          Schritt {step + 1} von {MIX_STEPS.length}
        </div>
        <div style={{ fontSize: 17, fontWeight: 900, color: Q.deepBlue, marginBottom: 4, letterSpacing: -0.3 }}>{s.title}</div>
        <div style={{ fontSize: 12, color: Q.neutralDark, marginBottom: 14 }}>{s.subtitle}</div>

        {/* Visual */}
        {s.visual === "klumpen" && (
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: Q.neutralDark, textTransform: "uppercase", letterSpacing: 0.4, marginBottom: 8 }}>Dein Portfolio</div>
            <div style={{ height: 36, borderRadius: 10, background: "#3e2eff", display: "flex", alignItems: "center",
              justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 13, marginBottom: 10 }}>
              100 % MSCI World
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              {[{ l: "Diversifikation", v: "❌ Gering", bad: true }, { l: "Risikoqellen", v: "1 einzige", bad: true }, { l: "Krisenanfälligkeit", v: "⚠️ Hoch", bad: true }].map((s, i) => (
                <div key={i} style={{ flex: 1, background: "#fff", borderRadius: "10px", padding: "10px 8px", textAlign: "center" }}>
                  <div style={{ fontSize: 10, color: Q.neutralDark, fontWeight: 600, textTransform: "uppercase" }}>{s.l}</div>
                  <div style={{ fontSize: 12, fontWeight: 800, color: Q.danger, marginTop: 4 }}>{s.v}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {s.visual === "crash" && (
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: Q.neutralDark, textTransform: "uppercase", letterSpacing: 0.4, marginBottom: 10 }}>Performance 2008 (Finanzkrise)</div>
            {crash2008.map((c, i) => (
              <div key={i} style={{ marginBottom: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: Q.deepBlue }}>{c.name}</span>
                  <span style={{ fontSize: 13, fontWeight: 900, color: c.pct > 0 ? Q.success : Q.danger }}>{c.pct > 0 ? "+" : ""}{c.pct} %</span>
                </div>
                <div style={{ position: "relative", height: 8, background: Q.deepBlue10, borderRadius: 100, overflow: "hidden" }}>
                  <div style={{
                    position: "absolute", height: "100%", borderRadius: 100,
                    background: c.pct > 0 ? Q.success : Q.danger,
                    width: `${Math.abs(c.pct)}%`,
                    right: c.pct < 0 ? 0 : "auto",
                    left: c.pct > 0 ? 0 : "auto",
                    transition: "width .6s",
                  }} />
                </div>
              </div>
            ))}
            <div style={{ marginTop: 12, padding: "10px 12px", background: Q.success + "12", borderRadius: "10px",
              fontSize: 12, color: Q.deepBlue, lineHeight: 1.5 }}>
              💡 Anleihen stiegen 2008 um +5 %, während Aktien über 50 % verloren. Das ist negative Korrelation in Aktion.
            </div>
          </div>
        )}

        {s.visual === "comparison" && (
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: Q.neutralDark, textTransform: "uppercase", letterSpacing: 0.4, marginBottom: 10 }}>Vergleich: Krise 2008</div>
            <div style={{ display: "flex", gap: 10 }}>
              <div style={{ flex: 1, background: "#fff", borderRadius: "14px", padding: "16px 12px", textAlign: "center" }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: Q.neutralDark, textTransform: "uppercase", marginBottom: 8 }}>100 % Aktien-ETF</div>
                <div style={{ fontSize: 36, fontWeight: 900, color: Q.danger, lineHeight: 1 }}>−54 %</div>
                <div style={{ fontSize: 11, color: Q.neutralDark, marginTop: 6 }}>von 10.000 € bleiben<br/><strong style={{ color: Q.danger }}>4.600 €</strong></div>
                <div style={{ height: 6, background: Q.deepBlue10, borderRadius: 100, overflow: "hidden", marginTop: 12 }}>
                  <div style={{ height: "100%", background: Q.danger, width: "46%", borderRadius: 100 }} />
                </div>
              </div>
              <div style={{ flex: 1, background: "#fff", borderRadius: "14px", padding: "16px 12px", textAlign: "center" }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: Q.neutralDark, textTransform: "uppercase", marginBottom: 8 }}>quirion Mix</div>
                <div style={{ fontSize: 36, fontWeight: 900, color: Q.warning, lineHeight: 1 }}>−28 %</div>
                <div style={{ fontSize: 11, color: Q.neutralDark, marginTop: 6 }}>von 10.000 € bleiben<br/><strong style={{ color: "#92400e" }}>7.200 €</strong></div>
                <div style={{ height: 6, background: Q.deepBlue10, borderRadius: 100, overflow: "hidden", marginTop: 12 }}>
                  <div style={{ height: "100%", background: Q.warning, width: "72%", borderRadius: 100 }} />
                </div>
              </div>
            </div>
            <div style={{ marginTop: 10, padding: "10px 12px", background: Q.electricBlue + "0D", borderRadius: "10px",
              fontSize: 12, color: Q.deepBlue, lineHeight: 1.5 }}>
              Der Mix hat nicht alle Verluste verhindert aber fast die Hälfte abgefedert. 2.600 € mehr übrig bedeutet auch: 2.600 € mehr, die weiterwachsen können.
            </div>
          </div>
        )}

        {s.visual === "rebalance" && (
          <div style={{ marginBottom: 16 }}>
            {[
              { icon: "📉", title: "Aktien fallen", desc: "Ihr Anteil sinkt unter den Zielwert. quirion kauft automatisch nach zu niedrigeren Preisen.", action: "→ Aktien nachkaufen", color: Q.electricBlue },
              { icon: "📈", title: "Aktien steigen", desc: "Ihr Anteil übersteigt den Zielwert. quirion verkauft einen Teil und schichtet in Anleihen um.", action: "→ Umschichten", color: Q.success },
              { icon: "🔁", title: "Das Ergebnis", desc: "Du kaufst automatisch günstig und reduzierst automatisch teuer ohne eine einzige Entscheidung.", action: "→ Buy low, sell high", color: Q.purple },
            ].map((r, i) => (
              <div key={i} style={{ display: "flex", gap: 12, padding: "12px 14px", background: "#fff",
                borderRadius: "12px", marginBottom: 8, alignItems: "flex-start" }}>
                <span style={{ fontSize: 22, flexShrink: 0 }}>{r.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 800, fontSize: 13, color: Q.deepBlue }}>{r.title}</div>
                  <div style={{ fontSize: 12, color: Q.neutralDark, lineHeight: 1.5, marginTop: 3 }}>{r.desc}</div>
                </div>
                <div style={{ fontSize: 11, fontWeight: 700, color: r.color, whiteSpace: "nowrap", flexShrink: 0, marginTop: 2 }}>{r.action}</div>
              </div>
            ))}
          </div>
        )}

        <p style={{ fontSize: 13, color: Q.deepBlue, lineHeight: 1.6, margin: "0 0 18px" }}>{s.content}</p>

        <div style={{ display: "flex", gap: 10 }}>
          {step > 0 && (
            <button onClick={() => setStep(s => s - 1)} style={{ padding: "12px 20px", borderRadius: Q.radiusPill,
              border: `1.5px solid ${Q.deepBlue10}`, background: "#fff", color: Q.deepBlue, fontWeight: 700,
              fontSize: 14, cursor: "pointer" }}>
              ← Zurück
            </button>
          )}
          <button onClick={() => isLast ? onDone() : setStep(s => s + 1)} style={{ flex: 1, padding: "14px 20px",
            borderRadius: Q.radiusPill, border: "none",
            background: isLast ? Q.electricBlue : Q.deepBlue, color: "#fff",
            fontWeight: 700, fontSize: 14, cursor: "pointer", transition: "background .2s" }}>
            {isLast ? "Verstanden weiter ›" : `Weiter: ${MIX_STEPS[step + 1].title} →`}
          </button>
        </div>
      </div>
    </div>
  );
}

function EtfMixMod({ onDone }) {
  const [phase, setPhase] = useState(0); // 0 = explainer, 1 = overview, 2 = deep-dive
  const [activeIdx, setActiveIdx] = useState(0);
  const [hoveredHolding, setHoveredHolding] = useState(null);
  const [hoveredRegion, setHoveredRegion] = useState(null);
  const [hoveredSegment, setHoveredSegment] = useState(null);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [finalAns, setFinalAns] = useState(null);
  const etf = ETF_TYPES[activeIdx];
  const maxPct = etf.holdings[0].pct;

  // ── PHASE 0: Why do we mix ETFs at all? ──
  if (phase === 0) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ background: "#F6F7F8", borderRadius: "20px", padding: "20px" }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: Q.electricBlue, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 6 }}>Was dich erwartet</div>
          <div style={{ fontSize: 20, fontWeight: 900, color: Q.deepBlue, letterSpacing: -0.3, marginBottom: 10 }}>Dein ETF-Mix erklärt</div>
          <p style={{ fontSize: 14, color: Q.neutralDark, lineHeight: 1.6, margin: 0 }}>
            Bei quirion investierst du nicht in einen einzelnen ETF, sondern in einen <strong style={{ color: Q.deepBlue }}>Mix aus vier verschiedenen ETF-Typen</strong>. Aber warum? In diesem Modul lernst du zuerst das <em>Warum</em> und dann das <em>Was</em>.
          </p>
        </div>
        <MixExplainer onDone={() => setPhase(1)} />
      </div>
    );
  }

  // ── PHASE 1: What are the four ETF types? ──
  if (phase === 1) {
    const types = [
      { icon: "🌍", name: "Welt-ETF", role: "Die Basis", color: "#3e2eff",
        desc: "Die größten Unternehmen aus 23 entwickelten Industrieländern USA, Europa, Japan. Stabiles Fundament, das allein schon ~80 % der weltweiten Börsenkapitalisierung abbildet.",
        beispiel: "Apple, Microsoft, NVIDIA, Nestlé, Toyota" },
      { icon: "🌏", name: "Emerging Markets", role: "Das Wachstum", color: "#f59e0b",
        desc: "Unternehmen aus Schwellenländern wie China, Indien, Brasilien, Südkorea. Höheres Wachstumspotenzial, weil diese Volkswirtschaften noch stärker expandieren.",
        beispiel: "Samsung, Taiwan Semiconductor, Alibaba, Reliance" },
      { icon: "🔬", name: "Small Caps", role: "Die Streuung", color: "#10b981",
        desc: "Kleinere Unternehmen weltweit, die im Welt-ETF nicht enthalten sind. Mehr als 3.400 Positionen jede einzelne nur ein Bruchteil des Portfolios.",
        beispiel: "Mittelständische Industrie-, Tech- und Dienstleistungsunternehmen" },
      { icon: "🛡️", name: "Anleihen", role: "Die Sicherheit", color: "#0074cc",
        desc: "Staatsanleihen und Unternehmensanleihen aus aller Welt. Ihr Job: das Portfolio stabilisieren, besonders wenn Aktienmärkte fallen.",
        beispiel: "US-Staatsanleihen, Bundesanleihen Deutschland, Japan Govt Bonds" },
    ];
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ background: "#F6F7F8", borderRadius: "20px", padding: "18px 20px" }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: Q.electricBlue, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 4 }}>Die vier ETF-Typen</div>
          <p style={{ fontSize: 14, color: Q.neutralDark, lineHeight: 1.5, margin: 0 }}>
            Jeder ETF-Typ hat eine eigene Rolle im Portfolio. Zusammen ergänzen sie sich stärken, wo der andere schwächer ist.
          </p>
        </div>
        {types.map((t, i) => (
          <div key={i} style={{ background: "#F6F7F8", borderRadius: "20px", padding: "18px 20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
              <div style={{ width: 48, height: 48, borderRadius: "50%", background: t.color, display: "flex",
                alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>
                {t.icon}
              </div>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontWeight: 900, fontSize: 16, color: Q.deepBlue }}>{t.name}</span>
                  <span style={{ padding: "2px 9px", borderRadius: "20px", background: t.color + "18",
                    color: t.color, fontSize: 11, fontWeight: 700 }}>{t.role}</span>
                </div>
              </div>
            </div>
            <p style={{ fontSize: 13, color: Q.deepBlue, lineHeight: 1.6, margin: "0 0 10px" }}>{t.desc}</p>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 8, padding: "10px 12px",
              background: "#fff", borderRadius: "12px" }}>
              <span style={{ fontSize: 13, flexShrink: 0 }}>📌</span>
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, color: Q.neutralDark, textTransform: "uppercase", letterSpacing: 0.4, marginBottom: 2 }}>Beispiele</div>
                <div style={{ fontSize: 12, color: Q.deepBlue }}>{t.beispiel}</div>
              </div>
            </div>
          </div>
        ))}
        <button onClick={() => setPhase(2)} style={{ width: "100%", padding: "14px 20px", borderRadius: "50px",
          border: "none", background: Q.deepBlue, color: "#fff", fontWeight: 700, fontSize: 14,
          cursor: "pointer" }}>
          Jetzt die Details erkunden →
        </button>
      </div>
    );
  }

  // ── PHASE 2: Interactive deep-dive ──
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

      {/* Portfolio overview bar */}
      <div style={{ background: "#F6F7F8", borderRadius: "20px", padding: "20px" }}>
        <div style={{ fontSize: 11, fontWeight: 800, color: Q.deepBlue, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4 }}>Dein Portfolio-Mix</div>
        <div style={{ fontSize: 12, color: Q.neutralDark, marginBottom: 14 }}>Klick auf ein Segment, um den ETF-Typ zu erkunden</div>
        <div style={{ display: "flex", height: 14, borderRadius: 100, overflow: "hidden", marginBottom: 14, gap: 2 }}>
          {ETF_TYPES.map((t, i) => (
            <div key={t.id} onClick={() => setActiveIdx(i)}
              onMouseEnter={() => setHoveredSegment(i)} onMouseLeave={() => setHoveredSegment(null)}
              style={{ width: `${t.portfolioPct}%`, background: t.color, cursor: "pointer", borderRadius: 100,
                opacity: hoveredSegment !== null && hoveredSegment !== i ? 0.4 : 1,
                transform: hoveredSegment === i ? "scaleY(1.3)" : "scaleY(1)", transition: "all .2s" }} />
          ))}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 16px" }}>
          {ETF_TYPES.map((t, i) => (
            <button key={t.id} onClick={() => setActiveIdx(i)}
              onMouseEnter={() => setHoveredSegment(i)} onMouseLeave={() => setHoveredSegment(null)}
              style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none",
                cursor: "pointer", padding: "2px 0", opacity: hoveredSegment !== null && hoveredSegment !== i ? 0.45 : 1,
                transition: "opacity .2s" }}>
              <div style={{ width: 10, height: 10, borderRadius: 3, background: t.color, flexShrink: 0 }} />
              <span style={{ fontSize: 12, color: Q.deepBlue, fontWeight: activeIdx === i ? 800 : 400 }}>{t.icon} {t.name}</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: t.color }}>{t.portfolioPct} %</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab selector */}
      <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 2 }}>
        {ETF_TYPES.map((t, i) => (
          <button key={t.id} onClick={() => setActiveIdx(i)} style={{
            display: "flex", alignItems: "center", gap: 6, padding: "9px 16px",
            borderRadius: "12px", border: "none", cursor: "pointer", whiteSpace: "nowrap",
            background: activeIdx === i ? t.color : "#F6F7F8",
            color: activeIdx === i ? "#fff" : Q.neutralDark,
            fontWeight: 700, fontSize: 13, transition: "all .2s", flexShrink: 0,
          }}>
            {quizAnswers[t.id] !== undefined ? "✓ " : ""}{t.icon} {t.name}
          </button>
        ))}
      </div>

      {/* ETF header */}
      <div style={{ background: "#F6F7F8", borderRadius: "20px", padding: "20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
          <div>
            <div style={{ fontSize: 11, color: Q.neutralDark, fontWeight: 600, marginBottom: 3, textTransform: "uppercase", letterSpacing: 0.4 }}>{etf.subtitle}</div>
            <div style={{ fontSize: 22, fontWeight: 900, color: Q.deepBlue, letterSpacing: -0.5 }}>{etf.name}</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 22, fontWeight: 900, color: etf.perfUp ? Q.success : Q.danger }}>{etf.perf}</div>
            <div style={{ fontSize: 11, color: Q.neutralDark }}>1 Jahr</div>
          </div>
        </div>
        <p style={{ fontSize: 13, color: Q.neutralDark, lineHeight: 1.5, margin: "0 0 16px" }}>{etf.desc}</p>
        <div style={{ display: "flex", gap: 10 }}>
          {[{ l: "Kosten (TER)", v: etf.ter }, { l: "Positionen", v: etf.count }, { l: "Portfolio-Anteil", v: `${etf.portfolioPct} %` }].map((s, i) => (
            <div key={i} style={{ flex: 1, background: "#fff", borderRadius: "12px", padding: "12px 10px", textAlign: "center" }}>
              <div style={{ fontSize: 10, color: Q.neutralDark, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.3 }}>{s.l}</div>
              <div style={{ fontSize: 17, fontWeight: 900, color: etf.color, marginTop: 4 }}>{s.v}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Insight card */}
      <div style={{ background: `linear-gradient(135deg, ${etf.color}08, ${etf.color}14)`, border: `1.5px solid ${etf.color}25`,
        borderRadius: "16px", padding: "16px 18px", display: "flex", gap: 12, alignItems: "flex-start" }}>
        <span style={{ fontSize: 20, flexShrink: 0 }}>💬</span>
        <div>
          <div style={{ fontWeight: 800, fontSize: 11, color: etf.color, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 4 }}>Wusstest du?</div>
          <p style={{ fontSize: 13, lineHeight: 1.55, color: Q.deepBlue, margin: 0 }}>{etf.insight}</p>
        </div>
      </div>

      {/* Top holdings */}
      <div style={{ background: "#F6F7F8", borderRadius: "20px", padding: "20px" }}>
        <div style={{ fontSize: 11, fontWeight: 800, color: Q.deepBlue, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 14 }}>Top-Positionen</div>
        {etf.holdings.map((h, i) => (
          <div key={i} onMouseEnter={() => setHoveredHolding(`${etf.id}-${i}`)} onMouseLeave={() => setHoveredHolding(null)}
            style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", borderRadius: "12px", marginBottom: 6, cursor: "default",
              background: hoveredHolding === `${etf.id}-${i}` ? "#fff" : "transparent", transition: "background .2s" }}>
            <div style={{ width: 38, height: 38, borderRadius: "50%", background: etf.color + "18",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>
              {h.flag}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 700, fontSize: 13, color: Q.deepBlue }}>{h.name}</div>
              <div style={{ fontSize: 11, color: Q.neutralDark }}>{h.ticker}</div>
            </div>
            <div style={{ textAlign: "right", flexShrink: 0 }}>
              <div style={{ fontWeight: 800, fontSize: 14, color: Q.deepBlue }}>{h.pct.toLocaleString("de-DE", { minimumFractionDigits: 1, maximumFractionDigits: 2 })} %</div>
              <div style={{ height: 3, width: 64, background: Q.deepBlue10, borderRadius: 100, overflow: "hidden", marginTop: 5 }}>
                <div style={{ height: "100%", background: etf.color, borderRadius: 100, transition: "width .4s", width: `${(h.pct / maxPct) * 100}%` }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Region breakdown */}
      <div style={{ background: "#F6F7F8", borderRadius: "20px", padding: "20px" }}>
        <div style={{ fontSize: 11, fontWeight: 800, color: Q.deepBlue, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 14 }}>Regionen</div>
        <div style={{ display: "flex", height: 10, borderRadius: 100, overflow: "hidden", marginBottom: 16, gap: 2 }}>
          {etf.regions.map((r, i) => (
            <div key={i} style={{ width: `${r.pct}%`, background: r.color, borderRadius: 100, transition: "width .5s",
              opacity: hoveredRegion !== null && hoveredRegion !== `${etf.id}-${i}` ? 0.4 : 1 }}
              onMouseEnter={() => setHoveredRegion(`${etf.id}-${i}`)} onMouseLeave={() => setHoveredRegion(null)} />
          ))}
        </div>
        {etf.regions.map((r, i) => (
          <div key={i} onMouseEnter={() => setHoveredRegion(`${etf.id}-${i}`)} onMouseLeave={() => setHoveredRegion(null)}
            style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "7px 10px",
              borderRadius: "10px", marginBottom: 4, cursor: "default",
              background: hoveredRegion === `${etf.id}-${i}` ? "#fff" : "transparent", transition: "background .2s" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 10, height: 10, borderRadius: 3, background: r.color }} />
              <span style={{ fontSize: 13, color: Q.deepBlue, fontWeight: hoveredRegion === `${etf.id}-${i}` ? 700 : 400 }}>{r.name}</span>
            </div>
            <span style={{ fontSize: 13, fontWeight: 800, color: hoveredRegion === `${etf.id}-${i}` ? etf.color : Q.deepBlue }}>{r.pct} %</span>
          </div>
        ))}
      </div>

      {/* Per-ETF quiz */}
      <Quiz key={etf.id} question={etf.quiz.question} options={etf.quiz.options} explanation={etf.quiz.explanation}
        onAnswer={() => setQuizAnswers(p => ({ ...p, [etf.id]: true }))} />

      {/* Final synthesis after 2 quizzes */}
      {Object.keys(quizAnswers).length >= 2 && (
        <>
          <div style={{ background: "#F6F7F8", borderRadius: "20px", padding: "20px" }}>
            <div style={{ fontWeight: 800, fontSize: 14, color: Q.deepBlue, marginBottom: 10 }}>Was passiert, wenn man nur einen ETF-Typ wählt?</div>
            {[
              { icon: "🌍", label: "Nur MSCI World", problem: "Keine Schwellenländer du verpasst das Wachstum von China, Indien & Co." },
              { icon: "🌏", label: "Nur Emerging Markets", problem: "Zu viel Schwankung, zu wenig Stabilität hohe Verlustrisiken." },
              { icon: "🔬", label: "Nur Small Caps", problem: "Kleinere Firmen fallen in Krisen oft stärker ohne Stabilisator riskant." },
              { icon: "🛡️", label: "Nur Anleihen", problem: "Zu wenig Rendite nach Inflation und Kosten bleibt kaum etwas übrig." },
            ].map((r, i) => (
              <div key={i} style={{ display: "flex", gap: 12, padding: "10px 0", borderBottom: i < 3 ? `1px solid ${Q.deepBlue10}` : "none" }}>
                <span style={{ fontSize: 18, flexShrink: 0, marginTop: 1 }}>{r.icon}</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 13, color: Q.deepBlue }}>{r.label}</div>
                  <div style={{ fontSize: 12, color: Q.neutralDark, lineHeight: 1.5, marginTop: 2 }}>{r.problem}</div>
                </div>
              </div>
            ))}
            <div style={{ marginTop: 14, padding: "12px 14px", background: Q.electricBlue + "0D", borderRadius: "12px",
              fontSize: 13, color: Q.deepBlue, lineHeight: 1.5 }}>
              <strong>Die Lösung:</strong> quirion kombiniert alle vier jeder ETF-Typ übernimmt eine eigene Rolle. Zusammen sind sie robuster als jeder einzeln.
            </div>
          </div>
          <Quiz question="Was ist der Hauptvorteil, mehrere ETF-Typen zu kombinieren?"
            options={[
              { text: "Man zahlt insgesamt weniger Kosten", correct: false },
              { text: "Man hat mehr Kontrolle über einzelne Aktien", correct: false },
              { text: "Risiko und Chancen werden breiter verteilt kein Klumpenrisiko", correct: true },
            ]}
            explanation="Richtig! Verschiedene ETF-Typen reagieren unterschiedlich auf Marktbewegungen. Was der eine verliert, stabilisiert der andere das nennt sich Diversifikation."
            onAnswer={() => setFinalAns(true)} />
        </>
      )}

      <Merke text={etf.tip} />
      <DoneBtn onClick={onDone} />
    </div>
  );
}

// ─── GLIDEPATH MODULE ───
// ─── HORIZON MODULE ───
const HORIZONS = [
  {
    id: "kurz", label: "Kurz", range: "13 Jahre", icon: "🏖️", color: "#f59e0b",
    stocks: 20, bonds: 80, risk: "Gering", riskColor: Q.success,
    years: 2, rate: 0.03,
    goals: ["Urlaub", "Neues Auto", "Notgroschen aufbauen"],
    desc: "Du brauchst das Geld bald. Kurze Zeiträume lassen kaum Raum, Kursschwankungen auszusitzen. quirion schützt dein Kapital mit einem hohen Anleihenanteil.",
    wachstum: "Gering Kapitalerhalt steht im Vordergrund.",
    beispiel: "Du sparst 2 Jahre für ein Auto. Kurz bevor du kaufst, darf dein Portfolio nicht plötzlich 30 % verlieren.",
  },
  {
    id: "mittel", label: "Mittel", range: "310 Jahre", icon: "🏠", color: Q.electricBlue,
    stocks: 60, bonds: 40, risk: "Mittel", riskColor: Q.warning,
    years: 7, rate: 0.055,
    goals: ["Eigenheim-Anzahlung", "Sabbatical", "Weiterbildung"],
    desc: "Es gibt Zeit, kurze Schwankungsphasen auszusitzen. Ein ausgewogener Mix aus Aktien und Anleihen bietet Wachstumspotenzial bei überschaubarem Risiko.",
    wachstum: "Moderat Wachstum mit Sicherheitspuffer.",
    beispiel: "Du möchtest in 7 Jahren eine Wohnung kaufen. Dein Portfolio darf schwanken aber nicht zu stark.",
  },
  {
    id: "lang", label: "Lang", range: "10+ Jahre", icon: "🚀", color: Q.purple,
    stocks: 90, bonds: 10, risk: "Höher (kurzfristig)", riskColor: Q.electricBlue,
    years: 20, rate: 0.07,
    goals: ["Altersvorsorge", "Finanzielle Unabhängigkeit", "Vermögensaufbau"],
    desc: "Historisch hat ein breit gestreutes Aktienportfolio über jeden beliebigen 15-Jahres-Zeitraum eine positive Rendite erzielt. Mehr Zeit = mehr Wachstumspotenzial.",
    wachstum: "Hoch Zeit ist dein größter Vorteil.",
    beispiel: "Du bist 35 und investierst für die Rente mit 65. Kurzfristige Crashs? Kein Problem du hast 30 Jahre, um sie auszusitzen.",
  },
];

function HorizonMod({ onDone }) {
  const [selected, setSelected] = useState(1);
  const [monthly, setMonthly] = useState(150);
  const [qDone, setQDone] = useState(false);
  const h = HORIZONS[selected];

  const fv = monthly * ((Math.pow(1 + h.rate / 12, h.years * 12) - 1) / (h.rate / 12));
  const invested = monthly * 12 * h.years;
  const gain = fv - invested;
  const maxBar = Math.max(fv, invested) * 1.1;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

      {/* Intro */}
      <div style={{ background: "#F6F7F8", borderRadius: "20px", padding: "20px" }}>
        <SubHead>Warum fragt quirion nach deinem Zeithorizont?</SubHead>
        <Para>Der <strong>Zeithorizont</strong> ist die Zeit, in der du dein investiertes Geld voraussichtlich nicht brauchst. Diese eine Angabe beeinflusst alles: wie viel Risiko sinnvoll ist, wie viele Aktien du halten solltest und welches Wachstumspotenzial realistisch ist. Kurz, mittel oder lang: Je länger, desto mehr Spielraum.</Para>
        <Para>Wichtig: Das ist <strong>kein Vertrag</strong>. Du kannst jederzeit auf dein Geld zugreifen der Zeithorizont hilft quirion nur bei der Portfolioauswahl.</Para>
      </div>

      {/* 3 horizon selector cards */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
        {HORIZONS.map((hz, i) => (
          <button key={hz.id} onClick={() => setSelected(i)} style={{
            display: "flex", flexDirection: "column", alignItems: "center", padding: "16px 10px",
            borderRadius: "18px", border: selected === i ? `2px solid ${hz.color}` : "2px solid transparent",
            background: selected === i ? hz.color + "12" : "#F6F7F8",
            cursor: "pointer", transition: "all .2s",
          }}>
            <div style={{ width: 48, height: 48, borderRadius: "50%", background: selected === i ? hz.color : hz.color + "20",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, marginBottom: 8, transition: "background .2s" }}>
              {hz.icon}
            </div>
            <div style={{ fontWeight: 800, fontSize: 14, color: selected === i ? hz.color : Q.deepBlue }}>{hz.label}</div>
            <div style={{ fontSize: 11, color: Q.neutralDark, marginTop: 2 }}>{hz.range}</div>
          </button>
        ))}
      </div>

      {/* Selected horizon detail */}
      <div style={{ background: "#F6F7F8", borderRadius: "20px", padding: "20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
          <div style={{ width: 44, height: 44, borderRadius: "50%", background: h.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>
            {h.icon}
          </div>
          <div>
            <div style={{ fontWeight: 900, fontSize: 17, color: Q.deepBlue }}>{h.label}fristiger Horizont · {h.range}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 3 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: h.riskColor }} />
              <span style={{ fontSize: 12, color: h.riskColor, fontWeight: 700 }}>Risiko: {h.risk}</span>
            </div>
          </div>
        </div>

        <p style={{ fontSize: 13, color: Q.deepBlue, lineHeight: 1.6, margin: "0 0 14px" }}>{h.desc}</p>

        {/* Portfolio split */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: Q.neutralDark, textTransform: "uppercase", letterSpacing: 0.4, marginBottom: 8 }}>Portfolio-Empfehlung</div>
          <div style={{ display: "flex", height: 36, borderRadius: "12px", overflow: "hidden" }}>
            <div style={{ width: `${h.stocks}%`, background: h.color, display: "flex", alignItems: "center",
              justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 13, transition: "width .5s ease" }}>
              {h.stocks > 15 ? `${h.stocks} % Aktien` : ""}
            </div>
            <div style={{ width: `${h.bonds}%`, background: "#0074cc", display: "flex", alignItems: "center",
              justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 13, transition: "width .5s ease" }}>
              {h.bonds > 15 ? `${h.bonds} % Anleihen` : ""}
            </div>
          </div>
        </div>

        {/* Typical goals */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: Q.neutralDark, textTransform: "uppercase", letterSpacing: 0.4, marginBottom: 8 }}>Typische Ziele</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {h.goals.map((g, i) => (
              <div key={i} style={{ padding: "4px 12px", borderRadius: "20px", background: h.color + "15",
                fontSize: 12, fontWeight: 600, color: h.color }}>{g}</div>
            ))}
          </div>
        </div>

        {/* Example */}
        <div style={{ background: "#fff", borderRadius: "12px", padding: "12px 14px", display: "flex", gap: 10, alignItems: "flex-start" }}>
          <span style={{ fontSize: 16, flexShrink: 0 }}>💬</span>
          <p style={{ fontSize: 12, color: Q.deepBlue, lineHeight: 1.55, margin: 0 }}>{h.beispiel}</p>
        </div>
      </div>

      {/* Growth calculator */}
      <div style={{ ...cardSt, display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ fontWeight: 800, fontSize: 15, color: Q.deepBlue }}>Was könnte dein Geld über diesen Zeitraum wachsen?</div>
        <Sld label="Monatliche Sparrate" min={25} max={1000} step={25} value={monthly} onChange={setMonthly} unit=" €" />

        <div style={{ fontSize: 13, color: Q.neutralDark, marginTop: -8 }}>
          Zeitraum: <strong style={{ color: Q.deepBlue }}>{h.years} Jahre</strong> · Annahme: <strong style={{ color: Q.deepBlue }}>{(h.rate * 100).toFixed(1)} % p.a.</strong> Rendite
        </div>

        {/* Bars */}
        <div style={{ display: "flex", gap: 14, alignItems: "flex-end", height: 120 }}>
          {[
            { label: "Eingezahlt", value: invested, color: Q.deepBlue10, textColor: Q.neutralDark },
            { label: "Endvermögen", value: fv, color: h.color, textColor: h.color },
          ].map((b, i) => (
            <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ fontWeight: 900, fontSize: 15, color: b.textColor, marginBottom: 6 }}>
                {Math.round(b.value).toLocaleString("de-DE")} €
              </div>
              <div style={{ width: "100%", height: Math.round((b.value / maxBar) * 90),
                background: b.color, borderRadius: "8px 8px 0 0", transition: "height .5s ease, background .3s" }} />
              <div style={{ fontSize: 11, fontWeight: 600, color: Q.neutralDark, marginTop: 6 }}>{b.label}</div>
            </div>
          ))}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ fontWeight: 900, fontSize: 15, color: Q.success, marginBottom: 6 }}>
              +{Math.round(gain).toLocaleString("de-DE")} €
            </div>
            <div style={{ width: "100%", height: Math.round((gain / maxBar) * 90),
              background: Q.success, borderRadius: "8px 8px 0 0", transition: "height .5s ease" }} />
            <div style={{ fontSize: 11, fontWeight: 600, color: Q.neutralDark, marginTop: 6 }}>Rendite</div>
          </div>
        </div>

        <div style={{ padding: "12px 14px", background: h.color + "0D", borderRadius: "12px",
          fontSize: 13, color: Q.deepBlue, lineHeight: 1.5 }}>
          <strong>Wachstum:</strong> {h.wachstum}
        </div>
      </div>

      {/* Side-by-side comparison */}
      <div style={{ background: "#F6F7F8", borderRadius: "20px", padding: "20px" }}>
        <div style={{ fontSize: 11, fontWeight: 800, color: Q.deepBlue, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 14 }}>
          Alle Horizonte im Vergleich ({monthly} € / Monat)
        </div>
        {HORIZONS.map((hz, i) => {
          const val = monthly * ((Math.pow(1 + hz.rate / 12, hz.years * 12) - 1) / (hz.rate / 12));
          const inv = monthly * 12 * hz.years;
          const maxVal = monthly * ((Math.pow(1 + 0.07 / 12, 20 * 12) - 1) / (0.07 / 12)) * 1.1;
          return (
            <div key={hz.id} onClick={() => setSelected(i)}
              style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12, cursor: "pointer" }}>
              <span style={{ fontSize: 18, flexShrink: 0 }}>{hz.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: selected === i ? hz.color : Q.deepBlue }}>{hz.label} · {hz.range}</span>
                  <span style={{ fontSize: 12, fontWeight: 900, color: hz.color }}>{Math.round(val).toLocaleString("de-DE")} €</span>
                </div>
                <div style={{ height: 8, background: Q.deepBlue10, borderRadius: 100, overflow: "hidden" }}>
                  <div style={{ height: "100%", background: hz.color, borderRadius: 100,
                    width: `${(val / maxVal) * 100}%`, transition: "width .5s ease" }} />
                </div>
              </div>
            </div>
          );
        })}
        <div style={{ fontSize: 11, color: Q.neutralDark, marginTop: 4 }}>Klick auf eine Zeile, um den Horizont zu wechseln.</div>
      </div>

      <Quiz
        question={`Eine Anlagedauer von 15 Jahren bedeutet, dass ich 15 Jahre lang nicht an mein Geld komme.`}
        options={[
          { text: "Stimmt das ist ein Vertrag mit quirion", correct: false },
          { text: "Stimmt nicht ich kann jederzeit verkaufen", correct: true },
          { text: "Stimmt, außer bei Notfällen", correct: false },
        ]}
        explanation="Stimmt nicht! Du kannst jederzeit auf dein Geld zugreifen. Die Anlagedauer ist nur eine Planungsgrundlage sie hilft quirion, das passende Portfolio zu berechnen."
        onAnswer={() => setQDone(true)}
      />

      <Merke text="Der Zeithorizont ist kein Vertrag er ist dein wichtigstes Werkzeug für die richtige Portfolioauswahl. Je länger, desto mehr Wachstumspotenzial." />
      <DoneBtn onClick={onDone} />
    </div>
  );
}

function GlidepathMod({ onDone }) {
  const [years, setYears] = useState(20);
  const [qDone, setQDone] = useState(false);
  const [hoveredMilestone, setHoveredMilestone] = useState(null);

  const stocksPct = Math.round(Math.max(30, Math.min(90, 30 + years * 2)));
  const bondsPct = 100 - stocksPct;

  const phase = years >= 15
    ? { label: "Wachstumsphase", color: Q.electricBlue, desc: "Hoher Aktienanteil dein Geld hat Zeit zu wachsen und Schwankungen auszusitzen." }
    : years >= 5
    ? { label: "Übergangsphase", color: Q.warning, desc: "Der Aktienanteil sinkt schrittweise. Das Portfolio wird stabiler." }
    : { label: "Schutzphase", color: Q.success, desc: "Dein Vermögen wird geschützt. Anleihen dominieren weniger Schwankung vor dem Ziel." };

  const milestones = [
    { y: 30, label: "30 J." },
    { y: 20, label: "20 J." },
    { y: 15, label: "15 J." },
    { y: 10, label: "10 J." },
    { y: 5,  label: "5 J." },
    { y: 0,  label: "Ziel" },
  ].map(m => ({
    ...m,
    stocks: Math.round(Math.max(30, Math.min(90, 30 + m.y * 2))),
    bonds: 100 - Math.round(Math.max(30, Math.min(90, 30 + m.y * 2))),
    active: Math.abs(m.y - years) <= 2.5,
  }));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

      {/* Intro */}
      <div style={{ background: "#F6F7F8", borderRadius: "20px", padding: "20px" }}>
        <SubHead>Was ist ein Gleitpfad?</SubHead>
        <Para>Ein <strong>Gleitpfad</strong> beschreibt, wie sich die Zusammensetzung deines Portfolios im Laufe der Zeit automatisch verändert. quirion verschiebt das Gewicht schrittweise: weg von <strong>Aktien</strong> (höheres Wachstumspotenzial, stärkere Schwankungen) hin zu <strong>Anleihen</strong> (stabilere Wertentwicklung, weniger Risiko) je näher dein Anlageziel rückt.</Para>
        <SubHead>Das Autobahn-Prinzip</SubHead>
        <Para>Stell dir eine lange Autofahrt vor. Am Anfang kannst du schnell fahren du hast viel Zeit und kannst einen Umweg noch kompensieren. Kurz vor der Ausfahrt verlangsamst du, weil du das Ziel nicht verpassen willst. Beim Investieren funktioniert es genauso:</Para>
        <Bullets items={[
          "<strong>Frühphase (viele Jahre bis zum Ziel):</strong> Hoher Aktienanteil z. B. 90 %. Viel Wachstumspotenzial, genug Zeit um Schwankungen auszusitzen.",
          "<strong>Mittelphase:</strong> Der Aktienanteil sinkt schrittweise, der Anleihenanteil steigt. Das Portfolio wird stabiler.",
          "<strong>Zielphase (kurz vor dem Datum):</strong> Deutlich mehr Anleihen. Das aufgebaute Vermögen wird geschützt.",
        ]} />
        <SubHead>quirion steuert das vollautomatisch</SubHead>
        <Para>Du musst nicht selbst eingreifen, umschichten oder beobachten. Das System passt dein Portfolio entsprechend deiner ursprünglichen Angaben automatisch an Jahr für Jahr, unsichtbar im Hintergrund.</Para>
      </div>

      {/* Interactive slider */}
      <div style={{ ...cardSt, display: "flex", flexDirection: "column", gap: 16 }}>
        <Sld label="Jahre bis zu deinem Anlageziel" min={0} max={30} step={1} value={years} onChange={setYears} unit=" J." />

        {/* Phase badge */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px",
          background: phase.color + "15", borderRadius: "50px", alignSelf: "flex-start" }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: phase.color }} />
          <span style={{ fontSize: 12, fontWeight: 700, color: phase.color }}>{phase.label}</span>
        </div>
        <p style={{ fontSize: 13, color: Q.neutralDark, lineHeight: 1.5, margin: "-8px 0 0" }}>{phase.desc}</p>

        {/* Portfolio split bar */}
        <div>
          <div style={{ display: "flex", height: 44, borderRadius: "14px", overflow: "hidden" }}>
            <div style={{ width: `${stocksPct}%`, background: Q.electricBlue, display: "flex", alignItems: "center",
              justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 14, transition: "width .4s ease" }}>
              {stocksPct > 20 ? `${stocksPct} %` : ""}
            </div>
            <div style={{ width: `${bondsPct}%`, background: "#0074cc", display: "flex", alignItems: "center",
              justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 14, transition: "width .4s ease" }}>
              {bondsPct > 10 ? `${bondsPct} %` : ""}
            </div>
          </div>
          <div style={{ display: "flex", gap: 16, marginTop: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 10, height: 10, borderRadius: 3, background: Q.electricBlue }} />
              <span style={{ fontSize: 12, color: Q.deepBlue, fontWeight: 600 }}>Aktien-ETFs</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 10, height: 10, borderRadius: 3, background: "#0074cc" }} />
              <span style={{ fontSize: 12, color: Q.deepBlue, fontWeight: 600 }}>Anleihen-ETFs</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: "flex", gap: 10 }}>
          <StatBox label="Aktienanteil" value={`${stocksPct} %`} color={Q.electricBlue} />
          <StatBox label="Anleihenanteil" value={`${bondsPct} %`} color="#0074cc" />
        </div>
      </div>

      {/* Timeline */}
      <div style={{ background: "#F6F7F8", borderRadius: "20px", padding: "20px" }}>
        <div style={{ fontSize: 11, fontWeight: 800, color: Q.deepBlue, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 16 }}>Der Gleitpfad im Zeitverlauf</div>
        <div style={{ display: "flex", gap: 6, alignItems: "flex-end" }}>
          {milestones.map((m, i) => (
            <div key={i} onMouseEnter={() => setHoveredMilestone(i)} onMouseLeave={() => setHoveredMilestone(null)}
              onClick={() => setYears(m.y)}
              style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer" }}>
              {/* Stacked bar */}
              <div style={{ width: "100%", height: 120, display: "flex", flexDirection: "column", borderRadius: "10px",
                overflow: "hidden", outline: m.active ? `2px solid ${Q.electricBlue}` : "none",
                transition: "outline .3s", opacity: hoveredMilestone !== null && hoveredMilestone !== i ? 0.5 : 1 }}>
                <div style={{ width: "100%", flex: m.stocks, background: Q.electricBlue, transition: "flex .4s ease",
                  display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {(hoveredMilestone === i || m.active) && <span style={{ fontSize: 10, color: "#fff", fontWeight: 800 }}>{m.stocks}%</span>}
                </div>
                <div style={{ width: "100%", flex: m.bonds, background: "#0074cc", transition: "flex .4s ease",
                  display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {(hoveredMilestone === i || m.active) && <span style={{ fontSize: 10, color: "#fff", fontWeight: 800 }}>{m.bonds}%</span>}
                </div>
              </div>
              <div style={{ fontSize: 10, fontWeight: m.active ? 800 : 500, color: m.active ? Q.electricBlue : Q.neutralDark, marginTop: 6 }}>{m.label}</div>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 12, color: Q.neutralDark, marginTop: 12, lineHeight: 1.5 }}>
          Klick auf eine Säule, um den Slider zu setzen. Blaue Säulen = Aktien, dunkleres Blau = Anleihen.
        </p>
      </div>

      <Quiz
        question="Was passiert mit deinem Aktienanteil, je näher dein Anlageziel rückt?"
        options={[
          { text: "Er steigt, weil du bald Geld brauchst", correct: false },
          { text: "Er bleibt gleich quirion ändert nichts", correct: false },
          { text: "Er sinkt automatisch das Portfolio wird sicherer", correct: true },
        ]}
        explanation="Richtig! quirion senkt den Aktienanteil automatisch, je näher das Zieldatum rückt. So ist dein aufgebautes Vermögen kurz vor Entnahme besser geschützt."
        onAnswer={() => setQDone(true)}
      />

      <Merke text="Der Gleitpfad ist dein Autopilot. Je näher das Ziel, desto vorsichtiger wird das Portfolio vollautomatisch, ohne dass du etwas tun musst." />
      <DoneBtn onClick={onDone} />
    </div>
  );
}

const STATS = [
  { label: "Ø Sparquote in Deutschland", value: "10,6 %", sub: "des Nettoeinkommens (Bundesbank 2024)", icon: "📊" },
  { label: "Ø monatliche Sparsumme", value: "≈ 200 €", sub: "pro Haushalt insgesamt", icon: "🏦" },
  { label: "Investieren in Aktien/ETFs", value: "16 %", sub: "der Deutschen nutzen Wertpapiere aktiv", icon: "📈" },
];

function BenchmarkMod({ onDone }) {
  const AVG = 200;
  const RATE = 0.07;
  const YEARS = 30;
  const [own, setOwn] = useState(150);
  const [hovered, setHovered] = useState(null);

  const calcFV = (m) => m * ((Math.pow(1 + RATE / 12, YEARS * 12) - 1) / (RATE / 12));
  const fvAvg = calcFV(AVG);
  const fvOwn = calcFV(own);
  const maxFV = Math.max(fvAvg, fvOwn);
  const diff = fvOwn - fvAvg;
  const monthDiff = own - AVG;
  const aboveDurch = own >= AVG;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

      {/* Intro */}
      <div style={{ background: "#F6F7F8", borderRadius: "20px", padding: "20px" }}>
        <SubHead>Wie viel sparen Deutsche im Durchschnitt?</SubHead>
        <Para>Es kann helfen zu wissen, wie andere Menschen mit dem Investieren umgehen nicht um sich unter Druck zu setzen, sondern um ein realistisches Bild zu bekommen. Und um zu sehen, welchen Unterschied kleine Beträge über die Zeit machen.</Para>
      </div>

      {/* Stat cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {STATS.map((s, i) => (
          <div key={i} style={{ background: "#F6F7F8", borderRadius: 16, padding: "16px 20px", display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 48, height: 48, borderRadius: 14, background: Q.white, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0, boxShadow: "0 1px 6px rgba(13,12,26,0.06)" }}>{s.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, color: Q.neutralDark, fontWeight: 600, marginBottom: 2 }}>{s.label}</div>
              <div style={{ fontSize: 11, color: Q.neutralDark, opacity: 0.7 }}>{s.sub}</div>
            </div>
            <div style={{ fontWeight: 900, fontSize: 20, color: Q.deepBlue, flexShrink: 0 }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Your amount */}
      <div style={{ background: "#F6F7F8", borderRadius: "20px", padding: "20px" }}>
        <SubHead>Dein Vergleich</SubHead>
        <Para>Gib deine geplante monatliche Sparrate ein und sieh sofort, wie du im Vergleich zum deutschen Durchschnitt abschneidest:</Para>
        <Sld label="Deine monatliche Sparrate" min={25} max={1000} step={25} value={own} onChange={setOwn} unit=" €" />

        {/* Badge */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 8, padding: "14px 16px", borderRadius: 14,
          background: aboveDurch ? Q.electricBlue + "10" : Q.purple + "10",
          border: `1.5px solid ${aboveDurch ? Q.electricBlue : Q.purple}22` }}>
          <div style={{ fontSize: 24 }}>{aboveDurch ? "🚀" : "📌"}</div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 14, color: aboveDurch ? Q.electricBlue : Q.purple }}>
              {own === AVG ? "Genau im Durchschnitt" : aboveDurch
                ? `+${monthDiff} €/Monat über dem Durchschnitt`
                : `${Math.abs(monthDiff)} €/Monat unter dem Durchschnitt`}
            </div>
            <div style={{ fontSize: 12, color: Q.neutralDark, marginTop: 2 }}>
              Durchschnitt: {AVG} €/Monat · Deine Rate: {own} €/Monat
            </div>
          </div>
        </div>
      </div>

      {/* 30-year comparison */}
      <div style={{ background: "#F6F7F8", borderRadius: "20px", padding: "20px" }}>
        <SubHead>Was das in 30 Jahren bedeutet</SubHead>
        <Para>Bei 7 % durchschnittlicher Rendite p.a. und monatlichem Sparplan ergibt sich nach 30 Jahren folgender Unterschied:</Para>

        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 4 }}>
          {[
            { label: "Ø Deutscher (200 €/Monat)", amount: fvAvg, color: "#aab4c8", isOwn: false },
            { label: `Du (${own} €/Monat)`, amount: fvOwn, color: Q.electricBlue, isOwn: true },
          ].map((bar) => (
            <div key={bar.label}
              onMouseEnter={() => setHovered(bar.label)}
              onMouseLeave={() => setHovered(null)}
              style={{ transition: "transform .15s", transform: hovered === bar.label ? "scale(1.01)" : "scale(1)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 5 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: bar.isOwn ? Q.electricBlue : Q.neutralDark }}>{bar.label}</span>
                <span style={{ fontWeight: 900, fontSize: 18, color: bar.isOwn ? Q.electricBlue : Q.deepBlue }}>{Math.round(bar.amount).toLocaleString("de-DE")} €</span>
              </div>
              <div style={{ height: 14, borderRadius: 8, background: "#e8eaf0", overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${(bar.amount / (maxFV * 1.05)) * 100}%`, background: bar.color, borderRadius: 8, transition: "width .5s cubic-bezier(.4,0,.2,1)" }} />
              </div>
            </div>
          ))}
        </div>

        {/* Difference highlight */}
        <div style={{ marginTop: 16, padding: "16px", borderRadius: 14,
          background: diff >= 0 ? `linear-gradient(135deg, ${Q.electricBlue}10, ${Q.purple}0A)` : "#fff3f3",
          border: `1.5px solid ${diff >= 0 ? Q.electricBlue : Q.danger}22` }}>
          <div style={{ fontSize: 12, color: Q.neutralDark, marginBottom: 4 }}>Unterschied nach 30 Jahren</div>
          <div style={{ fontWeight: 900, fontSize: 26, color: diff >= 0 ? Q.electricBlue : Q.danger }}>
            {diff >= 0 ? "+" : ""}{Math.round(diff).toLocaleString("de-DE")} €
          </div>
          <div style={{ fontSize: 12, color: Q.neutralDark, marginTop: 4 }}>
            {diff > 0
              ? `Mit ${own} €/Monat baust du ${Math.round(diff).toLocaleString("de-DE")} € mehr Vermögen auf als der Durchschnitt.`
              : diff < 0
              ? `Mit ${own} €/Monat baust du ${Math.round(Math.abs(diff)).toLocaleString("de-DE")} € weniger auf erhöhe die Rate, wenn möglich.`
              : "Genau auf Augenhöhe mit dem Durchschnitt."}
          </div>
        </div>
      </div>

      <Merke text="Nicht der einzelne Betrag entscheidet sondern Regelmäßigkeit, Zeit und kleine Steigerungen im Laufe der Jahre." />
      <DoneBtn onClick={onDone} />
    </div>
  );
}

function BudgetMod({ onDone }) {
  const [netto, setNetto] = useState(2500);
  const [income, setIncome] = useState(2500);
  const [sparrate, setSparrate] = useState(100);
  const [jahre, setJahre] = useState(20);

  const notgroschen = netto * 3;
  const fixed = Math.round(income * 0.5);
  const flex = Math.round(income * 0.3);
  const save = Math.round(income * 0.2);

  const rate = 0.07;
  const fv = sparrate * ((Math.pow(1 + rate / 12, jahre * 12) - 1) / (rate / 12));
  const invested = sparrate * 12 * jahre;
  const gain = fv - invested;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

      {/* Intro */}
      <div style={{ background: "#F6F7F8", borderRadius: "20px", padding: "20px" }}>
        <SubHead>Warum fragt quirion nach deiner finanziellen Situation?</SubHead>
        <Para>Bevor quirion dir eine Empfehlung gibt, fragt das System nach deiner finanziellen Ausgangssituation: Einkommen, Ausgaben, vorhandenes Vermögen. Das hat einen wichtigen Schutzgedanken dahinter.</Para>
        <Para><strong>Investiere niemals Geld, das du kurzfristig brauchst.</strong> Stell dir vor: Du investierst 5.000 €. Nach einem Jahr sind es wegen eines Kursrückgangs nur noch 4.200 €. Dann bricht deine Waschmaschine zusammen du musst verkaufen. Ergebnis: ein echter Verlust, der nur durch den Zeitdruck entstanden ist. Hätte das Geld auf dem Tagesgeldkonto gelegen, wäre nichts passiert.</Para>
      </div>

      {/* Step 1: Notgroschen */}
      <div style={{ background: "#F6F7F8", borderRadius: "20px", padding: "20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: Q.electricBlue, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 900, fontSize: 15, flexShrink: 0 }}>1</div>
          <div style={{ fontWeight: 900, fontSize: 16, color: Q.deepBlue }}>Der Notgroschen</div>
        </div>
        <Para>Bevor du anfängst zu investieren, solltest du eine eiserne Reserve haben: <strong>mindestens 3 Monatsgehälter (netto)</strong> auf einem separaten Tagesgeldkonto. Dieses Geld rührst du nicht an außer für echte Notfälle. Erst wenn der Notgroschen steht, macht langfristiges Investieren Sinn.</Para>
        <Sld label="Dein Netto-Gehalt" min={500} max={8000} step={100} value={netto} onChange={setNetto} unit=" €" />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginTop: 4 }}>
          {[1, 2, 3].map(m => (
            <div key={m} style={{ background: m === 3 ? Q.electricBlue : Q.white, borderRadius: 14, padding: "14px 12px", textAlign: "center", border: m === 3 ? "none" : `1.5px solid ${Q.deepBlue10}` }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: m === 3 ? "rgba(255,255,255,0.7)" : Q.neutralDark, textTransform: "uppercase", letterSpacing: 0.4, marginBottom: 4 }}>{m === 3 ? "🎯 Ziel" : `${m}. Monat`}</div>
              <div style={{ fontWeight: 900, fontSize: 18, color: m === 3 ? "#fff" : Q.deepBlue }}>{(netto * m).toLocaleString("de-DE")} €</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 12, padding: "12px 16px", borderRadius: 12, background: Q.electricBlue + "10", border: `1.5px solid ${Q.electricBlue}22`, fontSize: 13, color: Q.deepBlue, lineHeight: 1.55 }}>
          💡 Dein Notgroschen-Ziel: <strong style={{ color: Q.electricBlue }}>{notgroschen.toLocaleString("de-DE")} €</strong> auf einem Tagesgeldkonto bevor du einen Cent investierst.
        </div>
      </div>

      {/* Step 2: 50-30-20 Rule */}
      <div style={{ background: "#F6F7F8", borderRadius: "20px", padding: "20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: Q.electricBlue, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 900, fontSize: 15, flexShrink: 0 }}>2</div>
          <div style={{ fontWeight: 900, fontSize: 16, color: Q.deepBlue }}>Die 50-30-20-Regel</div>
        </div>
        <Para>Eine bewährte Faustregel für die Aufteilung deines Einkommens. Gib dein monatliches Nettoeinkommen ein und sieh, wie viel in welchen Bereich fließen sollte:</Para>
        <Sld label="Monatliches Nettoeinkommen" min={500} max={10000} step={100} value={income} onChange={setIncome} unit=" €" />
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 4 }}>
          {[
            { label: "Fixe Ausgaben", pct: 50, amount: fixed, color: "#6c757d", desc: "Miete, Versicherungen, Abos" },
            { label: "Flexible Ausgaben", pct: 30, amount: flex, color: Q.purple, desc: "Lebensmittel, Freizeit, Kleidung" },
            { label: "Sparen & Investieren", pct: 20, amount: save, color: Q.electricBlue, desc: "Notgroschen, Sparplan, Investitionen" },
          ].map(item => (
            <div key={item.label} style={{ background: Q.white, borderRadius: 14, padding: "12px 16px", display: "flex", alignItems: "center", gap: 12, border: `1.5px solid ${item.color}22` }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: item.color + "15", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 15, color: item.color, flexShrink: 0 }}>{item.pct}%</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 800, fontSize: 13, color: Q.deepBlue }}>{item.label}</div>
                <div style={{ fontSize: 11, color: Q.neutralDark }}>{item.desc}</div>
              </div>
              <div style={{ fontWeight: 900, fontSize: 18, color: item.color }}>{item.amount.toLocaleString("de-DE")} €</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 10, padding: "10px 14px", borderRadius: 12, background: Q.electricBlue + "08", border: `1.5px solid ${Q.electricBlue}15`, fontSize: 12, color: Q.neutralDark, lineHeight: 1.55 }}>
          Nach der 50-30-20-Regel stehen dir <strong style={{ color: Q.electricBlue }}>{save.toLocaleString("de-DE")} €/Monat</strong> für Sparen und Investieren zur Verfügung.
        </div>
      </div>

      {/* Step 3: Sparrate calculator */}
      <div style={{ background: "#F6F7F8", borderRadius: "20px", padding: "20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: Q.electricBlue, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 900, fontSize: 15, flexShrink: 0 }}>3</div>
          <div style={{ fontWeight: 900, fontSize: 16, color: Q.deepBlue }}>Realismus schlägt Ehrgeiz</div>
        </div>
        <Para>Es ist besser, <strong>25 € monatlich konsequent</strong> über viele Jahre zu investieren, als 300 € für drei Monate und dann aufzugeben. Beim Zinseszinseffekt zählen vor allem Regelmäßigkeit und Zeit. Bei quirion beginnt es bereits ab 25 € monatlich.</Para>
        <Sld label="Monatliche Sparrate" min={25} max={1000} step={25} value={sparrate} onChange={setSparrate} unit=" €" />
        <Sld label="Anlagedauer" min={1} max={40} step={1} value={jahre} onChange={setJahre} unit=" Jahre" />
        <div style={{ background: Q.white, borderRadius: 16, padding: "16px", marginTop: 8, border: `1.5px solid ${Q.electricBlue}22` }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: Q.neutralDark, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 12 }}>Ergebnis bei 7% Rendite p.a.</div>
          {[
            { label: "Eingezahlt", amount: invested, color: "#c7d2e0" },
            { label: "Zinseszins-Gewinn", amount: gain, color: Q.electricBlue },
          ].map(bar => (
            <div key={bar.label} style={{ marginBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: Q.neutralDark, marginBottom: 3 }}>
                <span>{bar.label}</span>
                <strong style={{ color: bar.color === Q.electricBlue ? Q.electricBlue : Q.deepBlue }}>{Math.round(bar.amount).toLocaleString("de-DE")} €</strong>
              </div>
              <div style={{ height: 8, borderRadius: 4, background: "#F6F7F8", overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${Math.min(100, (bar.amount / fv) * 100)}%`, background: bar.color, borderRadius: 4, transition: "width .4s" }} />
              </div>
            </div>
          ))}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 12, borderTop: `1px solid ${Q.deepBlue10}`, marginTop: 4 }}>
            <div style={{ fontSize: 13, color: Q.neutralDark }}>Endvermögen nach {jahre} Jahren</div>
            <div style={{ fontSize: 28, fontWeight: 900, color: Q.electricBlue }}>{Math.round(fv).toLocaleString("de-DE")} €</div>
          </div>
        </div>
      </div>

      <Merke text="Investiere nur Geld, das du wirklich nicht kurzfristig brauchst. Erst Notgroschen aufbauen, dann investieren in dieser Reihenfolge." />
      <DoneBtn onClick={onDone} />
    </div>
  );
}

function ModuleContent({ type, onDone }) {
  const map = { inflation: InflationMod, compound: CompoundMod, risk: RiskMod, etf: EtfMod, costs: CostsMod, safety: SafetyMod, future: FutureMod, etfmix: EtfMixMod, glidepath: GlidepathMod, horizon: HorizonMod, budget: BudgetMod, benchmark: BenchmarkMod };
  const Comp = map[type];
  return Comp ? <Comp onDone={onDone} /> : <TextMod type={type} onDone={onDone} />;
}

// ─── MOTIVATION OVERLAY ───
const GOALS = [
  { id: "home",     icon: "🏠", label: "Eigene Immobilie",        desc: "Wohnung oder Haus kaufen" },
  { id: "freedom",  icon: "🌅", label: "Finanzielle Freiheit",    desc: "Früher aufhören zu arbeiten" },
  { id: "family",   icon: "👨‍👩‍👧", label: "Familie absichern",       desc: "Für Partner oder Kinder vorsorgen" },
  { id: "travel",   icon: "✈️", label: "Mehr Freiheit im Leben",  desc: "Reisen, Sabbatical, Spielraum" },
  { id: "inflation",icon: "📉", label: "Inflation schlagen",      desc: "Geld soll nicht weniger werden" },
  { id: "smart",    icon: "🧠", label: "Finanziell klüger werden",desc: "Verstehen, was andere längst wissen" },
];

const GOAL_COMMIT = {
  home:     { headline: "Deine eigene Wohnung ist kein Traum.", sub: "Es ist ein Plan, dem der Start fehlt. Menschen, die früh anfangen zu investieren, haben im Schnitt deutlich mehr Eigenkapital nicht weil sie mehr verdienen, sondern weil die Zeit für sie gearbeitet hat.", cta: "Kurs starten für mein Zuhause" },
  freedom:  { headline: "Finanzielle Freiheit ist keine Frage des Gehalts.", sub: "Es ist eine Frage der Entscheidung. Wer mit 28 anfängt, monatlich 150 € zu investieren, hat mit 65 über eine Million Euro nicht weil er viel verdient hat, sondern weil er früh angefangen hat.", cta: "Kurs starten für meine Freiheit" },
  family:   { headline: "Die beste Absicherung für deine Familie ist Vermögen.", sub: "Nicht eine Versicherung, nicht ein Sparstrumpf. Echtes Vermögen bedeutet: du bist gewappnet, wenn etwas passiert und hast Spielraum, wenn das Leben Entscheidungen von dir verlangt.", cta: "Kurs starten für meine Familie" },
  travel:   { headline: "Das Leben, das du dir vorstellst, ist finanzierbar.", sub: "Flexibilität kostet Geld. Wer investiert, kauft sich die wichtigste Ressource überhaupt: die Option, nein zu sagen zu einem Job, einer Situation, einem Kompromiss.", cta: "Kurs starten für mein Leben" },
  inflation:{ headline: "Dein Geld verliert jeden Monat an Wert.", sub: "Inflation ist eine stille Steuer, die niemand abschafft. Wer nichts tut, zahlt sie still, unsichtbar, Jahr für Jahr. Der einzige Weg, sie zu schlagen: investieren.", cta: "Kurs starten Inflation stoppen" },
  smart:    { headline: "Finanzwissen ist der am meisten unterschätzte Vorteil im Leben.", sub: "Die meisten Menschen verbringen mehr Zeit damit, ein Smartphone zu vergleichen als ihre Finanzen zu verstehen. Du machst heute den Unterschied.", cta: "Kurs starten ich will es verstehen" },
};

function MotivationOverlay({ onComplete }) {
  const [step, setStep] = useState("goal");
  const [goal, setGoal] = useState(null);
  const [score, setScore] = useState(5);
  const [cash, setCash] = useState(15000);
  const [age, setAge] = useState(28);
  const [monthly, setMonthly] = useState(150);

  const years = Math.max(5, 65 - age);
  const r = 0.07 / 12;
  const n = years * 12;
  const fvWithout = Math.round(cash * Math.pow(0.98, years));
  const fvInvested = Math.round(cash * Math.pow(1 + r, n) + monthly * ((Math.pow(1 + r, n) - 1) / r));
  const monthlyLoss = Math.max(1, Math.round(cash * 0.02 / 12));
  const totalLoss = cash - fvWithout;
  const gain = fvInvested - fvWithout;

  const g = GOALS.find(x => x.id === goal);
  const gc = GOAL_COMMIT[goal] || GOAL_COMMIT.smart;
  const isLow = score < 5;

  const stepOrder = ["goal", "importance", "reality", "futures", "commit"];
  const stepIdx = stepOrder.indexOf(step);
  const progress = (stepIdx + 1) / (isLow ? 5 : 2);

  const backStep = { importance: "goal", reality: "importance", futures: "reality", commit: "futures" };

  const renderStep = () => {
    // ── GOAL ──────────────────────────────────
    if (step === "goal") return (
      <div>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>👋</div>
          <div style={{ fontWeight: 900, fontSize: 24, color: Q.deepBlue, lineHeight: 1.2, marginBottom: 8 }}>Bevor wir starten.</div>
          <div style={{ fontSize: 15, color: Q.neutralDark, lineHeight: 1.5 }}>Wofür bist du hier? Wähle das aus, das am ehesten zutrifft.</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 28 }}>
          {GOALS.map(gl => (
            <button key={gl.id} onClick={() => setGoal(gl.id)} style={{
              display: "flex", flexDirection: "column", alignItems: "flex-start", padding: "16px 14px",
              borderRadius: 16, border: goal === gl.id ? `2px solid ${Q.electricBlue}` : `1.5px solid ${Q.deepBlue10}`,
              background: goal === gl.id ? Q.electricBlue + "0C" : "#F6F7F8",
              cursor: "pointer", textAlign: "left", transition: "all .15s",
            }}>
              <div style={{ fontSize: 22, marginBottom: 6 }}>{gl.icon}</div>
              <div style={{ fontWeight: 800, fontSize: 13, color: goal === gl.id ? Q.electricBlue : Q.deepBlue, marginBottom: 2 }}>{gl.label}</div>
              <div style={{ fontSize: 11, color: Q.neutralDark, lineHeight: 1.4 }}>{gl.desc}</div>
            </button>
          ))}
        </div>
        <button disabled={!goal} onClick={() => setStep("importance")} style={{
          width: "100%", padding: "17px", borderRadius: Q.radiusPill, border: "none",
          background: goal ? Q.electricBlue : Q.deepBlue10, color: goal ? "#fff" : Q.neutralDark,
          fontWeight: 800, fontSize: 16, cursor: goal ? "pointer" : "default", transition: "all .2s",
        }}>Weiter →</button>
      </div>
    );

    // ── IMPORTANCE ────────────────────────────
    if (step === "importance") return (
      <div>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ fontSize: 32, marginBottom: 10 }}>{g?.icon}</div>
          <div style={{ fontWeight: 900, fontSize: 22, color: Q.deepBlue, lineHeight: 1.3, marginBottom: 8 }}>Wie wichtig ist dir<br/>{g?.label} gerade?</div>
          <div style={{ fontSize: 14, color: Q.neutralDark, lineHeight: 1.5 }}>Sei ehrlich es gibt keine falsche Antwort.</div>
        </div>
        <div style={{ background: "#F6F7F8", borderRadius: 20, padding: "24px 16px", marginBottom: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: Q.neutralDark, marginBottom: 14 }}>
            <span>Nicht wirklich</span><span>Absolut entscheidend</span>
          </div>
          <div style={{ display: "flex", gap: 5, justifyContent: "center", marginBottom: 18 }}>
            {[1,2,3,4,5,6,7,8,9,10].map(n => (
              <button key={n} onClick={() => setScore(n)} style={{
                width: 34, height: 34, borderRadius: "50%", border: "none",
                background: score === n ? Q.electricBlue : n < score ? Q.electricBlue + "28" : "#e8eaf0",
                color: score === n ? "#fff" : n < score ? Q.electricBlue : Q.neutralDark,
                fontWeight: 800, fontSize: 13, cursor: "pointer", transition: "all .15s", flexShrink: 0,
              }}>{n}</button>
            ))}
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontWeight: 900, fontSize: 36, color: score < 5 ? Q.neutralDark : Q.electricBlue, transition: "color .2s" }}>{score}</div>
            <div style={{ fontSize: 12, color: Q.neutralDark }}>von 10</div>
          </div>
        </div>
        <button onClick={() => isLow ? setStep("reality") : onComplete()} style={{
          width: "100%", padding: "17px", borderRadius: Q.radiusPill, border: "none",
          background: score >= 5 ? Q.electricBlue : Q.deepBlue, color: "#fff",
          fontWeight: 800, fontSize: 16, cursor: "pointer",
        }}>{score >= 5 ? "Los geht's →" : "Weiter"}</button>
      </div>
    );

    // ── REALITY (low motivation only) ─────────
    if (step === "reality") return (
      <div>
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontWeight: 900, fontSize: 22, color: Q.deepBlue, lineHeight: 1.3, marginBottom: 8 }}>Kurze Pause.</div>
          <div style={{ fontSize: 15, color: Q.neutralDark, lineHeight: 1.6 }}>Du hast angegeben, dass {g?.label} gerade nicht deine höchste Priorität ist. Das ist okay aber lass uns ehrlich sein, was gerade passiert.</div>
        </div>
        <div style={{ background: Q.dangerBg, border: `1.5px solid ${Q.danger}22`, borderRadius: 20, padding: "22px", marginBottom: 16, textAlign: "center" }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: Q.danger, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6 }}>Du verlierst gerade jeden Monat</div>
          <div style={{ fontWeight: 900, fontSize: 48, color: Q.danger, lineHeight: 1 }}>−{monthlyLoss.toLocaleString("de-DE")} €</div>
          <div style={{ fontSize: 13, color: Q.deepBlue, marginTop: 8, lineHeight: 1.55 }}>durch Inflation auf deinem Sparkonto.<br/>Ohne dass du einen Cent ausgibst.</div>
        </div>
        <div style={{ background: "#F6F7F8", borderRadius: 20, padding: "20px", marginBottom: 20 }}>
          <div style={{ fontWeight: 700, fontSize: 13, color: Q.deepBlue, marginBottom: 14 }}>Passe die Berechnung an deinen Fall an:</div>
          <Sld label="Geld auf meinem Konto (ungefähr)" min={1000} max={100000} step={1000} value={cash} onChange={setCash} unit=" €" />
          <Sld label="Mein Alter" min={18} max={60} step={1} value={age} onChange={setAge} unit=" Jahre" />
          <div style={{ marginTop: 12, display: "flex", gap: 10 }}>
            <div style={{ flex: 1, background: Q.white, borderRadius: 12, padding: "12px 14px", border: `1.5px solid ${Q.deepBlue10}` }}>
              <div style={{ fontSize: 11, color: Q.neutralDark }}>Monatlicher Verlust</div>
              <div style={{ fontWeight: 900, fontSize: 18, color: Q.danger }}>−{monthlyLoss.toLocaleString("de-DE")} €</div>
            </div>
            <div style={{ flex: 1, background: Q.white, borderRadius: 12, padding: "12px 14px", border: `1.5px solid ${Q.deepBlue10}` }}>
              <div style={{ fontSize: 11, color: Q.neutralDark }}>Bis zur Rente</div>
              <div style={{ fontWeight: 900, fontSize: 18, color: Q.danger }}>−{totalLoss.toLocaleString("de-DE")} €</div>
            </div>
          </div>
        </div>
        <button onClick={() => setStep("futures")} style={{
          width: "100%", padding: "17px", borderRadius: Q.radiusPill, border: "none",
          background: Q.deepBlue, color: "#fff", fontWeight: 800, fontSize: 16, cursor: "pointer",
        }}>Zeig mir die Alternative →</button>
      </div>
    );

    // ── FUTURES (low motivation only) ─────────
    if (step === "futures") return (
      <div>
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontWeight: 900, fontSize: 22, color: Q.deepBlue, lineHeight: 1.3, marginBottom: 8 }}>Zwei Versionen von dir.</div>
          <div style={{ fontSize: 15, color: Q.neutralDark, lineHeight: 1.5 }}>In {years} Jahren. Beide fangen heute an mit genau deinem Geld. Der Unterschied ist eine Entscheidung.</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
          <div style={{ background: "#F6F7F8", borderRadius: 20, padding: "20px 14px", textAlign: "center" }}>
            <div style={{ fontSize: 26, marginBottom: 8 }}>😐</div>
            <div style={{ fontWeight: 800, fontSize: 12, color: Q.deepBlue, marginBottom: 4 }}>Nur Sparkonto</div>
            <div style={{ fontSize: 10, color: Q.neutralDark, marginBottom: 14, lineHeight: 1.4 }}>Nichts verändert</div>
            <div style={{ fontWeight: 900, fontSize: 20, color: Q.neutralDark }}>{fvWithout.toLocaleString("de-DE")} €</div>
            <div style={{ fontSize: 10, color: Q.neutralDark, marginTop: 4 }}>Kaufkraft in {years} J.</div>
          </div>
          <div style={{ background: `linear-gradient(135deg, ${Q.electricBlue}0E, ${Q.purple}08)`, border: `2px solid ${Q.electricBlue}28`, borderRadius: 20, padding: "20px 14px", textAlign: "center" }}>
            <div style={{ fontSize: 26, marginBottom: 8 }}>😊</div>
            <div style={{ fontWeight: 800, fontSize: 12, color: Q.electricBlue, marginBottom: 4 }}>Mit Sparplan</div>
            <div style={{ fontSize: 10, color: Q.neutralDark, marginBottom: 14, lineHeight: 1.4 }}>{monthly} €/Mon · 7% p.a.</div>
            <div style={{ fontWeight: 900, fontSize: 20, color: Q.electricBlue }}>{fvInvested.toLocaleString("de-DE")} €</div>
            <div style={{ fontSize: 10, color: Q.neutralDark, marginTop: 4 }}>Vermögen aufgebaut</div>
          </div>
        </div>
        <div style={{ background: Q.electricBlue + "0C", border: `1.5px solid ${Q.electricBlue}22`, borderRadius: 16, padding: "14px", marginBottom: 16, textAlign: "center" }}>
          <div style={{ fontSize: 12, color: Q.neutralDark, marginBottom: 2 }}>Unterschied in {years} Jahren</div>
          <div style={{ fontWeight: 900, fontSize: 32, color: Q.electricBlue }}>+{gain.toLocaleString("de-DE")} €</div>
        </div>
        <div style={{ marginBottom: 20 }}>
          <Sld label="Monatliche Sparrate anpassen" min={25} max={500} step={25} value={monthly} onChange={setMonthly} unit=" €" />
        </div>
        <button onClick={() => setStep("commit")} style={{
          width: "100%", padding: "17px", borderRadius: Q.radiusPill, border: "none",
          background: Q.electricBlue, color: "#fff", fontWeight: 800, fontSize: 16, cursor: "pointer",
        }}>Ich hab's verstanden →</button>
      </div>
    );

    // ── COMMIT (low motivation only) ──────────
    if (step === "commit") return (
      <div>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ fontSize: 52, marginBottom: 14 }}>{g?.icon}</div>
          <div style={{ fontWeight: 900, fontSize: 23, color: Q.deepBlue, lineHeight: 1.25, marginBottom: 14 }}>{gc.headline}</div>
          <div style={{ fontSize: 15, color: Q.neutralDark, lineHeight: 1.65 }}>{gc.sub}</div>
        </div>
        <div style={{ background: "#F6F7F8", borderRadius: 20, padding: "20px", marginBottom: 24, textAlign: "center" }}>
          <div style={{ fontSize: 13, color: Q.neutralDark, marginBottom: 4 }}>Dieser Kurs dauert</div>
          <div style={{ fontWeight: 900, fontSize: 32, color: Q.deepBlue }}>ca. 30 Minuten</div>
          <div style={{ fontSize: 13, color: Q.neutralDark, marginTop: 6, lineHeight: 1.5 }}>Du lernst alles, was du brauchst um mit Überzeugung zu starten nicht auf Verdacht, sondern mit Verständnis.</div>
        </div>
        <button onClick={onComplete} style={{
          width: "100%", padding: "18px", borderRadius: Q.radiusPill, border: "none",
          background: Q.electricBlue, color: "#fff", fontWeight: 800, fontSize: 16, cursor: "pointer",
          boxShadow: `0 4px 20px ${Q.electricBlue}40`,
        }}>{gc.cta} →</button>
      </div>
    );
  };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 200, background: Q.pageBg, fontFamily: Q.font, overflowY: "auto" }}>
      {/* Header + progress */}
      <div style={{ position: "sticky", top: 0, background: Q.pageBg, padding: "14px 24px 10px", zIndex: 10, borderBottom: `1px solid ${Q.deepBlue10}` }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: Q.neutralDark }}>quirion Kurs</div>
          {step !== "goal" && (
            <button onClick={() => setStep(backStep[step])} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, color: Q.neutralDark, padding: 4 }}>← Zurück</button>
          )}
        </div>
        <div style={{ height: 3, borderRadius: 2, background: Q.deepBlue10, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${Math.min(1, progress) * 100}%`, background: Q.electricBlue, borderRadius: 2, transition: "width .4s ease" }} />
        </div>
      </div>

      <div style={{ padding: "28px 24px 60px", maxWidth: 480, margin: "0 auto" }}>
        {renderStep()}
      </div>
    </div>
  );
}

// ─── LEVEL COMPLETE VIEW ───
function LevelCompleteView({ completedLevel, nextLevel, onStartNextLevel, onGoHome }) {
  const t = completedLevel.transition;

  // Final level course complete
  if (!t) {
    return (
      <div style={{ minHeight: "100vh", background: Q.pageBg, fontFamily: Q.font, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 24px", textAlign: "center" }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>🎉</div>
        <div style={{ fontWeight: 900, fontSize: 28, color: Q.deepBlue, marginBottom: 10 }}>Kurs abgeschlossen!</div>
        <div style={{ fontSize: 15, color: Q.neutralDark, maxWidth: 380, lineHeight: 1.6, marginBottom: 32 }}>
          Du hast alle 5 Level durchgearbeitet. Du verstehst jetzt, wie dein Geld für dich arbeitet und weißt, was du tust.
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%", maxWidth: 340 }}>
          {[
            "Du weißt, warum Nicht-Investieren keine Option ist",
            "Du hast dein quirion-Profil mit echtem Verständnis befüllt",
            "Du kennst dein Portfolio in- und auswendig",
            "Dein Geld arbeitet ab sofort für dich",
          ].map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, background: "#F6F7F8", borderRadius: 14, padding: "12px 16px", textAlign: "left" }}>
              <span style={{ fontSize: 16, flexShrink: 0 }}>✅</span>
              <span style={{ fontSize: 13, color: Q.deepBlue, fontWeight: 600 }}>{s}</span>
            </div>
          ))}
        </div>
        <button onClick={onGoHome} style={{ marginTop: 32, padding: "16px 40px", borderRadius: Q.radiusPill, border: "none", background: Q.electricBlue, color: "#fff", fontWeight: 800, fontSize: 16, cursor: "pointer" }}>
          Zur Übersicht
        </button>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: Q.pageBg, fontFamily: Q.font }}>
      {/* Header */}
      <div style={{ position: "sticky", top: 0, zIndex: 10, backdropFilter: "saturate(180%) blur(20px)", background: "rgba(255,255,255,0.92)", borderBottom: `1px solid ${Q.deepBlue10}`, padding: "12px 20px", display: "flex", alignItems: "center", gap: 12 }}>
        <button onClick={onGoHome} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 20, color: Q.deepBlue, padding: 4 }}>←</button>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: completedLevel.color, textTransform: "uppercase", letterSpacing: 1 }}>Level {completedLevel.id} abgeschlossen</div>
          <div style={{ fontSize: 14, fontWeight: 700, color: Q.deepBlue }}>{completedLevel.title}</div>
        </div>
      </div>

      <div style={{ padding: "28px 20px 60px", maxWidth: 600, margin: "0 auto" }}>

        {/* Completion badge */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ width: 80, height: 80, borderRadius: "50%", background: completedLevel.color, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 38, marginBottom: 16, boxShadow: `0 8px 32px ${completedLevel.color}40` }}>
            {completedLevel.icon}
          </div>
          <div style={{ fontWeight: 900, fontSize: 26, color: Q.deepBlue, lineHeight: 1.2, marginBottom: 8 }}>
            {t.heading}
          </div>
          <div style={{ fontSize: 13, color: Q.neutralDark }}>Level {completedLevel.id} von {LEVELS.length} geschafft</div>
        </div>

        {/* Changes */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: Q.neutralDark, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 14 }}>Was sich jetzt verändert hat</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {t.changes.map((change, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 14, background: "#F6F7F8", borderRadius: 16, padding: "16px 18px" }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: completedLevel.color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                  <span style={{ color: "#fff", fontSize: 13, fontWeight: 900 }}>✓</span>
                </div>
                <span style={{ fontSize: 14, color: Q.deepBlue, lineHeight: 1.55, fontWeight: 500 }}>{change}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Next level preview */}
        {nextLevel && (
          <div style={{ background: `linear-gradient(135deg, ${nextLevel.color}0E, ${nextLevel.color}06)`, border: `1.5px solid ${nextLevel.color}28`, borderRadius: 20, padding: "22px 20px", marginBottom: 28 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: Q.neutralDark, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 12 }}>Als nächstes · Level {nextLevel.id}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
              <div style={{ width: 48, height: 48, borderRadius: "50%", background: nextLevel.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>
                {nextLevel.icon}
              </div>
              <div>
                <div style={{ fontWeight: 900, fontSize: 17, color: Q.deepBlue }}>{nextLevel.title}</div>
                <div style={{ fontSize: 12, color: Q.neutralDark, marginTop: 2 }}>{nextLevel.modules.length} Module · {nextLevel.tag}</div>
              </div>
            </div>
            <p style={{ fontSize: 14, color: Q.deepBlue, lineHeight: 1.6, margin: 0 }}>{t.nextTeaser}</p>
          </div>
        )}

        {/* CTA */}
        <button onClick={onStartNextLevel} style={{ width: "100%", padding: "18px 24px", borderRadius: Q.radiusPill, border: "none", background: nextLevel ? nextLevel.color : Q.electricBlue, color: "#fff", fontWeight: 800, fontSize: 16, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, boxShadow: `0 4px 20px ${(nextLevel?.color || Q.electricBlue)}40` }}>
          <span>Weiter zu Level {nextLevel?.id} {nextLevel?.title}</span>
          <span style={{ fontSize: 18 }}>→</span>
        </button>

      </div>
    </div>
  );
}

// ─── QUIRION LOGO ───
function QIcon({ size, color }) {
  return <svg height={size || 20} viewBox="0 0 137 42" fill={color || "currentColor"} xmlns="http://www.w3.org/2000/svg"><path d="M12.29 27.76C8.72 27.76 6.09 25.25 6.09 21.56C6.09 17.87 8.72 15.37 12.29 15.37C15.86 15.37 18.44 17.87 18.44 21.56C18.44 25.25 15.81 27.76 12.29 27.76ZM18.44 10.57V13.17C16.83 11.15 14.47 9.96 11.22 9.96C5.24 9.96 0.34 15.01 0.34 21.56C0.34 28.11 5.24 33.17 11.22 33.17C14.47 33.17 16.84 31.98 18.44 29.96V41.34H24.19V10.57H18.44Z" /></svg>;
}

// ═══════════════════════════════════════
// ─── MAIN APP ───
// ═══════════════════════════════════════
export default function QuirionKurs() {
  const [view, setView] = useState("home");
  const [levelIdx, setLevelIdx] = useState(0);
  const [moduleId, setModuleId] = useState(null);
  const [done, setDone] = useState({});
  const [streak, setStreak] = useState(0);
  const [pts, setPts] = useState(0);
  const [hoveredLevel, setHoveredLevel] = useState(null);
  const [hoveredModule, setHoveredModule] = useState(null);
  const [completedLevelIdx, setCompletedLevelIdx] = useState(null);
  const [overlayDone, setOverlayDone] = useState(() => {
    try { return localStorage.getItem("qk-motivated") === "1"; } catch { return false; }
  });
  const scrollRef = useRef(null);

  const total = LEVELS.reduce((a, l) => a + l.modules.length, 0);
  const doneCount = Object.keys(done).length;
  const goHome = () => { setView("home"); setModuleId(null); };
  const goLevel = (i) => { setLevelIdx(i); setView("level"); setModuleId(null); };
  const goModule = (id) => { setModuleId(id); setView("module"); };
  const completeMod = useCallback((id) => {
    if (!done[id]) { setDone(p => ({ ...p, [id]: true })); setPts(p => p + 50); setStreak(p => p + 1); }
    const allMods = LEVELS.flatMap((l, li) => l.modules.map(m => ({ ...m, li })));
    const idx = allMods.findIndex(m => m.id === id);
    const isLastOverall = idx >= allMods.length - 1;
    const isLastOfLevel = isLastOverall || allMods[idx].li !== allMods[idx + 1].li;
    if (isLastOfLevel) {
      setCompletedLevelIdx(allMods[idx].li);
      setModuleId(null);
      setView("levelComplete");
    } else {
      const next = allMods[idx + 1];
      setLevelIdx(next.li);
      setModuleId(next.id);
      setView("module");
    }
  }, [done]);
  useEffect(() => { scrollRef.current?.scrollTo(0, 0); }, [view, moduleId]);

  const stickyBar = { position: "sticky", top: 0, zIndex: 10, backdropFilter: "saturate(180%) blur(20px)", background: "rgba(236,234,243,0.92)", borderBottom: `1px solid ${Q.deepBlue10}`, padding: "12px 20px", display: "flex", alignItems: "center", gap: 12 };
  const backBtn = (fn) => <button onClick={fn} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 20, color: Q.deepBlue, padding: 4 }}>←</button>;

  // ─── MOTIVATION OVERLAY ───
  if (!overlayDone) {
    return <MotivationOverlay onComplete={() => {
      try { localStorage.setItem("qk-motivated", "1"); } catch {}
      setOverlayDone(true);
    }} />;
  }

  // ─── LEVEL COMPLETE VIEW ───
  if (view === "levelComplete" && completedLevelIdx !== null) {
    const completedLevel = LEVELS[completedLevelIdx];
    const nextLevel = LEVELS[completedLevelIdx + 1] || null;
    return (
      <LevelCompleteView
        completedLevel={completedLevel}
        nextLevel={nextLevel}
        onStartNextLevel={() => {
          if (nextLevel) {
            setLevelIdx(completedLevelIdx + 1);
            setModuleId(nextLevel.modules[0].id);
            setView("module");
          } else {
            goHome();
          }
        }}
        onGoHome={goHome}
      />
    );
  }

  // ─── MODULE VIEW ───
  if (view === "module" && moduleId) {
    const level = LEVELS.find(l => l.modules.some(m => m.id === moduleId));
    const mod = level?.modules.find(m => m.id === moduleId);
    if (!mod) return null;
    return (
      <div style={{ minHeight: "100vh", background: Q.pageBg, fontFamily: Q.font }}>
        <div style={stickyBar}>
          {backBtn(() => goLevel(LEVELS.indexOf(level)))}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: level.color, textTransform: "uppercase", letterSpacing: 1 }}>Level {level.id}</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: Q.deepBlue, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{mod.title}</div>
          </div>
          <div style={{ fontSize: 12, color: Q.neutralDark, flexShrink: 0 }}>{mod.dur}</div>
        </div>
        <div ref={scrollRef} style={{ padding: 20, maxWidth: 600, margin: "0 auto", paddingBottom: 40 }}>
          <ModuleContent type={mod.type} onDone={() => completeMod(mod.id)} />
        </div>
      </div>
    );
  }

  // ─── LEVEL VIEW ───
  if (view === "level") {
    const level = LEVELS[levelIdx];
    const lDone = level.modules.filter(m => done[m.id]).length;
    return (
      <div style={{ minHeight: "100vh", background: Q.pageBg, fontFamily: Q.font }}>
        <div style={stickyBar}>
          {backBtn(goHome)}
          <div style={{ flex: 1 }}><div style={{ fontSize: 14, fontWeight: 700, color: Q.deepBlue }}>Level {level.id}: {level.title}</div></div>
          <span style={{ fontSize: 12, color: Q.neutralDark }}>{lDone}/{level.modules.length}</span>
        </div>
        <div ref={scrollRef} style={{ padding: "24px 20px 40px", maxWidth: 600, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
            <div style={{ width: 52, height: 52, borderRadius: "50%", display: "flex", alignItems: "center",
              justifyContent: "center", background: level.color, fontSize: 24, flexShrink: 0 }}>
              {level.icon}
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                <span style={{ fontWeight: 800, fontSize: 18, color: Q.deepBlue }}>{level.title}</span>
                <span style={{ padding: "2px 10px", borderRadius: Q.radiusPill, background: level.color + "18",
                  color: level.color, fontSize: 11, fontWeight: 600 }}>{level.tag}</span>
              </div>
              <div style={{ fontSize: 13, color: Q.neutralDark }}>{level.desc}</div>
            </div>
          </div>
          <div style={{ height: 4, background: Q.deepBlue10, borderRadius: 100, overflow: "hidden", marginBottom: 20 }}>
            <div style={{ height: "100%", background: level.color, borderRadius: 100, transition: "width .5s", width: `${(lDone / level.modules.length) * 100}%` }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {level.modules.map((mod, i) => {
              const isDone = done[mod.id];
              const isHovered = hoveredModule === mod.id;
              return (
                <button key={mod.id} onClick={() => goModule(mod.id)}
                  onMouseEnter={() => setHoveredModule(mod.id)}
                  onMouseLeave={() => setHoveredModule(null)}
                  style={{
                    display: "flex", alignItems: "center", gap: 16, width: "100%", textAlign: "left",
                    padding: "16px 20px", borderRadius: "18px", cursor: "pointer", border: "none",
                    background: isDone
                      ? (isHovered ? `linear-gradient(to left, ${Q.success}22 0%, ${Q.successBg} 55%)` : Q.successBg)
                      : (isHovered ? `linear-gradient(to left, ${level.color}28 0%, #F6F7F8 55%)` : "#F6F7F8"),
                    transition: "background .35s ease",
                  }}>
                  <div style={{ width: 44, height: 44, borderRadius: "50%", display: "flex", alignItems: "center",
                    justifyContent: "center", flexShrink: 0,
                    background: isDone ? Q.success : level.color,
                    color: Q.white, fontWeight: 900, fontSize: 15 }}>
                    {isDone ? "✓" : i + 1}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 14, color: Q.deepBlue }}>{mod.title}</div>
                    <div style={{ fontSize: 12, color: Q.neutralDark, marginTop: 2 }}>{mod.dur}</div>
                  </div>
                  <span style={{ color: Q.deepBlue30, fontSize: 18 }}>›</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // ─── HOME VIEW ───
  const progress = total > 0 ? (doneCount / total) * 100 : 0;
  return (
    <div style={{ minHeight: "100vh", background: Q.pageBg, fontFamily: Q.font }}>
      <div style={{ padding: "44px 20px 32px" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 8, marginBottom: 28 }}>
            <img src="/quirion.png" alt="quirion" style={{ height: 32, width: "auto" }} />
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: 11, color: Q.neutralDark, fontWeight: 500 }}>powered by</span>
              <img src="/beatvest.svg" alt="beatvest" style={{ height: 16, width: "auto" }} />
            </div>
          </div>
          <h1 style={{ fontSize: 32, fontWeight: 900, lineHeight: 1.08, margin: "0 0 10px", letterSpacing: -1, color: Q.deepBlue, textTransform: "uppercase" }}>Investieren lernen.<br/>In deinem Tempo.</h1>
          <p style={{ fontSize: 14, color: Q.neutralDark, margin: "0 0 28px", fontWeight: 400 }}>Kurze Module · Interaktive Tools · Echtes Verständnis</p>
          <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
            {[{ i: "🔥", l: "Streak", v: streak }, { i: "⭐", l: "Punkte", v: pts }, { i: "📚", l: "Module", v: `${doneCount}/${total}` }].map((s, idx) => (
              <div key={idx} style={{ flex: 1, padding: "14px 8px", background: Q.white, borderRadius: "14px", textAlign: "center", boxShadow: "0 2px 12px rgba(13,12,26,0.06)" }}>
                <div style={{ fontSize: 18 }}>{s.i}</div>
                <div style={{ fontSize: 18, fontWeight: 900, color: Q.deepBlue, marginTop: 2 }}>{s.v}</div>
                <div style={{ fontSize: 10, color: Q.neutralDark, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5, marginTop: 2 }}>{s.l}</div>
              </div>
            ))}
          </div>
          <div style={{ background: Q.white, borderRadius: "12px", padding: "12px 16px", boxShadow: "0 2px 12px rgba(13,12,26,0.06)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: Q.deepBlue }}>Fortschritt</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: Q.electricBlue }}>{Math.round(progress)}%</span>
            </div>
            <div style={{ height: 6, background: Q.deepBlue10, borderRadius: 100, overflow: "hidden" }}>
              <div style={{ height: "100%", background: Q.electricBlue, borderRadius: 100, transition: "width .5s", width: `${progress}%` }} />
            </div>
          </div>
        </div>
      </div>
      <div ref={scrollRef} style={{ padding: "0 20px 40px", maxWidth: 640, margin: "0 auto" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {LEVELS.map((level, li) => {
            const lDone = level.modules.filter(m => done[m.id]).length;
            const allDone = lDone === level.modules.length;
            const isHovered = hoveredLevel === level.id;
            return (
              <button key={level.id} onClick={() => goLevel(li)}
                onMouseEnter={() => setHoveredLevel(level.id)}
                onMouseLeave={() => setHoveredLevel(null)}
                style={{
                  display: "flex", alignItems: "center", gap: 16,
                  width: "100%", padding: "18px 20px", borderRadius: "20px",
                  cursor: "pointer", border: "none", textAlign: "left",
                  background: isHovered
                    ? `linear-gradient(to left, ${level.color}28 0%, #F6F7F8 55%)`
                    : "#F6F7F8",
                  transition: "background .35s ease",
                  overflow: "hidden",
                }}>
                <div style={{ width: 52, height: 52, borderRadius: "50%", display: "flex", alignItems: "center",
                  justifyContent: "center", background: allDone ? Q.successBg : level.color,
                  fontSize: 22, flexShrink: 0 }}>
                  {allDone ? "✅" : level.icon}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4, flexWrap: "wrap" }}>
                    <span style={{ fontWeight: 800, fontSize: 16, color: Q.deepBlue }}>{level.title}</span>
                    <span style={{ padding: "2px 10px", borderRadius: Q.radiusPill, background: level.color + "18",
                      color: level.color, fontSize: 11, fontWeight: 600, whiteSpace: "nowrap" }}>
                      {level.tag}
                    </span>
                  </div>
                  <div style={{ fontSize: 13, color: Q.neutralDark, lineHeight: 1.45 }}>{level.desc}</div>
                  {!allDone && lDone > 0 && (
                    <div style={{ height: 3, background: Q.deepBlue10, borderRadius: 100, overflow: "hidden", marginTop: 8, maxWidth: 120 }}>
                      <div style={{ height: "100%", background: level.color, borderRadius: 100, transition: "width .5s", width: `${(lDone / level.modules.length) * 100}%` }} />
                    </div>
                  )}
                </div>
                <span style={{ color: Q.deepBlue30, fontSize: 20, flexShrink: 0 }}>›</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
