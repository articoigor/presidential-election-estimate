import { Injectable } from '@nestjs/common';
import { EstimateDto } from './dtos/estimate.dto';
import { PollEstimateResponse } from './responses/pollEstimate.response';

@Injectable()
export class EstimateService {
  estimateFromPoll(estimateDto: EstimateDto): Promise<PollEstimateResponse> {
    return null;
  }
}
