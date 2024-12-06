import { readFile } from 'node:fs/promises';
import { HttpService } from '@nestjs/axios';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { firstValueFrom, map, tap } from 'rxjs';
import { APIStation } from './APIStation';
import type { Station } from './Station';

@Injectable()
export class StationService implements OnModuleInit {
  private readonly logger = new Logger(StationService.name);
  private readonly storage: Map<string, Station> = new Map();

  constructor(private readonly httpService: HttpService) {}

  async onModuleInit() {
    //this.logger.log('Loading books from file and API');
    // await Promise.all([this.loadBooksFromFile(), this.loadBooksFromApi()]);
    // this.logger.log(`${this.storage.size} books loaded`);

    /*this.logger.log('Loading stations from API');
    await this.loadStationsFromApi();
    this.logger.log(`${this.storage.size} stations loaded`);*/

    this.logger.log('Loading stations from file');
    await this.loadStationsFromFile();
    this.logger.log(`${this.storage.size} stations loaded`);

  }

  
  private async loadStationsFromFile() {
    const data = await readFile('src/opendatamef.json', 'utf8');
    const stations = JSON.parse(data.toString()) as Station[];
    stations.forEach((station) => this.addStation(station));
  }

  private async loadStationsFromApi() {
    await firstValueFrom(
      this.httpService
        .get<{ records: APIStation[] }>('https://data.opendatasoft.com/api/explore/v2.1/catalog/datasets/prix-des-carburants-en-france-flux-instantane-v2@opendatamef/records?select=id%2C%20cp%2C%20adresse%2C%20ville%2C%20prix%2C%20geom%2C%20carburants_disponibles&limit=20')
        .pipe(
          map((response) => {
            console.log('Response data:', response.data);
            return response.data.records || [];
          }),
          map((apiStations) =>
            apiStations.map((apiStation) => ({
              id: apiStation.id,
              latitude: apiStation.latitude,
              longitude: apiStation.longitude,
              cp: apiStation.cp,
              adresse: apiStation.adresse,
              ville: apiStation.ville,
              prix: apiStation.prix,
              carburants: apiStation.carburants_disponibles,

            })),
          ),
          tap((stations) => stations.forEach((station) => {
            console.log('Station:', station);
            this.addStation(station);
          })),
        ),
    );
  }

  addStation(station: Station) {
    this.storage.set(station.id.toString(), station);
  }

  getStation(id: string): Station {
    const station = this.storage.get(id);

    if (!station) {
      throw new Error(`Station with ID ${id} not found`);
    }

    return station;
  }

  getAllStations(): Station[] {
    return Array.from(this.storage.values()).sort((a, b) =>
      a.cp.localeCompare(b.cp),
    );
  }

  getStationsOf(carburant: string): Station[] {
    return this.getAllStations()
      .filter((station) => station.carburants?.includes(carburant))
      .sort((a, b) => a.cp.localeCompare(b.cp));
  }

  remove(id: string) {
    this.storage.delete(id);
  }

  search(term: string) {
    return Array.from(this.storage.values())
      .filter((station) => station.ville.includes(term) || station.adresse.includes(term))
      .sort((a, b) => a.cp.localeCompare(b.cp));
  }
}
