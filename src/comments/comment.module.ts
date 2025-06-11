import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CommentsController } from './comment.controller';
import { AuthModule } from '../auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    AuthModule,
    ClientsModule.registerAsync([
      {
        name: 'COMMENTS_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get<string>('COMMENTS_SERVICE_HOST'),
            port: configService.get<number>('COMMENTS_SERVICE_PORT'),
          },
        }),
      },
    ]),
  ],
  controllers: [CommentsController],
})
export class CommentsModule {}
