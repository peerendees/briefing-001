"use client";
import { useState } from "react";

const TAB_BRIEFING = "briefing";
const TAB_GESPRAECH = "gespraech";

export default function Home() {
  const [tab, setTab] = useState(TAB_BRIEFING);

  async function logout() {
    await fetch("/api/logout", { method: "POST" });
    window.location.href = "/login";
  }

  return (
    <>
      <style>{css}</style>
      <nav className="nav">
        <div className="nav-brand">
          <PlusMark size={16} />
          <span>BERENT.AI — Beratung + Entwicklung</span>
        </div>
        <button className="logout-btn" onClick={logout}>Abmelden</button>
      </nav>

      <main className="main">
        <div className="tabs">
          <button className={`tab-btn${tab === TAB_BRIEFING ? " active" : ""}`} onClick={() => setTab(TAB_BRIEFING)}>
            Dok. 1 — Wolfgang-Briefing
          </button>
          <button className={`tab-btn${tab === TAB_GESPRAECH ? " active" : ""}`} onClick={() => setTab(TAB_GESPRAECH)}>
            Dok. 2 — Gesprächsplan
          </button>
        </div>

        {tab === TAB_BRIEFING && <BriefingPanel />}
        {tab === TAB_GESPRAECH && <GespraechPanel />}
      </main>

      <footer className="footer">
        <div className="footer-brand"><PlusMark size={14} /><span>BERENT.AI</span></div>
        <span>FOLBB · Projekt-Briefing · Vertraulich</span>
        <div className="footer-links">
          <a href="https://berent.ai/impressum.html">Impressum</a>
          <a href="https://berent.ai">← berent.ai</a>
        </div>
      </footer>
    </>
  );
}

function PlusMark({ size = 16 }: { size?: number }) {
  return (
    <span style={{ position: "relative", display: "inline-block", width: size, height: size, flexShrink: 0 }}>
      <span style={{ position: "absolute", left: "50%", top: 0, width: 2, height: "100%", background: "#E8C98A", transform: "translateX(-50%)", borderRadius: 1 }} />
      <span style={{ position: "absolute", top: "50%", left: 0, width: "100%", height: 2, background: "#E8C98A", transform: "translateY(-50%)", borderRadius: 1 }} />
    </span>
  );
}

function Infobox({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="infobox">
      <div className="infobox-label">{label}</div>
      {children}
    </div>
  );
}

function Warnbox({ children }: { children: React.ReactNode }) {
  return (
    <div className="warnbox">
      <div className="warnbox-label">⚠ Politische Dimension</div>
      {children}
    </div>
  );
}

function Stratbox({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="stratbox">
      <div className="stratbox-label">{label}</div>
      {children}
    </div>
  );
}

function Phase({ num, title, time, children }: { num: string; title: string; time: string; children: React.ReactNode }) {
  return (
    <div className="phase">
      <div className="phase-header">
        <span className="phase-num">{num}</span>
        <span className="phase-title">{title}</span>
        <span className="phase-time">{time}</span>
      </div>
      <div className="phase-body">{children}</div>
    </div>
  );
}

