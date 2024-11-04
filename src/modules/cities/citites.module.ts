import { Module } from '@nestjs/common';
import { CitiesController } from './cities.controller';
import { CitiesService } from './cities.service';
import { CitiesRepository } from './cities.repository';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CityEntity } from './entities/city';
import { PollsModule } from '../polls/polls.module';
import { PollsService } from '../polls/polls.service';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([CityEntity]), PollsModule],
  controllers: [CitiesController],
  providers: [CitiesService, CitiesRepository],
})
export class CitiesModule {}
