// see: https://www.bundesfinanzministerium.de/Content/DE/Downloads/Steuern/Steuerarten/Lohnsteuer/Programmablaufplan/2024-11-22-PAP-2025_anlage.pdf?__blob=publicationFile&v=2

/**
 *
 *
 * User inputs
 *
 *
 */

/**
 * KRV - Merker für die Vorsorgepauschale:
 * `true` wenn der Versorgungsempfänger ist in der gesetzlichen
 * Rentenversicherung oder einer berufsständischen
 * Versorgungseinrichtung pflichtversichert oder, bei Befreiung von
 * der Versicherungspflicht freiwillig versichert
 */
const hasStatPenIns = true;
/**
 * KVZ - Kassenindividueller Zusatzbeitrag bei einem gesetzlich
 * krankenversicherten Versorgungsempfängers in Prozent (bspw. 2,50
 * für 2,50 %) mit 2 Dezimalstellen
 */
const statHealthInsAddConRate = 2.5;
/**
 * PVS - `true` wenn bei der sozialen Pflegeversicherung die Besonderheiten in
 * Sachsen zu berücksichtigen sind bzw. zu berücksichtigen wären
 */
const isFromSaxony = true;
/**
 * PVZ `true`, wenn der Arbeitnehmer den Zuschlag zur sozialen
 * Pflegeversicherung zu zahlen hat
 */
const nurseCareInsEmployeeHasToPayAddCon = true;

/**
 * PVA Zahl der beim Arbeitnehmer zu berücksichtigenden
 * Beitragsabschläge in der sozialen Pflegeversicherung bei mehr als
 * einem Kind:
 * 0 = kein Abschlag
 * 1 = Beitragsabschlag für das 2. Kind
 * 2 = Beitragsabschläge für das 2. und 3. Kind
 * 3 = Beitragsabschläge für 2. bis 4. Kinder
 * 4 = Beitragsabschläge für 2. bis 5. oder mehr Kinder
 */
const nurseCareDeductWithChildren = 0;

/**
 *
 *
 * Internal fields
 *
 *
 */

/**
 * BBGRV - Allgemeine Beitragsbemessungsgrenze in der allgemeinen Rentenversicherung in Euro
 */
export const statPenInsConAssCeil = hasStatPenIns ? 96_600 : 0;

/**
 * RVSATZAN - Beitragssatz des Arbeitnehmers in der allgemeinen gesetzlichen Rentenversicherung (4 Dezimalstellen)
 */
export const statPenInsConRate = hasStatPenIns ? 0.093 : 0;

/**
 * BBGKVPV - Beitragsbemessungsgrenze in der gesetzlichen Krankenversicherung und der sozialen Pflegeversicherung in Euro
 */
const statHealthInsConAssCeil = 66150;

/**
 * KVSATZAN - Beitragssatz des Arbeitnehmers zur Krankenversicherung (5 Dezimalstellen)
 */
const statHealthInsConRateEmployee = statHealthInsAddConRate / 2 / 100 + 0.07;

/**
 * KVSATZAG - Beitragssatz des Arbeitgebers zur Krankenversicherung unter
 * Berücksichtigung des durchschnittlichen Zusatzbeitragssatzes für die
 * Ermittlung des Arbeitgeberzuschusses (5 Dezimalstellen)
 */
const statHealthInsConRateEmployee = 0.0125 + 0.07;

/**
 * PVSATZAN - Beitragssatz des Arbeitnehmers zur Pflegeversicherung (6 Dezimalstellen)
 */
let nursCareInsConRateEmployee = isFromSaxony ? 0.023 : 0.018;
if (!nurseCareInsEmployeeHasToPayAddCon) {
  nursCareInsConRateEmployee =
    nursCareInsConRateEmployee - nurseCareDeductWithChildren * 0.0025;
} else {
  nursCareInsConRateEmployee = nursCareInsConRateEmployee + 0.006;
}

/**
 * PVSATZAG - Beitragssatz des Arbeitgebers zur Pflegeversicherung (6 Dezimalstellen)
 */
const nursCareInsConRateEmployer = isFromSaxony ? 0.013 : 0.018;

/**
 * W1STKL5 - Erster Grenzwert in Steuerklasse V/VI in Euro
 */
const taxClassFiveSixLimitOne = 13432;

/**
 * W2STKL5 - Zweiter Grenzwert in Steuerklasse V/VI in Euro
 */
const taxClassFiveSixLimitTwo = 33380;

/**
 * W3STKL5 - Dritter Grenzwert in Steuerklasse V/VI in Euro
 */
const taxClassFiveSixLimitThree = 222260;

/**
 * GFB - Grundfreibetrag in Euro
 */
const basicTaxFreeAllowance = 11784;

/**
 * SOLZFREI - Freigrenze für den Solidaritätszuschlag in Euro
 */
const solidarityExemptionLimit = 18130;