function BriefingPanel() {
  return (
    <div>
      <h1>Wolfgang-Briefing</h1>
      <div className="doc-meta">Vertraulich · Vorbereitung Unternehmensberater-Gespräch · Stand: März 2026</div>

      <h2>1 · Das Unternehmen</h2>
      <p><strong>The FOLBB Group</strong> ist ein mittelständischer Hersteller von Frischfaserkarton (Faltschachtelkarton / GC2) mit zwei Produktionsstandorten: Baiersbronn (DE, Hauptsitz) und Eerbeek (NL). Das Unternehmen ging aus der Mayr-Melnhof Karton AG hervor — ein typisches Post-Carve-out-Setting mit historisch gewachsenen Strukturen. Kernmärkte: Lebensmittel- und Pharmaindustrie. Mitarbeiterzahl: 201–500.</p>

      <Infobox label="Systemlandschaft">
        <ul>
          <li>Tieto ERP (On-Premise, beide Standorte verknüpft): Lagerhaltung, Einkauf, Produktion, BDE, Kalkulation</li>
          <li>Microsoft D365 (Cloud): Rechnungswesen, Übernahme essentieller Daten aus Tieto</li>
          <li>Zwei Systemwelten — die Schnittstelle Tieto → D365 ist ein kritischer Datenpunkt</li>
        </ul>
      </Infobox>

      <Infobox label="Strategisch relevante Selbstdarstellung (Website)">
        <p>FOLBB positioniert sich explizit über <strong>Schnelligkeit, Flexibilität und persönliche Kundenbeziehungen</strong> als Differenzierungsmerkmale. Kunden erhalten Echtzeit-Einblick in Bestellstatus, Lagerbestände und Lieferplanung. Das ist nach außen digitale Kundenorientierung — intern steht dem aber eine ungeklärte Datenlage gegenüber. Dieser Widerspruch ist der eigentliche Einstiegspunkt.</p>
      </Infobox>

      <h2>2 · Der Auftrag</h2>
      <p>Der interne Auftraggeber ist der <strong>Controller</strong> von FOLBB. Sein offizieller Auftrag:</p>
      <ul>
        <li>Vollständige Transparenz über den IST-Zustand des Order-to-Delivery-Prozesses herstellen</li>
        <li>Ineffizienzen, Fehlerquellen und Redundanzen systematisch identifizieren</li>
        <li>Konkrete Optimierungs-, Digitalisierungs- und KI-Maßnahmen ableiten und umsetzen</li>
        <li>Wirkung der Maßnahmen messbar nachweisen</li>
        <li>Nachhaltige Verankerung der Verbesserungen sicherstellen</li>
      </ul>
      <p>Scope: Anfrage → Angebot → Auslieferung. Fokus: Vertriebsinnendienst.<br />Zeitrahmen: <strong>1 Jahr</strong> für erste nachweisbare Erfolge. Budget: nicht kommuniziert.</p>

      <h2>3 · Die kritische Nebenbedingung</h2>
      <Warnbox>
        <p>Die Geschäftsführung hat als Ziel ausgegeben, im Verkauf <strong>20 % Effizienz</strong> zu schaffen. Gemeint ist: Stellenabbau. Diese Vorgabe ist weder transparent kommuniziert noch die richtige Antwort auf das zugrundeliegende Problem — sie ist eine politische Setzung, die den Projekterfolg gefährdet und intern Widerstände erzeugen wird.</p>
      </Warnbox>
      <p>Diese Vorgabe muss im Projektverlauf aktiv behandelt werden — nicht ignoriert, aber umgedeutet: von einer Abbauvorgabe hin zu einer <strong>Kapazitätsverlagerung auf wertschöpfende Tätigkeiten</strong>. Das erfordert eine Strategie auf zwei Ebenen: gegenüber dem Controller und — in einem zweiten Schritt — gegenüber der Geschäftsführung.</p>

      <h2>4 · Der Controller: Rolle und Situation</h2>
      <ul>
        <li>Ist der direkte Ansprechpartner und formaler Projektverantwortlicher</li>
        <li>Steht unter Druck der GF — fühlt sich ob der Vorgaben ein wenig hilflos</li>
        <li>Hat nach eigener Aussage kaum Zugriff auf wahre Wirtschaftsdaten — die Datenlage ist unklar</li>
        <li>Ist grundsätzlich offen für externe Unterstützung</li>
        <li>Weiß noch nicht, dass Wolfgang involviert wird</li>
      </ul>

      <Infobox label="Einschätzung zur Datenlage">
        <p>Das ERP Tieto läuft auf einem Post-Carve-out-Fundament — die Datenqualität in solchen gewachsenen Umgebungen ist erfahrungsgemäß problematisch: inkonsistente Stammdaten, nicht gepflegte Prozesse, fehlende Auswertungslogik. Die Aussage des Controllers, er habe kaum Zugriff auf valide Wirtschaftsdaten, deutet darauf hin, dass das eigentliche Problem nicht fehlende Effizienz im Vertrieb ist — sondern <strong>fehlende Transparenz über alle Prozesse hinweg</strong>. Das ist der Einstiegspunkt.</p>
      </Infobox>

      <h2>5 · Was ich mir vom Gespräch mit dir wünsche</h2>
      <ul>
        <li><strong>Einschätzung:</strong> Ist dieser Auftrag unter den genannten Bedingungen seriös durchführbar?</li>
        <li><strong>Erfahrungswissen:</strong> Wie gehst du in vergleichbaren Projekten mit schlechter Datenlage um?</li>
        <li><strong>Positionierung:</strong> Wie würden wir das 20%-Effizienz-Ziel gegenüber dem Controller rahmen — und in einem zweiten Schritt gegenüber der Geschäftsführung?</li>
        <li><strong>Nächster Schritt:</strong> Welche Voraussetzungen benötigen wir, bevor wir dem Controller ein Angebot machen?</li>
      </ul>

      <Infobox label="Hinweis zur Verschwiegenheit">
        <p>Alle weiteren Unternehmensdaten werden erst nach Unterzeichnung einer NDA freigegeben. Dieses Briefing basiert auf dem Erstgespräch sowie öffentlich zugänglichen Quellen (Website FOLBB).</p>
      </Infobox>
    </div>
  );
}

