import { IncomeTaxTariffType } from '@/types/income-tax';
import { roundDownToFullCent, toFixedFloat } from '@/util/format';

import Table1_3 from '../data/tab_1-3.json';
import Table4_5 from '../data/tab_4-5.json';

export class InternalFieldsClient {
  static #instance: InternalFieldsClient;

  private _ALTE?: number;
  private _ANP?: number;
  private _ANTEIL1?: number;
  private _BBGKVPV?: number;
  private _BBGRV?: number;
  private _BK?: number;
  private _BKS?: number;
  private _BMG?: number;
  private _DIFF?: number;
  private _EFA?: number;
  private _FVB?: number;
  private _FVBSO?: number;
  private _FVBZ?: number;
  private _FVBZSO?: number;
  private _GFB?: number;
  private _HBALTE?: number;
  private _HFVB?: number;
  private _HFVBZ?: number;
  private _HFVBZSO?: number;
  private _HOCH?: number;
  private _J?: number;
  private _JBMG?: number;
  private _JLFREIB?: number;
  private _JLHINZU?: number;
  private _JW?: number;
  private _K?: number;
  private _KFB?: number;
  private _KVSATZAG?: number;
  private _KVSATZAN?: number;
  private _KZTAB?: IncomeTaxTariffType;
  private _LSTJAHR?: number;
  private _LSTLZZ?: number;
  private _LSTOSO?: number;
  private _LSTSO?: number;
  private _MIST?: number;
  private _PVSATZAG?: number;
  private _PVSATZAN?: number;
  private _RVSATZAN?: number;
  private _RW?: number;
  private _SAP?: number;
  private _SOLZFREI?: number;
  private _SOLZJ?: number;
  private _SOLZLZZ?: number;
  private _SOLZMIN?: number;
  private _SOLZS?: number;
  private _SOLZSBMG?: number;
  private _SOLZSZVE?: number;
  private _ST?: number;
  private _ST1?: number;
  private _ST2?: number;
  private _STS?: number;
  private _VBEZB?: number;
  private _VBEZBSO?: number;
  private _VERGL?: number;
  private _VFRB?: number;
  private _VFRBS1?: number;
  private _VFRBS2?: number;
  private _VHB?: number;
  private _VKV?: number;
  private _VKVLZZ?: number;
  private _VKVSONST?: number;
  private _VSP?: number;
  private _VSPN?: number;
  private _VSP1?: number;
  private _VSP2?: number;
  private _VSP3?: number;
  private _W1STKL5?: number;
  private _W2STKL5?: number;
  private _W3STKL5?: number;
  private _WVFRB?: number;
  private _WVFRBM?: number;
  private _WVFRBO?: number;
  private _X?: number;
  private _Y?: number;
  private _ZRE4?: number;
  private _ZRE4J?: number;
  private _ZRE4VP?: number;
  private _ZTABFB?: number;
  private _ZVBEZ?: number;
  private _ZVBEZJ?: number;
  private _ZVE?: number;
  private _ZX?: number;
  private _ZZX?: number;

  private constructor() {}

  public static get instance(): InternalFieldsClient {
    if (!InternalFieldsClient.#instance) {
      InternalFieldsClient.#instance = new InternalFieldsClient();
    }

    return InternalFieldsClient.#instance;
  }

  /**
   * ALTE - Altersentlastungsbetrag in Euro, Cent (2 Dezimalstellen)
   */
  get ALTE() {
    if (this._ALTE === undefined) throw new Error('ALTE is not set');
    return this._ALTE;
  }

  set ALTE(value: number) {
    this._ALTE = toFixedFloat(value, 2);
  }

  /**
   * ANP - Arbeitnehmer-Pauschbetrag/Werbungskosten-Pauschbetrag in Euro
   */
  get ANP() {
    if (this._ANP === undefined) throw new Error('ANP is not set');
    return this._ANP;
  }

  set ANP(value: number) {
    this._ANP = Math.trunc(value);
  }

  /**
   * ANTEIL1 - Anteil von Jahreswerten auf ganze Cent abgerundet
   */
  get ANTEIL1() {
    if (this._ANTEIL1 === undefined) throw new Error('ANTEIL1 is not set');
    return this._ANTEIL1;
  }

  set ANTEIL1(value: number) {
    this._ANTEIL1 = roundDownToFullCent(value);
  }

  /**
   * BBGKVPV - Beitragsbemessungsgrenze in der gesetzlichen Krankenversicherung und sozialen Pflegeversicherung in Euro
   */
  get BBGKVPV() {
    if (this._BBGKVPV === undefined) throw new Error('BBGKVPV is not set');
    return this._BBGKVPV;
  }

  set BBGKVPV(value: number) {
    this._BBGKVPV = Math.trunc(value);
  }

