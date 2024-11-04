import { IsNotEmpty } from "class-validator";

export class EstimateDto {
    @IsNotEmpty({message: "O nome do arquivo é parâmetro obrigatório"})
    pollName: string;

    constructor(pollName: string){
        this.pollName = pollName;
    }
}