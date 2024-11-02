import { Controller, Get } from '@nestjs/common';
import { CitiesService } from './cities.service';

@Controller()
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Get("/cities/update")
  estimateFromPoll(): Promise<void> {
    return this.citiesService.updateCitiesData();
  }
}
