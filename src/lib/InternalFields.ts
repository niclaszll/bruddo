export class InternalFields {
  static #instance: InternalFields;

  private _ALTE: number;
  private _ANP: number;
  private _ANTEIL1: number;
  private _BBGKVPV: number;
  private _BBGRV: number;
  private _BMG: number;
  private _DIFF: number;
  private _EFA: number;
  private _FVB: number;
  private _FVBSO: number;
  private _FVBZ: number;
  private _FVBZSO: number;
  private _GFB: number;
  private _HBALTE: number;
  private _HFVB: number;
  private _HFVBZ: number;
  private _HFVBZSO: number;
  private _HOCH: number;
  private _J: number;
  private _JBMG: number;
  private _JLFREIB: number;
  private _JLHINZU: number;
  private _JW: number;
  private _K: number;
  private _KFB: number;
  private _KVSATZAG: number;
  private _KVSATZAN: number;
  private _KZTAB: number;
  private _LSTJAHR: number;
  private _LSTOSO: number;
  private _LSTSO: number;
  private _MIST: number;
  private _PVSATZAG: number;
  private _PVSATZAN: number;
  private _RVSATZAN: number;
  private _RW: number;
  private _SAP: number;
  private _SOLZFREI: number;
  private _SOLZJ: number;
  private _SOLZMIN: number;
  private _SOLZSBMG: number;
  private _SOLZSZVE: number;
  private _ST: number;
  private _ST1: number;
  private _ST2: number;
  private _TAB1: number[];
  private _TAB2: number[];
  private _TAB3: number[];
  private _TAB4: number[];
  private _TAB5: number[];
  private _VBEZB: number;
  private _VBEZBSO: number;
  private _VERGL: number;
  private _VHB: number;
  private _VKV: number;
  private _VSP: number;
  private _VSPN: number;
  private _VSP1: number;
  private _VSP2: number;
  private _VSP3: number;
  private _W1STKL5: number;
  private _W2STKL5: number;
  private _W3STKL5: number;
  private _X: number;
  private _Y: number;
  private _ZRE4: number;
  private _ZRE4J: number;
  private _ZRE4VP: number;
  private _ZTABFB: number;
  private _ZVBEZ: number;
  private _ZVBEZJ: number;
  private _ZVE: number;
  private _ZX: number;
  private _ZZX: number;

  private constructor() {}

  public static get instance(): InternalFields {
    if (!InternalFields.#instance) {
      InternalFields.#instance = new InternalFields();
    }

    return InternalFields.#instance;
  }

  /**
   * ALTE - Altersentlastungsbetrag in Euro, Cent (2 Dezimalstellen)
   */
  get ALTE() {
    return this._ALTE;
  }

  set ALTE(value: number) {
    this._ALTE = value;
  }

  /**
   * ANP - Arbeitnehmer-Pauschbetrag/Werbungskosten-Pauschbetrag in Euro
   */
  get ANP() {
    return this._ANP;
  }

  set ANP(value: number) {
    this._ANP = value;
  }

  /**
   * ANTEIL1 - Anteil von Jahreswerten auf ganze Cent abgerundet
   */
  get ANTEIL1() {
    return this._ANTEIL1;
  }

  set ANTEIL1(value: number) {
    this._ANTEIL1 = value;
  }

  /**
   * BBGKVPV - Beitragsbemessungsgrenze in der gesetzlichen Krankenversicherung und sozialen Pflegeversicherung in Euro
   */
  get BBGKVPV() {
    return this._BBGKVPV;
  }

  set BBGKVPV(value: number) {
    this._BBGKVPV = value;
  }

  /**
   * BBGRV - Allgemeine Beitragsbemessungsgrenze in der Rentenversicherung in Euro
   */
  get BBGRV() {
    return this._BBGRV;
  }

  set BBGRV(value: number) {
    this._BBGRV = value;
  }

  /**
   * BMG - Bemessungsgrundlage für Altersentlastungsbetrag in Euro, Cent (2 Dezimalstellen)
   */
  get BMG() {
    return this._BMG;
  }

  set BMG(value: number) {
    this._BMG = value;
  }

  /**
   * DIFF - Differenz zwischen ST1 und ST2 in Euro
   */
  get DIFF() {
    return this._DIFF;
  }

  set DIFF(value: number) {
    this._DIFF = value;
  }

  /**
   * EFA - Entlastungsbetrag für Alleinerziehende in Euro
   */
  get EFA() {
    return this._EFA;
  }

  set EFA(value: number) {
    this._EFA = value;
  }

  /**
   * FVB - Versorgungsfreibetrag in Euro, Cent (2 Dezimalstellen)
   */
  get FVB() {
    return this._FVB;
  }

  set FVB(value: number) {
    this._FVB = value;
  }

  /**
   * FVBSO - Versorgungsfreibetrag für Lohnsteuer sonstiger Bezug in Euro, Cent (2 Dezimalstellen)
   */
  get FVBSO() {
    return this._FVBSO;
  }

  set FVBSO(value: number) {
    this._FVBSO = value;
  }

  /**
   * FVBZ - Zuschlag zum Versorgungsfreibetrag in Euro
   */
  get FVBZ() {
    return this._FVBZ;
  }

  set FVBZ(value: number) {
    this._FVBZ = value;
  }

  /**
   * FVBZSO - Zuschlag zum Versorgungsfreibetrag für Lohnsteuer sonstiger Bezug in Euro
   */
  get FVBZSO() {
    return this._FVBZSO;
  }

  set FVBZSO(value: number) {
    this._FVBZSO = value;
  }

  /**
   * GFB - Grundfreibetrag in Euro
   */
  get GFB() {
    return this._GFB;
  }

  set GFB(value: number) {
    this._GFB = value;
  }

  /**
   * HBALTE - Maximaler Altersentlastungsbetrag in Euro
   */
  get HBALTE() {
    return this._HBALTE;
  }

  set HBALTE(value: number) {
    this._HBALTE = value;
  }

  /**
   * HFVB - Maßgeblicher maximaler Versorgungsfreibetrag in Euro, Cent (2 Dezimalstellen)
   */
  get HFVB() {
    return this._HFVB;
  }

  set HFVB(value: number) {
    this._HFVB = value;
  }

  /**
   * HFVBZ - Maßgeblicher maximaler Zuschlag zum Versorgungsfreibetrag in Euro, Cent (2 Dezimalstellen)
   */
  get HFVBZ() {
    return this._HFVBZ;
  }

  set HFVBZ(value: number) {
    this._HFVBZ = value;
  }

  /**
   * HFVBZSO - Maßgeblicher maximaler Zuschlag zum Versorgungsfreibetrag für Lohnsteuer sonstiger Bezug in Euro, Cent (2 Dezimalstellen)
   */
  get HFVBZSO() {
    return this._HFVBZSO;
  }

  set HFVBZSO(value: number) {
    this._HFVBZSO = value;
  }

  /**
   * HOCH Zwischenfeld zu X for Steuer nach §39b Absatz7 EStG
   */
  get HOCH() {
    return this._HOCH;
  }

  set HOCH(value: number) {
    this._HOCH = value;
  }

  /**
   * J - Nummer der Tabellenwerte für Versorgungsparameter
   */
  get J() {
    return this._J;
  }

  set J(value: number) {
    this._J = value;
  }

  /**
   * JBMG - Jahressteuer nach § 51a EStG in Euro
   */
  get JBMG() {
    return this._JBMG;
  }

  set JBMG(value: number) {
    this._JBMG = value;
  }

  /**
   * JLFREIB - Auf einen Jahreslohn hochgerechneter LZZFREIB in Euro, Cent (2 Dezimalstellen)
   */
  get JLFREIB() {
    return this._JLFREIB;
  }

  set JLFREIB(value: number) {
    this._JLFREIB = value;
  }

  /**
   * JLHINZU - Auf einen Jahreslohn hochgerechneter LZZHINZU in Euro, Cent (2 Dezimalstellen)
   */
  get JLHINZU() {
    return this._JLHINZU;
  }

  set JLHINZU(value: number) {
    this._JLHINZU = value;
  }

  /**
   * JW - Jahreswert, dessen Anteil für einen Lohnzahlungszeitraum in UPANTEIL errechnet werden soll, in Cent
   */
  get JW() {
    return this._JW;
  }

  set JW(value: number) {
    this._JW = value;
  }

  /**
   * K - Nummer der Tabellenwerte für Parameter bei Altersentlastungsbetrag
   */
  get K() {
    return this._K;
  }

  set K(value: number) {
    this._K = value;
  }

  /**
   * KFB - Summe der Freibeträge für Kinder in Euro
   */
  get KFB() {
    return this._KFB;
  }

  set KFB(value: number) {
    this._KFB = value;
  }

  /**
   * KVSATZAG - Beitragssatz des Arbeitgebers zur Krankenversicherung (5 Dezimalstellen)
   */
  get KVSATZAG() {
    return this._KVSATZAG;
  }

  set KVSATZAG(value: number) {
    this._KVSATZAG = value;
  }

  /**
   * KVSATZAN - Beitragssatz des Arbeitnehmers zur Krankenversicherung (5 Dezimalstellen)
   */
  get KVSATZAN() {
    return this._KVSATZAN;
  }

  set KVSATZAN(value: number) {
    this._KVSATZAN = value;
  }

  /**
   * KZTAB - Kennzahl für die Einkommensteuer-Tarifarten:
   *          - 1 = Grundtarif
   *          - 2 = Splittingverfahren
   */
  get KZTAB() {
    return this._KZTAB;
  }

  set KZTAB(value: number) {
    this._KZTAB = value;
  }

  /**
   * LSTJAHR - Jahreslohnsteuer in Euro
   */
  get LSTJAHR() {
    return this._LSTJAHR;
  }

  set LSTJAHR(value: number) {
    this._LSTJAHR = value;
  }

  /**
   * LSTOSO - Zwischenfeld der Jahreslohnsteuer in Cent
   */
  get LSTOSO() {
    return this._LSTOSO;
  }

  set LSTOSO(value: number) {
    this._LSTOSO = value;
  }

  /**
   * LSTSO - Zwischenfeld der Jahreslohnsteuer in Cent
   */
  get LSTSO() {
    return this._LSTSO;
  }

  set LSTSO(value: number) {
    this._LSTSO = value;
  }

  /**
   * MIST - Mindeststeuer für die Steuerklassen V und VI in Euro
   */
  get MIST() {
    return this._MIST;
  }

  set MIST(value: number) {
    this._MIST = value;
  }

  /**
   * PVSATZAG - Beitragssatz des Arbeitgebers zur Pflegeversicherung (6 Dezimalstellen)
   */
  get PVSATZAG() {
    return this._PVSATZAG;
  }

  set PVSATZAG(value: number) {
    this._PVSATZAG = value;
  }

  /**
   * PVSATZAN - Beitragssatz des Arbeitnehmers zur Pflegeversicherung (6 Dezimalstellen)
   */
  get PVSATZAN() {
    return this._PVSATZAN;
  }

  set PVSATZAN(value: number) {
    this._PVSATZAN = value;
  }

  /**
   * RVSATZAN - Beitragssatz des Arbeitnehmers in der allgemeinen gesetzlichen Rentenversicherung (4 Dezimalstellen)
   */
  get RVSATZAN() {
    return this._RVSATZAN;
  }

  set RVSATZAN(value: number) {
    this._RVSATZAN = value;
  }

  /**
   * RW - Rechenwert in Gleitkommadarstellung
   */
  get RW() {
    return this._RW;
  }

  set RW(value: number) {
    this._RW = value;
  }

  /**
   * SAP - Sonderausgaben-Pauschbetrag in Euro
   */
  get SAP() {
    return this._SAP;
  }

  set SAP(value: number) {
    this._SAP = value;
  }

  /**
   * SOLZFREI - Freigrenze für den Solidaritätszuschlag in Euro
   */
  get SOLZFREI() {
    return this._SOLZFREI;
  }

  set SOLZFREI(value: number) {
    this._SOLZFREI = value;
  }

  /**
   * SOLZJ - Solidaritätszuschlag auf die Jahreslohnsteuer in Euro, Cent (2 Dezimalstellen)
   */
  get SOLZJ() {
    return this._SOLZJ;
  }

  set SOLZJ(value: number) {
    this._SOLZJ = value;
  }

  /**
   * SOLZMIN - Zwischenwert für den Solidaritätszuschlag auf die Jahreslohnsteuer in Euro, Cent (2 Dezimalstellen)
   */
  get SOLZMIN() {
    return this._SOLZMIN;
  }

  set SOLZMIN(value: number) {
    this._SOLZMIN = value;
  }

  /**
   * SOLZSBMG - Bemessungsgrundlage des Solidaritätszuschlags zur Prüfung der Freigrenze beim Solidaritätszuschlag für sonstige Bezüge in Euro
   */
  get SOLZSBMG() {
    return this._SOLZSBMG;
  }

  set SOLZSBMG(value: number) {
    this._SOLZSBMG = value;
  }

  /**
   * SOLZSZVE - Zu versteuerndes Einkommen für die Bemessungsgrundlage des Solidaritätszuschlags für sonstige Bezüge in Euro, Cent (2 Dezimalstellen)
   */
  get SOLZSZVE() {
    return this._SOLZSZVE;
  }

  set SOLZSZVE(value: number) {
    this._SOLZSZVE = value;
  }

  /**
   * ST - Tarifliche Einkommensteuer in Euro
   */
  get ST() {
    return this._ST;
  }

  set ST(value: number) {
    this._ST = value;
  }

  /**
   * ST1 - Tarifliche Einkommensteuer auf das 1,25-fache ZX in Euro
   */
  get ST1() {
    return this._ST1;
  }

  set ST1(value: number) {
    this._ST1 = value;
  }

  /**
   * ST2 - Tarifliche Einkommensteuer auf das 0,75-fache ZX in Euro
   */
  get ST2() {
    return this._ST2;
  }

  set ST2(value: number) {
    this._ST2 = value;
  }

  /**
   * TAB1 - Tabelle für die Prozentsätze des Versorgungsfreibetrags
   */
  get TAB1() {
    return this._TAB1;
  }

  set TAB1(value: number[]) {
    this._TAB1 = value;
  }

  /**
   * TAB2 - Tabelle für die Höchstbeträge des Versorgungsfreibetrags
   */
  get TAB2() {
    return this._TAB2;
  }

  set TAB2(value: number[]) {
    this._TAB2 = value;
  }

  /**
   * TAB3 - Tabelle für die Zuschläge zum Versorgungsfreibetrag
   */
  get TAB3() {
    return this._TAB3;
  }

  set TAB3(value: number[]) {
    this._TAB3 = value;
  }

  /**
   * TAB4 - Tabelle für die Prozentsätze des Altersentlastungsbetrags
   */
  get TAB4() {
    return this._TAB4;
  }

  set TAB4(value: number[]) {
    this._TAB4 = value;
  }

  /**
   * TAB5 - Tabelle für die Höchstbeträge des Altersentlastungsbetrags
   */
  get TAB5() {
    return this._TAB5;
  }

  set TAB5(value: number[]) {
    this._TAB5 = value;
  }

  /**
   * VBEZB - Bemessungsgrundlage für den Versorgungsfreibetrag in Cent
   */
  get VBEZB() {
    return this._VBEZB;
  }

  set VBEZB(value: number) {
    this._VBEZB = value;
  }

  /**
   * VBEZBSO - Bemessungsgrundlage für den Versorgungsfreibetrag in Cent für den sonstigen Bezug
   */
  get VBEZBSO() {
    return this._VBEZBSO;
  }

  set VBEZBSO(value: number) {
    this._VBEZBSO = value;
  }

  /**
   * VERGL - Zwischenfeld zu X für die Berechnung der Steuer nach §39b Absatz2 Satz7 EStG in Euro
   */
  get VERGL() {
    return this._VERGL;
  }

  set VERGL(value: number) {
    this._VERGL = value;
  }

  /**
   * VHB - Höchstbetrag der Mindestvorsorgepauschale für Kranken- und Pflegeversicherung in Euro, Cent (2 Dezimalstellen)
   */
  get VHB() {
    return this._VHB;
  }

  set VHB(value: number) {
    this._VHB = value;
  }

  /**
   * VKV - Jahreswert der berücksichtigten Beiträge zur privaten Basis-Krankenversicherung und Pflege-Pflichtversicherung in Cent
   */
  get VKV() {
    return this._VKV;
  }

  set VKV(value: number) {
    this._VKV = value;
  }

  /**
   * VSP - Vorsorgepauschale mit Teilbeträgen für Rentenversicherung sowie gesetzliche Kranken- und Pflegeversicherung in Euro, Cent (2 Dezimalstellen)
   */
  get VSP() {
    return this._VSP;
  }

  set VSP(value: number) {
    this._VSP = value;
  }

  /**
   * VSPN - Vorsorgepauschale mit Teilbeträgen für Rentenversicherung sowie Mindestvorsorgepauschale für Kranken- und Pflegeversicherung in Euro, Cent (2 Dezimalstellen)
   */
  get VSPN() {
    return this._VSPN;
  }

  set VSPN(value: number) {
    this._VSPN = value;
  }

  /**
   * VSP1 - Zwischenwert 1 bei der Berechnung der Vorsorgepauschale in Euro, Cent (2 Dezimalstellen)
   */
  get VSP1() {
    return this._VSP1;
  }

  set VSP1(value: number) {
    this._VSP1 = value;
  }

  /**
   * VSP2 - Zwischenwert 2 bei der Berechnung der Vorsorgepauschale in Euro, Cent (2 Dezimalstellen)
   */
  get VSP2() {
    return this._VSP2;
  }

  set VSP2(value: number) {
    this._VSP2 = value;
  }

  /**
   * VSP3 - Vorsorgepauschale mit Teilbeträgen für gesetzliche Kranken- und soziale Pflegeversicherung oder ggf. für die private Basiskrankenversicherung in Euro, Cent (2 Dezimalstellen)
   */
  get VSP3() {
    return this._VSP3;
  }

  set VSP3(value: number) {
    this._VSP3 = value;
  }

  /**
   * W1STKL5 - Erster Grenzwert in Steuerklasse V/VI in Euro
   */
  get W1STKL5() {
    return this._W1STKL5;
  }

  set W1STKL5(value: number) {
    this._W1STKL5 = value;
  }

  /**
   * W2STKL5 - Zweiter Grenzwert in Steuerklasse V/VI in Euro
   */
  get W2STKL5() {
    return this._W2STKL5;
  }

  set W2STKL5(value: number) {
    this._W2STKL5 = value;
  }

  /**
   * W3STKL5 - Dritter Grenzwert in Steuerklasse V/VI in Euro
   */
  get W3STKL5() {
    return this._W3STKL5;
  }

  set W3STKL5(value: number) {
    this._W3STKL5 = value;
  }

  /**
   * X - Zu versteuerndes Einkommen gem. §32a Absatz1 und Absatz5 EStG in Euro, Cent (2 Dezimalstellen)
   */
  get X() {
    return this._X;
  }

  set X(value: number) {
    this._X = value;
  }

  /**
   * Y - Gemäß §32a Absatz1 EStG (6 Dezimalstellen)
   */
  get Y() {
    return this._Y;
  }

  set Y(value: number) {
    this._Y = value;
  }

  /**
   * ZRE4 - Auf einen Jahreslohn hochgerechnetes RE4 in Euro, Cent (2 Dezimalstellen), nach Abzug der Freibeträge nach §39b Absatz2 Satz3 und Satz4 EStG
   */
  get ZRE4() {
    return this._ZRE4;
  }

  set ZRE4(value: number) {
    this._ZRE4 = value;
  }

  /**
   * ZRE4J - Auf einen Jahreslohn hochgerechnetes RE4 in Euro, Cent (2 Dezimalstellen)
   */
  get ZRE4J() {
    return this._ZRE4J;
  }

  set ZRE4J(value: number) {
    this._ZRE4J = value;
  }

  /**
   * ZRE4VP - Auf einen Jahreslohn hochgerechnetes RE4, ggf. nach Abzug der Entschädigungen i.S.d. §24 Nummer1 EStG in Euro, Cent (2 Dezimalstellen)
   */
  get ZRE4VP() {
    return this._ZRE4VP;
  }

  set ZRE4VP(value: number) {
    this._ZRE4VP = value;
  }

  /**
   * ZTABFB - Feste Tabellenfreibeträge (ohne Vorsorgepauschale) in Euro, Cent (2 Dezimalstellen)
   */
  get ZTABFB() {
    return this._ZTABFB;
  }

  set ZTABFB(value: number) {
    this._ZTABFB = value;
  }

  /**
   * ZVBEZ - Auf einen Jahreslohn hochgerechnetes VBEZ abzüglich FVB in Euro, Cent (2 Dezimalstellen)
   */
  get ZVBEZ() {
    return this._ZVBEZ;
  }

  set ZVBEZ(value: number) {
    this._ZVBEZ = value;
  }

  /**
   * ZVBEZJ - Auf einen Jahreslohn hochgerechnetes VBEZ in Euro, Cent (2 Dezimalstellen)
   */
  get ZVBEZJ() {
    return this._ZVBEZJ;
  }

  set ZVBEZJ(value: number) {
    this._ZVBEZJ = value;
  }

  /**
   * ZVE - Zu versteuerndes Einkommen in Euro, Cent (2 Dezimalstellen)
   */
  get ZVE() {
    return this._ZVE;
  }

  set ZVE(value: number) {
    this._ZVE = value;
  }

  /**
   * ZX - Zwischenfeld zu X für die Berechnung der Steuer nach §39b Absatz2 Satz7 EStG in Euro
   */
  get ZX() {
    return this._ZX;
  }

  set ZX(value: number) {
    this._ZX = value;
  }

  /**
   * ZZX - Zwischenfeld zu X für die Berechnung der Steuer nach §39b Absatz2 Satz7 EStG in Euro
   */
  get ZZX() {
    return this._ZZX;
  }

  set ZZX(value: number) {
    this._ZZX = value;
  }
}
