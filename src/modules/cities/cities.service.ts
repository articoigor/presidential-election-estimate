import { Injectable, NotFoundException } from '@nestjs/common';
import { CitiesRepository } from './cities.repository';
import { InsertResult } from 'typeorm';
import { EstimateDto } from './dtos/estimate.dto';
import { Candidate, Group, PollEstimateResponse } from './responses/pollEstimate.response';
import * as fs from 'fs';
import { VoteDto } from './dtos/vote.dto';
import * as iconv from 'iconv-lite';
import { CityEntity } from './entities/city';

const groupsDescriptions = {
  1: "Até 20 mil habitantes",
  2: "Entre 20 mil e 100 mil habitantes",
  3: "Entre 100 mil e 1 milhão de habitantes",
  4: "Acima de 1 milhão de habitantes"
};

@Injectable()
export class CitiesService {
  constructor(private citiesRepository: CitiesRepository){}

  async estimateFromPoll(estimateDto: EstimateDto): Promise<PollEstimateResponse> {
    const pollByCity = await this.extractPollFromPath(estimateDto.pollName);

    const cityMap = new Map();

    const candidateMap = new Map();

    await this.processVotes(pollByCity, cityMap, candidateMap);

    return this.generateResults(candidateMap);
  }
  
  async updateCitiesData(): Promise<void> {
    const cities = await this.citiesRepository.getCitiesIds();

    const updatedCitiesProms: Promise<InsertResult>[] = [];

    for(const city of cities){
        const cityData = await this.citiesRepository.getCityPopulationPolls(city.id);

        city.name = this.sanitizeName(city.name);

        city.population = Number(cityData[cityData.length - 1]);

        city.updated_at = new Date().toISOString().slice(0, 19).replace('T', ' ');

        updatedCitiesProms.push(this.citiesRepository.saveCityData(city));
    }

    await Promise.all(updatedCitiesProms);
  }

  private async processVotes(poll: VoteDto[], cityMap: Map<string, CityEntity>, candidateMap: Map<string, any>){
    for(const voteOption of poll){
      if(voteOption.vote == '#') continue;

      const sanitizedName = this.sanitizeName(voteOption.cityName);

      if(!cityMap.has(sanitizedName)){
        const city = await this.citiesRepository.getCityByName(sanitizedName, voteOption.uf);

        if(!city) continue;
        
        cityMap.set(sanitizedName, city);
      }

      const cityFromMap = cityMap.get(sanitizedName);

      const group = this.defineGroup(cityFromMap.population);
      
      if(!candidateMap.has(voteOption.vote)) candidateMap.set(voteOption.vote, {
        name: voteOption.vote,
        votes: {
          candidateTotal: 0,
          percentage: '',
          totalByGroups: {
            1: 0,
            2: 0,
            3: 0,
            4: 0
          }
        }
      });
      
  
      const candidate = candidateMap.get(voteOption.vote);

      candidate.votes.candidateTotal += group.weight;

      candidate.votes.totalByGroups[group.id] += group.weight;
    }
  }

  private generateResults(candidateMap: Map<string,any>): PollEstimateResponse{
    const candidates: Candidate[] = [];

    const totalVotes = Array.from(candidateMap.values()).reduce((acc,curr) =>  curr.votes.candidateTotal + acc, 0);

    for(const candidate of candidateMap.values()){
        const groups: Group[] = [];

        for(let idx = 1; idx < 5; idx++){
          groups.push(new Group(groupsDescriptions[idx], candidate.votes.totalByGroups[idx]));
        }
        const percentage = ((candidate.votes.candidateTotal / totalVotes) * 100).toFixed(2);

        candidates.push(new Candidate(candidate.name, candidate.votes.candidateTotal, `${percentage}%`, groups));
    }

    return new PollEstimateResponse(candidates);
  }
  private async extractPollFromPath(file: string): Promise<VoteDto[]> {
    try{
      const data = fs.readFileSync(`assets/polls/${file}.csv`);

      const csvData = iconv.decode(data, 'windows-1252');

      const rows = csvData.split('\n').map((row: string) => row.split('\n'));

      const pollResults: VoteDto[] = [];

      rows.forEach((row: string[]) => {
          const cells = row[0].split(';');

          if(cells.length > 0 && cells[0] !== '') pollResults.push(new VoteDto(cells[0], cells[1], cells[2], cells[3], this.sanitizeVote(cells[4])));
      });

      pollResults.shift();

      return pollResults;
    } catch(e) {
      throw new NotFoundException(`Não foi possível encontrar o arquivo ${file} no diretório, tente adicioná-lo novamente !`);
    }
  }

  private defineGroup(population: number){
    if(population > -1 && population <= 20000){
      return {
        id: 1,
        weight: 0.25,
      };
    } else if(population > 20000 && population <= 100000){
      return {
        id: 2,
        weight: 0.5,
      };
    } else if(population > 100000 && population <= 1000000){
      return {
        id: 3,
        weight: 1,
      };
    }

    return {
      id: 4,
      weight: 2,
    };
  }

  private sanitizeName(name: string): string {
    return name.replace(/'/g, '');
  }

  private sanitizeVote(vote: string): string {
    return vote.charAt(0);
  }
}

