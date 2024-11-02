import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { CityEntity } from './entities/city';
import { InsertResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CitiesRepository {
    constructor(
        @InjectRepository(CityEntity)
        private readonly client: Repository<CityEntity>,
        private readonly httpService: HttpService
    ) {}

    async saveCityData(city: CityEntity): Promise<InsertResult> {
        return this.client.query(`MERGE INTO Cities AS target
                                USING (SELECT ${city.id} AS id, '${city.name}' AS name, '${city.uf}' AS uf, ${city.population} AS population, '${city.updated_at}' AS updated_at) AS source
                                ON target.id = source.id
                                WHEN MATCHED AND target.population <> source.population THEN
                                    UPDATE SET 
                                        target.population = source.population
                                WHEN NOT MATCHED THEN
                                    INSERT (id, name, uf, population, updated_at)
                                    VALUES (source.id, source.name, source.uf, source.population, source.updated_at);
                                  `);
    }

    async getCitiesIds(): Promise<CityEntity[]> {
        const apiUrl = 'https://servicodados.ibge.gov.br/api/v1/localidades/municipios';
    
        const response = await firstValueFrom(
          this.httpService.get(apiUrl)
        );
    
        return response.data.map((city: any) => {
            return new CityEntity(city.id, city.nome, city.microrregiao.mesorregiao.UF.sigla);
        });
    }

    async getCityPopulationPolls(cityId: number): Promise<string[]> {
        const apiUrl = `https://servicodados.ibge.gov.br/api/v1/pesquisas/-/indicadores/96385/resultados/${cityId}`;
    
        const response = await firstValueFrom(
          this.httpService.get(apiUrl)
        );

        return Object.values(response.data[0].res[0].res);
    }
}
