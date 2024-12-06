import { readFile } from 'node:fs/promises';
import { HttpService } from '@nestjs/axios';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { firstValueFrom, map, tap } from 'rxjs';
import { APIFuel } from './APIFuel';
import type { Fuel } from './Fuel';

@Injectable()
export class FuelService implements OnModuleInit {
  private readonly logger = new Logger(FuelService.name);
  private readonly storage: Map<string, Fuel> = new Map();

  constructor(private readonly httpService: HttpService) {}

  async onModuleInit() {
    //this.logger.log('Loading books from file and API');
    // await Promise.all([this.loadBooksFromFile(), this.loadBooksFromApi()]);
    // this.logger.log(`${this.storage.size} books loaded`);

    /*this.logger.log('Loading fuels from API');
    await this.loadFuelsFromApi();
    this.logger.log(`${this.storage.size} fuels loaded`);*/

    this.logger.log('Loading fuels from file');
    await this.loadFuelsFromFile();
    this.logger.log(`${this.storage.size} fuels loaded`);

  }

  
  private async loadFuelsFromFile() {
    const data = await readFile('src/opendatamef.json', 'utf8');
    const fuels = JSON.parse(data.toString()) as Fuel[];
    fuels.forEach((fuel) => this.addFuel(fuel));
  }

  private async loadFuelsFromApi() {
    await firstValueFrom(
      this.httpService
        .get<{ records: APIFuel[] }>('https://data.opendatasoft.com/api/explore/v2.1/catalog/datasets/prix-des-carburants-en-france-flux-instantane-v2@opendatamef/records?select=id%2C%20cp%2C%20adresse%2C%20ville%2C%20prix%2C%20geom%2C%20carburants_disponibles&limit=20')
        .pipe(
          map((response) => {
            console.log('Response data:', response.data);
            return response.data.records || [];
          }),
          map((apiFuels) =>
            apiFuels.map((apiFuel) => ({
              id: apiFuel.id,
              cp: apiFuel.cp,
              adresse: apiFuel.adresse,
              ville: apiFuel.ville,
              prix: apiFuel.prix,
              geom: apiFuel.geom,
              carburants: apiFuel.carburants_disponibles,

            })),
          ),
          tap((fuels) => fuels.forEach((fuel) => {
            console.log('Fuel:', fuel);
            this.addFuel(fuel);
          })),
        ),
    );
  }

  addFuel(fuel: Fuel) {
    this.storage.set(fuel.id.toString(), fuel);
  }

  getFuel(id: string): Fuel {
    const fuel = this.storage.get(id);

    if (!fuel) {
      throw new Error(`Fuel with ID ${id} not found`);
    }

    return fuel;
  }

  getAllFuels(): Fuel[] {
    return Array.from(this.storage.values()).sort((a, b) =>
      a.cp.localeCompare(b.cp),
    );
  }

  getFuelsOf(carburant: string): Fuel[] {
    return this.getAllFuels()
      .filter((fuel) => fuel.carburants?.includes(carburant))
      .sort((a, b) => a.cp.localeCompare(b.cp));
  }

  remove(id: string) {
    this.storage.delete(id);
  }

  search(term: string) {
    return Array.from(this.storage.values())
      .filter((fuel) => fuel.ville.includes(term) || fuel.adresse.includes(term))
      .sort((a, b) => a.cp.localeCompare(b.cp));
  }
}
