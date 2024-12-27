export class UserInputs {
  static #instance: UserInputs;

  private _AF: number;
  private _AJAHR: number;
  private _ALTER1: number;
  private _F: number;
  private _JFREIB: number;
  private _JHINZU: number;
  private _JRE4: number;
  private _JRE4ENT: number;
  private _JVBEZ: number;
  private _KRV: number;
  private _KVZ: number;
  private _LZZ: number;
  private _LZZFREIB: number;
  private _LZZHINZU: number;
  private _MBV: number;
  private _PKPV: number;
  private _PKV: number;
  private _PVA: number;
  private _PVS: number;
  private _PVZ: number;
  private _R: number;
  private _RE4: number;
  private _SONSTB: number;
  private _SONSTENT: number;
  private _STERBE: number;
  private _STKL: number;
  private _VBEZ: number;
  private _VBEZM: number;
  private _VBEZS: number;
  private _VBS: number;
  private _VJAHR: number;
  private _ZKF: number;
  private _ZMVB: number;

  private constructor() {}

  public static get instance(): UserInputs {
    if (!UserInputs.#instance) {
      UserInputs.#instance = new UserInputs();
    }

    return UserInputs.#instance;
  }

  /**
   * AF - 1, wenn die Anwendung des Faktorverfahrens gewählt wurde (nur in Steuerklasse IV)
   */
  get AF() {
    return this._AF;
  }

  public setAF(value: number): this {
    this._AF = value;
    return this;
  }

  /**
   * AJAHR - Auf die Vollendung des 64. Lebensjahres folgendes Kalenderjahr (erforderlich, wenn ALTER1=1)
   */
  get AJAHR() {
    return this._AJAHR;
  }

  public setAJAHR(value: number): this {
    this._AJAHR = value;
    return this;
  }

  /**
   * ALTER1 - 1, wenn das 64. Lebensjahr vor Beginn des Kalenderjahres vollendet wurde (§24a EStG), sonst = 0
   */
  get ALTER1() {
    return this._ALTER1;
  }

  public setALTER1(value: number): this {
    this._ALTER1 = value;
    return this;
  }

  /**
   * F - Eingetragener Faktor mit drei Nachkommastellen
   */
  get F() {
    return this._F;
  }

  public setF(value: number): this {
    this._F = value;
    return this;
  }

  /**
   * JFREIB - Jahresfreibetrag für die Ermittlung der Lohnsteuer für sonstige Bezüge sowie Vermögensbeteiligungen nach §19a EStG in Cent (ggf. 0)
   */
  get JFREIB() {
    return this._JFREIB;
  }

  public setJFREIB(value: number): this {
    this._JFREIB = value;
    return this;
  }

  /**
   * JHINZU - Jahreshinzurechnungsbetrag für die Ermittlung der Lohnsteuer für sonstige Bezüge sowie Vermögensbeteiligungen nach §19a EStG in Cent (ggf. 0)
   */
  get JHINZU() {
    return this._JHINZU;
  }

  public setJHINZU(value: number): this {
    this._JHINZU = value;
    return this;
  }

  /**
   * JRE4 - Voraussichtlicher Jahresarbeitslohn ohne sonstige Bezüge (§19a Absatz4 EStG) in Cent
   */
  get JRE4() {
    return this._JRE4;
  }

  public setJRE4(value: number): this {
    this._JRE4 = value;
    return this;
  }

  /**
   * JRE4ENT - In JRE4 enthaltene Entschädigungen nach §24 Nummer1 EStG und zu besteuernde Vorteile bei Vermögensbeteiligungen (§19a Absatz4 EStG) in Cent
   */
  get JRE4ENT() {
    return this._JRE4ENT;
  }

  public setJRE4ENT(value: number): this {
    this._JRE4ENT = value;
    return this;
  }

  /**
   * JVBEZ - In JRE4 enthaltene Versorgungsbezüge in Cent (ggf. 0)
   */
  get JVBEZ() {
    return this._JVBEZ;
  }

  public setJVBEZ(value: number): this {
    this._JVBEZ = value;
    return this;
  }

  /**
   * KRV - Merker für die Vorsorgepauschale:
   * `0`: Arbeitnehmer ist in der gesetzlichen Rentenversicherung oder einer berufsständischen Versorgungseinrichtung pflichtversichert oder freiwillig versichert; es gilt die allgemeine Beitragsbemessungsgrenze.
   * `1`: Wenn nicht `0`.
   */
  get KRV() {
    return this._KRV;
  }

  public setKRV(value: number): this {
    this._KRV = value;
    return this;
  }

  /**
   * KVZ - Kassenindividueller Zusatzbeitragssatz bei einem gesetzlich krankenversicherten Arbeitnehmer in Prozent (z. B. 2,50 für 2,50 %), mit 2 Dezimalstellen.
   */
  get KVZ() {
    return this._KVZ;
  }

  public setKVZ(value: number): this {
    this._KVZ = value;
    return this;
  }

  /**
   * LZZ - Lohnzahlungszeitraum:
   * `1`: Jahr
   * `2`: Monat
   * `3`: Woche
   * `4`: Tag
   */
  get LZZ() {
    return this._LZZ;
  }

  public setLZZ(value: number): this {
    this._LZZ = value;
    return this;
  }

  /**
   * LZZFREIB - Freibetrag für den Lohnzahlungszeitraum in Cent, festgelegt durch elektronisches Lohnsteuerabzugsmerkmal oder Bescheinigung für den Lohnsteuerabzug.
   */
  get LZZFREIB() {
    return this._LZZFREIB;
  }

  public setLZZFREIB(value: number): this {
    this._LZZFREIB = value;
    return this;
  }

  /**
   * LZZHINZU - Hinzurechnungsbetrag für den Lohnzahlungszeitraum in Cent, festgelegt durch elektronisches Lohnsteuerabzugsmerkmal oder Bescheinigung für den Lohnsteuerabzug.
   */
  get LZZHINZU() {
    return this._LZZHINZU;
  }

  public setLZZHINZU(value: number): this {
    this._LZZHINZU = value;
    return this;
  }

  /**
   * MBV - Nicht zu besteuernde Vorteile bei Vermögensbeteiligungen (§19a Absatz1 Satz4 EStG) in Cent.
   */
  get MBV() {
    return this._MBV;
  }

  public setMBV(value: number): this {
    this._MBV = value;
    return this;
  }

  /**
   * PKPV - Beiträge des Arbeitnehmers für eine private Basiskranken- bzw. Pflege-Pflichtversicherung (§10 Absatz1 Nummer3 EStG) in Cent, immer als Monatsbetrag anzugeben.
   */
  get PKPV() {
    return this._PKPV;
  }

  public setPKPV(value: number): this {
    this._PKPV = value;
    return this;
  }

  /**
   * PKV - Krankenversicherungsstatus:
   * `0`: Gesetzlich krankenversicherte Arbeitnehmer
   * `1`: Privat krankenversichert ohne Arbeitgeberzuschuss
   * `2`: Privat krankenversichert mit Arbeitgeberzuschuss
   */
  get PKV() {
    return this._PKV;
  }

  public setPKV(value: number): this {
    this._PKV = value;
    return this;
  }

  /**
   * PVA - Zahl der Beitragsabschläge in der sozialen Pflegeversicherung bei mehr als einem Kind:
   * `0`: Kein Abschlag
   * `1`: Abschlag für das zweite Kind
   * `2`: Abschläge für das zweite und dritte Kind
   * `3`: Abschläge für das zweite bis vierte Kind
   * `4`: Abschläge für das zweite bis fünfte oder mehr Kinder
   */
  get PVA() {
    return this._PVA;
  }

  public setPVA(value: number): this {
    this._PVA = value;
    return this;
  }

  /**
   * PVS - 1, wenn bei der sozialen Pflegeversicherung die Besonderheiten in Sachsen zu berücksichtigen sind bzw. zu berücksichtigen wären
   */
  get PVS() {
    return this._PVS;
  }

  public setPVS(value: number): this {
    this._PVS = value;
    return this;
  }

  /**
   * PVZ - 1, wenn der Arbeitnehmer den Zuschlag zur sozialen Pflegeversicherung zu zahlen hat
   */
  get PVZ() {
    return this._PVZ;
  }

  public setPVZ(value: number): this {
    this._PVZ = value;
    return this;
  }

  /**
   * R - Religionsgemeinschaft des Arbeitnehmers lt. elektronischer Lohnsteuerabzugsmerkmale (bei keiner Religionszugehörigkeit = 0)
   */
  get R() {
    return this._R;
  }

  public setR(value: number): this {
    this._R = value;
    return this;
  }

  /**
   * RE4 - Steuerpflichtiger Arbeitslohn für den Lohnzahlungszeitraum in Cent, vor Berücksichtigung von Freibeträgen und Hinzurechnungsbeträgen
   */
  get RE4() {
    return this._RE4;
  }

  public setRE4(value: number): this {
    this._RE4 = value;
    return this;
  }

  /**
   * SONSTB - Sonstige Bezüge einschließlich zu besteuernde Vorteile bei Vermögensbeteiligungen und Sterbegeld bei Versorgungsbezügen, in Cent (ggf. 0)
   */
  get SONSTB() {
    return this._SONSTB;
  }

  public setSONSTB(value: number): this {
    this._SONSTB = value;
    return this;
  }

  /**
   * SONSTENT - In SONSTB enthaltene Entschädigungen nach §24 Nummer1 EStG sowie zu besteuernde Vorteile bei Vermögensbeteiligungen (§19a Absatz4 EStG), in Cent
   */
  get SONSTENT() {
    return this._SONSTENT;
  }

  public setSONSTENT(value: number): this {
    this._SONSTENT = value;
    return this;
  }

  /**
   * STERBE - Sterbegeld bei Versorgungsbezügen sowie Kapitalauszahlungen/Abfindungen (in SONSTB enthalten), in Cent
   */
  get STERBE() {
    return this._STERBE;
  }

  public setSTERBE(value: number): this {
    this._STERBE = value;
    return this;
  }

  /**
   * STKL - Steuerklasse:
   * `1`: I
   * `2`: II
   * `3`: III
   * `4`: IV
   * `5`: V
   * `6`: VI
   */
  get STKL() {
    return this._STKL;
  }

  public setSTKL(value: number): this {
    this._STKL = value;
    return this;
  }

  /**
   * VBEZ - In RE4 enthaltene Versorgungsbezüge in Cent (ggf. unter Berücksichtigung einer geänderten Bemessungsgrundlage nach §19 Absatz2 Satz10 und Satz11 EStG)
   */
  get VBEZ() {
    return this._VBEZ;
  }

  public setVBEZ(value: number): this {
    this._VBEZ = value;
    return this;
  }

  /**
   * VBEZM - Versorgungsbezug im Januar 2005 bzw. für den ersten vollen Monat, wenn der Versorgungsbezug erstmalig nach Januar 2005 gewährt wurde, in Cent
   */
  get VBEZM() {
    return this._VBEZM;
  }

  public setVBEZM(value: number): this {
    this._VBEZM = value;
    return this;
  }

  /**
   * VBEZS - Voraussichtliche Sonderzahlungen von Versorgungsbezügen im Kalenderjahr des Versorgungsbeginns (ohne Sterbegeld, Kapitalauszahlungen/Abfindungen), in Cent
   */
  get VBEZS() {
    return this._VBEZS;
  }

  public setVBEZS(value: number): this {
    this._VBEZS = value;
    return this;
  }

  /**
   * VBS - In SONSTB enthaltene Versorgungsbezüge einschließlich Sterbegeld in Cent (ggf.0)
   */
  get VBS() {
    return this._VBS;
  }

  public setVBS(value: number): this {
    this._VBS = value;
    return this;
  }

  /**
   * VJAHR - Jahr, in dem der Versorgungsbezug erstmalig gewährt wurde.
   * Bei mehreren Versorgungsbezügen wird das Jahr des ältesten erstmaligen Bezugs herangezogen.
   */
  get VJAHR() {
    return this._VJAHR;
  }

  public setVJAHR(value: number): this {
    this._VJAHR = value;
    return this;
  }

  /**
   * ZKF - Zahl der Freibeträge für Kinder (eine Dezimalstelle, nur bei Steuerklassen I, II, III und IV)
   */
  get ZKF() {
    return this._ZKF;
  }

  public setZKF(value: number): this {
    this._ZKF = value;
    return this;
  }

  /**
   * ZMVB - Zahl der Monate, für die im Kalenderjahr Versorgungsbezüge gezahlt werden
   * [nur erforderlich bei Jahresberechnung (LZZ = 1)]
   */
  get ZMVB() {
    return this._ZMVB;
  }

  public setZMVB(value: number): this {
    this._ZMVB = value;
    return this;
  }
}