  /**
   * BBGRV - Allgemeine Beitragsbemessungsgrenze in der Rentenversicherung in Euro
   */
  get BBGRV() {
    if (this._BBGRV === undefined) throw new Error('BBGRV is not set');
    return this._BBGRV;
  }

  set BBGRV(value: number) {
    this._BBGRV = Math.trunc(value);
  }

  /**
   * BK - Bemessungsgrundlage für die Kirchenlohnsteuer in Cent
   */
  get BK() {
    if (this._BK === undefined) throw new Error('BK is not set');
    return this._BK;
  }

  set BK(value: number) {
    this._BK = Math.trunc(value);
  }

  /**
   * BKS - Bemessungsgrundlage der sonstigen Bezüge für die Kirchenlohnsteuer in Cent.
   * Hinweis: Negativbeträge, die aus nicht zu besteuernden Vorteilen bei
   * Vermögensbeteiligungen (§ 19a Absatz 1 Satz 4 EStG) resultieren,
   * mindern BK (maximal bis 0). Der Sonderausgabenabzug für
   * tatsächlich erbrachte Vorsorgeaufwendungen im Rahmen der
   * Veranlagung zur Einkommensteuer bleibt unberührt.
   */
  get BKS() {
    if (this._BKS === undefined) throw new Error('BKS is not set');
    return this._BKS;
  }

  set BKS(value: number) {
    this._BKS = Math.trunc(value);
  }

  /**
   * BMG - Bemessungsgrundlage für Altersentlastungsbetrag in Euro, Cent (2 Dezimalstellen)
   */
  get BMG() {
    if (this._BMG === undefined) throw new Error('BMG is not set');
    return this._BMG;
  }

  set BMG(value: number) {
    this._BMG = toFixedFloat(value, 2);
  }

  /**
   * DIFF - Differenz zwischen ST1 und ST2 in Euro
   */
  get DIFF() {
    if (this._DIFF === undefined) throw new Error('DIFF is not set');
    return this._DIFF;
  }

  set DIFF(value: number) {
    this._DIFF = Math.trunc(value);
  }

  /**
   * EFA - Entlastungsbetrag für Alleinerziehende in Euro
   */
  get EFA() {
    if (this._EFA === undefined) throw new Error('EFA is not set');
    return this._EFA;
  }

  set EFA(value: number) {
    this._EFA = Math.trunc(value);
  }

  /**
   * FVB - Versorgungsfreibetrag in Euro, Cent (2 Dezimalstellen)
   */
  get FVB() {
    if (this._FVB === undefined) throw new Error('FVB is not set');
    return this._FVB;
  }

  set FVB(value: number) {
    this._FVB = toFixedFloat(value, 2);
  }

  /**
   * FVBSO - Versorgungsfreibetrag für Lohnsteuer sonstiger Bezug in Euro, Cent (2 Dezimalstellen)
   */
  get FVBSO() {
    if (this._FVBSO === undefined) throw new Error('FVBSO is not set');
    return this._FVBSO;
  }

  set FVBSO(value: number) {
    this._FVBSO = toFixedFloat(value, 2);
  }

  /**
   * FVBZ - Zuschlag zum Versorgungsfreibetrag in Euro
   */
  get FVBZ() {
    if (this._FVBZ === undefined) throw new Error('FVBZ is not set');
    return this._FVBZ;
  }

  set FVBZ(value: number) {
    this._FVBZ = Math.trunc(value);
  }

  /**
   * FVBZSO - Zuschlag zum Versorgungsfreibetrag für Lohnsteuer sonstiger Bezug in Euro
   */
  get FVBZSO() {
    if (this._FVBZSO === undefined) throw new Error('FVBZSO is not set');
    return this._FVBZSO;
  }

  set FVBZSO(value: number) {
    this._FVBZSO = Math.trunc(value);
  }

  /**
   * GFB - Grundfreibetrag in Euro
   */
  get GFB() {
    if (this._GFB === undefined) throw new Error('GFB is not set');
    return this._GFB;
  }

  set GFB(value: number) {
    this._GFB = Math.trunc(value);
  }

  /**
   * HBALTE - Maximaler Altersentlastungsbetrag in Euro
   */
  get HBALTE() {
    if (this._HBALTE === undefined) throw new Error('HBALTE is not set');
    return this._HBALTE;
  }

  set HBALTE(value: number) {
    this._HBALTE = Math.trunc(value);
  }

  /**
   * HFVB - Maßgeblicher maximaler Versorgungsfreibetrag in Euro, Cent (2 Dezimalstellen)
   */
  get HFVB() {
    if (this._HFVB === undefined) throw new Error('HFVB is not set');
    return this._HFVB;
  }

  set HFVB(value: number) {
    this._HFVB = toFixedFloat(value, 2);
  }

