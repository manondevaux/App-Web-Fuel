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
import type { Fuel } from './Fuel';
import { FuelService } from './fuel.service';

@Controller('fuels')
export class FuelController {
  constructor(private readonly fuelService: FuelService) {}

  @Post()
  createFuel(@Body() fuel: Fuel): Fuel {
    this.fuelService.addFuel(fuel);
    return this.fuelService.getFuel(fuel.id.toString());
  }

  @Get()
  getFuels(@Query('carburant') carburant: string): Fuel[] {
    if (carburant) {
      return this.fuelService.getFuelsOf(carburant);
    }
    return this.fuelService.getAllFuels();
  }

  @Get(':id')
  getFuel(@Param('id') id: string): Fuel {
    return this.fuelService.getFuel(id);
  }

  @Delete(':id')
  deleteFuel(@Param('id') id: string): void {
    this.fuelService.remove(id);
  }

  @Post('search')
  @HttpCode(200)
  searchFuels(@Body() { term }: { term: string }): Fuel[] {
    return this.fuelService.search(term);
  }
}
