import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

const groupsDescriptions = {
  1: "Até 20 mil habitantes",
  2: "Entre 20 mil e 100 mil habitantes",
  3: "Entre 100 mil e 1 milhão de habitantes",
  4: "Acima de 1 milhão de habitantes"
};

@Injectable()
export class PollsService {
  async insertNewPoll(file: Express.Multer.File) {
    fs.writeFileSync(`polls/${file.originalname}`, file.buffer);

    return { message: 'Pesquisa adicionada ao diretório com sucesso', filename: file.originalname };
  }
}

