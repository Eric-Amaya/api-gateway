import { Module } from '@nestjs/common';
import { StudiesController } from './studies.controller';
import { AuthModule } from 'src/auth/auth.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    AuthModule,
    ClientsModule.registerAsync([
      {
        name: 'STUDIES_SERVICE',
        imports : [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get<string>('STUDIES_SERVICE_HOST'),
            port: configService.get<number>('STUDIES_SERVICE_PORT'),
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
  controllers: [StudiesController]
})
export class StudiesModule {}
