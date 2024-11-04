import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { PollsService } from './polls.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller()
export class PollsController {
  constructor(private readonly pollsService: PollsService) {}

  @Post("/polls/upload")
  @UseInterceptors(FileInterceptor('poll'))
  insertNewPoll(@UploadedFile() poll: Express.Multer.File) {
    return this.pollsService.insertNewPoll(poll);
  }
}