  /**
   * HFVBZ - Maßgeblicher maximaler Zuschlag zum Versorgungsfreibetrag in Euro, Cent (2 Dezimalstellen)
   */
  get HFVBZ() {
    if (this._HFVBZ === undefined) throw new Error('HFVBZ is not set');
    return this._HFVBZ;
  }

  set HFVBZ(value: number) {
    this._HFVBZ = toFixedFloat(value, 2);
  }

  /**
   * HFVBZSO - Maßgeblicher maximaler Zuschlag zum Versorgungsfreibetrag für Lohnsteuer sonstiger Bezug in Euro, Cent (2 Dezimalstellen)
   */
  get HFVBZSO() {
    if (this._HFVBZSO === undefined) throw new Error('HFVBZSO is not set');
    return this._HFVBZSO;
  }

  set HFVBZSO(value: number) {
    this._HFVBZSO = toFixedFloat(value, 2);
  }

  /**
   * HOCH - Zwischenfeld zu X für die Berechnung der Steuer nach § 39b
   * Absatz 2 Satz 7 EStG in Euro
   */
  get HOCH() {
    if (this._HOCH === undefined) throw new Error('HOCH is not set');
    return this._HOCH;
  }

  set HOCH(value: number) {
    this._HOCH = Math.trunc(value);
  }

  /**
   * J - Nummer der Tabellenwerte für Versorgungsparameter
   */
  get J() {
    if (this._J === undefined) throw new Error('J is not set');
    return this._J;
  }

  set J(value: number) {
    this._J = value;
  }

  /**
   * JBMG - Jahressteuer nach § 51a EStG in Euro
   */
  get JBMG() {
    if (this._JBMG === undefined) throw new Error('JBMG is not set');
    return this._JBMG;
  }

  set JBMG(value: number) {
    this._JBMG = Math.trunc(value);
  }

  /**
   * JLFREIB - Auf einen Jahreslohn hochgerechneter LZZFREIB in Euro, Cent (2 Dezimalstellen)
   */
  get JLFREIB() {
    if (this._JLFREIB === undefined) throw new Error('JLFREIB is not set');
    return this._JLFREIB;
  }

  set JLFREIB(value: number) {
    this._JLFREIB = toFixedFloat(value, 2);
  }

  /**
   * JLHINZU - Auf einen Jahreslohn hochgerechneter LZZHINZU in Euro, Cent (2 Dezimalstellen)
   */
  get JLHINZU() {
    if (this._JLHINZU === undefined) throw new Error('JLHINZU is not set');
    return this._JLHINZU;
  }

  set JLHINZU(value: number) {
    this._JLHINZU = toFixedFloat(value, 2);
  }

  /**
   * JW - Jahreswert, dessen Anteil für einen Lohnzahlungszeitraum in UPANTEIL errechnet werden soll, in Cent
   */
  get JW() {
    if (this._JW === undefined) throw new Error('JW is not set');
    return this._JW;
  }

  set JW(value: number) {
    this._JW = Math.trunc(value);
  }

  /**
   * K - Nummer der Tabellenwerte für Parameter bei Altersentlastungsbetrag
   */
  get K() {
    if (this._K === undefined) throw new Error('K is not set');
    return this._K;
  }

  set K(value: number) {
    this._K = value;
  }

  /**
   * KFB - Summe der Freibeträge für Kinder in Euro
   */
  get KFB() {
    if (this._KFB === undefined) throw new Error('KFB is not set');
    return this._KFB;
  }

  set KFB(value: number) {
    this._KFB = Math.trunc(value);
  }

  /**
   * KVSATZAG - Beitragssatz des Arbeitgebers zur Krankenversicherung (5 Dezimalstellen)
   */
  get KVSATZAG() {
    if (this._KVSATZAG === undefined) throw new Error('KVSATZAG is not set');
    return this._KVSATZAG;
  }

  set KVSATZAG(value: number) {
    this._KVSATZAG = toFixedFloat(value, 5);
  }

  /**
   * KVSATZAN - Beitragssatz des Arbeitnehmers zur Krankenversicherung (5 Dezimalstellen)
   */
  get KVSATZAN() {
    if (this._KVSATZAN === undefined) throw new Error('KVSATZAN is not set');
    return this._KVSATZAN;
  }

  set KVSATZAN(value: number) {
    this._KVSATZAN = toFixedFloat(value, 5);
  }

  /**
   * KZTAB - Kennzahl für die Einkommensteuer-Tarifarten:
   *          - BASIC = Grundtarif
   *          - SPLITTING = Splittingverfahren
   */
  get KZTAB() {
    if (this._KZTAB === undefined) throw new Error('KZTAB is not set');
    return this._KZTAB;
  }

  set KZTAB(value: IncomeTaxTariffType) {
    this._KZTAB = value;
  }

  /**
   * LSTJAHR - Jahreslohnsteuer in Euro
   */
  get LSTJAHR() {
    if (this._LSTJAHR === undefined) throw new Error('LSTJAHR is not set');
    return this._LSTJAHR;
  }

