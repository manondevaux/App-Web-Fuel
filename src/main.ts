import { NestFactory } from '@nestjs/core';
import { StationModule } from './station.module';

async function bootstrap() {
  const app = await NestFactory.create(StationModule);
  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
