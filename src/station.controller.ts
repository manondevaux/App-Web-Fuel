import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import type { Station } from './Station';
import { StationService } from './station.service';
import type { APIStation } from './APIStation';

@Controller('stations')
export class StationController {
  constructor(private readonly stationService: StationService) {}
/*
  @Post()
  createStation(@Body() station: Station): Station {
    this.stationService.addStation(station);
    return this.stationService.getStation(station.id.toString());
  }*/

  @Get()
  getStations(): APIStation[] {
    /*if (carburant) {
      return this.stationService.getStationsOf(carburant);
    }*/
    return this.stationService.getAllStations();
  }
/*
  @Get(':id')
  getStation(@Param('id') id: string): Station {
    return this.stationService.getStation(id);
  }

  @Delete(':id')
  deleteStation(@Param('id') id: string): void {
    this.stationService.remove(id);
  }

  @Post('search')
  @HttpCode(200)
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  searchStations(@Body() body: any): Station[] {
    const { term } = body;
    return this.stationService.search(term);
  }*/

  @Put(':id')
  updateFavoriteStatus(
    @Param('id') id: number,
    @Body() body: { isFavorite: boolean }
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  ): any {
    const updatedStation = this.stationService.toggleFavorite(id, body.isFavorite);
    return {
      message: 'Statut favori mis à jour avec succès',
      data: updatedStation,
    };
  }
}