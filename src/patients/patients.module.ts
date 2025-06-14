import { Module } from '@nestjs/common';
import { PatientsController } from './patients.controller';
import { AuthModule } from 'src/auth/auth.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    AuthModule,
    ClientsModule.registerAsync([
      {
        name: 'PATIENTS_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get<string>('PATIENTS_SERVICE_HOST') || 'localhost',
            port: configService.get<number>('PATIENTS_SERVICE_PORT') || 3003,
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
  controllers: [PatientsController]
})
export class PatientsModule {}
