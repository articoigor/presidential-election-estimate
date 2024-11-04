import { Module } from '@nestjs/common';
import { CitiesModule } from './cities/citites.module';
import { CityEntity } from './cities/entities/city';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(), 
    CitiesModule,
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'polls-estimate.database.windows.net',
      port: 1433,
      username: process.env.DB_ADMIN_USER,
      password: process.env.DB_ADMIN_PASSWORD,
      database: 'polls-estimate',
      extra: {
        encrypt: true,                   
        trustServerCertificate: true,       
      },
      entities: [CityEntity],
      synchronize: true, 
    })],
})
export class AppModule {}
