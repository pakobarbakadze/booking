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
    transport: Transport.RMQ,
    options: {
      urls: [configService.get<string>('RABBITMQ_URI')],
      queue: 'auth',
    },
  });

  await app.startAllMicroservices();
  await app.listen(configService.get<number>('AUTH_PORT'));
}
bootstrap();
