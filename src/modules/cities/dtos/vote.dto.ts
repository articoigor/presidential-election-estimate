export class VoteDto {
    id?: string;
    date?: string;
    cityName?: string;
    uf?: string;
    vote?: string;

    constructor(id?: string, date?: string, cityName?: string, uf?: string, vote?: string){
        this.id = id;
        this.date = date;
        this.cityName = cityName;
        this.uf = uf;
        this.vote = vote;
    }
}