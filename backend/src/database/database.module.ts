import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        console.log(configService.get<string>('DB_HOST'));
        console.log(configService.get<number>('DB_PORT'));
        console.log(configService.get<string>('DB_USERNAME'));
        console.log(configService.get<string>('DB_PASSWORD'));
        console.log(configService.get<string>('DB_DATABASE'));  
        return {
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        autoLoadEntities: true, // Всасывает абсолютно все .entity.js/ts
        synchronize: true, // Синхронизация для разработки
        }
      }
    }),      
  ],
})
export class DatabaseModule {}