  set LSTJAHR(value: number) {
    this._LSTJAHR = Math.trunc(value);
  }

  /**
   * LSTLZZ - Für den Lohnzahlungszeitraum einzubehaltende Lohnsteuer in Cent
   */
  get LSTLZZ() {
    if (this._LSTLZZ === undefined) throw new Error('LSTLZZ is not set');
    return this._LSTLZZ;
  }

  set LSTLZZ(value: number) {
    this._LSTLZZ = Math.trunc(value);
  }

  /**
   * LSTOSO - Zwischenfeld der Jahreslohnsteuer in Cent
   */
  get LSTOSO() {
    if (this._LSTOSO === undefined) throw new Error('LSTOSO is not set');
    return this._LSTOSO;
  }

  set LSTOSO(value: number) {
    this._LSTOSO = Math.trunc(value);
  }

  /**
   * LSTSO - Zwischenfeld der Jahreslohnsteuer in Cent
   */
  get LSTSO() {
    if (this._LSTSO === undefined) throw new Error('LSTSO is not set');
    return this._LSTSO;
  }

  set LSTSO(value: number) {
    this._LSTSO = Math.trunc(value);
  }

  /**
   * MIST - Mindeststeuer für die Steuerklassen V und VI in Euro
   */
  get MIST() {
    if (this._MIST === undefined) throw new Error('MIST is not set');
    return this._MIST;
  }

  set MIST(value: number) {
    this._MIST = Math.trunc(value);
  }

  /**
   * PVSATZAG - Beitragssatz des Arbeitgebers zur Pflegeversicherung (6 Dezimalstellen)
   */
  get PVSATZAG() {
    if (this._PVSATZAG === undefined) throw new Error('PVSATZAG is not set');
    return this._PVSATZAG;
  }

  set PVSATZAG(value: number) {
    this._PVSATZAG = toFixedFloat(value, 6);
  }

  /**
   * PVSATZAN - Beitragssatz des Arbeitnehmers zur Pflegeversicherung (6 Dezimalstellen)
   */
  get PVSATZAN() {
    if (this._PVSATZAN === undefined) throw new Error('PVSATZAN is not set');
    return this._PVSATZAN;
  }

  set PVSATZAN(value: number) {
    this._PVSATZAN = toFixedFloat(value, 6);
  }

  /**
   * RVSATZAN - Beitragssatz des Arbeitnehmers in der allgemeinen gesetzlichen Rentenversicherung (4 Dezimalstellen)
   */
  get RVSATZAN() {
    if (this._RVSATZAN === undefined) throw new Error('RVSATZAN is not set');
    return this._RVSATZAN;
  }

  set RVSATZAN(value: number) {
    this._RVSATZAN = toFixedFloat(value, 4);
  }

  /**
   * RW - Rechenwert in Gleitkommadarstellung
   */
  get RW() {
    if (this._RW === undefined) throw new Error('RW is not set');
    return this._RW;
  }

  set RW(value: number) {
    this._RW = value;
  }

  /**
   * SAP - Sonderausgaben-Pauschbetrag in Euro
   */
  get SAP() {
    if (this._SAP === undefined) throw new Error('SAP is not set');
    return this._SAP;
  }

  set SAP(value: number) {
    this._SAP = Math.trunc(value);
  }

  /**
   * SOLZFREI - Freigrenze für den Solidaritätszuschlag in Euro
   */
  get SOLZFREI() {
    if (this._SOLZFREI === undefined) throw new Error('SOLZFREI is not set');
    return this._SOLZFREI;
  }

  set SOLZFREI(value: number) {
    this._SOLZFREI = Math.trunc(value);
  }

  /**
   * SOLZJ - Solidaritätszuschlag auf die Jahreslohnsteuer in Euro, Cent (2 Dezimalstellen)
   */
  get SOLZJ() {
    if (this._SOLZJ === undefined) throw new Error('SOLZJ is not set');
    return this._SOLZJ;
  }

  set SOLZJ(value: number) {
    this._SOLZJ = toFixedFloat(value, 2);
  }

  /**
   * SOLZLZZ - Für den Lohnzahlungszeitraum einzubehaltender
   * Solidaritätszuschlag in Cent
   */
  get SOLZLZZ() {
    if (this._SOLZLZZ === undefined) throw new Error('SOLZLZZ is not set');
    return this._SOLZLZZ;
  }

  set SOLZLZZ(value: number) {
    this._SOLZLZZ = Math.trunc(value);
  }

  /**
   * SOLZMIN - Zwischenwert für den Solidaritätszuschlag auf die Jahreslohnsteuer in Euro, Cent (2 Dezimalstellen)
   */
  get SOLZMIN() {
    if (this._SOLZMIN === undefined) throw new Error('SOLZMIN is not set');
    return this._SOLZMIN;
  }

