import { Controller, Get, Patch, Query } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { EstimateDto } from './dtos/estimate.dto';
import { PollEstimateResponse } from './responses/pollEstimate.response';
import { PollVariationResponse } from './responses/pollVariation.response';

@Controller()
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Get("/cities/estimate")
  estimateFromPoll(@Query() estimateDto: EstimateDto): Promise<PollEstimateResponse> {
    return this.citiesService.estimateFromPoll(estimateDto);
  }

  @Get("cities/estimate-variation")
  exhibitPollVariation(): Promise<PollVariationResponse> {
    return this.citiesService.exhibitPollVariation();
  }

  @Patch("/cities/update")
  updateCitiesData(): Promise<void> {
    return this.citiesService.updateCitiesData();
  }
}
