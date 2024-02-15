import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';
import { BookingsModule } from './booking.module';

async function bootstrap() {
  const app = await NestFactory.create(BookingsModule);
  const configService = app.get(ConfigService);

  app.useLogger(app.get(Logger));
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  await app.listen(configService.get<number>('RESERVATIONS_PORT'));
}
bootstrap();
