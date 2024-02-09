import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { Logger } from 'nestjs-pino';
import { AuthMicroModule } from './auth-micro.module';

async function bootstrap() {
  const app = await NestFactory.create(AuthMicroModule);

  const configService = app.get(ConfigService);

  app.useLogger(app.get(Logger));

  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: configService.get<number>('AUTH_TCP_PORT'),
    },
  });

  await app.startAllMicroservices();
  await app.listen(configService.get<number>('AUTH_PORT'));
}
bootstrap();
