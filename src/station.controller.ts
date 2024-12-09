import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import type { Station } from './Station';
import { StationService } from './station.service';

@Controller('stations')
export class StationController {
  constructor(private readonly stationService: StationService) {}

  @Post()
  createStation(@Body() station: Station): Station {
    this.stationService.addStation(station);
    return this.stationService.getStation(station.id.toString());
  }

  @Get()
  getStations(@Query('carburant') carburant: string): Station[] {
    if (carburant) {
      return this.stationService.getStationsOf(carburant);
    }
    return this.stationService.getAllStations();
  }

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
  }
  
}
