// 🟢 En el API Gateway
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { RolesGuard } from './guards/roles.guard';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategy/jwt.strategy';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: config.get<string>('JWT_EXPIRES_IN') || '1d' },
      }),
      inject: [ConfigService],
    }),
    ClientsModule.register([
    {
      name: 'AUTHENTICATION_SERVICE',
      transport: Transport.TCP,
      options: { host: '127.0.0.1', port: 3001 },
    },
    {
      name: 'ACTIVITIES_SERVICE',
      transport: Transport.TCP,
      options: { host: '127.0.0.1', port: 3001 },
    },
  ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtAuthGuard, JwtRefreshGuard, RolesGuard],
  exports: [JwtModule, JwtStrategy, JwtAuthGuard, JwtRefreshGuard, AuthService, RolesGuard], 
})
export class AuthModule {}