function GespraechPanel() {
  return (
    <div>
      <h1>Gesprächsplan</h1>
      <div className="doc-meta">Internes Vorbereitungstreffen · Marcus + Wolfgang · Vor dem nächsten Controller-Termin</div>

      <h2>Ziel des Treffens</h2>
      <p>Gemeinsame Einordnung des Projekts aus Beraterperspektive. Abstimmung zur Positionierung, zur Einwandbehandlung und zur Vorgehensweise im nächsten Schritt mit dem Controller.</p>

      <hr className="sep" />

      <h2>Agenda</h2>

      <Phase num="1" title="Lagebild teilen" time="ca. 15 min">
        <p>Marcus gibt Wolfgang die Projektsituation anhand des Briefings. Ziel ist ein gemeinsames Verständnis der Ausgangslage.</p>
        <ul>
          <li>Unternehmen FOLBB: Post-Carve-out, zwei Standorte, Systemlandschaft Tieto / D365</li>
          <li>Auftrag des Controllers + Zeitrahmen</li>
          <li>Datenlage-Problem und Aussage des Controllers</li>
          <li>Die 20%-Vorgabe der GF und ihre Implikationen</li>
          <li>Strategisch relevanter Widerspruch: digitale Außendarstellung vs. interne Intransparenz</li>
        </ul>
      </Phase>

      <Phase num="2" title="Wolfgangs Ersteinschätzung" time="ca. 20 min">
        <p>Wolfgang ordnet das Projekt aus seiner Berater-Erfahrung ein. Leitfragen:</p>
        <ul>
          <li>Ist das eine typische Situation — Controller unter GF-Druck, schlechte Datenbasis?</li>
          <li>Wo siehst du die größten Risiken für das Projekt?</li>
          <li>Was wäre dein erster Schritt, wenn du diesen Auftrag bekämst?</li>
          <li>Welche Rolle sollen wir beide im Projekt einnehmen?</li>
        </ul>
      </Phase>

      <Phase num="3" title={'Einwandbehandlung: 20 % „Effizienz"'} time="ca. 25 min">
        <p>Das ist der Kern. Wir müssen uns einig sein, wie wir dieses Thema auf zwei Ebenen rahmen.</p>

        <div className="einwand">
          <div className="einwand-trigger">Vorgabe: „Wir benötigen 20 % Effizienzsteigerung im Verkauf."</div>

          <h3><span className="badge badge-ctrl">Ebene 1 · Controller</span> Sachlich, entlastend</h3>
          <p>Der Controller steht unter Druck und ist selbst nicht überzeugt. Unser Ziel: ihm eine Sprache geben, mit der er die Vorgabe gegenüber der GF methodisch absichern — und damit zeitlich verschieben — kann.</p>
          <ul>
            <li>„Wenn Sie selbst sagen, Sie haben keinen Zugriff auf wahre Wirtschaftsdaten — wie soll dann gemessen werden, ob 20 % erreicht werden?"</li>
            <li>Stellenabbau ohne Prozessklarheit ist blindes Sparen: Kapazität wird entfernt, aber nicht die Komplexität.</li>
            <li>20 % Kapazität lässt sich auch durch Automatisierung, bessere Systemnutzung und Prozessbereinigung freisetzen — ohne eine einzige Kündigung.</li>
            <li>FOLBB positioniert sich über Schnelligkeit und persönliche Kundenbeziehungen. Wer den Vertriebsinnendienst ausdünnt, gefährdet genau das Differenzierungsmerkmal, das FOLBB vom Wettbewerb unterscheidet.</li>
          </ul>

          <Stratbox label="Formulierungsvorschlag für den Controller">
            <p>„Die GF will 20 % Effizienz — das ist ein legitimes Ziel. Unsere Aufgabe ist, den saubersten Weg dorthin zu finden. Stellenabbau ist eine Option unter mehreren, aber sie ist riskant ohne Datenbasis. Lass uns erst verstehen, wo die Zeit heute wirklich hingeht — dann sehen wir, wo die 20 % stecken."</p>
          </Stratbox>

          <h3 style={{ marginTop: "1.4rem" }}><span className="badge badge-gf">Ebene 2 · Geschäftsführung</span> Zweiter Schritt, nach NDA</h3>
          <p>Die GF hat eine Zielvorgabe gesetzt, aber vermutlich keine Methode. Hier geht es darum, die Vorgabe nicht zu bekämpfen, sondern ihr einen seriösen Rahmen zu geben — bevor Zahlen auf dem Tisch liegen, die eine fundierte Entscheidung erst ermöglichen.</p>
          <ul>
            <li>FOLBB hat sich aus der Mayr-Melnhof-Welt gelöst — das Unternehmen ist noch dabei, eine eigenständige Prozessidentität zu entwickeln. Ein Stellenabbau jetzt würde diesen Reifeprozess abwürgen.</li>
            <li>Wer abbaut, bevor er misst, riskiert, die falschen Stellen zu streichen — und zahlt das doppelt: im Qualitätsverlust und im Recruiting danach.</li>
            <li>Unser Angebot an die GF: keine Debatte über Stellenabbau ja/nein, sondern eine Transparenzoffensive — mit messbarem Ergebnis in 6 Monaten. Dann kann die GF auf Basis von Zahlen entscheiden.</li>
          </ul>

          <Stratbox label="Formulierungsvorschlag für die GF">
            <p>„20 % Effizienz ist erreichbar — aber nur, wenn wir zuerst wissen, wo die Zeit wirklich verloren geht. Wir schlagen vor: Sechs Monate Transparenzphase, danach eine fundierte Entscheidung über Maßnahmen. Alles andere ist Raten auf Kosten der Servicequalität, die FOLBB gegenüber seinen Kunden täglich verspricht."</p>
          </Stratbox>
        </div>

        <h3>Im Gespräch abzustimmen</h3>
        <ul>
          <li>Wie weit gehen wir mit dieser Positionierung — auch gegenüber der GF?</li>
          <li>Wer spricht welche Ebene an — Marcus, Wolfgang, oder gemeinsam?</li>
          <li>Gibt es eine rote Linie: Würden wir das Projekt ablehnen, wenn Stellenabbau das einzige Ziel bleibt?</li>
        </ul>
      </Phase>

      <Phase num="4" title="Nächste Schritte definieren" time="ca. 15 min">
        <ul>
          <li>Wann ist das nächste Treffen mit dem Controller — wer initiiert es?</li>
          <li>Wird Wolfgang beim Controller-Termin dabei sein, oder erst nach NDA-Unterzeichnung?</li>
          <li>Was sind die drei Fragen, die wir dem Controller im nächsten Termin unbedingt stellen?</li>
          <li>Welche Unterlagen / Daten fordern wir vor oder nach NDA an?</li>
        </ul>
        <Infobox label="Vorgeschlagene 3 Einstiegsfragen an den Controller">
          <ul>
            <li>„Wie messen Sie heute die Durchlaufzeit eines Auftrags von Anfrage bis Auslieferung — und wo verlieren Sie aktuell den Überblick?"</li>
            <li>„Welche Daten stehen Ihnen heute aus Tieto und D365 für Auswertungen zur Verfügung — und was fehlt Ihnen konkret?"</li>
            <li>„Wenn Sie in einem Jahr auf das Projekt zurückblicken: Woran würden Sie persönlich erkennen, dass es ein Erfolg war?"</li>
          </ul>
        </Infobox>
      </Phase>

      <hr className="sep" />

      <h2>Offene Punkte vor dem Gespräch</h2>
      <table>
        <thead>
          <tr><th>Punkt</th><th>Klärungsbedarf</th><th>Zuständig</th></tr>
        </thead>
        <tbody>
          <tr><td>Teilnehmer Controller-Termin</td><td>Nur Marcus, oder Wolfgang dabei?</td><td>Marcus</td></tr>
          <tr><td>NDA-Prozess</td><td>Wer erstellt die NDA — wir oder FOLBB?</td><td>Abstimmen</td></tr>
          <tr><td>Wolfgangs Mandat</td><td>Beratend im Hintergrund oder aktiv als Co-Berater sichtbar?</td><td>Wolfgang</td></tr>
          <tr><td>Budget</td><td>Kein Budget genannt — wie gehen wir damit um?</td><td>Beide</td></tr>
          <tr><td>GF-Zugang</td><td>Wann und über welchen Weg kommen wir an die GF heran?</td><td>Abstimmen</td></tr>
        </tbody>
      </table>
    </div>
  );
}

