export interface Station {
  id: number;                         // Identifiant unique de la station
  latitude: string;                   // Latitude de la station
  longitude: string;                  // Longitude de la station
  cp: string;                         // Code postal de la station
  pop: string;                        // Population de la station 
  adresse: string;                    // Adresse de la station
  ville: string;                      // Ville de la station
  services: string[];                 // Services disponibles
  prix: {                             // Prix des carburants
    nom: string;
    id: string;
    maj: string;
    valeur: string;
  }[];                                
  rupture: {                          // Informations sur les ruptures de carburants
    nom: string;
    id: string;
    debut: string;
    fin: string;
    type: string;
  }[];    
  horaires: {                         // Horaires d'ouverture
    automate_24_24: boolean;
    jours: {
      id: string;
      nom: string;
      ferme?: boolean;
      horaire?: {
        ouverture: string;
        fermeture: string;
      };
    }[];
  };
  geom: {                             // Coordonnées géographiques
    lon: number;
    lat: number;
  };
  gazole_maj?: string;                // Date de mise à jour du prix du Gazole
  gazole_prix?: number;               // Prix du Gazole
  sp95_maj?: string;                  // Date de mise à jour du prix du SP95
  sp95_prix?: number;                 // Prix du SP95
  e85_maj?: string;                   // Date de mise à jour du prix du E85
  e85_prix?: number;                  // Prix du E85
  gplc_maj?: string;                  // Date de mise à jour du prix du GPLc
  gplc_prix?: number;                 // Prix du GPLc
  e10_maj?: string;                   // Date de mise à jour du prix du E10
  e10_prix?: number;                  // Prix du E10
  sp98_maj?: string;                  // Date de mise à jour du prix du SP98
  sp98_prix?: number;                 // Prix du SP98
  e10_rupture_debut?: string;         // Date de début de la rupture de E10
  e10_rupture_type?: string;          // Type de rupture de E10
  sp98_rupture_debut?: string;        // Date de début de la rupture de SP98
  sp98_rupture_type?: string;         // Type de rupture de SP98
  sp95_rupture_debut?: string;        // Date de début de la rupture de SP95
  sp95_rupture_type?: string;         // Type de rupture de SP95
  e85_rupture_debut?: string;         // Date de début de la rupture de E85
  e85_rupture_type?: string;          // Type de rupture de E85
  gplc_rupture_debut?: string;        // Date de début de la rupture de GPLc
  gplc_rupture_type?: string;         // Type de rupture de GPLc
  gazole_rupture_debut?: string;      // Date de début de la rupture de Gazole
  gazole_rupture_type?: string;       // Type de rupture de Gazole
  carburants_disponibles?: string[];   // Liste des carburants disponibles
  carburants_indisponibles?: string[]; // Liste des carburants indisponibles
  carburants_rupture_temporaire?: string; // Liste des carburants en rupture temporaire
  carburants_rupture_definitive?: string; // Liste des carburants en rupture définitive
  horaires_automate_24_24?: string;    // Horaires de l'automate 24/24
  services_service?: string[];         // Liste des services disponibles
  departement: string;                // Département de la station
  code_departement: string;           // Code du département de la station
  region: string;                     // Région de la station
  code_region: string;                // Code de la région de la station
  horaires_jour?: string;              // Horaires d'ouverture de la station
}
