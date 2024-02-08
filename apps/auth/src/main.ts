import { NestFactory } from '@nestjs/core';
import { AuthMicroModule } from './auth-micro.module';

async function bootstrap() {
  const app = await NestFactory.create(AuthMicroModule);
  await app.listen(3001);
}
bootstrap();