  set SOLZMIN(value: number) {
    this._SOLZMIN = toFixedFloat(value, 2);
  }

  /**
   * SOLZS - Solidaritätszuschlag für sonstige Bezüge in Cent.
   * Hinweis: Negativbeträge, die aus nicht zu besteuernden Vorteilen bei
   * Vermögensbeteiligungen (§ 19a Absatz 1 Satz 4 EStG) resultieren,
   * mindern SOLZLZZ (maximal bis 0). Der Sonderausgabenabzug für
   * tatsächlich erbrachte Vorsorgeaufwendungen im Rahmen der
   * Veranlagung zur Einkommensteuer bleibt unberührt.
   */
  get SOLZS() {
    if (this._SOLZS === undefined) throw new Error('SOLZS is not set');
    return this._SOLZS;
  }

  set SOLZS(value: number) {
    this._SOLZS = Math.trunc(value);
  }

  /**
   * SOLZSBMG - Bemessungsgrundlage des Solidaritätszuschlags zur Prüfung der Freigrenze beim Solidaritätszuschlag für sonstige Bezüge in Euro
   */
  get SOLZSBMG() {
    if (this._SOLZSBMG === undefined) throw new Error('SOLZSBMG is not set');
    return this._SOLZSBMG;
  }

  set SOLZSBMG(value: number) {
    this._SOLZSBMG = Math.trunc(value);
  }

  /**
   * SOLZSZVE - Zu versteuerndes Einkommen für die Bemessungsgrundlage des Solidaritätszuschlags für sonstige Bezüge in Euro, Cent (2 Dezimalstellen)
   */
  get SOLZSZVE() {
    if (this._SOLZSZVE === undefined) throw new Error('SOLZSZVE is not set');
    return this._SOLZSZVE;
  }

  set SOLZSZVE(value: number) {
    this._SOLZSZVE = toFixedFloat(value, 2);
  }

  /**
   * ST - Tarifliche Einkommensteuer in Euro
   */
  get ST() {
    if (this._ST === undefined) throw new Error('ST is not set');
    return this._ST;
  }

  set ST(value: number) {
    this._ST = Math.trunc(value);
  }

  /**
   * ST1 - Tarifliche Einkommensteuer auf das 1,25-fache ZX in Euro
   */
  get ST1() {
    if (this._ST1 === undefined) throw new Error('ST1 is not set');
    return this._ST1;
  }

  set ST1(value: number) {
    this._ST1 = Math.trunc(value);
  }

  /**
   * ST2 - Tarifliche Einkommensteuer auf das 0,75-fache ZX in Euro
   */
  get ST2() {
    if (this._ST2 === undefined) throw new Error('ST2 is not set');
    return this._ST2;
  }

  set ST2(value: number) {
    this._ST2 = Math.trunc(value);
  }

  /**
   * STS - Lohnsteuer für sonstige Bezüge in Cent
   * Hinweis: Negativbeträge, die aus nicht zu besteuernden Vorteilen bei
   * Vermögensbeteiligungen (§ 19a Absatz 1 Satz 4 EStG) resultieren,
   * mindern LSTLZZ (maximal bis 0). Der Sonderausgabenabzug für
   * tatsächlich erbrachte Vorsorgeaufwendungen im Rahmen der
   * Veranlagung zur Einkommensteuer bleibt unberührt.
   */
  get STS() {
    if (this._STS === undefined) throw new Error('STS is not set');
    return this._STS;
  }

  set STS(value: number) {
    this._STS = Math.trunc(value);
  }

  /**
   * TAB1 - Tabelle für die Prozentsätze des Versorgungsfreibetrags
   */
  public getTAB1(index: number) {
    const allowancePercentage = Table1_3.find(
      (entry) => entry.index === index,
    )?.allowancePercentage;

    if (allowancePercentage === undefined) {
      throw new Error(`No allowancePercentage (TAB1) data found for table index ${index}`);
    }

    return allowancePercentage;
  }

  /**
   * TAB2 - Tabelle für die Höchstbeträge des Versorgungsfreibetrags
   */
  public getTAB2(index: number) {
    const maxAllowance = Table1_3.find((entry) => entry.index === index)?.maxAllowance;

    if (maxAllowance === undefined) {
      throw new Error(`No maxAllowance (TAB2) data found for table index ${index}`);
    }

    return maxAllowance;
  }

  /**
   * TAB3 - Tabelle für die Zuschläge zum Versorgungsfreibetrag
   */
  public getTAB3(index: number) {
    const supplement = Table1_3.find((entry) => entry.index === index)?.supplement;

    if (supplement === undefined) {
      throw new Error(`No supplement (TAB3) data found for table index ${index}`);
    }

    return supplement;
  }

