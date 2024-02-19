import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        BOOKING_PORT: Joi.number().required(),
        BOOKING_POSTGRES_URL: Joi.string().required(),
        RABBITMQ_URI: Joi.string().required(),
        AUTH_HOST: Joi.string().required(),
        PAYMENTS_HOST: Joi.string().required(),
      }),
    }),
  ],
})
export class BookingConfigModule {}
