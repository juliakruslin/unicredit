import { useState, useEffect, useRef, useCallback } from "react";

const Q = {
  // UniCredit teal (primary CTA, active nav, chevrons)
  electricBlue: "#007A87", electricBlueHover: "#006370", electricBlueLight: "#E0F3F5",
  // Text
  deepBlue: "#1a1a1a", deepBlue70: "rgba(26,26,26,0.7)", deepBlue30: "rgba(26,26,26,0.3)",
  deepBlue10: "rgba(26,26,26,0.08)", deepBlue5: "rgba(26,26,26,0.04)",
  // Accents
  navyCard: "#1a1a1a",       // dark secondary button
  cyan: "#007A87",           // same teal
  cyanLight: "#E0F3F5",
  red: "#E2001A",            // UniCredit red (logo)
  slateCard: "#8AAAB8",      // muted blue-gray feature card bg
  neutralDark: "#888888", neutralMid: "#aaaaaa", white: "#ffffff",
  pageBg: "#ffffff",
  divider: "rgba(26,26,26,0.10)",
  success: "#10b981", successBg: "#e6faf3", warning: "#f59e0b", warningBg: "#fef3c7",
  danger: "#ef4444", dangerBg: "#fef2f2",
  radiusPill: "360px", radiusSm: "16px", radiusXs: "12px", radius: "20px",
  font: "'Jost', Arial, sans-serif",
};

// ─── DEEP LINK CONFIGURATION ───
// B2B-Partner (z.B. UniCredit) trägt hier die App-URLs ein.
// Diese führen Nutzer direkt an die richtige Stelle in der App.
const DEEP_LINKS = {
  openAccount: {
    url: "https://banking.unicredit.com/depot-eroeffnen", // ← Partner URL hier eintragen
    label: { de: "Jetzt Depot eröffnen", en: "Open depot now", it: "Apri deposito ora" },
    icon: "🏦",
    screen: { de: "Depot eröffnen", en: "Open depot", it: "Apri deposito" },
    screenSub: { de: "Wertpapierdepot", en: "Securities account", it: "Deposito titoli" },
    hint: {
      de: "Du hast gerade alles gelernt, was du brauchst. Jetzt kannst du dein Depot direkt in der UniCredit App eröffnen.",
      en: "You've just learned everything you need. Now you can open your depot directly in the UniCredit app.",
      it: "Hai appena imparato tutto ciò di cui hai bisogno. Ora puoi aprire il tuo deposito direttamente nell'app UniCredit.",
    },
    cta: { de: "Depot jetzt eröffnen →", en: "Open depot now →", it: "Apri deposito ora →" },
  },
  firstInvestment: {
    url: "https://banking.unicredit.com/etf-kaufen", // ← Partner URL hier eintragen
    label: { de: "Jetzt ersten ETF kaufen", en: "Buy first ETF now", it: "Acquista primo ETF ora" },
    icon: "📈",
    screen: { de: "Wertpapiere kaufen", en: "Buy securities", it: "Acquista titoli" },
    screenSub: { de: "ETFs & Fonds", en: "ETFs & Funds", it: "ETF e Fondi" },
    hint: {
      de: "Du weißt jetzt, was ein ETF ist und wie Diversifikation funktioniert. Zeit, dein erstes Investment zu tätigen.",
      en: "You now know what an ETF is and how diversification works. Time to make your first investment.",
      it: "Ora sai cos'è un ETF e come funziona la diversificazione. È il momento di fare il tuo primo investimento.",
    },
    cta: { de: "Ersten ETF kaufen →", en: "Buy first ETF →", it: "Acquista primo ETF →" },
  },
};

// ─── TRANSLATIONS ───
const S = {
  de: {
    headline: "Investieren lernen.\nIn deinem Tempo.",
    subhead: "Kurze Module · Interaktive Tools · Echtes Verständnis",
    streak: "Streak", points: "Punkte", modules: "Module",
    progress: "Fortschritt",
    moduleFinish: "Modul abschließen ✓",
    merkePrefix: "Merke dir",
    back: "←", next: "Weiter →", letsGo: "Los geht's →",
    levelOf: "von", levelDone: "geschafft",
    whatChanged: "Was sich jetzt verändert hat",
    nextLevelLabel: "Als nächstes · Level",
    continueToLevel: (id, title) => `Weiter zu Level ${id} ${title}`,
    overview: "Zur Übersicht",
    courseComplete: "Kurs abgeschlossen!",
    courseCompleteDesc: "Du hast alle Level durchgearbeitet. Du verstehst jetzt, wie dein Geld für dich arbeitet und weißt, was du tust.",
    courseCompleteBullets: [
      "Du weißt, warum Nicht-Investieren keine Option ist",
      "Du hast dein UniCredit Profil mit echtem Verständnis befüllt",
      "Du kennst dein Portfolio in- und auswendig",
      "Dein Geld arbeitet ab sofort für dich",
    ],
    moduleCreating: "Modul wird erstellt...",
    unicreditKurs: "UniCredit Kurs",
    levelCompleted: "abgeschlossen",
    levelX: "Level",
    beforeStart: "Bevor wir starten.",
    beforeStartSub: "Wofür bist du hier? Wähle das aus, das am ehesten zutrifft.",
    importancePre: "Wie wichtig ist dir",
    importanceSub: "Sei ehrlich es gibt keine falsche Antwort.",
    notReally: "Nicht wirklich",
    absolutelyDecisive: "Absolut entscheidend",
    continueCTA: (score) => score >= 5 ? "Los geht's →" : "Weiter",
    shortPause: "Kurze Pause.",
    shortPauseSub: (label) => `Du hast angegeben, dass ${label} gerade nicht deine höchste Priorität ist. Das ist okay aber lass uns ehrlich sein, was gerade passiert.`,
    losingPerMonth: "Du verlierst gerade jeden Monat",
    throughInflation: "durch Inflation auf deinem Sparkonto.\nOhne dass du einen Cent ausgibst.",
    adjustCalc: "Passe die Berechnung an deinen Fall an:",
    moneyOnAccount: "Geld auf meinem Konto (ungefähr)",
    myAge: "Mein Alter",
    monthlyLossLabel: "Monatlicher Verlust",
    untilRetirement: "Bis zur Rente",
    showAlternative: "Zeig mir die Alternative →",
    twoFutures: "Zwei Versionen von dir.",
    twoFuturesSub: (years) => `In ${years} Jahren. Beide fangen heute an mit genau deinem Geld. Der Unterschied ist eine Entscheidung.`,
    savingsOnly: "Nur Sparkonto",
    nothingChanged: "Nichts verändert",
    purchasingPowerIn: "Kaufkraft in",
    yearsShort: "J.",
    withSavingsPlan: "Mit Sparplan",
    wealthBuilt: "Vermögen aufgebaut",
    differenceIn: "Unterschied in",
    adjustSavingsRate: "Monatliche Sparrate anpassen",
    iUnderstood: "Ich hab's verstanden →",
    courseDuration: "Dieser Kurs dauert",
    courseTime: "ca. 30 Minuten",
    courseDurationDesc: "Du lernst alles, was du brauchst um mit Überzeugung zu starten nicht auf Verdacht, sondern mit Verständnis.",
    goals: [
      { id: "home", icon: "🏠", label: "Eigene Immobilie", desc: "Wohnung oder Haus kaufen" },
      { id: "freedom", icon: "🌅", label: "Finanzielle Freiheit", desc: "Früher aufhören zu arbeiten" },
      { id: "family", icon: "👨‍👩‍👧", label: "Familie absichern", desc: "Für Partner oder Kinder vorsorgen" },
      { id: "travel", icon: "✈️", label: "Mehr Freiheit im Leben", desc: "Reisen, Sabbatical, Spielraum" },
      { id: "inflation", icon: "📉", label: "Inflation schlagen", desc: "Geld soll nicht weniger werden" },
      { id: "smart", icon: "🧠", label: "Finanziell klüger werden", desc: "Verstehen, was andere längst wissen" },
    ],
    goalCommit: {
      home: { headline: "Deine eigene Wohnung ist kein Traum.", sub: "Es ist ein Plan, dem der Start fehlt. Menschen, die früh anfangen zu investieren, haben im Schnitt deutlich mehr Eigenkapital nicht weil sie mehr verdienen, sondern weil die Zeit für sie gearbeitet hat.", cta: "Kurs starten für mein Zuhause" },
      freedom: { headline: "Finanzielle Freiheit ist keine Frage des Gehalts.", sub: "Es ist eine Frage der Entscheidung. Wer mit 28 anfängt, monatlich 150 € zu investieren, hat mit 65 über eine Million Euro nicht weil er viel verdient hat, sondern weil er früh angefangen hat.", cta: "Kurs starten für meine Freiheit" },
      family: { headline: "Die beste Absicherung für deine Familie ist Vermögen.", sub: "Nicht eine Versicherung, nicht ein Sparstrumpf. Echtes Vermögen bedeutet: du bist gewappnet, wenn etwas passiert und hast Spielraum, wenn das Leben Entscheidungen von dir verlangt.", cta: "Kurs starten für meine Familie" },
      travel: { headline: "Das Leben, das du dir vorstellst, ist finanzierbar.", sub: "Flexibilität kostet Geld. Wer investiert, kauft sich die wichtigste Ressource überhaupt: die Option, nein zu sagen zu einem Job, einer Situation, einem Kompromiss.", cta: "Kurs starten für mein Leben" },
      inflation: { headline: "Dein Geld verliert jeden Monat an Wert.", sub: "Inflation ist eine stille Steuer, die niemand abschafft. Wer nichts tut, zahlt sie still, unsichtbar, Jahr für Jahr. Der einzige Weg, sie zu schlagen: investieren.", cta: "Kurs starten Inflation stoppen" },
      smart: { headline: "Finanzwissen ist der am meisten unterschätzte Vorteil im Leben.", sub: "Die meisten Menschen verbringen mehr Zeit damit, ein Smartphone zu vergleichen als ihre Finanzen zu verstehen. Du machst heute den Unterschied.", cta: "Kurs starten ich will es verstehen" },
    },
  },
  en: {
    headline: "Learn to invest.\nAt your own pace.",
    subhead: "Short modules · Interactive tools · Real understanding",
    streak: "Streak", points: "Points", modules: "Modules",
    progress: "Progress",
    moduleFinish: "Complete module ✓",
    merkePrefix: "Remember",
    back: "←", next: "Next →", letsGo: "Let's go →",
    levelOf: "of", levelDone: "completed",
    whatChanged: "What has changed now",
    nextLevelLabel: "Up next · Level",
    continueToLevel: (id, title) => `Continue to Level ${id} ${title}`,
    overview: "Back to overview",
    courseComplete: "Course completed!",
    courseCompleteDesc: "You have completed all levels. You now understand how your money works for you and know what you're doing.",
    courseCompleteBullets: [
      "You know why not investing is not an option",
      "You have set up your UniCredit profile with real understanding",
      "You know your portfolio inside and out",
      "Your money is now working for you",
    ],
    moduleCreating: "Module is being created...",
    unicreditKurs: "UniCredit Course",
    levelCompleted: "completed",
    levelX: "Level",
    beforeStart: "Before we start.",
    beforeStartSub: "Why are you here? Choose what applies most to you.",
    importancePre: "How important is",
    importanceSub: "Be honest – there's no wrong answer.",
    notReally: "Not really",
    absolutelyDecisive: "Absolutely crucial",
    continueCTA: (score) => score >= 5 ? "Let's go →" : "Next",
    shortPause: "Quick pause.",
    shortPauseSub: (label) => `You indicated that ${label} is not your top priority right now. That's okay – but let's be honest about what's happening.`,
    losingPerMonth: "You're currently losing every month",
    throughInflation: "through inflation on your savings account.\nWithout spending a single cent.",
    adjustCalc: "Adjust the calculation to your situation:",
    moneyOnAccount: "Money in my account (approx.)",
    myAge: "My age",
    monthlyLossLabel: "Monthly loss",
    untilRetirement: "Until retirement",
    showAlternative: "Show me the alternative →",
    twoFutures: "Two versions of you.",
    twoFuturesSub: (years) => `In ${years} years. Both start today with exactly your money. The difference is one decision.`,
    savingsOnly: "Savings account only",
    nothingChanged: "Nothing changed",
    purchasingPowerIn: "Purchasing power in",
    yearsShort: "yrs.",
    withSavingsPlan: "With savings plan",
    wealthBuilt: "Wealth accumulated",
    differenceIn: "Difference in",
    adjustSavingsRate: "Adjust monthly savings rate",
    iUnderstood: "I got it →",
    courseDuration: "This course takes",
    courseTime: "approx. 30 minutes",
    courseDurationDesc: "You'll learn everything you need to start with conviction – not by guessing, but with real understanding.",
    goals: [
      { id: "home", icon: "🏠", label: "Own property", desc: "Buy an apartment or house" },
      { id: "freedom", icon: "🌅", label: "Financial freedom", desc: "Stop working earlier" },
      { id: "family", icon: "👨‍👩‍👧", label: "Protect my family", desc: "Provide for partner or children" },
      { id: "travel", icon: "✈️", label: "More freedom in life", desc: "Travel, sabbaticals, flexibility" },
      { id: "inflation", icon: "📉", label: "Beat inflation", desc: "Keep money from losing value" },
      { id: "smart", icon: "🧠", label: "Get financially smarter", desc: "Understand what others already know" },
    ],
    goalCommit: {
      home: { headline: "Your own home is not a dream.", sub: "It's a plan that's missing a start. People who start investing early have significantly more equity on average – not because they earn more, but because time worked for them.", cta: "Start course for my home" },
      freedom: { headline: "Financial freedom is not about salary.", sub: "It's a matter of decision. Someone who starts at 28 investing €150 a month will have over a million euros by 65 – not because they earned a lot, but because they started early.", cta: "Start course for my freedom" },
      family: { headline: "The best protection for your family is wealth.", sub: "Not insurance, not a piggy bank. Real wealth means: you're prepared when something happens and have flexibility when life demands decisions from you.", cta: "Start course for my family" },
      travel: { headline: "The life you imagine is affordable.", sub: "Flexibility costs money. Those who invest buy the most important resource: the option to say no to a job, a situation, a compromise.", cta: "Start course for my life" },
      inflation: { headline: "Your money loses value every month.", sub: "Inflation is a silent tax that nobody abolishes. Those who do nothing pay it silently, invisibly, year after year. The only way to beat it: invest.", cta: "Start course – stop inflation" },
      smart: { headline: "Financial knowledge is the most underrated advantage in life.", sub: "Most people spend more time comparing smartphones than understanding their finances. Today, you make the difference.", cta: "Start course – I want to understand it" },
    },
  },
  it: {
    headline: "Impara a investire.\nAl tuo ritmo.",
    subhead: "Moduli brevi · Strumenti interattivi · Vera comprensione",
    streak: "Serie", points: "Punti", modules: "Moduli",
    progress: "Progresso",
    moduleFinish: "Completa modulo ✓",
    merkePrefix: "Ricorda",
    back: "←", next: "Avanti →", letsGo: "Iniziamo →",
    levelOf: "di", levelDone: "completato",
    whatChanged: "Cosa è cambiato ora",
    nextLevelLabel: "Prossimo · Livello",
    continueToLevel: (id, title) => `Continua al Livello ${id} ${title}`,
    overview: "Torna alla panoramica",
    courseComplete: "Corso completato!",
    courseCompleteDesc: "Hai completato tutti i livelli. Ora capisci come il tuo denaro lavora per te e sai cosa stai facendo.",
    courseCompleteBullets: [
      "Sai perché non investire non è un'opzione",
      "Hai completato il tuo profilo UniCredit con vera comprensione",
      "Conosci il tuo portafoglio dentro e fuori",
      "Il tuo denaro lavora per te da adesso",
    ],
    moduleCreating: "Il modulo è in fase di creazione...",
    unicreditKurs: "Corso UniCredit",
    levelCompleted: "completato",
    levelX: "Livello",
    beforeStart: "Prima di iniziare.",
    beforeStartSub: "Perché sei qui? Scegli ciò che si avvicina di più a te.",
    importancePre: "Quanto è importante per te",
    importanceSub: "Sii onesto – non c'è risposta sbagliata.",
    notReally: "Per niente",
    absolutelyDecisive: "Assolutamente decisivo",
    continueCTA: (score) => score >= 5 ? "Iniziamo →" : "Avanti",
    shortPause: "Una breve pausa.",
    shortPauseSub: (label) => `Hai indicato che ${label} non è attualmente la tua priorità più alta. Va bene – ma siamo onesti su cosa sta succedendo.`,
    losingPerMonth: "Stai perdendo ogni mese",
    throughInflation: "a causa dell'inflazione sul tuo conto corrente.\nSenza spendere un solo centesimo.",
    adjustCalc: "Adatta il calcolo alla tua situazione:",
    moneyOnAccount: "Denaro sul mio conto (circa)",
    myAge: "La mia età",
    monthlyLossLabel: "Perdita mensile",
    untilRetirement: "Fino alla pensione",
    showAlternative: "Mostrami l'alternativa →",
    twoFutures: "Due versioni di te.",
    twoFuturesSub: (years) => `Tra ${years} anni. Entrambi iniziano oggi con esattamente i tuoi soldi. La differenza è una decisione.`,
    savingsOnly: "Solo conto corrente",
    nothingChanged: "Niente è cambiato",
    purchasingPowerIn: "Potere d'acquisto tra",
    yearsShort: "anni",
    withSavingsPlan: "Con piano di risparmio",
    wealthBuilt: "Patrimonio accumulato",
    differenceIn: "Differenza tra",
    adjustSavingsRate: "Regola il tasso mensile di risparmio",
    iUnderstood: "Ho capito →",
    courseDuration: "Questo corso dura",
    courseTime: "circa 30 minuti",
    courseDurationDesc: "Imparerai tutto ciò di cui hai bisogno per iniziare con convinzione – non per caso, ma con vera comprensione.",
    goals: [
      { id: "home", icon: "🏠", label: "Casa di proprietà", desc: "Comprare un appartamento o una casa" },
      { id: "freedom", icon: "🌅", label: "Libertà finanziaria", desc: "Smettere di lavorare prima" },
      { id: "family", icon: "👨‍👩‍👧", label: "Proteggere la famiglia", desc: "Provvedere al partner o ai figli" },
      { id: "travel", icon: "✈️", label: "Più libertà nella vita", desc: "Viaggi, sabbatico, flessibilità" },
      { id: "inflation", icon: "📉", label: "Battere l'inflazione", desc: "Evitare che il denaro perda valore" },
      { id: "smart", icon: "🧠", label: "Diventare più consapevole", desc: "Capire ciò che altri già sanno" },
    ],
    goalCommit: {
      home: { headline: "La tua casa non è un sogno.", sub: "È un piano a cui manca solo un inizio. Le persone che iniziano a investire presto hanno in media molto più capitale proprio – non perché guadagnano di più, ma perché il tempo ha lavorato per loro.", cta: "Inizia il corso per la mia casa" },
      freedom: { headline: "La libertà finanziaria non dipende dallo stipendio.", sub: "È una questione di decisione. Chi inizia a 28 anni investendo 150€ al mese avrà oltre un milione di euro a 65 anni – non perché ha guadagnato molto, ma perché ha iniziato presto.", cta: "Inizia il corso per la mia libertà" },
      family: { headline: "La miglior protezione per la tua famiglia è il patrimonio.", sub: "Non un'assicurazione, non un salvadanaio. Il vero patrimonio significa: sei pronto quando succede qualcosa e hai flessibilità quando la vita richiede decisioni.", cta: "Inizia il corso per la mia famiglia" },
      travel: { headline: "La vita che immagini è realizzabile.", sub: "La flessibilità costa denaro. Chi investe acquista la risorsa più importante: la possibilità di dire no a un lavoro, una situazione, un compromesso.", cta: "Inizia il corso per la mia vita" },
      inflation: { headline: "Il tuo denaro perde valore ogni mese.", sub: "L'inflazione è una tassa silenziosa che nessuno abolisce. Chi non fa nulla la paga silenziosamente, invisibilmente, anno dopo anno. L'unico modo per batterla: investire.", cta: "Inizia il corso – ferma l'inflazione" },
      smart: { headline: "La conoscenza finanziaria è il vantaggio più sottovalutato nella vita.", sub: "La maggior parte delle persone trascorre più tempo a confrontare smartphone che a capire le proprie finanze. Oggi fai la differenza.", cta: "Inizia il corso – voglio capire" },
    },
  },
};