  /**
   * TAB4 - Tabelle für die Prozentsätze des Altersentlastungsbetrags
   */
  public getTAB4(index: number) {
    const allowancePercentage = Table4_5.find(
      (entry) => entry.index === index,
    )?.allowancePercentage;

    if (allowancePercentage === undefined) {
      throw new Error(`No allowancePercentage (TAB4) data found for table index ${index}`);
    }

    return allowancePercentage;
  }

  /**
   * TAB5 - Tabelle für die Höchstbeträge des Altersentlastungsbetrags
   */
  public getTAB5(index: number) {
    const maxAllowance = Table4_5.find((entry) => entry.index === index)?.maxAllowance;

    if (maxAllowance === undefined) {
      throw new Error(`No maxAllowance (TAB5) data found for table index ${index}`);
    }

    return maxAllowance;
  }

  /**
   * VBEZB - Bemessungsgrundlage für den Versorgungsfreibetrag in Cent
   */
  get VBEZB() {
    if (this._VBEZB === undefined) throw new Error('VBEZB is not set');
    return this._VBEZB;
  }

  set VBEZB(value: number) {
    this._VBEZB = Math.trunc(value);
  }

  /**
   * VBEZBSO - Bemessungsgrundlage für den Versorgungsfreibetrag in Cent für den sonstigen Bezug
   */
  get VBEZBSO() {
    if (this._VBEZBSO === undefined) throw new Error('VBEZBSO is not set');
    return this._VBEZBSO;
  }

  set VBEZBSO(value: number) {
    this._VBEZBSO = Math.trunc(value);
  }

  /**
   * VERGL - Zwischenfeld zu X für die Berechnung der Steuer nach §39b Absatz2 Satz7 EStG in Euro
   */
  get VERGL() {
    if (this._VERGL === undefined) throw new Error('VERGL is not set');
    return this._VERGL;
  }

  set VERGL(value: number) {
    this._VERGL = Math.trunc(value);
  }

  /**
   * VFRB - Verbrauchter Freibetrag bei Berechnung des laufenden Arbeitslohns, in Cent
   */
  get VFRB() {
    if (this._VFRB === undefined) throw new Error('VFRB is not set');
    return this._VFRB;
  }

  set VFRB(value: number) {
    this._VFRB = Math.trunc(value);
  }

  /**
   * VFRBS1 - Verbrauchter Freibetrag bei Berechnung des voraussichtlichen Jahresarbeitslohns, in Cent
   */
  get VFRBS1() {
    if (this._VFRBS1 === undefined) throw new Error('VFRBS1 is not set');
    return this._VFRBS1;
  }

  set VFRBS1(value: number) {
    this._VFRBS1 = Math.trunc(value);
  }

  /**
   * VFRBS2 - Verbrauchter Freibetrag bei Berechnung der sonstigen Bezüge, in Cent
   */
  get VFRBS2() {
    if (this._VFRBS2 === undefined) throw new Error('VFRBS2 is not set');
    return this._VFRBS2;
  }

  set VFRBS2(value: number) {
    this._VFRBS2 = Math.trunc(value);
  }

  /**
   * VHB - Höchstbetrag der Mindestvorsorgepauschale für Kranken- und Pflegeversicherung in Euro, Cent (2 Dezimalstellen)
   */
  get VHB() {
    if (this._VHB === undefined) throw new Error('VHB is not set');
    return this._VHB;
  }

  set VHB(value: number) {
    this._VHB = toFixedFloat(value, 2);
  }

  /**
   * VKV - Jahreswert der berücksichtigten Beiträge zur privaten Basis-Krankenversicherung und Pflege-Pflichtversicherung in Cent
   */
  get VKV() {
    if (this._VKV === undefined) throw new Error('VKV is not set');
    return this._VKV;
  }

  set VKV(value: number) {
    this._VKV = Math.trunc(value);
  }

  /**
   * VKVLZZ - Für den Lohnzahlungszeitraum berücksichtigte Beiträge des
   * Arbeitnehmers zur privaten Basis-Krankenversicherung und privaten
   * Pflege-Pflichtversicherung (ggf. auch die Mindestvorsorgepauschale)
   * in Cent beim laufenden Arbeitslohn. Für Zwecke der
   * Lohnsteuerbescheinigung sind die einzelnen Ausgabewerte
   * außerhalb des eigentlichen Lohnsteuerberechnungsprogramms zu
   * addieren; hinzuzurechnen sind auch die Ausgabewerte VKVSONST.
   */
  get VKVLZZ() {
    if (this._VKVLZZ === undefined) throw new Error('VKVLZZ is not set');
    return this._VKVLZZ;
  }

  set VKVLZZ(value: number) {
    this._VKVLZZ = Math.trunc(value);
  }

