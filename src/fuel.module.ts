import { Module } from '@nestjs/common';
import { FuelController } from './fuel.controller';
import { FuelService } from './fuel.service';
import { HttpModule } from "@nestjs/axios";

@Module({
  imports: [HttpModule],
  controllers: [FuelController],
  providers: [FuelService],
})
export class FuelModule {}
