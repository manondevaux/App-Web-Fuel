export type APIStation = {
  id: number;                         // Identifiant unique de la station
  latitude: string;                   // Latitude de la station
  longitude: string;                  // Longitude de la station
  cp: string;                         // Code postal de la station
  adresse: string;                    // Adresse de la station
  ville: string;                      // Ville de la station
  gazole_prix?: number;               // Prix du Gazole
  sp95_prix?: number;                 // Prix du SP95
  e85_prix?: number;                  // Prix du E85
  gplc_prix?: number;                 // Prix du GPLc
  e10_prix?: number;                  // Prix du E10
  sp98_prix?: number;                 // Prix du SP98
  isFavorite: boolean;                // Indique si la station est en favori
};