  /**
   * VKVSONST - Für den Lohnzahlungszeitraum berücksichtigte Beiträge des
   * Arbeitnehmers zur privaten Basis-Krankenversicherung und privaten
   * Pflege-Pflichtversicherung (ggf. auch die Mindestvorsorgepauschale)
   * in Cent bei sonstigen Bezügen.
   */
  get VKVSONST() {
    if (this._VKVSONST === undefined) throw new Error('VKVSONST is not set');
    return this._VKVSONST;
  }

  set VKVSONST(value: number) {
    this._VKVSONST = Math.trunc(value);
  }

  /**
   * VSP - Vorsorgepauschale mit Teilbeträgen für Rentenversicherung sowie gesetzliche Kranken- und Pflegeversicherung in Euro, Cent (2 Dezimalstellen)
   */
  get VSP() {
    if (this._VSP === undefined) throw new Error('VSP is not set');
    return this._VSP;
  }

  set VSP(value: number) {
    this._VSP = toFixedFloat(value, 2);
  }

  /**
   * VSPN - Vorsorgepauschale mit Teilbeträgen für Rentenversicherung sowie Mindestvorsorgepauschale für Kranken- und Pflegeversicherung in Euro, Cent (2 Dezimalstellen)
   */
  get VSPN() {
    if (this._VSPN === undefined) throw new Error('VSPN is not set');
    return this._VSPN;
  }

  set VSPN(value: number) {
    this._VSPN = toFixedFloat(value, 2);
  }

  /**
   * VSP1 - Zwischenwert 1 bei der Berechnung der Vorsorgepauschale in Euro, Cent (2 Dezimalstellen)
   */
  get VSP1() {
    if (this._VSP1 === undefined) throw new Error('VSP1 is not set');
    return this._VSP1;
  }

  set VSP1(value: number) {
    this._VSP1 = toFixedFloat(value, 2);
  }

  /**
   * VSP2 - Zwischenwert 2 bei der Berechnung der Vorsorgepauschale in Euro, Cent (2 Dezimalstellen)
   */
  get VSP2() {
    if (this._VSP2 === undefined) throw new Error('VSP2 is not set');
    return this._VSP2;
  }

  set VSP2(value: number) {
    this._VSP2 = toFixedFloat(value, 2);
  }

  /**
   * VSP3 - Vorsorgepauschale mit Teilbeträgen für gesetzliche Kranken- und soziale Pflegeversicherung oder ggf. für die private Basiskrankenversicherung in Euro, Cent (2 Dezimalstellen)
   */
  get VSP3() {
    if (this._VSP3 === undefined) throw new Error('VSP3 is not set');
    return this._VSP3;
  }

  set VSP3(value: number) {
    this._VSP3 = toFixedFloat(value, 2);
  }

  /**
   * W1STKL5 - Erster Grenzwert in Steuerklasse V/VI in Euro
   */
  get W1STKL5() {
    if (this._W1STKL5 === undefined) throw new Error('W1STKL5 is not set');
    return this._W1STKL5;
  }

  set W1STKL5(value: number) {
    this._W1STKL5 = Math.trunc(value);
  }

  /**
   * W2STKL5 - Zweiter Grenzwert in Steuerklasse V/VI in Euro
   */
  get W2STKL5() {
    if (this._W2STKL5 === undefined) throw new Error('W2STKL5 is not set');
    return this._W2STKL5;
  }

  set W2STKL5(value: number) {
    this._W2STKL5 = Math.trunc(value);
  }

  /**
   * W3STKL5 - Dritter Grenzwert in Steuerklasse V/VI in Euro
   */
  get W3STKL5() {
    if (this._W3STKL5 === undefined) throw new Error('W3STKL5 is not set');
    return this._W3STKL5;
  }

  set W3STKL5(value: number) {
    this._W3STKL5 = Math.trunc(value);
  }

  /**
   * WVFRB - Für die weitergehende Berücksichtigung des Steuerfreibetrags nach
   * dem DBA Türkei verfügbares ZVE über dem Grundfreibetrag bei der
   * Berechnung des laufenden Arbeitslohns, in Cent
   */
  get WVFRB() {
    if (this._WVFRB === undefined) throw new Error('WVFRB is not set');
    return this._WVFRB;
  }

  set WVFRB(value: number) {
    this._WVFRB = Math.trunc(value);
  }

  /**
   * WVFRBM - Für die weitergehende Berücksichtigung des Steuerfreibetrags nach
   * dem DBA Türkei verfügbares ZVE über dem Grundfreibetrag bei der
   * Berechnung der sonstigen Bezüge, in Cent
   */
  get WVFRBM() {
    if (this._WVFRBM === undefined) throw new Error('WVFRBM is not set');
    return this._WVFRBM;
  }

  set WVFRBM(value: number) {
    this._WVFRBM = Math.trunc(value);
  }

