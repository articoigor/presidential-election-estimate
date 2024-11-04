import { Column, PrimaryGeneratedColumn } from "typeorm";

export class CityEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    uf: string;

    @Column()
    population?: number;
    
    @Column()
    updated_at?: string;

    constructor(id: number, name: string, uf: string, population?: number, updated_at?: string){
        this.id = id;
        this.name = name;
        this.uf = uf;
        this.population = population;
        this.updated_at = updated_at;
    }
}