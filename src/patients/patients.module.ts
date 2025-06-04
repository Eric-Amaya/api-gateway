import { Module } from '@nestjs/common';
import { PatientsController } from './patients.controller';
import { AuthModule } from 'src/auth/auth.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    AuthModule,
    ClientsModule.register([
      {
        name: 'PATIENTS_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'ms-pacientes',
          port: 3003,
        },
      },
    ]),
  ],
  controllers: [PatientsController]
})
export class PatientsModule {}
