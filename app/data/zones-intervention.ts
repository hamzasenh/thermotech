export interface ZoneRegion {
  region: string;
  communes: string[];
}

export const zonesIntervention: ZoneRegion[] = [
  {
    region: "Région de Bruxelles-Capitale",
    communes: [
      "Anderlecht",
      "Auderghem",
      "Berchem-Sainte-Agathe",
      "Bruxelles-Ville",
      "Etterbeek",
      "Evere",
      "Forest",
      "Ganshoren",
      "Ixelles",
      "Jette",
      "Koekelberg",
      "Molenbeek-Saint-Jean",
      "Saint-Gilles",
      "Saint-Josse-ten-Noode",
      "Schaerbeek",
      "Uccle",
      "Watermael-Boitsfort",
      "Woluwe-Saint-Lambert",
      "Woluwe-Saint-Pierre",
    ],
  },
  {
    region: "Région flamande",
    communes: [
      "Rhode-Saint-Genèse",
      "Wezembeek-Oppem",
      "Kraainem",
      "Linkebeek",
      "Drogenbos",
      "Tervuren",
      "Overijse",
      "Hoeilaart",
      "Meise",
      "Grimbergen",
      "Keerbergen",
      "Tremelo",
      "Oud-Heverlee",
    ],
  },
  {
    region: "Région wallonne",
    communes: [
      "Lasne",
      "Waterloo",
      "La Hulpe",
      "Rixensart",
      "Braine-l'Alleud",
      "Chaumont-Gistoux",
      "Grez-Doiceau",
      "Beauvechain",
      "Incourt",
    ],
  },
];
