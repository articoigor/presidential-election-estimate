import { Injectable } from '@nestjs/common';
import { CitiesRepository } from './cities.repository';
import { InsertResult } from 'typeorm';

@Injectable()
export class CitiesService {
  constructor(private citiesRepository: CitiesRepository){}
  async updateCitiesData(): Promise<void> {
    const cities = await this.citiesRepository.getCitiesIds();

    const citiesProms: Promise<InsertResult>[] = [];

    for(const city of cities){
        const popPolls = await this.citiesRepository.getCityPopulationPolls(city.id);

        city.name = this.sanitizeName(city.name);

        city.population = Number(popPolls[popPolls.length - 1]);

        city.updated_at = new Date().toISOString().slice(0, 19).replace('T', ' ');

        citiesProms.push(this.citiesRepository.saveCityData(city));
    }

    await Promise.all(citiesProms);
  }

  private sanitizeName(name: string) {
    return name.replace(/[^a-zA-Z0-9\s]/g, '');
  }
}

