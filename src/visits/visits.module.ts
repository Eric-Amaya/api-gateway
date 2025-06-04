import { Module } from '@nestjs/common';
import { VisitsController } from './visits.controller';
import { AuthModule } from '../auth/auth.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    AuthModule,
    ClientsModule.register([
      {
        name: 'VISITS_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'visitas-service',
          port: 3005,
        },
      },
    ]),
  ],
  controllers: [VisitsController]
})
export class VisitsModule {}
