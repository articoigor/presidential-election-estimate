import { BadRequestException, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import path from 'path';

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

  async getAllPolls(): Promise<string[]> {
    try {
      const directoryPath = 'assets/polls';
      const files = fs.readdirSync(directoryPath);

      const fileNamesWithoutExtension = files.map(name => name.split('.')[0]);

      return fileNamesWithoutExtension;
    } catch (e) {
      throw new BadRequestException('Não foi possível listar os arquivos no diretório de pesquisas.');
    }
  }
}

