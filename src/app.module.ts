import { Module } from '@nestjs/common';
import { CitiesModule } from './modules/cities/citites.module';
import { CityEntity } from './modules/cities/entities/city';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { PollsModule } from './modules/polls/polls.module';

@Module({
  imports: [
    ConfigModule.forRoot(), 
    CitiesModule,
    PollsModule,
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
