import { BadRequestException, Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class PollsService {
  async insertNewPoll(file: Express.Multer.File) {
    try {
      fs.writeFileSync(`assets/polls/${file.originalname}`, file.buffer);

      return { message: 'Pesquisa adicionada ao diretório com sucesso', filename: file.originalname };
    } catch(e){
      throw new BadRequestException('Não foi possível adicionar o resultado da pesquisa ao diretório.');
    }
  }
}

