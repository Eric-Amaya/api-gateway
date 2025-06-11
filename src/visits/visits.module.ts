import { Module } from '@nestjs/common';
import { VisitsController } from './visits.controller';
import { AuthModule } from '../auth/auth.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    AuthModule,
    ClientsModule.registerAsync([
      {
        name: 'VISITS_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get<string>('VISITS_SERVICE_HOST'),
            port: configService.get<number>('VISITS_SERVICE_PORT'),
          },
        }),
      },
      {
        name: 'ACTIVITIES_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get<string>('AUTH_SERVICE_HOST'), 
            port: configService.get<number>('AUTH_SERVICE_PORT'),
          },
        }),
      },
    ]),
  ],
  controllers: [VisitsController]
})
export class VisitsModule {}
