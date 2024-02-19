import { LoggerModule } from '@app/common';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { redisStore } from 'cache-manager-redis-yet';
import { BookingDbModule } from '../config/booking-db.module';
import { BookingConfigModule } from '../config/config.module';
import { HotelsModule } from './modules/hotels/hotels.module';
import { ReservationsModule } from './modules/reservations/reservations.module';
import { RoomsModule } from './modules/rooms/rooms.module';

@Module({
  imports: [
    BookingDbModule,
    BookingConfigModule,
    LoggerModule,
    ReservationsModule,
    HotelsModule,
    RoomsModule,
    CacheModule.registerAsync({
      useFactory: async () => ({
        store: await redisStore({
          database: 0,
          ttl: 0,
          socket: {
            host: 'cache',
            port: 6379,
          },
        }),
      }),
    }),
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class BookingsModule {}