const LEVELS = [
  {
    id: 1,
    title: { de: "Berechne dein zukünftiges Vermögen", en: "Calculate your future wealth", it: "Calcola il tuo patrimonio futuro" },
    tag: { de: "Mach mehr aus deinem Geld", en: "Make more of your money", it: "Fai di più con il tuo denaro" },
    color: Q.electricBlue, icon: "📈",
    desc: { de: "Versteh, warum dein Geld auf dem Konto an Wert verliert und wie du gegensteuern kannst.", en: "Understand why your money loses value in your account and how to counteract it.", it: "Capisci perché il tuo denaro perde valore in banca e come rimediare." },
    modules: [
      { id: "1.1", title: { de: "Rentenlücke – Wie groß ist sie?", en: "Pension gap – How big is it?", it: "Divario pensionistico – Quanto è grande?" }, dur: "5 Min", type: "rentenlücke" },
      { id: "1.2", title: { de: "Inflation", en: "Inflation", it: "Inflazione" }, dur: "5 Min", type: "inflation" },
      { id: "1.3", title: { de: "Zinseszinseffekt", en: "Compound interest effect", it: "Effetto degli interessi composti" }, dur: "5 Min", type: "compound" },
    ],
    transition: {
      heading: { de: "Du weißt jetzt, warum Investieren so wichtig ist", en: "You now know why investing is so important", it: "Ora sai perché investire è così importante" },
      changes: {
        de: ["Du verstehst, warum die gesetzliche Rente allein nicht reichen wird", "Du weißt, wie Inflation dein Erspartes still aufzehrt", "Du hast den Zinseszinseffekt verstanden – je früher du startest, desto besser"],
        en: ["You understand why the state pension alone won't be enough", "You know how inflation silently erodes your savings", "You've understood compound interest – the earlier you start, the better"],
        it: ["Capisci perché la pensione statale da sola non basterà", "Sai come l'inflazione erode silenziosamente i tuoi risparmi", "Hai capito gli interessi composti – prima inizi, meglio è"],
      },
      nextTeaser: { de: "Jetzt öffnest du dein erstes Investmentkonto – Schritt für Schritt erklärt.", en: "Now you'll open your first investment account – explained step by step.", it: "Ora aprirai il tuo primo conto d'investimento – spiegato passo dopo passo." },
    },
  },
  {
    id: 2,
    title: { de: "Eröffne dein Investmentkonto", en: "Open your investment account", it: "Apri il tuo conto d'investimento" },
    tag: { de: "Eröffne dein Investmentkonto", en: "Open your investment account", it: "Apri il tuo conto d'investimento" },
    color: Q.purple, icon: "🏦",
    desc: { de: "Lern, wie du sicher ein Depot eröffnest und dein Geld geschützt ist.", en: "Learn how to safely open a custody account and how your money is protected.", it: "Impara come aprire un deposito in modo sicuro e come il tuo denaro è protetto." },
    modules: [
      { id: "2.1", title: { de: "So kommst du wieder an dein Geld", en: "How to access your money", it: "Come accedere al tuo denaro" }, dur: "3 Min", type: "liquidity" },
      { id: "2.2", title: { de: "Maximaler Schutz für dein Konto und deine Identität", en: "Maximum protection for your account and identity", it: "Protezione massima per il tuo conto e la tua identità" }, dur: "4 Min", type: "security" },
      { id: "2.3", title: { de: "Wie sicher ist dein Geld", en: "How safe is your money", it: "Quanto è sicuro il tuo denaro" }, dur: "4 Min", type: "safety" },
    ],
    transition: {
      heading: { de: "Dein Depot ist sicher eingerichtet", en: "Your custody account is set up safely", it: "Il tuo deposito è configurato in modo sicuro" },
      changes: {
        de: ["Du weißt, wie du jederzeit wieder an dein Geld kommst", "Deine Identität und dein Konto sind optimal geschützt", "Du verstehst, durch welche Mechanismen dein Geld mehrfach abgesichert ist"],
        en: ["You know how to access your money at any time", "Your identity and account are optimally protected", "You understand the mechanisms that protect your money multiple times"],
        it: ["Sai come accedere al tuo denaro in qualsiasi momento", "La tua identità e il tuo conto sono ottimamente protetti", "Capisci i meccanismi che proteggono il tuo denaro più volte"],
      },
      nextTeaser: { de: "Jetzt tätigst du dein erstes Investment – ETFs, Aktien und dein erstes Portfolio.", en: "Now you'll make your first investment – ETFs, stocks, and your first portfolio.", it: "Ora farai il tuo primo investimento – ETF, azioni e il tuo primo portafoglio." },
    },
  },
  {
    id: 3,
    title: { de: "Mache dein erstes Investment", en: "Make your first investment", it: "Fai il tuo primo investimento" },
    tag: { de: "Mache dein erstes Investment", en: "Make your first investment", it: "Fai il tuo primo investimento" },
    color: Q.skyBlue, icon: "💼",
    desc: { de: "Lern, was Aktien und ETFs sind – und wie du dein erstes Portfolio aufbaust.", en: "Learn what stocks and ETFs are – and how to build your first portfolio.", it: "Impara cosa sono le azioni e gli ETF – e come costruire il tuo primo portafoglio." },
    modules: [
      { id: "3.1", title: { de: "Aktien", en: "Stocks", it: "Azioni" }, dur: "4 Min", type: "aktien" },
      { id: "3.2", title: { de: "Diversifiziert investieren", en: "Diversified investing", it: "Investire in modo diversificato" }, dur: "4 Min", type: "diversifikation" },
      { id: "3.3", title: { de: "ETF: everybody's darling", en: "ETF: everybody's darling", it: "ETF: il preferito di tutti" }, dur: "4 Min", type: "etf" },
      { id: "3.4", title: { de: "Index", en: "Index", it: "Indice" }, dur: "3 Min", type: "index" },
      { id: "3.5", title: { de: "Das 70/30 Portfolio", en: "The 70/30 portfolio", it: "Il portafoglio 70/30" }, dur: "4 Min", type: "portfolio7030" },
      { id: "3.6", title: { de: 'Top-Up', en: 'Top-Up', it: 'Top-Up' }, dur: "3 Min", type: "topup" },
    ],
    transition: {
      heading: { de: "Dein erstes Investment ist getätigt", en: "Your first investment is made", it: "Il tuo primo investimento è fatto" },
      changes: {
        de: ["Du verstehst, was eine Aktie ist und wie der Markt funktioniert", "Du weißt, wie ETFs automatisch für Diversifikation sorgen", "Du hast dein erstes Portfolio aufgebaut"],
        en: ["You understand what a stock is and how the market works", "You know how ETFs automatically provide diversification", "You've built your first portfolio"],
        it: ["Capisci cos'è un'azione e come funziona il mercato", "Sai come gli ETF forniscono automaticamente diversificazione", "Hai costruito il tuo primo portafoglio"],
      },
      nextTeaser: { de: "Jetzt automatisierst du deinen Vermögensaufbau – Sparplan einrichten.", en: "Now you'll automate your wealth building – set up a savings plan.", it: "Ora automatizzerai la costruzione del tuo patrimonio – configura un piano di risparmio." },
    },
  },
  {
    id: 4,
    title: { de: "Baue automatisch Vermögen auf", en: "Build wealth automatically", it: "Costruisci patrimonio automaticamente" },
    tag: { de: "Sparplan aufsetzen", en: "Set up savings plan", it: "Imposta piano di risparmio" },
    color: Q.grape, icon: "⚙️",
    desc: { de: "Richte einen Sparplan ein und bau automatisch und entspannt Vermögen auf.", en: "Set up a savings plan and build wealth automatically and stress-free.", it: "Configura un piano di risparmio e costruisci patrimonio automaticamente e senza stress." },
    modules: [
      { id: "4.1", title: { de: "Ruhig bleiben bei Minus", en: "Stay calm in a downturn", it: "Mantenere la calma in calo" }, dur: "4 Min", type: "ruhe" },
      { id: "4.2", title: { de: "Der Einstiegszeitpunkt", en: "The entry timing", it: "Il momento di ingresso" }, dur: "4 Min", type: "timing" },
      { id: "4.3", title: { de: "Warum Ziele wichtig sind", en: "Why goals matter", it: "Perché gli obiettivi sono importanti" }, dur: "3 Min", type: "goals" },
      { id: "4.4", title: { de: "Dauerauftrag", en: "Standing order", it: "Ordine permanente" }, dur: "3 Min", type: "dauerauftrag" },
      { id: "4.5", title: { de: "Automatisch Vermögen aufbauen", en: "Build wealth automatically", it: "Costruire patrimonio automaticamente" }, dur: "4 Min", type: "sparplan" },
    ],
    transition: {
      heading: { de: "Dein Sparplan läuft automatisch", en: "Your savings plan runs automatically", it: "Il tuo piano di risparmio funziona automaticamente" },
      changes: {
        de: ["Du lässt dich nicht von Kursschwankungen verunsichern", "Du weißt, dass es keinen perfekten Einstiegszeitpunkt gibt", "Dein Geld arbeitet jeden Monat automatisch für dich"],
        en: ["You won't be unsettled by market fluctuations", "You know there's no perfect time to enter the market", "Your money works automatically for you every month"],
        it: ["Non ti lascerai disturbare dalle fluttuazioni del mercato", "Sai che non esiste il momento perfetto per entrare nel mercato", "I tuoi soldi lavorano automaticamente per te ogni mese"],
      },
      nextTeaser: { de: "Jetzt tauchen wir tiefer ein – verstehe deine ETFs im Detail.", en: "Now we dive deeper – understand your ETFs in detail.", it: "Ora approfondiamo – capisci i tuoi ETF in dettaglio." },
    },
  },
  {
    id: 5,
    title: { de: "Verstehe deine Investments im Detail", en: "Understand your investments in detail", it: "Comprendi i tuoi investimenti in dettaglio" },
    tag: { de: "Teste dein Wissen in der Auswahl von ETFs", en: "Test your ETF selection knowledge", it: "Testa le tue conoscenze nella selezione degli ETF" },
    color: Q.success, icon: "🔬",
    desc: { de: "Von ETF-Anbieter bis Steuer – alles was du für die richtige ETF-Auswahl brauchst.", en: "From ETF providers to taxes – everything you need for the right ETF selection.", it: "Dai provider di ETF alle tasse – tutto ciò di cui hai bisogno per la giusta selezione degli ETF." },
    modules: [
      { id: "5.1", title: { de: "ETF-Anbieter", en: "ETF providers", it: "Provider di ETF" }, dur: "4 Min", type: "etfanbieter" },
      { id: "5.2", title: { de: "ETF-Währung", en: "ETF currency", it: "Valuta ETF" }, dur: "3 Min", type: "etfwaehrung" },
      { id: "5.3", title: { de: "ETF-Kosten", en: "ETF costs", it: "Costi ETF" }, dur: "4 Min", type: "etfkosten" },
      { id: "5.4", title: { de: "Gewinnverteilung", en: "Profit distribution", it: "Distribuzione dei profitti" }, dur: "3 Min", type: "ausschuettung" },
      { id: "5.5", title: { de: "Entwicklungsstände", en: "Development levels", it: "Livelli di sviluppo" }, dur: "4 Min", type: "entwicklung" },
      { id: "5.6", title: { de: "Die Steuer Basics", en: "Tax basics", it: "Le basi fiscali" }, dur: "4 Min", type: "steuer" },
      { id: "5.7", title: { de: "Der Barcode für deine Investments", en: "The barcode for your investments", it: "Il codice a barre per i tuoi investimenti" }, dur: "3 Min", type: "isin" },
      { id: "5.8", title: { de: "Freistellungsauftrag", en: "Tax exemption order", it: "Ordine di esenzione fiscale" }, dur: "3 Min", type: "freistellung" },
    ],
    transition: {
      heading: { de: "Du kannst ETFs jetzt selbst beurteilen", en: "You can now assess ETFs yourself", it: "Ora puoi valutare gli ETF da solo" },
      changes: {
        de: ["Du weißt, worauf du bei der ETF-Auswahl achten musst", "Du verstehst Kosten, Währungsrisiko und Steuer", "Du kannst ETFs mit WKN und ISIN eindeutig identifizieren"],
        en: ["You know what to look for when selecting ETFs", "You understand costs, currency risk and taxes", "You can uniquely identify ETFs with WKN and ISIN"],
        it: ["Sai cosa cercare nella selezione degli ETF", "Capisci costi, rischio valutario e tasse", "Puoi identificare univocamente gli ETF con WKN e ISIN"],
      },
      nextTeaser: { de: "Jetzt lernst du eine weitere Anlageklasse kennen – Anleihen.", en: "Now you'll learn about another asset class – bonds.", it: "Ora conoscerai un'altra classe di attività – le obbligazioni." },
    },
  },
  {
    id: 6,
    title: { de: "Investiere in Anleihen", en: "Invest in bonds", it: "Investi in obbligazioni" },
    tag: { de: "In Anleihen investieren", en: "Investing in bonds", it: "Investire in obbligazioni" },
    color: "#8c1a0d", icon: "📋",
    desc: { de: "Lern, wie Anleihen funktionieren und wie du Schwankungen in deinem Portfolio reduzierst.", en: "Learn how bonds work and how to reduce volatility in your portfolio.", it: "Impara come funzionano le obbligazioni e come ridurre la volatilità nel tuo portafoglio." },
    modules: [
      { id: "6.1", title: { de: "Die Wichtigkeit deines Anlagezeitraums", en: "The importance of your investment horizon", it: "L'importanza del tuo orizzonte d'investimento" }, dur: "4 Min", type: "zeithorizont" },
      { id: "6.2", title: { de: "Anleihen", en: "Bonds", it: "Obbligazioni" }, dur: "5 Min", type: "anleihen" },
      { id: "6.3", title: { de: "Anleihen-Ratings", en: "Bond ratings", it: "Rating obbligazionari" }, dur: "3 Min", type: "ratings" },
      { id: "6.4", title: { de: "Der Unterschied zwischen Staats- und Unternehmensanleihen", en: "Government vs. corporate bonds", it: "Obbligazioni governative vs. societarie" }, dur: "4 Min", type: "anleihenarten" },
      { id: "6.5", title: { de: "Das 60/40 Portfolio", en: "The 60/40 portfolio", it: "Il portafoglio 60/40" }, dur: "4 Min", type: "portfolio6040" },
    ],
    transition: {
      heading: { de: "Du hast Anleihen in dein Portfolio integriert", en: "You've integrated bonds into your portfolio", it: "Hai integrato le obbligazioni nel tuo portafoglio" },
      changes: {
        de: ["Du verstehst, wie Anleihen dein Portfolio stabilisieren", "Du kennst den Unterschied zwischen Staats- und Unternehmensanleihen", "Du weißt, was ein 60/40 Portfolio ist"],
        en: ["You understand how bonds stabilize your portfolio", "You know the difference between government and corporate bonds", "You know what a 60/40 portfolio is"],
        it: ["Capisci come le obbligazioni stabilizzano il tuo portafoglio", "Conosci la differenza tra obbligazioni governative e societarie", "Sai cos'è un portafoglio 60/40"],
      },
      nextTeaser: { de: "Im nächsten Level personalisierst du deine Investments nach Regionen und Branchen.", en: "In the next level, you'll personalize your investments by regions and sectors.", it: "Nel prossimo livello, personalizzerai i tuoi investimenti per regioni e settori." },
    },
  },
  {
    id: 7,
    title: { de: "Personalisiere deine Investments", en: "Personalize your investments", it: "Personalizza i tuoi investimenti" },
    tag: { de: "In spezifische Regionen investieren", en: "Invest in specific regions", it: "Investire in regioni specifiche" },
    color: Q.warning, icon: "🌍",
    desc: { de: "Investiere gezielt in Regionen, Länder und Branchen die du kennst und verstehst.", en: "Invest specifically in regions, countries and sectors you know and understand.", it: "Investi specificamente in regioni, paesi e settori che conosci e capisci." },
    modules: [
      { id: "7.1", title: { de: "Regionen", en: "Regions", it: "Regioni" }, dur: "4 Min", type: "regionen" },
      { id: "7.2", title: { de: "Länder", en: "Countries", it: "Paesi" }, dur: "4 Min", type: "laender" },
      { id: "7.3", title: { de: "Industrien", en: "Industries", it: "Industrie" }, dur: "4 Min", type: "industrien" },
      { id: "7.4", title: { de: "Die bekanntesten ETFs", en: "The most well-known ETFs", it: "Gli ETF più conosciuti" }, dur: "4 Min", type: "topetfs" },
    ],
    transition: {
      heading: { de: "Du investierst jetzt gezielt und bewusst", en: "You now invest purposefully and consciously", it: "Ora investi in modo mirato e consapevole" },
      changes: {
        de: ["Du weißt, wie du Regionen und Länder in dein Portfolio einbaust", "Du kennst die bekanntesten Indizes weltweit", "Du diversifizierst intelligent ohne den Überblick zu verlieren"],
        en: ["You know how to include regions and countries in your portfolio", "You know the most well-known indices worldwide", "You diversify intelligently without losing track"],
        it: ["Sai come includere regioni e paesi nel tuo portafoglio", "Conosci gli indici più famosi al mondo", "Diversifichi intelligentemente senza perdere il controllo"],
      },
      nextTeaser: { de: "Im letzten Level investierst du wie ein Profi – Rohstoffe, Gold und mehr.", en: "In the final level, you invest like a pro – commodities, gold and more.", it: "Nell'ultimo livello, investi come un professionista – materie prime, oro e altro." },
    },
  },
  {
    id: 8,
    title: { de: "Investiere wie ein Profi", en: "Invest like a pro", it: "Investi come un professionista" },
    tag: { de: "Investiere wie ein Profi", en: "Invest like a pro", it: "Investi come un professionista" },
    color: "#1a1a1a", icon: "🏆",
    desc: { de: "Rohstoffe, Gold, Immobilien und die besten Profi-Portfolios – jetzt alles zusammen.", en: "Commodities, gold, real estate and the best professional portfolios – all together now.", it: "Materie prime, oro, immobili e i migliori portafogli professionali – ora tutto insieme." },
    modules: [
      { id: "8.1", title: { de: "Rohstoffe", en: "Commodities", it: "Materie prime" }, dur: "4 Min", type: "rohstoffe" },
      { id: "8.2", title: { de: "Gold", en: "Gold", it: "Oro" }, dur: "4 Min", type: "gold" },
      { id: "8.3", title: { de: "Allwetter-Portfolio (Dalio)", en: "All-weather portfolio (Dalio)", it: "Portafoglio all-weather (Dalio)" }, dur: "4 Min", type: "allwetter" },
      { id: "8.4", title: { de: "Immobilien / REITs", en: "Real estate / REITs", it: "Immobili / REIT" }, dur: "4 Min", type: "reits" },
      { id: "8.5", title: { de: "Weltportfolio (Kommer)", en: "World portfolio (Kommer)", it: "Portafoglio mondiale (Kommer)" }, dur: "4 Min", type: "weltportfolio" },
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
const cardSt = { background: Q.white, borderRadius: "16px", border: `1px solid ${Q.deepBlue10}`, padding: 24 };
const bgSt = { background: Q.electricBlueLight, borderRadius: "14px", padding: 20 };

function Merke({ text, lang }) {
  const prefix = { de: "Merke dir", en: "Remember", it: "Ricorda" }[lang] || "Merke dir";
  return (
    <div style={{ background: `linear-gradient(135deg, ${Q.electricBlue}08, ${Q.purple}0A)`, border: `1.5px solid ${Q.electricBlue}22`, borderRadius: Q.radiusSm, padding: "18px 20px", display: "flex", gap: 14, alignItems: "flex-start" }}>
      <span style={{ fontSize: 18, flexShrink: 0, marginTop: 1 }}>💡</span>
      <div>
        <div style={{ fontWeight: 800, fontSize: 11, color: Q.electricBlue, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>{prefix}</div>
        <p style={{ fontSize: 14, lineHeight: 1.55, color: Q.deepBlue, margin: 0 }}>{text}</p>
      </div>
    </div>
  );
}

function DoneBtn({ onClick, lang }) {
  const [h, setH] = useState(false);
  const label = { de: "Modul abschließen ✓", en: "Complete module ✓", it: "Completa modulo ✓" }[lang] || "Modul abschließen ✓";
  return (
    <button onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ width: "100%", padding: "16px 24px", borderRadius: Q.radiusPill, border: "none",
        background: h ? Q.electricBlueHover : Q.electricBlue, color: Q.white, fontWeight: 700, fontSize: 15,
        cursor: "pointer", transition: "all .2s", letterSpacing: -0.2,
        boxShadow: h ? `0 0 0 4px ${Q.electricBlueLight}` : "0 4px 20px rgba(62,46,255,0.25)" }}>
      {label}
    </button>
  );
}

// ─── DEEP LINK MODAL ───
function DeepLinkModal({ deepLinkKey, lang, onClose }) {
  const dl = DEEP_LINKS[deepLinkKey];
  const ui = {
    de: { badge: "Beatvest Kurs → UniCredit App", context: "Du hast gerade alles Wichtige gelernt.", landing: "Hier wärst du in der UniCredit App gelandet:", back: "← Zurück zum Kurs", partnerLabel: "Enterprise Partner Konfiguration", partnerNote: "Dieser Deep Link wird vom Enterprise Partner konfiguriert und führt Nutzer direkt an die passende Stelle in der App.", mockItems: ["Depot auswählen", "Betrag eingeben", "Auftrag bestätigen"] },
    en: { badge: "Beatvest Course → UniCredit App", context: "You've just learned everything important.", landing: "This is where you'd land in the UniCredit app:", back: "← Back to course", partnerLabel: "Enterprise Partner Configuration", partnerNote: "This deep link is configured by the enterprise partner and takes users directly to the right place in the app.", mockItems: ["Select depot", "Enter amount", "Confirm order"] },
    it: { badge: "Corso Beatvest → App UniCredit", context: "Hai appena imparato tutto l'essenziale.", landing: "Qui saresti atterrato nell'app UniCredit:", back: "← Torna al corso", partnerLabel: "Configurazione Enterprise Partner", partnerNote: "Questo deep link è configurato dal partner enterprise e porta gli utenti direttamente al posto giusto nell'app.", mockItems: ["Seleziona deposito", "Inserisci importo", "Conferma ordine"] },
  }[lang] || { badge:"", context:"", landing:"", back:"Back", partnerLabel:"", partnerNote:"", mockItems:[] };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 300, background: Q.pageBg, fontFamily: Q.font, overflowY: "auto" }}>

      {/* ── Simulated UniCredit header ── */}
      <div style={{ background: Q.white, borderBottom: `1px solid ${Q.divider}`, padding: "52px 20px 14px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 24, color: Q.deepBlue, padding: "2px 6px", lineHeight: 1 }}>‹</button>
        <img src="/unicredit-logo.png" alt="UniCredit" style={{ height: 26, width: "auto" }} />
        <div style={{ width: 36 }} />
      </div>

      <div style={{ maxWidth: 520, margin: "0 auto", padding: "20px 20px 48px" }}>

        {/* ── Context banner ── */}
        <div style={{ background: Q.electricBlueLight, borderLeft: `3px solid ${Q.electricBlue}`, borderRadius: "0 12px 12px 0", padding: "14px 16px", marginBottom: 24 }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: Q.electricBlue, textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>{ui.badge}</div>
          <div style={{ fontSize: 13, color: Q.deepBlue, lineHeight: 1.5 }}>{ui.context}</div>
          <div style={{ fontSize: 13, fontWeight: 600, color: Q.deepBlue, marginTop: 4 }}>{ui.landing}</div>
        </div>

        {/* ── Simulated app screen ── */}
        <div style={{ background: Q.white, borderRadius: 22, border: `1px solid ${Q.divider}`, overflow: "hidden", boxShadow: "0 12px 40px rgba(0,0,0,0.10)", marginBottom: 20 }}>

          {/* Mock status bar */}
          <div style={{ background: "#f7f7f7", padding: "8px 18px 6px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1px solid ${Q.divider}` }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: Q.deepBlue }}>9:41</span>
            <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
              <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#E2001A" }} />
              <span style={{ fontSize: 10, fontWeight: 700, color: Q.deepBlue }}>UniCredit</span>
            </div>
            <span style={{ fontSize: 11, color: Q.neutralDark }}>●●●</span>
          </div>

          {/* Mock app page header */}
          <div style={{ padding: "18px 20px 14px", borderBottom: `1px solid ${Q.divider}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: Q.electricBlueLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>{dl.icon}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 17, color: Q.deepBlue }}>{dl.screen[lang]}</div>
                <div style={{ fontSize: 12, color: Q.neutralDark }}>{dl.screenSub[lang]}</div>
              </div>
            </div>
          </div>

          {/* Mock content */}
          <div style={{ padding: "18px 20px" }}>
            <div style={{ fontSize: 13, color: Q.deepBlue, lineHeight: 1.6, marginBottom: 18 }}>{dl.hint[lang]}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {ui.mockItems.map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 0", borderBottom: i < ui.mockItems.length - 1 ? `1px solid ${Q.divider}` : "none" }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: Q.electricBlueLight, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ fontWeight: 700, fontSize: 12, color: Q.electricBlue }}>{i + 1}</span>
                  </div>
                  <span style={{ fontSize: 14, color: Q.deepBlue, fontWeight: 500 }}>{item}</span>
                  <span style={{ marginLeft: "auto", color: Q.electricBlue, fontSize: 18 }}>›</span>
                </div>
              ))}
            </div>
          </div>

          {/* Mock CTA inside the app screen */}
          <div style={{ padding: "4px 20px 20px" }}>
            <div style={{ width: "100%", padding: "15px", borderRadius: Q.radiusPill, background: Q.electricBlue, color: "#fff", fontWeight: 700, fontSize: 14, textAlign: "center" }}>
              {dl.cta[lang]}
            </div>
          </div>
        </div>

        {/* ── Partner config note ── */}
        <div style={{ background: "#fffbeb", borderRadius: 12, border: "1px solid #fde68a", padding: "14px 16px", marginBottom: 24 }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: "#92400e", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 6 }}>⚙ {ui.partnerLabel}</div>
          <div style={{ fontSize: 12, color: "#78350f", lineHeight: 1.55, marginBottom: 8 }}>{ui.partnerNote}</div>
          <div style={{ fontSize: 11, color: "#a16207", fontFamily: "monospace", background: "#fef9c3", padding: "6px 10px", borderRadius: 6, wordBreak: "break-all" }}>
            Deep Link URL: {dl.url}
          </div>
        </div>

        {/* ── Back button ── */}
        <button onClick={onClose} style={{ width: "100%", padding: "15px", borderRadius: Q.radiusPill, border: `1.5px solid ${Q.deepBlue10}`, background: "transparent", color: Q.deepBlue, fontWeight: 600, fontSize: 15, cursor: "pointer", fontFamily: Q.font }}>
          {ui.back}
        </button>
      </div>
    </div>
  );
}

// ─── ACTION BUTTON ───
// variant="pill"  → inline in Modulen (teal pill)
// variant="card"  → am Level-Abschluss (dunkle Navy-Karte mit UniCredit-Branding)
function ActionBtn({ deepLinkKey, lang, variant = "pill" }) {
  const [open, setOpen] = useState(false);
  const dl = DEEP_LINKS[deepLinkKey];
  const cardLabel = {
    de: "Direkt in der UniCredit App",
    en: "Directly in the UniCredit App",
    it: "Direttamente nell'app UniCredit",
  }[lang];

  return (
    <>
      {variant === "pill" ? (
        <button onClick={() => setOpen(true)} style={{
          width: "100%", padding: "17px 24px", borderRadius: Q.radiusPill, border: "none",
          background: Q.electricBlue, color: "#fff", fontWeight: 700, fontSize: 15,
          cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
          fontFamily: Q.font, letterSpacing: 0.1,
        }}>
          <span style={{ fontSize: 20 }}>{dl.icon}</span>
          {dl.label[lang]}
        </button>
      ) : (
        <button onClick={() => setOpen(true)} style={{
          width: "100%", padding: "20px 22px", borderRadius: 20, border: "none",
          background: "#0D2137", color: "#fff",
          cursor: "pointer", display: "flex", alignItems: "center", gap: 16,
          fontFamily: Q.font, textAlign: "left",
          boxShadow: "0 8px 28px rgba(0,0,0,0.18)",
        }}>
          {/* Left: text */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <div style={{ background: "#fff", borderRadius: 6, padding: "3px 8px", display: "inline-flex", alignItems: "center" }}>
                <img src="/unicredit-logo.png" alt="UniCredit" style={{ height: 16, width: "auto" }} />
              </div>
              <span style={{ fontSize: 10, fontWeight: 700, color: Q.cyan, textTransform: "uppercase", letterSpacing: 1 }}>{cardLabel}</span>
            </div>
            <div style={{ fontSize: 17, fontWeight: 700, color: "#fff", lineHeight: 1.25, marginBottom: 5 }}>{dl.label[lang]}</div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", lineHeight: 1.45 }}>
              {dl.screenSub[lang]} · {dl.screen[lang]}
            </div>
          </div>
          {/* Right: icon circle + arrow */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, flexShrink: 0 }}>
            <div style={{ width: 48, height: 48, borderRadius: "50%", background: Q.electricBlue, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>
              {dl.icon}
            </div>
            <span style={{ fontSize: 18, color: Q.cyan }}>›</span>
          </div>
        </button>
      )}
      {open && <DeepLinkModal deepLinkKey={deepLinkKey} lang={lang} onClose={() => setOpen(false)} />}
    </>
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

// ─── LANGUAGE SWITCHER ───
function LangSwitcher({ lang, setLang }) {
  return (
    <div style={{ display: "flex", gap: 4 }}>
      {["de", "en", "it"].map(l => (
        <button key={l} onClick={() => setLang(l)}
          style={{
            padding: "4px 9px", borderRadius: Q.radiusPill, fontSize: 11, fontWeight: 600,
            cursor: "pointer", transition: "all .15s", letterSpacing: 0.5, textTransform: "uppercase",
            border: lang === l ? `1.5px solid ${Q.electricBlue}` : `1.5px solid ${Q.deepBlue10}`,
            background: lang === l ? Q.electricBlueLight : "transparent",
            color: lang === l ? Q.electricBlue : Q.neutralDark,
          }}>
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

// ─── MODULE RENDER FUNCTIONS ───

// 1.1 Rentenlücke
function RentenlückeMod({ onDone, lang }) {
  const c = {
    de: {
      title: "Hier lernst du, warum du in der Rente zu wenig Geld haben wirst",
      p1: "Bestimmt warst du auch schon das ein oder andere Mal von deinem Job oder der Uni genervt und hast dir dann ganz romantisch deine Rente mit Cocktail am Pool vorgestellt. Aber wird es zukünftig für unsere Generation noch so ohne weiteres möglich sein, diesen Lebensstandard im Alter zu erzielen?",
      p2: "Die einfache Antwort lautet: 'Nein!'. Das Geld, welches du heute jeden Monat für die Rente einzahlst, zahlst du nicht für deine eigene ein. Stattdessen wird dein Geld für die aktuellen Rentner verwendet. Du bist in deiner Rente also auf das Geld angewiesen, welches die Arbeitnehmer dann in Zukunft einzahlen.",
      p3: "Und dadurch, dass die Bevölkerung immer älter wird, zahlen immer weniger Arbeitnehmer ein. Auch heute schon bekommen Zwanzig Prozent der deutschen Rentner weniger als Fünfhundert Euro monatlich ausgezahlt. Eine der wenigen Optionen der Rentenlücke entgegenzuwirken ist es, mit dem Investieren zu starten.",
      merke: "Die Gesellschaft wird immer älter. Die gesetzliche Rente wird wahrscheinlich nicht mehr zum Überleben reichen. Das Investieren ist eine der wenigen Möglichkeiten die Lücke zu schließen.",
    },
    en: {
      title: "Here you'll learn why you'll have too little money in retirement",
      p1: "You've probably been frustrated with your job or university at some point and dreamily imagined your retirement by a pool with cocktails. But will it still be possible for our generation to achieve that standard of living in old age?",
      p2: "The simple answer is: \"No!\" The money you pay into the pension system each month isn't going into your own pension. Instead, it's used to pay current retirees. In retirement, you'll depend on the money that future workers will pay in.",
      p3: "And as the population ages, fewer and fewer workers are paying in. Even today, 20% of retirees receive less than €500 per month. One of the few ways to close the pension gap is to start investing.",
      merke: "Society is aging. The state pension will likely no longer be enough to live on. Investing is one of the few ways to close the gap.",
    },
    it: {
      title: "Qui impari perché avrai troppo poco denaro in pensione",
      p1: "Probabilmente ti sei già annoiato del lavoro o dell'università e hai immaginato romanticamente la tua pensione in piscina con i cocktail. Ma sarà ancora possibile per la nostra generazione raggiungere quello standard di vita in età avanzata?",
      p2: "La risposta semplice è: 'No!' I soldi che paghi ogni mese nel sistema pensionistico non vanno nella tua pensione. Vengono invece usati per pagare i pensionati attuali. In pensione dipenderai dai soldi che i futuri lavoratori pagheranno.",
      p3: "E poiché la popolazione invecchia, sempre meno lavoratori contribuiscono. Già oggi il 20% dei pensionati riceve meno di 500€ al mese. Uno dei pochi modi per colmare il divario pensionistico è iniziare a investire.",
      merke: "La società sta invecchiando. La pensione statale probabilmente non basterà più per vivere. Investire è uno dei pochi modi per colmare il divario.",
    },
  }[lang];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
      <div style={bgSt}>
        <SubHead>{c.title}</SubHead>
        <Para>{c.p1}</Para>
        <Para>{c.p2}</Para>
        <Para>{c.p3}</Para>
      </div>
      <Merke text={c.merke} lang={lang} />
      <DoneBtn onClick={onDone} lang={lang} />
    </div>
  );
}

// ─── INTERACTIVE MODULES ───
function InflationMod({ onDone, lang }) {
  const [cash, setCash] = useState(20000);
  const [inflation, setInflation] = useState(2);

  const r = inflation / 100;
  const v10 = Math.round(cash * Math.pow(1 - r, 10));
  const v20 = Math.round(cash * Math.pow(1 - r, 20));
  const v30 = Math.round(cash * Math.pow(1 - r, 30));
  const loss = cash - v30;
  const lossPct = Math.round((loss / cash) * 100);

  const c = {
    de: {
      title: "Hier lernst du, warum du jetzt anfangen solltest dein Geld zu schützen",
      p1: "Du hast sicher bemerkt, dass Dinge immer teurer werden. Die Europäische Zentralbank versucht, die Inflation bei ungefähr 2% pro Jahr zu halten. Dadurch verliert dein Geld an Wert. Historisch gesehen hättest du mit einer Investition in den MSCI World über die letzten 15 Jahre hinweg 8% pro Jahr Plus gemacht.",
      p2: "Stell dir vor, du hast heute 20.000 Euro auf deinem Konto. Du sparst eisern und rührst das Geld nicht an. In 30 Jahren schaust du auf dein Konto es stehen immer noch 20.000 Euro drauf. Klingt gut? Hier ist die unbequeme Wahrheit:",
      p2b: "Für diese 20.000 Euro kannst du dir in 30 Jahren deutlich weniger leisten als heute.",
      inflTitle: "Was Inflation bedeutet",
      p3: "Inflation bedeutet, dass die Preise im Laufe der Zeit steigen. Die Europäische Zentralbank (EZB) hat das Ziel, die jährliche Preissteigerung bei rund 2 Prozent zu halten. Klingt wenig. Die Langzeitwirkung ist aber enorm.",
      goodNewsTitle: "Die gute Nachricht",
      p4: "Inflation ist kein Naturgesetz, dem du machtlos ausgeliefert bist. Breit gestreute Aktienanlagen haben in den letzten Jahrzehnten durchschnittlich 7–8 % pro Jahr erzielt weit mehr als die Inflationsrate. Wer investiert, gleicht die Inflation nicht nur aus, sondern baut darüber hinaus Vermögen auf.",
      calcTitle: "💸 Was ist dein Geld in 30 Jahren noch wert?",
      cashLabel: "Dein Cash-Vermögen heute",
      inflLabel: "Jährliche Inflation",
      milestones: ["Heute", "In 10 Jahren", "In 20 Jahren", "In 30 Jahren"],
      lossLabel: "Kaufkraftverlust",
      inYears: "in 30 Jahren",
      powerLabel: "Reale Kaufkraft",
      ofToday: "vom heutigen Wert",
      dynamicNote: (c, v) => `Dein Kontostand zeigt weiterhin ${c.toLocaleString("de-DE")} € aber du kannst dir nur noch Dinge im Wert von `,
      dynamicNote2: " dafür kaufen.",
      quizQ: "10.000 € auf dem Konto wie viel Kaufkraft bleibt in 20 Jahren?",
      quizOpts: [{ text: "10.000 €", correct: false }, { text: "ca. 6.700 €", correct: true }, { text: "ca. 8.200 €", correct: false }],
      quizExp: "Richtig: ca. 6.700 €! Dein Kontostand bleibt gleich, aber du kannst dir nur noch Waren im Wert von ca. 6.700 € kaufen.",
      merke: "Dein Geld auf dem Konto verliert jedes Jahr an Kaufkraft. Je länger du wartest, desto mehr verlierst du ohne es zu merken.",
    },
    en: {
      title: "Here you'll learn why you should start protecting your money now",
      p1: "You've probably noticed that things keep getting more expensive. The European Central Bank tries to keep inflation at around 2% per year. This means your money loses value. Historically, investing in the MSCI World over the past 15 years would have earned you 8% per year.",
      p2: "Imagine you have €20,000 in your account today. You save diligently and don't touch the money. In 30 years you look at your account – it still shows €20,000. Sounds good? Here's the uncomfortable truth:",
      p2b: "In 30 years, you'll be able to afford much less with that €20,000 than you can today.",
      inflTitle: "What inflation means",
      p3: "Inflation means that prices rise over time. The European Central Bank (ECB) aims to keep annual price increases at around 2 percent. Sounds small. But the long-term effect is enormous.",
      goodNewsTitle: "The good news",
      p4: "Inflation is not a law of nature that you're powerless against. Broadly diversified equity investments have achieved an average of 7–8% per year in recent decades – far more than the inflation rate. Those who invest don't just offset inflation, they build wealth on top of it.",
      calcTitle: "💸 What will your money be worth in 30 years?",
      cashLabel: "Your cash savings today",
      inflLabel: "Annual inflation",
      milestones: ["Today", "In 10 years", "In 20 years", "In 30 years"],
      lossLabel: "Loss of purchasing power",
      inYears: "in 30 years",
      powerLabel: "Real purchasing power",
      ofToday: "of today's value",
      dynamicNote: (c, v) => `Your account still shows ${c.toLocaleString("de-DE")} € but you can only buy goods worth `,
      dynamicNote2: " with it.",
      quizQ: "€10,000 in your account – how much purchasing power remains in 20 years?",
      quizOpts: [{ text: "€10,000", correct: false }, { text: "approx. €6,700", correct: true }, { text: "approx. €8,200", correct: false }],
      quizExp: "Correct: approx. €6,700! Your account balance stays the same, but you can only buy goods worth approx. €6,700.",
      merke: "Your money in the account loses purchasing power every year. The longer you wait, the more you lose without noticing.",
    },
    it: {
      title: "Qui impari perché dovresti iniziare a proteggere il tuo denaro ora",
      p1: "Hai sicuramente notato che le cose diventano sempre più costose. La Banca Centrale Europea cerca di mantenere l'inflazione intorno al 2% annuo. Questo significa che il tuo denaro perde valore. Storicamente, investendo nell'MSCI World negli ultimi 15 anni avresti guadagnato l'8% annuo.",
      p2: "Immagina di avere 20.000 Euro sul tuo conto oggi. Risparmi scrupolosamente e non tocchi il denaro. Tra 30 anni guardi il conto – ci sono ancora 20.000 Euro. Suona bene? Ecco la scomoda verità:",
      p2b: "Tra 30 anni, con quei 20.000 Euro potrai permetterti molto meno di quanto puoi oggi.",
      inflTitle: "Cosa significa inflazione",
      p3: "L'inflazione significa che i prezzi salgono nel tempo. La Banca Centrale Europea (BCE) ha l'obiettivo di mantenere l'aumento annuo dei prezzi intorno al 2 percento. Sembra poco. Ma l'effetto a lungo termine è enorme.",
      goodNewsTitle: "La buona notizia",
      p4: "L'inflazione non è una legge di natura contro cui sei impotente. Gli investimenti azionari ampiamente diversificati hanno ottenuto in media il 7–8% annuo negli ultimi decenni – ben oltre il tasso di inflazione. Chi investe non solo compensa l'inflazione, ma costruisce anche patrimonio.",
      calcTitle: "💸 Quanto varrà il tuo denaro tra 30 anni?",
      cashLabel: "Il tuo patrimonio in contanti oggi",
      inflLabel: "Inflazione annuale",
      milestones: ["Oggi", "Tra 10 anni", "Tra 20 anni", "Tra 30 anni"],
      lossLabel: "Perdita del potere d'acquisto",
      inYears: "tra 30 anni",
      powerLabel: "Potere d'acquisto reale",
      ofToday: "del valore attuale",
      dynamicNote: (c, v) => `Il tuo saldo mostra ancora ${c.toLocaleString("de-DE")} € ma puoi permetterti solo beni del valore di `,
      dynamicNote2: " con esso.",
      quizQ: "10.000 € sul conto – quanto potere d'acquisto rimane tra 20 anni?",
      quizOpts: [{ text: "10.000 €", correct: false }, { text: "circa 6.700 €", correct: true }, { text: "circa 8.200 €", correct: false }],
      quizExp: "Corretto: circa 6.700 €! Il saldo del tuo conto rimane invariato, ma puoi permetterti solo beni del valore di circa 6.700 €.",
      merke: "Il tuo denaro sul conto perde potere d'acquisto ogni anno. Più aspetti, più perdi senza accorgertene.",
    },
  }[lang];

  const milestones = [
    { label: c.milestones[0], value: cash, years: 0 },
    { label: c.milestones[1], value: v10, years: 10 },
    { label: c.milestones[2], value: v20, years: 20 },
    { label: c.milestones[3], value: v30, years: 30 },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
      <div style={bgSt}>
        <SubHead>{c.title}</SubHead>
        <Para>{c.p1}</Para>
        <Para>{c.p2} <strong>{c.p2b}</strong></Para>
        <SubHead>{c.inflTitle}</SubHead>
        <Para>{c.p3}</Para>
        <SubHead>{c.goodNewsTitle}</SubHead>
        <Para>{c.p4}</Para>
      </div>

      <div style={{ background: "#F6F7F8", borderRadius: 20, padding: 20 }}>
        <p style={{ fontWeight: 800, fontSize: 15, color: Q.deepBlue, margin: "0 0 16px" }}>{c.calcTitle}</p>
        <Sld label={c.cashLabel} min={1000} max={200000} step={1000} value={cash} onChange={setCash} unit=" €" />
        <Sld label={c.inflLabel} min={1} max={5} step={0.5} value={inflation} onChange={setInflation} unit=" %" />

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
                  <div style={{ height: "100%", borderRadius: 6, width: `${pct}%`, background: isToday ? Q.electricBlue : pct < 70 ? Q.danger : "#f59e0b", transition: "width .4s cubic-bezier(.4,0,.2,1)" }} />
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: 16, display: "flex", gap: 10 }}>
          <div style={{ flex: 1, background: Q.dangerBg, border: `1.5px solid ${Q.danger}22`, borderRadius: 14, padding: "14px 16px", textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: Q.danger, textTransform: "uppercase", letterSpacing: 0.4, marginBottom: 4 }}>{c.lossLabel}</div>
            <div style={{ fontWeight: 900, fontSize: 22, color: Q.danger }}>−{loss.toLocaleString("de-DE")} €</div>
            <div style={{ fontSize: 11, color: Q.neutralDark, marginTop: 2 }}>{c.inYears}</div>
          </div>
          <div style={{ flex: 1, background: "#fff3e0", border: "1.5px solid #f59e0b22", borderRadius: 14, padding: "14px 16px", textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#92400e", textTransform: "uppercase", letterSpacing: 0.4, marginBottom: 4 }}>{c.powerLabel}</div>
            <div style={{ fontWeight: 900, fontSize: 22, color: "#92400e" }}>{100 - lossPct} %</div>
            <div style={{ fontSize: 11, color: Q.neutralDark, marginTop: 2 }}>{c.ofToday}</div>
          </div>
        </div>
        <div style={{ marginTop: 12, fontSize: 12, color: Q.neutralDark, lineHeight: 1.55, textAlign: "center" }}>
          {c.dynamicNote(cash, v30)}<strong style={{ color: Q.danger }}>{v30.toLocaleString("de-DE")} €</strong>{c.dynamicNote2}
        </div>
      </div>

      <Quiz question={c.quizQ} options={c.quizOpts} explanation={c.quizExp} onAnswer={() => {}} />
      <Merke text={c.merke} lang={lang} />
      <DoneBtn onClick={onDone} lang={lang} />
    </div>
  );
}

function CompoundMod({ onDone, lang }) {
  const [m, setM] = useState(100);
  const [y, setY] = useState(30);
  const invested = m * 12 * y;
  const fv = m * ((Math.pow(1 + 0.07 / 12, y * 12) - 1) / (0.07 / 12));
  const sav = m * 12 * y * 1.005;

  const c = {
    de: {
      title: "Hier lernst du, warum es sich lohnt früh mit dem Investieren anzufangen",
      p1: "Einstein hat den Zinseszinseffekt als das 'Achte Weltwunder' beschrieben. Anna startet mit 20, ihr Bruder Lukas erst mit 30. Beide zahlen 200€ monatlich bis 60. Anna sammelt 620.000€ an, Lukas nur 270.000€.",
      p2: "Stell dir einen Schneeball vor, der einen langen Berghang hinunterrollt. Am Anfang ist er klein. Mit jeder Umdrehung nimmt er mehr Schnee auf und wird größer und je größer er wird, desto schneller wächst er. Genauso funktioniert dein Geld, wenn du investierst.",
      howTitle: "Wie der Zinseszinseffekt funktioniert",
      p3: "Wenn du Geld anlegst, erzielst du eine Rendite also einen Gewinn. Das Entscheidende: Wenn du diesen Gewinn nicht abhebst, sondern weiter investiert lässt, erzielt auch er im nächsten Jahr eine Rendite. Deine Gewinne machen neue Gewinne. Das ist der Zinseszinseffekt.",
      p4: "Ein einfaches Beispiel: Du investierst 100 € bei 5 % Rendite pro Jahr.",
      bullets: ["Jahr 1: 100 € → <strong>105 €</strong> (5 € Gewinn)", "Jahr 2: 105 € → <strong>110,25 €</strong> (5,25 € Gewinn mehr als im Jahr 1!)", "Jahr 3: 110,25 € → <strong>115,76 €</strong> (5,51 € Gewinn)"],
      p5: "Jedes Jahr arbeitet mehr Geld für dich nicht nur deine ursprüngliche Einzahlung, sondern auch alle aufgelaufenen Gewinne.",
      timingTitle: "Warum der Startzeitpunkt so entscheidend ist",
      p6: "Anna fängt mit 20 Jahren an, 200 € pro Monat zu investieren. Ihr Bruder Lukas fängt erst mit 30 an ebenfalls 200 €/Monat. Beide hören mit 60 auf. Ergebnis bei 8 % Rendite:",
      bullets2: ["Anna (40 Jahre): ca. <strong>620.000 €</strong>", "Lukas (30 Jahre): ca. <strong>270.000 €</strong>", "Lukas' 10 Jahre Verzögerung kosten über <strong>350.000 €</strong> Endvermögen"],
      p7: "Der Unterschied ist nicht Lukas' Faulheit es ist schlicht die Zeit, die fehlt, damit der Schneeball rollen kann.",
      calcTitle: "🧮 Dein persönlicher Zinseszins-Rechner",
      monthlyLabel: "Monatlich investieren",
      yearsLabel: "Wie lange?",
      savingsLabel: "💤 Sparkonto",
      investedLabel: "📈 Investiert (7 %)",
      summary: (inv, gain) => `Eingezahlt: ${inv.toLocaleString("de-DE")} € · Gewinn: +${gain.toLocaleString("de-DE")} €`,
      merke: "Je früher du anfängst, desto stärker arbeitet der Schneeball-Effekt für dich. Schon kleine Beträge werden über die Zeit zu beachtlichen Summen.",
    },
    en: {
      title: "Here you'll learn why it's worth starting to invest early",
      p1: "Einstein described the compound interest effect as the \"Eighth Wonder of the World\". Anna starts at 20, her brother Lukas not until 30. Both invest €200 monthly until 60. Anna accumulates €620,000, Lukas only €270,000.",
      p2: "Imagine a snowball rolling down a long hillside. At first it's small. With each turn it picks up more snow and grows larger – and the larger it gets, the faster it grows. That's exactly how your money works when you invest.",
      howTitle: "How compound interest works",
      p3: "When you invest money, you earn a return – a profit. The key: if you don't withdraw that profit but leave it invested, it also earns a return next year. Your profits make new profits. That's the compound interest effect.",
      p4: "A simple example: You invest €100 at 5% return per year.",
      bullets: ["Year 1: €100 → <strong>€105</strong> (€5 profit)", "Year 2: €105 → <strong>€110.25</strong> (€5.25 profit – more than year 1!)", "Year 3: €110.25 → <strong>€115.76</strong> (€5.51 profit)"],
      p5: "Each year, more money works for you – not just your original investment, but all accumulated profits too.",
      timingTitle: "Why the starting point is so crucial",
      p6: "Anna starts investing €200 per month at age 20. Her brother Lukas starts at 30 – also €200/month. Both stop at 60. Result at 8% return:",
      bullets2: ["Anna (40 years): approx. <strong>€620,000</strong>", "Lukas (30 years): approx. <strong>€270,000</strong>", "Lukas' 10-year delay costs over <strong>€350,000</strong> in final wealth"],
      p7: "The difference isn't Lukas' laziness – it's simply the time missing for the snowball to roll.",
      calcTitle: "🧮 Your personal compound interest calculator",
      monthlyLabel: "Monthly investment",
      yearsLabel: "How long?",
      savingsLabel: "💤 Savings account",
      investedLabel: "📈 Invested (7%)",
      summary: (inv, gain) => `Invested: ${inv.toLocaleString("de-DE")} € · Profit: +${gain.toLocaleString("de-DE")} €`,
      merke: "The earlier you start, the more powerfully the snowball effect works for you. Even small amounts become impressive sums over time.",
    },
    it: {
      title: "Qui impari perché vale la pena iniziare a investire presto",
      p1: "Einstein ha descritto l'effetto degli interessi composti come l'\"Ottava Meraviglia del Mondo\". Anna inizia a 20 anni, suo fratello Lukas solo a 30. Entrambi investono 200€ mensili fino a 60 anni. Anna accumula 620.000€, Lukas solo 270.000€.",
      p2: "Immagina una palla di neve che rotola lungo un lungo pendio. All'inizio è piccola. Ad ogni giro raccoglie più neve e cresce – e più cresce, più velocemente si ingrandisce. Esattamente così funziona il tuo denaro quando investi.",
      howTitle: "Come funzionano gli interessi composti",
      p3: "Quando investi denaro, ottieni un rendimento – un profitto. La cosa fondamentale: se non ritiri quel profitto ma lo lasci investito, anche esso guadagnerà un rendimento l'anno prossimo. I tuoi profitti generano nuovi profitti. Questo è l'effetto degli interessi composti.",
      p4: "Un esempio semplice: Investi 100€ con un rendimento del 5% annuo.",
      bullets: ["Anno 1: 100€ → <strong>105€</strong> (5€ di profitto)", "Anno 2: 105€ → <strong>110,25€</strong> (5,25€ di profitto – più dell'anno 1!)", "Anno 3: 110,25€ → <strong>115,76€</strong> (5,51€ di profitto)"],
      p5: "Ogni anno lavora per te più denaro – non solo il tuo investimento originale, ma anche tutti i profitti accumulati.",
      timingTitle: "Perché il momento di inizio è così determinante",
      p6: "Anna inizia a investire 200€ al mese a 20 anni. Suo fratello Lukas inizia a 30 anni – anche lui 200€/mese. Entrambi si fermano a 60 anni. Risultato con rendimento dell'8%:",
      bullets2: ["Anna (40 anni): circa <strong>620.000€</strong>", "Lukas (30 anni): circa <strong>270.000€</strong>", "I 10 anni di ritardo di Lukas costano oltre <strong>350.000€</strong> di patrimonio finale"],
      p7: "La differenza non è la pigrizia di Lukas – è semplicemente il tempo mancante perché la palla di neve rotoli.",
      calcTitle: "🧮 Il tuo calcolatore personale di interessi composti",
      monthlyLabel: "Investimento mensile",
      yearsLabel: "Per quanto tempo?",
      savingsLabel: "💤 Conto risparmio",
      investedLabel: "📈 Investito (7%)",
      summary: (inv, gain) => `Investito: ${inv.toLocaleString("de-DE")} € · Guadagno: +${gain.toLocaleString("de-DE")} €`,
      merke: "Prima inizi, più potentemente l'effetto palla di neve lavora per te. Anche piccole somme diventano importi notevoli nel tempo.",
    },
  }[lang];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
      <div style={bgSt}>
        <SubHead>{c.title}</SubHead>
        <Para>{c.p1}</Para>
        <Para>{c.p2}</Para>
        <SubHead>{c.howTitle}</SubHead>
        <Para>{c.p3}</Para>
        <Para>{c.p4}</Para>
        <Bullets items={c.bullets} />
        <Para>{c.p5}</Para>
        <SubHead>{c.timingTitle}</SubHead>
        <Para>{c.p6}</Para>
        <Bullets items={c.bullets2} />
        <Para>{c.p7}</Para>
      </div>
      <div style={cardSt}>
        <p style={{ fontWeight: 700, color: Q.deepBlue, marginBottom: 14, fontSize: 15 }}>{c.calcTitle}</p>
        <Sld label={c.monthlyLabel} min={25} max={1000} step={25} value={m} onChange={setM} unit=" €" />
        <Sld label={c.yearsLabel} min={5} max={40} value={y} onChange={setY} unit={lang === "de" ? " Jahre" : lang === "en" ? " years" : " anni"} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 18 }}>
          <StatBox label={c.savingsLabel} value={`${Math.round(sav).toLocaleString("de-DE")} €`} bg={Q.warningBg} color="#92400e" />
          <StatBox label={c.investedLabel} value={`${Math.round(fv).toLocaleString("de-DE")} €`} bg={Q.successBg} color="#065f46" />
        </div>
        <div style={{ textAlign: "center", marginTop: 12, fontSize: 13, color: Q.neutralDark }}>
          {c.summary(invested, Math.round(fv - invested))}
        </div>
      </div>
      <Merke text={c.merke} lang={lang} />
      <DoneBtn onClick={onDone} lang={lang} />
    </div>
  );
}

// ─── NEW MODULE FUNCTIONS ───

// 2.1 Liquidity
function LiquidityMod({ onDone, lang }) {
  const c = {
    de: {
      title: "So kommst du wieder an dein Geld",
      p1: "Einer der häufigsten Einwände gegen das Investieren: 'Aber was, wenn ich das Geld plötzlich brauche?' Die gute Nachricht: Du bist nicht eingesperrt. Bei einem ETF-Sparplan kannst du jederzeit verkaufen – meist ist das Geld in 2–3 Werktagen auf deinem Konto.",
      p2: "Es gibt keine Mindestlaufzeit und keine Strafe für vorzeitigen Ausstieg. Wichtig: Halte immer einen Notgroschen (3–6 Monatsgehälter) auf dem Tagesgeldkonto – für echte Notfälle. Alles darüber hinaus kann investiert werden.",
      merke: "Dein investiertes Geld ist nicht 'weg' – es ist jederzeit zugänglich. Plane trotzdem mit einem Notgroschen.",
    },
    en: {
      title: "How to access your money",
      p1: "One of the most common objections to investing: \"But what if I suddenly need the money?\" The good news: you're not locked in. With an ETF savings plan, you can sell at any time – the money is usually in your account within 2–3 business days.",
      p2: "There's no minimum holding period and no penalty for early exit. Important: always keep an emergency fund (3–6 months' salary) in a instant-access account – for real emergencies. Everything beyond that can be invested.",
      merke: "Your invested money isn't \"gone\" – it's accessible at any time. Still, plan with an emergency fund.",
    },
    it: {
      title: "Come accedere al tuo denaro",
      p1: "Una delle obiezioni più comuni agli investimenti: 'Ma cosa succede se ho improvvisamente bisogno dei soldi?' La buona notizia: non sei bloccato. Con un piano di risparmio ETF, puoi vendere in qualsiasi momento – il denaro è solitamente sul tuo conto entro 2–3 giorni lavorativi.",
      p2: "Non c'è un periodo di detenzione minimo e nessuna penale per uscita anticipata. Importante: mantieni sempre un fondo di emergenza (3–6 mesi di stipendio) su un conto ad accesso immediato – per le vere emergenze. Tutto il resto può essere investito.",
      merke: "Il tuo denaro investito non è 'perso' – è accessibile in qualsiasi momento. Pianifica comunque con un fondo di emergenza.",
    },
  }[lang];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
      <div style={bgSt}>
        <SubHead>{c.title}</SubHead>
        <Para>{c.p1}</Para>
        <Para>{c.p2}</Para>
      </div>
      <Merke text={c.merke} lang={lang} />
      <DoneBtn onClick={onDone} lang={lang} />
    </div>
  );
}

// 2.2 Security
function SecurityMod({ onDone, lang }) {
  const c = {
    de: {
      title: "Maximaler Schutz für dein Konto und deine Identität",
      p1: "Bevor du investierst, wirst du identifiziert – das ist gesetzlich vorgeschrieben und schützt dich. Das VideoIdent-Verfahren dauert nur wenige Minuten: Du zeigst deinen Personalausweis vor einer Kamera. Warum? Um Geldwäsche zu verhindern und sicherzustellen, dass niemand auf deinen Namen ein Konto eröffnen kann.",
      p2: "Zusätzlich: Aktiviere immer die Zwei-Faktor-Authentifizierung (2FA) für dein Depot. Nutze ein sicheres, einzigartiges Passwort. Teile niemals deine Zugangsdaten – auch nicht mit vermeintlichen Bankberatern am Telefon.",
      merke: "Die Identitätsprüfung schützt dich. 2FA und ein sicheres Passwort sind Pflicht.",
    },
    en: {
      title: "Maximum protection for your account and identity",
      p1: "Before you invest, you'll be identified – this is required by law and protects you. The VideoIdent process takes only a few minutes: you show your ID in front of a camera. Why? To prevent money laundering and ensure that nobody can open an account in your name.",
      p2: "Additionally: always activate two-factor authentication (2FA) for your account. Use a secure, unique password. Never share your login details – not even with supposed bank advisors on the phone.",
      merke: "Identity verification protects you. 2FA and a secure password are essential.",
    },
    it: {
      title: "Protezione massima per il tuo conto e la tua identità",
      p1: "Prima di investire, verrai identificato – è richiesto dalla legge e ti protegge. Il processo VideoIdent dura solo pochi minuti: mostri il tuo documento d'identità davanti a una telecamera. Perché? Per prevenire il riciclaggio di denaro e garantire che nessuno possa aprire un conto a tuo nome.",
      p2: "Inoltre: attiva sempre l'autenticazione a due fattori (2FA) per il tuo conto. Usa una password sicura e unica. Non condividere mai le tue credenziali – nemmeno con presunti consulenti bancari al telefono.",
      merke: "La verifica dell'identità ti protegge. 2FA e una password sicura sono essenziali.",
    },
  }[lang];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
      <div style={bgSt}>
        <SubHead>{c.title}</SubHead>
        <Para>{c.p1}</Para>
        <Para>{c.p2}</Para>
      </div>
      <Merke text={c.merke} lang={lang} />
      <DoneBtn onClick={onDone} lang={lang} />
    </div>
  );
}

// 2.3 Safety
function SafetyMod({ onDone, lang }) {
  const c = {
    de: {
      title: "Wie sicher ist dein Geld",
      p1: "'Was passiert mit meinen ETFs, wenn die Bank pleitegeht?' – Das ist eine der häufigsten Fragen. Die Antwort: Deine ETFs sind Sondervermögen. Das bedeutet: Sie gehören rechtlich dir – nicht der Bank, nicht dem ETF-Anbieter.",
      p2: "Selbst wenn die Depotbank morgen insolvent wäre, würden deine ETFs einfach auf ein anderes Depot übertragen. Dein Bargeld auf dem Konto ist zusätzlich durch die Einlagensicherung bis 100.000 € pro Bank geschützt.",
      quizQ: "Was passiert mit deinen ETFs wenn die Depotbank pleite geht?",
      quizOpts: [{ text: "Sie sind verloren", correct: false }, { text: "Sie werden auf ein anderes Depot übertragen – sie gehören dir", correct: true }, { text: "Sie werden halbiert", correct: false }],
      quizExp: "ETFs sind Sondervermögen und gehören rechtlich dir. Sie sind getrennt vom Vermögen der Bank verwahrt.",
      merke: "ETFs sind Sondervermögen und mehrfach abgesichert. Einlagen bis 100.000 € sind durch die gesetzliche Einlagensicherung geschützt.",
    },
    en: {
      title: "How safe is your money",
      p1: "\"What happens to my ETFs if the bank goes bankrupt?\" – This is one of the most common questions. The answer: your ETFs are special assets. This means: they legally belong to you – not the bank, not the ETF provider.",
      p2: "Even if the custodian bank were insolvent tomorrow, your ETFs would simply be transferred to another account. Your cash in your bank account is additionally protected by the deposit guarantee up to €100,000 per bank.",
      quizQ: "What happens to your ETFs if the custodian bank goes bankrupt?",
      quizOpts: [{ text: "They are lost", correct: false }, { text: "They are transferred to another account – they belong to you", correct: true }, { text: "They are halved", correct: false }],
      quizExp: "ETFs are special assets and legally belong to you. They are kept separately from the bank's assets.",
      merke: "ETFs are special assets and protected multiple times. Deposits up to €100,000 are protected by the statutory deposit guarantee.",
    },
    it: {
      title: "Quanto è sicuro il tuo denaro",
      p1: "'Cosa succede ai miei ETF se la banca fallisce?' – Questa è una delle domande più frequenti. La risposta: i tuoi ETF sono patrimoni speciali. Ciò significa: ti appartengono legalmente – non alla banca, non al provider ETF.",
      p2: "Anche se la banca depositaria fosse insolvente domani, i tuoi ETF verrebbero semplicemente trasferiti a un altro deposito. Il tuo contante sul conto è inoltre protetto dalla garanzia dei depositi fino a 100.000€ per banca.",
      quizQ: "Cosa succede ai tuoi ETF se la banca depositaria fallisce?",
      quizOpts: [{ text: "Vanno perduti", correct: false }, { text: "Vengono trasferiti a un altro deposito – ti appartengono", correct: true }, { text: "Vengono dimezzati", correct: false }],
      quizExp: "Gli ETF sono patrimoni speciali e ti appartengono legalmente. Sono mantenuti separati dagli asset della banca.",
      merke: "Gli ETF sono patrimoni speciali e protetti più volte. I depositi fino a 100.000€ sono protetti dalla garanzia dei depositi legale.",
    },
  }[lang];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
      <div style={bgSt}>
        <SubHead>{c.title}</SubHead>
        <Para>{c.p1}</Para>
        <Para>{c.p2}</Para>
      </div>
      <Quiz question={c.quizQ} options={c.quizOpts} explanation={c.quizExp} onAnswer={() => {}} />
      <Merke text={c.merke} lang={lang} />
      <ActionBtn deepLinkKey="openAccount" lang={lang} />
      <DoneBtn onClick={onDone} lang={lang} />
    </div>
  );
}

// 3.1 Aktien
function AktienMod({ onDone, lang }) {
  const c = {
    de: {
      title: "Hier lernst du, wie du dir ein kleines Stück von einem Unternehmen kaufen kannst",
      p1: "Hast du schon mal gehört, dass die Reichen immer reicher werden? Man kann wahrscheinlich behaupten, dass jeder, der reich ist, auch Aktien besitzt. Mit dem Kauf einer Aktie erwirbst du einen kleinen Teil an einem Unternehmen.",
      p2: "Der Preis jeder Aktie wird von Käufern und Verkäufern auf dem Markt bestimmt. Bei guten Nachrichten steigt der Wert der Aktie – bei schlechten fällt er. In den letzten 100 Jahren ist der Aktienmarkt als Ganzes kontinuierlich gewachsen.",
      merke: "Wenn du eine Aktie kaufst, kaufst du einen kleinen Teil des Unternehmens.",
    },
    en: {
      title: "Here you'll learn how to buy a small piece of a company",
      p1: "Have you ever heard that the rich keep getting richer? You could probably argue that everyone who is wealthy also owns stocks. When you buy a stock, you're acquiring a small part of a company.",
      p2: "The price of each stock is determined by buyers and sellers on the market. Good news makes the stock price rise – bad news makes it fall. Over the last 100 years, the stock market as a whole has grown continuously.",
      merke: "When you buy a stock, you buy a small part of the company.",
    },
    it: {
      title: "Qui impari come comprare un piccolo pezzo di un'azienda",
      p1: "Hai mai sentito che i ricchi diventano sempre più ricchi? Si potrebbe probabilmente affermare che chiunque sia ricco possieda anche azioni. Quando acquisti un'azione, acquisti una piccola parte di un'azienda.",
      p2: "Il prezzo di ogni azione è determinato da acquirenti e venditori sul mercato. Le buone notizie fanno salire il prezzo delle azioni – le cattive notizie lo fanno scendere. Negli ultimi 100 anni, il mercato azionario nel suo insieme è cresciuto continuamente.",
      merke: "Quando acquisti un'azione, acquisti una piccola parte dell'azienda.",
    },
  }[lang];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
      <div style={bgSt}>
        <SubHead>{c.title}</SubHead>
        <Para>{c.p1}</Para>
        <Para>{c.p2}</Para>
      </div>
      <Merke text={c.merke} lang={lang} />
      <DoneBtn onClick={onDone} lang={lang} />
    </div>
  );
}

// 3.2 Diversifikation
function DiversifikationMod({ onDone, lang }) {
  const c = {
    de: {
      title: "Hier lernst du wie du dein Risiko beim Investieren minimieren kannst",
      p1: "Stell dir vor, du steckst alles in VW-Aktien. Dann kommt der Abgasskandal – und dein Geld ist zur Hälfte weg. Besser wäre es gewesen, dein Geld auf viele Unternehmen, verschiedene Industrien und Märkte zu verteilen.",
      p2: "Der Fachausdruck hierfür ist Diversifikation. Kluge Investoren streuen ihr Risiko und verteilen ihr Geld auf verschiedene Branchen und Märkte. Das geht am leichtesten mit ETFs.",
      merke: "Lege nicht alle Eier in einen Korb. Verteile dein Geld auf verschiedene Produkte, Branchen und Märkte.",
    },
    en: {
      title: "Here you'll learn how to minimize your investment risk",
      p1: "Imagine you put everything into VW stocks. Then the emissions scandal hits – and half your money is gone. It would have been better to spread your money across many companies, different industries and markets.",
      p2: "The technical term for this is diversification. Smart investors spread their risk and distribute their money across various sectors and markets. This is easiest with ETFs.",
      merke: "Don't put all your eggs in one basket. Spread your money across different products, sectors and markets.",
    },
    it: {
      title: "Qui impari come minimizzare il rischio negli investimenti",
      p1: "Immagina di mettere tutto in azioni VW. Poi arriva lo scandalo delle emissioni – e metà dei tuoi soldi è persa. Sarebbe stato meglio distribuire il denaro su molte aziende, diverse industrie e mercati.",
      p2: "Il termine tecnico per questo è diversificazione. Gli investitori intelligenti distribuiscono il loro rischio e il loro denaro su vari settori e mercati. Questo è più facile con gli ETF.",
      merke: "Non mettere tutte le uova nello stesso paniere. Distribuisci il tuo denaro su diversi prodotti, settori e mercati.",
    },
  }[lang];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
      <div style={bgSt}>
        <SubHead>{c.title}</SubHead>
        <Para>{c.p1}</Para>
        <Para>{c.p2}</Para>
      </div>
      <Merke text={c.merke} lang={lang} />
      <DoneBtn onClick={onDone} lang={lang} />
    </div>
  );
}

// 3.3 ETF
function EtfMod({ onDone, lang }) {
  const c = {
    de: {
      title: "Hier lernst du, wie du mit nur wenig Aufwand diversifizieren kannst",
      p1: "Ein ETF bündelt viele verschiedene Unternehmen in einem Produkt. Mit einer einzigen Investition kannst du in bis zu 2.000 Unternehmen investieren. Der bekannteste ETF ist der MSCI World – über 1.600 Unternehmen aus 23 Ländern und 11 Branchen.",
      p2: "Es gibt auch ETFs für einzelne Länder, Branchen oder Trendthemen wie Nachhaltigkeit.",
      merke: "Ein ETF bündelt viele Unternehmen und sorgt automatisch für Diversifikation. Mit einer Investition bist du in vielen Ländern und Branchen dabei.",
    },
    en: {
      title: "Here you'll learn how to diversify with minimal effort",
      p1: "An ETF bundles many different companies in one product. With a single investment, you can invest in up to 2,000 companies. The most well-known ETF is the MSCI World – over 1,600 companies from 23 countries and 11 sectors.",
      p2: "There are also ETFs for individual countries, sectors or trend topics like sustainability.",
      merke: "An ETF bundles many companies and automatically provides diversification. With one investment, you're invested in many countries and sectors.",
    },
    it: {
      title: "Qui impari come diversificare con poco sforzo",
      p1: "Un ETF raggruppa molte aziende diverse in un unico prodotto. Con un singolo investimento, puoi investire in fino a 2.000 aziende. L'ETF più conosciuto è l'MSCI World – oltre 1.600 aziende di 23 paesi e 11 settori.",
      p2: "Esistono anche ETF per singoli paesi, settori o temi di tendenza come la sostenibilità.",
      merke: "Un ETF raggruppa molte aziende e fornisce automaticamente diversificazione. Con un investimento sei presente in molti paesi e settori.",
    },
  }[lang];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
      <div style={bgSt}>
        <SubHead>{c.title}</SubHead>
        <Para>{c.p1}</Para>
        <Para>{c.p2}</Para>
      </div>
      <Merke text={c.merke} lang={lang} />
      <DoneBtn onClick={onDone} lang={lang} />
    </div>
  );
}

// 3.4 Index
function IndexMod({ onDone, lang }) {
  const c = {
    de: {
      title: "Hier lernst du den Ursprung eines ETFs kennen",
      p1: "Einen Index kannst du dir wie eine Einkaufsliste vorstellen – zum Beispiel für Aktien oder Anleihen. Klassische Index-Anbieter sind MSCI und S&P. S&P hat zum Beispiel den S&P500 entwickelt: die 500 größten US-amerikanischen Unternehmen.",
      p2: "Du kannst einen Index nicht direkt kaufen – aber du kannst einen ETF kaufen, der ihn nachbildet. Deshalb gibt es den gleichen Index oft von verschiedenen ETF-Anbietern.",
      merke: "Ein Index ist eine festgelegte Liste von Aktien oder Anleihen. Um in einen Index zu investieren, brauchst du einen ETF, der ihn nachbildet.",
    },
    en: {
      title: "Here you'll learn about the origin of an ETF",
      p1: "You can think of an index like a shopping list – for example for stocks or bonds. Classic index providers are MSCI and S&P. S&P, for example, developed the S&P 500: the 500 largest US companies.",
      p2: "You can't buy an index directly – but you can buy an ETF that replicates it. That's why the same index is often offered by different ETF providers.",
      merke: "An index is a fixed list of stocks or bonds. To invest in an index, you need an ETF that replicates it.",
    },
    it: {
      title: "Qui conosci l'origine di un ETF",
      p1: "Puoi pensare a un indice come a una lista della spesa – ad esempio per azioni o obbligazioni. I classici fornitori di indici sono MSCI e S&P. S&P, ad esempio, ha sviluppato l'S&P 500: le 500 maggiori aziende statunitensi.",
      p2: "Non puoi acquistare un indice direttamente – ma puoi acquistare un ETF che lo replica. Ecco perché lo stesso indice è spesso offerto da diversi provider ETF.",
      merke: "Un indice è un elenco fisso di azioni o obbligazioni. Per investire in un indice, hai bisogno di un ETF che lo replica.",
    },
  }[lang];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
      <div style={bgSt}>
        <SubHead>{c.title}</SubHead>
        <Para>{c.p1}</Para>
        <Para>{c.p2}</Para>
      </div>
      <Merke text={c.merke} lang={lang} />
      <DoneBtn onClick={onDone} lang={lang} />
    </div>
  );
}

// 3.5 Portfolio 70/30
function Portfolio7030Mod({ onDone, lang }) {
  const c = {
    de: {
      title: "Das 70/30 Portfolio",
      p1: "Mit dem 70/30 Portfolio investierst du 70% deines Geldes in Industriestaaten (z.B. USA, Deutschland, Australien) und 30% in Schwellenländer (z.B. Brasilien, Ägypten, China). Insgesamt kommst du auf mehr als 3.000 Aktien aus 46 Ländern – eine hohe Diversifikation im Aktienbereich.",
      p2: "Dieses Portfolio eignet sich, wenn du langfristig für das Alter anlegen möchtest. Da es ausschließlich Aktien enthält, kann es größeren Schwankungen unterliegen.",
      p3: "Hinweis: Du lernst in den nächsten Leveln noch weitere Portfolios kennen, bevor du dich final entscheidest.",
    },
    en: {
      title: "The 70/30 portfolio",
      p1: "With the 70/30 portfolio, you invest 70% of your money in developed markets (e.g. USA, Germany, Australia) and 30% in emerging markets (e.g. Brazil, Egypt, China). In total you get over 3,000 stocks from 46 countries – high diversification in the equity space.",
      p2: "This portfolio is suitable if you want to invest long-term for retirement. Since it consists entirely of equities, it may be subject to larger fluctuations.",
      p3: "Note: You'll get to know more portfolios in the next levels before making a final decision.",
    },
    it: {
      title: "Il portafoglio 70/30",
      p1: "Con il portafoglio 70/30, investi il 70% del tuo denaro nei mercati sviluppati (es. USA, Germania, Australia) e il 30% nei mercati emergenti (es. Brasile, Egitto, Cina). In totale otterrai oltre 3.000 azioni di 46 paesi – un'alta diversificazione nel settore azionario.",
      p2: "Questo portafoglio è adatto se vuoi investire a lungo termine per la pensione. Poiché è composto interamente da azioni, può essere soggetto a maggiori fluttuazioni.",
      p3: "Nota: Conoscerai altri portafogli nei prossimi livelli prima di prendere una decisione finale.",
    },
  }[lang];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
      <div style={bgSt}>
        <SubHead>{c.title}</SubHead>
        <Para>{c.p1}</Para>
        <Para>{c.p2}</Para>
        <Para><strong>{lang === "de" ? "Hinweis:" : lang === "en" ? "Note:" : "Nota:"}</strong> {c.p3.replace(/^Hinweis: |^Note: |^Nota: /, "")}</Para>
      </div>
      <DoneBtn onClick={onDone} lang={lang} />
    </div>
  );
}

// 3.6 Top-Up
function TopupMod({ onDone, lang }) {
  const c = {
    de: {
      title: 'Top-Up',
      p1: "Einmal investieren ist gut. Regelmäßig nachkaufen ist besser. Ein 'Top-Up' bedeutet: Du erhöhst dein Investment gezielt – zum Beispiel nach einer Gehaltserhöhung, einem Bonus oder wenn du merkst, dass du monatlich mehr übrig hast als gedacht.",
      p2: "Warum lohnt sich das? Durch den Zinseszinseffekt macht jeder zusätzlich investierte Euro langfristig einen großen Unterschied. Manche Plattformen erlauben es, einmalige Zusatzkäufe direkt über die App zu tätigen – neben dem laufenden Sparplan.",
      merke: "Nutze jeden Bonus oder jede Gehaltserhöhung als Chance für einen Top-Up. Kleine Aufstockungen machen langfristig einen großen Unterschied.",
    },
    en: {
      title: 'Top-Up',
      p1: "Investing once is good. Regularly buying more is better. A \"top-up\" means: you deliberately increase your investment – for example after a pay rise, a bonus, or when you realize you have more left over each month than expected.",
      p2: "Why is it worth it? Due to the compound interest effect, every additional euro invested makes a big difference in the long run. Some platforms allow one-time additional purchases directly through the app – alongside the ongoing savings plan.",
      merke: "Use every bonus or pay rise as an opportunity for a top-up. Small additions make a big difference in the long run.",
    },
    it: {
      title: 'Top-Up',
      p1: "Investire una volta è bene. Acquistare regolarmente di più è meglio. Un 'top-up' significa: aumenti deliberatamente il tuo investimento – ad esempio dopo un aumento di stipendio, un bonus, o quando ti accorgi di avere più avanzo mensile del previsto.",
      p2: "Perché vale la pena? Grazie all'effetto degli interessi composti, ogni euro aggiuntivo investito fa una grande differenza nel lungo periodo. Alcune piattaforme consentono acquisti aggiuntivi una tantum direttamente tramite l'app – oltre al piano di risparmio in corso.",
      merke: "Usa ogni bonus o aumento di stipendio come opportunità per un top-up. Le piccole integrazioni fanno una grande differenza nel lungo periodo.",
    },
  }[lang];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
      <div style={bgSt}>
        <SubHead>{c.title}</SubHead>
        <Para>{c.p1}</Para>
        <Para>{c.p2}</Para>
      </div>
      <Merke text={c.merke} lang={lang} />
      <ActionBtn deepLinkKey="firstInvestment" lang={lang} />
      <DoneBtn onClick={onDone} lang={lang} />
    </div>
  );
}

// 4.1 Ruhe
function RuheMod({ onDone, lang }) {
  const c = {
    de: {
      title: "Hier lernst du, warum du deine Investitionen niemals aufgrund von Panik verkaufen solltest",
      p1: "Wenn du investierst, musst du damit leben, dass Märkte auf und ab schwanken. Während der Coronakrise haben viele die Nerven verloren und ihre Portfolios billig verkauft. Die Amazon-Aktie verlor während der Dot-Com-Bubble kurzzeitig über 90% ihres Wertes.",
      p2: "Hättest du damals gehalten und bis heute gewartet: über 3.000% Gewinn. Auf dem Finanzmarkt hast du nur einen Feind – dich selbst. Solange du langfristig investierst, hast du dein Risiko im Griff.",
      merke: "Verfalle nicht in Panik, wenn du Kurse sinken siehst. Verkaufe nicht, nur weil es andere tun.",
    },
    en: {
      title: "Here you'll learn why you should never sell your investments out of panic",
      p1: "When you invest, you have to accept that markets go up and down. During the COVID crisis, many people lost their nerve and sold their portfolios cheaply. Amazon stock briefly lost over 90% of its value during the dot-com bubble.",
      p2: "If you had held on and waited until today: over 3,000% profit. On the financial market, you only have one enemy – yourself. As long as you invest long-term, you have your risk under control.",
      merke: "Don't panic when you see prices falling. Don't sell just because others are.",
    },
    it: {
      title: "Qui impari perché non dovresti mai vendere i tuoi investimenti per paura",
      p1: "Quando investi, devi accettare che i mercati salgono e scendono. Durante la crisi COVID, molti hanno perso i nervi e venduto i loro portafogli a prezzi bassi. Le azioni Amazon hanno perso brevemente oltre il 90% del loro valore durante la bolla dot-com.",
      p2: "Se avessi mantenuto e aspettato fino ad oggi: oltre il 3.000% di profitto. Sul mercato finanziario, hai solo un nemico – te stesso. Finché investi a lungo termine, hai il tuo rischio sotto controllo.",
      merke: "Non farti prendere dal panico quando vedi i prezzi scendere. Non vendere solo perché lo fanno gli altri.",
    },
  }[lang];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
      <div style={bgSt}>
        <SubHead>{c.title}</SubHead>
        <Para>{c.p1}</Para>
        <Para>{c.p2}</Para>
      </div>
      <Merke text={c.merke} lang={lang} />
      <DoneBtn onClick={onDone} lang={lang} />
    </div>
  );
}

// 4.2 Timing
function TimingMod({ onDone, lang }) {
  const c = {
    de: {
      title: "Hier lernst du, warum es den richtigen Einstiegszeitpunkt nicht gibt",
      p1: "Viele Einsteiger machen einen großen Fehler: Sie warten auf den richtigen Zeitpunkt. Aus ein paar Tagen Wartezeit werden Monate – und du hast noch immer nicht investiert. Selbst Profis wissen nicht, wie sich Finanzmärkte kurzfristig entwickeln.",
      p2: "Wir wissen nur, dass die Preise langfristig steigen. Das sinnvollste ist somit: jetzt einsteigen.",
      merke: "Den richtigen Einstiegszeitpunkt zum Investieren gibt es nicht. Fange jetzt an – sonst wartest du vielleicht noch dein Leben lang!",
    },
    en: {
      title: "Here you'll learn why there's no perfect time to enter the market",
      p1: "Many beginners make a big mistake: they wait for the right time. A few days' wait turns into months – and you still haven't invested. Even professionals don't know how financial markets will develop in the short term.",
      p2: "We only know that prices rise in the long run. The most sensible approach is therefore: invest now.",
      merke: "There's no perfect time to start investing. Start now – otherwise you might wait your whole life!",
    },
    it: {
      title: "Qui impari perché non esiste il momento giusto per entrare nel mercato",
      p1: "Molti principianti fanno un grande errore: aspettano il momento giusto. Pochi giorni di attesa diventano mesi – e ancora non hai investito. Nemmeno i professionisti sanno come si svilupperanno i mercati finanziari nel breve termine.",
      p2: "Sappiamo solo che i prezzi salgono nel lungo periodo. L'approccio più sensato è quindi: investire ora.",
      merke: "Non esiste il momento perfetto per iniziare a investire. Inizia ora – altrimenti potresti aspettare tutta la vita!",
    },
  }[lang];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
      <div style={bgSt}>
        <SubHead>{c.title}</SubHead>
        <Para>{c.p1}</Para>
        <Para>{c.p2}</Para>
      </div>
      <Merke text={c.merke} lang={lang} />
      <DoneBtn onClick={onDone} lang={lang} />
    </div>
  );
}

// 4.3 Goals
function GoalsMod({ onDone, lang }) {
  const c = {
    de: {
      title: "Warum Ziele wichtig sind",
      p1: "Ohne klares Ziel investiert man entweder zu wenig – oder gibt zu früh auf. Definiere konkret: Wofür spare ich? Rente? Eigenheim? Freiheit mit 50? Ein Ziel gibt dir Orientierung bei Marktschwankungen: Du weißt, warum du dabei bleibst.",
      p2: "Es hilft dir, die richtige Summe und den richtigen Zeithorizont zu wählen. Und es motiviert dich, regelmäßig Geld zur Seite zu legen.",
      merke: "Ein klares Investitionsziel ist die Basis für langfristigen Erfolg. Wer weiß, warum er investiert, bleibt auch in schwierigen Phasen dabei.",
    },
    en: {
      title: "Why goals matter",
      p1: "Without a clear goal, you either invest too little – or give up too early. Define it concretely: what am I saving for? Retirement? Own home? Freedom at 50? A goal gives you orientation during market fluctuations: you know why you're staying in.",
      p2: "It helps you choose the right amount and the right time horizon. And it motivates you to set aside money regularly.",
      merke: "A clear investment goal is the foundation for long-term success. Those who know why they invest stay committed even in difficult phases.",
    },
    it: {
      title: "Perché gli obiettivi sono importanti",
      p1: "Senza un obiettivo chiaro, si investe troppo poco – oppure ci si arrende troppo presto. Definiscilo concretamente: per cosa sto risparmiando? Pensione? Casa di proprietà? Libertà a 50 anni? Un obiettivo ti dà orientamento durante le fluttuazioni del mercato: sai perché stai rimanendo investito.",
      p2: "Ti aiuta a scegliere l'importo giusto e il giusto orizzonte temporale. E ti motiva a mettere da parte denaro regolarmente.",
      merke: "Un obiettivo d'investimento chiaro è la base del successo a lungo termine. Chi sa perché investe rimane impegnato anche nelle fasi difficili.",
    },
  }[lang];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
      <div style={bgSt}>
        <SubHead>{c.title}</SubHead>
        <Para>{c.p1}</Para>
        <Para>{c.p2}</Para>
      </div>
      <Merke text={c.merke} lang={lang} />
      <DoneBtn onClick={onDone} lang={lang} />
    </div>
  );
}

// 4.4 Dauerauftrag
function DauerauftragMod({ onDone, lang }) {
  const c = {
    de: {
      title: "Dauerauftrag",
      p1: "Der einfachste Weg, konsequent zu investieren: ein Dauerauftrag. Richte einmal ein, dass jeden Monat automatisch ein Betrag auf dein Depot überwiesen wird. Du musst dich um nichts mehr kümmern. Du vergisst es nicht. Du wirst nicht versucht sein, das Geld für etwas anderes auszugeben.",
      p2: "Und du profitierst vom Cost-Average-Effekt: Du kaufst mal teurer, mal günstiger – und glättest so automatisch deinen Einstiegskurs.",
      merke: "Ein Dauerauftrag ist das einfachste Werkzeug für nachhaltigen Vermögensaufbau – einmal einrichten, dann läuft es von selbst.",
    },
    en: {
      title: "Standing order",
      p1: "The simplest way to invest consistently: a standing order. Set it up once so that an amount is automatically transferred to your account every month. You don't have to worry about anything. You won't forget it. You won't be tempted to spend the money on something else.",
      p2: "And you benefit from the cost-average effect: you buy sometimes at higher prices, sometimes lower – and automatically smooth out your entry price.",
      merke: "A standing order is the simplest tool for sustainable wealth building – set it up once and it runs by itself.",
    },
    it: {
      title: "Ordine permanente",
      p1: "Il modo più semplice per investire in modo coerente: un ordine permanente. Impostalo una volta in modo che un importo venga trasferito automaticamente al tuo deposito ogni mese. Non devi preoccuparti di nulla. Non lo dimenticherai. Non sarai tentato di spendere i soldi per qualcos'altro.",
      p2: "E benefici dell'effetto cost-average: a volte compri a prezzi più alti, a volte più bassi – e automaticamente livelli il tuo prezzo di ingresso.",
      merke: "Un ordine permanente è lo strumento più semplice per costruire patrimonio in modo sostenibile – impostalo una volta e funziona da solo.",
    },
  }[lang];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
      <div style={bgSt}>
        <SubHead>{c.title}</SubHead>
        <Para>{c.p1}</Para>
        <Para>{c.p2}</Para>
      </div>
      <Merke text={c.merke} lang={lang} />
      <DoneBtn onClick={onDone} lang={lang} />
    </div>
  );
}

// 4.5 Sparplan
function SparplanMod({ onDone, lang }) {
  const c = {
    de: {
      title: "Hier lernst du, wie du deinen ETF-Sparplan einrichtest",
      p1: "Mit einem ETF-Sparplan kaufst du in regelmäßigen Abständen automatisch neue Anteile – ohne aktiv nachzudenken. Du kannst bereits mit kleinen Summen ab 5€ starten und mehrere Sparpläne auf unterschiedliche ETFs einrichten.",
      p2: "Wenn du immer zu unterschiedlichen Zeitpunkten einkaufst, brauchst du dir keine Gedanken darüber machen, ob gerade ein guter Einstiegszeitpunkt ist. Denn einmal kaufst du vielleicht etwas teurer – ein anderes Mal sehr günstig. So gleicht sich das Risiko auf Dauer aus.",
      merke: "Ein ETF-Sparplan investiert dein Geld automatisch und regelmäßig. Du profitierst vom Cost-Average-Effekt ohne aktiv eingreifen zu müssen.",
    },
    en: {
      title: "Here you'll learn how to set up your ETF savings plan",
      p1: "With an ETF savings plan, you automatically buy new shares at regular intervals – without actively thinking about it. You can start with as little as €5 and set up multiple savings plans for different ETFs.",
      p2: "Since you always buy at different times, you don't need to worry about whether it's a good entry point. Sometimes you buy slightly more expensively – other times very cheaply. This averages out the risk over time.",
      merke: "An ETF savings plan invests your money automatically and regularly. You benefit from the cost-average effect without having to actively intervene.",
    },
    it: {
      title: "Qui impari come configurare il tuo piano di risparmio ETF",
      p1: "Con un piano di risparmio ETF, acquisti automaticamente nuove quote a intervalli regolari – senza pensarci attivamente. Puoi iniziare con somme piccole a partire da 5€ e impostare più piani di risparmio su diversi ETF.",
      p2: "Poiché acquisti sempre in momenti diversi, non devi preoccuparti se è un buon momento per entrare. A volte acquisti a prezzi leggermente più alti – altre volte molto convenienti. Così il rischio si equalizza nel tempo.",
      merke: "Un piano di risparmio ETF investe il tuo denaro automaticamente e regolarmente. Benefici dell'effetto cost-average senza dover intervenire attivamente.",
    },
  }[lang];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
      <div style={bgSt}>
        <SubHead>{c.title}</SubHead>
        <Para>{c.p1}</Para>
        <Para>{c.p2}</Para>
      </div>
      <Merke text={c.merke} lang={lang} />
      <DoneBtn onClick={onDone} lang={lang} />
    </div>
  );
}

// 5.1 ETF-Anbieter
function EtfanbieterMod({ onDone, lang }) {
  const c = {
    de: {
      title: "Hier lernst du, von wem du deinen ETF kaufst",
      p1: "Es gibt verschiedene ETF-Anbieter – ähnlich wie verschiedene Spaghetti-Marken im Supermarkt. Bei einem DAX-ETF sind immer die gleichen 40 deutschen Unternehmen enthalten – egal ob von Blackrock, iShares, Vanguard oder Amundi.",
      p2: "Die großen Anbieter unterscheiden sich kaum in der Qualität. Achte auf klare Darstellung von Kosten und Informationen.",
      merke: "Wenn DAX draufsteht, ist auch DAX drin. Die verschiedenen Anbieter haben kaum Einfluss auf deine Investitionen.",
    },
    en: {
      title: "Here you'll learn who you buy your ETF from",
      p1: "There are various ETF providers – similar to different spaghetti brands in the supermarket. A DAX ETF always contains the same 40 German companies – regardless of whether it's from BlackRock, iShares, Vanguard or Amundi.",
      p2: "The major providers differ very little in quality. Look for clear presentation of costs and information.",
      merke: "If it says DAX on it, DAX is what you get. The different providers have little influence on your investments.",
    },
    it: {
      title: "Qui impari da chi compri il tuo ETF",
      p1: "Esistono vari provider ETF – simili ai diversi marchi di spaghetti al supermercato. Un ETF DAX contiene sempre le stesse 40 aziende tedesche – indipendentemente che provenga da BlackRock, iShares, Vanguard o Amundi.",
      p2: "I grandi provider differiscono poco in qualità. Cerca una presentazione chiara dei costi e delle informazioni.",
      merke: "Se è scritto DAX, dentro c'è il DAX. I diversi provider hanno poco influsso sui tuoi investimenti.",
    },
  }[lang];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
      <div style={bgSt}>
        <SubHead>{c.title}</SubHead>
        <Para>{c.p1}</Para>
        <Para>{c.p2}</Para>
      </div>
      <Merke text={c.merke} lang={lang} />
      <DoneBtn onClick={onDone} lang={lang} />
    </div>
  );
}

// 5.2 ETF-Währung
function EtfwaehrungMod({ onDone, lang }) {
  const c = {
    de: {
      title: "Hier lernst du, warum die ETF-Währung Einfluss auf die Rendite haben kann",
      p1: "Die meisten ETFs werden ursprünglich in Dollar angeboten – es gibt sie aber auch in Euro. Wenn du einen ETF in Dollar hältst, beeinflusst der Wechselkurs deine Rendite. Kaufst du in Euro, hängt deine Performance nur von der Aktienentwicklung ab.",
      merke: "Ein ETF in deiner eigenen Währung (Euro) schützt dich vor dem Währungsrisiko. Deine Rendite hängt dann allein von der ETF-Entwicklung ab.",
    },
    en: {
      title: "Here you'll learn why the ETF currency can influence your return",
      p1: "Most ETFs are originally offered in dollars – but they're also available in euros. If you hold an ETF in dollars, the exchange rate affects your return. If you buy in euros, your performance depends only on the stock performance.",
      merke: "An ETF in your own currency (euro) protects you from currency risk. Your return then depends solely on the ETF's performance.",
    },
    it: {
      title: "Qui impari perché la valuta dell'ETF può influenzare il rendimento",
      p1: "La maggior parte degli ETF viene offerta originariamente in dollari – ma sono disponibili anche in euro. Se detieni un ETF in dollari, il tasso di cambio influenza il tuo rendimento. Se acquisti in euro, la tua performance dipende solo dall'andamento delle azioni.",
      merke: "Un ETF nella tua valuta (euro) ti protegge dal rischio di cambio. Il tuo rendimento dipenderà allora esclusivamente dall'andamento dell'ETF.",
    },
  }[lang];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
      <div style={bgSt}>
        <SubHead>{c.title}</SubHead>
        <Para>{c.p1}</Para>
      </div>
      <Merke text={c.merke} lang={lang} />
      <DoneBtn onClick={onDone} lang={lang} />
    </div>
  );
}

// 5.3 ETF-Kosten
function EtfkostenMod({ onDone, lang }) {
  const c = {
    de: {
      title: "Hier lernst du, welche Gebühren du für deine ETFs zahlst",
      p1: "Auch ETFs haben Kosten: die TER (Total Expense Ratio). Diese liegt jährlich zwischen 0,1% und 0,4% – deutlich weniger als Fonds mit 1,5–2%.",
      p2: "Beispiel: 200€/Monat über 30 Jahre. ETF mit 0,1% Kosten: ~270.000€. Fonds mit 2% Kosten: ~190.000€. Du hast 80.000€ verschenkt.",
      p3: "Hinweis: UniCredit bietet eigene Fonds- und ETF-Produkte an – vergleiche immer die TER.",
      merke: "Die TER ist die jährliche Gebühr deines ETFs. Auch kleine Unterschiede machen über 30 Jahre einen enormen Unterschied.",
    },
    en: {
      title: "Here you'll learn what fees you pay for your ETFs",
      p1: "ETFs also have costs: the TER (Total Expense Ratio). This is between 0.1% and 0.4% per year – significantly less than funds with 1.5–2%.",
      p2: "Example: €200/month over 30 years. ETF with 0.1% costs: ~€270,000. Fund with 2% costs: ~€190,000. You've given away €80,000.",
      p3: "Note: UniCredit offers its own fund and ETF products – always compare the TER.",
      merke: "The TER is the annual fee of your ETF. Even small differences make an enormous difference over 30 years.",
    },
    it: {
      title: "Qui impari quali commissioni paghi per i tuoi ETF",
      p1: "Anche gli ETF hanno costi: il TER (Total Expense Ratio). Questo è tra lo 0,1% e lo 0,4% annuo – significativamente meno dei fondi con l'1,5–2%.",
      p2: "Esempio: 200€/mese su 30 anni. ETF con costi dello 0,1%: ~270.000€. Fondo con costi del 2%: ~190.000€. Hai regalato 80.000€.",
      p3: "Nota: UniCredit offre i propri prodotti fondi ed ETF – confronta sempre il TER.",
      merke: "Il TER è la commissione annuale del tuo ETF. Anche piccole differenze fanno una differenza enorme su 30 anni.",
    },
  }[lang];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
      <div style={bgSt}>
        <SubHead>{c.title}</SubHead>
        <Para>{c.p1}</Para>
        <Para>{c.p2}</Para>
        <Para><strong>{lang === "de" ? "Hinweis:" : lang === "en" ? "Note:" : "Nota:"}</strong> {c.p3.replace(/^Hinweis: |^Note: |^Nota: /, "")}</Para>
      </div>
      <Merke text={c.merke} lang={lang} />
      <DoneBtn onClick={onDone} lang={lang} />
    </div>
  );
}

// 5.4 Ausschüttung
function AusschuettungMod({ onDone, lang }) {
  const c = {
    de: {
      title: "Hier lernst du, was ETFs mit Ü-Eiern gemeinsam haben",
      p1: "Es gibt zwei Arten von ETFs: ausschüttende und thesaurierende. Ausschüttende ETFs zahlen Zinsen oder Dividenden direkt auf dein Konto – du kannst das Geld sofort ausgeben. Thesaurierende ETFs reinvestieren die Erträge automatisch – du profitierst so doppelt vom Zinseszinseffekt.",
      merke: "Thesaurierende ETFs reinvestieren Gewinne automatisch und verstärken den Zinseszinseffekt. Ausschüttende ETFs zahlen dir Gewinne regelmäßig aus.",
    },
    en: {
      title: "Here you'll learn what ETFs have in common with Kinder Surprise eggs",
      p1: "There are two types of ETFs: distributing and accumulating. Distributing ETFs pay interest or dividends directly into your account – you can spend the money immediately. Accumulating ETFs automatically reinvest the earnings – you benefit doubly from the compound interest effect.",
      merke: "Accumulating ETFs automatically reinvest profits and amplify the compound interest effect. Distributing ETFs pay out profits to you regularly.",
    },
    it: {
      title: "Qui impari cosa hanno in comune gli ETF con le uova di Pasqua",
      p1: "Esistono due tipi di ETF: distributivi e accumulativi. Gli ETF distributivi pagano interessi o dividendi direttamente sul tuo conto – puoi spendere il denaro immediatamente. Gli ETF accumulativi reinvestono automaticamente i proventi – benefici così doppiamente dell'effetto degli interessi composti.",
      merke: "Gli ETF accumulativi reinvestono automaticamente i profitti e amplificano l'effetto degli interessi composti. Gli ETF distributivi ti pagano i profitti regolarmente.",
    },
  }[lang];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
      <div style={bgSt}>
        <SubHead>{c.title}</SubHead>
        <Para>{c.p1}</Para>
      </div>
      <Merke text={c.merke} lang={lang} />
      <DoneBtn onClick={onDone} lang={lang} />
    </div>
  );
}

// 5.5 Entwicklung
function EntwicklungMod({ onDone, lang }) {
  const c = {
    de: {
      title: "Hier lernst du, welche Rolle unterschiedliche Entwicklungsstände von Ländern beim Investieren spielen",
      p1: "Industriestaaten (Developed Markets) wie Deutschland, USA oder Australien bieten stabile Rechtssysteme und niedrigeres Risiko. Schwellenländer (Emerging Markets) wie China, Brasilien oder Indien bieten höheres Wachstumspotenzial – aber auch mehr Schwankungen.",
      p2: "Entwicklungsländer (Frontier Markets) sind noch schwieriger zugänglich und riskanter.",
      merke: "Investitionen in Schwellenländer bieten mehr Renditechancen, aber auch mehr Risiko. Bleib diversifiziert.",
    },
    en: {
      title: "Here you'll learn what role different development levels of countries play in investing",
      p1: "Developed markets like Germany, the USA or Australia offer stable legal systems and lower risk. Emerging markets like China, Brazil or India offer higher growth potential – but also more volatility.",
      p2: "Frontier markets are even more difficult to access and riskier.",
      merke: "Investments in emerging markets offer more return opportunities, but also more risk. Stay diversified.",
    },
    it: {
      title: "Qui impari quale ruolo giocano i diversi livelli di sviluppo dei paesi negli investimenti",
      p1: "I mercati sviluppati come Germania, USA o Australia offrono sistemi giuridici stabili e rischio minore. I mercati emergenti come Cina, Brasile o India offrono un maggiore potenziale di crescita – ma anche più volatilità.",
      p2: "I mercati di frontiera sono ancora più difficili da accedere e più rischiosi.",
      merke: "Gli investimenti nei mercati emergenti offrono più opportunità di rendimento, ma anche più rischio. Rimani diversificato.",
    },
  }[lang];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
      <div style={bgSt}>
        <SubHead>{c.title}</SubHead>
        <Para>{c.p1}</Para>
        <Para>{c.p2}</Para>
      </div>
      <Merke text={c.merke} lang={lang} />
      <DoneBtn onClick={onDone} lang={lang} />
    </div>
  );
}

// 5.6 Steuer
function SteuerMod({ onDone, lang }) {
  const c = {
    de: {
      title: "Die Steuer Basics",
      p1: "In Österreich gilt die Kapitalertragsteuer (KESt) von 27,5% auf Kursgewinne und Dividenden. Die gute Nachricht: Bei ETFs über ein österreichisches Depot wird die KESt automatisch abgeführt – du musst dich um nichts kümmern.",
      p2: "Wichtig: Thesaurierende ETFs werden in Österreich jährlich 'ausschüttungsgleich' besteuert, auch wenn keine Ausschüttung erfolgt. Lass dich von deiner Bank dazu beraten.",
      merke: "Die KESt von 27,5% wird automatisch von deiner Depotbank abgeführt. Lass dich zu steuerlichen Besonderheiten beraten.",
    },
    en: {
      title: "Tax basics",
      p1: "In Austria, the capital gains tax (KESt) of 27.5% applies to price gains and dividends. The good news: for ETFs held in an Austrian account, the KESt is automatically deducted – you don't have to worry about anything.",
      p2: "Important: In Austria, accumulating ETFs are taxed annually on a \"deemed distribution\" basis, even if no distribution occurs. Ask your bank for advice on this.",
      merke: "The 27.5% KESt is automatically deducted by your custodian bank. Get advice on special tax features.",
    },
    it: {
      title: "Le basi fiscali",
      p1: "In Austria si applica l'imposta sul capitale (KESt) del 27,5% sulle plusvalenze e sui dividendi. La buona notizia: per gli ETF detenuti su un deposito austriaco, la KESt viene detratta automaticamente – non devi preoccuparti di nulla.",
      p2: "Importante: In Austria, gli ETF accumulativi vengono tassati annualmente su base di \"distribuzione presunta\", anche se non avviene alcuna distribuzione. Chiedi consiglio alla tua banca in merito.",
      merke: "Il KESt del 27,5% viene automaticamente detratto dalla tua banca depositaria. Fatti consigliare sulle particolarità fiscali.",
    },
  }[lang];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
      <div style={bgSt}>
        <SubHead>{c.title}</SubHead>
        <Para>{c.p1}</Para>
        <Para>{c.p2}</Para>
      </div>
      <Merke text={c.merke} lang={lang} />
      <DoneBtn onClick={onDone} lang={lang} />
    </div>
  );
}

// 5.7 ISIN
function IsinMod({ onDone, lang }) {
  const c = {
    de: {
      title: "Hier lernst du, was es mit WKNs und ISINs auf sich hat",
      p1: "Jedes Wertpapier hat eine eindeutige Kennnummer: die WKN (Wertpapierkennnummer, 6 Stellen) und die ISIN (internationale Kennnummer, 12 Stellen). Diese sind wie Barcodes – mit ihnen findest du jeden ETF eindeutig, auch wenn mehrere ähnliche Namen haben.",
      p2: "Nutze sie bei Google oder deiner Handelsplattform zur Suche.",
      merke: "Mit WKN und ISIN lassen sich Wertpapiere eindeutig identifizieren.",
    },
    en: {
      title: "Here you'll learn what WKNs and ISINs are all about",
      p1: "Every security has a unique identification number: the WKN (German securities number, 6 digits) and the ISIN (international securities number, 12 digits). These are like barcodes – with them you can uniquely find any ETF, even if several have similar names.",
      p2: "Use them on Google or your trading platform to search.",
      merke: "WKN and ISIN allow securities to be uniquely identified.",
    },
    it: {
      title: "Qui impari cosa sono WKN e ISIN",
      p1: "Ogni titolo ha un numero di identificazione univoco: il WKN (numero tedesco dei titoli, 6 cifre) e l'ISIN (numero internazionale dei titoli, 12 cifre). Sono come codici a barre – con essi puoi trovare univocamente qualsiasi ETF, anche se più hanno nomi simili.",
      p2: "Usali su Google o sulla tua piattaforma di trading per la ricerca.",
      merke: "WKN e ISIN consentono l'identificazione univoca dei titoli.",
    },
  }[lang];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
      <div style={bgSt}>
        <SubHead>{c.title}</SubHead>
        <Para>{c.p1}</Para>
        <Para>{c.p2}</Para>
      </div>
      <Merke text={c.merke} lang={lang} />
      <DoneBtn onClick={onDone} lang={lang} />
    </div>
  );
}

// 5.8 Freistellung
function FreistellungMod({ onDone, lang }) {
  const c = {
    de: {
      title: "Freistellungsauftrag",
      p1: "In Deutschland können Anleger einen Sparerpauschbetrag von 1.000€ (Singles) bzw. 2.000€ (Paare) pro Jahr steuerfrei nutzen. In Österreich gibt es dieses System nicht in gleicher Form – hier gilt die KESt pauschal auf alle Erträge.",
      p2: "Wenn du als Österreicher auch ein deutsches Depot hast: Stelle dort unbedingt einen Freistellungsauftrag. So zahlst du auf die ersten 1.000€ Kapitalerträge keine Steuern.",
      merke: "In Deutschland: Freistellungsauftrag stellen und bis zu 1.000€ steuerfrei kassieren. In Österreich gilt die KESt automatisch auf alle Erträge.",
    },
    en: {
      title: "Tax exemption order",
      p1: "In Germany, investors can use a saver's allowance of €1,000 (singles) or €2,000 (couples) per year tax-free. In Austria, this system doesn't exist in the same form – here the KeSt applies uniformly to all income.",
      p2: "If you're Austrian and also have a German account: make sure to set up a tax exemption order there. This way you pay no taxes on the first €1,000 of capital income.",
      merke: "In Germany: set up a tax exemption order and receive up to €1,000 tax-free. In Austria, the KeSt automatically applies to all income.",
    },
    it: {
      title: "Ordine di esenzione fiscale",
      p1: "In Germania, gli investitori possono utilizzare un'allowance per risparmiatori di 1.000€ (single) o 2.000€ (coppie) all'anno esentasse. In Austria, questo sistema non esiste nella stessa forma – qui la KeSt si applica uniformemente a tutti i redditi.",
      p2: "Se sei austriaco e hai anche un deposito tedesco: assicurati di impostare un ordine di esenzione fiscale lì. In questo modo non pagherai tasse sui primi 1.000€ di reddito da capitale.",
      merke: "In Germania: imposta un ordine di esenzione fiscale e ricevi fino a 1.000€ esentasse. In Austria, la KeSt si applica automaticamente a tutti i redditi.",
    },
  }[lang];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
      <div style={bgSt}>
        <SubHead>{c.title}</SubHead>
        <Para>{c.p1}</Para>
        <Para>{c.p2}</Para>
      </div>
      <Merke text={c.merke} lang={lang} />
      <DoneBtn onClick={onDone} lang={lang} />
    </div>
  );
}

// 6.1 Zeithorizont
function ZeithorizontMod({ onDone, lang }) {
  const c = {
    de: {
      title: "Hier lernst du, wie du dein Geld für kurz- und mittelfristige Ziele anlegst",
      p1: "Überlege zuerst: Wie viel Geld brauchst du in den nächsten 1–2 Jahren? Dieses Geld wird nicht investiert. Was ist mit Dingen, die du in 3–10 Jahren kaufen möchtest – ein Haus oder Auto?",
      p2: "Für diese Zeiträume eignen sich Investments mit weniger Schwankungen – zum Beispiel Anleihen. Langfristig (10+ Jahre) kannst du auf mehr Aktien setzen.",
      merke: "Für Investments zwischen 3 und 10 Jahren: lieber weniger schwankungsreiche Produkte wie Anleihen. Kurzfristig benötigtes Geld gehört nicht ins Depot.",
    },
    en: {
      title: "Here you'll learn how to invest your money for short and medium-term goals",
      p1: "First, think: how much money do you need in the next 1–2 years? This money should not be invested. What about things you want to buy in 3–10 years – a house or a car?",
      p2: "For these time periods, investments with less volatility are suitable – such as bonds. For the long term (10+ years), you can rely more on equities.",
      merke: "For investments between 3 and 10 years: prefer less volatile products like bonds. Money needed in the short term doesn't belong in your portfolio.",
    },
    it: {
      title: "Qui impari come investire il tuo denaro per obiettivi a breve e medio termine",
      p1: "Prima di tutto, pensa: di quanto denaro hai bisogno nei prossimi 1–2 anni? Questo denaro non deve essere investito. Cosa succede con le cose che vuoi acquistare in 3–10 anni – una casa o un'auto?",
      p2: "Per questi periodi di tempo, sono adatti investimenti con meno volatilità – come le obbligazioni. A lungo termine (oltre 10 anni), puoi puntare maggiormente sulle azioni.",
      merke: "Per investimenti tra 3 e 10 anni: preferisci prodotti meno volatili come le obbligazioni. Il denaro necessario a breve termine non appartiene al deposito.",
    },
  }[lang];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
      <div style={bgSt}>
        <SubHead>{c.title}</SubHead>
        <Para>{c.p1}</Para>
        <Para>{c.p2}</Para>
      </div>
      <Merke text={c.merke} lang={lang} />
      <DoneBtn onClick={onDone} lang={lang} />
    </div>
  );
}

// 6.2 Anleihen
function AnleihenMod({ onDone, lang }) {
  const c = {
    de: {
      title: "Hier lernst du, wie du dein Geld mit wenig Risiko anlegen kannst",
      p1: "Du kannst Unternehmen und Staaten Geld leihen – über Anleihen. Beispiel Siemens-Anleihe: Du kaufst für 100€ mit 1% Zins. Jedes Jahr bekommst du 1€. Nach 5 Jahren: 105€ gesamt.",
      p2: "Auch für Anleihen gibt es ETFs – so streust du dein Risiko. Anleihen von soliden Unternehmen und Staaten schwanken weniger als Aktien – dafür gibt es auch weniger Rendite.",
      merke: "Bei Anleihen verleihst du Geld an Unternehmen oder Staaten und erhältst während der Laufzeit Zinsen.",
    },
    en: {
      title: "Here you'll learn how to invest your money with little risk",
      p1: "You can lend money to companies and governments – through bonds. Example Siemens bond: you buy for €100 with 1% interest. Each year you receive €1. After 5 years: €105 total.",
      p2: "There are also ETFs for bonds – this way you spread your risk. Bonds from solid companies and governments fluctuate less than stocks – but they also offer less return.",
      merke: "With bonds, you lend money to companies or governments and receive interest during the term.",
    },
    it: {
      title: "Qui impari come investire il tuo denaro con poco rischio",
      p1: "Puoi prestare denaro ad aziende e stati – tramite obbligazioni. Esempio obbligazione Siemens: acquisti per 100€ con interesse dell'1%. Ogni anno ricevi 1€. Dopo 5 anni: 105€ in totale.",
      p2: "Esistono anche ETF per le obbligazioni – così distribuisci il tuo rischio. Le obbligazioni di aziende e stati solidi oscillano meno delle azioni – ma offrono anche meno rendimento.",
      merke: "Con le obbligazioni presti denaro ad aziende o stati e ricevi interessi durante il periodo.",
    },
  }[lang];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
      <div style={bgSt}>
        <SubHead>{c.title}</SubHead>
        <Para>{c.p1}</Para>
        <Para>{c.p2}</Para>
      </div>
      <Merke text={c.merke} lang={lang} />
      <DoneBtn onClick={onDone} lang={lang} />
    </div>
  );
}

// 6.3 Ratings
function RatingsMod({ onDone, lang }) {
  const c = {
    de: {
      title: "Hier lernst du, wie du Anleihen mit hoher Qualität erkennst",
      p1: "Anleihen haben ein Rating – ähnlich wie Schulnoten, aber in Buchstaben. Je näher am Buchstaben 'A', desto besser. Anleihen mit 'Investment Grade' hatten in der Vergangenheit nur 0,1% Ausfallwahrscheinlichkeit.",
      p2: "Je besser das Rating, desto geringer die Rendite – und umgekehrt. Das Rating funktioniert wie die SCHUFA für Staaten und Unternehmen.",
      merke: "Ein gutes Anleihen-Rating bedeutet hohe Sicherheit – aber auch etwas weniger Rendite.",
    },
    en: {
      title: "Here you'll learn how to recognize high-quality bonds",
      p1: "Bonds have a rating – similar to school grades, but in letters. The closer to the letter \"A\", the better. \"Investment grade\" bonds have historically had only a 0.1% default probability.",
      p2: "The better the rating, the lower the return – and vice versa. The rating works like a credit score for governments and companies.",
      merke: "A good bond rating means high security – but also slightly less return.",
    },
    it: {
      title: "Qui impari come riconoscere le obbligazioni di alta qualità",
      p1: "Le obbligazioni hanno un rating – simile ai voti scolastici, ma in lettere. Più vicino alla lettera 'A', meglio è. Le obbligazioni con 'investment grade' hanno storicamente avuto solo lo 0,1% di probabilità di default.",
      p2: "Migliore è il rating, minore è il rendimento – e viceversa. Il rating funziona come un punteggio di credito per governi e aziende.",
      merke: "Un buon rating obbligazionario significa alta sicurezza – ma anche un rendimento leggermente inferiore.",
    },
  }[lang];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
      <div style={bgSt}>
        <SubHead>{c.title}</SubHead>
        <Para>{c.p1}</Para>
        <Para>{c.p2}</Para>
      </div>
      <Merke text={c.merke} lang={lang} />
      <DoneBtn onClick={onDone} lang={lang} />
    </div>
  );
}

// 6.4 Anleihenarten
function AnleihenartenMod({ onDone, lang }) {
  const c = {
    de: {
      title: "Der Unterschied zwischen Staats- und Unternehmensanleihen",
      p1: "Staatsanleihen: Industriestaaten wie Deutschland oder Österreich gehen kaum pleite – sehr sicher, aber niedrige Rendite. Unternehmensanleihen: Höhere Rendite, aber auch mehr Schwankungen und Ausfallrisiko.",
      p2: "Beide Arten gibt es als ETFs – so diversifizierst du auch innerhalb der Anleihen.",
      merke: "Staatsanleihen = sicherer, weniger Rendite. Unternehmensanleihen = mehr Rendite, mehr Risiko.",
    },
    en: {
      title: "The difference between government and corporate bonds",
      p1: "Government bonds: developed countries like Germany or Austria rarely go bankrupt – very safe, but low return. Corporate bonds: higher return, but also more volatility and default risk.",
      p2: "Both types are available as ETFs – this way you diversify even within bonds.",
      merke: "Government bonds = safer, less return. Corporate bonds = more return, more risk.",
    },
    it: {
      title: "La differenza tra obbligazioni governative e societarie",
      p1: "Obbligazioni governative: i paesi sviluppati come Germania o Austria raramente falliscono – molto sicure, ma rendimento basso. Obbligazioni societarie: rendimento più alto, ma anche più volatilità e rischio di default.",
      p2: "Entrambi i tipi sono disponibili come ETF – così diversifichi anche all'interno delle obbligazioni.",
      merke: "Obbligazioni governative = più sicure, meno rendimento. Obbligazioni societarie = più rendimento, più rischio.",
    },
  }[lang];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
      <div style={bgSt}>
        <SubHead>{c.title}</SubHead>
        <Para>{c.p1}</Para>
        <Para>{c.p2}</Para>
      </div>
      <Merke text={c.merke} lang={lang} />
      <DoneBtn onClick={onDone} lang={lang} />
    </div>
  );
}

// 6.5 Portfolio 60/40
function Portfolio6040Mod({ onDone, lang }) {
  const c = {
    de: {
      title: "Das 60/40 Portfolio",
      p1: "60% Aktien (aufgeteilt in Industrie- und Schwellenländer) + 40% Anleihen. Durch den Anleihen-Anteil schwankt das Portfolio weniger als das reine 70/30 Aktienportfolio – aber es wirft auch etwas weniger Rendite ab.",
      p2: "Dieses Portfolio eignet sich, wenn du keine extremen Schwankungen magst.",
      p3: "Hinweis: Du lernst noch zwei weitere Portfolios kennen, bevor du dich final entscheidest.",
    },
    en: {
      title: "The 60/40 portfolio",
      p1: "60% equities (split between developed and emerging markets) + 40% bonds. The bond component means the portfolio fluctuates less than a pure 70/30 equity portfolio – but it also yields slightly less return.",
      p2: "This portfolio is suitable if you don't like extreme fluctuations.",
      p3: "Note: You'll get to know two more portfolios before making a final decision.",
    },
    it: {
      title: "Il portafoglio 60/40",
      p1: "60% azioni (divise tra mercati sviluppati ed emergenti) + 40% obbligazioni. La componente obbligazionaria fa sì che il portafoglio fluttui meno rispetto a un puro portafoglio azionario 70/30 – ma produce anche un rendimento leggermente inferiore.",
      p2: "Questo portafoglio è adatto se non ti piacciono le fluttuazioni estreme.",
      p3: "Nota: Conoscerai altri due portafogli prima di prendere una decisione finale.",
    },
  }[lang];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
      <div style={bgSt}>
        <SubHead>{c.title}</SubHead>
        <Para>{c.p1}</Para>
        <Para>{c.p2}</Para>
        <Para><strong>{lang === "de" ? "Hinweis:" : lang === "en" ? "Note:" : "Nota:"}</strong> {c.p3.replace(/^Hinweis: |^Note: |^Nota: /, "")}</Para>
      </div>
      <DoneBtn onClick={onDone} lang={lang} />
    </div>
  );
}

// 7.1 Regionen
function RegionenMod({ onDone, lang }) {
  const c = {
    de: {
      title: "Hier lernst du, warum es Sinn ergeben kann, in eine einzelne Region zu investieren",
      p1: "Manchmal kann es vorteilhaft sein, direkt in eine bestimmte Region zu investieren – z.B. Nordamerika, Europa oder Südostasien. Der MSCI World gewichtet Nordamerika mit knapp 70%. Wenn du das ausgleichen möchtest, kannst du einen europäischen Index hinzufügen.",
      p2: "Man spricht hier auch vom 'Home Bias' – der Tendenz, lieber in heimische Märkte zu investieren.",
      merke: "Gezielte Regionsinvestments können sinnvoll sein – verliere dabei die Diversifikation nicht aus dem Blick.",
    },
    en: {
      title: "Here you'll learn why it can make sense to invest in a specific region",
      p1: "Sometimes it can be advantageous to invest directly in a specific region – e.g. North America, Europe or Southeast Asia. The MSCI World weights North America at almost 70%. If you want to balance this out, you can add a European index.",
      p2: "This is also referred to as \"home bias\" – the tendency to prefer investing in domestic markets.",
      merke: "Targeted regional investments can be sensible – just don't lose sight of diversification.",
    },
    it: {
      title: "Qui impari perché può avere senso investire in una regione specifica",
      p1: "A volte può essere vantaggioso investire direttamente in una regione specifica – ad esempio Nord America, Europa o Sud-Est asiatico. L'MSCI World pesa il Nord America per quasi il 70%. Se vuoi bilanciare questo, puoi aggiungere un indice europeo.",
      p2: "Questo viene anche chiamato 'home bias' – la tendenza a preferire gli investimenti nei mercati domestici.",
      merke: "Gli investimenti regionali mirati possono essere sensati – ma non perdere di vista la diversificazione.",
    },
  }[lang];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
      <div style={bgSt}>
        <SubHead>{c.title}</SubHead>
        <Para>{c.p1}</Para>
        <Para>{c.p2}</Para>
      </div>
      <Merke text={c.merke} lang={lang} />
      <DoneBtn onClick={onDone} lang={lang} />
    </div>
  );
}

// 7.2 Länder
function LaenderMod({ onDone, lang }) {
  const c = {
    de: {
      title: "Hier lernst du, warum es Sinn machen kann, in ein einzelnes Land zu investieren",
      p1: "Du kannst direkt in ein einzelnes Land investieren – z.B. Deutschland über den DAX (40 größte deutsche Unternehmen). Gründe dafür: Du kennst das Land gut, verfolgst die Nachrichten, oder erwartest eine wirtschaftliche Erholung.",
      p2: "Der S&P 500 bildet die 500 größten US-Unternehmen ab.",
      merke: "Länderinvestments sind möglich und manchmal sinnvoll – aber Diversifikation bleibt die wichtigste Mission.",
    },
    en: {
      title: "Here you'll learn why it can make sense to invest in a single country",
      p1: "You can invest directly in a single country – e.g. Germany through the DAX (40 largest German companies). Reasons for this: you know the country well, follow the news, or expect an economic recovery.",
      p2: "The S&P 500 tracks the 500 largest US companies.",
      merke: "Country investments are possible and sometimes sensible – but diversification remains the most important mission.",
    },
    it: {
      title: "Qui impari perché può avere senso investire in un singolo paese",
      p1: "Puoi investire direttamente in un singolo paese – ad esempio la Germania tramite il DAX (le 40 maggiori aziende tedesche). Motivi: conosci bene il paese, segui le notizie, o ti aspetti una ripresa economica.",
      p2: "L'S&P 500 replica le 500 maggiori aziende statunitensi.",
      merke: "Gli investimenti nazionali sono possibili e talvolta sensati – ma la diversificazione rimane la missione più importante.",
    },
  }[lang];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
      <div style={bgSt}>
        <SubHead>{c.title}</SubHead>
        <Para>{c.p1}</Para>
        <Para>{c.p2}</Para>
      </div>
      <Merke text={c.merke} lang={lang} />
      <DoneBtn onClick={onDone} lang={lang} />
    </div>
  );
}

// 7.3 Industrien
function IndustrienMod({ onDone, lang }) {
  const c = {
    de: {
      title: "Hier lernst du, wie du dir unterschiedliche Industrien in deinem Portfolio zu Nutze machen kannst",
      p1: "Bekannte Branchen sind z.B. Telekommunikation, Finanzen, Tourismus, Technologie, Energie. Der MSCI World investiert bereits in viele Branchen gleichzeitig. Du kannst aber auch gezielt in eine Branche investieren – wenn du daran besonders glaubst oder Expertenwissen hast.",
      merke: "Brancheninvestments sind als Ergänzung sinnvoll – nicht als Ersatz für ein breit gestreutes Basisportfolio.",
    },
    en: {
      title: "Here you'll learn how to leverage different industries in your portfolio",
      p1: "Well-known sectors include telecommunications, finance, tourism, technology, energy. The MSCI World already invests in many sectors simultaneously. But you can also invest specifically in a sector – if you particularly believe in it or have expert knowledge.",
      merke: "Sector investments are useful as a complement – not as a replacement for a broadly diversified core portfolio.",
    },
    it: {
      title: "Qui impari come sfruttare i diversi settori industriali nel tuo portafoglio",
      p1: "I settori noti includono telecomunicazioni, finanza, turismo, tecnologia, energia. L'MSCI World investe già in molti settori simultaneamente. Ma puoi anche investire specificamente in un settore – se ci credi particolarmente o hai competenze specialistiche.",
      merke: "Gli investimenti settoriali sono utili come complemento – non come sostituto di un portafoglio base ampiamente diversificato.",
    },
  }[lang];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
      <div style={bgSt}>
        <SubHead>{c.title}</SubHead>
        <Para>{c.p1}</Para>
      </div>
      <Merke text={c.merke} lang={lang} />
      <DoneBtn onClick={onDone} lang={lang} />
    </div>
  );
}

// 7.4 Top ETFs
function TopetfsMod({ onDone, lang }) {
  const c = {
    de: {
      title: "Hier lernst du, welche Indizes du als angehender Investmentprofi kennen solltest",
      intro: "Die wichtigsten Indizes:",
      bullets: [
        "<strong>MSCI World</strong> – 60 Bio. € Marktkapitalisierung, 1.600+ Unternehmen, 23 Länder",
        "<strong>S&P 500</strong> – 500 größte US-Unternehmen",
        "<strong>NASDAQ 100</strong> – 100 größte Technologie-Unternehmen",
        "<strong>DAX</strong> – 40 größte deutsche Unternehmen",
        "<strong>Euro Stoxx 50</strong> – 50 größte europäische Unternehmen",
        "<strong>Nikkei 225</strong> – 225 japanische Unternehmen",
      ],
      merke: "MSCI World, S&P 500, DAX und NASDAQ 100 sind die bekanntesten Indizes weltweit.",
    },
    en: {
      title: "Here you'll learn which indices every aspiring investment professional should know",
      intro: "The most important indices:",
      bullets: [
        "<strong>MSCI World</strong> – €60 trillion market cap, 1,600+ companies, 23 countries",
        "<strong>S&P 500</strong> – 500 largest US companies",
        "<strong>NASDAQ 100</strong> – 100 largest technology companies",
        "<strong>DAX</strong> – 40 largest German companies",
        "<strong>Euro Stoxx 50</strong> – 50 largest European companies",
        "<strong>Nikkei 225</strong> – 225 Japanese companies",
      ],
      merke: "MSCI World, S&P 500, DAX and NASDAQ 100 are the most well-known indices worldwide.",
    },
    it: {
      title: "Qui impari quali indici ogni aspirante professionista degli investimenti dovrebbe conoscere",
      intro: "Gli indici più importanti:",
      bullets: [
        "<strong>MSCI World</strong> – capitalizzazione di mercato di 60 trilioni €, 1.600+ aziende, 23 paesi",
        "<strong>S&P 500</strong> – 500 maggiori aziende statunitensi",
        "<strong>NASDAQ 100</strong> – 100 maggiori aziende tecnologiche",
        "<strong>DAX</strong> – 40 maggiori aziende tedesche",
        "<strong>Euro Stoxx 50</strong> – 50 maggiori aziende europee",
        "<strong>Nikkei 225</strong> – 225 aziende giapponesi",
      ],
      merke: "MSCI World, S&P 500, DAX e NASDAQ 100 sono gli indici più conosciuti al mondo.",
    },
  }[lang];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
      <div style={bgSt}>
        <SubHead>{c.title}</SubHead>
        <Para>{c.intro}</Para>
        <Bullets items={c.bullets} />
      </div>
      <Merke text={c.merke} lang={lang} />
      <DoneBtn onClick={onDone} lang={lang} />
    </div>
  );
}

// 8.1 Rohstoffe
function RohstoffeMod({ onDone, lang }) {
  const c = {
    de: {
      title: "Hier lernst du, welche Gesichter Rohstoff-Investitionen haben können",
      p1: "Rohstoffe umfassen weit mehr als Öl und Gas: Industriemetalle (Kupfer, Nickel), Edelmetalle (Gold), Vieh und Agrarrohstoffe (Weizen, Kaffee). Rohstoffpreise werden durch Unsicherheiten (Krieg, Pandemie), Lieferprobleme und extreme Wetterverhältnisse beeinflusst.",
      p2: "Rohstoffe können eine solide Absicherung gegen die Inflation bieten – denn wenn die Preise im Alltag steigen, steigen oft auch die Rohstoffpreise.",
      merke: "Rohstoffe sind breit gefächert und können dein Portfolio gegen die Inflation absichern.",
    },
    en: {
      title: "Here you'll learn the many faces of commodity investments",
      p1: "Commodities encompass far more than oil and gas: industrial metals (copper, nickel), precious metals (gold), livestock and agricultural commodities (wheat, coffee). Commodity prices are influenced by uncertainties (war, pandemic), supply problems and extreme weather.",
      p2: "Commodities can provide solid protection against inflation – because when everyday prices rise, commodity prices often rise too.",
      merke: "Commodities are broad-based and can hedge your portfolio against inflation.",
    },
    it: {
      title: "Qui impari i molteplici volti degli investimenti in materie prime",
      p1: "Le materie prime comprendono molto più di petrolio e gas: metalli industriali (rame, nichel), metalli preziosi (oro), bestiame e materie prime agricole (grano, caffè). I prezzi delle materie prime sono influenzati da incertezze (guerra, pandemia), problemi di fornitura e condizioni meteorologiche estreme.",
      p2: "Le materie prime possono fornire una solida protezione contro l'inflazione – perché quando i prezzi quotidiani salgono, spesso salgono anche i prezzi delle materie prime.",
      merke: "Le materie prime sono su ampia base e possono proteggere il tuo portafoglio dall'inflazione.",
    },
  }[lang];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
      <div style={bgSt}>
        <SubHead>{c.title}</SubHead>
        <Para>{c.p1}</Para>
        <Para>{c.p2}</Para>
      </div>
      <Merke text={c.merke} lang={lang} />
      <DoneBtn onClick={onDone} lang={lang} />
    </div>
  );
}

// 8.2 Gold
function GoldMod({ onDone, lang }) {
  const c = {
    de: {
      title: "Hier lernst du, warum das wertvollste Metall eine Krisenabsicherung sein kann",
      p1: "Gold wird oft als 'sicherer Hafen' bezeichnet – in unsicheren Zeiten steigt der Goldkurs typischerweise. Während Corona und der Ukraine-Krise war das deutlich sichtbar. Gold profitiert auch, wenn es kaum Zinsen auf Sparkonten gibt.",
      p2: "Du kannst in Gold über XETRA-Gold-Zertifikate investieren – und dir das Gold sogar liefern lassen.",
      funfact: "Fun Fact: Alles Gold der Welt passt in einen Würfel mit 22m Seitenlänge.",
      merke: "Gold ist besonders in unsicheren Zeiten ein attraktiver Wegbegleiter. Es kann kurzfristige Verluste aus Aktieninvestments abfedern.",
    },
    en: {
      title: "Here you'll learn why the most valuable metal can be a crisis hedge",
      p1: "Gold is often called a \"safe haven\" – in uncertain times, the gold price typically rises. This was clearly visible during COVID and the Ukraine crisis. Gold also benefits when there are barely any interest rates on savings accounts.",
      p2: "You can invest in gold through XETRA Gold certificates – and even have the gold physically delivered to you.",
      funfact: "Fun Fact: All the gold in the world would fit in a cube with a side length of 22 meters.",
      merke: "Gold is particularly attractive in uncertain times. It can cushion short-term losses from equity investments.",
    },
    it: {
      title: "Qui impari perché il metallo più prezioso può essere una copertura contro le crisi",
      p1: "L'oro è spesso chiamato 'porto sicuro' – in tempi di incertezza, il prezzo dell'oro tipicamente sale. Questo è stato chiaramente visibile durante il COVID e la crisi ucraina. L'oro beneficia anche quando i tassi di interesse sui conti di risparmio sono quasi nulli.",
      p2: "Puoi investire in oro tramite certificati XETRA Gold – e farti persino consegnare fisicamente l'oro.",
      funfact: "Curiosità: tutto l'oro del mondo entrerebbe in un cubo con lato di 22 metri.",
      merke: "L'oro è particolarmente attraente in tempi di incertezza. Può attenuare le perdite a breve termine dagli investimenti azionari.",
    },
  }[lang];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
      <div style={bgSt}>
        <SubHead>{c.title}</SubHead>
        <Para>{c.p1}</Para>
        <Para>{c.p2}</Para>
        <Para><strong>{c.funfact}</strong></Para>
      </div>
      <Merke text={c.merke} lang={lang} />
      <DoneBtn onClick={onDone} lang={lang} />
    </div>
  );
}

// 8.3 Allwetter-Portfolio
function AllwetterMod({ onDone, lang }) {
  const c = {
    de: {
      title: "Allwetter-Portfolio (Dalio)",
      intro: "Ray Dalio, US-amerikanischer Hedgefonds-Manager, entwickelte ein Portfolio, das in jeder Marktphase eine positive Rendite anstreben soll:",
      bullets: ["<strong>55%</strong> Staatsanleihen", "<strong>30%</strong> Aktien", "<strong>15%</strong> Rohstoffe"],
      p: "Dieses Portfolio kann sich für dich eignen, wenn du turbulente Marktphasen ruhig erleben möchtest. Durch den hohen Anleihen-Anteil schwankt es weniger – wirft aber auch etwas weniger Rendite ab.",
    },
    en: {
      title: "All-weather portfolio (Dalio)",
      intro: "Ray Dalio, US hedge fund manager, developed a portfolio that aims for positive returns in every market phase:",
      bullets: ["<strong>55%</strong> Government bonds", "<strong>30%</strong> Equities", "<strong>15%</strong> Commodities"],
      p: "This portfolio may suit you if you want to experience turbulent market phases calmly. The high bond allocation means it fluctuates less – but also yields slightly less return.",
    },
    it: {
      title: "Portafoglio all-weather (Dalio)",
      intro: "Ray Dalio, gestore di hedge fund statunitense, ha sviluppato un portafoglio che mira a ottenere rendimenti positivi in ogni fase del mercato:",
      bullets: ["<strong>55%</strong> Obbligazioni governative", "<strong>30%</strong> Azioni", "<strong>15%</strong> Materie prime"],
      p: "Questo portafoglio potrebbe adattarsi a te se vuoi vivere le fasi di mercato turbolente con tranquillità. L'alta quota obbligazionaria fa sì che fluttui meno – ma produce anche un rendimento leggermente inferiore.",
    },
  }[lang];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
      <div style={bgSt}>
        <SubHead>{c.title}</SubHead>
        <Para>{c.intro}</Para>
        <Bullets items={c.bullets} />
        <Para style={{ marginTop: 10 }}>{c.p}</Para>
      </div>
      <DoneBtn onClick={onDone} lang={lang} />
    </div>
  );
}

// 8.4 REITs
function ReitsMod({ onDone, lang }) {
  const c = {
    de: {
      title: "Hier lernst du, wie du in Immobilien investieren kannst, ohne selbst eine zu besitzen",
      p1: "Mit einem REIT (Real Estate Investment Trust) investierst du mit wenigen Klicks in Wohnungen, Büros oder Hotels – ohne Notarkosten oder Maklergebühren. Ein REIT-ETF beinhaltet viele verschiedene REITs und streut dein Risiko automatisch.",
      merke: "Mit einem REIT-ETF investierst du mit wenigen Klicks in eine Vielzahl von Immobilien weltweit.",
    },
    en: {
      title: "Here you'll learn how to invest in real estate without owning any",
      p1: "With a REIT (Real Estate Investment Trust), you can invest in apartments, offices or hotels with just a few clicks – without notary fees or brokerage charges. A REIT ETF contains many different REITs and automatically diversifies your risk.",
      merke: "With a REIT ETF, you invest in a multitude of properties worldwide with just a few clicks.",
    },
    it: {
      title: "Qui impari come investire nel settore immobiliare senza possedere immobili",
      p1: "Con un REIT (Real Estate Investment Trust), investi in appartamenti, uffici o hotel con pochi clic – senza spese notarili o commissioni di intermediazione. Un ETF REIT contiene molti REIT diversi e diversifica automaticamente il tuo rischio.",
      merke: "Con un ETF REIT, investi in una moltitudine di immobili in tutto il mondo con pochi clic.",
    },
  }[lang];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
      <div style={bgSt}>
        <SubHead>{c.title}</SubHead>
        <Para>{c.p1}</Para>
      </div>
      <Merke text={c.merke} lang={lang} />
      <DoneBtn onClick={onDone} lang={lang} />
    </div>
  );
}

// 8.5 Weltportfolio
function WeltportfolioMod({ onDone, lang }) {
  const c = {
    de: {
      title: "Weltportfolio (Kommer)",
      intro: "Gerd Kommer, bekannter Investmentbanker, vereint alle vier Anlageklassen:",
      bullets: ["<strong>38%</strong> Aktien Industrieländer", "<strong>18%</strong> Aktien Schwellenländer", "<strong>30%</strong> Anleihen", "<strong>7%</strong> Rohstoffe", "<strong>7%</strong> Immobilien"],
      p1: "Dieses Portfolio eignet sich für Anleger, die sehr breit diversifiziert sein wollen und kurz-/mittelfristige Schwankungen akzeptieren.",
      p2: "Hinweis: Du hast jetzt alle vier Beispielportfolios kennengelernt und bist bereit, dein eigenes Portfolio aufzubauen.",
    },
    en: {
      title: "World portfolio (Kommer)",
      intro: "Gerd Kommer, well-known investment banker, combines all four asset classes:",
      bullets: ["<strong>38%</strong> Developed market equities", "<strong>18%</strong> Emerging market equities", "<strong>30%</strong> Bonds", "<strong>7%</strong> Commodities", "<strong>7%</strong> Real estate"],
      p1: "This portfolio is suitable for investors who want to be very broadly diversified and accept short/medium-term fluctuations.",
      p2: "Note: You have now learned about all four sample portfolios and are ready to build your own portfolio.",
    },
    it: {
      title: "Portafoglio mondiale (Kommer)",
      intro: "Gerd Kommer, noto banchiere d'investimento, combina tutte e quattro le classi di attività:",
      bullets: ["<strong>38%</strong> Azioni mercati sviluppati", "<strong>18%</strong> Azioni mercati emergenti", "<strong>30%</strong> Obbligazioni", "<strong>7%</strong> Materie prime", "<strong>7%</strong> Immobili"],
      p1: "Questo portafoglio è adatto agli investitori che vogliono essere molto ampiamente diversificati e accettano fluttuazioni a breve/medio termine.",
      p2: "Nota: Hai ora conosciuto tutti e quattro i portafogli campione e sei pronto per costruire il tuo portafoglio.",
    },
  }[lang];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
      <div style={bgSt}>
        <SubHead>{c.title}</SubHead>
        <Para>{c.intro}</Para>
        <Bullets items={c.bullets} />
        <Para style={{ marginTop: 10 }}>{c.p1}</Para>
        <Para><strong>{lang === "de" ? "Hinweis:" : lang === "en" ? "Note:" : "Nota:"}</strong> {c.p2.replace(/^Hinweis: |^Note: |^Nota: /, "")}</Para>
      </div>
      <DoneBtn onClick={onDone} lang={lang} />
    </div>
  );
}

function ModuleContent({ type, onDone, lang }) {
  const map = {
    rentenlücke: RentenlückeMod,
    inflation: InflationMod,
    compound: CompoundMod,
    liquidity: LiquidityMod,
    security: SecurityMod,
    safety: SafetyMod,
    aktien: AktienMod,
    diversifikation: DiversifikationMod,
    etf: EtfMod,
    index: IndexMod,
    portfolio7030: Portfolio7030Mod,
    topup: TopupMod,
    ruhe: RuheMod,
    timing: TimingMod,
    goals: GoalsMod,
    dauerauftrag: DauerauftragMod,
    sparplan: SparplanMod,
    etfanbieter: EtfanbieterMod,
    etfwaehrung: EtfwaehrungMod,
    etfkosten: EtfkostenMod,
    ausschuettung: AusschuettungMod,
    entwicklung: EntwicklungMod,
    steuer: SteuerMod,
    isin: IsinMod,
    freistellung: FreistellungMod,
    zeithorizont: ZeithorizontMod,
    anleihen: AnleihenMod,
    ratings: RatingsMod,
    anleihenarten: AnleihenartenMod,
    portfolio6040: Portfolio6040Mod,
    regionen: RegionenMod,
    laender: LaenderMod,
    industrien: IndustrienMod,
    topetfs: TopetfsMod,
    rohstoffe: RohstoffeMod,
    gold: GoldMod,
    allwetter: AllwetterMod,
    reits: ReitsMod,
    weltportfolio: WeltportfolioMod,
  };
  const Comp = map[type];
  if (Comp) return <Comp onDone={onDone} lang={lang} />;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
      <div style={bgSt}><Para>{S[lang]?.moduleCreating || "Modul wird erstellt..."}</Para></div>
      <DoneBtn onClick={onDone} lang={lang} />
    </div>
  );
}

// ─── MOTIVATION OVERLAY ───
function MotivationOverlay({ onComplete, lang, onLangChange }) {
  const [step, setStep] = useState("goal");
  const [goalId, setGoalId] = useState(null);
  const [score, setScore] = useState(5);
  const [cash, setCash] = useState(15000);
  const [age, setAge] = useState(28);
  const [monthly, setMonthly] = useState(150);

  const s = S[lang] || S.de;
  const goals = s.goals;
  const goalCommit = s.goalCommit;

  const years = Math.max(5, 65 - age);
  const r = 0.07 / 12;
  const n = years * 12;
  const fvWithout = Math.round(cash * Math.pow(0.98, years));
  const fvInvested = Math.round(cash * Math.pow(1 + r, n) + monthly * ((Math.pow(1 + r, n) - 1) / r));
  const monthlyLoss = Math.max(1, Math.round(cash * 0.02 / 12));
  const totalLoss = cash - fvWithout;
  const gain = fvInvested - fvWithout;

  const g = goals.find(x => x.id === goalId);
  const gc = goalCommit[goalId] || goalCommit.smart;
  const isLow = score < 5;

  const stepOrder = ["goal", "importance", "reality", "futures", "commit"];
  const stepIdx = stepOrder.indexOf(step);
  const progress = (stepIdx + 1) / (isLow ? 5 : 2);
  const backStep = { importance: "goal", reality: "importance", futures: "reality", commit: "futures" };

  const renderStep = () => {
    if (step === "goal") return (
      <div>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>👋</div>
          <div style={{ fontWeight: 900, fontSize: 24, color: Q.deepBlue, lineHeight: 1.2, marginBottom: 8 }}>{s.beforeStart}</div>
          <div style={{ fontSize: 15, color: Q.neutralDark, lineHeight: 1.5 }}>{s.beforeStartSub}</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 28 }}>
          {goals.map(gl => (
            <button key={gl.id} onClick={() => setGoalId(gl.id)} style={{
              display: "flex", flexDirection: "column", alignItems: "flex-start", padding: "16px 14px",
              borderRadius: 14, border: goalId === gl.id ? `2px solid ${Q.electricBlue}` : `1.5px solid ${Q.deepBlue10}`,
              background: goalId === gl.id ? Q.electricBlueLight : Q.white,
              cursor: "pointer", textAlign: "left", transition: "all .15s",
            }}>
              <div style={{ fontSize: 22, marginBottom: 6 }}>{gl.icon}</div>
              <div style={{ fontWeight: 800, fontSize: 13, color: goalId === gl.id ? Q.electricBlue : Q.deepBlue, marginBottom: 2 }}>{gl.label}</div>
              <div style={{ fontSize: 11, color: Q.neutralDark, lineHeight: 1.4 }}>{gl.desc}</div>
            </button>
          ))}
        </div>
        <button disabled={!goalId} onClick={() => setStep("importance")} style={{
          width: "100%", padding: "17px", borderRadius: Q.radiusPill, border: "none",
          background: goalId ? Q.electricBlue : Q.deepBlue10, color: goalId ? "#fff" : Q.neutralDark,
          fontWeight: 800, fontSize: 16, cursor: goalId ? "pointer" : "default", transition: "all .2s",
        }}>{s.next}</button>
      </div>
    );

    if (step === "importance") return (
      <div>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ fontSize: 32, marginBottom: 10 }}>{g?.icon}</div>
          <div style={{ fontWeight: 900, fontSize: 22, color: Q.deepBlue, lineHeight: 1.3, marginBottom: 8 }}>{s.importancePre}<br/>{g?.label} {lang === "de" ? "gerade?" : "?"}</div>
          <div style={{ fontSize: 14, color: Q.neutralDark, lineHeight: 1.5 }}>{s.importanceSub}</div>
        </div>
        <div style={{ background: "#f5f5f5", borderRadius: 16, padding: "24px 16px", marginBottom: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: Q.neutralDark, marginBottom: 14 }}>
            <span>{s.notReally}</span><span>{s.absolutelyDecisive}</span>
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
            <div style={{ fontSize: 12, color: Q.neutralDark }}>{lang === "de" ? "von 10" : lang === "en" ? "out of 10" : "su 10"}</div>
          </div>
        </div>
        <button onClick={() => isLow ? setStep("reality") : onComplete()} style={{
          width: "100%", padding: "17px", borderRadius: Q.radiusPill, border: "none",
          background: score >= 5 ? Q.electricBlue : Q.deepBlue, color: "#fff",
          fontWeight: 800, fontSize: 16, cursor: "pointer",
        }}>{s.continueCTA(score)}</button>
      </div>
    );

    if (step === "reality") return (
      <div>
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontWeight: 900, fontSize: 22, color: Q.deepBlue, lineHeight: 1.3, marginBottom: 8 }}>{s.shortPause}</div>
          <div style={{ fontSize: 15, color: Q.neutralDark, lineHeight: 1.6 }}>{s.shortPauseSub(g?.label)}</div>
        </div>
        <div style={{ background: Q.dangerBg, border: `1.5px solid ${Q.danger}22`, borderRadius: 20, padding: "22px", marginBottom: 16, textAlign: "center" }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: Q.danger, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6 }}>{s.losingPerMonth}</div>
          <div style={{ fontWeight: 900, fontSize: 48, color: Q.danger, lineHeight: 1 }}>−{monthlyLoss.toLocaleString("de-DE")} €</div>
          <div style={{ fontSize: 13, color: Q.deepBlue, marginTop: 8, lineHeight: 1.55 }}>{s.throughInflation}</div>
        </div>
        <div style={{ background: "#F6F7F8", borderRadius: 20, padding: "20px", marginBottom: 20 }}>
          <div style={{ fontWeight: 700, fontSize: 13, color: Q.deepBlue, marginBottom: 14 }}>{s.adjustCalc}</div>
          <Sld label={s.moneyOnAccount} min={1000} max={100000} step={1000} value={cash} onChange={setCash} unit=" €" />
          <Sld label={s.myAge} min={18} max={60} step={1} value={age} onChange={setAge} unit={lang === "de" ? " Jahre" : lang === "en" ? " years" : " anni"} />
          <div style={{ marginTop: 12, display: "flex", gap: 10 }}>
            <div style={{ flex: 1, background: Q.white, borderRadius: 12, padding: "12px 14px", border: `1.5px solid ${Q.deepBlue10}` }}>
              <div style={{ fontSize: 11, color: Q.neutralDark }}>{s.monthlyLossLabel}</div>
              <div style={{ fontWeight: 900, fontSize: 18, color: Q.danger }}>−{monthlyLoss.toLocaleString("de-DE")} €</div>
            </div>
            <div style={{ flex: 1, background: Q.white, borderRadius: 12, padding: "12px 14px", border: `1.5px solid ${Q.deepBlue10}` }}>
              <div style={{ fontSize: 11, color: Q.neutralDark }}>{s.untilRetirement}</div>
              <div style={{ fontWeight: 900, fontSize: 18, color: Q.danger }}>−{totalLoss.toLocaleString("de-DE")} €</div>
            </div>
          </div>
        </div>
        <button onClick={() => setStep("futures")} style={{
          width: "100%", padding: "17px", borderRadius: Q.radiusPill, border: "none",
          background: Q.deepBlue, color: "#fff", fontWeight: 800, fontSize: 16, cursor: "pointer",
        }}>{s.showAlternative}</button>
      </div>
    );

    if (step === "futures") return (
      <div>
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontWeight: 900, fontSize: 22, color: Q.deepBlue, lineHeight: 1.3, marginBottom: 8 }}>{s.twoFutures}</div>
          <div style={{ fontSize: 15, color: Q.neutralDark, lineHeight: 1.5 }}>{s.twoFuturesSub(years)}</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
          <div style={{ background: "#F6F7F8", borderRadius: 20, padding: "20px 14px", textAlign: "center" }}>
            <div style={{ fontSize: 26, marginBottom: 8 }}>😐</div>
            <div style={{ fontWeight: 800, fontSize: 12, color: Q.deepBlue, marginBottom: 4 }}>{s.savingsOnly}</div>
            <div style={{ fontSize: 10, color: Q.neutralDark, marginBottom: 14, lineHeight: 1.4 }}>{s.nothingChanged}</div>
            <div style={{ fontWeight: 900, fontSize: 20, color: Q.neutralDark }}>{fvWithout.toLocaleString("de-DE")} €</div>
            <div style={{ fontSize: 10, color: Q.neutralDark, marginTop: 4 }}>{s.purchasingPowerIn} {years} {s.yearsShort}</div>
          </div>
          <div style={{ background: `linear-gradient(135deg, ${Q.electricBlue}0E, ${Q.purple}08)`, border: `2px solid ${Q.electricBlue}28`, borderRadius: 20, padding: "20px 14px", textAlign: "center" }}>
            <div style={{ fontSize: 26, marginBottom: 8 }}>😊</div>
            <div style={{ fontWeight: 800, fontSize: 12, color: Q.electricBlue, marginBottom: 4 }}>{s.withSavingsPlan}</div>
            <div style={{ fontSize: 10, color: Q.neutralDark, marginBottom: 14, lineHeight: 1.4 }}>{monthly} €/Mon · {s.monthsAt || "7% p.a."}</div>
            <div style={{ fontWeight: 900, fontSize: 20, color: Q.electricBlue }}>{fvInvested.toLocaleString("de-DE")} €</div>
            <div style={{ fontSize: 10, color: Q.neutralDark, marginTop: 4 }}>{s.wealthBuilt}</div>
          </div>
        </div>
        <div style={{ background: Q.electricBlue + "0C", border: `1.5px solid ${Q.electricBlue}22`, borderRadius: 16, padding: "14px", marginBottom: 16, textAlign: "center" }}>
          <div style={{ fontSize: 12, color: Q.neutralDark, marginBottom: 2 }}>{s.differenceIn} {years} {s.yearsShort}</div>
          <div style={{ fontWeight: 900, fontSize: 32, color: Q.electricBlue }}>+{gain.toLocaleString("de-DE")} €</div>
        </div>
        <div style={{ marginBottom: 20 }}>
          <Sld label={s.adjustSavingsRate} min={25} max={500} step={25} value={monthly} onChange={setMonthly} unit=" €" />
        </div>
        <button onClick={() => setStep("commit")} style={{
          width: "100%", padding: "17px", borderRadius: Q.radiusPill, border: "none",
          background: Q.electricBlue, color: "#fff", fontWeight: 800, fontSize: 16, cursor: "pointer",
        }}>{s.iUnderstood}</button>
      </div>
    );

    if (step === "commit") return (
      <div>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ fontSize: 52, marginBottom: 14 }}>{g?.icon}</div>
          <div style={{ fontWeight: 900, fontSize: 23, color: Q.deepBlue, lineHeight: 1.25, marginBottom: 14 }}>{gc.headline}</div>
          <div style={{ fontSize: 15, color: Q.neutralDark, lineHeight: 1.65 }}>{gc.sub}</div>
        </div>
        <div style={{ background: "#F6F7F8", borderRadius: 20, padding: "20px", marginBottom: 24, textAlign: "center" }}>
          <div style={{ fontSize: 13, color: Q.neutralDark, marginBottom: 4 }}>{s.courseDuration}</div>
          <div style={{ fontWeight: 900, fontSize: 32, color: Q.deepBlue }}>{s.courseTime}</div>
          <div style={{ fontSize: 13, color: Q.neutralDark, marginTop: 6, lineHeight: 1.5 }}>{s.courseDurationDesc}</div>
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
      <div style={{ position: "sticky", top: 0, background: Q.white, borderBottom: `1px solid ${Q.divider}`, padding: "14px 24px 10px", zIndex: 10 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <img src="/unicredit-logo.png" alt="UniCredit" style={{ height: 24, width: "auto" }} />
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <LangSwitcher lang={lang} setLang={onLangChange} />
            {step !== "goal" && (
              <button onClick={() => setStep(backStep[step])} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, color: Q.neutralDark, padding: "4px 8px" }}>{lang === "de" ? "‹ Zurück" : lang === "en" ? "‹ Back" : "‹ Indietro"}</button>
            )}
          </div>
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
// Maps each level to a deep link action
const LEVEL_DEEP_LINK = { 1: "openAccount", 2: "openAccount", 3: "firstInvestment" };

function LevelCompleteView({ completedLevel, nextLevel, onStartNextLevel, onGoHome, lang }) {
  const s = S[lang] || S.de;
  const t = completedLevel.transition;
  const dlKey = LEVEL_DEEP_LINK[completedLevel.id] || null;

  if (!t) {
    return (
      <div style={{ minHeight: "100vh", background: Q.pageBg, fontFamily: Q.font, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 24px", textAlign: "center" }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>🎉</div>
        <div style={{ fontWeight: 900, fontSize: 28, color: Q.deepBlue, marginBottom: 10 }}>{s.courseComplete}</div>
        <div style={{ fontSize: 15, color: Q.neutralDark, maxWidth: 380, lineHeight: 1.6, marginBottom: 32 }}>{s.courseCompleteDesc}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%", maxWidth: 340 }}>
          {s.courseCompleteBullets.map((bullet, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, background: "#F6F7F8", borderRadius: 14, padding: "12px 16px", textAlign: "left" }}>
              <span style={{ fontSize: 16, flexShrink: 0 }}>✅</span>
              <span style={{ fontSize: 13, color: Q.deepBlue, fontWeight: 600 }}>{bullet}</span>
            </div>
          ))}
        </div>
        <button onClick={onGoHome} style={{ marginTop: 32, padding: "16px 40px", borderRadius: Q.radiusPill, border: "none", background: Q.electricBlue, color: "#fff", fontWeight: 800, fontSize: 16, cursor: "pointer" }}>
          {s.overview}
        </button>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: Q.pageBg, fontFamily: Q.font }}>
      <div style={{ position: "sticky", top: 0, zIndex: 10, background: Q.white, borderBottom: `1px solid ${Q.divider}`, padding: "14px 20px", display: "flex", alignItems: "center", gap: 12 }}>
        <button onClick={onGoHome} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 20, color: Q.deepBlue, padding: "2px 6px", fontWeight: 400 }}>‹</button>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: Q.electricBlue, textTransform: "uppercase", letterSpacing: 0.8 }}>{s.levelX} {completedLevel.id} {s.levelCompleted}</div>
          <div style={{ fontSize: 14, fontWeight: 600, color: Q.deepBlue }}>{completedLevel.title[lang]}</div>
        </div>
      </div>

      <div style={{ padding: "28px 20px 60px", maxWidth: 600, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ width: 80, height: 80, borderRadius: "50%", background: Q.electricBlueLight, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 38, marginBottom: 16 }}>
            {completedLevel.icon}
          </div>
          <div style={{ fontWeight: 900, fontSize: 26, color: Q.deepBlue, lineHeight: 1.2, marginBottom: 8 }}>
            {t.heading[lang]}
          </div>
          <div style={{ fontSize: 13, color: Q.neutralDark }}>{s.levelX} {completedLevel.id} {s.levelOf} {LEVELS.length} {s.levelDone}</div>
        </div>

        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: Q.neutralDark, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 14 }}>{s.whatChanged}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {t.changes[lang].map((change, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 14, borderBottom: `1px solid ${Q.divider}`, padding: "14px 0" }}>
                <div style={{ width: 26, height: 26, borderRadius: "50%", background: Q.electricBlueLight, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}><span style={{ color: Q.electricBlue, fontSize: 12, fontWeight: 700 }}>✓</span></div>
                <span style={{ fontSize: 14, color: Q.deepBlue, lineHeight: 1.55, fontWeight: 500 }}>{change}</span>
              </div>
            ))}
          </div>
        </div>

        {dlKey && (
          <div style={{ marginBottom: 28 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: Q.neutralDark, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 12 }}>
              {lang === "de" ? "Jetzt anwenden" : lang === "en" ? "Apply now" : "Applica ora"}
            </div>
            <ActionBtn deepLinkKey={dlKey} lang={lang} variant="card" />
          </div>
        )}

        {nextLevel && (
          <div style={{ background: "#f5f5f5", borderRadius: 16, padding: "20px 18px", marginBottom: 28 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: Q.electricBlue, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 12 }}>{s.nextLevelLabel} {nextLevel.id}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
              <div style={{ width: 48, height: 48, borderRadius: "50%", background: Q.electricBlueLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>
                {nextLevel.icon}
              </div>
              <div>
                <div style={{ fontWeight: 900, fontSize: 17, color: Q.deepBlue }}>{nextLevel.title[lang]}</div>
                <div style={{ fontSize: 12, color: Q.neutralDark, marginTop: 2 }}>{nextLevel.modules.length} {s.modules} · {nextLevel.tag[lang]}</div>
              </div>
            </div>
            <p style={{ fontSize: 14, color: Q.deepBlue, lineHeight: 1.6, margin: 0 }}>{t.nextTeaser[lang]}</p>
          </div>
        )}

        <button onClick={onStartNextLevel} style={{ width: "100%", padding: "18px 24px", borderRadius: Q.radiusPill, border: "none", background: Q.electricBlue, color: "#fff", fontWeight: 800, fontSize: 16, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, boxShadow: `0 4px 20px ${Q.electricBlue}40` }}>
          <span>{nextLevel ? s.continueToLevel(nextLevel.id, nextLevel.title[lang]) : s.overview}</span>
          <span style={{ fontSize: 18 }}>→</span>
        </button>
      </div>
    </div>
  );
}

// ─── UNICREDIT LOGO ───
function QIcon({ size }) {
  return <img src="/unicredit-logo.png" alt="UniCredit" style={{ height: size || 20, width: "auto" }} />;
}

// ═══════════════════════════════════════
// ─── MAIN APP ───
// ═══════════════════════════════════════
export default function UniCreditKurs() {
  const [lang, setLang] = useState("de");
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

  const s = S[lang] || S.de;
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

  const stickyBar = { position: "sticky", top: 0, zIndex: 10, background: Q.white, borderBottom: `1px solid ${Q.divider}`, padding: "14px 20px", display: "flex", alignItems: "center", gap: 12 };
  const backBtn = (fn) => <button onClick={fn} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 20, color: Q.deepBlue, padding: "2px 6px", fontWeight: 400 }}>‹</button>;

  // ─── MOTIVATION OVERLAY ───
  if (!overlayDone) {
    return <MotivationOverlay lang={lang} onLangChange={setLang} onComplete={() => {
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
        lang={lang}
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
      <div style={{ minHeight: "100vh", background: Q.pageBg, fontFamily: Q.font, paddingBottom: 40 }}>
        <div style={stickyBar}>
          {backBtn(() => goLevel(LEVELS.indexOf(level)))}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: Q.electricBlue, textTransform: "uppercase", letterSpacing: 0.8 }}>{s.levelX} {level.id}</div>
            <div style={{ fontSize: 14, fontWeight: 600, color: Q.deepBlue, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{mod.title[lang]}</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ fontSize: 12, color: Q.neutralDark, flexShrink: 0 }}>{mod.dur}</div>
            <LangSwitcher lang={lang} setLang={setLang} />
          </div>
        </div>
        <div ref={scrollRef} style={{ padding: 20, maxWidth: 600, margin: "0 auto", paddingBottom: 40 }}>
          <ModuleContent type={mod.type} onDone={() => completeMod(mod.id)} lang={lang} />
        </div>
      </div>
    );
  }

  // ─── LEVEL VIEW ───
  if (view === "level") {
    const level = LEVELS[levelIdx];
    const lDone = level.modules.filter(m => done[m.id]).length;
    return (
      <div style={{ minHeight: "100vh", background: Q.pageBg, fontFamily: Q.font, paddingBottom: 40 }}>
        <div style={stickyBar}>
          {backBtn(goHome)}
          <div style={{ flex: 1 }}><div style={{ fontSize: 14, fontWeight: 700, color: Q.deepBlue }}>{s.levelX} {level.id}: {level.title[lang]}</div></div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 12, color: Q.neutralDark }}>{lDone}/{level.modules.length}</span>
            <LangSwitcher lang={lang} setLang={setLang} />
          </div>
        </div>
        <div ref={scrollRef} style={{ padding: "24px 20px 40px", maxWidth: 600, margin: "0 auto" }}>
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
              <div style={{ width: 44, height: 44, borderRadius: "50%", display: "flex", alignItems: "center",
                justifyContent: "center", background: Q.electricBlueLight, fontSize: 22, flexShrink: 0 }}>
                {level.icon}
              </div>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
                  <span style={{ fontWeight: 700, fontSize: 17, color: Q.deepBlue }}>{level.title[lang]}</span>
                </div>
                <span style={{ padding: "2px 10px", borderRadius: Q.radiusPill, background: Q.electricBlueLight,
                  color: Q.electricBlue, fontSize: 11, fontWeight: 600 }}>{level.tag[lang]}</span>
              </div>
            </div>
            <div style={{ fontSize: 13, color: Q.neutralDark, marginBottom: 14 }}>{level.desc[lang]}</div>
            <div style={{ height: 4, background: Q.deepBlue10, borderRadius: 100, overflow: "hidden" }}>
              <div style={{ height: "100%", background: Q.electricBlue, borderRadius: 100, transition: "width .5s", width: `${(lDone / level.modules.length) * 100}%` }} />
            </div>
          </div>
          <div style={{ height: 1, background: Q.divider, marginBottom: 16 }} />
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {level.modules.map((mod, i) => {
              const isDone = done[mod.id];
              const isHovered = hoveredModule === mod.id;
              return (
                <button key={mod.id} onClick={() => goModule(mod.id)}
                  onMouseEnter={() => setHoveredModule(mod.id)}
                  onMouseLeave={() => setHoveredModule(null)}
                  style={{
                    display: "flex", alignItems: "center", gap: 14, width: "100%", textAlign: "left",
                    padding: "14px 4px", cursor: "pointer", border: "none", borderBottom: `1px solid ${Q.divider}`,
                    borderRadius: 0,
                    background: "transparent",
                    transition: "background .15s ease",
                  }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", display: "flex", alignItems: "center",
                    justifyContent: "center", flexShrink: 0,
                    background: isDone ? Q.successBg : Q.electricBlueLight,
                    color: isDone ? Q.success : Q.electricBlue, fontWeight: 700, fontSize: 14 }}>
                    {isDone ? "✓" : i + 1}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 14, color: Q.deepBlue }}>{mod.title[lang]}</div>
                    <div style={{ fontSize: 12, color: Q.neutralDark, marginTop: 2 }}>{mod.dur}</div>
                  </div>
                  <span style={{ color: Q.electricBlue, fontSize: 20, fontWeight: 400, marginRight: 2 }}>›</span>
                </button>
              );
            })}
          </div>
          {LEVEL_DEEP_LINK[level.id] && (
            <div style={{ marginTop: 28 }}>
              <ActionBtn deepLinkKey={LEVEL_DEEP_LINK[level.id]} lang={lang} variant="card" />
            </div>
          )}
        </div>
      </div>
    );
  }

  // ─── HOME VIEW ───
  const progress = total > 0 ? (doneCount / total) * 100 : 0;
  return (
    <div style={{ minHeight: "100vh", background: Q.pageBg, fontFamily: Q.font }}>

      {/* ── "Startseite"-style header ── */}
      <div style={{ padding: "52px 20px 16px", background: Q.white, borderBottom: `1px solid ${Q.divider}` }}>
        <div style={{ maxWidth: 600, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontWeight: 700, fontSize: 24, color: Q.deepBlue, letterSpacing: -0.3 }}>
            {lang === "de" ? "In 30 Minuten Investieren lernen" : lang === "en" ? "Learn Investing in 30 Minutes" : "Impara a investire in 30 minuti"}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <LangSwitcher lang={lang} setLang={setLang} />
            <img src="/unicredit-logo.png" alt="UniCredit" style={{ height: 28, width: "auto" }} />
          </div>
        </div>
      </div>

      <div ref={scrollRef} style={{ maxWidth: 600, margin: "0 auto", padding: "0 20px" }}>

        {/* ── Feature card (slate blue-gray) ── */}
        <div style={{ borderRadius: "18px", background: Q.slateCard, padding: "24px 24px 20px", marginTop: 20, marginBottom: 6, overflow: "hidden", position: "relative" }}>
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 22, color: "#000", lineHeight: 1.2, marginBottom: 6, whiteSpace: "pre-line" }}>{s.headline}</div>
            <div style={{ fontSize: 12, color: "rgba(0,0,0,0.6)", marginBottom: 20 }}>{s.subhead}</div>
            <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
              {[{ l: s.streak, v: streak, icon: "🔥" }, { l: s.points, v: pts, icon: "⭐" }, { l: s.modules, v: `${doneCount}/${total}`, icon: "📚" }].map((st, i) => (
                <div key={i} style={{ flex: 1, textAlign: "center" }}>
                  <div style={{ fontSize: 16, fontWeight: 700, color: "#000" }}>{st.v}</div>
                  <div style={{ fontSize: 10, color: "rgba(0,0,0,0.5)", fontWeight: 500, textTransform: "uppercase", letterSpacing: 0.4 }}>{st.l}</div>
                </div>
              ))}
            </div>
            <div style={{ height: 4, background: "rgba(0,0,0,0.15)", borderRadius: 100, overflow: "hidden" }}>
              <div style={{ height: "100%", background: "#000", borderRadius: 100, transition: "width .5s", width: `${progress}%` }} />
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 6 }}>
              <span style={{ fontSize: 11, color: "rgba(0,0,0,0.5)", fontWeight: 600 }}>{Math.round(progress)}% {s.progress}</span>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 6, marginBottom: 24 }}>
          {[0].map(i => <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: Q.electricBlue }} />)}
          {[1,2].map(i => <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: Q.deepBlue10 }} />)}
        </div>

        {/* ── Level list ── */}
        {LEVELS.map((level, li) => {
          const lDone = level.modules.filter(m => done[m.id]).length;
          const allDone = lDone === level.modules.length;
          const isHovered = hoveredLevel === level.id;
          const isLocked = level.id >= 4;

          if (isLocked) {
            return (
              <div key={level.id} style={{ position: "relative", borderBottom: `1px solid ${Q.divider}` }}>
                {/* Blurred row underneath */}
                <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 0", filter: "blur(3px)", userSelect: "none", pointerEvents: "none" }}>
                  <div style={{ width: 44, height: 44, borderRadius: "50%", display: "flex", alignItems: "center",
                    justifyContent: "center", background: Q.deepBlue5, fontSize: 20, flexShrink: 0 }}>
                    {level.icon}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: 15, color: Q.deepBlue, marginBottom: 2 }}>{level.title[lang]}</div>
                    <div style={{ fontSize: 12, color: Q.neutralDark }}>{level.desc[lang]}</div>
                  </div>
                  <span style={{ color: Q.deepBlue30, fontSize: 22, flexShrink: 0 }}>›</span>
                </div>
                {/* Lock overlay — only on the first locked level, spanning all remaining */}
                {level.id === 4 && (
                  <div style={{
                    position: "absolute", top: 0, left: -20, right: -20,
                    height: `${(LEVELS.length - 3) * 73 + 80}px`,
                    background: "linear-gradient(to bottom, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.97) 30%)",
                    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start",
                    paddingTop: 40, zIndex: 5,
                  }}>
                    <div style={{ width: 44, height: 44, borderRadius: "50%", background: Q.electricBlueLight, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={Q.electricBlue} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                        <path d="M7 11V7a5 5 0 0110 0v4"/>
                      </svg>
                    </div>
                    <div style={{ fontWeight: 700, fontSize: 15, color: Q.deepBlue, textAlign: "center", marginBottom: 6 }}>
                      Sichtbar für aktive
                    </div>
                    <div style={{ fontWeight: 700, fontSize: 15, color: Q.electricBlue, textAlign: "center" }}>
                      Enterprise Partner von beatvest
                    </div>
                  </div>
                )}
              </div>
            );
          }

          return (
            <button key={level.id} onClick={() => goLevel(li)}
              onMouseEnter={() => setHoveredLevel(level.id)}
              onMouseLeave={() => setHoveredLevel(null)}
              style={{
                display: "flex", alignItems: "center", gap: 14,
                width: "100%", padding: "14px 0", cursor: "pointer",
                border: "none", borderBottom: `1px solid ${Q.divider}`,
                background: isHovered ? Q.electricBlueLight : "transparent",
                textAlign: "left", transition: "background .15s ease",
                borderRadius: isHovered ? 12 : 0,
              }}>
              <div style={{ width: 44, height: 44, borderRadius: "50%", display: "flex", alignItems: "center",
                justifyContent: "center", background: allDone ? Q.successBg : Q.electricBlueLight,
                fontSize: 20, flexShrink: 0 }}>
                {allDone ? "✅" : level.icon}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 600, fontSize: 15, color: Q.deepBlue, marginBottom: 2 }}>{level.title[lang]}</div>
                <div style={{ fontSize: 12, color: Q.neutralDark }}>{level.desc[lang]}</div>
                {!allDone && lDone > 0 && (
                  <div style={{ height: 3, background: Q.deepBlue10, borderRadius: 100, overflow: "hidden", marginTop: 6, maxWidth: 100 }}>
                    <div style={{ height: "100%", background: Q.electricBlue, borderRadius: 100, transition: "width .5s", width: `${(lDone / level.modules.length) * 100}%` }} />
                  </div>
                )}
              </div>
              <span style={{ color: Q.electricBlue, fontSize: 22, fontWeight: 400, flexShrink: 0 }}>›</span>
            </button>
          );
        })}
      </div>

    </div>
  );
}
