import { NestFactory } from '@nestjs/core';
import { FuelModule } from './fuel.module';

async function bootstrap() {
  const app = await NestFactory.create(FuelModule);
  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
