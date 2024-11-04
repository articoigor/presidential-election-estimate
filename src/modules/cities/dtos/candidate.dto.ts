export class CandidateDto {
    id: string;
    votes: number;

    constructor(id: string, votes: number){
        this.id = id;
        this.votes = votes;
    }
}