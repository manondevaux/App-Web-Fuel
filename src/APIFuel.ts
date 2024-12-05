import { Postal } from './Postal';
import { PrixElement } from './PrixElement';
import { Geom } from './Geom';

export type APIFuel = {
  id: number;                         // Identifiant unique de la station
  cp: Postal;                         // Code postal de la station
  adresse: string;                    // Adresse de la station
  ville: string;                      // Ville de la station
  prix: PrixElement[];                // Prix du carburant
  geom: Geom;                         // Coordonnées géographiques de la station
  carburants_disponibles: string[];   // Liste des carburants disponibles
};
