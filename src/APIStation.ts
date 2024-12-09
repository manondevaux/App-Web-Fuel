export type APIStation = {
  id: number;                         // Identifiant unique de la station
  latitude: string;                   // Latitude de la station
  longitude: string;                  // Longitude de la station
  cp: string;                         // Code postal de la station
  adresse: string;                    // Adresse de la station
  ville: string;                      // Ville de la station
  prix: {                             // Prix des carburants
    nom: string;
    id: string;
    maj: string;
    valeur: string;
  }[];    
  carburants_disponibles: string[];   // Liste des carburants disponibles
};
