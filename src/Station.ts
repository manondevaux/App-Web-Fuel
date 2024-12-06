import { Postal } from './Postal';
import { PrixElement } from './PrixElement';

export interface Station {
  id: number;                         // Identifiant unique de la station
  latitude: string;                   // Latitude de la station
  longitude: string;                  // Longitude de la station
  cp: Postal;                         // Code postal de la station
  adresse: string;                    // Adresse de la station
  ville: string;                      // Ville de la station
  prix: PrixElement[];                // Prix du carburant                       
  carburants: string[];               // Liste des carburants disponibles
}
