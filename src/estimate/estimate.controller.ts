import { Controller, Get, Query } from '@nestjs/common';
import { EstimateService } from './estimate.service';
import { EstimateDto } from './dtos/estimate.dto';
import { PollEstimateResponse } from './responses/pollEstimate.response';

@Controller()
export class EstimateController {
  constructor(private readonly estimateService: EstimateService) {}

  @Get("/estimate")
  estimateFromPoll(@Query() estimateDto: EstimateDto): Promise<PollEstimateResponse> {
    return this.estimateService.estimateFromPoll(estimateDto);
  }
}