  /**
   * WVFRBO - Für die weitergehende Berücksichtigung des Steuerfreibetrags nach
   * dem DBA Türkei verfügbares ZVE über dem Grundfreibetrag bei der
   * Berechnung des voraussichtlichen Jahresarbeitslohns, in Cent
   */
  get WVFRBO() {
    if (this._WVFRBO === undefined) throw new Error('WVFRBO is not set');
    return this._WVFRBO;
  }

  set WVFRBO(value: number) {
    this._WVFRBO = Math.trunc(value);
  }

  /**
   * X - Zu versteuerndes Einkommen gem. §32a Absatz1 und Absatz5 EStG in Euro, Cent (2 Dezimalstellen)
   */
  get X() {
    if (this._X === undefined) throw new Error('X is not set');
    return this._X;
  }

  set X(value: number) {
    this._X = toFixedFloat(value, 2);
  }

  /**
   * Y - Gemäß §32a Absatz1 EStG (6 Dezimalstellen)
   */
  get Y() {
    if (this._Y === undefined) throw new Error('Y is not set');
    return this._Y;
  }

  set Y(value: number) {
    this._Y = toFixedFloat(value, 6);
  }

  /**
   * ZRE4 - Auf einen Jahreslohn hochgerechnetes RE4 in Euro, Cent (2 Dezimalstellen), nach Abzug der Freibeträge nach §39b Absatz2 Satz3 und Satz4 EStG
   */
  get ZRE4() {
    if (this._ZRE4 === undefined) throw new Error('ZRE4 is not set');
    return this._ZRE4;
  }

  set ZRE4(value: number) {
    this._ZRE4 = toFixedFloat(value, 2);
  }

  /**
   * ZRE4J - Auf einen Jahreslohn hochgerechnetes RE4 in Euro, Cent (2 Dezimalstellen)
   */
  get ZRE4J() {
    if (this._ZRE4J === undefined) throw new Error('ZRE4J is not set');
    return this._ZRE4J;
  }

  set ZRE4J(value: number) {
    this._ZRE4J = toFixedFloat(value, 2);
  }

  /**
   * ZRE4VP - Auf einen Jahreslohn hochgerechnetes RE4, ggf. nach Abzug der Entschädigungen i.S.d. §24 Nummer1 EStG in Euro, Cent (2 Dezimalstellen)
   */
  get ZRE4VP() {
    if (this._ZRE4VP === undefined) throw new Error('ZRE4VP is not set');
    return this._ZRE4VP;
  }

  set ZRE4VP(value: number) {
    this._ZRE4VP = toFixedFloat(value, 2);
  }

  /**
   * ZTABFB - Feste Tabellenfreibeträge (ohne Vorsorgepauschale) in Euro, Cent (2 Dezimalstellen)
   */
  get ZTABFB() {
    if (this._ZTABFB === undefined) throw new Error('ZTABFB is not set');
    return this._ZTABFB;
  }

  set ZTABFB(value: number) {
    this._ZTABFB = toFixedFloat(value, 2);
  }

  /**
   * ZVBEZ - Auf einen Jahreslohn hochgerechnetes VBEZ abzüglich FVB in Euro, Cent (2 Dezimalstellen)
   */
  get ZVBEZ() {
    if (this._ZVBEZ === undefined) throw new Error('ZVBEZ is not set');
    return this._ZVBEZ;
  }

  set ZVBEZ(value: number) {
    this._ZVBEZ = toFixedFloat(value, 2);
  }

  /**
   * ZVBEZJ - Auf einen Jahreslohn hochgerechnetes VBEZ in Euro, Cent (2 Dezimalstellen)
   */
  get ZVBEZJ() {
    if (this._ZVBEZJ === undefined) throw new Error('ZVBEZJ is not set');
    return this._ZVBEZJ;
  }

  set ZVBEZJ(value: number) {
    this._ZVBEZJ = toFixedFloat(value, 2);
  }

  /**
   * ZVE - Zu versteuerndes Einkommen in Euro, Cent (2 Dezimalstellen)
   */
  get ZVE() {
    if (this._ZVE === undefined) throw new Error('ZVE is not set');
    return this._ZVE;
  }

  set ZVE(value: number) {
    this._ZVE = toFixedFloat(value, 2);
  }

  /**
   * ZX - Zwischenfeld zu X für die Berechnung der Steuer nach §39b Absatz2 Satz7 EStG in Euro
   */
  get ZX() {
    if (this._ZX === undefined) throw new Error('ZX is not set');
    return this._ZX;
  }

  set ZX(value: number) {
    this._ZX = Math.trunc(value);
  }

  /**
   * ZZX - Zwischenfeld zu X für die Berechnung der Steuer nach §39b Absatz2 Satz7 EStG in Euro
   */
  get ZZX() {
    if (this._ZZX === undefined) throw new Error('ZZX is not set');
    return this._ZZX;
  }

  set ZZX(value: number) {
    this._ZZX = Math.trunc(value);
  }
}
