import { Controller, Get, Patch, Query } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { EstimateDto } from './dtos/estimate.dto';
import { PollEstimateResponse } from './responses/pollEstimate.response';

@Controller()
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Get("/cities/estimate")
  estimateFromPoll(@Query() estimateDto: EstimateDto): Promise<PollEstimateResponse> {
    return this.citiesService.estimateFromPoll(estimateDto);
  }

  @Patch("/cities/update")
  updateCitiesData(): Promise<void> {
    return this.citiesService.updateCitiesData();
  }
}