const css = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #090806; }

  .nav {
    display: flex; align-items: center; justify-content: space-between;
    gap: .75rem; padding: 1.2rem 2rem;
    border-bottom: 1px solid #2a2118;
    font-family: 'Bebas Neue', sans-serif;
  }
  .nav-brand { display: flex; align-items: center; gap: .6rem; color: #B5742A; letter-spacing: .08em; font-size: .95rem; }
  .logout-btn {
    background: none; border: 1px solid #2a2118; color: #7A6A58;
    font-family: 'Lora', Georgia, serif; font-size: .78rem;
    padding: .3rem .8rem; border-radius: 2px; cursor: pointer;
    transition: color .2s, border-color .2s;
  }
  .logout-btn:hover { color: #C4BCB1; border-color: #7A6A58; }

  .main {
    max-width: 860px; margin: 0 auto;
    padding: 2rem 1.5rem 4rem;
    font-family: 'Lora', Georgia, serif;
    font-weight: 300; line-height: 1.75;
    color: #C4BCB1;
  }

  .tabs { display: flex; gap: .5rem; margin-bottom: 2rem; border-bottom: 1px solid #2a2118; }
  .tab-btn {
    background: none; border: none; color: #9a8870;
    font-family: 'Lora', serif; font-size: .9rem;
    padding: .6rem 1.2rem; cursor: pointer;
    border-bottom: 2px solid transparent; transition: all .2s;
  }
  .tab-btn:hover { color: #C4BCB1; }
  .tab-btn.active { color: #B5742A; border-bottom: 2px solid #B5742A; }

  h1 {
    font-family: 'Bebas Neue', sans-serif; font-size: 2rem;
    letter-spacing: .07em; color: #B5742A; text-transform: uppercase;
    border-bottom: 1px solid #B5742A; padding-bottom: .4rem; margin-bottom: .4rem;
  }
  .doc-meta { color: #9a8870; font-size: .82rem; margin-bottom: 2.5rem; letter-spacing: .03em; }
  h2 {
    font-family: 'Bebas Neue', sans-serif; font-size: 1.3rem;
    letter-spacing: .06em; color: #E8C98A; text-transform: uppercase;
    margin-top: 2.5rem; margin-bottom: .8rem;
  }
  h3 { font-size: .95rem; font-weight: 600; color: #B5742A; margin-top: 1.4rem; margin-bottom: .4rem; }
  p { margin-bottom: .9rem; font-size: .93rem; }
  strong { font-weight: 600; color: #C4BCB1; }

  ul { list-style: none; margin-bottom: 1rem; }
  ul li { display: flex; gap: .7rem; align-items: flex-start; margin-bottom: .5rem; font-size: .92rem; }
  ul li::before { content: '+'; color: #E8C98A; font-weight: 600; flex-shrink: 0; margin-top: .05rem; }

  .infobox { background: #1A140D; border-left: 3px solid #B5742A; padding: 1rem 1.2rem; margin: 1.2rem 0; border-radius: 2px; }
  .infobox-label { font-family: 'Bebas Neue', sans-serif; color: #B5742A; letter-spacing: .07em; font-size: .85rem; margin-bottom: .4rem; }
  .warnbox { background: #1A100A; border-left: 3px solid #D4622A; padding: 1rem 1.2rem; margin: 1.2rem 0; border-radius: 2px; }
  .warnbox-label { font-family: 'Bebas Neue', sans-serif; color: #D4622A; letter-spacing: .07em; font-size: .85rem; margin-bottom: .4rem; }
  .stratbox { background: #0D1318; border-left: 3px solid #5A9AB5; padding: 1rem 1.2rem; margin: 1rem 0; border-radius: 2px; }
  .stratbox-label { font-family: 'Bebas Neue', sans-serif; color: #5A9AB5; letter-spacing: .07em; font-size: .85rem; margin-bottom: .4rem; }

  .phase { border: 1px solid #2a2118; border-radius: 3px; margin: 1.2rem 0; overflow: hidden; }
  .phase-header { display: flex; align-items: center; gap: 1rem; background: #110e0a; padding: .7rem 1rem; border-bottom: 1px solid #2a2118; }
  .phase-num { font-family: 'Bebas Neue', sans-serif; font-size: 1.6rem; color: #B5742A; line-height: 1; min-width: 2rem; }
  .phase-title { font-weight: 600; color: #C4BCB1; font-size: .92rem; }
  .phase-time { margin-left: auto; font-size: .8rem; color: #9a8870; white-space: nowrap; }
  .phase-body { padding: .9rem 1rem; }

  .einwand { background: #110e0a; border: 1px solid #2a2118; border-radius: 3px; padding: 1.1rem; margin: 1.2rem 0; }
  .einwand-trigger { color: #9a8870; font-size: .88rem; margin-bottom: .7rem; border-left: 2px solid #2a2118; padding-left: .7rem; }

  .badge { display: inline-block; font-family: 'Bebas Neue', sans-serif; font-size: .75rem; letter-spacing: .06em; padding: .15rem .5rem; border-radius: 2px; margin-right: .4rem; }
  .badge-ctrl { background: #1A1A2A; color: #7A7AB5; border: 1px solid #3A3A6A; }
  .badge-gf { background: #1A2A1A; color: #7AB57A; border: 1px solid #3A6A3A; }

  table { width: 100%; border-collapse: collapse; margin: 1rem 0 1.5rem; font-size: .88rem; }
  thead th { background: #B5742A; color: #090806; font-family: 'Bebas Neue', sans-serif; letter-spacing: .05em; padding: .5rem .8rem; text-align: left; }
  tbody tr:nth-child(odd) { background: #110e0a; }
  tbody tr:nth-child(even) { background: #090806; }
  tbody td { padding: .5rem .8rem; border-bottom: 1px solid #2a2118; vertical-align: top; }

  .sep { border: none; border-top: 1px solid #2a2118; margin: 2rem 0; }

  .footer {
    max-width: 860px; margin: 0 auto;
    padding: 1rem 1.5rem 2rem;
    border-top: 1px solid #2a2118;
    display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: .5rem;
    font-family: 'Lora', Georgia, serif;
  }
  .footer-brand { display: flex; align-items: center; gap: .5rem; font-family: 'Bebas Neue', sans-serif; color: #B5742A; font-size: .9rem; letter-spacing: .06em; }
  .footer span { color: #7A6A58; font-size: .8rem; }
  .footer-links { display: flex; gap: 1.5rem; }
  .footer-links a { color: #9a8870; font-size: .8rem; text-decoration: none; }
  .footer-links a:hover { color: #B5742A; }

  @media (max-width: 600px) {
    .main { padding: 1.5rem 1rem 3rem; }
    .tabs { overflow-x: auto; }
    .footer { flex-direction: column; align-items: flex-start; }
  }
`;
