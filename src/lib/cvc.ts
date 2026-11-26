// Modules CVC extraits de "Calcul simplifié thermique.xlsx"

export const G_COEFF = { rt2005: 0.65, rt2000: 0.75, post1980: 0.9, moyen: 1.2, nonIsole: 1.8 };
export const UBATS = { exceptionnel: 0.3, excellent: 0.4, rt2005: 0.75, rt2000: 0.8, y1990_2000: 0.95, y1983_1989: 1.15, y1974_1982: 1.4, nonIsole: 1.8 };
export const R_VENT = { vmcAuto: 0.2, vmcHygro: 0.14 };
export const deperditionG = (g: number, volume: number, deltaT: number) => g * volume * deltaT;
export const deperditionUbat = (ubat: number, sDep: number, vh: number, r: number, deltaT: number) => (ubat * sDep + r * vh) * deltaT;

export const PAROIS = [
  { type: "Mur extérieur", u: 0.25 },
  { type: "Toiture", u: 0.18 },
  { type: "Plancher bas", u: 0.25 },
  { type: "Vitrage", u: 1.3 },
  { type: "Pont thermique", u: 0.5 },
];

export const DEBITS_VENTILATION: Record<string, number> = {
  "Bureau": 18, "Classe": 15, "Commerce": 22, "Restauration": 22, "Sportif": 25,
  "Salle de bains": 15, "WC": 15, "Cuisine collective": 20, "Salle de réunion": 18,
  "Cuisine <150 repas": 25, "Cuisine 150-500": 20, "Cuisine 501-1500": 15,
  "Bibliothèque": 18, "Dépôt": 0.1, "Espace sportif": 22,
};

export const sectionCirc = (dMm: number) => Math.PI * (dMm / 1000) ** 2 / 4;
export const vitesse = (qM3h: number, dMm: number) => qM3h * 4 / (Math.PI * (dMm / 1000) ** 2) / 3600;
export const qEau = (qM3h: number, rho: number, cp: number, deltaT: number) => qM3h * rho * cp * deltaT / 3600;
export const chezy = (dMm: number, pentePct: number) => {
  const d = dMm / 1000; const i = pentePct / 100;
  const s = Math.PI * d * d / 4; const r = s / (Math.PI * d);
  return 70 * r ** (2 / 3) * Math.sqrt(i) * s;
};

export const DN_TABLE = [
  { dn: 15, qMax: 0.5 }, { dn: 20, qMax: 1.0 }, { dn: 25, qMax: 1.8 },
  { dn: 32, qMax: 3.0 }, { dn: 40, qMax: 4.5 }, { dn: 50, qMax: 7.0 },
];
export const getDN = (qM3h: number) => {
  const t = DN_TABLE.find(x => qM3h <= x.qMax) || DN_TABLE[DN_TABLE.length - 1];
  const v = qM3h / 3600 / (Math.PI * (t.dn / 1000) ** 2 / 4);
  return { dn: t.dn, vitesse: v };
};
export const RATIOS_PRIX = {
  chauffage: { eur_m2: 80, eur_kW: 120 },
  eau_glacee: { eur_m2: 100, eur_kW: 150 },
  ventilation: { eur_m3h: 5 },
};
export const calcPrix = (surface: number, puissance: number, typeSysteme: keyof typeof RATIOS_PRIX) => {
  const r = RATIOS_PRIX[typeSysteme];
  if (typeSysteme === "ventilation") return surface * 0 + puissance * (r as any).eur_m3h;
  return surface * (r as any).eur_m2 + puissance * (r as any).eur_kW;
};
export const simu = (nb: number, majoration = 1.5) => (0.8 / Math.sqrt(nb - 1)) * majoration;
export const dimPuissance = (surface: number, typeLocal: string) => {
  const w = typeLocal.includes("Restauration") || typeLocal.includes("Cuisine") ? 150 : typeLocal.includes("Classe") ? 80 : 100;
  return surface * w;
};
export const dimDebitVent = (volume: number, typeLocal: string) => {
  const volh = typeLocal.includes("Classe") ? 6 : 8;
  return volume * volh;
};